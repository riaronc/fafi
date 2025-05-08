import Link from "next/link";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// TODO: Fetch real data using Server Actions + useQuery/Suspense
// import { getDashboardSummary } from "@/server/actions/dashboard.actions";

export default function DashboardPage() {
  // Placeholder data - replace with actual data fetching
  const summary = {
    totalIncome: 380000, // in cents
    incomeChange: 10,
    totalExpenses: 215000,
    expenseChange: 5,
    balance: 165000,
    currency: "USD",
  };
  const recentTransactions = [
    { id: "1", description: "Grocery Shopping", category: "Food", date: "June 15, 2024", amount: -8500 },
    { id: "2", description: "Salary", category: "Income", date: "June 1, 2024", amount: 380000 },
    { id: "3", description: "Netflix Subscription", category: "Entertainment", date: "June 5, 2024", amount: -1499 },
  ];

  // Helper to format currency - TODO: Move to utils or use formatBalance
  const formatCents = (amount: number, currency: string) => {
    return (amount / 100).toLocaleString('en-US', { style: 'currency', currency });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl pl-11 lg:pl-0">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your financial activity.
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCents(summary.totalIncome, summary.currency)}</div>
            {summary.incomeChange !== undefined && (
               <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500">+{summary.incomeChange}%</span> from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCents(summary.totalExpenses, summary.currency)}</div>
            {summary.expenseChange !== undefined && (
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-red-500">+{summary.expenseChange}%</span> from last month
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCents(summary.balance, summary.currency)}</div>
            <p className="text-xs text-muted-foreground">
              Current available balance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent Transactions</h2>
          <Button variant="outline" size="sm" asChild>
             {/* Ensure link points to the correct path within the (main) group */}
            <Link href="/transactions">View all</Link>
          </Button>
        </div>
        <Separator className="my-4" />
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">{tx.description}</TableCell>
                      <TableCell>{tx.category}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell className={`text-right font-medium ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCents(tx.amount, summary.currency)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-4">
                      No recent transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* TODO: Add Charts (Monthly Income/Expense, Expense Distribution) */}
      {/* <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Income vs Expense</CardTitle></CardHeader>
          <CardContent>Chart Placeholder</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Expense Distribution</CardTitle></CardHeader>
          <CardContent>Pie Chart Placeholder</CardContent>
        </Card>
      </div> */}
    </div>
  );
} 