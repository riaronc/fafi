"use server";

import { prisma } from "@/server/db";
import { getAuthenticatedUserId } from "@/server/auth/utils"; // Corrected import path
import type { Category, CategoryType as ClientCategoryType } from "@/types/financials";

// Helper to convert DB amount (cents) to currency unit (e.g., dollars)
const fromCents = (amountInCents: number): number => amountInCents / 100;
// Helper to convert currency unit to DB amount (cents)
const toCents = (amountInCurrency: number): number => Math.round(amountInCurrency * 100);

export async function getCategories(): Promise<Category[]> {
  const userId = await getAuthenticatedUserId(); // Get current user ID
  if (!userId) {
    // Or return empty array if categories can be public or no user is an error handled higher up
    throw new Error("User not authenticated"); 
  }

  try {
    const categoriesFromDb = await prisma.categories.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    // Map to the client-facing Category type
    return categoriesFromDb.map(cat => ({
      id: cat.id,
      name: cat.name,
      type: cat.type as ClientCategoryType,
      icon: cat.icon,
      bgColor: cat.bgColor,
      fgColor: cat.fgColor,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Consider more specific error handling or re-throwing
    throw new Error("Failed to fetch categories.");
  }
}

// Placeholder for addCategory if needed by other features (not directly by budget page view)
/*
export async function addCategory(data: Omit<Category, 'id'> & { userId?: string }): Promise<Category> {
  const resolvedUserId = data.userId || await getCurrentUserId();
  if (!resolvedUserId) {
    throw new Error("User not authenticated and userId not provided");
  }

  // data.type should now be "INCOME" | "EXPENSE" | "BOTH"
  const categoryTypeForDb = data.type;
  // We might still want a runtime check if not relying purely on TS
  // if (!["INCOME", "EXPENSE", "BOTH"].includes(categoryTypeForDb)) { ... }

  try {
    const newCategory = await prisma.categories.create({
      data: {
        name: data.name,
        type: categoryTypeForDb, // Directly use the string literal type
        icon: data.icon || '', 
        bgColor: data.bgColor || '#FFFFFF', 
        fgColor: data.fgColor || '#000000', 
        userId: resolvedUserId,
      },
    });
    return {
        id: newCategory.id,
        name: newCategory.name,
        type: newCategory.type, // Prisma returns the string literal
        icon: newCategory.icon,
        bgColor: newCategory.bgColor,
        fgColor: newCategory.fgColor,
    };
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category.");
  }
}
*/ 