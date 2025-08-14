interface IImageFormat {
  [key: string]: {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: string;
    size: number;
    width: number;
    height: number;
  };
}

export interface IImage {
  name: string;
  alternativeText?: string;
  caption?: string;
  ext: string;
  formats?: IImageFormat;
  hash: string;
  height: number;
  mime: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: string;
  size: number;
  url: string;
  width: number;
}

export interface IImageData {
  data: IImage;
}

export interface ILink {
  alt: string | null;
  class: string | null;
  description: string | null;
  id: number;
  image: IImageData | null;
  title: string;
  url: string | null;
  use_image: boolean | null;
}
