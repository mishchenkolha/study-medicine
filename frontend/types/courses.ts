import { IUser } from './auth';
import { IPublicPage } from './pages';
import { IImage } from './strapi';

interface IBaseCourse {
  id: number;
  title: string;
  slug: string;
  description?: string;
}
export interface IPublicCourse extends IBaseCourse {
  duration: string;
  level: string;
  audience: string;
  image: string;
}

export interface IPrivateCourse extends IBaseCourse {
  documentId: string;
  image: IImage | null;
  bgImage: IImage | null;
  page: IPublicPage;
  duration_hours: number;
  quiz: IQuiz;
}

export interface ICategoryIds {
  [key: string]: { title: string; list: string[] };
}

export interface CoursesResponse {
  data: IPrivateCourse[];
}

export interface IQuiz {
  id: number;
  documentId: string;
  title: string;
  description: string;
  min_percent_treshold: number;
}

export enum IQuestionType {
  MULTIPLE_CHOICE = 'multiple-choise',
  SINGLE_CHOICE = 'single-choise',
  TRUE_FALSE = 'true-false',
}

export interface IQuestion {
  id: number;
  text: string;
  type: IQuestionType;
  answers: IAnswer[];
  difficulty_level: number;
  quiz: IQuiz;
}

export interface IAnswer {
  id: number;
  title: string;
  image: IImage | null;
  correct: boolean;
}

export interface IPrivateUserCourse {
  user: IUser;
  courses: IPrivateCourse[];
}

export interface UserCoursesResponse {
  data: IPrivateUserCourse[];
}
