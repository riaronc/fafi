"use client";

import React from 'react';
import type { PnlData, CategoryType, MonthlyBudgetData } from '@/types/financials';

interface BudgetTableProps {
  quarterlyData: MonthlyBudgetData[]; // Should always be 12 months
  isEditMode: boolean;
  onSave: (updates: Array<{ categoryId: string; year: number; month: number; amount: number }>) => Promise<void>;
}

interface CategoryRowProps {
  categoryId: string;
  categoryName: string;
  categoryType: CategoryType;
  monthlyData: Array<{
    plannedAmount: number;
    actualAmount: number;
    difference: number;
  }>;
  isEditMode: boolean;
  onValueChange?: (categoryId: string, monthIndex: number, value: number) => void; // Optional for total rows
  isTotalRow?: boolean; // To prevent editing on total rows
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  categoryId,
  categoryName,
  categoryType,
  monthlyData,
  isEditMode,
  onValueChange,
  isTotalRow = false,
}) => {
  return (
    <tr className={`border-b border-gray-200 dark:border-gray-700 ${!isTotalRow ? 'hover:bg-gray-50 dark:hover:bg-gray-750' : ''} ${isTotalRow ? 'font-semibold bg-gray-50 dark:bg-gray-750' : ''}`}>
      <td className={`sticky left-0 z-10 w-48 p-2 text-sm text-gray-700 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 ${isTotalRow ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}`}>{categoryName}</td>
      <td className="p-2">
        <div className="flex">
          {monthlyData.map((data, monthIndex) => {
            const deltaValue = data.difference;
            let deltaClassName = 'text-gray-500 dark:text-gray-400'; // Default for zero
            if (deltaValue !== 0) {
              if (categoryType === 'INCOME') {
                deltaClassName = deltaValue > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
              } else { // EXPENSE
                deltaClassName = deltaValue < 0 ? 'text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/50': 'text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/50' ;
              }
            }

            return (
              <div key={`${categoryId}-${monthIndex}`} className="flex border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                <div className="w-24 p-2 text-right text-sm">
                  {isEditMode && !isTotalRow ? (
                    <input
                      type="number"
                      value={data.plannedAmount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value >= 0 && onValueChange) {
                          onValueChange(categoryId, monthIndex, value);
                        }
                      }}
                      className="w-20  border-0 bg-gray-100 dark:bg-gray-700 text-right focus:ring-0 focus:outline-none dark:text-white"
                    />
                  ) : (
                    <span className="block w-20">
                      {data.plannedAmount.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  )}
                </div>
                <div className="w-24 p-2 text-right text-sm text-gray-700 dark:text-gray-300">
                  <span className="block w-20">
                    {data.actualAmount.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className={`w-24 p-2 text-right text-sm font-medium ${deltaClassName}`}>
                  <span className="block w-20">
                    {data.difference.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </td>
    </tr>
  );
};

const renderCategorySection = (
  entries: PnlData[],
  type: CategoryType,
  title: string,
  monthlySourceData: MonthlyBudgetData[], // Renamed from quarterlyData to avoid confusion
  isEditMode: boolean,
  onValueChange: (categoryId: string, monthIndex: number, value: number) => void
) => {
  const uniqueCategories = Array.from(new Set(
    entries
      .filter(e => e.categoryType === type)
      .map(e => e.categoryId)
  )).map(categoryId => {
    return entries.find(e => e.categoryId === categoryId)!;
  });

  if (uniqueCategories.length === 0 && (type === "INCOME" || type === "EXPENSE")) return null;

  return (
    <>
      <tr className="bg-gray-100 dark:bg-gray-800">
        <th className="sticky left-0 z-20 w-48 bg-gray-100 dark:bg-gray-800 p-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700">{title}</th>
        <th className="p-2">
          <div className="flex">
            {monthlySourceData.map((monthData) => (
              <div key={`header-sub-${monthData.year}-${monthData.month}`} className="flex border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                <div className="w-24 p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Planned
                </div>
                <div className="w-24 p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actual
                </div>
                <div className="w-24 p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Delta
                </div>
              </div>
            ))}
          </div>
        </th>
      </tr>
      <tr className="bg-gray-50 dark:bg-gray-700">
        <th className="sticky left-0 z-20 w-48 bg-gray-50 dark:bg-gray-700 p-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700"></th>
        <th className="p-2">
          <div className="flex">
            {monthlySourceData.map((monthData) => (
              <div key={`month-${monthData.year}-${monthData.month}`} className="w-72 p-2 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 last:border-r-0 bg-gray-100 dark:bg-gray-800">
                {new Date(monthData.year, monthData.month - 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
              </div>
            ))}
          </div>
        </th>
      </tr>
      {uniqueCategories.map((entry) => {
        const monthlyData = monthlySourceData.map(monthDataSource => {
          const monthPnlEntry = monthDataSource.pnlEntries.find(e => e.categoryId === entry.categoryId);
          return {
            plannedAmount: monthPnlEntry?.plannedAmount ?? 0,
            actualAmount: monthPnlEntry?.actualAmount ?? 0,
            difference: monthPnlEntry?.difference ?? 0
          };
        });

        return (
          <CategoryRow
            key={entry.categoryId} // Key should be unique for the category itself
            categoryId={entry.categoryId}
            categoryName={entry.categoryName}
            categoryType={entry.categoryType}
            monthlyData={monthlyData}
            isEditMode={isEditMode}
            onValueChange={onValueChange}
          />
        );
      })}
    </>
  );
};

export default function BudgetTable({ quarterlyData, isEditMode, onSave }: BudgetTableProps) {
  const [editedValues, setEditedValues] = React.useState<Record<string, Array<number>>>({});
  
  const handleValueChange = (categoryId: string, monthIndex: number, value: number) => {
    setEditedValues(prev => {
      const newCategoryValues = [...(prev[categoryId] || Array(quarterlyData.length).fill(null))];
      newCategoryValues[monthIndex] = value;
      return {
        ...prev,
        [categoryId]: newCategoryValues
      };
    });
  };

  const handleSave = async () => {
    const updates = Object.entries(editedValues).flatMap(([categoryId, values]) =>
      values.reduce((acc, amount, monthIndex) => {
        if (amount !== null) { // Only include actual changes
          acc.push({
            categoryId,
            year: quarterlyData[monthIndex].year,
            month: quarterlyData[monthIndex].month,
            amount
          });
        }
        return acc;
      }, [] as Array<{ categoryId: string; year: number; month: number; amount: number }>)
    );
    
    if (updates.length > 0) {
        await onSave(updates);
    }
    setEditedValues({}); // Clear edits after save
  };

  const allPnlEntriesForCategories = React.useMemo(() => {
    // Consolidate all PnlData entries from all months to get a full list of unique categories and their types.
    // This ensures that if a category exists in any month, it's picked up.
    const categoryMap = new Map<string, PnlData>();
    quarterlyData.forEach(monthData => {
      monthData.pnlEntries.forEach(pnlEntry => {
        if (!categoryMap.has(pnlEntry.categoryId)) {
          categoryMap.set(pnlEntry.categoryId, pnlEntry);
        }
      });
    });
    return Array.from(categoryMap.values());
  }, [quarterlyData]);

  const totalsData = React.useMemo(() => {
    const incomeTotals = quarterlyData.map(month => ({
      plannedAmount: month.totalPlannedIncome,
      actualAmount: month.totalActualIncome,
      difference: month.totalActualIncome - month.totalPlannedIncome,
    }));
    const expenseTotals = quarterlyData.map(month => ({
      plannedAmount: month.totalPlannedExpenses,
      actualAmount: month.totalActualExpenses,
      difference: month.totalActualExpenses - month.totalPlannedExpenses,
    }));
    const netTotals = quarterlyData.map(month => ({
      plannedAmount: month.totalPlannedIncome - month.totalPlannedExpenses,
      actualAmount: month.totalActualIncome - month.totalActualExpenses,
      difference: (month.totalActualIncome - month.totalActualExpenses) - (month.totalPlannedIncome - month.totalPlannedExpenses),
    }));
    return { incomeTotals, expenseTotals, netTotals };
  }, [quarterlyData]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {renderCategorySection(allPnlEntriesForCategories, "INCOME" as CategoryType, "INCOME", quarterlyData, isEditMode, handleValueChange)}
                  {renderCategorySection(allPnlEntriesForCategories, "EXPENSE" as CategoryType, "EXPENSE", quarterlyData, isEditMode, handleValueChange)}
                </tbody>
                <tfoot className="border-t-2 border-gray-300 dark:border-gray-600">
                  <CategoryRow
                    categoryId="TOTAL_INCOME"
                    categoryName="Total Income"
                    categoryType="INCOME"
                    monthlyData={totalsData.incomeTotals}
                    isEditMode={false} // Totals are not editable
                    isTotalRow={true}
                  />
                  <CategoryRow
                    categoryId="TOTAL_EXPENSE"
                    categoryName="Total Expenses"
                    categoryType="EXPENSE"
                    monthlyData={totalsData.expenseTotals}
                    isEditMode={false}
                    isTotalRow={true}
                  />
                  <CategoryRow
                    categoryId="NET_TOTAL"
                    categoryName="Net (Income - Expenses)"
                    categoryType="INCOME" // Positive Net is good
                    monthlyData={totalsData.netTotals}
                    isEditMode={false}
                    isTotalRow={true}
                  />
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {isEditMode && Object.keys(editedValues).length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
} 