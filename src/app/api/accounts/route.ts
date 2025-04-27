import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { AccountType } from "@/lib/prisma/client";

// Validation schema for account creation
const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  type: z.enum(["CHECKING", "SAVINGS", "CREDIT", "INVESTMENT", "CASH"]),
  balance: z.number().or(z.string().transform(val => Math.round(Number(val)))), // Store as cents
  currency: z.string().min(1, "Currency is required"),
  bankId: z.string().nullable().optional(),
});

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
    
    // Validate the request body
    const result = accountSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid account data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, type, balance, currency, bankId } = result.data;

    // Create the account
    const account = await prisma.accounts.create({
      data: {
        name,
        type: type as AccountType,
        balance, // Already in cents from the validation
        currency,
        bankId: bankId || null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    // Get all accounts for the user
    const accounts = await prisma.accounts.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
} 