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
  attempts_count: number;
  questions_count: number;
}

export enum QuestionType {
  SINGLE_CHOICE = 'single-choise',
  MULTIPLE_CHOICE = 'multiple-choise',
}

export interface IQuestion {
  id: number;
  text: string;
  type: QuestionType;
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

export interface IResult {
  id: number;
  documentId: string;
  user: IUser;
  quiz: IQuiz;
  score: number;
  passed: boolean;
  certificate_sent: boolean;
  submittedAt: string;
}

export interface ICertificateFile {
  id: number;
  url: string;
  name: string;
}

export interface IStrapiCertificate {
  id: number;
  title: string;
  slug: string;
  user: IUser;
  course: IPrivateCourse;
  certificate: ICertificateFile;
}
