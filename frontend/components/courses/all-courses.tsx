import { getAllCategoryPages } from '@/services/pages.services';
import { getCategoriesTree } from '@/services/navbar.service';
import { getCoursesIds } from '@/utils/menu';
import CourseGrid from '@/components/courses';
import { BLOCK } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { STRAPI_URL } from '@/utils/constants';

export const AllCourses: React.FC = async () => {
  const categoriesPromise = getCategoriesTree();
  const categoriesTree = await categoriesPromise;
  const coursesTree = Object.values(categoriesTree).find(
    (item) => item.slug === 'courses',
  );
  let categoryIds: { [key: string]: { title: string; list: string[] } } = {};
  if (coursesTree?.children) {
    categoryIds = getCoursesIds(coursesTree.children);
  }
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
      image: item?.image?.url ? `${STRAPI_URL}${item.image.url}` : '',
    } as IPublicCourse;
  });
  return <CourseGrid courses={courses} categoryIds={categoryIds} />;
};
