"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  Plus, 
  Download, 
  Search, 
  ChevronDown, 
  CreditCard, 
  Filter, 
  ArrowUpDown 
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

// Mock data for now - would be replaced with real data fetching
type Transaction = {
  id: string;
  date: Date;
  description: string;
  category: string;
  account: string;
  amount: number;
}

const mockData: Transaction[] = [
  {
    id: "1",
    date: new Date("2023-06-15"),
    description: "Grocery Shopping",
    category: "Food",
    account: "Checking Account",
    amount: -8500,
  },
  {
    id: "2",
    date: new Date("2023-06-01"),
    description: "Salary",
    category: "Income",
    account: "Savings Account",
    amount: 380000,
  },
  {
    id: "3",
    date: new Date("2023-06-05"),
    description: "Netflix Subscription",
    category: "Entertainment",
    account: "Credit Card",
    amount: -1499,
  },
  // Add more mock data for pagination testing
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 4}`,
    date: new Date(2023, 5, Math.floor(Math.random() * 30) + 1),
    description: `Transaction ${i + 4}`,
    category: ["Food", "Entertainment", "Transport", "Bills", "Income"][Math.floor(Math.random() * 5)],
    account: ["Checking Account", "Savings Account", "Credit Card"][Math.floor(Math.random() * 3)],
    amount: Math.random() > 0.7 ? Math.floor(Math.random() * 100000) : -Math.floor(Math.random() * 10000),
  })),
];

// Format currency helper
const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export default function TransactionsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [hasMonobankToken, setHasMonobankToken] = useState(false);

  // Check if user has monobank token - replace with real check in production
  useEffect(() => {
    // Mock API call to check if user has connected monobank
    // Would be replaced with real API call
    const checkMonobank = async () => {
      // Simulate API call
      setTimeout(() => {
        setHasMonobankToken(Math.random() > 0.5);
      }, 500);
    };
    
    checkMonobank();
  }, []);

  const columns: ColumnDef<Transaction>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            
            if (value) {
              setSelectedRows(table.getRowModel().rows.map(row => row.original.id));
            } else {
              setSelectedRows([]);
            }
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            
            if (value) {
              setSelectedRows(prev => [...prev, row.original.id]);
            } else {
              setSelectedRows(prev => prev.filter(id => id !== row.original.id));
            }
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const date = row.getValue("date") as Date;
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="font-medium">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        return (
          <Badge variant="outline">{row.getValue("category")}</Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "account",
      header: "Account",
      cell: ({ row }) => {
        return <div>{row.getValue("account")}</div>;
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number;
        return (
          <div className={`text-right ${amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {formatCurrency(amount)}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Actions <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/transactions/${transaction.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/transactions/${transaction.id}/details`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: mockData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-6">
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
            placeholder="Search transactions..."
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
              {/* Categories filter */}
              <DropdownMenuItem>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem>
                Income
              </DropdownMenuItem>
              <DropdownMenuItem>
                Food
              </DropdownMenuItem>
              <DropdownMenuItem>
                Entertainment
              </DropdownMenuItem>
              <DropdownMenuItem>
                Transport
              </DropdownMenuItem>
              <DropdownMenuItem>
                Bills
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          
          {hasMonobankToken ? (
            <Button variant="outline" size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Sync Bank
            </Button>
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
      
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
          <span>{selectedRows.length} selected</span>
          <Button variant="outline" size="sm">
            Categorize
          </Button>
          <Button variant="outline" size="sm" className="text-red-600">
            Delete
          </Button>
        </div>
      )}
      
      <Card>
        <CardContent className="p-0">
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            />
          </PaginationItem>
          {Array.from({length: table.getPageCount()}, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={table.getState().pagination.pageIndex === page - 1}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
} 