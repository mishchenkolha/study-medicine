import { NextRequest, NextResponse } from 'next/server';
import { IS_PROD, SESSION_TIME } from './utils/constants';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('pathname', pathname);
  requestHeaders.set('x-url', request.url);

  const token = request.cookies.get('token')?.value;
  const user = request.cookies.get('user')?.value;

  // Якщо куки є — оновлюємо їх
  if (token && user) {
    const response = NextResponse.next();

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: IS_PROD,
      path: '/',
      maxAge: SESSION_TIME,
      sameSite: 'lax',
    });

    response.cookies.set({
      name: 'user',
      value: user,
      httpOnly: true,
      secure: IS_PROD,
      path: '/',
      maxAge: SESSION_TIME,
      sameSite: 'lax',
    });

    return response;
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|images/|api/|favicon.ico|static/).*)',
  ],
};
