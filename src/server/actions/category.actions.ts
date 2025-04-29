'use server';

import { getServerSession } from "next-auth";
// Import prisma instance from local db setup
import { prisma } from "@/server/db"; 
// Import ALL Prisma namespace, types, and enums directly from '@prisma/client'
import { Prisma, CategoryType, categories as CategoriesModel } from '@prisma/client';
import { authOptions } from "@/server/auth/options";
// Remove import from client component
// import { categorySchema } from "@/components/features/categories/category-form"; 
import { z } from "zod";

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
// TODO: Implement updateCategory action logic with validation
export async function updateCategory(data: any): Promise<any> {
  console.log("TODO: Implement updateCategory", data);
  // Replace with actual Prisma update logic
  // const userId = await getAuthenticatedUserId();
  // const category = await prisma.categories.update({ 
  //   where: { id: data.id, userId }, // Ensure user owns the category
  //   data: data 
  // });
  // return category;
  // Simulate success for now
  return data;
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