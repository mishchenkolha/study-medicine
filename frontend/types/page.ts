export interface IPageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams?: Promise<any>;
}
