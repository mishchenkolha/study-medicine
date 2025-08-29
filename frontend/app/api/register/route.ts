import { NextResponse } from 'next/server';
import { register } from '@/services/auth.service';

type Body = {
  username: string;
  password: string;
  email: string;
};

export async function POST(req: Request) {
  const { username, email, password } = (await req.json()) as Partial<Body>;

  if (!username || !password || !email) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  return NextResponse.json(
    await register({
      username,
      email,
      password,
    }),
  );
}
