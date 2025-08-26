import { NextResponse } from 'next/server';
import { changePassword } from '@/services/auth.service';

type Body = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

export async function POST(req: Request) {
  try {
    const { currentPassword, password, passwordConfirmation } =
      (await req.json()) as Partial<Body>;

    if (!currentPassword || !password || !passwordConfirmation) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    await changePassword({
      currentPassword,
      password,
      passwordConfirmation,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: unknown) {
    const status = (err as { status: number })?.status ?? 400;
    const message =
      (err as Error)?.message ||
      (err as { error: Error })?.error?.message ||
      (err as { data: { error: Error } })?.data?.error?.message ||
      'Failed to change password';
    return NextResponse.json({ message }, { status });
  }
}
