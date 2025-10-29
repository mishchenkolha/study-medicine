import { getCategoriesTree, getCoursesList } from '@/services/navbar.service';
import { trimChar } from '@/utils';
import { DOMAIN_URL } from '@/utils/constants';
import { ROUTES } from '@/utils/routes';
import type { MetadataRoute } from 'next';

const generateNode = (
  url: string,
  priority = 0.5,
  changeFrequency = 'monthly' as TChangeFrequesncy,
) => ({
  url: `${DOMAIN_URL}${url}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

async function* generateCoursePages() {
  const courses = await getCoursesList();
  for (const course of courses) {
    yield generateNode(`${ROUTES.COURSES}/${course?.slug}`, 0.6);
  }
}

async function* generateSubCoursePages(slugList: string[]) {
  for (const slug of slugList) {
    yield generateNode(`${ROUTES.COURSES}/${slug}`, 0.7);
  }
}

type TChangeFrequesncy =
  | 'hourly'
  | 'always'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
  | undefined;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // COURSES
  const coursePosts = generateCoursePages();
  const coursePostsArray = [];
  for await (const coursePostNode of coursePosts) {
    coursePostsArray.push(coursePostNode);
  }
  // SUB_COURSES
  const categoriesTree = await getCategoriesTree();
  const coursesTree = Object.values(categoriesTree).find(
    (item) => item.slug === trimChar(ROUTES.COURSES, '/'),
  );
  const subCourses = generateSubCoursePages(
    Object.keys(coursesTree?.children || {}),
  );
  const subCourseArray = [];
  for await (const subCourseNode of subCourses) {
    subCourseArray.push(subCourseNode);
  }

  // OTHER STATIC PAGES
  const staticPages = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.ABOUT,
    ROUTES.CONTACTS,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.CONSULTING_AND_NETWORKING,
    ROUTES.TESTIMONIALS,
    ROUTES.COURSES,
  ];
  const staticPagesNodes = staticPages.map((page) => generateNode(page, 0.8));

  // HOMEPAGE
  const homePageNode = [generateNode(ROUTES.HOME, 1)];

  return [
    ...homePageNode,
    ...staticPagesNodes,
    ...subCourseArray,
    ...coursePostsArray,
    // TODO: blog pages
  ];
}
