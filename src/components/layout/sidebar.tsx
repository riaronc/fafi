import Link from "next/link";
import { LucideIcon, Home, CreditCard, PieChart, BarChart3, Settings, User, DollarSign, Folder } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-64 border-r h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            <Link href="/dashboard">FAFI</Link>
          </h2>
          <p className="text-xs text-muted-foreground px-2">
            Financial Management
          </p>
        </div>
        <Separator />
        <nav className="grid gap-1 px-2">
          <SidebarItem icon={Home} href="/dashboard" title="Dashboard" />
          <SidebarItem icon={DollarSign} href="/transactions" title="Transactions" />
          <SidebarItem icon={CreditCard} href="/accounts" title="Accounts" />
          <SidebarItem icon={Folder} href="/categories" title="Categories" />
          <SidebarItem icon={PieChart} href="/budgets" title="Budgets" />
          <SidebarItem icon={BarChart3} href="/reports" title="Reports" />
          <SidebarItem icon={Settings} href="/settings" title="Settings" />
          <SidebarItem icon={User} href="/profile" title="Profile" />
        </nav>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
}

function SidebarItem({ icon: Icon, title, href }: SidebarItemProps) {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild>
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </Button>
  );
} 