import { accounts as Account } from "@/lib/prisma/client";

export interface CreateAccountInput {
  name: string;
  type: string;
  balance: number; // in major units (will be converted to cents for storage)
  currency: string;
}

// Format balance (convert from minor units/cents to major)
export const formatBalance = (balance: number, currency: string): string => {
  const formatter = new Intl.NumberFormat(navigator.language || "uk-UA", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(balance / 100);
};

// Fetch all accounts for the user
export const fetchAccounts = async (): Promise<Account[]> => {
  const response = await fetch("/api/accounts", {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch accounts");
  }

  return await response.json();
};

// Create a new account
export const createAccount = async (accountData: CreateAccountInput): Promise<Account> => {
  // Convert balance to cents
  const balanceInCents = Math.round(accountData.balance * 100);
  
  const response = await fetch("/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...accountData,
      balance: balanceInCents,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create account");
  }

  return await response.json();
};

// Update an existing account
export const updateAccount = async (id: string, accountData: Partial<CreateAccountInput>): Promise<Account> => {
  // If balance is provided, convert to cents
  const data = { ...accountData };
  if (typeof data.balance === 'number') {
    data.balance = Math.round(data.balance * 100);
  }
  
  const response = await fetch(`/api/accounts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update account");
  }

  return await response.json();
};

// Delete an account
export const deleteAccount = async (id: string): Promise<void> => {
  const response = await fetch(`/api/accounts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete account");
  }
}; 