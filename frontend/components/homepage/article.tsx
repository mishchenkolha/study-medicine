import Link from '@/ui/link';
import Image from '@/ui/image';
import { IImage, ILink } from '@/types/strapi';
import { BLOCK, IBlockLink, IPublicPage } from '@/types/pages';
import { HTMLBlock } from '@/ui/html-block/html-block';
import { cn } from '@/utils';

export interface IHero {
  bg_image: IImage | null;
  image: IImage | null;
  class: string | null;
  title: string;
  description: string;
  id: number;
  link: ILink;
}
interface IProps {
  article: IPublicPage;
  even: boolean;
}
export const Article: React.FC<IProps> = async ({ article, even }) => {
  const link = article.blocks?.find(
    (block) => (block as IBlockLink).__component === BLOCK.LINK,
  ) as IBlockLink | undefined;
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto">
        <div
          className={cn(
            'flex flex-col-reverse lg:flex-row gap-10 items-center min-h-[calc(100vh-80px)]',
            even && 'lg:flex-row-reverse',
          )}
        >
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-700">
              {article.title}
            </h2>
            <HTMLBlock
              content={article.description}
              className="text-lg text-gray-600"
            />
            <div>
              {link?.url && (
                <Link
                  href={link.url}
                  className="inline-block px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
                >
                  {link.title}
                </Link>
              )}
            </div>
          </div>

          <div className="w-full h-[400px] lg:h-[500px] relative">
            {article.image?.url && (
              <Image
                src={article.image?.url}
                alt={article.title}
                className="object-cover w-full h-full rounded-xl shadow-md"
                fill
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
