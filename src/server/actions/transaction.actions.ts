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
  | { success: true; data: import("@prisma/client").transactions }
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
      let newTransaction: import("@prisma/client").transactions;

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
  | { success: true; data: import("@prisma/client").transactions }
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

// --- DELETE TRANSACTION ---
type DeleteTransactionResult = 
  | { success: true }
  | { success: false; error: string };

export async function deleteTransaction(transactionId: string): Promise<DeleteTransactionResult> {
  try {
    const userId = await getAuthenticatedUserId();

    // --- Database transaction --- 
    await prisma.$transaction(async (tx: PrismaTransactionClient) => {
      // Find the transaction and verify ownership
      const existingTransaction = await tx.transactions.findUnique({
        where: { id: transactionId, userId },
      });

      if (!existingTransaction) {
        throw new Error("Transaction not found or access denied");
      }

      // Delete the transaction
      await tx.transactions.delete({ where: { id: transactionId, userId } });

      // Revert balance changes (convert Decimal to number using .toNumber())
      if (existingTransaction.type === TransactionType.INCOME && existingTransaction.destinationAccountId) {
        await tx.accounts.update({ where: { id: existingTransaction.destinationAccountId }, data: { balance: { decrement: existingTransaction.destinationAmount } } });
      } else if (existingTransaction.type === TransactionType.EXPENSE && existingTransaction.sourceAccountId) {
        await tx.accounts.update({ where: { id: existingTransaction.sourceAccountId }, data: { balance: { increment: existingTransaction.sourceAmount } } });
      } else if (existingTransaction.type === TransactionType.TRANSFER && existingTransaction.sourceAccountId && existingTransaction.destinationAccountId) {
         await tx.accounts.update({ where: { id: existingTransaction.sourceAccountId }, data: { balance: { increment: existingTransaction.sourceAmount } } });
         await tx.accounts.update({ where: { id: existingTransaction.destinationAccountId }, data: { balance: { decrement: existingTransaction.destinationAmount } } });
      }
    });
    // --- End of Database transaction --- 

    revalidatePath("/transactions");
    revalidatePath("/dashboard");
    // Potentially revalidate involved accounts pages too

    return { success: true };

  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete transaction" };
  }
} 