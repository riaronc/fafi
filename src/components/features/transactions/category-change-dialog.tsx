"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, X, CircleHelp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

import { CategoryBasic, CategorySuggestion, getAllCategories, getCategorySuggestions } from "@/server/actions/category.actions";
import { updateTransactionCategory } from "@/server/actions/transaction.actions";
import { CategoryIcon } from "@/components/shared/category-icon";

interface CategoryChangeDialogProps {
    transactionId: string;
    isOpen: boolean;
    onClose: () => void; // Callback to signal parent to close (set editing ID to null)
}

// Helper to render a category item in lists
const CategoryItem = ({ category }: { category: CategoryBasic }) => (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2 ">
        <CategoryIcon iconName={category.icon} color={category.bgColor}  />
        <span className="text-[10px] truncate">{category.name}</span>
    </div>
);

export function CategoryChangeDialog({ 
    transactionId, 
    isOpen, 
    onClose 
}: CategoryChangeDialogProps) {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [initialCategoryId, setInitialCategoryId] = useState<string | null>(null);

    // Fetch all categories
    const { data: categoriesResult, isLoading: isLoadingCategories, error: categoriesError } = useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCategories,
        staleTime: 60 * 60 * 1000, // 1 hour
        enabled: isOpen,
    });

    // Fetch category suggestions
    const { data: suggestionsResult, isLoading: isLoadingSuggestions, error: suggestionsError } = useQuery({
        queryKey: ['categorySuggestions', transactionId],
        queryFn: () => getCategorySuggestions(transactionId),
        enabled: isOpen && !!transactionId,
        staleTime: 5 * 60 * 1000, // 5 mins
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: (variables: { transactionId: string; categoryId: string | null }) => 
            updateTransactionCategory(variables.transactionId, { categoryId: variables.categoryId }),
        onSuccess: (data, variables) => { 
            if (data.success) {
                toast({ title: "Category Updated" });
                queryClient.invalidateQueries({ queryKey: ['transactions'] });
                queryClient.invalidateQueries({ queryKey: ['categorySuggestions', variables.transactionId] });
                onClose();
            } else {
                toast({ variant: "destructive", title: "Update Failed", description: data.error });
            }
        },
        onError: (error) => {
            toast({ variant: "destructive", title: "Update Error", description: error.message });
        }
    });

    // Effect to set initial selected category ID when suggestions load
    useEffect(() => {
        if (isOpen && suggestionsResult?.success) {
            const current = suggestionsResult.data.find(s => s.source === 'current');
            const initialId = current?.id ?? null;
            setInitialCategoryId(initialId);
            setSelectedCategoryId(initialId); 
        }
         // Reset on close or transactionId change
         if (!isOpen) {
             setInitialCategoryId(null);
             setSelectedCategoryId(null);
         }
    }, [isOpen, suggestionsResult, transactionId]);

    const allCategories = useMemo(() => categoriesResult?.success ? categoriesResult.data : [], [categoriesResult]);
    const suggestedCategories = useMemo(() => suggestionsResult?.success ? suggestionsResult.data : [], [suggestionsResult]);

    const isLoading = isLoadingCategories || isLoadingSuggestions;
    const isSaving = updateMutation.isPending;
    const hasError = !!categoriesError || !!suggestionsError;

    const handleSave = () => {
        if (selectedCategoryId !== initialCategoryId && !isSaving) {
             updateMutation.mutate({ transactionId, categoryId: selectedCategoryId === "__NULL__" ? null : selectedCategoryId });
        }
    };

    const canSave = (selectedCategoryId !== initialCategoryId) && !isSaving;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}> 
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Change Category</DialogTitle>
                    {hasError && <DialogDescription className="text-destructive">Error loading category data.</DialogDescription>}
                </DialogHeader>
                {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <LoadingSpinner />
                    </div>
                ) : !hasError ? (
                    <div className="grid gap-4 py-1">
                        {/* Suggestions Section */} 
                        {suggestedCategories.length > 0 && (
                             <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground pl-1 pb-2">Suggestions</Label>
                                <RadioGroup
                                    className="flex gap-3"
                                    value={selectedCategoryId ?? "__NULL__"} // Handle null selection for RadioGroup
                                    onValueChange={(value) => setSelectedCategoryId(value === "__NULL__" ? null : value)}
                                >
                                    {suggestedCategories.map((suggestion) => (
                                        <Label 
                                            key={suggestion.id} 
                                            htmlFor={`cat-${suggestion.id}-sugg`} 
                                            className="flex flex-1 items-center space-x-2 py-2 px-2 rounded-md border border-transparent hover:border-border cursor-pointer has-[input:checked]:border-primary"
                                        >
                                            <RadioGroupItem value={suggestion.id} id={`cat-${suggestion.id}-sugg`} className="sr-only"/>
                                            <CategoryItem category={suggestion} />
                                             <Badge variant="secondary" className="text-xs ml-auto">{suggestion.source}</Badge>
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}

                         <Separator />

                        {/* All Categories Section */} 
                         <div className="space-y-1">
                             <Label className="text-xs text-muted-foreground pl-1 pb-2">All Categories</Label>
                             <ScrollArea className="h-56 w-full">
                                <RadioGroup
                                     value={selectedCategoryId ?? "__NULL__"}
                                     onValueChange={(value) => setSelectedCategoryId(value === "__NULL__" ? null : value)}
                                     className="grid grid-cols-3 sm:grid-cols-4 gap-2 "
                                 >
                                    {/* Option to Uncategorize */} 
                                    <Label 
                                        key="uncategorize" 
                                        htmlFor={`cat-null`} 
                                        className="flex flex-col items-center justify-center p-2 rounded-md border border-transparent hover:border-border cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-muted  text-center"
                                    >
                                        <RadioGroupItem value={"__NULL__"} id={`cat-null`} className="sr-only"/>
                                        <CircleHelp className="w-4 h-4 text-muted-foreground" />
                                         <span className="text-[10px] flex-1 text-muted-foreground italic leading-tight">
                                             Uncategorized
                                         </span>
                                     </Label>

                                    {/* Rest of categories */} 
                                    {allCategories
                                        .filter(cat => !suggestedCategories.some(s => s.id === cat.id)) 
                                        .map((category) => (
                                            <Label 
                                                key={category.id} 
                                                htmlFor={`cat-${category.id}`} 
                                                className={`flex flex-col justify-between items-center space-x-2 py-2 px-2 rounded-md border border-transparent hover:border-border min-h-[50px] cursor-pointer has-[input:checked]:border-primary bg-[${category.bgColor}]`}
                                            >
                                                <RadioGroupItem value={category.id} id={`cat-${category.id}`} className="sr-only"/>
                                                <CategoryItem category={category} />
                                            </Label>
                                    ))}
                                </RadioGroup>
                             </ScrollArea>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-10 text-muted-foreground">
                         Could not load categories.
                     </div>
                )}
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={!canSave || isSaving}
                    >
                        {isSaving && <LoadingSpinner size="sm" className="mr-2" />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 