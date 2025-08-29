import { getStaticPage } from '@/services/pages.services';
import { getMeta } from '@/services/meta.service';
import { ROUTES } from '@/utils/routes';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { Metadata } from 'next';
import { IStaticPage } from '@/types/pages';
import { trimChar } from '@/utils';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.ABOUT);
}

export default async function AboutUsPage() {
  const aboutUsPagePromise = getStaticPage(
    trimChar(ROUTES.ABOUT, '/'),
  ) as Promise<IStaticPage>;
  const aboutUsPage = await aboutUsPagePromise;
  return (
    <>
      <h1 className="header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up">
        {aboutUsPage.title}
      </h1>
      <HTMLBlock
        content={aboutUsPage.description}
        className="text-center py-2 md:py-3 xl:py-4"
      />
    </>
  );
}
