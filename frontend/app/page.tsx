import { AllCourses } from '@/components/courses/all-courses';
import { Article } from '@/components/homepage/article';
import { Hero, IHero } from '@/components/homepage/hero';
import {
  ICourses,
  PopularCourses,
} from '@/components/homepage/popular-courses';
import { getStaticPage } from '@/services/pages.services';
import { IPublicPage } from '@/types/pages';

export default async function Home() {
  const populate: string[] = [
    'hero.image',
    'hero.bg_image',
    'hero.link.image',
    'benefits.qa.image',
    'courses.bg_img',
    'courses.cards.image',
    'articles.image',
  ];
  const homepagePromise = getStaticPage('homepage', populate);
  const homepage = await homepagePromise;
  console.log({ homepage });
  return (
    <>
      <Hero hero={(homepage as { hero: IHero }).hero} />
      <PopularCourses courses={(homepage as { courses: ICourses }).courses} />
      <section className="bg-cover bg-center text-center py-24 px-6 text-darkGray">
        {(homepage as { articles: IPublicPage[] }).articles.map(
          (article, index) => (
            <Article
              key={article.id}
              article={article}
              even={Boolean(index % 2)}
            />
          ),
        )}
      </section>
      <section className="bg-cover bg-center text-center py-24 px-6 text-darkGray">
        <AllCourses />
      </section>
    </>
  );
}
