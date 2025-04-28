"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { 
  Plus, 
  Download, 
  Search, 
  ChevronDown, 
  CreditCard, 
  Filter, 
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useTransactions, type TableTransaction } from "@/hooks/useTransactions";
import { useAccount } from "@/hooks/useAccount";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Format currency helper
const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export default function TransactionsPage() {
  const {
    table,
    columns,
    selectedRowIds,
    syncMonobankTransactions,
    isLoadingTransactions,
    isSyncing,
  } = useTransactions({});

  const { accounts, isLoading: isLoadingAccounts } = useAccount();

  const [hasMonobankToken, setHasMonobankToken] = useState(false);

  const lastSyncTime = useMemo(() => {
    const linkedMonoAccounts = accounts.filter(acc => acc.bankId);
    if (!linkedMonoAccounts.length) return null;

    const updateTimes = linkedMonoAccounts
        .map(acc => new Date(acc.updatedAt))
        .filter(date => !isNaN(date.getTime()));
        
    if (!updateTimes.length) return null;
    
    const maxTime = Math.max(...updateTimes.map(date => date.getTime()));
    return new Date(maxTime);
  }, [accounts]);

  const formattedLastSync = useMemo(() => {
    if (!lastSyncTime) return "Never synced";
    return lastSyncTime.toLocaleString();
  }, [lastSyncTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMonobankToken(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your transaction history
          </p>
        </div>
        
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search descriptions..."
              className="w-full bg-background pl-8"
              value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("description")?.setFilterValue(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuItem>Income</DropdownMenuItem>
                <DropdownMenuItem>Food</DropdownMenuItem>
                <DropdownMenuItem>Entertainment</DropdownMenuItem>
                <DropdownMenuItem>Transport</DropdownMenuItem>
                <DropdownMenuItem>Bills</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            {hasMonobankToken ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={syncMonobankTransactions}
                    disabled={isSyncing || isLoadingTransactions}
                  >
                    {isSyncing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard className="mr-2 h-4 w-4" />
                    )}
                    Sync Bank
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Last successful sync: {formattedLastSync}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/accounts">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Connect Bank
                </Link>
              </Button>
            )}
            
            <Button size="sm" asChild>
              <Link href="/transactions/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Link>
            </Button>
          </div>
        </div>
        
        {selectedRowIds.length > 0 && (
          <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
            <span>{selectedRowIds.length} selected</span>
            <Button variant="outline" size="sm">
              Categorize
            </Button>
            <Button variant="outline" size="sm" className="text-red-600">
              Delete
            </Button>
          </div>
        )}
        
        <Card className="flex-1 overflow-hidden relative">
          {isLoadingTransactions && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          <CardContent className="p-0 flex flex-col h-full">
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {!isLoadingTransactions && table.getRowModel().rows.length === 0 ? (
                     <TableRow>
                       <TableCell colSpan={columns.length} className="h-24 text-center">
                         No transactions found.
                       </TableCell>
                     </TableRow>
                   ) : (
                     table.getRowModel().rows.map((row) => (
                      <TableRow 
                        key={row.id} 
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
             <div className="flex w-[100px] items-center justify-center text-sm font-medium">
               Page {table.getState().pagination.pageIndex + 1} of{" "}
               {table.getPageCount()}
             </div>
             <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
             >
               Previous
             </Button>
             <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
             >
               Next
             </Button>
           </div>
        </div>
      </div>
    </TooltipProvider>
  );
} 