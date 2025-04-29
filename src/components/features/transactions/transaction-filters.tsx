'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TransactionType, accounts as Account, categories as Category } from '@prisma/client';
import { CalendarIcon, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getAccounts } from '@/server/actions/account.actions';
import { getCategories } from '@/server/actions/category.actions';

// Define the shape of the filters this component manages
export interface TransactionFilterValues {
  type?: TransactionType;
  accountId?: string;
  categoryId?: string;
  dateRange?: DateRange;
}

interface TransactionFiltersProps {
  initialFilters?: TransactionFilterValues;
  // eslint-disable-next-line no-unused-vars
  onChange: (filters: TransactionFilterValues) => void;
  className?: string;
}

// Define return type from getCategories for useQuery
// Assuming getCategories returns: { success: boolean; data?: Category[]; error?: string }
type CategoriesQueryResult = Awaited<ReturnType<typeof getCategories>>;

export function TransactionFilters({ 
  initialFilters = {}, 
  onChange, 
  className 
}: TransactionFiltersProps) {
  
  // --- Local State for Filters ---
  const [selectedType, setSelectedType] = useState<TransactionType | undefined>(initialFilters.type);
  const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(initialFilters.accountId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(initialFilters.categoryId);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(initialFilters.dateRange);

  // --- Data Fetching for Selects ---
  const { data: accountsResult } = useQuery({
    queryKey: ['accounts'],
    queryFn: getAccounts,
    staleTime: Infinity, // Accounts unlikely to change frequently during filter session
  });
  const accounts = accountsResult?.success ? accountsResult.data : [];

  // Fetch categories
  const { data: categoriesResult, isLoading: isLoadingCategories } = useQuery<CategoriesQueryResult>({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    staleTime: Infinity, 
  });
  // Use fetched categories, default to empty array, ensure result is defined
  const categories = categoriesResult?.success ? (categoriesResult.data as Category[]) : []; 

  // --- Effect to call onChange when filters change ---
  useEffect(() => {
    onChange({
      type: selectedType,
      accountId: selectedAccountId,
      categoryId: selectedCategoryId,
      dateRange: selectedDateRange,
    });
  }, [selectedType, selectedAccountId, selectedCategoryId, selectedDateRange, onChange]);
  
  // --- Reset individual filters ---
  const resetType = () => setSelectedType(undefined);
  const resetAccount = () => setSelectedAccountId(undefined);
  const resetCategory = () => setSelectedCategoryId(undefined);
  const resetDateRange = () => setSelectedDateRange(undefined);
  
  // --- Reset all filters ---
  const resetAll = () => {
     resetType();
     resetAccount();
     resetCategory();
     resetDateRange();
  }

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md", className)}>
      {/* Type Filter */}
      <div className="space-y-1">
         <Label htmlFor="filter-type">Type</Label>
         <div className="flex items-center gap-1">
           <Select 
             value={selectedType} 
             onValueChange={(value: TransactionType | 'all') => setSelectedType(value === 'all' ? undefined : value)}
           >
             <SelectTrigger id="filter-type"><SelectValue placeholder="All Types" /></SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All Types</SelectItem>
               <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
               <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
               <SelectItem value={TransactionType.TRANSFER}>Transfer</SelectItem>
             </SelectContent>
           </Select>
           {selectedType && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetType}><X className="h-4 w-4"/></Button>}
         </div>
      </div>

      {/* Account Filter */}
      <div className="space-y-1">
         <Label htmlFor="filter-account">Account</Label>
          <div className="flex items-center gap-1">
            <Select 
              value={selectedAccountId} 
              onValueChange={(value) => setSelectedAccountId(value === 'all' ? undefined : value)}
            >
              <SelectTrigger id="filter-account"><SelectValue placeholder="All Accounts" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {(accounts ?? []).map(acc => <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>)}
              </SelectContent>
            </Select>
             {selectedAccountId && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetAccount}><X className="h-4 w-4"/></Button>}
          </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-1">
         <Label htmlFor="filter-category">Category</Label>
          <div className="flex items-center gap-1">
            <Select 
              value={selectedCategoryId} 
              onValueChange={(value) => setSelectedCategoryId(value === 'all' ? undefined : value)}
              disabled={isLoadingCategories || categories.length === 0} 
            >
              <SelectTrigger id="filter-category">
                 <SelectValue placeholder={isLoadingCategories ? "Loading..." : "All Categories"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* Map over categories (already defaulted to []) */}
                {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
              </SelectContent>
            </Select>
             {selectedCategoryId && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetCategory}><X className="h-4 w-4"/></Button>}
          </div>
      </div>

      {/* Date Range Filter */}
      <div className="space-y-1">
        <Label htmlFor="filter-date">Date Range</Label>
        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="filter-date"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDateRange?.from ? (
                  selectedDateRange.to ? (
                    <>
                      {format(selectedDateRange.from, "LLL dd, y")} - {" "}
                      {format(selectedDateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(selectedDateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedDateRange?.from}
                selected={selectedDateRange}
                onSelect={setSelectedDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
           {selectedDateRange && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetDateRange}><X className="h-4 w-4"/></Button>}
        </div>
      </div>
      
      {/* Reset All Button */}
       <div className="col-span-full flex justify-end pt-2">
          <Button variant="ghost" size="sm" onClick={resetAll}>Reset Filters</Button>
       </div>

    </div>
  );
} 