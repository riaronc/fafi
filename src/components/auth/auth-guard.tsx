'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the session status is loaded (not loading) and there's no session
    if (status !== 'loading') {
      if (!session) {
        // Redirect to login
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(pathname || '/dashboard')}`);
      } else {
        setIsLoading(false);
      }
    }
  }, [session, status, router, pathname]);

  // Show loading state while checking session
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If authenticated, render children
  return <>{children}</>;
} 