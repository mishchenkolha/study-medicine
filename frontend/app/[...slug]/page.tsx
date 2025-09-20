import { getMeta } from '@/services/meta.service';
import { getStaticPage } from '@/services/pages.services';
import { IPageProps } from '@/types/page';
import { IStaticPage } from '@/types/pages';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!slug || (Array.isArray(slug) && slug.length > 1)) {
    return {};
  }
  return getMeta(`/${slug?.[0]?.toLowerCase?.()}`);
}

export default async function StaticPage({ params }: IPageProps) {
  const { slug } = await params;
  if (!slug || (Array.isArray(slug) && slug.length > 1)) {
    return notFound();
  }
  const staticPagePromise = getStaticPage(
    slug?.[0]?.toLowerCase?.(),
  ) as Promise<IStaticPage>;
  const staticPage = await staticPagePromise;

  if (!staticPage) {
    return notFound();
  }
  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {staticPage.title}
      </h1>
      <HTMLBlock
        content={staticPage.description}
        className="py-2 md:py-3 xl:py-4"
      />
    </>
  );
}
