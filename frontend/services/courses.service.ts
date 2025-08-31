import { ROUTES } from '@/utils/routes';
import { stringify } from 'qs';
import {
  CoursesResponse,
  IPrivateCourse,
  IQuestion,
  IResult,
} from '@/types/courses';
import { strapiAuthService } from '@/utils/strapi_auth_client';
import { DEFAULT_QUESTIONS, STRAPI_LIMIT } from '@/utils/constants';
import { getUser } from './auth.service';

export const getCourseBySlug = async (
  slug: string,
): Promise<IPrivateCourse | void> => {
  if (!slug) return;
  const queryString = stringify({
    populate: ['image', 'bg_image', 'post.image', 'quiz'],
    'filters[slug][$eqi]': slug,
    pagination: {
      limit: 1,
    },
  });
  const responce = await strapiAuthService().get<CoursesResponse>(
    `${ROUTES.COURSES}?${queryString}`,
  );

  return responce?.data?.[0];
};

export const getUserCourses = async (): Promise<IPrivateCourse[]> => {
  const queryString = stringify({
    pagination: {
      limit: STRAPI_LIMIT,
    },
  });
  const responce = await strapiAuthService().get<IPrivateCourse[]>(
    `${ROUTES.USER_COURSES}/me?${queryString}`,
  );

  return responce ?? [];
};

export const getQuestions = async (
  documentId: string,
  count = DEFAULT_QUESTIONS,
): Promise<IQuestion[]> => {
  if (!documentId) return [];
  const queryString = stringify({
    populate: ['answers.image', 'quiz'],
    pagination: {
      limit: STRAPI_LIMIT,
    },
    filters: {
      quiz: {
        documentId: {
          $eqi: documentId,
        },
      },
    },
    randomSort: true,
  });
  const responce = await strapiAuthService().get<{ data: IQuestion[] }>(
    `${ROUTES.QUESTIONS}?${queryString}`,
  );

  return (responce?.data ?? []).slice(0, count);
};

export const getUserAttempts = async (quizId?: string): Promise<number> => {
  if (!quizId) return 0;
  const queryString = stringify({ quizDocumentId: quizId });
  try {
    const responce = await strapiAuthService().get<{ count: number }>(
      `${ROUTES.RESULTS}/me?${queryString}`,
    );
    return responce?.count ?? 0;
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const saveUserResults = async ({
  quizId,
  answers,
  score,
  isPassed,
}: {
  quizId: string;
  answers: {
    question: string;
    answers: string[];
    correctAnswers: string[];
  }[];
  score: number;
  isPassed: boolean;
}): Promise<boolean> => {
  if (!quizId || !answers || !Object.keys(answers)?.length) return false;
  const userResults = {
    quizDocumentId: quizId,
    answers,
    score,
    isPassed,
  };
  try {
    await strapiAuthService().post(`${ROUTES.RESULTS}/me`, userResults);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const checkPassedQuiz = async (quizId: string): Promise<boolean> => {
  if (!quizId) return false;
  const queryString = stringify({ quizDocumentId: quizId });
  try {
    const responce = await strapiAuthService().get<boolean>(
      `${ROUTES.RESULTS}/me/is-passed?${queryString}`,
    );
    return Boolean(responce);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getUserLatestResult = async (): Promise<IResult | null> => {
  try {
    const responce = await strapiAuthService().get<IResult>(
      `${ROUTES.RESULTS}/me/latest`,
    );
    return responce ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export interface ICertificate {
  isNew: boolean;
  url: string | null;
}
export const sendCertificate = async (
  courseId: string,
  title: string,
): Promise<ICertificate | null> => {
  const user = await getUser();
  if (!user?.email || !user.username) return { isNew: false, url: null };
  try {
    return await strapiAuthService().post(`${ROUTES.CERTIFICATES}/me`, {
      courseId,
      title,
    });
  } catch (e) {
    console.error(e);
    return { isNew: false, url: null };
  }
};
