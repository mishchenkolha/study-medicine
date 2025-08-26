import { getAllCategoryPages, getCoursePage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { getCategoriesTree } from '@/services/navbar.service';
import { getCoursesIds } from '@/utils/menu';
import { ROUTES } from '@/utils/routes';
import CourseGrid from '@/components/courses';
import { BLOCK, IPublicPage } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { STRAPI_URL } from '@/utils/constants';
import { Metadata } from 'next';
import { IPageProps } from '@/types/page';
import { cn } from '@/utils';
import { Button } from '@/ui/button';
import { getDictionary } from '@/services/dictionary.service';
import { getUserCourses } from '@/services/courses.service';

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCoursePage(slug);
  return getMeta(ROUTES.ALL_COURSES, {}, post?.seo ?? null);
}

export default async function CousePage({ params }: IPageProps) {
  const { slug } = await params;
  const dictionaryPromise = getDictionary();
  const coursePagePromise: Promise<IPublicPage> = getCoursePage(slug);
  const categoriesPromise = getCategoriesTree();
  const dictionary = await dictionaryPromise;
  const coursePage = await coursePagePromise;
  const categoriesTree = await categoriesPromise;
  const coursesTree = Object.values(categoriesTree).find(
    (item) => item.slug === 'courses',
  );
  let categoryIds: { [key: string]: { title: string; list: string[] } } = {};
  if (coursesTree?.children) {
    categoryIds = getCoursesIds(coursesTree.children);
  }
  const pureCatIds: string[] = categoryIds?.[slug]?.list ?? [];
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
  const userCoursesPromise = getUserCourses();
  const userCourses = await userCoursesPromise;
  const pageCourseData = userCourses.filter((item) => item.page.slug === slug);
  const pageCourse = pageCourseData?.[0];

  return (
    <>
      <h1 className="pb-4 md:pb-5 xl:pb-6">{coursePage.title}</h1>
      <HTMLBlock
        content={coursePage.description}
        className={cn(
          'py-2 md:py-3 xl:py-4',
          courses.length > 0 ? 'text-center' : '',
        )}
      />

      {courses.length > 0 ? (
        <CourseGrid
          courses={courses}
          categoryIds={categoryIds}
          showFilters={false}
        />
      ) : (
        <>
          {pageCourse ? (
            <div className="w-auto pt-2 pb-4">
              <Button href={`${ROUTES.COURSES}/private/${slug}`}>
                {dictionary.viewPrivateCourse}
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
