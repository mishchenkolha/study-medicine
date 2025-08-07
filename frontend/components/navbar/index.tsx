import { IMenu } from '@/types/navbar';
import { Button } from '@/ui/button';
import MobileMenu from './mobile';
import Link from 'next/link';

export default function Navbar({ menu }: { menu: IMenu[] }) {
  return (
    <header className="bg-white/80 border-b border-gray-200 fixed top-0 left-0 right-0 z-50 backdrop-blur">
      <div className="mx-auto container py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-brand">
          Toronto medicine center
        </h1>

        {/* Desktop nav */}
        <nav className="hidden desktop:flex space-x-6 text-sm font-medium text-gray-600">
          {menu.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                href={item.href}
                className="hover:text-brand h-8 flex items-center whitespace-nowrap"
                title={item.alt}
              >
                {item.title}
              </Link>
              {!!item.children?.length && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 min-w-[200px] border border-gray-100 pointer-events-none group-hover:pointer-events-auto z-50">
                  {item.children.map((subItem) => (
                    <div key={subItem.title} className="relative group/sub">
                      <Link
                        href={subItem.href}
                        className="whitespace-nowrap max-w-[200px] overflow-hidden overflow-ellipsis block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
                        title={subItem.alt}
                      >
                        {subItem.title}
                      </Link>
                      {!!subItem.children?.length && (
                        <div className="absolute top-0 left-full bg-white shadow-lg rounded-md invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 transition-all duration-200 min-w-[180px] border border-gray-100 pointer-events-none group-hover/sub:pointer-events-auto z-50">
                          {subItem.children.map((thirdItem) => (
                            <Link
                              key={thirdItem.title}
                              href={thirdItem.href}
                              className="whitespace-nowrap max-w-[200px] overflow-hidden overflow-ellipsis block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700"
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

        <Button>Login</Button>

        {/* Burger + mobile menu */}
        <MobileMenu menu={menu} />
      </div>
    </header>
  );
}
