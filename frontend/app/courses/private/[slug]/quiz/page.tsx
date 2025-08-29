import Quiz from '@/components/quiz';
import { getUser } from '@/services/auth.service';
import {
  checkPassedQuiz,
  getQuestions,
  getUserCourses,
} from '@/services/courses.service';
import { getDictionary } from '@/services/dictionary.service';
import { IQuestion } from '@/types/courses';
import { IPageProps } from '@/types/page';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { DEFAULT_QUESTIONS } from '@/utils/constants';
import { ROUTES } from '@/utils/routes';
import { redirect } from 'next/navigation';

export default async function QuizPage({ params }: IPageProps) {
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
  const currentQuiz = currentCourse.quiz;
  const isPassedQuiz = await checkPassedQuiz(
    currentCourse?.quiz?.documentId || '',
  );
  let questions: IQuestion[] = [];
  if (!isPassedQuiz) {
    questions = await getQuestions(
      currentQuiz?.documentId || '',
      currentQuiz?.questions_count || DEFAULT_QUESTIONS,
    );
  } else {
    redirect(`${ROUTES.COURSES}/private/${slug}/result`);
  }
  return (
    <>
      <h1 className="header1 animate-fade-in-up">{currentQuiz.title}</h1>
      <HTMLBlock
        content={currentQuiz.description ?? ''}
        className="py-2 md:py-3 xl:py-4"
      />
      <Quiz questions={questions} dictionary={dictionary} slug={slug} />
    </>
  );
}
