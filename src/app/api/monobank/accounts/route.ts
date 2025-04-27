import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "You must be logged in to perform this action" },
        { status: 401 }
      );
    }

    // Get the user's Monobank token
    const user = await prisma.users.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        monobankToken: true,
      },
    });

    if (!user?.monobankToken) {
      return NextResponse.json(
        { error: "Monobank token not found" },
        { status: 400 }
      );
    }

    // Fetch the data from Monobank API
    const response = await fetch("https://api.monobank.ua/personal/client-info", {
      method: "GET",
      headers: {
        "X-Token": user.monobankToken,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Monobank API error:", errorText);
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: "Invalid Monobank token" },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: "Failed to fetch data from Monobank API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Return the accounts data
    return NextResponse.json({
      clientName: data.name,
      accounts: data.accounts,
    });
  } catch (error) {
    console.error("Error fetching Monobank accounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch Monobank accounts" },
      { status: 500 }
    );
  }
} 