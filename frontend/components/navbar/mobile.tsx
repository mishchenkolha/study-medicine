'use client';

import { useCallback, useEffect, useState } from 'react';
import { IMenu } from '@/types/navbar';
import { Button } from '@/ui/button';
import Link from 'next/link';
import { ILabelObj } from '@/types/dictionary';
import { ROUTES } from '@/utils/routes';

export default function MobileMenu({
  menu,
  dictionary,
}: {
  menu: IMenu[];
  dictionary: ILabelObj;
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return (
    <>
      {/* Burger button */}
      <button
        className="xl:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
        onClick={onOpen}
        aria-label="Open menu"
      >
        <span className="block h-0.5 bg-gray-800 rounded"></span>
        <span className="block h-0.5 bg-gray-800 rounded"></span>
        <span className="block h-0.5 bg-gray-800 rounded"></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 w-full h-14 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 focus:outline-none"
          aria-label="Close menu"
        >
          <span className="absolute w-6 h-0.5 bg-gray-800 rotate-45 top-1/2 left-0 translate-y-[-50%]" />
          <span className="absolute w-6 h-0.5 bg-gray-800 -rotate-45 top-1/2 left-0 translate-y-[-50%]" />
        </button>

        <nav className="max-h-[calc(100vh-46px)] overflow-y-auto bg-white rounded-br-md rounded-bl-md p-2 shadow mt-12 flex flex-col space-y-4 text-gray-700 font-medium">
          {menu.map((item) => (
            <div key={item.title} className="flex flex-col space-y-2">
              <Link href={item.href} onClick={onClose} title={item.alt}>
                {item.title}
              </Link>
              {item.children && (
                <div className="ml-4 flex flex-col space-y-2 text-sm">
                  {item.children.map((subItem) => (
                    <div
                      key={subItem.title}
                      className="flex flex-col space-y-1"
                    >
                      <Link
                        href={subItem.href}
                        onClick={onClose}
                        title={subItem.alt}
                      >
                        {subItem.title}
                      </Link>
                      {subItem.children && (
                        <div className="ml-4 flex flex-col space-y-1 text-sm">
                          {subItem.children.map((thirdItem) => (
                            <Link
                              key={thirdItem.title}
                              href={thirdItem.href}
                              onClick={onClose}
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
          <Button
            href={ROUTES.LOGIN}
            title={dictionary.login}
            onClick={onClose}
          >
            {dictionary.login}
          </Button>
        </nav>
      </div>
    </>
  );
}
