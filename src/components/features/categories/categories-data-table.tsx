"use client";

import React, { useState, useMemo } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { CategoryType, categories as CategoriesModel } from "@/server/db/client";
import { getCategories, createDefaultCategories } from "@/server/actions/category.actions"; 
import { useToast } from "@/components/ui/use-toast";
import { CategorySheet } from "./category-sheet";
import { DeleteCategoryDialog } from "./delete-category-dialog";
import { CategoryCard } from "./category-card"; // Import the new card component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Sparkles } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function CategoriesDataTable() { // Renaming might be appropriate later (e.g., CategoriesGrid)
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // State for filtering and modals
  const [nameFilter, setNameFilter] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoriesModel | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoriesModel | null>(null);

  // --- Data Fetching ---
  const categoriesQuery = useQuery<CategoriesModel[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
        const result = await getCategories(); // Fetch all
        if (!result.success) {
            throw new Error(result.error || "Failed to fetch categories");
        }
        return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // --- Filter Data Client-Side --- 
  const filteredCategories = useMemo(() => {
    const allCategories = categoriesQuery.data ?? [];
    const lowerCaseFilter = nameFilter.toLowerCase();
    return allCategories.filter(cat => 
        cat.name.toLowerCase().includes(lowerCaseFilter)
    );
  }, [categoriesQuery.data, nameFilter]);

  const { incomeCategories, expenseCategories } = useMemo(() => {
    // Filter the already name-filtered list
    return {
      incomeCategories: filteredCategories.filter(cat => cat.type === CategoryType.INCOME),
      // Include BOTH in expenses for now
      expenseCategories: filteredCategories.filter(cat => cat.type === CategoryType.EXPENSE || cat.type === CategoryType.BOTH), 
    };
  }, [filteredCategories]);

  // --- Mutation for Adding Defaults ---
  const createDefaultsMutation = useMutation({
     mutationFn: createDefaultCategories,
     onSuccess: (result) => {
       if (result.success) {
         if (result.added > 0) {
           toast({ title: "Defaults Added", description: `${result.added} default categories added successfully.` });
           queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refetch categories
         } else {
           toast({ title: "No Action Needed", description: "You already have all the default categories." });
         }
       } else {
         toast({ variant: "destructive", title: "Failed to Add Defaults", description: result.error });
       }
     },
     onError: (error) => {
        toast({ variant: "destructive", title: "Error", description: error.message });
     }
  });

  // --- Handlers ---
  const handleOpenEditSheet = (category: CategoriesModel) => {
    setCurrentCategory(category);
    setIsSheetOpen(true);
  };

  const handleOpenDeleteDialog = (category: CategoriesModel) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setCurrentCategory(null); 
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleOpenAddSheet = () => {
    setCurrentCategory(null); 
    setIsSheetOpen(true);
  };

  // --- Render Grid Section ---
  const renderGridSection = (title: string, categories: CategoriesModel[]) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">{title}</h2>
      {categories.length === 0 ? (
         <p className="text-muted-foreground text-sm">No {title.toLowerCase()} found.</p>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
           {categories.map(category => (
             <CategoryCard 
               key={category.id} 
               category={category} 
               onEdit={handleOpenEditSheet}
               onDelete={handleOpenDeleteDialog}
             />
           ))}
         </div>
       )
      }

    </div>
  );

  // --- Main Render ---
  return (
    <div className="space-y-4">
      {/* Toolbar */} 
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
           <Input
             placeholder="Filter categories by name..."
             value={nameFilter}
             onChange={(event) => setNameFilter(event.target.value)}
             className="pl-8"
           />
        </div>
        <div className="flex items-center gap-2">
              {/* Add Default Categories Button */} 
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => createDefaultsMutation.mutate()}
        disabled={createDefaultsMutation.isPending}
      >
        {createDefaultsMutation.isPending ? (
           <LoadingSpinner size="sm" className="mr-2"/>
         ) : (
           <Sparkles className="mr-2 h-4 w-4" />
         )}
        Add Defaults
      </Button>
        {/* Add Category Button */} 
        <Button onClick={handleOpenAddSheet} size="sm">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
        </div>
      </div>

      {/* Loading State */} 
      {categoriesQuery.isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Error State */} 
      {categoriesQuery.isError && (
         <div className="text-center text-red-600 py-10">
           Error loading categories: {categoriesQuery.error.message}
         </div>
      )}

      {/* Content State */}
      {!categoriesQuery.isLoading && !categoriesQuery.isError && (
        <div>
          {filteredCategories.length === 0 && nameFilter ? (
             <p className="text-center text-muted-foreground py-10">
               No categories found matching "{nameFilter}".
             </p>
           ) : filteredCategories.length === 0 && !nameFilter ? (
             <p className="text-center text-muted-foreground py-10">
               No categories created yet.
             </p>
           ) : (
             <> 
              {renderGridSection("Income Categories", incomeCategories)}
              {renderGridSection("Expense Categories", expenseCategories)}
             </>
           )
          }
        </div>
      )}

      {/* Sheet for Add/Edit */} 
      <CategorySheet 
        isOpen={isSheetOpen} 
        onClose={handleCloseSheet} 
        category={currentCategory} 
      />

      {/* Dialog for Delete Confirmation */} 
      <DeleteCategoryDialog 
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        categoryId={categoryToDelete?.id ?? null}
        categoryName={categoryToDelete?.name}
      />
    </div>
  );
} 