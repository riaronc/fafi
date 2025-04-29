import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
// Import the specific transaction Zod schema and types
import { createTransactionSchema, CreateTransactionInput } from "@/lib/zod/transaction.schema";

// Remove local schema definition
// const formSchema = z.object({ ... });

// TODO: Props should include:
// - onSubmit handler (which likely calls a useMutation hook)
// - Initial values (for editing)
// - List of accounts & categories for selects
export function TransactionForm() {
  // Use the imported schema and type
  const form = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      // Provide defaults based on the discriminated union type
      type: "EXPENSE", // Default type
      description: "",
      amount: undefined, // Use undefined for optional number placeholder
      date: new Date(),
      accountId: undefined, // Account will be selected
      categoryId: undefined, // Category will be selected
      // Transfer fields are not present by default
    },
  });

  const transactionType = form.watch("type");

  // TODO: Replace with actual submit logic via props
  function onSubmit(values: CreateTransactionInput) {
    console.log("Submitting Transaction:", values);
    // Example:
    // if (values.type === 'TRANSFER') {
    //   createTransferMutation.mutate(values);
    // } else {
    //   createIncomeExpenseMutation.mutate(values);
    // }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6 pt-6">
             {/* Type Selection */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INCOME">Income</SelectItem>
                      <SelectItem value="EXPENSE">Expense</SelectItem>
                      <SelectItem value="TRANSFER">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Date Selection */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Groceries, Salary, etc." 
                      {...field} 
                      value={field.value ?? ''} // Handle null value for input
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                     {/* Use text input for better decimal handling, validation via Zod */}
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="0.00" 
                      {...field} 
                      value={field.value ?? ''} // Handle undefined/null
                      onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))} // Parse float
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Account Selects (Conditional) */}
            {transactionType === 'TRANSFER' ? (
              <div className="grid grid-cols-2 gap-4">
                 {/* Source Account (Transfer) */}
                 <FormField
                    control={form.control}
                    name="sourceAccountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Account</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
                          <SelectContent>
                             {/* TODO: Populate with user accounts */} 
                            <SelectItem value="acc1">Checking</SelectItem>
                            <SelectItem value="acc2">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 {/* Destination Account (Transfer) */}
                 <FormField
                    control={form.control}
                    name="destinationAccountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Account</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger></FormControl>
                           <SelectContent>
                             {/* TODO: Populate with user accounts */} 
                             <SelectItem value="acc1">Checking</SelectItem>
                            <SelectItem value="acc2">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
            ) : (
              // Account (Income/Expense)
               <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger></FormControl>
                         <SelectContent>
                           {/* TODO: Populate with user accounts */} 
                           <SelectItem value="acc1">Checking</SelectItem>
                          <SelectItem value="acc2">Savings</SelectItem>
                          <SelectItem value="acc3">Cash</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            )}

             {/* Category Selection (Not for Transfer) */}
            {transactionType !== 'TRANSFER' && (
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                      <SelectContent>
                         {/* TODO: Populate with user categories based on type (Income/Expense) */}
                         <SelectItem value="cat1">Food</SelectItem>
                        <SelectItem value="cat2">Salary</SelectItem>
                        <SelectItem value="cat3">Transport</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            {/* TODO: Add Cancel button functionality */} 
            <Button type="button" variant="outline">Cancel</Button>
            <Button type="submit">Save Transaction</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
} 