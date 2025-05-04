"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogDescription, DialogClose
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Import Server Action
import { deleteAccount } from "@/server/actions/account.actions";

interface DeleteDialogProps {
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
   accountId: string | null;
   accountName?: string;
}

export function DeleteAccountDialog({ isOpen, onOpenChange, accountId, accountName }: DeleteDialogProps) {
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const deleteMutation = useMutation({
      mutationFn: deleteAccount,
      onSuccess: (result) => {
         if (result.success) {
            toast({ title: "Account Deleted", description: `Account ${accountName || 'selected'} deleted.` });
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