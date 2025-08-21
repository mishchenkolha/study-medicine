import { ICategoryIds } from '@/types/courses';
import {
  ICategoriesTree,
  ICategoryTreeNode,
  IMenu,
  IStrapiCategory,
} from '@/types/navbar';
import { ROUTES } from './routes';

export const normalizeTree = (
  data: IStrapiCategory[],
  slug?: string,
): ICategoriesTree => {
  const categories: ICategoriesTree = {};
  const filteredData = slug
    ? data.filter((item) => item.parent?.slug === slug)
    : data.filter((item) => !item.parent);

  filteredData.forEach((item) => {
    categories[item.slug] = {
      id: item.id,
      title: item.title,
      description: item.description,
      slug: item.slug,
      href: item.href,
      children: normalizeTree(data, item.slug),
    };
  });

  return categories;
};

export const getTreeNode = (
  tree: ICategoriesTree | null,
  slug: string,
): ICategoryTreeNode | null => {
  let treeNode: ICategoryTreeNode | null = null;
  if (!tree) {
    return null;
  }
  Object.values(tree).forEach((item) => {
    if (!treeNode) {
      if (item.slug === slug) {
        treeNode = item;
      } else {
        treeNode = getTreeNode(item.children, slug);
      }
    }
  });
  return treeNode;
};

export const normalizeMenuTree = (
  categoriesTree: ICategoriesTree | null | undefined,
  courseCatIds: string[],
): IMenu[] | undefined => {
  const normalizedData: IMenu[] = [];
  if (!categoriesTree) {
    return;
  }

  Object.values(categoriesTree).map((item: ICategoryTreeNode) => {
    const href =
      item.href ||
      (`/${item.slug}` === ROUTES.COURSES && `${ROUTES.COURSES}`) ||
      (courseCatIds.includes(item.slug)
        ? `${ROUTES.COURSES}/${item.slug}`
        : `/${item.slug}`);
    normalizedData.push({
      title: item.title,
      href,
      children: normalizeMenuTree(item.children, courseCatIds),
      alt: item.description || item.title,
    });
  });
  return normalizedData;
};

export const normalizeMenu = (
  menu: IStrapiCategory[],
  menuTree: ICategoriesTree,
) => {
  const coursesTree = Object.values(menuTree).find(
    (item) => item.slug === 'courses',
  );
  let categoryIds: { [key: string]: { title: string; list: string[] } } = {};
  if (coursesTree?.children) {
    categoryIds = getCoursesIds(coursesTree.children);
  }
  let courseCatIds: string[] = [];
  Object.values(categoryIds).forEach(
    (categoryList) => (courseCatIds = [...courseCatIds, ...categoryList.list]),
  );
  courseCatIds = [...courseCatIds, ...Object.keys(categoryIds)];

  return menu.map((item) => {
    const treeNode = getTreeNode(menuTree, item.slug);
    const href =
      item.href ||
      (`/${item.slug}` === ROUTES.COURSES && `${ROUTES.COURSES}`) ||
      (courseCatIds.includes(item.slug)
        ? `${ROUTES.COURSES}/${item.slug}`
        : `/${item.slug}`);
    return {
      title: item.title,
      href,
      children: normalizeMenuTree(treeNode?.children, courseCatIds),
      alt: item.description || item.title,
    };
  });
};

export const getCoursesIds = (catTree: ICategoriesTree): ICategoryIds => {
  const result: ICategoryIds = {};
  Object.entries(catTree).forEach(([key, item]) => {
    if (!result[key]) result[key] = { title: item.title, list: [] };
    Object.values(item?.children ?? {})?.forEach((item2) =>
      result[key].list.push(item2.slug),
    );
  });

  return result;
};
