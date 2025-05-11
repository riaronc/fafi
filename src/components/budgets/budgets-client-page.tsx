"use client";

import { useBudgets } from "@/hooks/use-budgets";
import MonthYearSelector from "./month-year-selector";
import BudgetTable from "./budget-table";
import { useMemo, useRef, useState } from 'react';
import type { MonthlyBudgetData, UpsertPlannedBudget } from "@/types/financials";
import { createYearlyBudgets } from "@/lib/actions/budget.actions";

interface BudgetsClientPageProps {
  initialYear: number;
  initialMonth: number;
}

export default function BudgetsClientPage({ initialYear, initialMonth }: BudgetsClientPageProps) {
  const {
    selectedYear,
    selectedMonth,
    data,
    isLoading,
    error,
    handleMonthChange,
    handleUpsertBudget,
    hasBudgetEntries,
    handleCreateBudgetsForCurrentPeriod
  } = useBudgets({ initialYear, initialMonth });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreatingYearly, setIsCreatingYearly] = useState(false);
  const skipResetRef = useRef(false);

  const handleSaveAll = async (updates: Array<{ categoryId: string; year: number; month: number; amount: number }>) => {
    skipResetRef.current = true;
    try {
      const upsertData: UpsertPlannedBudget[] = updates.map(u => ({ categoryId: u.categoryId, year: u.year, month: u.month, amount: u.amount }));
      await Promise.all(upsertData.map(update => handleUpsertBudget(update)));
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to save changes:', error);
    } finally {
      skipResetRef.current = false;
    }
  };

  const showCreateBudgetButton = useMemo(() => {
    if (isLoading) return false;
    return hasBudgetEntries === false;
  }, [isLoading, hasBudgetEntries]);

  const handleCreateYearlyBudgets = async () => {
    setIsCreatingYearly(true);
    try {
      const result = await createYearlyBudgets(selectedYear);
      if (result.success) {
        await handleCreateBudgetsForCurrentPeriod?.(); 
      } else {
        console.error('Failed to create yearly budgets:', result.message);
      }
    } catch (error) {
      console.error('Error creating yearly budgets:', error);
    } finally {
      setIsCreatingYearly(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <MonthYearSelector
            currentYear={selectedYear}
            onYearChange={(newYear) => handleMonthChange(selectedMonth, newYear)}
          />
          {!isLoading && !error && data && !showCreateBudgetButton && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isEditMode 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white focus:ring-yellow-500' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500'
              }`}
            >
              {isEditMode ? 'Cancel Edit' : 'Edit Mode'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!isLoading && !error && showCreateBudgetButton && (
        <div className="text-center py-4">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            No planned budgets found for {new Date(selectedYear, selectedMonth -1).toLocaleString('default', {month: 'long'})} {selectedYear}.
          </p>
          <button
            onClick={handleCreateYearlyBudgets}
            className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isLoading || isCreatingYearly}
          >
            {isCreatingYearly ? 'Creating Budgets...' : `Create Budgets for ${selectedYear}`}
          </button>
        </div>
      )}

      {!isLoading && !error && data && !showCreateBudgetButton && (
        <BudgetTable 
          quarterlyData={data}
          isEditMode={isEditMode}
          onSave={handleSaveAll}
        />
      )}
      
      {(isLoading || (!data && !showCreateBudgetButton)) && !error && (
         <div className="text-center py-4">
           <p className="text-gray-500 dark:text-gray-400">Loading budget data or no data available for the selected period.</p>
         </div>
      )}
    </div>
  );
} 