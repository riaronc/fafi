"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { accounts as Account } from "@prisma/client"; // Use Prisma types directly

// Import Server Actions
import {
  getAccounts } from "@/server/actions/account.actions"; // Correct path
import {
  storeMonobankToken,
  getMonobankClientInfo,
  syncMonobankAccounts,
} from "@/server/actions/monobank.actions";

// Import utils
import { formatBalance, currencyMap } from "@/lib/utils";

// Import types
import { MonobankAccount } from "@/types/monobank"; // Corrected path assuming it exists

interface MonobankDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
   currentHasToken: boolean; // Receive current token status dynamically
}

export function MonobankConnectionDialog({ isOpen, onOpenChange, currentHasToken }: MonobankDialogProps) {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [monobankTokenInput, setMonobankTokenInput] = useState("");
   const [selectedMonoAccounts, setSelectedMonoAccounts] = useState<Record<string, boolean>>({});

   // Fetch existing app accounts to compare
   const { data: appAccountsResult } = useQuery({
      queryKey: ['accounts'],
      queryFn: getAccounts,
      // Assuming getAccounts returns { success: boolean, data?: Account[], error?: string }
      select: (res: Awaited<ReturnType<typeof getAccounts>>) => (res.success && res.data ? res.data : []),
      enabled: isOpen, // Only fetch when the dialog is open
   });
   const existingBankIds = useMemo(() => new Set(appAccountsResult?.map((a: Account) => a.bankId).filter(Boolean) ?? []), [appAccountsResult]);

   // Fetch Monobank client info
   const { data: clientInfoResult, isLoading: isLoadingClientInfo, refetch: refetchClientInfo, isError: isClientInfoError } = useQuery({ // Added isError
      queryKey: ['monobankClientInfo'],
      queryFn: getMonobankClientInfo,
      enabled: currentHasToken && isOpen, // Fetch only if dialog is open AND token *currently* exists
      staleTime: 5 * 60 * 1000,
      retry: false, // Don't retry automatically if token is invalid
   });

   const monobankAccounts = clientInfoResult?.success ? clientInfoResult.data.accounts : [];
   const hasValidToken = clientInfoResult?.success ?? false; // Check if client info fetch succeeded

   // Effect to explicitly refetch client info when token becomes available and dialog is open
   useEffect(() => {
       if (isOpen && currentHasToken && !isLoadingClientInfo && !clientInfoResult) {
           console.log("[Effect] Token became available, explicitly refetching client info...");
           refetchClientInfo();
       }
       // We only want this effect to run when currentHasToken changes to true or the dialog opens with a token
   }, [isOpen, currentHasToken, isLoadingClientInfo, clientInfoResult, refetchClientInfo]);

   // Effect to reset token input when opening without a token
   useEffect(() => {
       if (isOpen && !currentHasToken) {
           setMonobankTokenInput("");
       }
   }, [isOpen, currentHasToken]);

   // Effect to update selections when accounts load or existingBankIds change
    useEffect(() => {
      if (isOpen && currentHasToken && monobankAccounts.length > 0) {
         setSelectedMonoAccounts(prev => {
            const newState = { ...prev };
            let changed = false;
            monobankAccounts.forEach(acc => {
               const alreadyExists = existingBankIds.has(acc.id);
               // Default select IF it doesn't exist yet AND it hasn't been explicitly deselected by the user
               if (newState[acc.id] === undefined && !alreadyExists) {
                   newState[acc.id] = true; // Default select new accounts
                   changed = true;
               } else if (alreadyExists) {
                    newState[acc.id] = true; // Ensure existing linked accounts are always checked (and potentially disabled)
                    if (prev[acc.id] !== true) changed = true;
               }
            });
            return changed ? newState : prev; // Avoid unnecessary state update
         });
      }
   }, [monobankAccounts, existingBankIds, isOpen, currentHasToken]); // Rerun when dialog opens with token

   const storeTokenMutation = useMutation({
      mutationFn: storeMonobankToken,
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Token Saved", description: "Monobank token stored successfully." });
            // Invalidate the status query to trigger UI update in parent
            queryClient.invalidateQueries({ queryKey: ['monobankTokenStatus'] });
            // Invalidate the client info query; it will refetch automatically
            // when it becomes enabled (dialog open + currentHasToken is true)
            queryClient.invalidateQueries({ queryKey: ['monobankClientInfo'] });
         } else {
            toast({ variant: "destructive", title: "Failed to Save Token", description: result.error });
         }
      },
      onError: (error) => toast({ variant: "destructive", title: "Error", description: error.message })
   });

   const syncAccountsMutation = useMutation({
      mutationFn: syncMonobankAccounts, // Action now accepts selectedBankIds
      onSuccess: (result) => {
         if (result.success) {
            const addedDesc = result.added ? `${result.added} added` : '';
            const updatedDesc = result.updated ? `${result.updated} updated` : '';
            const separator = result.added && result.updated ? ', ' : '';
            const description = addedDesc || updatedDesc ? `Sync complete: ${addedDesc}${separator}${updatedDesc}.` : "Accounts checked, no changes needed.";
            toast({ title: "Accounts Synced", description });
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
       // Prevent unchecking if it's already linked
       if (!existingBankIds.has(accountId)) {
           setSelectedMonoAccounts(prev => ({ ...prev, [accountId]: !prev[accountId] }));
       }
   };

   const handleSaveSelected = () => {
      const selectedIds = Object.entries(selectedMonoAccounts)
          .filter(([id, isSelected]) => isSelected && !existingBankIds.has(id)) // Only sync newly selected
          .map(([id, _]) => id);

      if (selectedIds.length === 0) {
         toast({ variant: "default", title: "No New Accounts Selected", description: "Select at least one new account to sync or cancel." });
         return;
      }

      syncAccountsMutation.mutate(selectedIds);
   };

   // --- Select All Logic ---
   const selectableMonoAccounts = useMemo(() => 
     monobankAccounts.filter(acc => !existingBankIds.has(acc.id)), 
     [monobankAccounts, existingBankIds]
   );

   const allSelectableChecked = useMemo(() => 
     selectableMonoAccounts.length > 0 && selectableMonoAccounts.every(acc => selectedMonoAccounts[acc.id]),
     [selectableMonoAccounts, selectedMonoAccounts]
   );

   const someSelectableChecked = useMemo(() => 
     selectableMonoAccounts.some(acc => selectedMonoAccounts[acc.id]),
     [selectableMonoAccounts, selectedMonoAccounts]
   );

   const handleSelectAllChange = (checked: boolean | 'indeterminate') => {
     setSelectedMonoAccounts(prev => {
       const newState = { ...prev };
       selectableMonoAccounts.forEach(acc => {
         // If checking, set to true; if unchecking, set to false
         newState[acc.id] = checked === true;
       });
       return newState;
     });
   };
   // --- End Select All Logic ---

   const isLoading = storeTokenMutation.isPending || syncAccountsMutation.isPending;
   // Use currentHasToken for the initial view rendering
   const showTokenInput = !currentHasToken || (currentHasToken && isClientInfoError && !isLoadingClientInfo);

   // Ensure acc.balance is treated as number for formatBalance
   const formatMonoValue = (value: number | undefined, currencyCode: number) => {
       if (value === undefined) return "N/A";
      return formatBalance(value, currencyMap[currencyCode] || "UAH");
   };

   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{showTokenInput ? "Connect Monobank" : "Manage Monobank Accounts"}</DialogTitle></DialogHeader>

            {showTokenInput ? (
               // Token Input Section
               <div className="space-y-4 py-2">
                   {currentHasToken && isClientInfoError && (
                       <p className="text-sm text-destructive">Could not connect using the saved token. Please enter a valid token.</p>
                   )}
                   {!currentHasToken && (
                      <p className="text-sm text-muted-foreground">
                         Enter your Monobank API token to link your accounts.
                      </p>
                    )}
                  <div className="space-y-2">
                     <Label htmlFor="token">Monobank Token</Label>
                     <Input id="token" placeholder="Enter token" value={monobankTokenInput} onChange={(e) => setMonobankTokenInput(e.target.value)} />
                     <p className="text-xs text-muted-foreground">Find this in your Monobank app settings under API.</p>
                  </div>
                  <DialogFooter className="pt-4">
                     <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                     <Button onClick={handleConnect} disabled={storeTokenMutation.isPending || !monobankTokenInput.trim()}>
                        {storeTokenMutation.isPending ? <LoadingSpinner size="sm"/> : "Save and Connect"}
                     </Button>
                  </DialogFooter>
               </div>
            ) : (
               // Account Selection Section
               <div className="space-y-4 py-2">
                  {isLoadingClientInfo && <div className="text-center p-4"><LoadingSpinner /></div>}
                  {!isLoadingClientInfo && !clientInfoResult?.success && isClientInfoError && (
                      <p className="text-destructive text-sm">Error fetching accounts: {clientInfoResult?.error ?? 'Unknown error'}</p>
                  )}
                  {!isLoadingClientInfo && clientInfoResult?.success && monobankAccounts.length === 0 && (
                      <p className="text-center text-muted-foreground p-4">No Monobank accounts found with the current token.</p>
                  )}
                  {monobankAccounts.length > 0 && (
                     <>
                     <p className="text-sm text-muted-foreground">
                        Select the Monobank accounts you want to add.
                        Already linked accounts are checked and disabled.
                     </p>
                     {/* Select/Deselect All Checkbox */} 
                     {selectableMonoAccounts.length > 0 && (
                         <div className="flex items-center space-x-2 pb-2 border-b mb-2">
                             <Checkbox
                                 id="select-all-mono"
                                 checked={allSelectableChecked ? true : someSelectableChecked ? 'indeterminate' : false}
                                 onCheckedChange={handleSelectAllChange}
                             />
                             <Label htmlFor="select-all-mono" className="text-sm font-medium">
                                 {allSelectableChecked ? "Deselect All Available" : "Select All Available"}
                             </Label>
                         </div>
                     )}
                     {/* End Select/Deselect All Checkbox */} 
                     <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                        {monobankAccounts.map(acc => {
                            const isExisting = existingBankIds.has(acc.id);
                            return (
                               <div key={acc.id} className={`flex items-center space-x-2 rounded-md border p-3 ${isExisting ? 'opacity-70' : ''}`}>
                                  <Checkbox
                                     id={`mono-acc-${acc.id}`}
                                     checked={selectedMonoAccounts[acc.id] ?? false}
                                     onCheckedChange={() => toggleAccountSelection(acc.id)}
                                     disabled={isExisting} // Disable checking/unchecking existing
                                  />
                                  <Label htmlFor={`mono-acc-${acc.id}`} className={`flex-1 space-y-1 ${isExisting ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                     <div className="flex items-center justify-between">
                                         <span className="font-medium capitalize">
                                             {`${acc.type} (${currencyMap[acc.currencyCode] ?? '?'})`}
                                             {isExisting && <span className="text-xs text-muted-foreground ml-1">(Linked)</span>}
                                         </span>
                                         {/* Optional: Add masked pan */} 
                                         {/* <span className="text-xs text-muted-foreground">{acc.maskedPan?.[0]}</span> */} 
                                     </div>
                                     <div className="text-xs text-muted-foreground flex items-center justify-between">
                                         <span>Balance: {formatMonoValue(acc.balance, acc.currencyCode)}</span>
                                         {acc.creditLimit !== undefined && acc.creditLimit > 0 && (
                                            <span>Limit: {formatMonoValue(acc.creditLimit, acc.currencyCode)}</span>
                                         )}
                                     </div>
                                  </Label>
                               </div>
                            );
                        })}
                     </div>
                     <DialogFooter className="pt-4">
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <Button onClick={handleSaveSelected} disabled={syncAccountsMutation.isPending}>
                           {syncAccountsMutation.isPending ? <LoadingSpinner size="sm"/> : "Add Selected Accounts"}
                        </Button>
                     </DialogFooter>
                     </>
                  )}
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
} 