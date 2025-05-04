import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { accounts as Account } from "@/server/db/client"; // Use Prisma types directly

// Import Server Actions
import { getAccounts } from "@/server/actions/account.actions";
import { syncMonobankTransactions, checkMonobankTokenStatus } from "@/server/actions/monobank.actions";

interface UseAccountsProps {
  initialAccounts: Account[];
  initialHasMonobankToken: boolean;
}

export function useAccounts({ initialAccounts, initialHasMonobankToken }: UseAccountsProps) {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null);
  const [deleteAccountName, setDeleteAccountName] = useState<string | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMonoDialogOpen, setIsMonoDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query for Monobank token status
  const { data: tokenStatusResult } = useQuery({
    queryKey: ['monobankTokenStatus'],
    queryFn: checkMonobankTokenStatus,
    initialData: { success: true, hasToken: initialHasMonobankToken },
    staleTime: 5 * 60 * 1000, // Check status periodically or rely on invalidation
    refetchOnWindowFocus: true,
  });
  const hasMonobankToken = tokenStatusResult?.success ? tokenStatusResult.hasToken : initialHasMonobankToken;

  // Query for accounts
  const { data: accountsResult, isLoading: isLoadingAccounts, isError, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
    initialData: { success: true, data: initialAccounts } as any, // Keep as any for initial data flexibility
    staleTime: 5 * 60 * 1000,
  });
  const accounts: Account[] = accountsResult?.success ? (accountsResult.data ?? []) : [];

  // Monobank Sync Transactions Mutation
   const syncTransactionsMutation = useMutation({
      mutationFn: syncMonobankTransactions,
      onMutate: () => {
         toast({ title: "Syncing Transactions...", description: "Fetching latest Monobank statements..." });
      },
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Sync Complete", description: `${result.totalAdded ?? 0} new transactions added, ${result.totalSkipped ?? 0} skipped.` });
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            // Consider invalidating dashboard/report queries if necessary
            // queryClient.invalidateQueries({ queryKey: ['dashboard'] });
         } else {
            toast({ variant: "destructive", title: "Sync Failed", description: result.error });
         }
      },
      onError: (error) => {
         toast({ variant: "destructive", title: "Sync Error", description: error.message });
      }
   });

  // Handlers for Dialogs
  const handleOpenAddDialog = () => {
    setEditingAccount(null);
    setIsAddAccountOpen(true);
  };

  const handleOpenEditDialog = (account: Account) => {
    setEditingAccount(account);
    setIsEditAccountOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditAccountOpen(false);
    // Delay clearing editingAccount to avoid flicker during close animation
    setTimeout(() => setEditingAccount(null), 300);
  };

  const handleOpenDeleteDialog = (account: Account) => {
    setDeleteAccountId(account.id);
    setDeleteAccountName(account.name);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    // Delay clearing delete info
    setTimeout(() => {
        setDeleteAccountId(null);
        setDeleteAccountName(undefined);
    }, 300);
  };

  const handleOpenMonoDialog = () => setIsMonoDialogOpen(true);
  const handleCloseMonoDialog = () => setIsMonoDialogOpen(false);

  return {
    // State
    accounts,
    editingAccount,
    deleteAccountId,
    deleteAccountName,
    hasMonobankToken,
    // Dialog Visibility
    isAddAccountOpen,
    isEditAccountOpen,
    isDeleteDialogOpen,
    isMonoDialogOpen,
    // Loading/Error States
    isLoadingAccounts,
    isErrorAccounts: isError,
    errorAccounts: error,
    isSyncingTransactions: syncTransactionsMutation.isPending,
    // Mutations
    syncMonobankTransactions: syncTransactionsMutation.mutate,
    // Handlers
    handleOpenAddDialog,
    setIsAddAccountOpen, // Expose setter directly
    handleOpenEditDialog,
    handleCloseEditDialog,
    setIsEditAccountOpen, // Expose setter directly
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    setIsDeleteDialogOpen, // Expose setter directly
    handleOpenMonoDialog,
    handleCloseMonoDialog,
    setIsMonoDialogOpen, // Expose setter directly
  };
} 