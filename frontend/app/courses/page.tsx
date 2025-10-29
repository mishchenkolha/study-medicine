import { getStaticPage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { getCoursesIDs, getCoursesList } from '@/services/navbar.service';
import { ROUTES } from '@/utils/routes';
import CourseGrid from '@/components/courses';
import { IStaticPage } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.ALL_COURSES);
}

export default async function CousesPage() {
  const [allCoursesPage, categoryIds] = await Promise.all([
    getStaticPage(ROUTES.ALL_COURSES) as Promise<IStaticPage>,
    getCoursesIDs(),
  ]);
  const courses: IPublicCourse[] = await getCoursesList(categoryIds);

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
