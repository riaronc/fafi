"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; // For category fallback
import { CategoryIcon } from "@/components/shared/category-icon"; // Assume this component exists
import { TableTransaction } from "@/types/entities";
import { formatBalance } from "@/lib/utils";

// Type for the delete handler passed into the columns
type HandleDeleteFn = (id: string) => void;

export const getTransactionColumns = (handleDelete: HandleDeleteFn): ColumnDef<TableTransaction>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "categoryIcon",
    header: "", // No header text for icon
    cell: ({ row }) => (
        <CategoryIcon 
            iconName={row.original.categoryIcon} 
            color={row.original.categoryColor}
            tooltip={row.original.category} // Show category name on hover
        />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} // Allow sorting
        >
          Amount
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("amount");
      const currency = row.original.currency;
      const formatted = formatBalance(amount, currency);
      // Color based on amount (positive/negative)
      const colorClass = amount < 0 ? 'text-red-600' : amount > 0 ? 'text-green-600' : 'text-muted-foreground';
      return <div className={`text-right font-medium ${colorClass}`}>{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => <div className="truncate max-w-[150px]">{row.getValue("account")}</div>,
    enableSorting: false, // Usually don't sort by combined account name
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="truncate max-w-[250px]">{row.getValue("description")}</div>,
    enableSorting: false, // Don't sort by description
  },
//   {
//     // Removed Date column as grouping handles it
//     accessorKey: "date",
//     header: ({ column }) => (
//        <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Date
//        </Button>
//     ),
//     cell: ({ row }) => format(row.getValue("date"), "PPP"), 
//     enableSorting: true,
//   },
//   {
//     // Removed Category name column, icon + tooltip replaces it
//     accessorKey: "category",
//     header: "Category",
//     cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>,
//     enableSorting: true, 
//   },
//   {
//     // Removed Type column as requested
//     accessorKey: "type",
//     header: "Type",
//     cell: ({ row }) => <Badge variant={row.getValue("type") === 'INCOME' ? 'default' : row.getValue("type") === 'EXPENSE' ? 'destructive' : 'secondary'}>{row.getValue("type")}</Badge>,
//     enableSorting: true,
//   },
   {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href={`/transactions/${transaction.id}`}>Edit</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>View Details</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-700 focus:bg-red-100"
              onClick={() => handleDelete(transaction.id)} 
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
]; 