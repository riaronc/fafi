"use client";

import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useCreateAccount, useUpdateAccount } from './useAccounts';
import { accounts as Account } from "@/lib/prisma/client";

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

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutate: updateAccount, isPending: isUpdating } = useUpdateAccount(initialAccount?.id || "");
  
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