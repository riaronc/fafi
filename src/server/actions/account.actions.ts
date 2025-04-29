"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { prisma } from "@/server/db";
import { authOptions } from "@/server/auth/options";
import { createAccountSchema, updateAccountSchema } from "@/lib/zod/account.schema";

// Helper to get authenticated user ID
async function getAuthenticatedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
}

// --- GET ACCOUNTS ---
export async function getAccounts() {
  try {
    const userId = await getAuthenticatedUserId();
    const accounts = await prisma.accounts.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: accounts };
  } catch (error) {
    console.error("Error getting accounts:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch accounts" };
  }
}

// --- CREATE ACCOUNT ---
type CreateAccountResult = 
  | { success: true; data: import("@prisma/client").accounts }
  | { success: false; error: string; issues?: z.ZodIssue[] };

export async function createAccount(input: unknown): Promise<CreateAccountResult> {
  try {
    const userId = await getAuthenticatedUserId();
    
    // Validate input
    const validationResult = createAccountSchema.safeParse(input);
    if (!validationResult.success) {
      return { 
        success: false, 
        error: "Invalid input data.", 
        issues: validationResult.error.issues 
      };
    }
    const validatedData = validationResult.data;

    // Convert balance from major units (e.g., dollars) to minor units (cents)
    const balanceInCents = Math.round(validatedData.balance * 100);

    const newAccount = await prisma.accounts.create({
      data: {
        ...validatedData,
        balance: balanceInCents,
        userId: userId,
      },
    });
    
    revalidatePath("/accounts"); // Revalidate the accounts page
    return { success: true, data: newAccount };

  } catch (error) {
    console.error("Error creating account:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create account" };
  }
}

// --- UPDATE ACCOUNT ---
type UpdateAccountResult = 
  | { success: true; data: import("@prisma/client").accounts }
  | { success: false; error: string; issues?: z.ZodIssue[] };

export async function updateAccount(accountId: string, input: unknown): Promise<UpdateAccountResult> {
   try {
    const userId = await getAuthenticatedUserId();

    // Validate input
    const validationResult = updateAccountSchema.safeParse(input);
    if (!validationResult.success) {
      return { 
        success: false, 
        error: "Invalid input data.", 
        issues: validationResult.error.issues 
      };
    }
    const validatedData = validationResult.data;

    // Find the existing account and verify ownership
    const existingAccount = await prisma.accounts.findUnique({
      where: { id: accountId },
    });

    if (!existingAccount || existingAccount.userId !== userId) {
      throw new Error("Account not found or access denied");
    }

    // Prepare update data, converting balance if provided
    const updateData: Partial<typeof validatedData & { balance: number }> = { ...validatedData };
    if (typeof validatedData.balance === 'number') {
      updateData.balance = Math.round(validatedData.balance * 100);
    }

    const updatedAccount = await prisma.accounts.update({
      where: { id: accountId, userId }, // Ensure user owns the account
      data: updateData,
    });

    revalidatePath("/accounts");
    revalidatePath(`/accounts/${accountId}`);
    return { success: true, data: updatedAccount };

  } catch (error) {
    console.error("Error updating account:", error);
     return { success: false, error: error instanceof Error ? error.message : "Failed to update account" };
  }
}

// --- DELETE ACCOUNT ---
type DeleteAccountResult = 
  | { success: true }
  | { success: false; error: string };

export async function deleteAccount(accountId: string): Promise<DeleteAccountResult> {
   try {
    const userId = await getAuthenticatedUserId();

    // Verify ownership before deleting
     const existingAccount = await prisma.accounts.findUnique({
      where: { id: accountId },
    });

    if (!existingAccount || existingAccount.userId !== userId) {
      throw new Error("Account not found or access denied");
    }

    // TODO: Consider handling transactions associated with the account (e.g., reassign, delete, prevent deletion if transactions exist?)

    await prisma.accounts.delete({
      where: { id: accountId, userId }, // Ensure user owns the account
    });

    revalidatePath("/accounts");
    return { success: true };

  } catch (error) {
     console.error("Error deleting account:", error);
     // Handle potential Prisma errors like constraint violations if transactions exist
     if (error instanceof Error && error.message.includes('constraint')) { // Basic check
        return { success: false, error: "Cannot delete account with existing transactions." };
     }
     return { success: false, error: error instanceof Error ? error.message : "Failed to delete account" };
  }
} 