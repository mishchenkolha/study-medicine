import { IMetaData, IOpenGraph, MetaResponse } from '@/types/meta';
import { IImageData } from '@/types/strapi';
import { trimChar } from '@/utils';
import { strapiService } from '@/utils/strapi_client';
import { headers } from 'next/headers';
import { stringify } from 'qs';

export const getMeta = async (page: string, query = {}): Promise<IMetaData> => {
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
  return responce?.data?.seo ?? ({} as IMetaData);
};

export const addOpenGraph = async (
  openGraph: IOpenGraph | null,
  title: string,
  description: string,
  metaImage?: IImageData | null,
) => {
  const header = await headers();
  const url = `${process.env.PUBLIC_DOMAIN_URL}${header.get('pathname') || ''}`;
  const openGraphObj = {
    title: openGraph?.ogTitle,
    description: openGraph?.ogDescription,
    url: openGraph?.ogUrl,
    type: openGraph?.ogType,
    images: [openGraph?.ogImage],
  };
  return openGraph
    ? openGraphObj
    : {
        title,
        description,
        url,
        type: 'website',
        images: [
          {
            url:
              metaImage?.data?.url ??
              `${process.env.PUBLIC_DOMAIN_URL}/images/og-image.jpg`,
            width: metaImage?.data?.width ?? 2400,
            height: metaImage?.data?.height ?? 1200,
            alt: metaImage?.data?.alternativeText ?? 'NDAX',
          },
        ],
      };
};
