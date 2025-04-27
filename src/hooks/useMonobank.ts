"use client";

import { useState, useEffect, useMemo } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { 
  useMonobankAccountsQuery, 
  useStoreMonobankTokenMutation, 
  useSyncMonobankAccountsMutation,
  type MonobankAccount
} from "@/services/monobankService";
import { useAccount } from './useAccount';

export const useMonobankConnection = (initialHasToken: boolean) => {
  const { toast } = useToast();
  const [monobankToken, setMonobankToken] = useState("");
  const [hasToken, setHasToken] = useState(initialHasToken);
  const [shouldFetchAccounts, setShouldFetchAccounts] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Record<string, boolean>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // React Query hooks
  const { 
    data,
    isLoading: isLoadingAccounts,
    refetch: refetchAccounts
  } = useMonobankAccountsQuery({ 
    enabled: shouldFetchAccounts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Ensure monobankAccounts is always an array
  const monobankAccounts = Array.isArray(data) ? data : [];
  
  const { mutate: storeToken, isPending: isConnecting } = useStoreMonobankTokenMutation();
  const { mutate: syncAccounts, isPending: isSaving } = useSyncMonobankAccountsMutation();
  
  // Get user accounts to check which ones are already added
  const { accounts: existingAccounts = [] } = useAccount();
  
  // Create a memoized Set of existing account IDs for quick lookup
  const existingAccountIds = useMemo(() => {
    return new Set(
      existingAccounts
        .filter(account => account.bankId)
        .map(account => account.bankId)
    );
  }, [existingAccounts]);

  // Initialize selected accounts when monobank accounts load or existing accounts change
  useEffect(() => {
    if (monobankAccounts.length > 0) {
      setSelectedAccounts(prev => {
        const updatedSelection = { ...prev };
        
        // Check which accounts are already added by comparing bankId
        monobankAccounts.forEach(account => {
          const isAlreadyInDb = existingAccountIds.has(account.id);
          
          // Only update if the value would change
          if (updatedSelection[account.id] !== isAlreadyInDb) {
            updatedSelection[account.id] = isAlreadyInDb;
          }
        });
        
        return updatedSelection;
      });
    }
  }, [monobankAccounts, existingAccountIds]);

  const handleOpenDialog = () => {
    if (hasToken && !shouldFetchAccounts) {
      setShouldFetchAccounts(true);
    }
    setIsDialogOpen(true);
  };

  const handleConnect = () => {
    storeToken(monobankToken, {
      onSuccess: () => {
        setHasToken(true);
        setShouldFetchAccounts(true);
        
        toast({
          title: "Monobank connected",
          description: "Your Monobank account has been successfully connected.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to connect to Monobank",
        });
      }
    });
  };

  const toggleAccountSelection = (accountId: string, selected: boolean) => {
    const isAlreadyInDb = existingAccountIds.has(accountId);

    // If the account is already in the database, only allow checking (not unchecking)
    if (isAlreadyInDb && !selected) {
      return; // Prevent unchecking accounts that are already in the database
    }

    // For accounts not yet in the database, allow both checking and unchecking
    setSelectedAccounts(prev => ({
      ...prev,
      [accountId]: selected
    }));
  };

  const handleSaveAccounts = () => {
    const accountsToSave = monobankAccounts.filter(
      account => selectedAccounts[account.id]
    );
    
    if (accountsToSave.length === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one account to save.",
      });
      return;
    }
    
    syncAccounts(accountsToSave, {
      onSuccess: () => {
        setIsDialogOpen(false);
        
        toast({
          title: "Accounts saved",
          description: `${accountsToSave.length} accounts have been successfully saved and will appear in your accounts list.`,
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to save accounts",
        });
      }
    });
  };

  return {
    monobankToken,
    setMonobankToken,
    hasToken,
    monobankAccounts,
    selectedAccounts,
    isDialogOpen,
    setIsDialogOpen,
    isLoading: isConnecting || isLoadingAccounts || isSaving,
    isLoadingAccounts,
    isConnecting,
    isSaving,
    handleOpenDialog,
    handleConnect,
    handleSaveAccounts,
    toggleAccountSelection,
    refetchAccounts,
    existingAccountIds
  };
}; 