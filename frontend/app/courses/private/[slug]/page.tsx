import Attachments from '@/components/attachments';
import { getUser } from '@/services/auth.service';
import {
  checkPassedQuiz,
  getUserAttempts,
  getUserCourses,
} from '@/services/courses.service';
import { getDictionary } from '@/services/dictionary.service';
import { IPageProps } from '@/types/page';
import { Button, VARIANTS } from '@/ui/button';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { ROUTES } from '@/utils/routes';
import { redirect } from 'next/navigation';

export default async function PrivateCousePage({ params }: IPageProps) {
  if (!params) return null;
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
  if (!isPassedQuiz) {
    const currentQuiz = currentCourse?.quiz;
    const attemptsCount = Number(currentQuiz?.attempts_count ?? 0);
    const userAttempts = await getUserAttempts(currentQuiz?.documentId);
    const attemptsLeft = attemptsCount
      ? attemptsCount - userAttempts > 0
        ? attemptsCount - userAttempts
        : 0
      : -1;
    if (attemptsLeft <= 0) {
      redirect(`${ROUTES.COURSES}/private/${slug}/result`);
    }
  }
  const attachments = currentCourse?.attachments?.files?.map((file) => ({
    name: file.name,
    url: file.url,
  }));

  return (
    <div className="pb-10">
      <div className="flex w-full justify-between">
        <h1 className="header1 animate-fade-in-up pb-4 md:pb-5 xl:pb-6">
          {currentCourse.title}
        </h1>
        <div className="w-auto pt-2 pb-4">
          {isPassedQuiz ? (
            <Button
              href={`${ROUTES.COURSES}/private/${slug}/result`}
              variant={VARIANTS.SUCCESS}
            >
              {dictionary.check_result}
            </Button>
          ) : (
            <Button
              href={`${ROUTES.COURSES}/private/${slug}/quiz`}
              variant={VARIANTS.DANGER}
            >
              {dictionary.start_quiz}
            </Button>
          )}
        </div>
      </div>
      <HTMLBlock
        content={currentCourse.description ?? ''}
        className="py-2 md:py-3 xl:py-4"
      />
      <Attachments
        title={currentCourse?.attachments.title}
        files={attachments}
        className="pt-6"
      />
    </div>
  );
}
