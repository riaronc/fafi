"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useAccounts, useDeleteAccount } from "@/hooks/useAccounts";
import { currencyMap, formatMonobankBalance } from "@/lib/services/monobank";
import { formatBalance } from "@/lib/services/accounts";
import { accounts as Account } from "@/lib/prisma/client";
import { useAccountForm } from "@/hooks/useAccountForm";
import { useMonobankConnection } from "@/hooks/useMonobankConnection";
import { Trash2, Edit2, CreditCard, Link } from "lucide-react";

interface AccountsClientProps {
  initialAccounts: Account[];
  hasMonobankToken: boolean;
}

export default function AccountsClient({ 
  initialAccounts, 
  hasMonobankToken,
}: AccountsClientProps) {
  const { toast } = useToast();
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Account form hooks
  const { 
    formState: newAccount, 
    updateField: updateNewField, 
    handleSubmit: submitNewAccount, 
    isSubmitting: isCreatingAccount 
  } = useAccountForm(() => setIsAddingAccount(false));
  
  // Edit account form hook
  const { 
    formState: editAccount, 
    updateField: updateEditField, 
    handleSubmit: submitEditAccount, 
    isSubmitting: isUpdatingAccount 
  } = useAccountForm(() => {
    setIsEditDialogOpen(false);
    setEditingAccount(null);
  }, editingAccount || undefined);

  // Monobank connection hook
  const monobank = useMonobankConnection(hasMonobankToken);

  // React Query hooks
  const { data: accounts = initialAccounts, isLoading: isLoadingAccounts } = useAccounts();
  const { mutate: deleteAccountMutation, isPending: isDeleting } = useDeleteAccount();

  // Handle opening delete dialog
  const handleOpenDeleteDialog = (accountId: string) => {
    setDeleteAccountId(accountId);
    setIsDeleteDialogOpen(true);
  };

  // Handle deleting an account
  const handleDeleteAccount = () => {
    if (!deleteAccountId) return;
    
    deleteAccountMutation(deleteAccountId, {
      onSuccess: () => {
        setIsDeleteDialogOpen(false);
        setDeleteAccountId(null);
        toast({
          title: "Account deleted",
          description: "Your account has been successfully deleted.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to delete account",
        });
      }
    });
  };

  // Handle opening edit dialog
  const handleOpenEditDialog = (account: Account) => {
    setEditingAccount(account);
    setIsEditDialogOpen(true);
  };

  const isLoading = isCreatingAccount || monobank.isLoading || isLoadingAccounts || isDeleting || isUpdatingAccount;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {/* Add Account Dialog */}
        <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
          <DialogTrigger asChild>
            <Button>Add Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  placeholder="Enter account name"
                  value={newAccount.name}
                  onChange={(e) => updateNewField('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Account Type</Label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newAccount.type}
                  onChange={(e) => updateNewField('type', e.target.value)}
                >
                  <option value="CHECKING">Checking</option>
                  <option value="SAVINGS">Savings</option>
                  <option value="CREDIT">Credit</option>
                  <option value="INVESTMENT">Investment</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance">Initial Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  placeholder="0.00"
                  value={newAccount.balance}
                  onChange={(e) => updateNewField('balance', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <select
                  id="currency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newAccount.currency}
                  onChange={(e) => updateNewField('currency', e.target.value)}
                >
                  <option value="UAH">UAH</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div className="pt-4">
                <Button onClick={submitNewAccount} className="w-full" disabled={isLoading}>
                  {isCreatingAccount ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Account Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Account Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter account name"
                  value={editAccount.name}
                  onChange={(e) => updateEditField('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Account Type</Label>
                <select
                  id="edit-type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={editAccount.type}
                  onChange={(e) => updateEditField('type', e.target.value)}
                >
                  <option value="CHECKING">Checking</option>
                  <option value="SAVINGS">Savings</option>
                  <option value="CREDIT">Credit</option>
                  <option value="INVESTMENT">Investment</option>
                  <option value="CASH">Cash</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-balance">Balance</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  placeholder="0.00"
                  value={editAccount.balance}
                  onChange={(e) => updateEditField('balance', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-currency">Currency</Label>
                <select
                  id="edit-currency"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={editAccount.currency}
                  onChange={(e) => updateEditField('currency', e.target.value)}
                  disabled
                >
                  <option value="UAH">UAH</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <p className="text-sm text-muted-foreground">Currency cannot be changed after account creation.</p>
              </div>
              <div className="pt-4">
                <Button onClick={submitEditAccount} className="w-full" disabled={isLoading}>
                  {isUpdatingAccount ? "Updating..." : "Update Account"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Monobank Dialog */}
        <Dialog open={monobank.isDialogOpen} onOpenChange={monobank.setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={monobank.handleOpenDialog}>
              {monobank.hasToken ? "Manage Monobank" : "Connect Monobank"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {monobank.hasToken ? "Manage Monobank Accounts" : "Connect Monobank"}
              </DialogTitle>
            </DialogHeader>
            {!monobank.hasToken && monobank.monobankAccounts.length === 0 ? (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label htmlFor="token">Monobank Token</Label>
                  <Input
                    id="token"
                    placeholder="Enter your Monobank token"
                    value={monobank.monobankToken}
                    onChange={(e) => monobank.setMonobankToken(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    You can get your token from the Monobank app or website.
                  </p>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={monobank.handleConnect} 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {monobank.isConnecting ? "Connecting..." : "Connect"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                <div className="text-sm text-muted-foreground mb-4">
                  Select the accounts you want to add to your financial tracker:
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {monobank.isLoadingAccounts ? (
                    <div className="text-center py-4">Loading accounts...</div>
                  ) : monobank.monobankAccounts.length === 0 ? (
                    <div className="text-center py-4">No accounts found.</div>
                  ) : (
                    monobank.monobankAccounts.map((account) => (
                      <div key={account.id} className="flex items-start space-x-3 border p-3 rounded-md">
                        <Checkbox
                          id={account.id}
                          checked={monobank.selectedAccounts[account.id] || false}
                          onCheckedChange={(checked) => 
                            monobank.toggleAccountSelection(account.id, !!checked)
                          }
                        />
                        <div className="space-y-1">
                          <Label 
                            htmlFor={account.id}
                            className="font-medium cursor-pointer"
                          >
                            {account.type.toUpperCase()} - {currencyMap[account.currencyCode] || "Unknown"}
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            Balance: {formatMonobankBalance(account.balance, account.currencyCode)}
                          </div>
                          {account.creditLimit > 0 && (
                            <div className="text-sm text-muted-foreground">
                              Credit Limit: {formatMonobankBalance(account.creditLimit, account.currencyCode)}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1 font-mono">
                            {account.iban}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="pt-4 flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => monobank.refetchAccounts()}
                    disabled={isLoading}
                  >
                    Refresh
                  </Button>
                  <Button 
                    onClick={monobank.handleSaveAccounts}
                    disabled={isLoading}
                  >
                    {monobank.isSaving ? "Saving..." : "Save Selected Accounts"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2 sm:space-x-0 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoadingAccounts ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Loading accounts...
          </div>
        ) : accounts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No accounts found. Add an account to get started.
          </div>
        ) : (
          accounts.map((account) => (
            <Card key={account.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="truncate mr-2">
                    <h3 className="font-semibold text-lg">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                    {account.bankId && (
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Link className="h-3 w-3 mr-1" />
                        <span>Connected to bank</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-medium">{account.currency}</p>
                    {account.bankId && (
                      <CreditCard className="h-4 w-4 ml-auto mt-1 text-primary" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatBalance(account.balance, account.currency)}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  Last updated: {new Date(account.updatedAt).toLocaleString()}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary opacity-70 hover:opacity-100"
                  onClick={() => handleOpenEditDialog(account)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-destructive opacity-70 hover:opacity-100"
                  onClick={() => handleOpenDeleteDialog(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 