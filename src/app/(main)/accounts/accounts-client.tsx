"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { accounts as Account } from "@/server/db/client"; // Keep Account type for props
import { Trash2, Edit2, CreditCard, LinkIcon, RefreshCw, ChevronDown } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import custom hook
import { useAccounts } from "./use-accounts";

// Import dialog components
import { AccountFormDialog } from "./account-form-dialog";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { MonobankConnectionDialog } from "./monobank-connection-dialog";

// Import utils
import { formatBalance } from "@/lib/utils";

interface AccountsClientProps {
  initialAccounts: Account[];
  initialHasMonobankToken: boolean;
}

// --- Main Accounts Client Component (Refactored) ---
export default function AccountsClient({ initialAccounts, initialHasMonobankToken }: AccountsClientProps) {
  const {
    // State & Data
    accounts,
    editingAccount,
    deleteAccountId,
    deleteAccountName,
    hasMonobankToken,
    // Dialog Visibility
    isAddAccountOpen,
    isEditAccountOpen,
    isDeleteDialogOpen,
    isMonoDialogOpen,
    // Loading/Error States
    isLoadingAccounts,
    isErrorAccounts,
    errorAccounts,
    isSyncingTransactions,
    // Mutations
    syncMonobankTransactions,
    // Handlers
    handleOpenAddDialog,
    setIsAddAccountOpen,
    handleOpenEditDialog,
    handleCloseEditDialog,
    setIsEditAccountOpen,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    setIsDeleteDialogOpen,
    handleOpenMonoDialog,
    handleCloseMonoDialog,
    setIsMonoDialogOpen,
  } = useAccounts({ initialAccounts, initialHasMonobankToken });

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
         <Button onClick={handleOpenAddDialog}><CreditCard className="mr-2 h-4 w-4"/>Add Manual Account</Button>
         <Button variant="outline" onClick={handleOpenMonoDialog}><LinkIcon className="mr-2 h-4 w-4"/>
            {hasMonobankToken ? "Manage Monobank" : "Connect Monobank"}
         </Button>
          {hasMonobankToken && (
            <Button
              variant="secondary"
              onClick={() => syncMonobankTransactions()}
              disabled={isSyncingTransactions}
            >
               {isSyncingTransactions ? <LoadingSpinner size="sm" className="mr-2"/> : <RefreshCw className="mr-2 h-4 w-4"/>}
               Sync Mono Transactions
            </Button>
         )}
      </div>

       {/* Account List/Grid */} 
       {/* Loading State */}
      {isLoadingAccounts && (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-36 w-full" />)}
         </div>
      )}
      {/* Error State */}
      {isErrorAccounts && <p className="text-destructive">Error loading accounts: {errorAccounts?.message}</p>}
      {/* Empty State */}
      {!isLoadingAccounts && !isErrorAccounts && accounts.length === 0 && (
         <p className="text-center text-muted-foreground py-6">No accounts found. Add one to get started.</p>
      )}
      {/* Data State */}
      {!isLoadingAccounts && !isErrorAccounts && accounts.length > 0 && (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
               <Card key={account.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pr-2 pt-3">
                     <div className="space-y-1">
                        <h3 className="font-semibold tracking-tight text-base line-clamp-1" title={account.name}>{account.name}</h3>
                         <p className="text-xs text-muted-foreground">
                           {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
                           {account.bankId && <span className="ml-1 font-medium text-blue-600" title={`Monobank ID: ${account.bankId}`}>(Linked)</span>}
                         </p>
                     </div>
                      <DropdownMenu> 
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0">
                              <span className="sr-only">Account options</span>
                              <ChevronDown className="h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"> 
                           <DropdownMenuItem onClick={() => handleOpenEditDialog(account)}><Edit2 className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                           <DropdownMenuItem
                              className="text-red-600 focus:text-red-700 focus:bg-red-100"
                              onClick={() => handleOpenDeleteDialog(account)}
                              // disabled={!!account.bankId} // Disable delete for linked accounts
                              title={account.bankId ? "Cannot delete linked Monobank accounts." : undefined}
                            >
                              <Trash2 className="mr-2 h-4 w-4"/>Delete
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                     <div className="text-2xl font-bold">
                        {formatBalance(Number(account.balance), account.currency)}
                     </div>
                     {/* Optionally add more details like last updated, etc. */}
                  </CardContent>
               </Card>
            ))}
         </div>
      )}

      {/* Dialogs */}
      {/* Add Account Dialog */}
      <AccountFormDialog
         isOpen={isAddAccountOpen}
         onOpenChange={setIsAddAccountOpen} // Use direct setter from hook
      />
      {/* Edit Account Dialog */}
      <AccountFormDialog
         isOpen={isEditAccountOpen}
         onOpenChange={handleCloseEditDialog} // Use close handler to clear state
         account={editingAccount} // Pass the account being edited
      />
      {/* Delete Account Dialog */}
      <DeleteAccountDialog
         isOpen={isDeleteDialogOpen}
         onOpenChange={handleCloseDeleteDialog} // Use close handler
         accountId={deleteAccountId}
         accountName={deleteAccountName}
      />
      {/* Monobank Connection Dialog */}
      <MonobankConnectionDialog
         isOpen={isMonoDialogOpen}
         onOpenChange={handleCloseMonoDialog} // Use close handler
         currentHasToken={hasMonobankToken} // Pass the dynamic token status
      />
    </div>
  );
} 