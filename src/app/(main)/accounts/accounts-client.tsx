"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, 
  DialogFooter, DialogDescription, DialogClose // Added DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; // Correct import
import { LoadingSpinner } from "@/components/ui/loading-spinner"; // For button loading
import { accounts as Account, AccountType } from "@prisma/client"; // Use Prisma types directly
import { Trash2, Edit2, CreditCard, LinkIcon, RefreshCw, ChevronDown } from "lucide-react"; // Added icons
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Add DropdownMenu imports

// Import Server Actions
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} from "@/server/actions/account.actions";
import {
  storeMonobankToken,
  getMonobankClientInfo,
  syncMonobankAccounts,
  syncMonobankTransactions
} from "@/server/actions/monobank.actions";

// Import Zod schemas & types
import { CreateAccountInput, UpdateAccountInput, createAccountSchema, updateAccountSchema } from "@/lib/zod/account.schema";

// Import utils
import { formatBalance, currencyMap } from "@/lib/utils";

// Import types
import { MonobankAccount } from "@/types/monobank";
import { useForm, ControllerRenderProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
   Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { 
   Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";

interface AccountsClientProps {
  initialAccounts: Account[];
  hasMonobankToken: boolean;
}

// --- Sub-components (Consider moving to separate files) ---

interface AccountDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account | null; // Provide account for editing
}

function AccountFormDialog({ isOpen, onOpenChange, account }: AccountDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!account;

  const form = useForm<CreateAccountInput | UpdateAccountInput>({
    resolver: zodResolver(isEditing ? updateAccountSchema : createAccountSchema),
    defaultValues: isEditing ? {
      name: account?.name ?? '',
      type: account?.type ?? AccountType.CHECKING,
      // Cast balance to Number before division
      balance: account ? (Number(account.balance) / 100) : undefined, 
      currency: account?.currency ?? 'USD',
      // Ensure bankId access is safe
      bankId: account?.bankId,
    } : {
      name: '',
      type: AccountType.CHECKING,
      balance: undefined,
      currency: 'USD',
      bankId: null,
    },
  });

  const createMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (result) => {
      if (result.success) {
        toast({ title: "Account Created", description: "Account added successfully." });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        onOpenChange(false);
        form.reset();
      } else {
        toast({ variant: "destructive", title: "Creation Failed", description: result.error });
      }
    },
    onError: (error) => {
       toast({ variant: "destructive", title: "Error", description: error.message });
    }
  });

  const updateMutation = useMutation({
     mutationFn: (data: UpdateAccountInput) => {
        if (!account?.id) throw new Error("Account ID missing for update.");
        return updateAccount(account.id, data);
     },
    onSuccess: (result) => {
      if (result.success) {
        toast({ title: "Account Updated", description: "Account updated successfully." });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
         queryClient.invalidateQueries({ queryKey: ['accounts', account?.id] }); // If detail query exists
        onOpenChange(false);
      } else {
        toast({ variant: "destructive", title: "Update Failed", description: result.error });
      }
    },
     onError: (error) => {
       toast({ variant: "destructive", title: "Error", description: error.message });
    }
  });

  const onSubmit = (values: CreateAccountInput | UpdateAccountInput) => {
    if (isEditing) {
      updateMutation.mutate(values as UpdateAccountInput);
    } else {
      createMutation.mutate(values as CreateAccountInput);
    }
  };

   const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
     <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Account" : "Add New Account"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
             <FormField control={form.control} name="name" render={({ field }: { field: ControllerRenderProps<FieldValues, "name"> }) => (
               <FormItem>
                 <FormLabel>Account Name</FormLabel>
                 <FormControl><Input placeholder="Enter account name" {...field} /></FormControl>
                 <FormMessage />
               </FormItem>
             )}/>
             <FormField control={form.control} name="type" render={({ field }: { field: ControllerRenderProps<FieldValues, "type"> }) => (
               <FormItem>
                 <FormLabel>Account Type</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                       {Object.values(AccountType).map(type => (
                         <SelectItem key={type} value={type}>{type.charAt(0) + type.slice(1).toLowerCase()}</SelectItem>
                       ))}
                    </SelectContent>
                 </Select>
                 <FormMessage />
               </FormItem>
             )}/>
             <FormField control={form.control} name="balance" render={({ field }: { field: ControllerRenderProps<FieldValues, "balance"> }) => (
                <FormItem>
                  <FormLabel>{isEditing ? "Balance" : "Initial Balance"}</FormLabel>
                  <FormControl>
                     <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field} 
                        value={field.value ?? ''} 
                        onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="currency" render={({ field }: { field: ControllerRenderProps<FieldValues, "currency"> }) => (
                 <FormItem>
                   <FormLabel>Currency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isEditing}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                        <SelectContent>
                           <SelectItem value="USD">USD</SelectItem>
                           <SelectItem value="EUR">EUR</SelectItem>
                           <SelectItem value="UAH">UAH</SelectItem>
                        </SelectContent>
                    </Select>
                   {isEditing && <p className="text-sm text-muted-foreground">Currency cannot be changed.</p>}
                   <FormMessage />
                 </FormItem>
               )}/>
            <DialogFooter className="pt-4">
               <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
               <Button type="submit" disabled={isLoading}>
                 {isLoading ? <LoadingSpinner size="sm" /> : (isEditing ? "Update Account" : "Create Account")}
               </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
   accountId: string | null;
   accountName?: string;
}

function DeleteAccountDialog({ isOpen, onOpenChange, accountId, accountName }: DeleteDialogProps) {
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const deleteMutation = useMutation({
      mutationFn: deleteAccount,
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Account Deleted", description: `Account ${accountName} deleted.` });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            onOpenChange(false);
         } else {
             toast({ variant: "destructive", title: "Deletion Failed", description: result.error });
         }
      },
      onError: (error) => {
         toast({ variant: "destructive", title: "Error", description: error.message });
      }
   });

   const handleDelete = () => {
      if (accountId) {
         deleteMutation.mutate(accountId);
      }
   };

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete the account "{accountName || accountId}"? 
                  This action cannot be undone.
                  {/* TODO: Warn about associated transactions */} 
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
               <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
                  {deleteMutation.isPending ? <LoadingSpinner size="sm"/> : "Delete"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}

interface MonobankDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
   initialHasToken: boolean;
}

function MonobankConnectionDialog({ isOpen, onOpenChange, initialHasToken }: MonobankDialogProps) {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [monobankTokenInput, setMonobankTokenInput] = useState("");
   const [selectedMonoAccounts, setSelectedMonoAccounts] = useState<Record<string, boolean>>({});

   // Fetch existing app accounts to compare
   const { data: appAccountsResult } = useQuery({ 
      queryKey: ['accounts'], 
      queryFn: getAccounts,
      select: (res) => res.success ? res.data : [],
   });
   const existingBankIds = useMemo(() => new Set(appAccountsResult?.map(a => a.bankId).filter(Boolean) ?? []), [appAccountsResult]); // Add fallback []

   // Fetch Monobank client info
   const { data: clientInfoResult, isLoading: isLoadingClientInfo, refetch: refetchClientInfo } = useQuery({ 
      queryKey: ['monobankClientInfo'], 
      queryFn: getMonobankClientInfo,
      enabled: initialHasToken && isOpen, // Fetch only if dialog is open and token should exist
      staleTime: 5 * 60 * 1000, 
   });

   const monobankAccounts = clientInfoResult?.success ? clientInfoResult.data.accounts : [];
   const hasApiToken = clientInfoResult?.success ?? initialHasToken; // Reflects API check result if available

   // Update selections when accounts load
    useEffect(() => {
      if (monobankAccounts.length > 0) {
         setSelectedMonoAccounts(prev => {
            const newState = { ...prev };
            monobankAccounts.forEach(acc => {
               if (newState[acc.id] === undefined) { // Only default-select if not already interacted with
                  newState[acc.id] = existingBankIds.has(acc.id);
               }
            });
            return newState;
         });
      }
   }, [monobankAccounts, existingBankIds]);

   const storeTokenMutation = useMutation({
      mutationFn: storeMonobankToken,
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Token Saved", description: "Monobank token stored successfully." });
            refetchClientInfo(); // Attempt to fetch client info with the new token
            queryClient.invalidateQueries({ queryKey: ['hasMonobankToken'] }); // Invalidate any query relying on this
         } else {
            toast({ variant: "destructive", title: "Failed to Save Token", description: result.error });
         }
      },
      onError: (error) => toast({ variant: "destructive", title: "Error", description: error.message })
   });

   const syncAccountsMutation = useMutation({
      mutationFn: syncMonobankAccounts, // Action now fetches accounts itself
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Accounts Synced", description: "Selected Monobank accounts saved." });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            onOpenChange(false); // Close dialog on success
         } else {
             toast({ variant: "destructive", title: "Sync Failed", description: result.error });
         }
      },
       onError: (error) => toast({ variant: "destructive", title: "Error", description: error.message })
   });
   
   const handleConnect = () => {
      storeTokenMutation.mutate(monobankTokenInput);
   };

   const toggleAccountSelection = (accountId: string) => {
      setSelectedMonoAccounts(prev => ({ ...prev, [accountId]: !prev[accountId] }));
   };

   const handleSaveSelected = () => {
      // The server action `syncMonobankAccounts` now handles fetching and upserting all accounts.
      // We don't need to send selected accounts from the client anymore.
      syncAccountsMutation.mutate(); 
   };

   const isLoading = storeTokenMutation.isPending || isLoadingClientInfo || syncAccountsMutation.isPending;

   // Ensure acc.balance is treated as number for formatBalance
   const formatMonoBalance = (balance: number, currencyCode: number) => {
      return formatBalance(balance, currencyMap[currencyCode] || "UAH");
   };

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{hasApiToken ? "Manage Monobank Accounts" : "Connect Monobank"}</DialogTitle></DialogHeader>
            
            {!hasApiToken ? (
               // Token Input Section
               <div className="space-y-4 py-2">
                  <p className="text-sm text-muted-foreground">
Enter your Monobank API token to link your accounts.
                  </p>
                  <div className="space-y-2">
                     <Label htmlFor="token">Monobank Token</Label>
                     <Input id="token" placeholder="Enter token" value={monobankTokenInput} onChange={(e) => setMonobankTokenInput(e.target.value)} />
                     <p className="text-xs text-muted-foreground">Find this in your Monobank settings.</p>
                  </div>
                  <DialogFooter className="pt-4">
                     <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                     <Button onClick={handleConnect} disabled={storeTokenMutation.isPending || !monobankTokenInput}> 
                        {storeTokenMutation.isPending ? <LoadingSpinner size="sm"/> : "Connect"}
                     </Button>
                  </DialogFooter>
               </div>
            ) : (
               // Account Selection Section
               <div className="space-y-4 py-2">
                  {isLoadingClientInfo && <div className="text-center p-4"><LoadingSpinner /></div>}
                  {clientInfoResult?.success === false && <p className="text-destructive text-sm">Error: {clientInfoResult.error}</p>}
                  {monobankAccounts.length > 0 ? (
                     <> 
                     <p className="text-sm text-muted-foreground">
                        Select the Monobank accounts you want to sync.
                        Accounts already added are pre-selected.
                     </p>
                     <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                        {monobankAccounts.map(acc => (
                           <div key={acc.id} className="flex items-center space-x-2 rounded-md border p-3">
                              <Checkbox 
                                 id={`mono-acc-${acc.id}`}
                                 checked={selectedMonoAccounts[acc.id] ?? false}
                                 onCheckedChange={() => toggleAccountSelection(acc.id)}
                                 disabled={existingBankIds.has(acc.id)} // Disable unchecking existing
                              />
                              <Label htmlFor={`mono-acc-${acc.id}`} className="flex-1 cursor-pointer">
                                 <span className="font-medium">{`Mono ${acc.maskedPan.slice(-1)[0] ?? acc.type}`}</span>
                                 {/* Call helper ensuring balance is number */}
                                 <span className="text-muted-foreground text-xs block">{formatMonoBalance(Number(acc.balance), acc.currencyCode)}</span>
                              </Label>
                           </div>
                        ))}
                     </div>
                     <DialogFooter className="pt-4">
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSaveSelected} disabled={syncAccountsMutation.isPending}>
                           {syncAccountsMutation.isPending ? <LoadingSpinner size="sm"/> : "Save Selected Accounts"}
                        </Button>
                     </DialogFooter>
                     </>
                  ) : (
                     !isLoadingClientInfo && <p className="text-center text-muted-foreground p-4">No Monobank accounts found.</p>
                  )}
                 
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}

// --- Main Accounts Client Component ---

export default function AccountsClient({ 
  initialAccounts, // Note: Might not be needed if useQuery handles initialData
  hasMonobankToken,
}: AccountsClientProps) {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [isEditAccountOpen, setIsEditAccountOpen] = useState(false);
  const [deleteAccountId, setDeleteAccountId] = useState<string | null>(null);
  const [deleteAccountName, setDeleteAccountName] = useState<string | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isMonoDialogOpen, setIsMonoDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Use the initialData, but handle potential type mismatch from server vs. client expectations
  // The query will fetch fresh data matching the queryFn return type anyway
  const { data: accountsResult, isLoading: isLoadingAccounts, isError, error } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts, // Type should be inferred from here
    // Provide initial data but acknowledge potential minor type diffs (e.g., Decimal vs number)
    initialData: { success: true, data: initialAccounts } as any, // Use 'as any' to bypass strict initialData check
    staleTime: 5 * 60 * 1000,
  });
  
  // Safely access accounts, defaulting to empty array
  const accounts: Account[] = accountsResult?.success ? (accountsResult.data ?? []) : [];

  // Monobank Sync Transactions Mutation
   const syncTransactionsMutation = useMutation({
      mutationFn: syncMonobankTransactions,
      onMutate: () => {
         toast({ title: "Syncing Transactions...", description: "Fetching latest Monobank statements..." });
      },
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Sync Complete", description: `${result.totalAdded} new transactions added, ${result.totalSkipped} skipped.` });
            queryClient.invalidateQueries({ queryKey: ['transactions'] }); // Invalidate transactions data
             queryClient.invalidateQueries({ queryKey: ['accounts'] }); // Invalidate accounts for balance updates
             queryClient.invalidateQueries({ queryKey: ['dashboard'] }); // Invalidate dashboard
         } else {
            toast({ variant: "destructive", title: "Sync Failed", description: result.error });
         }
      },
      onError: (error) => {
         toast({ variant: "destructive", title: "Sync Error", description: error.message });
      }
   });

  // Handlers for Dialogs
  const handleOpenEditDialog = (account: Account) => {
    setEditingAccount(account);
    setIsEditAccountOpen(true);
  };

  const handleOpenDeleteDialog = (account: Account) => {
    setDeleteAccountId(account.id);
    setDeleteAccountName(account.name);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */} 
      <div className="flex flex-wrap gap-2">
         <Button onClick={() => setIsAddAccountOpen(true)}><CreditCard className="mr-2 h-4 w-4"/>Add Manual Account</Button>
         <Button variant="outline" onClick={() => setIsMonoDialogOpen(true)}><LinkIcon className="mr-2 h-4 w-4"/>
            {hasMonobankToken ? "Manage Monobank" : "Connect Monobank"}
         </Button>
          {hasMonobankToken && (
            <Button variant="secondary" onClick={() => syncTransactionsMutation.mutate()} disabled={syncTransactionsMutation.isPending}>
               {syncTransactionsMutation.isPending ? <LoadingSpinner size="sm" /> : <RefreshCw className="mr-2 h-4 w-4"/>}
               Sync Mono Transactions
            </Button>
         )}
      </div>

       {/* Account List/Grid */}
      {isLoadingAccounts && (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-36 w-full" />)}
         </div>
      )}
      {isError && <p className="text-destructive">Error loading accounts: {error?.message}</p>}
      {!isLoadingAccounts && !isError && accounts.length === 0 && (
         <p className="text-center text-muted-foreground py-6">No accounts found. Add one to get started.</p>
      )}
      {!isLoadingAccounts && !isError && accounts.length > 0 && (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
               <Card key={account.id}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                     <h3 className="font-semibold tracking-tight">{account.name}</h3>
                      <DropdownMenu> {/* Use imported DropdownMenu */}
                        <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-6 w-6">
                              <span className="sr-only">Account options</span>
                              <ChevronDown className="h-4 w-4" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"> {/* Use imported DropdownMenuContent */}
                           <DropdownMenuItem onClick={() => handleOpenEditDialog(account)}><Edit2 className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem> {/* Use imported DropdownMenuItem */}
                           <DropdownMenuItem 
                              className="text-red-600 focus:text-red-700 focus:bg-red-100" 
                              onClick={() => handleOpenDeleteDialog(account)}>
                              <Trash2 className="mr-2 h-4 w-4"/>Delete
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">
                        {/* Cast balance to Number for formatBalance */}
                        {formatBalance(Number(account.balance), account.currency)}
                     </div>
                     <p className="text-xs text-muted-foreground">
                       {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account 
                       {account.bankId && <span title={`Monobank ID: ${account.bankId}`}>(Linked)</span>}
                     </p>
                  </CardContent>
               </Card>
            ))}
         </div>
      )}

      {/* Dialogs */} 
      <AccountFormDialog 
         isOpen={isAddAccountOpen}
         onOpenChange={setIsAddAccountOpen}
      />
      {editingAccount && (
         <AccountFormDialog 
            isOpen={isEditAccountOpen}
            onOpenChange={setIsEditAccountOpen}
            account={editingAccount}
         />
      )}
      <DeleteAccountDialog 
         isOpen={isDeleteDialogOpen}
         onOpenChange={setIsDeleteDialogOpen}
         accountId={deleteAccountId}
         accountName={deleteAccountName}
      />
      <MonobankConnectionDialog
         isOpen={isMonoDialogOpen}
         onOpenChange={setIsMonoDialogOpen}
         initialHasToken={hasMonobankToken}
      />
    </div>
  );
} 