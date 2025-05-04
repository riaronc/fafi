"use client";

import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm, CategoryFormValues } from "./category-form";
import { createCategory, updateCategory, CategoryActionResult } from "@/server/actions/category.actions"; // Import result type
import { useToast } from "@/components/ui/use-toast";
import { categories as CategoriesModel } from "@/server/db/client"; // Import the category type
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

interface CategorySheetProps {
  isOpen: boolean;
  onClose: () => void;
  category?: CategoriesModel | null; // Pass full category data for editing
}

// Define input type for update mutation
type UpdateCategoryInput = CategoryFormValues & { id: string };

export function CategorySheet({ isOpen, onClose, category }: CategorySheetProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const isEditMode = !!category;

  // Explicitly type the mutation hook with the action's result type
  const createMutation = useMutation<
    CategoryActionResult<CategoriesModel>, // Expect the wrapped result object
    Error,                           
    CategoryFormValues               
  >({
    mutationFn: createCategory, 
    onSuccess: async (result) => { // Result is { success: boolean, data?: T, error?: string }
      if (result.success) {
        toast({ title: "Success", description: "Category created successfully." });
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose();
      } else {
        // Handle controlled errors returned from the server action
        toast({ variant: "destructive", title: "Error", description: result.error || "Failed to create category." });
      }
    },
    onError: (error) => {
      // Handle unexpected errors (network, unhandled server exceptions)
      toast({ variant: "destructive", title: "Error", description: error.message || "An unexpected error occurred." });
    },
  });

  // Update mutation might need similar adjustments if updateCategory action is changed
  const updateMutation = useMutation<
    CategoryActionResult<CategoriesModel>, // Expect the wrapped result object
    Error,           
    UpdateCategoryInput 
  >({
    mutationFn: async (data: UpdateCategoryInput) => { 
      // Destructure the id and the rest of the values from the input
      const { id, ...values } = data; 
      // Call the server action with the correct signature
      return updateCategory(id, values); 
    }, 
    onSuccess: async (result) => { 
      if (result.success) {
        toast({ title: "Success", description: "Category updated successfully." });
        await queryClient.invalidateQueries({ queryKey: ["categories"] });
        onClose();
      } else {
        toast({ variant: "destructive", title: "Error", description: result.error || "Failed to update category." });
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", title: "Error", description: error.message || "An unexpected error occurred." });
    },
  });

  const handleSubmit = async (values: CategoryFormValues) => {
    if (isEditMode && category) {
      // Type matches UpdateCategoryInput now
      updateMutation.mutate({ ...values, id: category.id }); 
    } else {
      // Type matches CategoryFormValues now
      createMutation.mutate(values);
    }
  };

  // Prepare initial data for the form if editing
  const initialData = isEditMode ? {
    id: category.id,
    name: category.name,
    type: category.type,
    bgColor: category.bgColor,
    fgColor: category.fgColor,
    icon: category.icon,
  } : undefined;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="flex flex-col h-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEditMode ? "Edit Category" : "Add New Category"}</SheetTitle>
          <SheetDescription>
            {isEditMode 
              ? "Update the details of your category."
              : "Create a new category to organize your transactions."}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 pr-6 px-4">
          <div className="mt-4">
            <CategoryForm 
              onSubmit={handleSubmit} 
              initialData={initialData}
              isPending={createMutation.isPending || updateMutation.isPending}
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
} 