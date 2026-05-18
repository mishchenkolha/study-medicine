'use client';

import { useCallback, useEffect, useState } from 'react';
import { IMenu } from '@/types/navbar';
import Link from '@/ui/link';
import { ILabelObj } from '@/types/dictionary';
import AuthButtons from '../auth-buttons';
import { Icon } from '@/ui/icons';
import { IconType } from '@/ui/icons/IconType';
import ContactInfo from './contact-info';

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
        className="flex h-5 w-6 flex-col justify-between focus:outline-none xl:hidden"
        onClick={onOpen}
        aria-label="Open menu"
      >
        <span className="block h-0.5 rounded bg-gray-800"></span>
        <span className="block h-0.5 rounded bg-gray-800"></span>
        <span className="block h-0.5 rounded bg-gray-800"></span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-full transform flex-col bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - фіксована частина, що не скролиться */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
          <span className="font-bold text-gray-800">{dictionary.menu}</span>
          <button
            onClick={onClose}
            className="relative h-6 w-6 focus:outline-none"
            aria-label="Close menu"
          >
            <span className="absolute top-1/2 left-0 h-0.5 w-6 translate-y-[-50%] rotate-45 bg-gray-800" />
            <span className="absolute top-1/2 left-0 h-0.5 w-6 translate-y-[-50%] -rotate-45 bg-gray-800" />
          </button>
        </div>

        {/* Scrollable Area - скролиться тільки цей блок */}
        <nav className="flex flex-1 flex-col space-y-4 overflow-y-auto bg-white p-4 font-medium text-gray-700">
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
          {/* Contact Block */}
          <div className="mt-auto flex flex-col space-y-4 border-t border-gray-100 pt-6 pb-6 text-sm">
            <ContactInfo dictionary={dictionary} />
          </div>
        </nav>
      </div>
    </>
  );
}
