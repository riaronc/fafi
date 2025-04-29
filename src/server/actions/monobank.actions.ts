"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Prisma, TransactionType, PrismaClient } from "@/server/db/client";
import { getServerSession } from "next-auth";

import { prisma } from "@/server/db";
import { authOptions } from "@/server/auth/options";
import type { MonobankClientInfo, MonobankStatementItem } from "@/types/monobank";
import { currencyMap } from "@/lib/utils"; // Assuming currencyMap is in utils

// Define the transaction client type for use in $transaction callback
type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

// --- Constants ---
const MONOBANK_API_BASE = "https://api.monobank.ua";

// --- Helper Functions ---
async function getAuthenticatedUserIdAndToken() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  const userId = session.user.id;

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user?.monobankToken) {
    throw new Error("Monobank token not configured for this user.");
  }
  // TODO: Decrypt token before use if encrypted
  const token = user.monobankToken; 
  return { userId, token };
}

const toCents = (amount: number) => Math.round(amount * 100);

// --- STORE TOKEN --- 
type StoreTokenResult = { success: boolean; error?: string };

export async function storeMonobankToken(token: string): Promise<StoreTokenResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { success: false, error: "User not authenticated" };
  const userId = session.user.id;

  if (!token || typeof token !== 'string' || token.length < 10) { // Basic validation
     return { success: false, error: "Invalid token provided." };
  }

  try {
    // TODO: Encrypt the token before storing
    const encryptedToken = token; // Placeholder

    await prisma.users.update({
      where: { id: userId },
      data: { monobankToken: encryptedToken },
    });
    return { success: true };
  } catch (error) {
    console.error("Error storing Monobank token:", error);
    return { success: false, error: "Failed to store token." };
  }
}

// --- GET CLIENT INFO (from Monobank API) --- 
type GetClientInfoResult = 
  | { success: true; data: MonobankClientInfo }
  | { success: false; error: string };

export async function getMonobankClientInfo(): Promise<GetClientInfoResult> {
  try {
    const { token } = await getAuthenticatedUserIdAndToken();

    const response = await fetch(`${MONOBANK_API_BASE}/personal/client-info`, {
      headers: { "X-Token": token },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Monobank API Error (${response.status}): ${errorBody}`);
        throw new Error(`Monobank API request failed: ${response.statusText}`);
    }

    const data: MonobankClientInfo = await response.json();
    return { success: true, data };

  } catch (error) {
    console.error("Error fetching Monobank client info:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch client info." };
  }
}

// --- SYNC MONOBANK ACCOUNTS (to local DB) --- 
type SyncAccountsResult = { success: boolean; error?: string; added?: number; updated?: number };

export async function syncMonobankAccounts(): Promise<SyncAccountsResult> {
  try {
    const { userId } = await getAuthenticatedUserIdAndToken();
    const clientInfoResult = await getMonobankClientInfo();

    if (!clientInfoResult.success) {
      return { success: false, error: clientInfoResult.error };
    }

    const monobankAccounts = clientInfoResult.data.accounts;
    let addedCount = 0;
    let updatedCount = 0;

    for (const monoAccount of monobankAccounts) {
      const currency = currencyMap[monoAccount.currencyCode];
      if (!currency) {
        console.warn(`Skipping Monobank account ${monoAccount.id}: Unknown currency code ${monoAccount.currencyCode}`);
        continue;
      }

      const accountData = {
        name: `Mono ${monoAccount.maskedPan.slice(-1)[0] ?? monoAccount.type}`,
        type: "CHECKING" as const, // Default type, could be refined
        balance: monoAccount.balance, // Already in cents
        currency: currency,
        bankId: monoAccount.id, // Store Monobank account ID
        userId: userId,
      };

      await prisma.accounts.upsert({
        where: { userId_bankId: { userId, bankId: monoAccount.id } }, // Need a unique constraint on [userId, bankId]
        update: { balance: accountData.balance, name: accountData.name }, // Update balance and maybe name
        create: accountData,
      });

      // This logic assumes upsert doesn't tell us if it created or updated easily.
      // A findFirst + create/update would be needed for precise counts.
      // For now, we just report success without counts.
    }

    revalidatePath("/accounts");
    return { success: true }; // Simplified result

  } catch (error) {
    console.error("Error syncing Monobank accounts:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to sync accounts." };
  }
}

// --- SYNC MONOBANK TRANSACTIONS (from API to local DB) --- 
type SyncTransactionsResult = {
  success: boolean;
  error?: string;
  totalProcessed?: number;
  totalAdded?: number;
  totalSkipped?: number;
};

export async function syncMonobankTransactions(): Promise<SyncTransactionsResult> {
   try {
    const { userId, token } = await getAuthenticatedUserIdAndToken();

    // Get accounts linked to Monobank from our DB
    const linkedAccounts = await prisma.accounts.findMany({
      where: { userId: userId, bankId: { not: null } },
    });

    if (linkedAccounts.length === 0) {
      return { success: true, totalProcessed: 0, totalAdded: 0, totalSkipped: 0 };
    }

    let totalAdded = 0;
    let totalSkipped = 0;
    let totalProcessed = 0;

    const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000); // Fetch last 30 days

    for (const account of linkedAccounts) {
      if (!account.bankId) continue;

      // Fetch statements from Monobank API for this account
      const statementsUrl = `${MONOBANK_API_BASE}/personal/statement/${account.bankId}/${thirtyDaysAgo}`;
      const response = await fetch(statementsUrl, { headers: { "X-Token": token } });

      if (!response.ok) {
        console.error(`Failed to fetch statements for account ${account.id} (Mono ID: ${account.bankId}): ${response.statusText}`);
        continue; // Skip this account on error
      }

      const statements: MonobankStatementItem[] = await response.json();
      totalProcessed += statements.length;

      // --- Process statements within a DB transaction --- 
      await prisma.$transaction(async (tx: PrismaTransactionClient) => {
        for (const item of statements) {
          // Check if transaction already exists using findFirst
          const existing = await tx.transactions.findFirst({
            where: { bankTransactionId: item.id }, // Search using where clause
          });

          if (existing) {
            totalSkipped++;
            continue;
          }

          // Determine transaction type and amounts
          const amountAbs = Math.abs(item.amount);
          let type: TransactionType;
          let sourceAccountId: string | null = null;
          let destinationAccountId: string | null = null;
          let sourceAmount = 0;
          let destinationAmount = 0;

          if (item.amount > 0) { // Income
            type = TransactionType.INCOME;
            destinationAccountId = account.id;
            destinationAmount = amountAbs;
          } else { // Expense
            type = TransactionType.EXPENSE;
            sourceAccountId = account.id;
            sourceAmount = amountAbs;
          }

          // TODO: Find appropriate category (maybe based on MCC or description?)
          // This requires a robust category mapping/finding logic.
          // For now, let's assign to a default 'Uncategorized' or skip category.
          // const categoryId = await findOrCreateCategory(tx, userId, item.mcc, item.description);
          const categoryId = null; // Placeholder

          // Create transaction
          await tx.transactions.create({
            data: {
              userId: userId,
              bankTransactionId: item.id,
              date: new Date(item.time * 1000),
              description: item.description ?? "",
              type: type,
              sourceAccountId: sourceAccountId,
              destinationAccountId: destinationAccountId,
              sourceAmount: sourceAmount,
              destinationAmount: destinationAmount,
              categoryId: categoryId, // Assign determined category
            },
          });

          // Update account balance (careful with cents)
          if (type === TransactionType.INCOME) {
            await tx.accounts.update({ where: { id: account.id }, data: { balance: { increment: amountAbs } } });
          } else {
            await tx.accounts.update({ where: { id: account.id }, data: { balance: { decrement: amountAbs } } });
          }
          totalAdded++;
        }
      });
      // --- End of DB transaction for account --- 
    }

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");

    return { success: true, totalProcessed, totalAdded, totalSkipped };

   } catch (error) {
     console.error("Error syncing Monobank transactions:", error);
     return { success: false, error: error instanceof Error ? error.message : "Failed to sync transactions." };
   }
} 