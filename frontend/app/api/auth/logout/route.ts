import { NextResponse } from 'next/server';
import { logout } from '@/services/auth.service';

export async function POST() {
  const result = await logout();
  return NextResponse.json(result || { success: false });
}
