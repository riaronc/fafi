import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accountKeys } from "./accountsService";
import { fetchWithAuth } from "@/lib/fetchWrapper";

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
  statements: (accountId?: string) => [...monobankKeys.all, 'statements', accountId] as const,
};

// Define query key for transactions (if not already defined elsewhere)
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: string) => [...transactionKeys.lists(), { filters }] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

// API Functions using fetchWithAuth
const fetchClientInfo = async (token: string): Promise<MonobankClientInfo> => {
  const response = await fetchWithAuth('/api/monobank/client-info', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    // Handle non-401 errors
    throw new Error('Failed to fetch Monobank client info');
  }
  return response.json();
};

const storeMonobankToken = async (token: string): Promise<void> => {
  const response = await fetchWithAuth('/api/monobank/token', {
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
  const response = await fetchWithAuth('/api/monobank/sync-accounts', {
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

// fetchMonobankStatements might still be called directly?
// If so, it should also use fetchWithAuth, otherwise, it can be removed if only backend uses it.
// Assuming it might be called directly:
const fetchMonobankStatements = async (accountId: string, fromTimestamp?: number): Promise<any[]> => {
  let apiUrl = `/api/monobank/statements?accountId=${encodeURIComponent(accountId)}`;
  if (fromTimestamp) {
    apiUrl += `&from=${fromTimestamp}`;
  }
  const response = await fetchWithAuth(apiUrl);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch Monobank statements');
  }
  return response.json();
};

// Updated syncTransactionsToDatabase to use fetchWithAuth
const syncTransactionsToDatabase = async (): Promise<{ message: string; totalAdded: number; totalSkipped: number; details: any }> => {
  const response = await fetchWithAuth('/api/monobank/sync-transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to trigger Monobank transaction sync via backend');
  }
  return response.json();
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

// Keep the original statement fetching mutation if needed elsewhere
export const useFetchMonobankStatementsMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ accountId, fromTimestamp }: { accountId: string; fromTimestamp?: number }) => 
      fetchMonobankStatements(accountId, fromTimestamp),
    onSuccess: (data, variables) => {
      console.log(`Successfully fetched ${data.length} statements for Monobank account ${variables.accountId}`);
    },
    onError: (error) => {
      console.error("Error fetching Monobank statements directly:", error);
    }
  });
};

// Updated Mutation hook: Triggers backend sync for *all* linked accounts
export const useSyncMonobankTransactionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn no longer takes accountId
    mutationFn: () => syncTransactionsToDatabase(), 
    onSuccess: (data) => {
      console.log(`Backend sync result: ${data.message}`);
      console.log(`Details:`, data.details);
      // Invalidate transactions list query to refetch data for the table
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      // Also invalidate accounts list query to update the updatedAt timestamp display
      queryClient.invalidateQueries({ queryKey: accountKeys.lists() });
    },
    onError: (error) => {
      console.error("Error triggering Monobank transaction sync via backend:", error);
      // Handle error appropriately (e.g., show toast notification)
    }
  });
}; 