"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCategory } from "@/server/actions/category.actions"; // Assuming action exists
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button"; // For potential custom trigger/styling

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string | null;
  categoryName?: string; // Optional: display name for confirmation
}

export function DeleteCategoryDialog({ 
  isOpen, 
  onClose, 
  categoryId, 
  categoryName 
}: DeleteCategoryDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation<
    { success: boolean; error?: string }, // Assuming delete returns simple status
    Error,
    string // Input is the category ID
  >({
    mutationFn: deleteCategory,
    onSuccess: async (result) => {
      if (result.success) {
        toast({ title: "Success", description: "Category deleted successfully." });
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose();
      } else {
         toast({ variant: "destructive", title: "Error", description: result.error || "Failed to delete category." });
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const handleDeleteConfirm = () => {
    if (categoryId) {
      deleteMutation.mutate(categoryId);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the 
            {categoryName ? <strong> {categoryName}</strong> : " category"} 
            and remove its association from all transactions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDeleteConfirm} 
            disabled={deleteMutation.isPending}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 