import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { verifyCookie, COOKIE_NAME } from '@/lib/auth';

/** Routes under /admin or /api/admin that do NOT require the admin cookie. */
const ADMIN_PUBLIC_PREFIXES = ['/admin/login', '/api/admin/login'];

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
}

function isPublicAdminPath(pathname: string): boolean {
  return ADMIN_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export async function middleware(request: NextRequest) {
  // Step 1 — Refresh Supabase session cookie (keeps anon/auth sessions alive).
  const response = await updateSession(request);

  const { pathname } = request.nextUrl;

  // Step 2 — Admin auth gate (HMAC cookie check).
  if (isAdminPath(pathname) && !isPublicAdminPath(pathname)) {
    const cookie = request.cookies.get(COOKIE_NAME);
    const secret = process.env.SESSION_SECRET ?? '';
    const valid = cookie ? await verifyCookie(cookie.value, secret) : false;

    if (!valid) {
      // API routes → 401 JSON
      if (pathname.startsWith('/api/admin')) {
        return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // Page routes → redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next/static (static files)
     * - _next/image (Next.js image optimization)
     * - favicon.ico and common static asset extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|txt|woff2?)$).*)',
  ],
};
