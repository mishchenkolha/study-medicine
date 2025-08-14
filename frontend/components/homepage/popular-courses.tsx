import { IImage } from '@/types/strapi';
import { IBlockCard } from '@/types/pages';
import { cn } from '@/utils';

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
    <section className={cn('py-20 bg-gray-50', courses.bg)}>
      <div className="mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-12">
          {courses.title}
        </h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {courses.cards.map((card) => (
            <div
              key={card.id}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm"
            >
              <h4 className="text-xl font-semibold text-brand mb-2">
                {card.title}
              </h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
