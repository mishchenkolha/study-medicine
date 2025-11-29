export const SINGLE_PAGES = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  PROFILE: 'profile',
};
export const SINGLE_TYPES = {
  ABOUT: 'about',
  ALL_COURSES: 'all-courses',
  CONSULTING_AND_NETWORKING: 'consulting-and-networking',
  CONTACT: 'contact',
  DICTIONARY: 'dictionary',
  HOME: 'homepage',
  TESTIMONIAL: 'testimonial',
};
export const COLLECTION_TYPES_ONE: Record<string, string> = {
  courses: 'course',
  questions: 'question',
  results: 'result',
  certificates: 'certificate',
  navbars: 'navbar',
  categories: 'category',
  pages: 'page',
  quizzes: 'quiz',
  users: 'user',
  'user-courses': 'user-course',
};

export const ROUTES = {
  // single pages
  LOGIN: `/${SINGLE_PAGES.LOGIN}`,
  REGISTER: `/${SINGLE_PAGES.REGISTER}`,
  FORGOT_PASSWORD: `/${SINGLE_PAGES.FORGOT_PASSWORD}`,
  PROFILE: `/${SINGLE_PAGES.PROFILE}`,
  // single types
  ABOUT: `${SINGLE_TYPES.ABOUT}`,
  CONSULTING_AND_NETWORKING: `${SINGLE_TYPES.CONSULTING_AND_NETWORKING}`,
  TESTIMONIALS: `${SINGLE_TYPES.TESTIMONIAL}`,
  CONTACTS: `${SINGLE_TYPES.CONTACT}`,
  ALL_COURSES: `${SINGLE_TYPES.ALL_COURSES}`,
  HOME: `${SINGLE_TYPES.HOME}`,
  DICTIONARY: `${SINGLE_TYPES.DICTIONARY}`,
  // collection types
  COURSES: '/courses',
  QUESTIONS: '/questions',
  USER_COURSES: '/user-courses',
  RESULTS: '/results',
  CERTIFICATES: '/certificates',
};
