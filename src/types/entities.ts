// Centralized entity type definitions

import { accounts, transactions, categories, budgets, TransactionType } from "@prisma/client";

// --- Basic Entities (Mirroring Prisma, potentially omitting sensitive fields) ---
// export type User = Omit<import("@prisma/client").users, 'password' | 'monobankToken'>;
// export type Account = accounts;
// export type Category = categories;
// export type Budget = budgets;
// export type Transaction = transactions;

// --- Specific Component/View Types ---

// Type for data displayed in the main transactions table
// Derived/transformed from the raw Prisma `transactions` type
export type TableTransaction = {
  id: string;
  date: Date;
  description: string;
  category: string; // Display name or placeholder
  categoryColor?: string | null; // Optional color for display
  categoryIcon?: string | null; // Optional icon
  account: string; // Display name or placeholder (source/destination depending on context)
  type: TransactionType; // Keep the type for potential styling/logic
  amount: number; // Amount in cents, sign indicates direction (+ income, - expense)
  currency: string; // Currency code (e.g., "USD", "EUR")
  // Add other fields needed directly for display
};

// Extended type for table rows that includes a flag for showing the date separator
export type TableTransactionWithDateSeparator = TableTransaction & {
  showDateSeparator: boolean;
};

// Add other specific view model types as needed... 