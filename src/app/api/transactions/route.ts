import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verify } from 'jsonwebtoken';

// Helper function to get user ID from token
async function getUserIdFromToken(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'fallback_secret_key_change_in_production') as { id: string };
    return decoded.id;
  } catch (error) {
    return null;
  }
}

// GET - Fetch all transactions for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Get transactions with pagination
    const transactions = await prisma.transactions.findMany({
      where: {
        userId,
      },
      include: {
        sourceAccount: true,
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
      skip,
      take: limit,
    });
    
    // Get total count for pagination
    const totalCount = await prisma.transactions.count({
      where: {
        userId,
      },
    });
    
    return NextResponse.json({
      data: transactions,
      pagination: {
        total: totalCount,
        page,
        limit,
        pages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

// POST - Create a new transaction
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { sourceAmount, destinationAmount, date, description, type, sourceAccountId, destinationAccountId, categoryId } = body;
    
    // Validate required fields
    if (!sourceAmount || !date || !description || !type || !sourceAccountId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create transaction
    const transaction = await prisma.transactions.create({
      data: {
        sourceAmount: parseFloat(sourceAmount),
        destinationAmount: parseFloat(destinationAmount || sourceAmount),
        date: new Date(date),
        description,
        type,
        userId,
        sourceAccountId,
        destinationAccountId: type === 'TRANSFER' ? destinationAccountId : null,
        categoryId,
      },
    });
    
    // Update account balance for source account
    await prisma.accounts.update({
      where: {
        id: sourceAccountId,
      },
      data: {
        balance: {
          decrement: type === 'EXPENSE' || type === 'TRANSFER' ? parseFloat(sourceAmount) : 0,
          increment: type === 'INCOME' ? parseFloat(sourceAmount) : 0,
        },
      },
    });
    
    // Update destination account balance if it's a transfer
    if (type === 'TRANSFER' && destinationAccountId) {
      await prisma.accounts.update({
        where: {
          id: destinationAccountId,
        },
        data: {
          balance: {
            increment: parseFloat(destinationAmount || sourceAmount),
          },
        },
      });
    }
    
    return NextResponse.json({
      data: transaction,
      message: 'Transaction created successfully',
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}