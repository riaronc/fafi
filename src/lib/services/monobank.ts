// Currency code mapping
export const currencyMap: Record<number, string> = {
  980: "UAH",
  840: "USD",
  978: "EUR",
  // Add more currencies as needed
};

export interface MonobankAccount {
  id: string;
  currencyCode: number;
  balance: number;
  creditLimit: number;
  type: string;
  iban: string;
  maskedPan: string[];
}

// Format monobank balance
export const formatMonobankBalance = (balance: number, currencyCode: number): string => {
  const formatter = new Intl.NumberFormat(navigator.language || "uk-UA", {
    style: "currency",
    currency: currencyMap[currencyCode] || "UAH",
    minimumFractionDigits: 2,
  });
  
  return formatter.format(balance / 100);
};

// Connect Monobank with token
export const connectMonobank = async (token: string) => {
  const saveTokenResponse = await fetch("/api/monobank/connect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!saveTokenResponse.ok) {
    const error = await saveTokenResponse.json();
    throw new Error(error.message || "Failed to save token");
  }

  return true;
};

// Fetch Monobank accounts
export const fetchMonobankAccounts = async () => {
  const response = await fetch("/api/monobank/accounts", {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch Monobank accounts");
  }

  const data = await response.json();
  return data.accounts as MonobankAccount[];
};

// Save selected Monobank accounts
export const saveMonobankAccounts = async (accounts: MonobankAccount[]) => {
  if (accounts.length === 0) {
    throw new Error("No accounts selected");
  }
  
  const response = await fetch("/api/monobank/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accounts }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to save accounts");
  }

  return await response.json();
}; 