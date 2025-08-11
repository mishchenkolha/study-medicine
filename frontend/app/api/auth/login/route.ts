import { login } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { identifier, password } = await request.json();

    const result = await login({ identifier, password });
    console.log({ result });
    if (!result?.user) {
      return NextResponse.json(
        { error: result || 'Login failed' },
        { status: 400 },
      );
    }
    const response = NextResponse.json({ user: result.user });

    // Записуємо JWT у cookie
    response.cookies.set({
      name: 'token',
      value: result.jwt,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(process.env.NEXT_PUBLIC_USER_SESSION_TIME || 60 * 60), // 1 hour
      sameSite: 'lax',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
