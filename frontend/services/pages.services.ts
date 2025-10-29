import {
  PagesResponse,
  IPublicPage,
  IStaticPage,
  StaticPageResponse,
  DynamicPageResponse,
} from '@/types/pages';
import { trimChar } from '@/utils';
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
    populate: ['category', 'image', 'bg_image', 'blocks.image'],
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
  corePageName: string,
  populate: string[] = [],
) => {
  if (!corePageName) {
    return {};
  }
  const pageName = trimChar(corePageName, '/').toLowerCase();
  const queryString = populate.length ? `?${stringify({ populate })}` : '';
  const pagesData = await strapiService.get<StaticPageResponse>(
    `/${pageName}${queryString}`,
  );

  return (pagesData?.data ?? {}) as IStaticPage | unknown;
};

export const getCoursePage = async (slug: string): Promise<IPublicPage> => {
  const queryString = stringify({
    populate: [
      'category',
      'image',
      'bg_image',
      'blocks.image',
      'seo.metaImage',
      'seo.openGraph.ogImage',
    ],
    'filters[category][slug][$eqi]': slug,
    'pagination[limit]': 1,
  });
  const pagesData = await strapiService.get<DynamicPageResponse>(
    `/pages?${queryString}`,
  );

  return (pagesData?.data?.[0] ?? {}) as IPublicPage;
};
