import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Monobank API base URL
const MONOBANK_API_BASE = "https://api.monobank.ua/personal/statement";

export async function GET(request: NextRequest) {
  try {
    // 1. Check Authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Get User's Monobank Token
    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { monobankToken: true },
    });

    if (!user?.monobankToken) {
      return NextResponse.json(
        { error: "Monobank token not found. Please connect your account." },
        { status: 404 }
      );
    }

    // 3. Get Query Parameters (accountId, fromTimestamp)
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const fromTimestamp = searchParams.get('from'); // Optional timestamp (seconds)
    // const toTimestamp = searchParams.get('to'); // Optional 'to' timestamp

    if (!accountId) {
      return NextResponse.json(
        { error: "Account ID ('accountId') is required" },
        { status: 400 }
      );
    }
    
    // Basic validation for timestamp if provided
    if (fromTimestamp && !/^\d+$/.test(fromTimestamp)) {
       return NextResponse.json(
        { error: "Invalid 'from' timestamp format. Must be seconds since epoch." },
        { status: 400 }
      );
    }

    // 4. Construct Monobank API URL
    // Format: https://api.monobank.ua/personal/statement/{accountId}/{from}/{to?}
    let monobankUrl = `${MONOBANK_API_BASE}/${accountId}`;
    if (fromTimestamp) {
       monobankUrl += `/${fromTimestamp}`;
       // Add 'to' timestamp if needed: monobankUrl += `/${toTimestamp}`;
    }
    // If no 'from' timestamp, Monobank defaults to the last 31 days + 1 hour.

    console.log(`Proxying request to Monobank: ${monobankUrl}`); // Log for debugging

    // 5. Make Request to Monobank API
    const response = await fetch(monobankUrl, {
      headers: {
        "X-Token": user.monobankToken,
      },
      // Add cache control if appropriate, Monobank has rate limits (1 req/60s per account)
      // cache: 'no-store' 
    });

    // 6. Handle Monobank API Response
    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore if response is not JSON
      }
      console.error("Monobank API Error:", { status: response.status, data: errorData });
      
      // Forward Monobank's error if possible, otherwise generic error
      return NextResponse.json(
        {
          error: errorData?.errorDescription || "Failed to fetch statements from Monobank",
          details: errorData, // Include details if available
        },
        { status: response.status } // Forward Monobank's status code
      );
    }

    // 7. Return Successful Response
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error fetching Monobank statements via proxy:", error);
    // Avoid leaking internal error details
    return NextResponse.json(
      { error: "Internal server error while fetching statements." },
      { status: 500 }
    );
  }
} 