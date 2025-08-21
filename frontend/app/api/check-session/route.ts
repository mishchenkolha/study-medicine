import { strapiAuthService } from '@/utils/strapi_auth_client';
import { NextResponse } from 'next/server';

export async function GET() {
  const authService = strapiAuthService();
  const user = await authService.me();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user });
}
