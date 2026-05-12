import { NextResponse } from 'next/server';
import { isUniqueUser, register, updatePhone } from '@/services/auth.service';
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

  try {
    const username = `${capitalizeFirstLetter(firstname.trim().toLowerCase())} ${capitalizeFirstLetter(lastname.trim().toLowerCase())}`;
    const isUnique = await isUniqueUser(username);
    if (!isUnique) {
      return NextResponse.json(
        { message: 'Username is already taken' },
        { status: 400 },
      );
    }
    // 2. Реєстрація (відправляємо тільки стандартні поля)
    const authData = await register({
      username,
      email,
      password,
    });
    const userId = authData?.user?.id;

    if (userId && phone) {
      // 3. Оновлюємо телефон окремим запитом
      // Використовуємо внутрішній сервіс або окремий ендпоінт
      const registerResponse = await updatePhone({ id: userId, phone });

      return NextResponse.json(registerResponse);
    }

    return NextResponse.json(
      { message: 'Missed UserId or phone' },
      { status: 400 },
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.message || 'Registration failed' },
      { status: 500 },
    );
  }
}
