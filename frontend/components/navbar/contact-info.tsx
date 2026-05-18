'use client';

import { useCallback, useEffect, useState } from 'react';
import { ILabelObj } from '@/types/dictionary';
import { Icon } from '@/ui/icons';
import { IconType } from '@/ui/icons/IconType';
import { sendAnalyticsEvent } from '../analytics';

export default function ContactInfo({ dictionary }: { dictionary: ILabelObj }) {
  const onContactInfoClick = useCallback(() => {
    sendAnalyticsEvent('Contact');
  }, []);

  return (
    <>
      <a
        href={`tel:${dictionary?.phone_number?.replace?.(/[^\d+]/g, '')}`}
        className="hover:text-brand flex items-center gap-2 transition-colors"
        onClick={onContactInfoClick}
      >
        <Icon type={IconType.Phone} className="h-4 w-4 text-gray-400" />
        <span className="whitespace-nowrap">{dictionary?.phone_number}</span>
      </a>
      <a
        href={`mailto:${dictionary.email_address}`}
        className="hover:text-brand flex items-center gap-2 transition-colors"
        onClick={onContactInfoClick}
      >
        <Icon type={IconType.Email} className="h-4 w-4 text-gray-400" />
        <span className="whitespace-nowrap">{dictionary.email_address}</span>
      </a>
    </>
  );
}
