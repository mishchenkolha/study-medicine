import { ROUTES } from '@/utils/routes';
import { stringify } from 'qs';
import { CoursesResponse, IPrivateCourse } from '@/types/courses';
import { strapiAuthService } from '@/utils/strapi_auth_client';

export const getCourseBySlug = async (
  slug: string,
): Promise<IPrivateCourse | void> => {
  if (!slug) return;
  const queryString = stringify({
    populate: ['image', 'bg_image', 'post.image', 'quiz'],
    'filters[slug][$eqi]': slug,
    pagination: {
      limit: 1,
    },
  });
  const responce = await strapiAuthService().get<CoursesResponse>(
    `${ROUTES.COURSES}?${queryString}`,
  );

  return responce?.data?.[0];
};

export const getUserCourses = async (): Promise<IPrivateCourse[]> => {
  const queryString = stringify({
    pagination: {
      limit: 10000,
    },
  });
  const responce = await strapiAuthService().get<IPrivateCourse[]>(
    `${ROUTES.USER_COURSES}/me?${queryString}`,
  );

  return responce ?? [];
};
