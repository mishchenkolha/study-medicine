export const SITE_NAME = 'Study medicine';
export const SITE_DESCRIPTION = 'Study medicine description';
export const SITE_KEYWORDS = ['study', 'medicine', 'education', 'Toronto'];
export const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'http://localhost:3000';
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'https://worthy-agreement-b851614a2f.strapiapp.com';
export const MEDIA_LIBRARY_URL = process.env.NEXT_PUBLIC_MEDIA_LIBRARY_URL ?? 'https://worthy-agreement-b851614a2f.media.strapiapp.com';
export const STRAPI_LIMIT = 10000;
export const DEFAULT_QUESTIONS = 20;
export const SESSION_TIME = Number(
  process.env.NEXT_PUBLIC_USER_SESSION_TIME || 60 * 60,
); // 1h
export const NO_CACHE = { cache: 'no-cache' };
export const IS_PROD = process.env.NODE_ENV === 'production'
