import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

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
  const token = req.cookies.get('token')?.value;

  // If there's no token, redirect to login page
  if (!token) {
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify token
    verify(token, process.env.JWT_SECRET || 'fallback_secret_key_change_in_production');
    return NextResponse.next();
  } catch (error) {
    // Token is invalid
    console.error('Token verification failed:', error);
    
    // Clear the invalid token
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    response.cookies.delete('token');
    
    return response;
  }
} 