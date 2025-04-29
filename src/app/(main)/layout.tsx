import { Sidebar } from "@/components/layout/sidebar";
// Updated import path for AuthGuard
import { AuthGuard } from "@/components/features/auth/auth-guard"; 

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        {/* TODO: Check responsiveness and add potential header/navbar if needed */}
        <main className="flex-1 max-h-screen overflow-y-auto p-4 md:p-6"> {/* Added padding */}
          {children}
        </main>
      </div>
    </AuthGuard>
  );
} 