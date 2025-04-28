"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MultiTransactionForm } from "@/components/forms/multi-transaction-form";

interface TransactionFormState {
  id: string;
  isValid: boolean;
}

export default function NewTransactionPage() {
  const [transactionForms, setTransactionForms] = useState<TransactionFormState[]>([
    { id: '1', isValid: false }
  ]);

  const handleAddMore = () => {
    setTransactionForms([...transactionForms, { id: Date.now().toString(), isValid: false }]);
  };

  const handleFormValidityChange = (id: string, isValid: boolean) => {
    setTransactionForms(
      transactionForms.map(form => 
        form.id === id ? { ...form, isValid } : form
      )
    );
  };

  const isAddMoreDisabled = transactionForms.some(form => !form.isValid);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
          <p className="text-muted-foreground">
            Create new financial transactions
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/transactions">Cancel</Link>
        </Button>
      </div>
      
      <div className="space-y-6">
        {transactionForms.map((form, index) => (
          <Card key={form.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-medium">Transaction {index + 1}</h3>
            </div>
            <MultiTransactionForm 
              id={form.id} 
              onValidityChange={(isValid: boolean) => handleFormValidityChange(form.id, isValid)} 
            />
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleAddMore}
          disabled={isAddMoreDisabled}
        >
          + Add More
        </Button>
        
        <Button type="submit">
          Save Transactions
        </Button>
      </div>
    </div>
  );
} 