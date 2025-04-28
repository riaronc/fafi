import { NextResponse, type NextRequest } from 'next/server';
import { getServerSession } from "next-auth/next" // Use getServerSession
import { authOptions } from "@/lib/auth"; // Assuming authOptions are exported from here
import { PrismaClient, type accounts as Account, type transactions, type users as User } from '@/lib/prisma/client'; // Correct import and add type

const prisma = new PrismaClient();

// Delay helper function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to fetch statements from Monobank API - Accepts token as argument
async function fetchMonoStatements(bankAccountId: string, fromTimestamp: number, token: string): Promise<any[]> {
  // Removed environment variable check, token is now passed in
  if (!token) {
    console.error('No Monobank API token provided for fetching statements.');
    throw new Error('Monobank token missing.');
  }
  const toTimestamp = Math.floor(Date.now() / 1000);
  const maxFromTimestamp = toTimestamp - (30 * 24 * 60 * 60); // Approx 31 days
  const effectiveFromTimestamp = Math.max(fromTimestamp, maxFromTimestamp);
  const url = `https://api.monobank.ua/personal/statement/${bankAccountId}/${effectiveFromTimestamp}/${toTimestamp}`;
  
  console.log(`Fetching Monobank statements for account ${bankAccountId} from ${new Date(effectiveFromTimestamp * 1000).toISOString()} to ${new Date(toTimestamp * 1000).toISOString()}`);

  const response = await fetch(url, { headers: { 'X-Token': token } });

  if (response.status === 429) {
    console.warn(`Monobank rate limit hit for account ${bankAccountId}.`);
    // Indicate rate limit with a specific error or return value
    throw new Error('Rate limit hit'); 
  }
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch Monobank statements for account ${bankAccountId}: ${response.status} ${errorText}`);
    throw new Error(`Failed to fetch Monobank statements: ${response.statusText}`);
  }
  const statements = await response.json();
  return Array.isArray(statements) ? statements.reverse() : []; // Reverse for chronological processing
}

// Helper function to sync a single account - Fetches user token
async function syncSingleAccount(account: Account, user: User): Promise<{ added: number; skipped: number; error?: string }> {
  let addedCount = 0;
  let skippedCount = 0;
  let transactionsSaved = false;

  if (!account.bankId) {
    return { added: 0, skipped: 0, error: "Account not linked to a bank" };
  }
  
  // Use the token from the fetched user object
  const userToken = user.monobankToken;
  if (!userToken) {
      console.warn(`User ${user.id} has no Monobank token stored for account ${account.id}. Skipping sync.`);
      return { added: 0, skipped: 0, error: "User Monobank token not found." };
  }

  try {
    // Determine the 'from' timestamp
    const thirtyDaysAgo = Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);
    const isInitialSync = account.createdAt.getTime() === account.updatedAt.getTime();
    const fromTimestamp = isInitialSync
      ? thirtyDaysAgo
      : Math.floor(account.updatedAt.getTime() / 1000) + 1;

    // Fetch statements using the user's token
    const statements = await fetchMonoStatements(account.bankId, fromTimestamp, userToken);
    
    // Monobank returns max 500. If 500, log warning - needs background job for full history.
    if (statements.length === 500) {
       console.warn(`Account ${account.name} (${account.id}) fetched 500 statements. Older transactions might be missing. Consider implementing iterative fetching.`);
    }

    if (!statements.length) {
      // No new statements, update timestamp if not initial sync to prevent immediate re-check
      if (!isInitialSync) {
          await prisma.accounts.update({ where: { id: account.id }, data: { updatedAt: new Date() } });
      }
      return { added: 0, skipped: 0 };
    }

    // Process and save new transactions
    const existingBankTxIds = new Set(
      (await prisma.transactions.findMany({
        where: { userId: user.id, bankTransactionId: { in: statements.map(s => s.id) } },
        select: { bankTransactionId: true },
      })).map((t: { bankTransactionId: string | null }) => t.bankTransactionId)
    );

    for (const statement of statements) {
      if (!statement.id || existingBankTxIds.has(statement.id)) {
        skippedCount++;
        continue;
      }

      try {
        const amount = statement.amount;
        const transactionDate = new Date(statement.time * 1000);
        const description = statement.description || 'N/A';
        const type = amount < 0 ? 'EXPENSE' : 'INCOME';

        await prisma.transactions.create({
          data: {
            userId: user.id,
            sourceAccountId: account.id,
            sourceAmount: Math.abs(amount),
            destinationAmount: Math.abs(amount),
            date: transactionDate,
            description,
            type,
            bankTransactionId: statement.id,
            // categoryId: // TODO: Add category mapping
          },
        });
        addedCount++;
        transactionsSaved = true;
      } catch (dbError) {
        if ((dbError as any).code === 'P2002' && (dbError as any).meta?.target?.includes('bankTransactionId')) {
          console.warn(`Duplicate bankTransactionId found during save: ${statement.id}`);
          skippedCount++;
        } else {
          console.error(`Failed to save transaction ${statement.id} for account ${account.id}:`, dbError);
          skippedCount++;
        }
      }
    }

    // Update account's updatedAt timestamp if transactions were saved or if statements were fetched
    if (transactionsSaved || statements.length > 0) {
      await prisma.accounts.update({ where: { id: account.id }, data: { updatedAt: new Date() } });
    }

    return { added: addedCount, skipped: skippedCount };

  } catch (error) {
     if (error instanceof Error && error.message === 'Rate limit hit') {
         // Propagate rate limit error specifically
         return { added: 0, skipped: skippedCount, error: 'Rate limited. Try again later.' };
     }
    console.error(`Error syncing account ${account.name} (${account.id}):`, error);
    return { added: addedCount, skipped: skippedCount, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Main POST handler - Fetch user with token and pass to helper
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the user record, including the token
    const user = await prisma.users.findUnique({
        where: { id: userId },
        include: { 
            accounts: { 
                where: { bankId: { not: null } } // Include only linked accounts
            }
        }
    });

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    if (!user.monobankToken) {
        return NextResponse.json({ error: 'Monobank token not configured for this user.' }, { status: 400 });
    }

    const linkedAccounts = user.accounts; // Use accounts included from user fetch

    if (!linkedAccounts.length) {
      return NextResponse.json({ error: 'No Monobank accounts linked for this user.' }, { status: 400 });
    }

    let totalAdded = 0;
    let totalSkipped = 0;
    const accountSyncResults: Record<string, { status: string; added?: number; skipped?: number; error?: string }> = {};
    let rateLimited = false;

    // Iterate through linked accounts and sync each one, passing the user object
    for (const account of linkedAccounts) {
      const result = await syncSingleAccount(account, user); // Pass the whole user object
      accountSyncResults[account.name] = {
         status: result.error ? (result.error.includes('Rate limit') ? 'Rate Limited' : 'Failed') : 'Success',
         added: result.added,
         skipped: result.skipped,
         error: result.error,
       };
      totalAdded += result.added;
      totalSkipped += result.skipped;

      if (result.error?.includes('Rate limit')) {
        rateLimited = true;
        // Optional: Stop syncing remaining accounts if one hits rate limit
        // break; 
      }
      
      // Add a small delay between syncing accounts to potentially avoid rate limits
      await delay(500); // 500ms delay
    }

    const overallMessage = rateLimited 
      ? `Sync partially completed due to rate limits. Total Added: ${totalAdded}, Total Skipped/Failed: ${totalSkipped}.`
      : `Sync complete for all linked accounts. Total Added: ${totalAdded}, Total Skipped/Failed: ${totalSkipped}.`;

    return NextResponse.json({
      message: overallMessage,
      details: accountSyncResults,
      totalAdded,
      totalSkipped,
    });

  } catch (error) {
    console.error('Error in main Monobank sync handler:', error);
    return NextResponse.json({ error: 'Internal server error during sync process' }, { status: 500 });
  }
} 