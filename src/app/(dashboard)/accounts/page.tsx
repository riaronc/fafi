import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma as db } from "@/lib/prisma";
import AccountsClient from "./accounts-client";
import { Suspense } from "react";

export default async function AccountsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/login");
  }

  // Get user accounts
  const accounts = await db.accounts.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Check if user has monobank token
  const user = await db.users.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      monobankToken: true,
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Accounts</h1>
      <Suspense fallback={<div>Loading accounts...</div>}>
        <AccountsClient 
          initialAccounts={accounts} 
          hasMonobankToken={!!user?.monobankToken}
        />
      </Suspense>
      </>
  );
} 