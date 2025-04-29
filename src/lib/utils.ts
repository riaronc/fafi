import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format balance (convert from minor units/cents to major)
export const formatBalance = (balance: number, currency: string): string => {
  // Use a default locale if navigator is not available (e.g., during SSR)
  const locale = typeof navigator !== 'undefined' ? navigator.language : "en-US"; 
  const formatter = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  // Ensure balance is a number
  const numericBalance = typeof balance === 'number' ? balance : 0;
  
  return formatter.format(numericBalance / 100);
};

// Currency code mapping (used by formatMonobankBalance)
// Consider moving this to lib/constants.ts if used elsewhere
export const currencyMap: Record<number, string> = {
  980: "UAH",
  840: "USD",
  978: "EUR",
};

// Format monobank balance
export const formatMonobankBalance = (balance: number, currencyCode: number): string => {
  const locale = typeof navigator !== 'undefined' ? navigator.language : "en-US";
  const currency = currencyMap[currencyCode] || "UAH"; // Default or lookup
  const formatter = new Intl.NumberFormat(locale || "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  const numericBalance = typeof balance === 'number' ? balance : 0;
  return formatter.format(numericBalance / 100);
};
