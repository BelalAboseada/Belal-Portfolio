import { NextRequest, NextResponse } from 'next/server';
import { signCookie, COOKIE_NAME } from '@/lib/auth';

const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const secret = process.env.SESSION_SECRET ?? '';
  const token = await signCookie(secret);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SEVEN_DAYS_SECONDS,
    path: '/',
  });

  return response;
}
