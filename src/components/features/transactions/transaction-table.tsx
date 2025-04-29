"use client";

import React, { useMemo, useEffect } from "react";
import { 
    useReactTable, 
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    RowSelectionState,
    SortingState,
    PaginationState,
    Row
} from "@tanstack/react-table";
import { format } from 'date-fns';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { getTransactionColumns } from "./transaction-columns"; 
import { TableTransaction, TableTransactionWithDateSeparator } from "@/types/entities";

// Define props for the TransactionTable component
interface TransactionTableProps {
    tableData: TableTransactionWithDateSeparator[]; // Expect flat data with flags
    isLoading: boolean;
    isFetching: boolean;
    // Table state and handlers passed from the hook
    rowSelection: RowSelectionState;
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    pageCount: number;
    handleDelete: (id: string) => void; // Pass delete handler
}

export function TransactionTable({
    tableData, // Use tableData prop
    isLoading,
    isFetching,
    rowSelection,
    setRowSelection,
    sorting, 
    setSorting,
    pagination,
    setPagination,
    pageCount,
    handleDelete,
}: TransactionTableProps) {

    // Get columns definition
    const columns = useMemo(() => getTransactionColumns(handleDelete), [handleDelete]);


    // Create react-table instance using tableData directly
    const table = useReactTable({
        data: tableData ?? [], // Ensure data is always an array, even if initially undefined
        columns,
        state: {
            sorting,
            pagination,
            rowSelection,
        },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true, // Filters are handled externally by the hook
        pageCount: pageCount,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableRowSelection: true,
    });
    
    // // --- DEBUG LOGGING START ---
    // // Log after table instance is created/updated
    // useEffect(() => {
    //     if (table) {
    //         console.log("[TransactionTable] table.getRowModel().rows:", table.getRowModel().rows);
    //         console.log("[TransactionTable] table.getRowModel().rows.length:", table.getRowModel().rows.length);
    //     }
    // }, [table]); // Re-log if the table instance itself changes

    // useEffect(() => {
    //    // Log specifically when the row model updates
    //    if (table) {
    //         const rows = table.getRowModel().rows;
    //         console.log("[TransactionTable] Row model updated, length:", rows.length);
    //    }
    // }, [table?.getRowModel().rows]); // Dependency on the rows array reference
    // // --- DEBUG LOGGING END ---

    // Calculate total selected count from potentially non-rendered rows
    const selectedRowCount = Object.keys(rowSelection).length;
    // Ensure table instance is available before calling methods, default to 0
    const totalRowCount = table ? table.getRowCount() : 0; 

    return (
        <Card className="flex-1 overflow-hidden relative border shadow-sm rounded-lg py-0">
            {(isLoading || isFetching) && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                    <LoadingSpinner size="lg" />
                </div>
            )}
            <CardContent className="p-0 flex flex-col h-full">
                <div className="flex-1 overflow-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} colSpan={header.colSpan}>
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
                            {table.getRowModel().rows.length === 0 && !isLoading && !isFetching ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No transactions found for the selected criteria.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Iterate through rows provided by react-table
                                table.getRowModel().rows.map((row) => (
                                    <React.Fragment key={row.id}>
                                        {/* Conditionally render Date Separator Row - Cast original */} 
                                        {(row.original as TableTransactionWithDateSeparator).showDateSeparator && (
                                            <TableRow className="bg-muted/50 hover:bg-muted/50 sticky top-0 z-[1]">
                                                <TableCell colSpan={columns.length} className="py-2 px-4 font-semibold text-muted-foreground">
                                                    {/* Access date normally as it exists on base type */}
                                                    {format(row.original.date, 'PPP')}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {/* Render the actual transaction row */}
                                        <TableRow data-state={row.getIsSelected() && "selected"}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                             {selectedRowCount} selected
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm">Rows per page</span>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value: string) => table.setPageSize(Number(value))}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 20, 30, 40, 50].map((size) => (
                                        <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="text-sm font-medium">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
                            </div>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0 hidden lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            ><span className="sr-only">Go to first page</span><ChevronsLeft className="h-4 w-4" /></Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            ><span className="sr-only">Go to previous page</span><ChevronLeft className="h-4 w-4" /></Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            ><span className="sr-only">Go to next page</span><ChevronRight className="h-4 w-4" /></Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0 hidden lg:flex"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            ><span className="sr-only">Go to last page</span><ChevronsRight className="h-4 w-4" /></Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 