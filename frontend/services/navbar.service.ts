import {
  NavbarResponse,
  CategoriesResponse,
  ICategoriesTree,
  IStrapiCategory,
} from '@/types/navbar';
import { STRAPI_LIMIT } from '@/utils/constants';
import { normalizeTree } from '@/utils/menu';
import { strapiService } from '@/utils/strapi_client';
import { stringify } from 'qs';

export const getNavbar = async (name?: string): Promise<IStrapiCategory[]> => {
  const queryString = stringify({
    populate: ['categories.parent'],
    ...(name && {
      filters: {
        name: {
          $eqi: name,
        },
      },
    }),
  });
  const responce = await strapiService.get<NavbarResponse>(
    `/navbars?${queryString}`,
    {
      token: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      revalidate: Number(process.env.NEXT_PUBLIC_CACHING_TIME ?? 0),
    },
  );
  return responce.data?.[0]?.categories ?? [];
};

export const getCategoriesTree = async (
  name?: string,
): Promise<ICategoriesTree> => {
  const queryString = stringify({
    populate: ['parent'],
    pagination: {
      limit: STRAPI_LIMIT,
    },
    ...(name && {
      filters: {
        slug: {
          $eqi: name,
        },
      },
    }),
  });
  const responce = await strapiService.get<CategoriesResponse>(
    `/categories?${queryString}`,
    {
      token: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN,
      revalidate: Number(process.env.NEXT_PUBLIC_CACHING_TIME ?? 0),
    },
  );
  return normalizeTree(responce.data);
};
