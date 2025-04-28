import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CategoryType } from "@prisma/client";

// POST /api/categories/defaults - Add default categories for the current user
export async function POST() {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be signed in to access this endpoint" },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userId = session.user.id;

    const defaultCategories = [
      // Income categories
      {
        name: 'Salary',
        type: CategoryType.INCOME,
        bgColor: '#E8F5E9',  // Soft green background
        fgColor: '#2E7D32',  // Darker green icon
        icon: 'dollar-sign',
        userId,
      },
      {
        name: 'Gifts',
        type: CategoryType.INCOME,
        bgColor: '#F3E5F5',  // Soft purple background
        fgColor: '#7B1FA2',  // Darker purple icon
        icon: 'gift',
        userId,
      },
      
      // Expense categories
      {
        name: 'Rent',
        type: CategoryType.EXPENSE,
        bgColor: '#FFEBEE',  // Soft red background
        fgColor: '#C62828',  // Darker red icon
        icon: 'home',
        userId,
      },
      {
        name: 'Eating Out',
        type: CategoryType.EXPENSE,
        bgColor: '#FFF3E0',  // Soft orange background
        fgColor: '#E65100',  // Darker orange icon
        icon: 'utensils',
        userId,
      },
      {
        name: 'Tech',
        type: CategoryType.EXPENSE,
        bgColor: '#E3F2FD',  // Soft blue background
        fgColor: '#1565C0',  // Darker blue icon
        icon: 'monitor',
        userId,
      },
      {
        name: 'Groceries',
        type: CategoryType.EXPENSE,
        bgColor: '#F1F8E9',  // Soft light green background
        fgColor: '#558B2F',  // Darker green icon
        icon: 'shopping-cart',
        userId,
      },
      {
        name: 'Home',
        type: CategoryType.EXPENSE,
        bgColor: '#EFEBE9',  // Soft brown background
        fgColor: '#4E342E',  // Darker brown icon
        icon: 'home',
        userId,
      },
      {
        name: 'Education',
        type: CategoryType.EXPENSE,
        bgColor: '#E8EAF6',  // Soft indigo background
        fgColor: '#283593',  // Darker indigo icon
        icon: 'book',
        userId,
      },
      {
        name: 'Entertainment',
        type: CategoryType.EXPENSE,
        bgColor: '#FCE4EC',  // Soft pink background
        fgColor: '#C2185B',  // Darker pink icon
        icon: 'film',
        userId,
      },
      {
        name: 'Taxi',
        type: CategoryType.EXPENSE,
        bgColor: '#FFF8E1',  // Soft amber background
        fgColor: '#FF8F00',  // Darker amber icon
        icon: 'car',
        userId,
      },
      {
        name: 'Charity',
        type: CategoryType.EXPENSE,
        bgColor: '#EDE7F6',  // Soft deep purple background
        fgColor: '#512DA8',  // Darker deep purple icon
        icon: 'heart',
        userId,
      },
      {
        name: 'Transport',
        type: CategoryType.EXPENSE,
        bgColor: '#ECEFF1',  // Soft blue grey background
        fgColor: '#455A64',  // Darker blue grey icon
        icon: 'car',
        userId,
      },
      {
        name: 'Shopping',
        type: CategoryType.EXPENSE,
        bgColor: '#FBE9E7',  // Soft deep orange background
        fgColor: '#D84315',  // Darker deep orange icon
        icon: 'shopping-bag',
        userId,
      },
      {
        name: 'Health',
        type: CategoryType.EXPENSE,
        bgColor: '#E0F7FA',  // Soft cyan background
        fgColor: '#00838F',  // Darker cyan icon
        icon: 'heart',
        userId,
      },
    ];

    // Create transaction
    await prisma.$transaction(async (tx) => {
      // Check for any existing categories
      const existingCategories = await tx.categories.findMany({
        where: { userId },
        select: { name: true },
      });
      
      const existingNames = existingCategories.map(c => c.name);
      
      // Only add categories that don't already exist
      const categoriesToAdd = defaultCategories.filter(
        category => !existingNames.includes(category.name)
      );
      
      if (categoriesToAdd.length === 0) {
        return;
      }
      
      // Add the new categories
      await tx.categories.createMany({
        data: categoriesToAdd,
      });
    });
    
    return NextResponse.json(
      { message: "Default categories added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding default categories:", error);
    return NextResponse.json(
      { error: "An error occurred while adding default categories" },
      { status: 500 }
    );
  }
} 