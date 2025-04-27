import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MONOBANK_API_URL = "https://api.monobank.ua/personal/client-info";

export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's Monobank token from the database
    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { monobankToken: true },
    });

    if (!user?.monobankToken) {
      return NextResponse.json(
        { error: "Monobank token not found" },
        { status: 404 }
      );
    }

    // Make request to Monobank API
    const response = await fetch(MONOBANK_API_URL, {
      headers: {
        "X-Token": user.monobankToken,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "Failed to fetch data from Monobank",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Monobank client info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
