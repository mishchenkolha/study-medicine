import { getUser } from '@/services/auth.service';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await getUser();

  return NextResponse.json({ user });
}
