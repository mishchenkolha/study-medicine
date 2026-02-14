import { login } from '@/services/auth.service';
import { IS_PROD, SESSION_TIME } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body as { identifier: string; password: string };

    const result = await login({ identifier, password });
    const response = NextResponse.json({ user: result.user });

    response.cookies.set({
      name: 'token',
      value: result.jwt,
      httpOnly: true,
      secure: IS_PROD,
      path: '/',
      maxAge: SESSION_TIME,
      sameSite: 'lax',
    });
    response.cookies.set({
      name: 'user',
      value: JSON.stringify(result.user),
      httpOnly: true,
      secure: IS_PROD,
      path: '/',
      maxAge: SESSION_TIME,
      sameSite: 'lax',
    });

    return response;
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
