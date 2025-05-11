"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  getMonthlyBudgetData,
  upsertMonthlyCategoryBudget,
  createMonthlyBudgetsForPeriod
} from '@/lib/actions/budget.actions';
import type { MonthlyBudgetData, UpsertPlannedBudget, Budget } from '@/types/financials';

interface UseBudgetsProps {
  initialYear: number;
  initialMonth: number;
}

export function useBudgets({ initialYear, initialMonth }: UseBudgetsProps) {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth); // 1-indexed
  const [data, setData] = useState<MonthlyBudgetData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [hasBudgetEntries, setHasBudgetEntries] = useState<boolean>(false);


  const fetchData = useCallback(async (year: number, month: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // console.log(`useBudgets: Fetching data for ${year}-${month}`);
      const monthsData: MonthlyBudgetData[] = [];
      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        const result = await getMonthlyBudgetData(selectedYear, month);
        monthsData.push(result);
      }
      setData(monthsData);
      // console.log("useBudgets: Data received", result);
    } catch (e) {
      console.error("useBudgets: Error fetching budget data:", e);
      setError(e instanceof Error ? e.message : "An unknown error occurred.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // console.log(`useBudgets: useEffect triggered for ${selectedYear}-${selectedMonth}`);

    // if (data) {
    //   setHasBudgetEntries(data.some(month => month.hasBudgetEntries));
    // }

    setHasBudgetEntries(true);

    fetchData(selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, fetchData]);

  const handleMonthChange = (newMonth: number, newYear: number) => {
    // console.log(`useBudgets: Month changing to ${newYear}-${newMonth}`);
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const handleUpsertBudget = async (budgetData: UpsertPlannedBudget): Promise<Budget | null> => {
    // console.log("useBudgets: Upserting budget", budgetData);
    try {
      const updatedBudget = await upsertMonthlyCategoryBudget(budgetData);
      if (updatedBudget) {
        await fetchData(selectedYear, selectedMonth);
        return updatedBudget;
      }
      return null;
    } catch (e) {
      console.error("useBudgets: Error upserting budget:", e);
      setError(e instanceof Error ? e.message : "Error updating budget.");
      return null;
    }
  };

  const handleCreateBudgetsForCurrentPeriod = async (): Promise<{ success: boolean, createdCount: number } | null> => {
    // console.log(`useBudgets: Creating budgets for ${selectedYear}-${selectedMonth}`);
    setIsLoading(true); // Show loading state while this runs
    setError(null);
    try {
      const result = await createMonthlyBudgetsForPeriod(selectedYear, selectedMonth);
      if (result.success) {
        // console.log(`useBudgets: Successfully created ${result.createdCount} budgets.`);
        await fetchData(selectedYear, selectedMonth); // Re-fetch to show new budgets
      }
      return result;
    } catch (e) {
      console.error("useBudgets: Error creating monthly budgets:", e);
      setError(e instanceof Error ? e.message : "Error creating budgets.");
      return null;
    } finally {
      setIsLoading(false); // Ensure loading is turned off
    }
  };

  return {
    selectedYear,
    selectedMonth,
    data,
    isLoading,
    error,
    handleMonthChange,
    handleUpsertBudget,
    hasBudgetEntries,
    handleCreateBudgetsForCurrentPeriod
  };
} 