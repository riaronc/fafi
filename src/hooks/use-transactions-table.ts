"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  SortingState, 
  PaginationState, 
  RowSelectionState 
} from "@tanstack/react-table";
import { Prisma, TransactionType } from "@prisma/client"; // Import Prisma namespace + Type

import { useToast } from "@/components/ui/use-toast";
import { TransactionFilterValues } from "@/components/features/transactions/transaction-filters";
import { 
  getTransactions, 
  deleteTransaction,
  updateTransactionCategory // Import the specific update action
} from "@/server/actions/transaction.actions";
import { syncMonobankTransactions } from "@/server/actions/monobank.actions";
import { TableTransaction, TableTransactionWithDateSeparator } from "@/types/entities";

// Type for server action options (client-side representation)
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
    description?: string; // Add description if search is part of filters
  };
}

// Type for data coming from the server action AFTER serialization
const transactionWithIncludes = Prisma.validator<Prisma.transactionsDefaultArgs>()({
  include: { category: true, sourceAccount: true, destinationAccount: true },
});
type TransactionWithIncludes = Prisma.transactionsGetPayload<typeof transactionWithIncludes>;
type TransactionFromServer = Omit<TransactionWithIncludes, 'sourceAmount' | 'destinationAmount'> & {
  sourceAmount: number;
  destinationAmount: number;
};

// TODO: Get hasMonobankToken from a user profile query/context
const useHasTokenPlaceholder = () => {
   const [hasToken, setHasToken] = useState(false);
   useEffect(() => { const t = setTimeout(() => setHasToken(true), 500); return () => clearTimeout(t); }, []);
   return hasToken;
}


export function useTransactionsTable() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Table State
  const [sorting, setSorting] = useState<SortingState>([]);
  const [transactionFiltersState, setTransactionFiltersState] = useState<TransactionFilterValues>({});
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 30 });
  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState(''); // For description search
  // State for category editing dialog
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);

  // Server Filters Transformation
  const serverFilters = useMemo(() => {
    const filters: ClientGetTransactionsOptions['filters'] = {};
    if (transactionFiltersState.type) filters.type = transactionFiltersState.type;
    if (transactionFiltersState.accountId) filters.accountId = transactionFiltersState.accountId;
    if (transactionFiltersState.categoryId) filters.categoryId = transactionFiltersState.categoryId;
    if (transactionFiltersState.dateRange?.from) filters.dateFrom = transactionFiltersState.dateRange.from;
    if (transactionFiltersState.dateRange?.to) {
      const dateTo = new Date(transactionFiltersState.dateRange.to);
      dateTo.setHours(23, 59, 59, 999);
      filters.dateTo = dateTo;
    }
    // Integrate global filter (description search)
    if (globalFilter) filters.description = globalFilter; 

    return filters;
  }, [transactionFiltersState, globalFilter]);

  // Active Filter Count Calculation
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (transactionFiltersState.type) count++;
    if (transactionFiltersState.accountId) count++;
    if (transactionFiltersState.categoryId) count++;
    if (transactionFiltersState.dateRange?.from || transactionFiltersState.dateRange?.to) count++;
    if (globalFilter) count++; // Include global filter in count if used via popover
    return count;
  }, [transactionFiltersState, globalFilter]);

  // Server Sorting Transformation
  const serverSort = useMemo(() => {
    if (sorting.length > 0) {
      return {
        sortBy: sorting[0].id,
        sortOrder: sorting[0].desc ? 'desc' : ('asc' as 'asc' | 'desc'),
      };
    }
    return { sortBy: 'date', sortOrder: 'desc' as 'asc' | 'desc' };
  }, [sorting]);
  
  // TODO: Replace placeholder
  const hasMonobankToken = true; // Simulating token presence for now

  // Data Fetching Query
  const transactionsQuery = useQuery({
    queryKey: ['transactions', { pageIndex, pageSize, serverSort, serverFilters }],
    queryFn: () => getTransactions({
      page: pageIndex + 1,
      limit: pageSize,
      sortBy: serverSort.sortBy,
      sortOrder: serverSort.sortOrder,
      filters: serverFilters,
    }),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });


  const rawTransactions: TransactionFromServer[] = transactionsQuery.data?.success
    ? (transactionsQuery.data.data as unknown as TransactionFromServer[])
    : [];
  const paginationInfo = transactionsQuery.data?.success ? transactionsQuery.data.pagination : null;
  const pageCount = paginationInfo?.pages ?? 0;

  // Data Transformation for Table Display (Flat)
  const flatTableData = useMemo<TableTransaction[]>(() => {
    const transformed = rawTransactions.map((tx): TableTransaction => {
      let amount = 0;
      let accountName = 'N/A';
      if (tx.type === 'INCOME') {
        amount = tx.destinationAmount;
        accountName = tx.destinationAccount?.name ?? 'Unknown';
      } else if (tx.type === 'EXPENSE') {
        amount = -tx.sourceAmount;
        accountName = tx.sourceAccount?.name ?? 'Unknown';
      } else { // TRANSFER
        amount = -tx.sourceAmount;
        accountName = `${tx.sourceAccount?.name ?? '?'} -> ${tx.destinationAccount?.name ?? '?'}`;
      }

      const txData: TableTransaction = {
        id: tx.id,
        date: new Date(tx.date),
        description: tx.description ?? '',
        category: tx.category?.name ?? 'Uncategorized',
        bgColor: tx.category?.bgColor,
        fgColor: tx.category?.fgColor,
        categoryIcon: tx.category?.icon ?? 'CircleHelp',
        account: accountName,
        type: tx.type,
        amount: amount,
        currency: tx.sourceAccount?.currency || tx.destinationAccount?.currency || 'USD',
      };

      return txData;
    });
    return transformed;
  }, [rawTransactions]);

  // Add date separator flags to flat data
  const flatDataWithSeparators = useMemo<TableTransactionWithDateSeparator[]>(() => {
    let lastDateString: string | null = null;
    return flatTableData.map((tx) => {
        const currentDateString = tx.date.toDateString();
        const showSeparator = currentDateString !== lastDateString;
        lastDateString = currentDateString;
        return {
            ...tx,
            showDateSeparator: showSeparator,
        };
    });
  }, [flatTableData]);
  

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: (result: DeleteActionResult) => {
      if (result.success) {
        toast({ title: "Transaction Deleted", description: "Transaction removed successfully." });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        setRowSelection({}); // Clear selection after successful delete
      } else {
        toast({ variant: "destructive", title: "Deletion Failed", description: result.error });
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Deletion Error", description: error.message });
    }
  });

  // Sync Mutation
  const syncMutation = useMutation({
    mutationFn: syncMonobankTransactions,
    onMutate: () => toast({ title: "Syncing Transactions..." }),
    onSuccess: (result) => {
      if (result.success) {
        toast({ title: "Sync Complete", description: `${result.totalAdded ?? 0} new added, ${result.totalSkipped ?? 0} skipped.` });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
      } else {
        toast({ variant: "destructive", title: "Sync Failed", description: result.error });
      }
    },
    onError: (error) => toast({ variant: "destructive", title: "Sync Error", description: error.message })
  });

  // Handlers
  const handleDelete = useCallback((id: string) => {
    // TODO: Add confirmation dialog?
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  const handleBulkDelete = useCallback(() => {
    const idsToDelete = Object.keys(rowSelection).filter(key => rowSelection[key]);
    if (idsToDelete.length === 0) return;
    // TODO: Add confirmation dialog for bulk delete?
    idsToDelete.forEach(id => deleteMutation.mutate(id));
    // Selection is cleared in onSuccess
  }, [rowSelection, deleteMutation]);

  const handleSync = useCallback(() => {
    syncMutation.mutate();
  }, [syncMutation]);

  // Handler to open/close the category dialog
  const handleCategoryIconClick = useCallback((transactionId: string | null) => {
    setEditingTransactionId(transactionId);
  }, []);

  return {
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
    editingTransactionId, // <-- Return ID for dialog control
    // Derived State
    activeFilterCount,
    pageCount,
    
    // Data
    transactionsQuery, // Expose query object for loading/error states
    tableData: flatDataWithSeparators, // Return flat data with separator flags

    // Mutations & Handlers
    deleteMutation,
    handleDelete,
    handleBulkDelete,
    syncMutation,
    handleSync,
    handleCategoryIconClick, // <-- Return handler for column
    hasMonobankToken, // Expose token status
  };
} 