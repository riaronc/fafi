import { getMonthlyBudgetData } from "@/lib/actions/budget.actions";
import BudgetsClientPage from "@/components/budgets/budgets-client-page";
import { Suspense } from "react";

export default async function BudgetsPage() {
  // Determine initial month and year (e.g., current month)
  const currentDate = new Date();
  const initialYear = currentDate.getFullYear();
  const initialMonth = currentDate.getMonth() + 1; // Month is 1-indexed for getMonthlyBudgetData

  // Fetch initial data on the server
  // In a real app, you might pass this initial data to the client component
  // or let the client component fetch it. For simplicity and to follow RSC patterns,
  // we can fetch initial data here and pass it, or the client component can also fetch.
  // The hook `use-budgets` will handle client-side fetching for subsequent month changes.

  // For this setup, BudgetsClientPage will handle its own data fetching via the hook,
  // including the initial load. This simplifies passing data and allows the client to manage its state.

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white pl-11 lg:pl-0">Budgets</h1>
      <Suspense fallback={<BudgetsPageSkeleton />}>
        <BudgetsClientPage initialYear={initialYear} initialMonth={initialMonth} />
      </Suspense>
    </div>
  );
}

function BudgetsPageSkeleton() {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div> {/* Month Navigator Placeholder */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-300 dark:bg-gray-700 rounded w-full"></div> /* Table Row Placeholder */
          ))}
        </div>
      </div>
    </div>
  );
} 