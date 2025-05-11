import { z } from 'zod';

export const upsertPlannedBudgetSchema = z.object({
  categoryId: z.string().min(1, "Category is required."),
  year: z.number().int().min(2000).max(2100), // Assuming a reasonable year range
  month: z.number().int().min(1).max(12), // 1-indexed month
  amount: z.number().int().min(0, "Amount must be positive."),
});

// We might also want a schema for the full Budget entity if we were creating/editing those directly
// For now, focusing on what's needed for the P&L inline editing. 