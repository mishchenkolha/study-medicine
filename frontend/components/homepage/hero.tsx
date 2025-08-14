import Link from 'next/link';
import Image from 'next/image';
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
export const Hero: React.FC<IProps> = async ({ hero: IHero }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-80px)]">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-700">
              Advance Your Career in Aesthetic & Medical Science
            </h1>
            <p className="text-lg text-gray-600">
              Join industry-leading courses designed by professionals for future
              experts.
            </p>
            <div>
              <Link
                href="/courses"
                className="inline-block px-6 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          <div className="w-full h-[400px] lg:h-[500px] relative">
            <Image
              src="/images/medical-hero.jpg"
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
