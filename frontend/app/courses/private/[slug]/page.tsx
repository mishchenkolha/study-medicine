import { getUser } from '@/services/auth.service';
import { checkPassedQuiz, getUserCourses } from '@/services/courses.service';
import { getDictionary } from '@/services/dictionary.service';
import { IPageProps } from '@/types/page';
import { Button, VARIANTS } from '@/ui/button';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { ROUTES } from '@/utils/routes';
import { redirect } from 'next/navigation';

export default async function PrivateCousePage({ params }: IPageProps) {
  const { slug } = await params;
  const user = await getUser();
  if (!user) {
    redirect(ROUTES.LOGIN);
  }
  const dictionaryPromise = getDictionary();
  const userCoursesPromise = getUserCourses();
  const [dictionary, userCourses] = await Promise.all([
    dictionaryPromise,
    userCoursesPromise,
  ]);
  const currentCourse = userCourses.find((course) => course.slug === slug);
  if (!currentCourse) {
    redirect(ROUTES.COURSES);
  }
  const isPassedQuiz = await checkPassedQuiz(
    currentCourse?.quiz?.documentId || '',
  );

  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {currentCourse.title}
      </h1>
      <HTMLBlock
        content={currentCourse.description ?? ''}
        className="py-2 md:py-3 xl:py-4"
      />
      <div className="w-auto pt-2 pb-4">
        {isPassedQuiz ? (
          <Button
            href={`${ROUTES.COURSES}/private/${slug}/result`}
            variant={VARIANTS.SUCCESS}
          >
            {dictionary.checkResult}
          </Button>
        ) : (
          <Button
            href={`${ROUTES.COURSES}/private/${slug}/quiz`}
            variant={VARIANTS.DANGER}
          >
            {dictionary.startQuiz}
          </Button>
        )}
      </div>
    </>
  );
}
