import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Monobank token is required" },
        { status: 400 }
      );
    }

    // Save token to the user's record
    await prisma.users.update({
      where: {
        id: session.user.id,
      },
      data: {
        monobankToken: token,
      },
    });

    return NextResponse.json(
      { message: "Monobank token saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving Monobank token:", error);
    return NextResponse.json(
      { error: "Failed to save Monobank token" },
      { status: 500 }
    );
  }
} 