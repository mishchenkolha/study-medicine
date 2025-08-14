import {
  PagesResponse,
  IPublicPage,
  IStaticPage,
  StaticPageResponse,
} from '@/types/pages';
import { strapiService } from '@/utils/strapi_client';
import { stringify } from 'qs';

export const getAllCategoryPages = async (
  categoryIds: string[],
  options = {},
): Promise<IPublicPage[]> => {
  if (!categoryIds?.length) {
    return [] as IPublicPage[];
  }

  const categoryFilters: { [key: string]: string } = {};
  categoryIds?.forEach((categoryId: string, index: number) => {
    const key = `filters[$or][${index}][category][slug][$eqi]`;
    categoryFilters[key] = categoryId;
  });

  const queryString = stringify({
    populate: ['category', 'image', 'bg_image', 'blocks'],
    ...(categoryIds?.length && categoryFilters),
    'pagination[limit]': 1000,
  });

  const pagesData = await strapiService.get<PagesResponse>(
    `/pages?${queryString}`,
    options,
  );

  return (pagesData?.data ?? []) as IPublicPage[];
};

export const getStaticPage = async (
  pageName: string,
  populate: string[] = [],
) => {
  const queryString = populate.length ? `?${stringify({ populate })}` : '';
  const pagesData = await strapiService.get<StaticPageResponse>(
    `/${pageName}${queryString}`,
  );

  return (pagesData?.data ?? {}) as IStaticPage | unknown;
};
