import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "./accountsService";

// Constants
export const MONOBANK_API_URL = "https://api.monobank.ua/personal/client-info";

// Currency code mapping
export const currencyMap: Record<number, string> = {
  980: "UAH",
  840: "USD",
  978: "EUR",
  // Add more currencies as needed
};

// Format monobank balance
export const formatMonobankBalance = (balance: number, currencyCode: number): string => {
  const formatter = new Intl.NumberFormat(navigator.language || "uk-UA", {
    style: "currency",
    currency: currencyMap[currencyCode] || "UAH",
    minimumFractionDigits: 2,
  });
  
  return formatter.format(balance / 100);
};

// Types
export interface MonobankAccount {
  id: string;
  sendId?: string;
  currencyCode: number;
  balance: number;
  creditLimit: number;
  type: string;
  iban: string;
  maskedPan: string[];
}

export interface MonobankClientInfo {
  clientId: string;
  name: string;
  webHookUrl: string;
  permissions: string;
  accounts: MonobankAccount[];
}

// Query keys
export const monobankKeys = {
  all: ['monobank'] as const,
  clientInfo: () => [...monobankKeys.all, 'clientInfo'] as const,
  accounts: () => [...monobankKeys.all, 'accounts'] as const,
};

// API Functions - these would be called by React Query
const fetchClientInfo = async (token: string): Promise<MonobankClientInfo> => {
  // This should be called from the backend to avoid exposing tokens in the frontend
  // We'll use our own API route as a proxy to the Monobank API
  const response = await fetch('/api/monobank/client-info', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Monobank client info');
  }
  
  return response.json();
};

const storeMonobankToken = async (token: string): Promise<void> => {
  const response = await fetch('/api/monobank/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Failed to store Monobank token');
  }
};

const syncAccountsToDatabase = async (accounts: MonobankAccount[]): Promise<void> => {
  const response = await fetch('/api/monobank/sync-accounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accounts }),
  });

  if (!response.ok) {
    throw new Error('Failed to sync Monobank accounts');
  }
};

// React Query Hooks
export const useMonobankClientInfoQuery = (options = {}) => {
  return useQuery({
    queryKey: monobankKeys.clientInfo(),
    queryFn: () => fetchClientInfo(''), // token is stored in the backend
    ...options,
  });
};

export const useMonobankAccountsQuery = (options = {}) => {
  return useQuery({
    queryKey: monobankKeys.accounts(),
    queryFn: async () => {
      const clientInfo = await fetchClientInfo(''); // token is stored in the backend
      return clientInfo.accounts;
    },
    ...options,
  });
};

export const useStoreMonobankTokenMutation = () => {
  return useMutation({
    mutationFn: (token: string) => storeMonobankToken(token),
  });
};

export const useSyncMonobankAccountsMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (accounts: MonobankAccount[]) => syncAccountsToDatabase(accounts),
    onSuccess: () => {
      // Invalidate accounts query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    }
  });
}; 