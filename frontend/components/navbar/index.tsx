import { IMenu } from '@/types/navbar';
import MobileMenu from './mobile';
import Link from '@/ui/link';
import Image from '@/ui/image';
import { ILabelObj } from '@/types/dictionary';
import { DOMAIN_URL } from '@/utils/constants';
import AuthButtons from '../auth-buttons';

export default async function Navbar({
  menu,
  dictionary,
}: {
  menu: IMenu[];
  dictionary: ILabelObj;
}) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between py-3">
        <Link
          href="/"
          title="logo"
          className="absolute top-0 left-0 z-60 h-13 w-13 xl:h-[70px] xl:w-[70px]"
        >
          <Image
            src={`${DOMAIN_URL}/images/logoMEE-removebg-preview.png`}
            fill
            style={{ objectFit: 'contain', transform: 'scale(1.3)' }}
            alt={'Logo'}
            priority
          />
        </Link>
        <div />
        {/* Desktop nav */}
        <nav className="hidden space-x-6 text-sm font-medium text-gray-600 xl:flex">
          {menu.map((item) => (
            <div key={item.title} className="group relative">
              <Link
                href={item.href}
                className="hover:text-brand flex h-8 items-center whitespace-nowrap"
                title={item.alt}
              >
                {item.title}
              </Link>
              {!!item.children?.length && (
                <div className="pointer-events-none invisible absolute top-full left-0 z-50 min-w-[200px] rounded-md border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                  {item.children.map((subItem) => (
                    <div key={subItem.title} className="group/sub relative">
                      <Link
                        href={subItem.href}
                        className="block max-w-[200px] overflow-hidden px-4 py-2 text-sm overflow-ellipsis whitespace-nowrap text-gray-700 hover:bg-gray-100"
                        title={subItem.alt}
                      >
                        {subItem.title}
                      </Link>
                      {!!subItem.children?.length && (
                        <div className="pointer-events-none invisible absolute top-0 left-full z-50 min-w-[180px] rounded-md border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover/sub:pointer-events-auto group-hover/sub:visible group-hover/sub:opacity-100">
                          {subItem.children.map((thirdItem) => (
                            <Link
                              key={thirdItem.title}
                              href={thirdItem.href}
                              className="block max-w-[200px] overflow-hidden px-4 py-2 text-sm overflow-ellipsis whitespace-nowrap text-gray-700 hover:bg-gray-100"
                              title={thirdItem.alt}
                            >
                              {thirdItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <AuthButtons dictionary={dictionary} />

        {/* Burger + mobile menu */}
        <MobileMenu menu={menu} dictionary={dictionary} />
      </div>
    </header>
  );
}
