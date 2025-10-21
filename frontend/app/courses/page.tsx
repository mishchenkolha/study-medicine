import { getAllCategoryPages, getStaticPage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { getCategoriesTree } from '@/services/navbar.service';
import { getCoursesIds } from '@/utils/menu';
import { ROUTES } from '@/utils/routes';
import CourseGrid from '@/components/courses';
import { BLOCK, IStaticPage } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { getImageURL } from '@/utils';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.ALL_COURSES);
}

export default async function CousesPage() {
  const allCoursesPagePromise = getStaticPage(
    'all-courses',
  ) as Promise<IStaticPage>;
  const categoriesPromise = getCategoriesTree();
  const allCoursesPage = await allCoursesPagePromise;
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
      image: item?.image?.url ? `${getImageURL(item.image.url)}` : '',
    } as IPublicCourse;
  });
  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {allCoursesPage.title}
      </h1>
      <HTMLBlock
        content={allCoursesPage.description}
        className="text-center py-2 md:py-3 xl:py-4"
      />

      <CourseGrid courses={courses} categoryIds={categoryIds} />
    </>
  );
}
