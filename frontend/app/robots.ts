import { DOMAIN_URL } from '@/utils/constants';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: '/*?',
      },
    ],
    sitemap: `${DOMAIN_URL}/sitemap.xml`,
  };
}
