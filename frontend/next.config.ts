import type { NextConfig } from 'next';
import { DOMAIN_URL, MEDIA_LIBRARY_URL } from './utils/constants';
import { extractRemotePattern } from './utils';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const [protocol, host] = DOMAIN_URL.split('//'); 

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  compress: true,
  typescript: { ignoreBuildErrors: true },
  images: {
    dangerouslyAllowLocalIP: DOMAIN_URL?.includes('localhost'),
    remotePatterns: [
      ...(extractRemotePattern(MEDIA_LIBRARY_URL ?? '') as RemotePattern[]),
      ...(extractRemotePattern(DOMAIN_URL ?? '') as RemotePattern[]),
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: host,
          },
        ],
        destination: `${protocol}://www.`${host}`/:path*`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${MEDIA_LIBRARY_URL}/uploads/:path*`, // проксі на Strapi
      },
    ];
  },
};

export default nextConfig;
