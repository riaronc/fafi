import { signOut } from 'next-auth/react';

/**
 * A wrapper around the native fetch function that automatically handles
 * session expiry (401 Unauthorized) by redirecting to the login page.
 */
export const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const response = await fetch(input, init);

  if (response.status === 401) {
    // Session expired or invalid
    console.warn('Session expired. Redirecting to login...');
    // Use signOut from next-auth to clear client-side session and redirect
    // The callbackUrl ensures the user returns to the current page after login.
    await signOut({ callbackUrl: '/auth/login' }); 
    // Throw an error to prevent further processing in the original caller
    // Or return a specific object/response? Throwing seems clearer.
    throw new Error('Session expired'); 
  }

  return response;
}; 