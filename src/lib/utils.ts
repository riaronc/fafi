import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format balance (convert from minor units/cents to major)
export const formatBalance = (balance: number, currency: string): string => {
  const symbol = currency === 'UAH' ? '₴' : currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency;
  const amount = (balance / 100).toFixed(2);
  return symbol === '₴' ? `${amount} ${symbol}` : `${symbol}${amount}`;
};

// Currency code mapping (used by formatMonobankBalance and potentially sync)
// Should map to ISO 4217 codes (UAH, USD, EUR)
export const currencyMap: Record<number, string> = {
  980: "UAH", // Hryvnia
  840: "USD", // US Dollar
  978: "EUR", // Euro
};

// Format monobank balance
export const formatMonobankBalance = (balance: number, currencyCode: number): string => {
  const locale = typeof navigator !== 'undefined' ? navigator.language : "en-US";
  const currency = currencyMap[currencyCode] || "UAH"; // Default to UAH code
  const formatter = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency.toLowerCase(),
    minimumFractionDigits: 2,
  });
  
  const numericBalance = typeof balance === 'number' ? balance : 0;
  return formatter.format(numericBalance / 100);
};
