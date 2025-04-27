import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AccountType } from "@/lib/prisma/client";
import { z } from "zod";

// GET all accounts
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

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

// Create a new account
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

    // Basic validation
    const accountSchema = z.object({
      name: z.string().min(1, "Name is required"),
      type: z.enum(["CHECKING", "SAVINGS", "CREDIT", "INVESTMENT", "CASH"]),
      balance: z.number(),
      currency: z.string().min(1, "Currency is required"),
      bankId: z.string().nullable().optional(),
    });

    try {
      accountSchema.parse(body);
    } catch (validationError) {
      return NextResponse.json(
        { error: "Invalid account data", details: validationError },
        { status: 400 }
      );
    }

    // Convert balance to cents for storage
    const balanceInCents = Math.round(body.balance * 100);

    // Create the account
    const account = await prisma.accounts.create({
      data: {
        name: body.name,
        type: body.type as AccountType,
        balance: balanceInCents,
        currency: body.currency,
        bankId: body.bankId || null,
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