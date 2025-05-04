import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Updated import paths
import { authOptions } from "@/server/auth/options"; 
import { getAccounts } from "@/server/actions/account.actions"; // Use Server Action
import { prisma } from "@/server/db"; // Direct DB access for token check only (could be another action)
import AccountsClient from "./accounts-client";

export default async function AccountsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login?callbackUrl=/accounts");
  }

  // Fetch accounts using the server action
  // Note: Error handling might be desired here or rely on client-side handling
  const accountsResult = await getAccounts(); 
  const initialAccounts = accountsResult.success ? accountsResult.data : [];

  // Check if user has monobank token (still requires direct DB access here,
  // or create a dedicated server action `getUserProfile` or similar)
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: { monobankToken: true },
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Accounts</h1>
         {/* Add button logic will be in AccountsClient */}
      </div>
      
      {/* Client component handles the table, modals, and actions */}
      <Suspense fallback={<div className="text-center p-8">Loading accounts...</div>}>
        <AccountsClient 
          initialAccounts={initialAccounts ?? []} 
          initialHasMonobankToken={!!user?.monobankToken}
        />
      </Suspense>
    </div>
  );
} 