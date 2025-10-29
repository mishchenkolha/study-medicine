import type { NextConfig } from 'next';
import { DOMAIN_URL, STRAPI_URL } from './utils/constants';
import { extractRemotePattern } from './utils';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [
      ...(extractRemotePattern(STRAPI_URL ?? '') as RemotePattern[]),
      ...(extractRemotePattern(DOMAIN_URL ?? '') as RemotePattern[]),
    ],
  },
};

export default nextConfig;
