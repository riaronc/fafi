import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accounts as Account } from "@/lib/prisma/client";

export type CreateAccountInput = {
  name: string;
  type: string;
  balance: number;
  currency: string;
  bankId?: string | null;
};

// Format balance (convert from minor units/cents to major)
export const formatBalance = (balance: number, currency: string): string => {
  const formatter = new Intl.NumberFormat(navigator.language || "uk-UA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(balance / 100);
};

// Query keys
export const accountKeys = {
  all: ['accounts'] as const,
  lists: () => [...accountKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...accountKeys.lists(), { filters }] as const,
  details: () => [...accountKeys.all, 'detail'] as const,
  detail: (id: string) => [...accountKeys.details(), id] as const,
};

// API Functions - these would be called by React Query
const fetchAccounts = async (): Promise<Account[]> => {
  const response = await fetch('/api/accounts');
  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }
  return response.json();
};

const createAccount = async (data: CreateAccountInput): Promise<Account> => {
  // Convert balance to cents for storage
  const balanceInCents = Math.round(data.balance * 100);
  
  const response = await fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      balance: balanceInCents,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create account');
  }
  
  return response.json();
};

const updateAccount = async (id: string, data: Partial<CreateAccountInput>): Promise<Account> => {
  // If balance is provided, convert to cents
  const updatedData = { ...data };
  if (typeof updatedData.balance === 'number') {
    updatedData.balance = Math.round(updatedData.balance * 100);
  }
  
  const response = await fetch(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update account');
  }
  
  return response.json();
};

const deleteAccount = async (id: string): Promise<void> => {
  const response = await fetch(`/api/accounts/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
};

// React Query Hooks
export const useAccountsQuery = (options = {}) => {
  return useQuery({
    queryKey: accountKeys.lists(),
    queryFn: fetchAccounts,
    ...options,
  });
};

export const useCreateAccountMutation = () => {
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

export const useUpdateAccountMutation = (id: string) => {
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

export const useDeleteAccountMutation = () => {
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