import { IS_PROD } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: IS_PROD,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });
  response.cookies.set({
    name: 'user',
    value: '',
    httpOnly: true,
    secure: IS_PROD,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
  });

  return response;
}
