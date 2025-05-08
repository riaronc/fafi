"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { Prisma, TransactionType, PrismaClient, CategoryType } from "@/server/db/client";

import { prisma } from "@/server/db";
import { authOptions } from "@/server/auth/options";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "@/lib/zod/transaction.schema";

// Define the transaction client type for use in $transaction callback
type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

// Helper to get authenticated user ID
async function getAuthenticatedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
}

// Helper to convert amount for storage (cents)
const toCents = (amount: number) => Math.round(amount * 100);

// --- GET TRANSACTIONS ---
interface GetTransactionsOptions {
  page?: number;
  limit?: number;
  sortBy?: string; // e.g., 'date', 'amount'
  sortOrder?: "asc" | "desc";
  filters?: {
    dateFrom?: Date;
    dateTo?: Date;
    categoryId?: string;
    accountId?: string;
    type?: TransactionType;
    // Add other filters as needed
  };
}

export async function getTransactions(options: GetTransactionsOptions = {}) {
  try {
    const userId = await getAuthenticatedUserId();
    const { page = 1, limit = 10, sortBy = 'date', sortOrder = 'desc', filters = {} } = options;

    const where: Prisma.transactionsWhereInput = {
      userId,
      deletedAt: null, // Only fetch non-deleted transactions
    };

    // Apply filters carefully
    const dateFilter: Prisma.DateTimeFilter = {};
    if (filters.dateFrom) dateFilter.gte = filters.dateFrom;
    if (filters.dateTo) dateFilter.lte = filters.dateTo;
    if (Object.keys(dateFilter).length > 0) where.date = dateFilter; // Assign only if there are date filters

    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.type) where.type = filters.type;
    if (filters.accountId) {
      where.OR = [
        { sourceAccountId: filters.accountId },
        { destinationAccountId: filters.accountId },
      ];
    }

    const [transactions, totalCount] = await prisma.$transaction([
      prisma.transactions.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true, // Include category details
          sourceAccount: true, // Include source account
          destinationAccount: true, // Include destination account
        },
      }),
      prisma.transactions.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      success: true,
      data: transactions,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: totalPages,
      },
    };
  } catch (error) {
    console.error("Error getting transactions:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch transactions" };
  }
}

// --- CREATE TRANSACTION ---
type CreateTransactionResult = 
  | { success: true; data: import("@/server/db/client").transactions }
  | { success: false; error: string; issues?: z.ZodIssue[] };

export async function createTransaction(input: unknown): Promise<CreateTransactionResult> {
  try {
    const userId = await getAuthenticatedUserId();

    // Validate base input structure
    const validationResult = createTransactionSchema.safeParse(input);
    if (!validationResult.success) {
      return { success: false, error: "Invalid input data.", issues: validationResult.error.issues };
    }
    const validatedData = validationResult.data;

    // Convert amount to cents
    const amountInCents = toCents(validatedData.amount);

    // --- Database transaction --- 
    const result = await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      let newTransaction: import("@/server/db/client").transactions;

      // Common data for all transaction types
      const commonData = {
          description: validatedData.description ?? "", // Default to empty string if null/undefined
          date: validatedData.date,
          userId: userId,
      };

      if (validatedData.type === TransactionType.INCOME) {
        const { accountId, categoryId } = validatedData; 
        const account = await tx.accounts.findFirst({ where: { id: accountId, userId }});
        // Use OR condition for category type check
        const category = await tx.categories.findFirst({ 
            where: { 
                id: categoryId, 
                userId, 
                OR: [ { type: TransactionType.INCOME }, { type: "BOTH" as any } ] // Use type assertion as fallback
            }
        }); 
        if (!account || !category) throw new Error("Account or Category not found or invalid type for Income.");

        newTransaction = await tx.transactions.create({
          data: {
            ...commonData,
            type: TransactionType.INCOME,
            destinationAccountId: accountId,
            destinationAmount: amountInCents,
            sourceAmount: 0, 
            categoryId: categoryId,
          }
        });
        // Update account balance
        await tx.accounts.update({ where: { id: accountId }, data: { balance: { increment: amountInCents } } });
      }
      else if (validatedData.type === TransactionType.EXPENSE) {
        const { accountId, categoryId } = validatedData; 
        const account = await tx.accounts.findFirst({ where: { id: accountId, userId }});
        // Use OR condition for category type check
        const category = await tx.categories.findFirst({ 
            where: { 
                id: categoryId, 
                userId, 
                OR: [ { type: TransactionType.EXPENSE }, { type: "BOTH" as any } ] // Use type assertion as fallback
            }
        });
        if (!account || !category) throw new Error("Account or Category not found or invalid type for Expense.");

        newTransaction = await tx.transactions.create({
          data: {
             ...commonData,
            type: TransactionType.EXPENSE,
            sourceAccountId: accountId,
            sourceAmount: amountInCents,
            destinationAmount: 0, 
            categoryId: categoryId,
          }
        });
        // Update account balance
        await tx.accounts.update({ where: { id: accountId }, data: { balance: { decrement: amountInCents } } });
      }
      else { // TRANSFER
        const { sourceAccountId, destinationAccountId } = validatedData;
        if (sourceAccountId === destinationAccountId) throw new Error("Source and destination accounts cannot be the same.");
        const sourceAccount = await tx.accounts.findFirst({ where: { id: sourceAccountId, userId }});
        const destAccount = await tx.accounts.findFirst({ where: { id: destinationAccountId, userId }});
        if (!sourceAccount || !destAccount) throw new Error("Source or Destination account not found.");

        newTransaction = await tx.transactions.create({
           data: {
             ...commonData,
            type: TransactionType.TRANSFER,
            sourceAccountId: sourceAccountId,
            destinationAccountId: destinationAccountId,
            sourceAmount: amountInCents,
            destinationAmount: amountInCents, 
            categoryId: null, 
          }
        });
        // Update account balances
        await tx.accounts.update({ where: { id: sourceAccountId }, data: { balance: { decrement: amountInCents } } });
        await tx.accounts.update({ where: { id: destinationAccountId }, data: { balance: { increment: amountInCents } } });
      }
      
      return newTransaction;
    });
    // --- End of Database transaction --- 

    revalidatePath("/transactions");
    revalidatePath("/dashboard"); // Revalidate dashboard for summaries
    if (result.sourceAccountId) revalidatePath(`/accounts/${result.sourceAccountId}`);
    if (result.destinationAccountId) revalidatePath(`/accounts/${result.destinationAccountId}`);
    
    return { success: true, data: result };

  } catch (error) {
    console.error("Error creating transaction:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create transaction" };
  }
}

// --- UPDATE TRANSACTION ---
// Note: Updating transactions, especially type or accounts, is complex.
// This implementation focuses on updating common fields like amount, date, description, category.
// Reverting/recalculating balance changes is crucial and non-trivial if accounts/type change.
// For simplicity, this version assumes the transaction type and accounts DO NOT change.

type UpdateTransactionResult = 
  | { success: true; data: import("@/server/db/client").transactions }
  | { success: false; error: string; issues?: z.ZodIssue[] };

export async function updateTransaction(transactionId: string, input: unknown): Promise<UpdateTransactionResult> {
   try {
    const userId = await getAuthenticatedUserId();

    // Validate input
    const validationResult = updateTransactionSchema.safeParse(input);
    if (!validationResult.success) {
      return { success: false, error: "Invalid input data.", issues: validationResult.error.issues };
    }
    const validatedData = validationResult.data;

    // --- Database transaction --- 
    const result = await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Find the existing transaction and verify ownership
      const existingTransaction = await tx.transactions.findUnique({
        where: { id: transactionId, userId },
      });

      if (!existingTransaction) {
        throw new Error("Transaction not found or access denied");
      }

      // Prepare update payload
      const updatePayload: Prisma.transactionsUpdateInput = {};
      
      // Set description, defaulting null/undefined to empty string
      if (validatedData.description !== undefined) {
        updatePayload.description = validatedData.description ?? ""; 
      }
      
      if (validatedData.date !== undefined) updatePayload.date = validatedData.date;
      
      // Update category relation
      if (validatedData.categoryId !== undefined) {
         if (validatedData.categoryId === null) {
            updatePayload.category = { disconnect: true }; 
         } else {
            updatePayload.category = { connect: { id: validatedData.categoryId } };
         }
      }

      let balanceNeedsRecalculation = false;
      let oldAmountNumber = 0; 
      let newAmountNumber = 0; 

      if (validatedData.amount !== undefined) {
        const newAmountInCents = toCents(validatedData.amount);
        if (existingTransaction.type === TransactionType.INCOME) {
          // Convert Decimal to number using .toNumber()
          oldAmountNumber = existingTransaction.destinationAmount; 
          newAmountNumber = newAmountInCents;
          updatePayload.destinationAmount = newAmountInCents;
        } else if (existingTransaction.type === TransactionType.EXPENSE) {
          // Convert Decimal to number using .toNumber()
          oldAmountNumber = existingTransaction.sourceAmount; 
          newAmountNumber = newAmountInCents;
          updatePayload.sourceAmount = newAmountInCents;
        } else { // TRANSFER
          // Convert Decimal to number using .toNumber()
          oldAmountNumber = existingTransaction.sourceAmount; 
          newAmountNumber = newAmountInCents;
          updatePayload.sourceAmount = newAmountInCents;
          updatePayload.destinationAmount = newAmountInCents;
        }
        if (oldAmountNumber !== newAmountNumber) {
          balanceNeedsRecalculation = true;
        }
      }
      
      // Update the transaction
      const updatedTransaction = await tx.transactions.update({ where: { id: transactionId, userId }, data: updatePayload });

      // Recalculate balances if amount changed
      if (balanceNeedsRecalculation) {
        // Calculate difference as number
        const amountDifference = newAmountNumber - oldAmountNumber; 
        if (existingTransaction.type === TransactionType.INCOME && existingTransaction.destinationAccountId) {
          await tx.accounts.update({ where: { id: existingTransaction.destinationAccountId }, data: { balance: { increment: amountDifference } } });
        } else if (existingTransaction.type === TransactionType.EXPENSE && existingTransaction.sourceAccountId) {
          await tx.accounts.update({ where: { id: existingTransaction.sourceAccountId }, data: { balance: { decrement: amountDifference } } });
        } else if (existingTransaction.type === TransactionType.TRANSFER && existingTransaction.sourceAccountId && existingTransaction.destinationAccountId) {
           await tx.accounts.update({ where: { id: existingTransaction.sourceAccountId }, data: { balance: { decrement: amountDifference } } });
           await tx.accounts.update({ where: { id: existingTransaction.destinationAccountId }, data: { balance: { increment: amountDifference } } });
        }
      }
      return updatedTransaction;
    });
    // --- End of Database transaction --- 

    revalidatePath("/transactions");
    revalidatePath("/dashboard");
    if (result.sourceAccountId) revalidatePath(`/accounts/${result.sourceAccountId}`);
    if (result.destinationAccountId) revalidatePath(`/accounts/${result.destinationAccountId}`);
    revalidatePath(`/transactions/${transactionId}`);
    
    return { success: true, data: result };

   } catch (error) {
     console.error("Error updating transaction:", error);
     return { success: false, error: error instanceof Error ? error.message : "Failed to update transaction" };
   }
}

// --- UPDATE TRANSACTION CATEGORY ---
type UpdateCategoryResult =
  | { success: true }
  | { success: false; error: string };

const updateCategorySchema = z.object({
    categoryId: z.string().uuid().nullable(), // Changed from cuid() to uuid()
});

async function updateTransactionCategory(transactionId: string, input: { categoryId: string | null }): Promise<UpdateCategoryResult> {
    try {
        const userId = await getAuthenticatedUserId();

        // --- DEBUG LOGGING --- 
        console.log("updateTransactionCategory received input:", JSON.stringify(input, null, 2));
        // --- END DEBUG LOGGING ---

        // Validate input
        const validationResult = updateCategorySchema.safeParse(input);
        if (!validationResult.success) {
            return { success: false, error: "Invalid category ID." };
        }
        const { categoryId } = validationResult.data;

        // Ensure category exists and belongs to user (if not null)
        if (categoryId) {
            const categoryExists = await prisma.categories.findFirst({
                where: { id: categoryId, userId }
            });
            if (!categoryExists) {
                return { success: false, error: "Category not found or invalid." };
            }
        }

        // Update the transaction
        await prisma.transactions.update({
            where: { id: transactionId, userId }, // Ensure user owns transaction
            data: {
                // Use connect/disconnect for the relation instead of setting FK directly
                category: categoryId 
                    ? { connect: { id: categoryId } } 
                    : { disconnect: true },
            },
        });

        // No need for complex balance recalc here, just revalidate paths
        revalidatePath("/transactions");
        revalidatePath("/dashboard");
        // Potentially revalidate category pages if they show usage counts
        revalidatePath("/categories");

        return { success: true };

    } catch (error) {
        console.error("Error updating transaction category:", error);
        // Handle potential errors like transaction not found
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
             return { success: false, error: "Transaction not found." };
        }
        return { success: false, error: error instanceof Error ? error.message : "Failed to update category" };
    }
}

// --- DELETE TRANSACTION ---
// Define the result type for deletion
export type DeleteActionResult = 
  | { success: true }
  | { success: false; error: string };

/**
 * Soft deletes a transaction by setting the deletedAt field.
 * Also reverts the balance changes on associated accounts.
 */
export async function deleteTransaction(transactionId: string): Promise<DeleteActionResult> {
   try {
    const userId = await getAuthenticatedUserId();

    // --- Database transaction --- 
    const result = await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Find the transaction to delete and verify ownership
      console.log("Deleting transaction:", transactionId);
      
      const transactionToAssess = await tx.transactions.findUnique({
        where: { id: transactionId, userId },
      });

      if (!transactionToAssess) {
        // Truly not found for this user or wrong ID
        throw new Error("Transaction not found or access denied.");
      }

      if (transactionToAssess.deletedAt) {
        // Already soft-deleted. 
        // Throw a specific error to inform the client clearly.
        console.warn(`Attempted to delete an already soft-deleted transaction: ${transactionId}`);
        throw new Error("Transaction has already been deleted.");
      }

      // If we reach here, transactionToAssess exists and transactionToAssess.deletedAt is null.
      // Proceed with the update and balance changes.
      const deletedTransaction = await tx.transactions.update({
        where: { id: transactionId }, // userId is implicitly checked by finding transactionToAssess
        data: { deletedAt: new Date() }, // Set the deletedAt timestamp
      });

      // Revert account balance changes based on transaction type
      // Use transactionToAssess for original amounts and accounts before deletion
      const { type, sourceAccountId, destinationAccountId, sourceAmount, destinationAmount } = transactionToAssess;

      if (type === TransactionType.INCOME && destinationAccountId) {
        await tx.accounts.update({
          where: { id: destinationAccountId, userId },
          data: { balance: { decrement: destinationAmount } },
        });
      } else if (type === TransactionType.EXPENSE && sourceAccountId) {
        await tx.accounts.update({
          where: { id: sourceAccountId, userId },
          data: { balance: { increment: sourceAmount } },
        });
      } else if (type === TransactionType.TRANSFER && sourceAccountId && destinationAccountId) {
        // Revert transfer: add back to source, subtract from destination
        await tx.accounts.update({
          where: { id: sourceAccountId, userId },
          data: { balance: { increment: sourceAmount } },
        });
        await tx.accounts.update({
          where: { id: destinationAccountId, userId },
          data: { balance: { decrement: destinationAmount } }, // Assuming destinationAmount is positive
        });
      }

      return deletedTransaction;
    });
    // --- End of Database transaction --- 

    revalidatePath("/transactions");
    revalidatePath("/dashboard"); // Revalidate dashboard for summaries
    if (result.sourceAccountId) revalidatePath(`/accounts/${result.sourceAccountId}`);
    if (result.destinationAccountId) revalidatePath(`/accounts/${result.destinationAccountId}`);

    return { success: true };

  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete transaction" };
  }
}

// Export the new action
export { updateTransactionCategory, }; 