import { NextResponse } from 'next/server';
import { strapiService } from '@/utils/strapi_client';
import { ROUTES } from '@/utils/routes';
import { stringify } from 'qs';
import { STRAPI_URL } from '@/utils/constants';

export const runtime = 'nodejs';

interface CertificateFile {
  id: number;
  name: string;
  url: string;
  mime: string;
}

interface Certificate {
  id: number;
  slug: string;
  title: string;
  certificate?: CertificateFile;
}

interface CertificateResponse {
  data: Certificate[];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // 1) Отримуємо сертифікат із Strapi
  let json: CertificateResponse;
  try {
    const queryString = stringify({
      populate: ['certificate'],
      pagination: {
        limit: 1,
      },
      filters: {
        slug: { $eqi: slug },
      },
    });
    json = await strapiService.get<CertificateResponse>(
      `${ROUTES.CERTIFICATES}?${queryString}`,
    );
    console.log({ json });
  } catch {
    return NextResponse.json(
      { error: 'Certificate not found' },
      { status: 404 },
    );
  }
  const cert = json?.data?.[0];
  const file = cert?.certificate;
  const fileUrl: string | undefined = file?.url;

  if (!file || !fileUrl) {
    return NextResponse.json({ error: 'File not attached' }, { status: 404 });
  }

  // 2) Завантажуємо PDF із Strapi
  const absoluteUrl = fileUrl.startsWith('http')
    ? fileUrl
    : `${STRAPI_URL}${fileUrl}`;

  const fileRes = await fetch(absoluteUrl);
  if (!fileRes.ok || !fileRes.body) {
    return NextResponse.json({ error: 'Cannot fetch file' }, { status: 500 });
  }

  const contentType =
    file?.mime || fileRes.headers.get('content-type') || 'application/pdf';
  const fileName = file?.name || 'certificate.pdf';

  return new NextResponse(fileRes.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${fileName}"`,
    },
  });
}
