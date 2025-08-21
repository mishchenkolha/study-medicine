import { IMetaData } from './meta';
import { ICategory } from './navbar';
import { IImage } from './strapi';

export enum LEVEL {
  BEGINNER = 'BEGINNER',
  INERMEDIATE = 'INERMEDIATE',
  ADVANCED = 'ADVANCED',
}
export enum BLOCK {
  CARD = 'components.card',
  LINK = 'components.link',
}

export interface IBlockCard {
  __component: BLOCK.CARD;
  id: number;
  title: string | null;
  description: string | null;
  link: string | null;
  time: string | null;
  level: LEVEL;
  price: string | null;
  class: string | null;
  image?: IImage | null;
}

export interface IBlockLink {
  __component: BLOCK.LINK;
  id: number;
  title: string | null;
  description: string | null;
  url: string | null;
  alt: string | null;
  use_image: boolean | null;
  class: string | null;
  image?: IImage | null;
}

type TBlock = IBlockCard | IBlockLink;
export interface IPublicPage {
  id: number;
  title: string;
  description: string;
  slug: string;
  duration_hours: number;
  category: ICategory;
  image: IImage | null;
  bg_image: IImage | null;
  seo: IMetaData | null;
  blocks: TBlock[] | null; // TODO: will add more blocks
}

export interface IStaticPage {
  id: number;
  title: string;
  description: string;
}

export interface PagesResponse {
  data: IPublicPage[];
}

export interface StaticPageResponse {
  data: IStaticPage;
}

export interface DynamicPageResponse {
  data: IPublicPage[];
}
