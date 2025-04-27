"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { accounts as Account } from "@/lib/prisma/client";
import { 
  useCreateAccountMutation, 
  useUpdateAccountMutation, 
  useDeleteAccountMutation, 
  useAccountsQuery,
  type CreateAccountInput
} from "@/services/accountsService";
import { keepPreviousData } from "@tanstack/react-query";

export interface AccountFormState {
  name: string;
  type: string;
  balance: number;
  currency: string;
  bankId?: string | null;
}

export const defaultAccountForm: AccountFormState = {
  name: "",
  type: "CHECKING",
  balance: 0,
  currency: "UAH",
  bankId: null
};

export const useAccount = () => {
  const { data: accounts = [], isPending } = useAccountsQuery({
    // Keep previous data while fetching new data
    placeholderData: keepPreviousData,
  });
  
  return {
    accounts,
    isLoading: isPending
  };
};

export const useAccountForm = (onSuccess?: () => void, initialAccount?: Account) => {
  const { toast } = useToast();
  const [formState, setFormState] = useState<AccountFormState>(
    initialAccount 
      ? {
          name: initialAccount.name,
          type: initialAccount.type,
          balance: initialAccount.balance, 
          currency: initialAccount.currency,
          bankId: initialAccount.bankId
        } 
      : defaultAccountForm
  );

  // Update form state when initialAccount changes
  useEffect(() => {
    if (initialAccount) {
      setFormState({
        name: initialAccount.name,
        type: initialAccount.type,
        balance: initialAccount.balance,
        currency: initialAccount.currency,
        bankId: initialAccount.bankId
      });
    }
  }, [initialAccount]);

  const { mutate: createAccount, isPending: isCreating } = useCreateAccountMutation();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccountMutation(initialAccount?.id || "");
  
  const isSubmitting = initialAccount ? isUpdating : isCreating;

  const updateField = (field: keyof AccountFormState, value: string | number) => {
    setFormState(prev => ({
      ...prev,
      [field]: field === 'balance' ? parseFloat(value as string) || 0 : value
    }));
  };

  const resetForm = () => {
    setFormState(initialAccount 
      ? {
          name: initialAccount.name,
          type: initialAccount.type,
          balance: initialAccount.balance,
          currency: initialAccount.currency,
          bankId: initialAccount.bankId
        }
      : defaultAccountForm
    );
  };

  const handleSubmit = () => {
    if (initialAccount) {
      // Update existing account
      updateAccount(formState, {
        onSuccess: () => {
          toast({
            title: "Account updated",
            description: "Your account has been successfully updated.",
          });
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to update account",
          });
        }
      });
    } else {
      // Create new account
      createAccount(formState, {
        onSuccess: () => {
          resetForm();
          toast({
            title: "Account created",
            description: "Your account has been successfully created.",
          });
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to create account",
          });
        }
      });
    }
  };

  return {
    formState,
    updateField,
    resetForm,
    handleSubmit,
    isSubmitting
  };
};

export const useDeleteAccountModal = () => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  
  const { mutate: deleteAccount } = useDeleteAccountMutation();

  const confirmDelete = (accountId: string) => {
    setAccountToDelete(accountId);
    setIsConfirmOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmOpen(false);
    setAccountToDelete(null);
  };

  const executeDelete = (accountId?: string) => {
    // Use provided accountId if available, otherwise use the stored accountToDelete
    const idToDelete = accountId || accountToDelete;
    
    if (idToDelete) {
      setIsDeleting(true);
      deleteAccount(idToDelete, {
        onSuccess: () => {
          toast({
            title: "Account deleted",
            description: "Your account has been successfully deleted.",
          });
          setIsConfirmOpen(false);
          setAccountToDelete(null);
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to delete account",
          });
        },
        onSettled: () => {
          setIsDeleting(false);
        }
      });
    }
  };

  return {
    isDeleting,
    isConfirmOpen,
    accountToDelete,
    confirmDelete,
    cancelDelete,
    executeDelete
  };
}; 