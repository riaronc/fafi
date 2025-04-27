"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchAccounts, 
  createAccount, 
  updateAccount, 
  deleteAccount, 
  type CreateAccountInput 
} from "@/lib/services/accounts";
import { accounts as Account } from "@/lib/prisma/client";

// Query keys
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...accountKeys.lists(), { filters }] as const,
  details: () => [...accountKeys.all, 'detail'] as const,
  detail: (id: string) => [...accountKeys.details(), id] as const,
};

// Hooks

// Get all accounts
export const useAccounts = () => {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: fetchAccounts,
  });
};

// Create a new account
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateAccountInput) => createAccount(data),
    onSuccess: (newAccount) => {
      // Get the current accounts from the cache
      const currentAccounts = queryClient.getQueryData<Account[]>(accountKeys.lists()) || [];
      
      // Update the cache with the new account
      queryClient.setQueryData(
        accountKeys.lists(), 
        [newAccount, ...currentAccounts]
      );
    },
  });
};

// Update an account
export const useUpdateAccount = (id: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<CreateAccountInput>) => updateAccount(id, data),
    onSuccess: (updatedAccount) => {
      // Update the list query
      queryClient.setQueryData(
        accountKeys.lists(),
        (old: Account[] | undefined) => 
          old 
            ? old.map(account => account.id === id ? updatedAccount : account) 
            : undefined
      );
      
      // Update the detail query
      queryClient.setQueryData(accountKeys.detail(id), updatedAccount);
    },
  });
};

// Delete an account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => deleteAccount(id),
    onSuccess: (_, id) => {
      // Update the list query
      queryClient.setQueryData(
        accountKeys.lists(),
        (old: Account[] | undefined) => 
          old ? old.filter(account => account.id !== id) : undefined
      );
      
      // Remove the detail query
      queryClient.removeQueries({ queryKey: accountKeys.detail(id) });
    },
  });
}; 