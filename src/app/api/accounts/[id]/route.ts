import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    // Check if account exists and belongs to user
    const account = await prisma.accounts.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account not found or you don't have permission to delete it" },
        { status: 404 }
      );
    }

    // Delete the account
    await prisma.accounts.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

// Update account (PATCH)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const id = params.id;

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Check if account exists and belongs to user
    const account = await prisma.accounts.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Account not found or you don't have permission to update it" },
        { status: 404 }
      );
    }

    // Update the account
    const updatedAccount = await prisma.accounts.update({
      where: {
        id,
      },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.type && { type: body.type }),
        ...(body.balance !== undefined && { balance: body.balance }),
        ...(body.currency && { currency: body.currency }),
        ...(body.bankId !== undefined && { bankId: body.bankId }),
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
} 