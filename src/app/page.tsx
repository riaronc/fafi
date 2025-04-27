import Link from "next/link";
import { ArrowRight, BarChart3, CreditCard, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">FAFI</span>
          </div>
          <nav className="hidden md:flex gap-4">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Take Control of Your Finances
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track expenses, manage budgets, and make informed financial decisions with FAFI - your personal financial management solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth/register">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[500px] rounded-lg bg-gradient-to-b from-primary/20 to-muted p-2">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
                    Financial Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="features">
          <div className="container mx-auto  px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Why Choose FAFI
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers everything you need to manage your finances effectively.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CreditCard className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Track Expenses</CardTitle>
                  <CardDescription>
                    Monitor your spending habits and track where your money goes
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <PieChart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Manage Budgets</CardTitle>
                  <CardDescription>
                    Create and stick to budgets for different expense categories
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Financial Insights</CardTitle>
                  <CardDescription>
                    Gain valuable insights through visual reports and analytics
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container  flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="text-center mx-auto  text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 FAFI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
