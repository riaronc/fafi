// Types mirroring the Monobank API structure

export interface MonobankAccount {
  id: string; // Monobank account ID
  sendId?: string;
  currencyCode: number;
  balance: number; // In minor units (cents)
  creditLimit: number; // In minor units (cents)
  type: string; // e.g., "black", "platinum"
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

export interface MonobankStatementItem {
  id: string; // Transaction ID from Monobank
  time: number; // Unix timestamp (seconds)
  description: string;
  mcc: number;
  originalMcc: number;
  amount: number; // In minor units (cents), negative for expenses
  operationAmount: number; // Amount in transaction currency
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number; // Balance after transaction
  hold: boolean;
  receiptId?: string;
  invoiceId?: string;
  counterEdrpou?: string;
  counterIban?: string;
} 