"use client";

import Link from "next/link";
import { LucideIcon, Home, CreditCard, PieChart, BarChart3, Settings, User, DollarSign, Folder, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserNav } from "@/components/layout/user-nav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when screen resizes to larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={cn(
          "pb-12 w-64 border-r h-screen flex flex-col fixed top-0 left-0 z-40 bg-background transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:relative lg:h-screen",
          className
        )}
      >
        <div className="space-y-4 py-4 flex-1">
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
            <SidebarItem icon={Home} href="/dashboard" title="Dashboard" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={DollarSign} href="/transactions" title="Transactions" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={CreditCard} href="/accounts" title="Accounts" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Folder} href="/categories" title="Categories" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={PieChart} href="/budgets" title="Budgets" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={BarChart3} href="/reports" title="Reports" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={Settings} href="/settings" title="Settings" onClick={() => setIsOpen(false)} />
            <SidebarItem icon={User} href="/profile" title="Profile" onClick={() => setIsOpen(false)} />
          </nav>
        </div>
        <div className="mt-auto border-t pt-4 px-4">
          <UserNav />
        </div>
      </div>
    </>
  );
}

interface SidebarItemProps {
  icon: LucideIcon;
  title: string;
  href: string;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, title, href, onClick }: SidebarItemProps) {
  return (
    <Button variant="ghost" className="w-full justify-start" asChild onClick={onClick}>
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </Button>
  );
} 