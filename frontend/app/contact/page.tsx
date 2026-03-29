import Contact from '@/components/contact';
import { generateFormSignature } from '@/components/crypto';
import { getMeta } from '@/services/meta.service';
import { getContactPage } from '@/services/pages.services';
import { ILabelObj } from '@/types/dictionary';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { CLOUDFLARE_URL } from '@/utils/constants';
import { ROUTES } from '@/utils/routes';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { Suspense } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  return getMeta(ROUTES.CONTACTS);
}

export default async function ContactPage() {
  const contactPage = await getContactPage();

  if (!contactPage) {
    return notFound();
  }

  const { signature, timestamp } = generateFormSignature();

  const dictionary = {} as ILabelObj;
  contactPage.labels?.forEach?.((label) => {
    dictionary[label.name] = label.label;
  });

  return (
    <>
      <link rel="preconnect" href="https://challenges.cloudflare.com" />
      <Suspense>
        <h1 className="header1 animate-fade-in-up pb-2">{contactPage.title}</h1>
        {Boolean(contactPage.description) && (
          <HTMLBlock
            content={contactPage.description}
            className="py-2 md:py-3 xl:py-4"
          />
        )}
        <Script src={CLOUDFLARE_URL} strategy="afterInteractive" />
        <Contact
          dictionary={dictionary}
          image={contactPage.image}
          signature={signature}
          timestamp={timestamp}
        />
      </Suspense>
    </>
  );
}
