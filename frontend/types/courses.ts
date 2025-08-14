export interface IPublicCourse {
  id: number;
  title: string;
  duration: string;
  level: string;
  audience: string;
  image: string;
  slug: string;
}

export interface ICategoryIds {
  [key: string]: { title: string; list: string[] };
}
