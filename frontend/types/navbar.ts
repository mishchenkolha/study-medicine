export interface IMenu {
  title: string;
  href: string;
  alt: string;
  children?: IMenu[];
}

interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  count: number;
}
interface IMeta {
  pagination: IPagination;
}
export interface NavbarResponse {
  meta: IMeta;
  data: { categories: IStrapiCategory[] }[];
}

export interface ICategory {
  id: number;
  title: string;
  description: string;
  slug: string;
  href: string;
}

export interface IStrapiCategory extends ICategory {
  documentId: string;
  parent: IStrapiCategory | null;
}

export interface ICategoryTreeNode extends ICategory {
  children: ICategoriesTree | null;
}

export interface CategoriesResponse {
  data: IStrapiCategory[];
}

export interface ICategoriesTree {
  [key: string]: ICategoryTreeNode;
}
