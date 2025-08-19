// example server-side API call (app/api/protected/route.ts)
import { STRAPI_URL } from '@/utils/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${STRAPI_URL}/api/protected-route`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
