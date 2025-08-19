import { IImageData } from './strapi';

export interface IOpenGraph {
  id: number;
  ogTitle: string | null;
  ogDescription: string | null;
  ogUrl?: string | null;
  ogType?: 'website' | 'article' | 'profile' | string | null;
  ogImage: IImageData | null;
}

export interface IMetaData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  metaImage: IImageData | null;
  openGraph: IOpenGraph | null;
}

export interface MetaResponse {
  data: {
    seo: IMetaData | null;
  };
}

export type TOgType =
  | 'website'
  | 'article'
  | 'profile'
  | 'book'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';
