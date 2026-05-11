import { NextResponse } from 'next/server';
import { register } from '@/services/auth.service';
import { capitalizeFirstLetter } from '@/utils';

type Body = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
};

export async function POST(req: Request) {
  const {
    firstname = '',
    lastname = '',
    email,
    password,
    phone,
  } = (await req.json()) as Partial<Body>;

  if (!firstname || !lastname || !email || !password || !phone) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  return NextResponse.json(
    await register({
      username: `${capitalizeFirstLetter(firstname.trim().toLowerCase())} ${capitalizeFirstLetter(lastname.trim().toLowerCase())}`,
      email,
      password,
      phone,
    }),
  );
}
