'use server';

import { getServerSession } from "next-auth";
import { prisma } from "@/server/db";
import { PrismaClient, Prisma, CategoryType, TransactionType } from "@/server/db/client";
import type { categories as CategoriesModel } from "@/server/db/client";
import { authOptions } from "@/server/auth/options";
import { z } from "zod";
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from "next/cache";

// Define the transaction client type if needed inside transactions
type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">;

// Helper to get authenticated user ID
async function getAuthenticatedUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }
  return session.user.id;
}

// --- Define Schema within Server Context --- 
const categoryActionSchema = z.object({
  id: z.string().optional(), // Keep optional ID for potential use in update/delete later
  name: z.string().min(1, { message: "Name is required" }), 
  type: z.nativeEnum(CategoryType), // Use Prisma enum directly
  bgColor: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  fgColor: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  icon: z.string().min(1, { message: "Icon is required" }),
});

// Define input type for creation using the server-defined schema
const CreateCategoryInputSchema = categoryActionSchema.omit({ id: true });
type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>;

// Result type for actions - EXPORT this
export type CategoryActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

// --- GET CATEGORIES ---
interface GetCategoriesOptions {
  type?: CategoryType; // Use CategoryType from '@prisma/client'
  // Add other potential filters like search term if needed
}

// Use the CategoriesModel type from '@prisma/client'
type GetCategoriesResult = 
  | { success: true; data: CategoriesModel[] }
  | { success: false; error: string };

export async function getCategories(options: GetCategoriesOptions = {}): Promise<GetCategoriesResult> {
  try {
    const userId = await getAuthenticatedUserId();
    const { type } = options;

    // Use Prisma namespace from '@prisma/client'
    const where: Prisma.categoriesWhereInput = {
      userId,
    };

    if (type) {
      // If filtering by type, also include categories marked as BOTH
      where.OR = [
        { type: type },
        // Uncomment if BOTH type exists/is used. Need to add BOTH to CategoryType enum in schema.
        // { type: CategoryType.BOTH } 
      ];
    } 
    // If no type filter, fetch all (Income, Expense, Both)

    // Remove unnecessary type assertion for where clause if possible, 
    // but keep if complex logic causes TS issues.
    const categoriesData = await prisma.categories.findMany({
      where: where, 
      orderBy: {
        name: 'asc', // Default sort by name
      },
    });

    // No need for explicit cast here, Prisma returns the correct model type
    // const typedCategories = categoriesData as CategoriesModel[];

    return {
      success: true,
      data: categoriesData, // Return the data directly
    };
  } catch (error) {
    console.error("Error getting categories:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to fetch categories" };
  }
}

// --- CREATE CATEGORY ---
export async function createCategory(
  inputData: CreateCategoryInput // Use the derived server-side type
): Promise<CategoryActionResult<CategoriesModel>> { 
  try {
    // Validate input data against the server-defined schema
    const validatedData = CreateCategoryInputSchema.parse(inputData);
    
    const userId = await getAuthenticatedUserId();

    const newCategory = await prisma.categories.create({
      data: {
        ...validatedData,
        userId: userId, 
      },
    });

    return { success: true, data: newCategory };

  } catch (error) {
    console.error("Error creating category:", error);
    let errorMessage = "Failed to create category";
    if (error instanceof z.ZodError) {
      errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(", ");
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

// --- UPDATE CATEGORY ---
// Define Update input type based on the action schema
const UpdateCategoryInputSchema = categoryActionSchema.omit({ id: true }); // ID comes separately
type UpdateCategoryInput = z.infer<typeof UpdateCategoryInputSchema>;

export async function updateCategory(
  categoryId: string,
  inputData: UpdateCategoryInput
): Promise<CategoryActionResult<CategoriesModel>> { 
  try {
    // 1. Get User ID
    const userId = await getAuthenticatedUserId();

    // 2. Validate input data
    const validatedData = UpdateCategoryInputSchema.parse(inputData);

    // 3. Update Database (ensure user ownership)
    const updatedCategory = await prisma.categories.update({
      where: { 
        id: categoryId, 
        userId: userId // IMPORTANT: Ensures user owns the category
      },
      data: {
        ...validatedData, 
        // userId is not needed here as it's part of the where clause
      },
    });

    // 4. Revalidate Path
    revalidatePath("/categories");

    // 5. Return Result
    return { success: true, data: updatedCategory };

  } catch (error) {
    console.error(`Error updating category ${categoryId}:`, error);
    let errorMessage = "Failed to update category";
    if (error instanceof z.ZodError) {
      errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(", ");
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
       // Handle specific Prisma errors, e.g., P2025 (Record not found)
       if (error.code === 'P2025') {
           errorMessage = "Category not found or you do not have permission to update it.";
       } else {
           errorMessage = `Database error: ${error.code}`;
       }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

// --- DELETE CATEGORY ---
// TODO: Implement deleteCategory action logic
export async function deleteCategory(id: string): Promise<any> {
  console.log("TODO: Implement deleteCategory", id);
  // Replace with actual Prisma delete logic
  // const userId = await getAuthenticatedUserId();
  // await prisma.categories.delete({ 
  //   where: { id: id, userId } // Ensure user owns the category
  // });
  // Simulate success for now
  return { success: true };
}

// --- Types ---
export type CategoryBasic = Pick<CategoriesModel, 'id' | 'name' | 'icon' | 'bgColor' | 'fgColor'>;
export type CategorySuggestion = CategoryBasic & { source: 'csv' | 'history' | 'current' };

// --- Global Cache for Categories and CSV Data (Similar to monobank actions) ---
let userCategoriesCache: Map<string, CategoryBasic[]> = new Map(); // Map<userId, categories>
let descriptionToCategoryMap: Map<string, string> | null = null; // Map<description, categoryName>

// --- Helper: Load Description Map (Copied/Adapted from monobank.actions) ---
async function loadDescriptionToCategoryMap(): Promise<Map<string, string>> {
     if (descriptionToCategoryMap) return descriptionToCategoryMap;
     console.log("Loading description-to-category mapping from CSV...");
     const map = new Map<string, string>();
     try {
         const filePath = path.join(process.cwd(), 'data.csv');
         const fileContent = await fs.readFile(filePath, 'utf-8');
         const lines = fileContent.split('\n');
         for (const line of lines) {
             if (!line.trim()) continue;
             const parts = line.split('\t');
             if (parts.length === 2) {
                 const categoryName = parts[0].trim();
                 const description = parts[1].trim();
                 if (description && categoryName) map.set(description, categoryName);
             }
         }
         console.log(`Loaded ${map.size} mappings from data.csv`);
         descriptionToCategoryMap = map;
     } catch (error) {
         console.error("Error reading or parsing data.csv:", error);
         descriptionToCategoryMap = new Map();
     }
     return descriptionToCategoryMap;
}

// --- Helper: Load User Categories Cache ---
async function loadUserCategories(userId: string): Promise<CategoryBasic[]> {
    if (userCategoriesCache.has(userId)) {
        // TODO: Cache invalidation strategy?
        return userCategoriesCache.get(userId)!;
    }
    console.log(`Loading categories for user ${userId}...`);
    const categories = await prisma.categories.findMany({
        where: { userId }, // Only user's categories for selection
        select: { id: true, name: true, icon: true, bgColor: true, fgColor: true },
        orderBy: { name: 'asc' },
    });
    userCategoriesCache.set(userId, categories);
    return categories;
}

// --- GET ALL CATEGORIES ---
type GetAllCategoriesResult =
    | { success: true; data: CategoryBasic[] }
    | { success: false; error: string };

export async function getAllCategories(): Promise<GetAllCategoriesResult> {
    try {
        const userId = await getAuthenticatedUserId();
        const categories = await loadUserCategories(userId); // Use cached loader
        return { success: true, data: categories };
    } catch (error) {
        console.error("Error getting all categories:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to fetch categories" };
    }
}

// --- GET CATEGORY SUGGESTIONS ---
type GetSuggestionsResult =
    | { success: true; data: CategorySuggestion[] }
    | { success: false; error: string };

export async function getCategorySuggestions(transactionId: string): Promise<GetSuggestionsResult> {
    try {
        const userId = await getAuthenticatedUserId();

        // 1. Fetch the transaction details - Select needed fields, including category relation
        const transaction = await prisma.transactions.findUnique({
            where: { id: transactionId, userId },
            select: { 
                id: true,
                description: true, 
                // mcc: true, // Cannot select mcc
                category: { 
                    select: { id: true, name: true, icon: true, bgColor: true, fgColor: true } 
                } // Select category relation details
            }
        });

        if (!transaction) {
            return { success: false, error: "Transaction not found" };
        }

        // Destructure available fields
        const { description, category: currentCategory } = transaction; 
        const normalizedDesc = description?.trim();

        // 2. Load necessary data/mappings
        const allUserCategories = await loadUserCategories(userId);
        const descMap = await loadDescriptionToCategoryMap();
        // const mccMap = loadMccToCategoryNameMap(); // Remove MCC map usage
        const categoriesByName = new Map(allUserCategories.map(cat => [cat.name.toLowerCase(), cat]));

        const suggestions: CategorySuggestion[] = [];
        const addedCategoryIds = new Set<string>();

        // Add current category first
        if (currentCategory) {
            suggestions.push({ ...currentCategory, source: 'current' });
            addedCategoryIds.add(currentCategory.id);
        }

        // 3. Suggestion Logic (Priority: CSV -> History)

        // Suggestion: CSV Match
        if (normalizedDesc) {
            const categoryNameFromCsv = descMap.get(normalizedDesc);
            if (categoryNameFromCsv) {
                const category = categoriesByName.get(categoryNameFromCsv.toLowerCase());
                if (category && !addedCategoryIds.has(category.id)) {
                    suggestions.push({ ...category, source: 'csv' });
                    addedCategoryIds.add(category.id);
                }
            }
        }

        // Suggestion: History Match
        if (normalizedDesc && normalizedDesc.length > 2) { 
             const lastTransaction = await prisma.transactions.findFirst({
                 where: {
                     userId,
                     description: normalizedDesc,
                     id: { not: transactionId }, 
                     categoryId: { not: null } 
                 },
                 orderBy: { date: 'desc' },
                 include: { category: { select: { id: true, name: true, icon: true, bgColor: true, fgColor: true } } } 
             });

             if (lastTransaction?.category && !addedCategoryIds.has(lastTransaction.category.id)) {
                 suggestions.push({ ...lastTransaction.category, source: 'history' });
                 addedCategoryIds.add(lastTransaction.category.id);
             }
        }

        // Suggestion: MCC Match - REMOVED
        // if (mcc) { ... }

        return { success: true, data: suggestions };

    } catch (error) {
        console.error("Error getting category suggestions:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to fetch suggestions" };
    }
}

// --- CREATE DEFAULT CATEGORIES ---
type CreateDefaultsResult = 
  | { success: true; added: number }
  | { success: false; error: string };

// Define the default set of categories with colors from the form palette
const defaultCategories = [
  // Expenses - Assigning colors from the non-inverted palette
  { name: "Groceries", type: CategoryType.EXPENSE, bgColor: "#FEF2F2", fgColor: "#DC2626", icon: "ShoppingCart" },        // Red
  { name: "Eating out", type: CategoryType.EXPENSE, bgColor: "#FFF7ED", fgColor: "#EA580C", icon: "UtensilsCrossed" },       // Orange
  { name: "Transport", type: CategoryType.EXPENSE, bgColor: "#F0F9FF", fgColor: "#0284C7", icon: "Car" },                       // Sky
  { name: "Shopping", type: CategoryType.EXPENSE, bgColor: "#EEF2FF", fgColor: "#4F46E5", icon: "ShoppingBag" },         // Indigo
  { name: "Entertainment", type: CategoryType.EXPENSE, bgColor: "#FEFDF2", fgColor: "#CA8A04", icon: "Film" },                // Yellow
  { name: "Utilities", type: CategoryType.EXPENSE, bgColor: "#FAF5FF", fgColor: "#9333EA", icon: "Wrench" },                  // Purple
  { name: "Health & Fitness", type: CategoryType.EXPENSE, bgColor: "#F7FEE7", fgColor: "#65A30D", icon: "HeartPulse" },       // Lime
  { name: "Rent", type: CategoryType.EXPENSE, bgColor: "#F9FAFB", fgColor: "#4B5563", icon: "Home" },                       // Gray
  { name: "Bills & Charges", type: CategoryType.EXPENSE, bgColor: "#ECFDF5", fgColor: "#059669", icon: "Receipt" },           // Emerald
  { name: "Education", type: CategoryType.EXPENSE, bgColor: "#FEF2F2", fgColor: "#DC2626", icon: "GraduationCap" },         // Red (Repeat)
  { name: "Travel", type: CategoryType.EXPENSE, bgColor: "#FFF7ED", fgColor: "#EA580C", icon: "Plane" },                     // Orange (Repeat)
  { name: "Pets", type: CategoryType.EXPENSE, bgColor: "#F0F9FF", fgColor: "#0284C7", icon: "Dog" },                       // Sky (Repeat)
  // Income - Assigning colors starting from Emerald
  { name: "Salary", type: CategoryType.INCOME, bgColor: "#ECFDF5", fgColor: "#059669", icon: "Landmark" },             // Emerald
  { name: "Freelance", type: CategoryType.INCOME, bgColor: "#EEF2FF", fgColor: "#4F46E5", icon: "Briefcase" },            // Indigo
  { name: "Investment", type: CategoryType.INCOME, bgColor: "#FEFDF2", fgColor: "#CA8A04", icon: "TrendingUp" },          // Yellow
  { name: "Gift", type: CategoryType.INCOME, bgColor: "#FAF5FF", fgColor: "#9333EA", icon: "Gift" },                    // Purple
  // Must Have
  { name: "Uncategorized", type: CategoryType.EXPENSE, bgColor: "#F9FAFB", fgColor: "#4B5563", icon: "CircleHelp" }, // Gray
];

export async function createDefaultCategories(): Promise<CreateDefaultsResult> {
  try {
    const userId = await getAuthenticatedUserId();

    // Get existing category names for the user (case-insensitive check)
    const existingCategories = await prisma.categories.findMany({
      where: { userId },
      select: { name: true },
    });
    const existingNamesLower = new Set(existingCategories.map(c => c.name.toLowerCase()));

    // Filter out defaults that already exist
    const categoriesToAdd = defaultCategories.filter(defCat => 
      !existingNamesLower.has(defCat.name.toLowerCase())
    );

    if (categoriesToAdd.length === 0) {
      return { success: true, added: 0 }; // Indicate nothing needed to be added
    }

    // Prepare data for createMany
    const dataToCreate = categoriesToAdd.map(cat => ({ ...cat, userId }));

    // Create the missing categories
    await prisma.categories.createMany({
      data: dataToCreate,
    });

    revalidatePath("/categories"); // Revalidate the page

    return { success: true, added: categoriesToAdd.length };

  } catch (error) {
    console.error("Error creating default categories:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create default categories" };
  }
} 