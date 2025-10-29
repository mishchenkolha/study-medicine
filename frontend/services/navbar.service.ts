import { IPublicCourse } from '@/types/courses';
import {
  NavbarResponse,
  CategoriesResponse,
  ICategoriesTree,
  IStrapiCategory,
} from '@/types/navbar';
import { getImageURL, trimChar } from '@/utils';
import { STRAPI_LIMIT } from '@/utils/constants';
import { getCoursesIds, normalizeTree } from '@/utils/menu';
import { ROUTES } from '@/utils/routes';
import { strapiService } from '@/utils/strapi_client';
import { stringify } from 'qs';
import { getAllCategoryPages } from './pages.services';
import { BLOCK } from '@/types/pages';

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

export interface ICategoryIDs {
  [key: string]: { title: string; list: string[] };
}

export const getCoursesIDs = async (): Promise<ICategoryIDs> => {
  const categoriesTree = await getCategoriesTree();
  const coursesTree = Object.values(categoriesTree).find(
    (item) => item.slug === trimChar(ROUTES.COURSES, '/'),
  );
  let categoryIds: ICategoryIDs = {};
  if (coursesTree?.children) {
    categoryIds = getCoursesIds(coursesTree.children);
  }
  return categoryIds;
};

export const getCoursesList = async (
  coreCategoryIds?: ICategoryIDs,
): Promise<IPublicCourse[]> => {
  const categoryIds = coreCategoryIds ?? (await getCoursesIDs());

  let pureCatIds: string[] = [];
  Object.values(categoryIds).forEach(
    (categoryList) => (pureCatIds = [...pureCatIds, ...categoryList.list]),
  );
  const coursesList = await getAllCategoryPages(pureCatIds);
  const courses: IPublicCourse[] = coursesList.map((item) => {
    const card = item.blocks?.find?.(
      (block) => block.__component === BLOCK.CARD,
    );
    return {
      id: item.id,
      title: item.title ?? card?.title ?? '',
      slug: item?.category?.slug ?? '',
      duration: card?.time ?? '',
      level: card?.level ?? '',
      audience: card?.description ?? '',
      image: item?.image?.url ? `${getImageURL(item.image.url)}` : '',
    } as IPublicCourse;
  });

  return courses;
};
