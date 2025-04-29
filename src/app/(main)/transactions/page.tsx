"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
  PaginationState, // Added for pagination
} from "@tanstack/react-table";
import { 
  Plus, Download, Search, Filter, Loader2, RefreshCw,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, // Added for pagination
  MoreHorizontal // Added for row actions
} from "lucide-react";
import { Prisma } from "@prisma/client"; // Import Prisma namespace
import { TransactionType } from "@prisma/client"; // Import TransactionType

// Local components (Consider moving Table related ones to features/transactions)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem, // Added for filter
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/components/ui/use-toast";
import { TableTransaction } from "@/types/entities"; // Import table data type
import { 
  getTransactions, 
  deleteTransaction, // Import deleteTransaction action
} from "@/server/actions/transaction.actions"; // Import server action
import { syncMonobankTransactions } from "@/server/actions/monobank.actions"; // Import server action
import { formatBalance } from "@/lib/utils"; // Import formatBalance
import { format } from "date-fns"; // Import date-fns format
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select components
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Add Popover imports
import { TransactionFilters, TransactionFilterValues } from "@/components/features/transactions/transaction-filters"; // Import the new filter component

// --- Define expected data shape from getTransactions action ---
const transactionWithIncludes = Prisma.validator<Prisma.transactionsDefaultArgs>()({
  include: { category: true, sourceAccount: true, destinationAccount: true },
});
type TransactionWithIncludes = Prisma.transactionsGetPayload<typeof transactionWithIncludes>;

// Define expected data shape from getTransactions action
// We need a type that reflects the data *after* JSON serialization
// where Decimal becomes number and relations are included.
type TransactionFromServer = Omit<TransactionWithIncludes, 'sourceAmount' | 'destinationAmount'> & {
  sourceAmount: number;
  destinationAmount: number;
};

// --- Define Local Type for Server Action Options ---
// Mirrors the structure expected by getTransactions server action
interface ClientGetTransactionsOptions {
  page?: number;
  limit?: number;
  sortBy?: string; 
  sortOrder?: "asc" | "desc";
  filters?: {
    dateFrom?: Date;
    dateTo?: Date;
    categoryId?: string;
    accountId?: string;
    type?: TransactionType;
    description?: string;
  };
}

// TODO: Get hasMonobankToken from a user profile query/context
const useHasTokenPlaceholder = () => {
   const [hasToken, setHasToken] = useState(false);
   useEffect(() => { const t = setTimeout(() => setHasToken(true), 500); return () => clearTimeout(t); }, []);
   return hasToken;
}

// --- Define Table Columns ---
// Define columns function outside component to avoid re-creation
const getColumns = (handleDelete: (id: string) => void): ColumnDef<TableTransaction>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
       <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
       </Button>
    ),
    cell: ({ row }) => format(row.getValue("date"), "PPP"), // Format date
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("description")}</div>,
    enableSorting: false, // Typically don't sort by long description
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>, // Style category
    enableSorting: true,
    // TODO: Add filterFn for category dropdown
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => row.getValue("account"),
    enableSorting: false, // Sorting by account name might not be needed
    // TODO: Add filterFn for account dropdown
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant={row.getValue("type") === 'INCOME' ? 'default' : row.getValue("type") === 'EXPENSE' ? 'destructive' : 'secondary'}>{row.getValue("type")}</Badge>,
    enableSorting: true,
    // TODO: Add filterFn for type dropdown
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      const currency = row.original.currency; // Access currency from original data
      const formatted = formatBalance(amount, currency);
      const color = amount < 0 ? 'text-red-600' : amount > 0 ? 'text-green-600' : 'text-muted-foreground';
      return <div className={`text-right font-medium ${color}`}>{formatted}</div>;
    },
    enableSorting: true,
  },
   {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href={`/transactions/${transaction.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem> 
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700 focus:bg-red-100"
              // Call handleDelete passed into getColumns
              onClick={() => handleDelete(transaction.id)} 
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];

// --- Type for Delete Action Result ---
type DeleteActionResult = { success: boolean; error?: string };

export default function TransactionsPageClient() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // --- State for Table and Filters ---
  const [sorting, setSorting] = useState<SortingState>([]);
  const [transactionFiltersState, setTransactionFiltersState] = useState<TransactionFilterValues>({}); // State for filters from component
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // State for Popover
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]); 
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // --- Transform Filters for Server Action ---
  const serverFilters = useMemo(() => {
    // Use the state from the TransactionFilters component
    const filters: ClientGetTransactionsOptions['filters'] = {}; 
    
    // Map state from TransactionFilters component to server action format
    if (transactionFiltersState.type) {
      filters.type = transactionFiltersState.type;
    }
    if (transactionFiltersState.accountId) {
      filters.accountId = transactionFiltersState.accountId;
    }
    if (transactionFiltersState.categoryId) {
      filters.categoryId = transactionFiltersState.categoryId;
    }
    if (transactionFiltersState.dateRange?.from) {
      filters.dateFrom = transactionFiltersState.dateRange.from;
    }
    if (transactionFiltersState.dateRange?.to) {
      // Adjust dateTo to be inclusive of the selected day
      const dateTo = new Date(transactionFiltersState.dateRange.to);
      dateTo.setHours(23, 59, 59, 999);
      filters.dateTo = dateTo;
    }
    
    // Keep description filter from search input (if needed separately)
    // Or integrate search input into TransactionFilters component
    // For now, assuming search is separate and uses columnFilters state (need to add it back if so)
    // Example if keeping separate search:
    // const descFilter = columnFilters.find(f => f.id === 'description');
    // if (descFilter && typeof descFilter.value === 'string') {
    //   filters.description = descFilter.value;
    // }

    return filters;
  }, [transactionFiltersState]); // Depend on the filters state

  // --- Calculate Active Filter Count ---
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (transactionFiltersState.type) count++;
    if (transactionFiltersState.accountId) count++;
    if (transactionFiltersState.categoryId) count++;
    if (transactionFiltersState.dateRange?.from || transactionFiltersState.dateRange?.to) count++;
    // Add count for description search if implemented separately
    return count;
  }, [transactionFiltersState]);

  // --- Determine Sorting for Server Action ---
  const serverSort = useMemo(() => {
    if (sorting.length > 0) {
      return {
        sortBy: sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : ('asc' as 'asc' | 'desc'),
      };
    }
    return { sortBy: 'date', sortOrder: 'desc' as 'asc' | 'desc' }; // Default sort
  }, [sorting]);

  // TODO: Get hasMonobankToken properly
  const hasMonobankToken = useHasTokenPlaceholder();

  // --- Data Fetching with TanStack Query ---
  const transactionsQuery = useQuery({
    // Include serverSort and serverFilters in the queryKey
    queryKey: ['transactions', { pageIndex, pageSize, serverSort, serverFilters }], 
    queryFn: () => getTransactions({ 
      page: pageIndex + 1, 
      limit: pageSize,
      sortBy: serverSort.sortBy,
      sortOrder: serverSort.sortOrder, 
      filters: serverFilters, 
    }), 
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
  });

  // Use the explicit type for the fetched data
  // Cast to unknown first to bridge the gap between Prisma's Decimal-based type 
  // and the number-based type received after serialization.
  const rawTransactions: TransactionFromServer[] = transactionsQuery.data?.success 
      ? (transactionsQuery.data.data as unknown as TransactionFromServer[]) 
      : [];
  const paginationInfo = transactionsQuery.data?.success ? transactionsQuery.data.pagination : null;
  const pageCount = paginationInfo?.pages ?? 0;

  // --- Data Transformation --- 
  const tableData = useMemo<TableTransaction[]>(() => {
    // Use the TransactionFromServer type here for clarity
    return rawTransactions.map((tx: TransactionFromServer): TableTransaction => {
      let amount = 0;
      let accountName = 'N/A';
      if (tx.type === 'INCOME') {
        // Amount is already a number (integer cents)
        amount = tx.destinationAmount; 
        accountName = tx.destinationAccount?.name ?? 'Unknown';
      } else if (tx.type === 'EXPENSE') {
        // Amount is already a number (integer cents), negate it
        amount = -tx.sourceAmount; 
        accountName = tx.sourceAccount?.name ?? 'Unknown';
      } else { // TRANSFER
         // Amount is already a number (integer cents), negate it for display consistency
         amount = -tx.sourceAmount; 
         accountName = `${tx.sourceAccount?.name ?? '?'} -> ${tx.destinationAccount?.name ?? '?'}`;
      }
      
      return {
        id: tx.id,
        date: new Date(tx.date), 
        description: tx.description ?? '',
        category: tx.category?.name ?? 'Uncategorized', 
        categoryColor: tx.category?.bgColor,
        categoryIcon: tx.category?.icon,
        account: accountName,
        type: tx.type,
        amount: amount, // Now an integer (cents)
        // Ensure currency is fetched correctly - might need adjustment based on account relations
        currency: tx.sourceAccount?.currency || tx.destinationAccount?.currency || 'USD', 
      };
    });
  }, [rawTransactions]);

  // --- Mutations --- 
  const syncMutation = useMutation({
     mutationFn: syncMonobankTransactions,
      onMutate: () => toast({ title: "Syncing Transactions..."}),
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Sync Complete", description: `${result.totalAdded} new added, ${result.totalSkipped} skipped.` });
            queryClient.invalidateQueries({ queryKey: ['transactions'] }); 
         } else {
            toast({ variant: "destructive", title: "Sync Failed", description: result.error });
         }
      },
      onError: (error) => toast({ variant: "destructive", title: "Sync Error", description: error.message })
  });

  // Delete Transaction Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (result: DeleteActionResult, transactionId) => {
      if (result.success) {
        toast({ title: "Transaction Deleted", description: "Transaction removed successfully." });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      } else {
        toast({ variant: "destructive", title: "Deletion Failed", description: result.error });
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Deletion Error", description: error.message });
    }
  });
  
  // Handler for single delete from row action
  const handleDelete = (id: string) => {
    // TODO: Add confirmation dialog?
    deleteMutation.mutate(id);
  };

  // Handler for bulk delete
  const handleBulkDelete = () => {
    const idsToDelete = Object.keys(rowSelection).filter(key => rowSelection[key]);
    if (idsToDelete.length === 0) return;
    // TODO: Add confirmation dialog for bulk delete?
    
    // Call mutation for each selected ID
    // Consider a batch delete action on the server for performance if deleting many rows
    idsToDelete.forEach(id => deleteMutation.mutate(id));
    
    // Reset selection after initiating deletes
    setRowSelection({}); 
  };

  // --- Table Setup --- 
  const columns = useMemo(() => getColumns(handleDelete), [handleDelete]); 
  
  const table = useReactTable({
    data: tableData, 
    columns, 
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true, // Filtering is now manual via transactionFiltersState
    pageCount: pageCount, 
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), 
    enableRowSelection: true, 
  });

  // Get selected row IDs from table state
  const selectedRowIds = Object.keys(rowSelection).filter(key => rowSelection[key]);

  // --- Render --- 
  return (
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
        
        {/* Toolbar */} 
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Search Input - Keep or integrate into Filters component */}
          <div className="relative w-full max-w-sm">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
               type="search"
               placeholder="Search descriptions..."
               className="w-full bg-background pl-8"
               // onChange={(e) => table.getColumn("description")?.setFilterValue(e.target.value)} // This uses table state, might need separate state
             />
          </div>
          {/* Action Buttons */} 
          <div className="flex gap-2 flex-wrap">
             {/* Filters Popover */}
             <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                     <Filter className="mr-2 h-4 w-4" />Filter
                     {/* Add badge for active filters */}
                     {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="ml-2 rounded-full px-1.5 py-0.5 text-xs">
                           {activeFilterCount}
                        </Badge>
                     )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                   <TransactionFilters 
                     onChange={setTransactionFiltersState}
                     initialFilters={transactionFiltersState} // Pass current state back
                   />
                </PopoverContent>
             </Popover>
             
             <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Export</Button>
             {/* Monobank Sync */}
             {hasMonobankToken && (
                 <Button variant="outline" size="sm" onClick={() => syncMutation.mutate()} disabled={syncMutation.isPending}>
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
              <Button variant="outline" size="sm">Categorize</Button> 
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600"
                onClick={handleBulkDelete} // Connect bulk delete handler
                disabled={deleteMutation.isPending} // Disable while deleting
              >
                 {/* Show spinner if any delete is pending */}
                 {deleteMutation.isPending ? <LoadingSpinner size="sm" className="mr-2"/> : null}
                 Delete
              </Button> 
            </div>
         )}
        
         {/* Table */}
        <Card className="flex-1 overflow-hidden relative border shadow-sm rounded-lg">
          {transactionsQuery.isFetching && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                <LoadingSpinner size="lg" />
            </div>
          )}
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {!transactionsQuery.isFetching && table.getRowModel().rows.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={columns.length} className="h-24 text-center">
                         No transactions found.
                       </TableCell>
                     </TableRow>
                   ) : (
                     table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                     ))
                   )}
                </TableBody>
              </Table>
            </div>

             {/* Pagination */} 
            <div className="p-4 border-t">
               <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                     {table.getFilteredSelectedRowModel().rows.length} of{" "}
                     {paginationInfo?.total ?? table.getFilteredRowModel().rows.length} row(s) selected.
                  </div>
                  <div className="flex items-center space-x-2">
                     <span className="text-sm">Rows per page</span>
                      <Select
                        value={`${table.getState().pagination.pageSize}`}
                        // Add explicit type for value
                        onValueChange={(value: string) => table.setPageSize(Number(value))}
                      >
                        <SelectTrigger className="h-8 w-[70px]">
                           <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                           {[10, 20, 30, 40, 50].map((size) => (
                              <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
                           ))}
                        </SelectContent>
                      </Select>
                     <div className="text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                     </div>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0 hidden lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                     ><span className="sr-only">Go to first page</span><ChevronsLeft className="h-4 w-4" /></Button>
                     <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                     ><span className="sr-only">Go to previous page</span><ChevronLeft className="h-4 w-4" /></Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                     ><span className="sr-only">Go to next page</span><ChevronRight className="h-4 w-4" /></Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0 hidden lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                     ><span className="sr-only">Go to last page</span><ChevronsRight className="h-4 w-4" /></Button>
                  </div>
               </div>
            </div>

          </CardContent>
        </Card>
      </div>
  );
} 