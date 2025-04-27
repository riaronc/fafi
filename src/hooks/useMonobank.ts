"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { 
  connectMonobank, 
  fetchMonobankAccounts, 
  saveMonobankAccounts,
  type MonobankAccount
} from "@/lib/services/monobank";

// Query keys
export const monobankKeys = {
  all: ['monobank'] as const,
  accounts: () => [...monobankKeys.all, 'accounts'] as const,
};

// Get Monobank accounts
export const useMonobankAccounts = ({ enabled = false }) => {
  return useQuery({
    queryKey: monobankKeys.accounts(),
    queryFn: fetchMonobankAccounts,
    enabled,
  });
};

// Connect Monobank
export const useConnectMonobank = () => {
  return useMutation({
    mutationFn: (token: string) => connectMonobank(token),
  });
};

// Save Monobank accounts
export const useSaveMonobankAccounts = () => {
  return useMutation({
    mutationFn: (accounts: MonobankAccount[]) => saveMonobankAccounts(accounts),
  });
}; 