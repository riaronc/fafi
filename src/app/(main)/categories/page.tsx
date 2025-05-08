"use client";

import { CategoriesDataTable } from "@/components/features/categories/categories-data-table";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight pl-11 lg:pl-0">Categories</h1>
        <p className="text-muted-foreground">Manage your income and expense categories</p>
      </div>

      {/* 
        Wrap in Suspense if data fetching were happening here (Server Component) 
        or if CategoriesDataTable itself used Suspense internally.
        Since fetching is inside CategoriesDataTable with useQuery, 
        it handles its own loading state.
      */}
      {/* <Suspense fallback={<LoadingSpinner size="lg" />}> */}
        <CategoriesDataTable />
      {/* </Suspense> */}
    </div>
  );
} 