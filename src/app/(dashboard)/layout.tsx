import { Sidebar } from "@/components/layout/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <header className="border-b">
            <div className="flex h-16 items-center px-4 justify-end">
              <UserNav />
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
} 