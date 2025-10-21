import type { Metadata } from 'next';
import { IMetaData, MetaResponse, TOgType } from '@/types/meta';
import { getImageURL, trimChar } from '@/utils';
import { strapiService } from '@/utils/strapi_client';
import { headers } from 'next/headers';
import { stringify } from 'qs';
import {
  DOMAIN_URL,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
} from '@/utils/constants';

export const getMeta = async (
  page: string,
  query = {},
  seoData: IMetaData | null = null,
): Promise<Metadata> => {
  const header = await headers();
  const queryString = stringify({
    ...query,
    populate: 'seo.metaImage',
  });

  const responce = await strapiService.get<MetaResponse>(
    `${trimChar(page, '/')}?${queryString}`,
    {
      token: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      revalidate: Number(process.env.NEXT_PUBLIC_CACHING_LONG_TIME ?? 0),
    },
  );

  const seo = seoData ?? responce?.data?.seo ?? ({} as IMetaData);

  const url = `${DOMAIN_URL}${header.get('pathname') || ''}`;
  const fallbackImage = DOMAIN_URL + '/images/logo.svg';
  const image = seo.metaImage?.data?.url
    ? getImageURL(seo.metaImage.data.url)
    : fallbackImage;

  const title = seo.metaTitle?.trim() || SITE_NAME;
  const description = seo.metaDescription?.trim() || SITE_DESCRIPTION;
  const keywords =
    seo.keywords
      ?.split(',')
      .map((k) => k.trim())
      .filter(Boolean) || SITE_KEYWORDS;

  // OpenGraph fallback
  const ogImageUrl = seo.openGraph?.ogImage?.data?.url || image;
  const ogTitle = seo.openGraph?.ogTitle || title;
  const ogDescription = seo.openGraph?.ogDescription || description;
  const ogUrl = seo.openGraph?.ogUrl || url;
  const ogType = (seo.openGraph?.ogType as TOgType) || 'website';

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      type: ogType,
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon_16x16.png',
      apple: '/favicon_16x16.png',
    },
  };
};
