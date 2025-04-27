"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useMonobankAccounts, useConnectMonobank, useSaveMonobankAccounts } from './useMonobank';
import { MonobankAccount } from "@/lib/services/monobank";
import { useAccounts } from './useAccounts';

export const useMonobankConnection = (initialHasToken: boolean) => {
  const { toast } = useToast();
  const [monobankToken, setMonobankToken] = useState("");
  const [hasToken, setHasToken] = useState(initialHasToken);
  const [shouldFetchAccounts, setShouldFetchAccounts] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<Record<string, boolean>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // React Query hooks
  const { 
    data: monobankAccounts = [], 
    isLoading: isLoadingAccounts,
    refetch: refetchAccounts
  } = useMonobankAccounts({ enabled: shouldFetchAccounts });
  
  const { mutate: connectMonobank, isPending: isConnecting } = useConnectMonobank();
  const { mutate: saveAccounts, isPending: isSaving } = useSaveMonobankAccounts();
  
  // Get user accounts to check which ones are already added
  const { data: existingAccounts = [] } = useAccounts();

  // Initialize selected accounts when monobank accounts load
  useEffect(() => {
    if (monobankAccounts.length > 0) {
      const initialSelectedAccounts: Record<string, boolean> = {};
      
      // Check which accounts are already added by comparing bankId
      monobankAccounts.forEach(account => {
        const isAlreadyAdded = existingAccounts.some(existingAccount => 
          existingAccount.bankId === account.id
        );
        
        initialSelectedAccounts[account.id] = isAlreadyAdded;
      });
      
      setSelectedAccounts(initialSelectedAccounts);
    }
  }, [monobankAccounts, existingAccounts]);

  const handleOpenDialog = () => {
    if (hasToken && !shouldFetchAccounts) {
      setShouldFetchAccounts(true);
    }
    setIsDialogOpen(true);
  };

  const handleConnect = () => {
    connectMonobank(monobankToken, {
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
    
    saveAccounts(accountsToSave, {
      onSuccess: () => {
        setIsDialogOpen(false);
        
        toast({
          title: "Accounts saved",
          description: `${accountsToSave.length} accounts have been successfully saved.`,
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
    refetchAccounts
  };
}; 