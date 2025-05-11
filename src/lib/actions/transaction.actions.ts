"use server";

import { prisma } from "@/server/db";
import { getAuthenticatedUserId } from "@/server/auth/utils";
import type { Transaction, TransactionType } from "@/types/financials";
import { TransactionType as PrismaTransactionTypeEnum } from "@/server/db/client"; // Keep this for filtering Prisma query

// Helper to convert DB amount (cents) to currency unit (e.g., dollars)
const fromCents = (amountInCents: number | null | undefined): number => (amountInCents || 0) / 100;
// Helper to convert currency unit to DB amount (cents)
const toCents = (amountInCurrency: number): number => Math.round(amountInCurrency * 100);

export async function getTransactionsForMonth(
  year: number,
  month: number // 1-12
): Promise<Transaction[]> {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)); // Last day of the month

  console.log(`Fetching DB transactions for ${userId} from ${startDate.toISOString()} to ${endDate.toISOString()}`);

  try {
    const dbTransactions = await prisma.transactions.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
        // We are interested in INCOME and EXPENSE for budget P&L
        type: {
          in: [PrismaTransactionTypeEnum.INCOME, PrismaTransactionTypeEnum.EXPENSE],
        },
        deletedAt: null, // Exclude soft-deleted transactions
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        category: true, // If we need category details like its type
        // sourceAccount: true, // If needed for account details
        // destinationAccount: true, // If needed for account details
      }
    });

    return dbTransactions.map(dbTx => {
      let amount = 0;
      let accountId: string | null = null;

      if (dbTx.type === PrismaTransactionTypeEnum.INCOME) {
        amount = fromCents(dbTx.destinationAmount);
        accountId = dbTx.destinationAccountId;
      } else if (dbTx.type === PrismaTransactionTypeEnum.EXPENSE) {
        amount = fromCents(dbTx.sourceAmount);
        accountId = dbTx.sourceAccountId;
      }
      // Skip TRANSFER or other types for this simplified list if any were fetched
      // (though filter `in` should prevent them)
      if (dbTx.type !== PrismaTransactionTypeEnum.INCOME && dbTx.type !== PrismaTransactionTypeEnum.EXPENSE) {
        return null; 
      }

      return {
        id: dbTx.id,
        amount,
        date: dbTx.date.toISOString(),
        description: dbTx.description,
        categoryId: dbTx.categoryId,
        accountId: accountId,
        type: dbTx.type as TransactionType, // Explicit cast here
      };
    }).filter(Boolean) as Transaction[]; // Filter out nulls if any transactions were skipped

  } catch (error) {
    console.error("Error fetching transactions for month:", error);
    throw new Error("Failed to fetch transactions.");
  }
}

// --- CRUD Operations (Placeholders - Implement with Prisma if needed) --- 

export async function addTransaction(transactionData: Omit<Transaction, 'id'> /* & { userId: string } */): Promise<Transaction> {
  // const userId = await getAuthenticatedUserId(); 
  // ... implementation with Prisma ...
  console.log("Adding transaction...", transactionData);
  throw new Error("addTransaction not implemented with Prisma");
}

export async function updateTransaction(transactionId: string, transactionData: Partial<Omit<Transaction, 'id'>>): Promise<Transaction> {
  // const userId = await getAuthenticatedUserId(); 
  // ... implementation with Prisma ...
  console.log("Updating transaction...", transactionId, transactionData);
  throw new Error("updateTransaction not implemented with Prisma");
}

export async function deleteTransaction(transactionId: string): Promise<void> {
  // const userId = await getAuthenticatedUserId(); 
  // ... implementation with Prisma ...
  console.log("Deleting transaction...", transactionId);
  throw new Error("deleteTransaction not implemented with Prisma");
} 