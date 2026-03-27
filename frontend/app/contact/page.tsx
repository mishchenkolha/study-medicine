import Contact from '@/components/contact';
import { getDictionary } from '@/services/dictionary.service';
import { getMeta } from '@/services/meta.service';
import { getStaticPage } from '@/services/pages.services';
import { IStaticPage } from '@/types/pages';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { ROUTES } from '@/utils/routes';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.CONTACTS);
}

export default async function ContactPage() {
  const staticPagePromise = getStaticPage(
    ROUTES.CONTACTS,
  ) as Promise<IStaticPage>;
  const dictionaryPromise = getDictionary();
  const [staticPage, dictionary] = await Promise.all([
    staticPagePromise,
    dictionaryPromise,
  ]);

  if (!staticPage) {
    return notFound();
  }

  return (
    <Suspense>
      <h1 className="header1 animate-fade-in-up pb-2">{staticPage.title}</h1>
      {Boolean(staticPage.description) && (
        <HTMLBlock
          content={staticPage.description}
          className="py-2 md:py-3 xl:py-4"
        />
      )}
      <Contact dictionary={dictionary} />
    </Suspense>
  );
}
