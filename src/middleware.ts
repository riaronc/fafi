import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/transactions/:path*',
    '/accounts/:path*',
    '/categories/:path*',
    '/budgets/:path*',
    '/reports/:path*',
    '/settings/:path*',
    '/profile/:path*',
    '/api/transactions/:path*',
    '/api/accounts/:path*',
    '/api/categories/:path*',
    '/api/budgets/:path*',
  ],
};

export async function middleware(req: NextRequest) {
  const session = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_key_change_in_production',
  });

  // If user is not authenticated, redirect to login
  if (!session) {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // If user is authenticated, allow the request
  return NextResponse.next();
} 