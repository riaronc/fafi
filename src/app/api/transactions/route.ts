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
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        account: true,
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
      skip,
      take: limit,
    });
    
    // Get total count for pagination
    const totalCount = await prisma.transaction.count({
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
    const { amount, date, description, type, accountId, categoryId } = body;
    
    // Validate required fields
    if (!amount || !date || !description || !type || !accountId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Create transaction
    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        description,
        type,
        userId,
        accountId,
        categoryId,
      },
    });
    
    // Update account balance
    await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: type === 'INCOME' ? parseFloat(amount) : (type === 'EXPENSE' ? -parseFloat(amount) : 0),
        },
      },
    });
    
    return NextResponse.json({
      data: transaction,
      message: 'Transaction created successfully',
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}