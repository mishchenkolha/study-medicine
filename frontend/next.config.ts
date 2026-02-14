import type { NextConfig } from 'next';
import { DOMAIN_URL, MEDIA_LIBRARY_URL } from './utils/constants';
import { extractRemotePattern } from './utils';
import { RemotePattern } from 'next/dist/shared/lib/image-config';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  compress: true,
  images: {
    remotePatterns: [
      ...(extractRemotePattern(MEDIA_LIBRARY_URL ?? '') as RemotePattern[]),
      ...(extractRemotePattern(DOMAIN_URL ?? '') as RemotePattern[]),
    ],
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
