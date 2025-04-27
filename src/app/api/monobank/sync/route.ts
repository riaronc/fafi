import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MonobankAccount } from "@/lib/services/monobank";

// Currency code mapping
const currencyMap: Record<number, string> = {
  980: "UAH",
  840: "USD",
  978: "EUR",
  // Add more as needed
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { accounts } = body;

    if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
      return NextResponse.json(
        { error: "No accounts provided" },
        { status: 400 }
      );
    }

    // Get existing Monobank accounts for this user
    const existingAccounts = await prisma.accounts.findMany({
      where: {
        userId: session.user.id,
        bankId: {
          not: null
        }
      },
    });

    // Create a map of existing accounts by their Monobank ID
    const existingAccountsMap = new Map();
    existingAccounts.forEach((account) => {
      if (account.bankId) {
        existingAccountsMap.set(account.bankId, account);
      }
    });

    // Process each account
    const savedAccounts = [];
    for (const account of accounts as MonobankAccount[]) {
      const existingAccount = existingAccountsMap.get(account.id);
      const accountType = mapAccountType(account.type);
      const currency = currencyMap[account.currencyCode] || "UAH";
      const balance = account.balance; // Monobank already returns balance in cents

      if (existingAccount) {
        // Update existing account
        const updatedAccount = await prisma.accounts.update({
          where: {
            id: existingAccount.id,
          },
          data: {
            balance,
            updatedAt: new Date(),
          },
        });
        savedAccounts.push(updatedAccount);
      } else {
        // Create new account
        const newAccount = await prisma.accounts.create({
          data: {
            name: `Monobank ${account.type}`,
            type: accountType,
            balance,
            currency,
            bankId: account.id,
            userId: session.user.id,
          },
        });
        savedAccounts.push(newAccount);
      }
    }

    return NextResponse.json(savedAccounts);
  } catch (error) {
    console.error("Error syncing Monobank accounts:", error);
    return NextResponse.json(
      { error: "Failed to sync Monobank accounts" },
      { status: 500 }
    );
  }
}

// Map Monobank account types to our account types
function mapAccountType(monobankType: string): "CHECKING" | "CREDIT" | "SAVINGS" {
  switch (monobankType.toLowerCase()) {
    case "black":
    case "white":
    case "platinum":
      return "CREDIT";
    case "fop":
    case "yellow":
      return "CHECKING";
    default:
      return "CHECKING";
  }
} 