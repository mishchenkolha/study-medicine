import { IPageProps } from '@/types/page';

export default async function PrivateCousePage({ params }: IPageProps) {
  const { slug } = await params;
  return <>{slug}</>;
}
