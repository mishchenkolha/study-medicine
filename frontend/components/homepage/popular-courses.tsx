import { IImage } from '@/types/strapi';
import { IBlockCard } from '@/types/pages';
import { cn } from '@/utils';
import Link from '@/ui/link';

export interface ICourses {
  id: number;
  title: string;
  description: string;
  bg_img: IImage | null;
  bg: string | null;
  cards: IBlockCard[];
}
interface IProps {
  courses: ICourses;
}
export const PopularCourses: React.FC<IProps> = async ({ courses }) => {
  return (
    <section className={cn('py-20 rounded-2xl', courses.bg)}>
      <div className="mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-700">
          {courses.title}
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {courses.cards.map((card) => (
            <Link
              href={card.link ?? '#'}
              title={card.title ?? ''}
              key={card.id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm h-52 overflow-y-auto custom-middle-scrollbar"
            >
              <div className="text-xl font-semibold text-brand mb-2 text-gray-700">
                {card.title}
              </div>
              <p className="text-gray-600">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
