import { login } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    const result = await login({ identifier, password });
    const response = NextResponse.json({ user: result.user });

    response.cookies.set({
      name: 'token',
      value: result.jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(process.env.NEXT_PUBLIC_USER_SESSION_TIME || 60 * 60), // 1 hour
      sameSite: 'lax',
    });
    response.cookies.set({
      name: 'user',
      value: JSON.stringify(result.user),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(process.env.NEXT_PUBLIC_USER_SESSION_TIME || 60 * 60), // 1 hour
      sameSite: 'lax',
    });

    return response;
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
