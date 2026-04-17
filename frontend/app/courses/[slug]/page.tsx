'use server';
import { getCoursePage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { ROUTES } from '@/utils/routes';
import { IPublicPage } from '@/types/pages';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { IPageProps } from '@/types/page';
import { Button } from '@/ui/button';
import { getDictionary } from '@/services/dictionary.service';
import { getUserCourses } from '@/services/courses.service';
import BuyCourse from '@/components/courses/buy-course';
import { getUser } from '@/services/auth.service';
import { noParamsChecker } from '@/utils/not_found';

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const notFoundData = await noParamsChecker({ params });
  if (notFoundData?.title) {
    return notFoundData;
  }
  const { slug } = await params;
  const post = await getCoursePage(slug);
  return getMeta(ROUTES.ALL_COURSES, {}, post?.seo ?? null);
}

export default async function CousePage({ params }: IPageProps) {
  if (!params) return null;
  const { slug } = await params;
  const user = await getUser();
  const dictionaryPromise = getDictionary();
  const coursePagePromise: Promise<IPublicPage> = getCoursePage(slug);
  const dictionary = await dictionaryPromise;
  const coursePage = await coursePagePromise;

  const userCoursesPromise = getUserCourses();
  const userCourses = await userCoursesPromise;
  const userPageCourse = userCourses.find((item) => item?.page?.slug === slug);

  return (
    <div className="pb-10">
      <div className="flex w-full justify-between">
        <h1 className="header1 animate-fade-in-up pb-4 md:pb-5 xl:pb-6">
          {coursePage.title}
        </h1>
        {userPageCourse ? (
          <div className="w-auto">
            <Button href={`${ROUTES.COURSES}/private/${userPageCourse.slug}`}>
              {dictionary.view_private_course}
            </Button>
          </div>
        ) : (
          <div className="w-auto">
            {user?.email ? (
              <BuyCourse name={coursePage.title} dictionary={dictionary} />
            ) : (
              <Button className="!hidden xl:!inline-flex" href={ROUTES.LOGIN}>
                {dictionary.login}
              </Button>
            )}
          </div>
        )}
      </div>
      <HTMLBlock
        content={coursePage.description}
        className="py-2 md:py-3 xl:py-4"
      />
    </div>
  );
}
