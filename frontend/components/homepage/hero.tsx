import Link from '@/ui/link';
import Image from '@/ui/image';
import { IImage, ILink } from '@/types/strapi';

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
  hero: IHero;
}
export const Hero: React.FC<IProps> = async ({ hero }: { hero: IHero }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-80px)]">
          <div className="space-y-6">
            <h1 className="header1 animate-fade-in-up">{hero.title}</h1>
            <p className="text-lg text-gray-600 animate-fade-in-up delay-200">
              {hero.description}
            </p>
            <div>
              <Link
                href={hero.link.url ?? ''}
                className="animate-fade-in delay-400 inline-block px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
              >
                {hero.link.title}
              </Link>
            </div>
          </div>

          <div className="w-full h-[400px] lg:h-[500px] relative animate-fade-in">
            <Image
              src={hero.image?.url ?? ''}
              alt="Medical research"
              className="object-cover w-full h-full rounded-xl shadow-md"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
};
