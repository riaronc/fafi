"use server";

import { prisma } from "@/server/db";
import { getAuthenticatedUserId } from "@/server/auth/utils";
import { upsertPlannedBudgetSchema } from "@/lib/zod/budget.schema";
import {
  type Budget as ClientBudgetType, 
  type MonthlyBudgetData, 
  type PnlData, 
  type UpsertPlannedBudget,
  type CategoryType as ClientCategoryType
  // BudgetPeriod removed
} from "@/types/financials";
import { getCategories } from "./category.actions";
import { getTransactionsForMonth } from "./transaction.actions";
// Import only needed Prisma types
import { CategoryType as PrismaCategoryTypeEnum } from "@/server/db/client";

// --- Helper Functions ---
const fromCents = (amountInCents: number | null | undefined): number => (amountInCents || 0) / 100;
const toCents = (amountInCurrency: number): number => Math.round(amountInCurrency * 100);

// --- Main Data Fetching Action for P&L ---
export async function getMonthlyBudgetData(year: number, month: number): Promise<MonthlyBudgetData> {
  const userId = await getAuthenticatedUserId();
  console.log(`ACTION: getMonthlyBudgetData for ${userId}, ${year}-${month}`);

  const categories = await getCategories(); 
  console.log("ACTION: Fetched Categories:", categories.length);
  
  // Fetch all budget entries for the specific year and month
  const budgetsForMonth = await prisma.budgets.findMany({
      where: { userId, year, month }
  });
  console.log("ACTION: Fetched Budgets for month:", budgetsForMonth.length);

  const transactions = await getTransactionsForMonth(year, month);
  console.log("ACTION: Fetched Transactions for month:", transactions.length);

  const pnlEntries: PnlData[] = [];
  let totalPlannedIncome = 0;
  let totalActualIncome = 0;
  let totalPlannedExpenses = 0;
  let totalActualExpenses = 0;

  for (const category of categories) {
    // Find the specific budget entry for this category/year/month
    const budgetEntry = budgetsForMonth.find(b => b.categoryId === category.id);
    const plannedAmount = budgetEntry ? fromCents(budgetEntry.plannedAmount) : 0;

    const actualAmount = transactions
      .filter(t => t.categoryId === category.id && t.type === category.type) 
      .reduce((sum, t) => sum + t.amount, 0);

    // Compare types as strings to bypass linter confusion
    if ((category.type as string) === (PrismaCategoryTypeEnum.INCOME as string)) { 
      totalPlannedIncome += plannedAmount;
      totalActualIncome += actualAmount;
    } else if ((category.type as string) === (PrismaCategoryTypeEnum.EXPENSE as string)) {
      totalPlannedExpenses += plannedAmount;
      totalActualExpenses += actualAmount;
    }

    // Add entry for all INCOME/EXPENSE categories
    // Compare types as strings here as well
    if ((category.type as string) === (PrismaCategoryTypeEnum.INCOME as string) || (category.type as string) === (PrismaCategoryTypeEnum.EXPENSE as string)) {
      pnlEntries.push({
        categoryId: category.id,
        categoryName: category.name,
        categoryType: category.type as ClientCategoryType,
        plannedAmount: plannedAmount, // Planned amount for PnlData
        actualAmount: actualAmount,   
        difference: plannedAmount - actualAmount, 
      });
    }
  }

  console.log("ACTION: Final pnlEntries count:", pnlEntries.length);
  return {
    year,
    month,
    pnlEntries,
    totalPlannedIncome,
    totalActualIncome,
    totalPlannedExpenses,
    totalActualExpenses,
    hasBudgetEntries: budgetsForMonth.length > 0,
  };
}

// --- Supporting Budget Actions (using Prisma, new schema) ---

// Removed getUserBudgets as fetching all budgets is inefficient; 
// getMonthlyBudgetData now fetches only the relevant month's budgets.

export async function upsertMonthlyCategoryBudget(data: UpsertPlannedBudget): Promise<ClientBudgetType | null> {
  const userId = await getAuthenticatedUserId();
  console.log(`ACTION: upsertMonthlyCategoryBudget for ${userId}`, data);

  const validation = upsertPlannedBudgetSchema.safeParse(data);
  if (!validation.success) {
    console.error("Validation failed for upsert: ", validation.error.flatten().fieldErrors);
    throw new Error(`Validation failed: ${JSON.stringify(validation.error.flatten().fieldErrors)}`);
  }

  const { categoryId, year, month, amount } = validation.data;
  const plannedAmountInCents = toCents(amount);

  try {
    const category = await prisma.categories.findFirst({
      where: { id: categoryId, userId }
    });
    if (!category) {
      throw new Error("Category not found or access denied.");
    }

    // Use Prisma's upsert for cleaner create/update logic based on the unique constraint
    const upsertedDbBudget = await prisma.budgets.upsert({
      where: {
        // Use the unique constraint defined in the schema
        userId_categoryId_year_month: {
          userId,
          categoryId,
          year,
          month
        }
      },
      update: {
        plannedAmount: plannedAmountInCents,
        // Optionally update name if needed, otherwise Prisma keeps existing name
        // name: `Monthly budget for ${category.name} - ${month}/${year}`
      },
      create: {
        userId,
        categoryId,
        year,
        month,
        plannedAmount: plannedAmountInCents,
        name: `Monthly budget for ${category.name} - ${month}/${year}`,
        // No actualAmount, period, startDate, endDate needed
      }
    });
    
    // Map the result back to the client-facing type
    return {
      id: upsertedDbBudget.id,
      name: upsertedDbBudget.name ?? undefined,
      categoryId: upsertedDbBudget.categoryId,
      amount: fromCents(upsertedDbBudget.plannedAmount),
      year: upsertedDbBudget.year,
      month: upsertedDbBudget.month,
    };

  } catch (error) {
    console.error("Error in upsertMonthlyCategoryBudget:", error);
    if (error instanceof Error && error.message.includes("Validation failed")) throw error;
    throw new Error("Failed to save budget entry.");
  }
}

export async function createMonthlyBudgetsForPeriod(year: number, month: number): Promise<{ success: boolean, createdCount: number, message?: string }> {
  const userId = await getAuthenticatedUserId();
  console.log(`ACTION: createMonthlyBudgetsForPeriod for ${userId}, ${year}-${month}`);

  const allUserCategories = await getCategories();
  let createdCount = 0;
  const budgetsToCreate: {userId: string, categoryId: string, year: number, month: number, plannedAmount: number, name: string}[] = [];

  try {
    // Fetch existing budgets for the target month in one go
    const existingBudgetsMap = await prisma.budgets.findMany({
      where: { userId, year, month },
      select: { categoryId: true } // Select only categoryId for checking existence
    }).then(results => new Set(results.map(r => r.categoryId)));

    // Determine which budgets need to be created and find template amounts
    for (const category of allUserCategories) {
      if (existingBudgetsMap.has(category.id)) {
        console.log(`Budget for ${category.name} already exists for ${year}-${month}. Skipping.`);
        continue;
      }

      // Find template amount from the most recent previous budget (any year/month) for this category
      let templateAmountCents = 0;
      const previousBudget = await prisma.budgets.findFirst({
        where: {
          userId,
          categoryId: category.id,
          // Find latest budget before the target year/month
          OR: [
            { year: { lt: year } },
            { year: year, month: { lt: month } }
          ]
        },
        orderBy: [{ year: 'desc' }, { month: 'desc' }], // Order by year first, then month
      });

      if (previousBudget) {
        templateAmountCents = previousBudget.plannedAmount; // Use the plannedAmount from the DB (cents)
      }

      budgetsToCreate.push({
        userId,
        categoryId: category.id,
        year,
        month,
        plannedAmount: templateAmountCents,
        name: `Auto-created: ${category.name} - ${month}/${year}`,
      });
    }

    // Batch create the new budgets if any
    if (budgetsToCreate.length > 0) {
      const result = await prisma.budgets.createMany({
        data: budgetsToCreate,
        // skipDuplicates: true, // Removed - rely on prior check
      });
      createdCount = result.count;
      console.log(`Batch created ${createdCount} budgets for ${year}-${month}.`);
    }
    
    return { success: true, createdCount };
  } catch (error) {
    console.error("Error in createMonthlyBudgetsForPeriod:", error);
    return { success: false, createdCount: 0, message: "Failed to create monthly budgets." };
  }
}

export async function getQuarterlyBudgetData(year: number, quarter: number): Promise<MonthlyBudgetData[]> {
  const userId = await getAuthenticatedUserId();
  console.log(`ACTION: getQuarterlyBudgetData for ${userId}, ${year} Q${quarter}`);

  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = quarter * 3;
  
  const months = Array.from({ length: 3 }, (_, i) => startMonth + i);
  
  // Fetch all data for the quarter in parallel
  const monthlyData = await Promise.all(
    months.map(month => getMonthlyBudgetData(year, month))
  );

  return monthlyData;
}

export async function createYearlyBudgets(year: number): Promise<{ success: boolean, createdCount: number, message?: string }> {
  const userId = await getAuthenticatedUserId();
  console.log(`ACTION: createYearlyBudgets for ${userId}, ${year}`);

  const allUserCategories = await getCategories();
  let createdCount = 0;
  const budgetsToCreate: {userId: string, categoryId: string, year: number, month: number, plannedAmount: number, name: string}[] = [];

  try {
    // Fetch existing budgets for the target year in one go
    const existingBudgetsMap = await prisma.budgets.findMany({
      where: { userId, year },
      select: { categoryId: true, month: true }
    }).then(results => new Set(results.map(r => `${r.categoryId}-${r.month}`)));

    // For each month of the year
    for (let month = 1; month <= 12; month++) {
      // For each category
      for (const category of allUserCategories) {
        if (existingBudgetsMap.has(`${category.id}-${month}`)) {
          console.log(`Budget for ${category.name} already exists for ${year}-${month}. Skipping.`);
          continue;
        }

        // Find template amount from the most recent previous budget (any year/month) for this category
        let templateAmountCents = 0;
        const previousBudget = await prisma.budgets.findFirst({
          where: {
            userId,
            categoryId: category.id,
            // Find latest budget before the target year/month
            OR: [
              { year: { lt: year } },
              { year: year, month: { lt: month } }
            ]
          },
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
        });

        if (previousBudget) {
          templateAmountCents = previousBudget.plannedAmount;
        }

        budgetsToCreate.push({
          userId,
          categoryId: category.id,
          year,
          month,
          plannedAmount: templateAmountCents,
          name: `Auto-created: ${category.name} - ${month}/${year}`,
        });
      }
    }

    // Batch create the new budgets if any
    if (budgetsToCreate.length > 0) {
      const result = await prisma.budgets.createMany({
        data: budgetsToCreate,
      });
      createdCount = result.count;
      console.log(`Batch created ${createdCount} budgets for ${year}.`);
    }
    
    return { success: true, createdCount };
  } catch (error) {
    console.error("Error in createYearlyBudgets:", error);
    return { success: false, createdCount: 0, message: "Failed to create yearly budgets." };
  }
} 