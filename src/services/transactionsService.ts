import { useQuery } from '@tanstack/react-query';
import { fetchWithAuth } from '@/lib/fetchWrapper'; // Import the wrapper

// Define the shape of transaction data returned by the API
// This should match the structure from your /api/transactions endpoint
// including any populated relations like account or category names.
export interface ApiTransaction {
  id: string;
  bankTransactionId?: string | null;
  date: string; // Dates usually come as ISO strings
  description: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  sourceAmount: number; // Stored as cents
  destinationAmount: number; // Stored as cents
  sourceAccountId?: string | null;
  destinationAccountId?: string | null;
  categoryId?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  // Optional: Include related data if your API endpoint populates it
  sourceAccount?: { id: string; name: string } | null;
  destinationAccount?: { id: string; name: string } | null;
  category?: { id: string; name: string; icon?: string; fgColor?: string; bgColor?: string; } | null;
  user?: { id: string; name?: string } | null;
}

// Query keys for transactions
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters?: string) => [...transactionKeys.lists(), { filters: filters ?? 'all' }] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

// Define the shape of the API response
interface TransactionsApiResponse {
  data: ApiTransaction[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// API function to fetch transactions
const fetchTransactions = async (/* filters?: any */): Promise<TransactionsApiResponse> => {
  // TODO: Add filtering/pagination parameters to the API call
  const response = await fetchWithAuth('/api/transactions'); // Use fetchWithAuth
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to fetch transactions');
  }
  return response.json(); // Returns the full { data: [], pagination: {} } object
};

// React Query hook to fetch transactions - Added select option
export const useTransactionsQuery = (/* filters?: any */ options = {}) => {
  return useQuery<TransactionsApiResponse, Error, ApiTransaction[]>({ // Specify types for data, error, and selected data
    queryKey: transactionKeys.list(/* filters */), // Use appropriate key with filters
    queryFn: () => fetchTransactions(/* filters */),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Select the 'data' array from the API response
    select: (apiResponse) => apiResponse.data,
    ...options,
  });
}; 