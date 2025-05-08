"use client";

import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, ControllerRenderProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
   Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
   Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { accounts as Account, AccountType } from "@/server/db/client";

// Import Server Actions
import { createAccount, updateAccount } from "@/server/actions/account.actions";

// Import Zod schemas & types
import { CreateAccountInput, UpdateAccountInput, createAccountSchema, updateAccountSchema } from "@/lib/zod/account.schema";

interface AccountDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  account?: Account | null; // Provide account for editing
}

export function AccountFormDialog({ isOpen, onOpenChange, account }: AccountDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!account;

  const form = useForm<CreateAccountInput | UpdateAccountInput>({
    resolver: zodResolver(isEditing ? updateAccountSchema : createAccountSchema),
    defaultValues: isEditing ? {
      name: account?.name ?? '',
      type: account?.type ?? AccountType.CHECKING,
      balance: account ? (Number(account.balance) / 100) : undefined,
      currency: account?.currency ?? 'USD', // Keep currency but disable editing
      bankId: account?.bankId,
    } : {
      name: '',
      type: AccountType.CHECKING,
      balance: undefined,
      currency: 'USD',
      bankId: null,
    },
  });

  // Effect to reset form when the account prop changes or dialog opens for editing/creating
  useEffect(() => {
    if (isOpen) {
        if (isEditing && account) {
            form.reset({
                name: account.name,
                type: account.type,
                balance: Number(account.balance) / 100,
                currency: account.currency,
                bankId: account.bankId,
            });
        } else if (!isEditing) {
            // Reset to default creation values when opening for 'Add New'
            form.reset({
                name: '',
                type: AccountType.CHECKING,
                balance: undefined,
                currency: 'USD',
                bankId: null,
            });
        }
    }
    // Dependencies: Trigger reset if dialog opens, or if switching between add/edit mode, or if the account to edit changes.
  }, [account, isOpen, isEditing, form]);


  const createMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (result) => {
      if (result.success) {
        toast({ title: "Account Created", description: "Account added successfully." });
        queryClient.invalidateQueries({ queryKey: ['accounts'] });
        onOpenChange(false);
        // No need to call form.reset() here, the useEffect handles it when closing/reopening
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
        // Remove balance from update payload as it's not editable
        const { balance, ...updateData } = data; 
        return updateAccount(account.id, updateData);
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
    // Convert balance back to cents before submitting
    const submissionValues = {
        ...values,
        // Only calculate balance in cents if it's defined (i.e., for creation)
        ...(values.balance !== undefined && { balance: Math.round(values.balance * 100) }),
    };

    if (isEditing) {
      // Don't send balance on update
      const { balance, ...updateData } = submissionValues as UpdateAccountInput;
      updateMutation.mutate(updateData); 
    } else {
      createMutation.mutate(submissionValues as CreateAccountInput); // Cast is okay
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
                        disabled={isEditing}
                      />
                  </FormControl>
                  {isEditing && <p className="text-sm text-muted-foreground">Balance is updated via transactions or bank sync.</p>}
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="currency" render={({ field }: { field: ControllerRenderProps<FieldValues, "currency"> }) => (
                 <FormItem>
                   <FormLabel>Currency</FormLabel>
                   {isEditing ? (
                     // Display as disabled input when editing
                     <FormControl>
                       <Input value={account?.currency ?? 'N/A'} disabled />
                     </FormControl>
                   ) : (
                     // Show Select dropdown when creating
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl><SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                       <SelectContent>
                         <SelectItem value="$">$</SelectItem>
                         <SelectItem value="€">€</SelectItem>
                         <SelectItem value="₴">₴</SelectItem>
                       </SelectContent>
                     </Select>
                   )}
                   <p className="text-sm text-muted-foreground">Currency cannot be changed after creation.</p>
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