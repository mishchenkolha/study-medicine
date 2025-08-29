import { getUser } from '@/services/auth.service';
import {
  checkPassedQuiz,
  getUserAttempts,
  getUserCourses,
  getUserLatestResult,
} from '@/services/courses.service';
import { getDictionary } from '@/services/dictionary.service';
import { IPrivateCourse } from '@/types/courses';
import { IPageProps } from '@/types/page';
import { Button, VARIANTS } from '@/ui/button';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { setTemplateData } from '@/utils';
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
  const userLatestResultPromise = getUserLatestResult();
  const [dictionary, userCourses, userLatestResult] = await Promise.all([
    dictionaryPromise,
    userCoursesPromise,
    userLatestResultPromise,
  ]);
  const currentCourse = userCourses.find(
    (course: IPrivateCourse) => course.slug === slug,
  );
  const currentQuiz = currentCourse?.quiz;
  if (
    !currentQuiz?.documentId ||
    currentQuiz?.documentId !== userLatestResult?.quiz?.documentId
  ) {
    redirect(ROUTES.COURSES);
  }
  const isPassedQuiz = await checkPassedQuiz(
    currentCourse?.quiz?.documentId || '',
  );
  if (!isPassedQuiz) {
    redirect(`${ROUTES.COURSES}/private/${slug}/quiz`);
  }
  const treshold = currentQuiz?.min_percent_treshold ?? 0;
  const isTestFailed =
    userLatestResult?.score && userLatestResult.score < treshold;
  let failedInfo = '';
  const successInfo = dictionary.resultSuccess;
  let userAttempts = 0;
  //if (isTestFailed && treshold > 0) {
  const attemptsCount = Number(currentQuiz?.attempts_count ?? 0);
  userAttempts = await getUserAttempts(currentQuiz?.documentId);
  const attemptsLeft = attemptsCount
    ? attemptsCount - userAttempts > 0
      ? attemptsCount - userAttempts
      : 0
    : -1;
  failedInfo = setTemplateData(dictionary.resultFailed, {
    count: String(attemptsLeft < 0 ? dictionary.unlimited : attemptsLeft),
  });
  //}
  const infoText =
    setTemplateData(dictionary.resultSent, {
      score: String(userLatestResult?.score ?? ''),
      treshold: String(treshold),
    }) +
    ' ' +
    (isTestFailed ? failedInfo : successInfo) +
    '<br />' +
    setTemplateData(dictionary.attemptsCount, {
      attemptsCount: String(userAttempts ?? ''),
    });

  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {currentCourse?.title ?? ''}
      </h1>
      <HTMLBlock content={infoText ?? ''} className="py-2 md:py-3 xl:py-4" />
      <div className="w-auto pt-2 pb-4">
        <Button
          href={`${ROUTES.COURSES}/private/${slug}/print`}
          variant={VARIANTS.DANGER}
        >
          {dictionary.printCert}
        </Button>
      </div>
    </>
  );
}
