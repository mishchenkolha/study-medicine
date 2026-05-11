import { getStaticPage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { getCoursesIDs, getCoursesList } from '@/services/navbar.service';
import { ROUTES } from '@/utils/routes';
import CourseGrid from '@/components/courses';
import { IStaticPage } from '@/types/pages';
import { IPublicCourse } from '@/types/courses';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { Modal } from '@/components/modal';
import { getDictionary } from '@/services/dictionary.service';
import { IPageProps } from '@/types/page';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.ALL_COURSES);
}

export default async function CousesPage({ searchParams }: IPageProps) {
  const { show_modal } = await searchParams;
  const [allCoursesPage, categoryIds, dictionary] = await Promise.all([
    getStaticPage(ROUTES.ALL_COURSES) as Promise<IStaticPage>,
    getCoursesIDs(),
    getDictionary(),
  ]);
  const courses: IPublicCourse[] = await getCoursesList(categoryIds);

  return (
    <>
      {show_modal === 'true' && (
        <div className="inline">
          <Modal
            message={<HTMLBlock content={dictionary.welcome_new_member} />}
          />
        </div>
      )}
      <h1 className="header1 animate-fade-in-up pb-4 md:pb-5 xl:pb-6">
        {allCoursesPage.title}
      </h1>
      <HTMLBlock
        content={allCoursesPage.description}
        className="py-2 text-center md:py-3 xl:py-4"
      />

      <CourseGrid courses={courses} categoryIds={categoryIds} />
    </>
  );
}
