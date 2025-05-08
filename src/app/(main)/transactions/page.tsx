"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Download, Search, Filter, Loader2, RefreshCw } from "lucide-react";

// Local components & hooks
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TransactionFilters } from "@/components/features/transactions/transaction-filters";
import { TransactionTable } from "@/components/features/transactions/transaction-table";
import { useTransactionsTable } from "@/hooks/use-transactions-table";
import { CategoryChangeDialog } from "@/components/features/transactions/category-change-dialog";

export default function TransactionsPage() {
  const {
    // State
    sorting,
    setSorting,
    pagination,
    setPagination,
    rowSelection,
    setRowSelection,
    transactionFiltersState,
    setTransactionFiltersState,
    globalFilter,
    setGlobalFilter,
    editingTransactionId,
    // Derived State
    activeFilterCount,
    pageCount,
    // Data
    transactionsQuery,
    tableData,
    // Mutations & Handlers
    deleteMutation,
    handleDelete,
    handleBulkDelete,
    syncMutation,
    handleSync,
    handleCategoryIconClick,
    hasMonobankToken,
  } = useTransactionsTable();

  const [isFiltersOpen, setIsFiltersOpen] = useState(false); 
  const selectedRowIds = Object.keys(rowSelection);

  const isCategoryDialogOpen = !!editingTransactionId;

  const handleCloseCategoryDialog = () => {
      // Logic to set editingTransactionId to null needs to be in the hook's mutation success/error or passed explicitly
      // For now, this can be empty if hook handles it, or call hook setter if exposed.
      // Let's ensure the hook handles it.
  };

  return (
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight pl-11 lg:pl-0">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Search Input integrated with hook's global filter */}
          <div className="relative w-full max-w-sm">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
               type="search"
               placeholder="Search descriptions..."
               value={globalFilter ?? ''} // Controlled input
               onChange={event => setGlobalFilter(event.target.value)} // Update global filter state
               className="w-full bg-background pl-8"
             />
          </div>
          {/* Action Buttons */} 
          <div className="flex gap-2 flex-wrap">
             {/* Filters Popover */}
             <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                     <Filter className="mr-2 h-4 w-4" />Filter
                     {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0.5 text-xs">
                           {activeFilterCount}
                        </Badge>
                     )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                   <TransactionFilters 
                     onChange={setTransactionFiltersState} // Connect to hook state
                     initialFilters={transactionFiltersState} // Pass current state
                   />
                </PopoverContent>
             </Popover>
             
             <Button variant="outline" size="sm" disabled><Download className="mr-2 h-4 w-4" />Export</Button> {/* TODO: Implement Export */}
             
             {/* Monobank Sync */}
             {hasMonobankToken && (
                 <Button variant="outline" size="sm" onClick={handleSync} disabled={syncMutation.isPending}>
                    {syncMutation.isPending ? <LoadingSpinner size="sm" /> : <RefreshCw className="mr-2 h-4 w-4"/>}
                    Sync Bank
                 </Button>
             )}
             
             {/* Add Transaction */} 
             <Button size="sm" asChild>
               <Link href="/transactions/new"><Plus className="mr-2 h-4 w-4" />Add Transaction</Link>
             </Button>
          </div>
        </div>
        
         {/* Bulk Actions Bar */}
         {selectedRowIds.length > 0 && (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-md text-sm">
              <span>{selectedRowIds.length} selected</span>
              <Button variant="outline" size="sm" disabled>Categorize</Button> {/* TODO: Implement Bulk Categorize */} 
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:bg-red-100 hover:text-red-700"
                onClick={handleBulkDelete} // Use handler from hook
                disabled={deleteMutation.isPending} // Use state from hook
              >
                 {deleteMutation.isPending ? <LoadingSpinner size="sm" className="mr-2"/> : null}
                 Delete
              </Button> 
            </div>
         )}
        
         {/* Table Component */}
         <TransactionTable 
            tableData={tableData}
            isLoading={transactionsQuery.isLoading}
            isFetching={transactionsQuery.isFetching}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            sorting={sorting}
            setSorting={setSorting}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={pageCount}
            handleDelete={handleDelete} 
            handleCategoryClick={handleCategoryIconClick}
         />

         {/* Category Change Dialog - Render conditionally */} 
         {editingTransactionId && (
              <CategoryChangeDialog
                  transactionId={editingTransactionId}
                  isOpen={isCategoryDialogOpen}
                  onClose={() => handleCategoryIconClick(null)}
              />
         )}
      </div>
  );
} 