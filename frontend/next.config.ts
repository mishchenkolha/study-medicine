import type { NextConfig } from 'next';
import { DOMAIN_URL, MEDIA_LIBRARY_URL } from './utils/constants';
import { extractRemotePattern } from './utils';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: ${MEDIA_LIBRARY_URL} ${DOMAIN_URL};
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src https://challenges.cloudflare.com;
    connect-src 'self' https://challenges.cloudflare.com https://api.resend.com;
    upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
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
