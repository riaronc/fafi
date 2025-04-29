import { useEffect } from "react";
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

// Type for form values is now CreateTransactionInput
type FormValues = CreateTransactionInput;

interface MultiTransactionFormProps {
  id: string; // Unique ID for the form instance
  // eslint-disable-next-line no-unused-vars
  onValidityChange: (id: string, isValid: boolean) => void;
  className?: string;
}

// This seems like a sub-form meant to be used multiple times in a larger form
// It handles its own validation state and reports it upwards.
export function MultiTransactionForm({ id, onValidityChange, className }: MultiTransactionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "EXPENSE",
      description: "",
      amount: undefined,
      date: new Date(),
      accountId: undefined,
      categoryId: undefined,
    },
    mode: "onChange", // Validate on change
  });

  const transactionType = form.watch("type");

  // Update parent component about validity
  useEffect(() => {
    const subscription = form.watch(() => {
      onValidityChange(id, form.formState.isValid);
    });
    // Initial check
    onValidityChange(id, form.formState.isValid);
    return () => subscription.unsubscribe();
  }, [form, onValidityChange, id]);

  // We don't define onSubmit here as this form is likely part of a larger submission
  // function onSubmit(values: FormValues) { ... }

  return (
    <Form {...form}>
      {/* Use div instead of form element, submission handled by parent */}
      <div className={cn("space-y-4 p-4 border rounded-md", className)}> 
         {/* Type Selection */}
         <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
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
                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
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
                  <Input placeholder="Transaction description" {...field} value={field.value ?? ''} />
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
                  <Input 
                    type="number" 
                    step="0.01" 
                    placeholder="0.00" 
                    {...field} 
                    value={field.value ?? ''} 
                    onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

         {/* Account Selects (Conditional) */}
          {transactionType === 'TRANSFER' ? (
            <div className="grid grid-cols-2 gap-4">
               <FormField control={form.control} name="sourceAccountId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
                      <SelectContent>{/* TODO: Populate */}<SelectItem value="acc1">Checking</SelectItem></SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}/>
               <FormField control={form.control} name="destinationAccountId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select destination" /></SelectTrigger></FormControl>
                      <SelectContent>{/* TODO: Populate */}<SelectItem value="acc1">Checking</SelectItem></SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}/>
            </div>
          ) : (
             <FormField control={form.control} name="accountId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select account" /></SelectTrigger></FormControl>
                    <SelectContent>{/* TODO: Populate */}<SelectItem value="acc1">Checking</SelectItem></SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
          )}

         {/* Category Selection (Not for Transfer) */}
          {transactionType !== 'TRANSFER' && (
            <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                    <SelectContent>{/* TODO: Populate */}<SelectItem value="cat1">Food</SelectItem></SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
          )}
      </div>
    </Form>
  );
} 