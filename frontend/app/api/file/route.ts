import { isAuth } from '@/services/auth.service';
import { INTERNAL_API_KEY, STRAPI_URL } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Перевіряємо, чи юзер залогінений у Next.js
  const session = await isAuth();

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Отримуємо URL файлу з параметрів запиту
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('url');
  const fileName = searchParams.get('name') || 'document.pdf';

  if (!fileUrl) {
    return new NextResponse('Missing file URL', { status: 400 });
  }

  try {
    // 3. Робимо запит до Strapi, додаючи наш секретний ключ
    const strapiResponse = await fetch(`${STRAPI_URL}${fileUrl}`, {
      headers: {
        'x-internal-secret': INTERNAL_API_KEY as string,
      },
    });

    if (!strapiResponse.ok) {
      return new NextResponse('File not found or access denied', {
        status: 404,
      });
    }

    // 4. Отримуємо бінарні дані (Buffer)
    const data = await strapiResponse.arrayBuffer();

    // 5. Повертаємо файл клієнту з правильними заголовками
    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
