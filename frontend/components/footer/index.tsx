import { ILabelObj } from '@/types/dictionary';
import { IStrapiCategory } from '@/types/navbar';
import { HTMLBlock } from '@/ui/html-block/html-block';
import Link from '@/ui/link';

export default async function Footer({
  dictionary,
  menu,
}: {
  dictionary: ILabelObj;
  menu: IStrapiCategory[];
}) {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[50px] xl:gap-[200px]">
          {/* Footer menu */}
          <nav className="flex items-center text-sm">
            {menu.map((item, index) => (
              <div key={item.id} className="flex items-center">
                <Link
                  href={item.href ?? (`/${item.slug}` || '#')}
                  className="text-gray-400 hover:text-gray-100 transition-colors px-2 whitespace-nowrap"
                >
                  {item.title}
                </Link>
                {index < menu.length - 1 && (
                  <span className="text-gray-500 text-center w-1">|</span>
                )}
              </div>
            ))}
          </nav>

          {/* Copyright */}
          <HTMLBlock
            className="text-center text-xs md:text-sm text-gray-400"
            content={dictionary.copyright}
          />
        </div>
      </div>
    </footer>
  );
}
