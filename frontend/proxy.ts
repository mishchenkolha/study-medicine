import { NextRequest, NextResponse } from 'next/server';
import { DOMAIN_URL, IS_PROD, SESSION_TIME } from './utils/constants';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.search;

  const requestHeaders = new Headers(request.headers);

  // redirect if host starts with www
  const host = requestHeaders.get('host');

  // Отримуємо чистий канонічний домен з вашої змінної (видаляємо протокол для порівняння)
  const canonicalHost = new URL(DOMAIN_URL).host;

  // Якщо хост починається з www або не збігається з канонічним (і це не localhost)
  if (host && host.startsWith('www.') && IS_PROD) {
    // Формуємо нову адресу: канонічний домен + поточний шлях + query-параметри
    const newUrl = `https://${canonicalHost}${pathname}${searchParams}`;

    return NextResponse.redirect(newUrl, 301);
  }

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
