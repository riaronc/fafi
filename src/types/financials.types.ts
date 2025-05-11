// import type { 
//     CategoryType as PrismaCategoryType,
//     BudgetPeriod as PrismaBudgetPeriod,
//     TransactionType as PrismaTransactionType 
// } from "@/server/db/client"; 

// Manually define enums based on Prisma schema to ensure exact match
export type CategoryType = "INCOME" | "EXPENSE" | "BOTH";
// export type BudgetPeriod = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"; // Removed
export type TransactionType = "INCOME" | "EXPENSE" | "TRANSFER";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon?: string;      
  bgColor?: string;   
  fgColor?: string;   
  // userId: string; // Not typically sent to client unless for specific admin views
}

export interface Transaction {
  id: string;
  // Amounts are in currency units (e.g. dollars) for client-side, converted from cents in server actions
  amount: number; // Represents primary financial impact (e.g. expense amount, income amount)
  // sourceAmount?: number; // If dealing with transfers in detail on client
  // destinationAmount?: number; // If dealing with transfers in detail on client
  date: string; // ISO string date (DateTime from Prisma becomes string)
  description?: string;
  categoryId?: string | null; // Optional in Prisma schema
  accountId?: string | null; // Represents sourceAccountId for expenses/transfers, destinationAccountId for incomes
  type: TransactionType; // Should now correctly map to Prisma's enum type
  // userId: string;
}

export interface Budget { // Client-facing Budget type, aligned with new schema
  id: string; 
  name?: string; // Optional name from DB
  categoryId: string;
  amount: number; // Renamed from plannedAmount previously, matches plannedAmount in DB (in currency units)
  // period: BudgetPeriod;  // Removed
  // startDate: string;     // Removed
  // endDate?: string;      // Removed
  // actualAmount?: number; // Removed - not stored
  year: number;          // Added
  month: number;         // Added (1-12)
}

// For P&L table display, amounts are in currency units
export interface PnlData {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  amount: number;
  actualAmount: number;
  difference: number;
}

export interface MonthlyBudgetData {
  year: number;
  month: number; // 1-12
  pnlEntries: PnlData[];
  totalPlannedIncome: number; // Sum of PnlData.amount for income
  totalActualIncome: number;
  totalPlannedExpenses: number; // Sum of PnlData.amount for expenses
  totalActualExpenses: number;
}

// For creating/updating planned budget amounts via form/inline edit
// Amount here is in currency units, will be converted to cents in server action
export interface UpsertPlannedBudget {
  categoryId: string;
  year: number;
  month: number; // 1-12
  amount: number; // The new planned value (in currency units)
} 