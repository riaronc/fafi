"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Prisma, TransactionType, PrismaClient } from "@/server/db/client";
import { getServerSession } from "next-auth";
import fs from 'fs/promises';
import path from 'path';

import { prisma } from "@/server/db";
import { authOptions } from "@/server/auth/options";
import type { MonobankClientInfo, MonobankStatementItem } from "@/types/monobank";
import { currencyMap } from "@/lib/utils"; // Assuming currencyMap is in utils

// Define the transaction client type for use in $transaction callback
type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

// --- Constants ---
const MONOBANK_API_BASE = "https://api.monobank.ua";

// --- MCC to Category Name Mapping ---
const mccToCategoryName: Record<number, string> = {
    // Education
    8211: "Education",  // Schools, educational services
    8220: "Education",  // Colleges, universities, and related institutions
    // Entertainment
    7832: "Entertainment",  // Motion picture theaters
    7922: "Entertainment",  // Theatrical ticket sales
    7995: "Entertainment",  // Lottery, casino gambling (if applicable)
    // Eating out
    5811: "Eating out",
    5812: "Eating out", // Eating places and restaurants
    5813: "Eating out", // Drinking places (bars, taverns)
    5814: "Eating out", // Fast food restaurants
    // Groceries
    5411: "Groceries", // Grocery stores, supermarkets
    5412: "Groceries", // Convenience stores
    5422: "Groceries", // Freezer and Locker Meat Provisioners
    5441: "Groceries", // Candy, nut, and confectionery stores
    5451: "Groceries", // Dairy products stores
    5462: "Groceries", // Bakeries
    5499: "Groceries", // Misc Food Stores
    5297: "Groceries", // Misc. home furnishing specialty stores (could overlap)
    5298: "Groceries", // Duty-free stores (often have food/drink)
    5300: "Groceries", // Wholesale clubs
    5311: "Groceries", // Department Stores (can have groceries) -> Overlaps Shopping
    5331: "Groceries", // Variety Stores (can have groceries)
    5399: "Groceries", // Misc. General Merchandise (can have groceries)
    5715: "Groceries", // Alcoholic Beverage Stores
    5921: "Groceries", // Package Stores - Beer, Wine, Liquor
    // Charity
    8398: "Charity",  // Charitable and social service organizations
    // Health & Fitness
    8011: "Health & Fitness",  // Doctors and physicians
    8021: "Health & Fitness",  // Dentists
    8031: "Health & Fitness",  // Nursing and personal care facilities
    8041: "Health & Fitness",  // Chiropractors
    8062: "Health & Fitness",  // Hospitals
    8071: "Health & Fitness",  // Medical and Dental Labs
    8099: "Health & Fitness",  // Medical Services and Health Practitioners
    5912: "Health & Fitness",  // Drug Stores and Pharmacies
    // Rent
    6513: "Rent",  // Real estate agents and property managers
    // Insurance
    6300: "Insurance",  // Insurance sales, claims, underwriting
    // Shopping
    // 5311: "Shopping", // Department stores -> Also in Groceries, prioritize Shopping?
    5611: "Shopping", // Men's and Boy's Clothing and Accessories Stores
    5621: "Shopping", // Women's Ready-to-Wear Stores
    5631: "Shopping", // Women's Accessory and Specialty Stores
    5641: "Shopping", // Children's and Infant's Wear Stores
    5651: "Shopping", // Family Clothing Stores
    5655: "Shopping", // Sports Apparel, Riding Apparel Stores
    5661: "Shopping", // Shoe Stores
    5681: "Shopping", // Furriers and Fur Shops
    5691: "Shopping", // Men's and Women's Clothing Stores
    5697: "Shopping", // Tailors, Seamstresses, Mending, and Alterations
    5698: "Shopping", // Wig and Toupee Stores
    5699: "Shopping", // Miscellaneous Apparel and Accessory Shops
    5931: "Shopping", // Used Merchandise and Secondhand Stores
    5948: "Shopping", // Luggage and Leather Goods Stores
    5949: "Shopping", // Sewing, Needlework, Fabric, and Piece Goods Stores
    7251: "Shopping", // Shop Repair Shops and Shoe Shine Parlors
    5131: "Shopping", // Piece Goods, Notions, and Other Dry Goods
    5137: "Shopping", // Men's, Women's, and Children's Uniforms and Commercial Clothing
    5139: "Shopping", // Commercial Footwear
    // Pets
    742: "Pets", // Veterinary services
    5995: "Pets", // Pet shops, pet food and supplies
    // Transportation
    4111: "Transport", // Local and suburban commuter passenger transportation
    // Taxi
    4121: "Taxi", // Taxicabs
    // Utilities (Missing from provided map, add common ones)
    4900: "Utilities", // Utilities - Electric, Gas, Water, Sanitary
    4814: "Bills & Charges", // Telecommunication Services (Phone Bills)
    4899: "Bills & Charges", // Cable and Other Pay Television Services (Internet/TV Bills)
};

// --- Global Cache for Categories and CSV Data ---
let categoriesCache: Map<string, string> | null = null; // Map<normalizedName, id>
let descriptionToCategoryMap: Map<string, string> | null = null; // Map<description, categoryName>

async function loadDescriptionToCategoryMap(): Promise<Map<string, string>> {
    if (descriptionToCategoryMap) {
        return descriptionToCategoryMap;
    }
    console.log("Loading description-to-category mapping from CSV...");
    const map = new Map<string, string>();
    try {
        const filePath = path.join(process.cwd(), 'data.csv'); // Assumes data.csv is in the project root
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const lines = fileContent.split('\n');

        for (const line of lines) {
            if (!line.trim()) continue;
            // Assuming tab-separated, adjust if different
            const parts = line.split('\t');
            if (parts.length === 2) {
                const categoryName = parts[0].trim();
                const description = parts[1].trim();
                if (description && categoryName) {
                     // Store the mapping with the raw description
                    map.set(description, categoryName);
                }
            }
        }
        console.log(`Loaded ${map.size} mappings from data.csv`);
        descriptionToCategoryMap = map;
    } catch (error) {
        console.error("Error reading or parsing data.csv:", error);
        // Return an empty map or re-throw, depending on desired behavior
        descriptionToCategoryMap = new Map();
    }
    return descriptionToCategoryMap;
}


async function loadCategoriesCache(tx: PrismaTransactionClient, userId: string): Promise<Map<string, string>> {
    if (categoriesCache) {
        // TODO: Consider TTL or invalidation logic if categories can change frequently
        // For now, we load once per server instance/sync run
        return categoriesCache;
    }
    console.log("Loading categories into cache...");
    const categories = await tx.categories.findMany({
        where: {userId: userId }, // User's categories + system default categories
        select: { id: true, name: true }
    });
    const cache = new Map<string, string>();
    categories.forEach(cat => {
        // Store with normalized name for case-insensitive lookup
        cache.set(cat.name.trim().toLowerCase(), cat.id);
    });
    console.log(`Cached ${cache.size} categories.`);
    categoriesCache = cache;
    return categoriesCache;
}

async function findCategoryId(
    tx: PrismaTransactionClient,
    userId: string,
    mcc: number,
    description: string | null,
): Promise<string | null> {
    if (!categoriesCache) {
        await loadCategoriesCache(tx, userId);
    }
    if (!descriptionToCategoryMap) {
        await loadDescriptionToCategoryMap();
    }
    const normalizedDesc = description?.trim();
    const normalizedDescLower = normalizedDesc?.toLowerCase();

    // 1. Priority: Match description from CSV data
    if (normalizedDesc && descriptionToCategoryMap!.has(normalizedDesc)) {
        const categoryNameFromCsv = descriptionToCategoryMap!.get(normalizedDesc)!;
        const categoryId = categoriesCache!.get(categoryNameFromCsv.toLowerCase());
        if (categoryId) {
             // console.log(`[CSV Match] Desc: "${description}" -> Cat: ${categoryNameFromCsv} (ID: ${categoryId})`);
             return categoryId;
        } else {
            console.warn(`[CSV Match] Desc: "${description}" -> Cat: ${categoryNameFromCsv}, but category not found in DB cache.`);
        }
    }

     // 1.5 Try partial/case-insensitive CSV match (more expensive) - Optional
    // if (normalizedDescLower) {
    //    for (const [csvDesc, csvCatName] of descriptionToCategoryMap!.entries()) {
    //         if (normalizedDescLower.includes(csvDesc.toLowerCase())) {
    //             const categoryId = categoriesCache!.get(csvCatName.toLowerCase());
    //             if (categoryId) {
    //                 console.log(`[Partial CSV Match] Desc: "${description}" includes "${csvDesc}" -> Cat: ${csvCatName} (ID: ${categoryId})`);
    //                 return categoryId;
    //             }
    //         }
    //    }
    // }


    // 2. Fallback: Match MCC code
    const categoryNameFromMcc = mccToCategoryName[mcc];
    if (categoryNameFromMcc) {
        const categoryId = categoriesCache!.get(categoryNameFromMcc.toLowerCase());
        if (categoryId) {
            // console.log(`[MCC Match] MCC: ${mcc} -> Cat: ${categoryNameFromMcc} (ID: ${categoryId})`);
            return categoryId;
        } else {
             console.warn(`[MCC Match] MCC: ${mcc} -> Cat: ${categoryNameFromMcc}, but category not found in DB cache.`);
        }
    }

    // 3. Fallback: Find 'Uncategorized' category
     const uncategorizedId = categoriesCache!.get('uncategorized');
     if (uncategorizedId) {
         return uncategorizedId;
     }

    // 4. No match found
    // console.log(`[No Match] Desc: "${description}", MCC: ${mcc}`);
    return null;
}

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

// --- CHECK TOKEN STATUS ---
type CheckTokenStatusResult = { success: boolean; hasToken: boolean; error?: string };

export async function checkMonobankTokenStatus(): Promise<CheckTokenStatusResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, hasToken: false, error: "User not authenticated" };
  }
  const userId = session.user.id;

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { monobankToken: true }, // Only select the necessary field
    });

    const hasToken = !!user?.monobankToken; // Check if token exists (and is not null/empty)
    return { success: true, hasToken };

  } catch (error) {
    console.error("[checkMonobankTokenStatus] Error checking token status:", error);
    return { success: false, hasToken: false, error: "Failed to check token status." };
  }
}

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

// Modified to accept selected bank IDs
export async function syncMonobankAccounts(selectedBankIds: string[]): Promise<SyncAccountsResult> {
  try {
    const { userId } = await getAuthenticatedUserIdAndToken();
    const clientInfoResult = await getMonobankClientInfo();

    if (!clientInfoResult.success) {
      return { success: false, error: clientInfoResult.error };
    }

    // Get all accounts from Monobank API
    const allMonobankAccounts = clientInfoResult.data.accounts;
    let addedCount = 0;
    let updatedCount = 0;

    // Filter the accounts based on the selected IDs from the client
    const accountsToProcess = allMonobankAccounts.filter(monoAccount => 
        selectedBankIds.includes(monoAccount.id)
    );
    console.log(`[Sync] Processing ${accountsToProcess.length} selected accounts out of ${allMonobankAccounts.length} total from API.`);

    // Process only the selected accounts
    for (const monoAccount of accountsToProcess) { 
      const currency = currencyMap[monoAccount.currencyCode];
      if (!currency) {
        console.warn(`Skipping Monobank account ${monoAccount.id}: Unknown currency code ${monoAccount.currencyCode}`);
        continue;
      }

      // Data for creation or checking update needs
      const accountData = {
        name: `Mono ${monoAccount.maskedPan.slice(-1)[0] ?? monoAccount.type}`,
        type: "CHECKING" as const, // Default type, could be refined
        balance: monoAccount.balance, // Already in cents
        currency: currency,
        bankId: monoAccount.id, // Store Monobank account ID
        userId: userId,
      };

      // Find existing account first
      console.log(`[Sync] Checking for account with bankId: ${monoAccount.id}, userId: ${userId}`); // Log bankId being checked
      const existingAccount = await prisma.accounts.findFirst({
          where: {
              userId: userId,
              bankId: monoAccount.id,
          }
      });

      if (existingAccount) {
          console.log(`[Sync] Found existing account (ID: ${existingAccount.id}) for bankId: ${monoAccount.id}. Checking for updates...`); // Log found
          // Update existing account if necessary (e.g., balance or name changed)
          if (existingAccount.balance !== accountData.balance || existingAccount.name !== accountData.name) {
              console.log(`[Sync] Updating account ID: ${existingAccount.id}`); // Log update
              await prisma.accounts.update({
                  where: { id: existingAccount.id },
                  data: {
                      balance: accountData.balance,
                      name: accountData.name,
                  }
              });
              updatedCount++;
          } else {
               console.log(`[Sync] No updates needed for account ID: ${existingAccount.id}`); // Log no update needed
          }
      } else {
          console.log(`[Sync] No existing account found for bankId: ${monoAccount.id}. Creating new account...`); // Log creation
          // Create new account
          await prisma.accounts.create({
              data: accountData
          });
          addedCount++;
           console.log(`[Sync] Created new account for bankId: ${monoAccount.id}`); // Log created
      }
    }

    revalidatePath("/accounts");
    // Return counts for better feedback
    return { success: true, added: addedCount, updated: updatedCount };

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

          // Find appropriate category ID
          const categoryId = await findCategoryId(tx, userId, item.mcc, item.description);

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
          // No need to update balance here if we fetch balances separately
          // or assume Monobank API statement includes balance updates implicitly
          // Keeping it might cause drift if API/sync fails partially.
          // Let's comment it out for now, assuming balances are updated via syncMonobankAccounts or similar
          // if (type === TransactionType.INCOME) {
          //   await tx.accounts.update({ where: { id: account.id }, data: { balance: { increment: amountAbs } } });
          // } else {
          //   await tx.accounts.update({ where: { id: account.id }, data: { balance: { decrement: amountAbs } } });
          // }
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
     categoriesCache = null; // Clear cache on error
     descriptionToCategoryMap = null;
     return { success: false, error: error instanceof Error ? error.message : "Failed to sync transactions." };
   } finally {
       // Optional: Clear caches after execution if memory is a concern
       // categoriesCache = null;
       // descriptionToCategoryMap = null;
   }
} 