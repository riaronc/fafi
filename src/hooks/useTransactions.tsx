"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSyncMonobankTransactionsMutation } from '@/services/monobankService';
import { useToast } from '@/components/ui/use-toast';
import { useTransactionsQuery, type ApiTransaction } from '@/services/transactionsService';

// Type for the data displayed in the table - adapted from ApiTransaction
// This transformation happens within the hook
export type TableTransaction = {
  id: string;
  date: Date;
  description: string;
  category: string; // Display name or placeholder
  account: string; // Display name or placeholder
  amount: number; // Amount in cents, sign indicates direction (+ income, - expense)
  // Keep original API data for potential use in actions/details
  originalApiData: ApiTransaction;
}

// Format currency helper
const formatCurrency = (amountInCents: number) => {
  return (amountInCents / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD' // TODO: Make currency dynamic
  });
};

// Define hook props (if needed for filtering/pagination passed to useTransactionsQuery)
interface UseTransactionsProps {
  // filters?: any;
}

export const useTransactions = (props?: UseTransactionsProps) => {
  const { toast } = useToast();

  // Fetch transactions using React Query
  const { data: fetchedData, isLoading: isLoadingTransactions, error: fetchError } = useTransactionsQuery(/* props?.filters */);

  // Log fetched data and errors
  if (fetchError) {
    console.error("Error fetching transactions:", fetchError);
    // Optionally show a persistent error toast?
  }
  console.log("Fetched API Data:", fetchedData);

  // States for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Use the backend sync mutation
  const { mutate: syncWithBackend, isPending: isSyncing } = useSyncMonobankTransactionsMutation();

  // Transform fetched data for the table
  const tableData = useMemo<TableTransaction[]>(() => {
    if (!fetchedData) return [];
    console.log("Transforming fetched data for table..."); // Log transformation start
    const transformed = fetchedData.map((tx: ApiTransaction): TableTransaction => {
      // Determine amount sign based on type
      let amount = tx.sourceAmount; // Default to sourceAmount
      if (tx.type === 'EXPENSE') {
        amount = -Math.abs(tx.sourceAmount);
      } else if (tx.type === 'INCOME') {
        amount = Math.abs(tx.sourceAmount);
      } // Transfers might need special handling if displayed differently
      
      return {
        id: tx.id,
        date: new Date(tx.date), // Convert string date to Date object
        description: tx.description,
        // Use related names if available, otherwise use ID or placeholder
        category: tx.category?.name ?? (tx.categoryId ? `ID: ${tx.categoryId}` : 'Uncategorized'),
        account: tx.sourceAccount?.name ?? (tx.sourceAccountId ? `ID: ${tx.sourceAccountId}` : 'Unknown Account'),
        amount: amount, // Amount in cents with correct sign
        originalApiData: tx, // Store original data
      };
    });
    console.log("Transformed Table Data:", transformed); // Log transformed data
    return transformed;
  }, [fetchedData]);

  // Simplified sync function
  const syncMonobankTransactions = () => {
    toast({
      title: "Syncing Monobank...",
      description: "Requesting sync for all linked accounts...",
    });

    syncWithBackend(undefined, {
      onSuccess: (result) => {
        toast({ title: "Sync Request Complete", description: `${result.message}. Table refreshing...` });
      },
      onError: (error) => {
        toast({ variant: "destructive", title: "Monobank Sync Failed", description: error.message || "Request failed." });
      }
    });
  };

  // Define Table Columns for the new TableTransaction structure
  const columns = useMemo<ColumnDef<TableTransaction>[]>(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          disabled={!table.getCoreRowModel().rows.length}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >Date <ArrowUpDown className="ml-2 h-4 w-4" /></Button>,
      cell: ({ row }) => {
        const date = row.getValue("date") as Date;
        // Use 'en-GB' locale for DD/MM/YYYY format
        return <div className="font-medium">{date instanceof Date && !isNaN(date.getTime()) ? date.toLocaleDateString('uk-UA') : 'Invalid Date'}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="truncate max-w-xs">{row.getValue("description") as string}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
      // TODO: Add filter function based on category name/ID if needed
    },
    {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => <div>{row.getValue("account")}</div>,
      // TODO: Add filter function based on account name/ID if needed
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <div className="text-right"><Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >Amount <ArrowUpDown className="ml-2 h-4 w-4" /></Button></div>,
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number; // Amount in cents with sign
        return (
          <div className={`text-right font-medium ${amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(amount)} {/* Format cents amount */}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const transaction = row.original; // Now TableTransaction
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><ChevronDown className="h-4 w-4" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/transactions/${transaction.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={() => alert(`Deleting ${transaction.id}`)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ], []);

  // Create Table Instance
  const table = useReactTable({
    data: tableData, // Use the transformed data
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      // pagination: // TODO: Handle pagination state if server-side
    },
    // TODO: Add server-side pagination/filtering/sorting handlers if needed
    // pageCount: calculatedPageCount, // From fetched data
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Use this for client-side pagination
    getSortedRowModel: getSortedRowModel(),
  });

  console.log("Table Row Model Rows:", table.getRowModel().rows); // Log rows passed to table instance

  const selectedRowIds = useMemo(() => {
    return table.getFilteredSelectedRowModel().rows.map(row => row.original.id);
  }, [rowSelection, table]);

  // Return values from the hook - separated loading states
  return {
    table,
    columns,
    selectedRowIds,
    syncMonobankTransactions,
    isLoadingTransactions, // Loading state for fetching table data
    isSyncing, // Loading state specifically for the sync operation
  };
};

// Removed mapMonoStatementToTransaction helper - no longer needed here 