import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {prisma} from '@/lib/prisma';
import { currencyMap } from '@/services/monobankService';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { accounts } = body;

    if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
      return NextResponse.json(
        { error: 'Valid accounts array is required' },
        { status: 400 }
      );
    }

    // Process each account
    const results = await Promise.all(
      accounts.map(async (monobankAccount) => {
        // Convert currency code to currency string
        const currency = currencyMap[monobankAccount.currencyCode] || 'UAH';
        
        // Check if account already exists
        const existingAccount = await prisma.accounts.findFirst({
          where: {
            userId: session.user.id,
            bankId: monobankAccount.id,
          },
        });

        if (existingAccount) {
          // Update existing account
          return prisma.accounts.update({
            where: { id: existingAccount.id },
            data: {
              balance: monobankAccount.balance,
              updatedAt: new Date(),
            },
          });
        } else {
          // Create new account
          return prisma.accounts.create({
            data: {
              name: `${monobankAccount.type.toUpperCase()} - ${currency}`,
              type: "CREDIT",
              balance: monobankAccount.balance,
              currency,
              bankId: monobankAccount.id,
              userId: session.user.id,
            },
          });
        }
      })
    );

    return NextResponse.json({ 
      success: true,
      message: `Synced ${results.length} accounts`,
      accounts: results
    });
  } catch (error) {
    console.error('Error syncing Monobank accounts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 