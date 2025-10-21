'use server';
import { getAllCategoryPages, getCoursePage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { getCategoriesTree } from '@/services/navbar.service';
import { getCoursesIds } from '@/utils/menu';
import { ROUTES } from '@/utils/routes';
import CourseGrid from '@/components/courses';
import { BLOCK, IPublicPage } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { IPageProps } from '@/types/page';
import { cn, getImageURL } from '@/utils';
import { Button } from '@/ui/button';
import { getDictionary } from '@/services/dictionary.service';
import { getUserCourses } from '@/services/courses.service';
import BuyCourse from '@/components/courses/buy-course';
import { getUser } from '@/services/auth.service';

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCoursePage(slug);
  return getMeta(ROUTES.ALL_COURSES, {}, post?.seo ?? null);
}

export default async function CousePage({ params }: IPageProps) {
  const { slug } = await params;
  const user = await getUser();
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
      image: item?.image?.url ? `${getImageURL(item.image.url)}` : '',
    } as IPublicCourse;
  });
  const userCoursesPromise = getUserCourses();
  const userCourses = await userCoursesPromise;
  const userPageCourse = userCourses.find((item) => item.page.slug === slug);

  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {coursePage.title}
      </h1>
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
          {userPageCourse ? (
            <div className="w-auto pt-2 pb-4">
              <Button href={`${ROUTES.COURSES}/private/${userPageCourse.slug}`}>
                {dictionary.view_private_course}
              </Button>
            </div>
          ) : (
            <div className="w-auto pt-2 pb-4">
              {user?.email ? (
                <BuyCourse name={coursePage.title} dictionary={dictionary} />
              ) : (
                <Button className="!hidden xl:!inline-flex" href={ROUTES.LOGIN}>
                  {dictionary.login}
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
