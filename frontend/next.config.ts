import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  //swcMinify: true,
  compress: true,
  images: {
    domains: [
      'localhost',
      'strapiuploaddata.blob.core.windows.net',
      'picsum.photos',
    ],
    unoptimized: true,
  },
};

export default nextConfig;
