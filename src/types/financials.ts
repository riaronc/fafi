export type CategoryType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  // color?: string; 
}

export interface Transaction {
  id: string;
  amount: number;
  date: string; // Or Date object
  description?: string;
  categoryId: string;
  accountId: string;
  type: CategoryType; 
}

export interface Budget {
  id: string; 
  name?: string; 
  categoryId: string;
  amount: number;
  year: number;     // Added for specific monthly budget instance
  month: number;    // Added for specific monthly budget instance (1-12)
  // period: "Monthly" | "Yearly" | "Weekly" | "Daily"; // Removed
  // startDate: string; // YYYY-MM-DD // Removed
}

// This is what getMonthlyBudgetData from budget.actions.ts returns for each category line
export interface PnlData {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  plannedAmount: number;
  actualAmount: number;
  difference: number;
}

export interface MonthlyBudgetData {
  year: number;
  month: number; // 1-12
  pnlEntries: PnlData[];
  totalPlannedIncome: number;
  totalActualIncome: number;
  totalPlannedExpenses: number;
  totalActualExpenses: number;
  hasBudgetEntries: boolean; // Added to fix linter errors and for logic
}

export interface YearlyBudgetData {
  year: number;
  monthsData: MonthlyBudgetData[]; // Array of 12 MonthlyBudgetData objects
  totalYearlyPlannedIncome: number;
  totalYearlyActualIncome: number;
  totalYearlyPlannedExpenses: number;
  totalYearlyActualExpenses: number;
  hasAnyBudgetEntriesInYear: boolean; // To control "Create Budgets for Year" button
}

// For client-side representation of a single budget item (e.g., after upsert)
export interface ClientBudgetType {
  id: string;
  name?: string; // Optional as it might be auto-generated
  categoryId: string;
  amount: number; // Planned amount
  year: number;
  month: number;
  // actualAmount?: number; // Actuals usually come from transaction aggregations
  // period?: BudgetPeriod; // Removed as we are moving to monthly specific
  // type?: ClientCategoryType; // Type is derived from category
}

// Schema for upserting a planned budget (matches Zod schema on backend)
export interface UpsertPlannedBudget {
  categoryId: string;
  year: number;
  month: number;
  amount: number;
}

// If you had a BudgetPeriod type, and it's no longer used with the new monthly model,
// ensure it's removed or commented out if it was here.
// export type BudgetPeriod = "MONTHLY" | "QUARTERLY" | "YEARLY"; // Example, if it existed 