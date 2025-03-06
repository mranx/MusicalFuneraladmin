import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname);
  
  // Check if path starts with /music or /dashboard
  const isMusicPath = request.nextUrl.pathname.startsWith('/music');
  const isDashboardPath = request.nextUrl.pathname.startsWith('/dashboard');
  const isProtectedPath = isMusicPath || isDashboardPath;
  
  // Get the authentication token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  console.log('Authentication token:', token ? 'Exists' : 'Does not exist');
  
  // If no token and trying to access protected path, redirect to login
  if (!token && isProtectedPath) {
    console.log('Redirecting to login...');
    
    // Create login URL with callback
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    
    // Return redirect response
    return NextResponse.redirect(loginUrl);
  }
   
  // Allow the request
  return NextResponse.next();
}

// Match both music and dashboard paths
export const config = {
  matcher: [
    '/music', 
    '/music/:path*',
    '/dashboard', 
    '/dashboard/:path*',
    '/final-video/:path*'
  ],
};