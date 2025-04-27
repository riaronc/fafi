import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Validate token by making a test request to Monobank API
    const testResponse = await fetch('https://api.monobank.ua/personal/client-info', {
      headers: {
        'X-Token': token,
      },
    });

    if (!testResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid Monobank token' },
        { status: 400 }
      );
    }

    // Store token in database
    await prisma.users.update({
      where: { id: session.user.id },
      data: { monobankToken: token },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing Monobank token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 