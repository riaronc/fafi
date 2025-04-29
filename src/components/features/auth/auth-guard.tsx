'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

// This component provides client-side route protection
// It should ideally be used within layouts that require authentication
// to handle loading states and redirects if middleware hasn't caught it yet
// or if the session expires while the user is active.
export function AuthGuard({ children }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  // Track initial check state separately from session loading status
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      if (!session) {
        // Redirect to login, preserving the intended path
        const callbackUrl = pathname ? `?callbackUrl=${encodeURIComponent(pathname)}` : '';
        router.replace(`/auth/login${callbackUrl}`); // Use replace to avoid back button issues
      } else {
        // Session exists, finished checking
        setIsChecking(false);
      }
    } 
    // Dependency array includes status and session presence
  }, [session, status, router, pathname]);

  // Show loading state if session is loading OR if we are still performing the initial check
  if (status === 'loading' || isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If status is loaded, not checking anymore, and session exists, render children
  // The redirect case is handled by the useEffect hook.
  return <>{children}</>;
} 