export const SITE_NAME = 'Study medicine';
export const SITE_DESCRIPTION = 'Study medicine description';
export const SITE_KEYWORDS = ['study', 'medicine', 'education', 'Toronto'];
export const DOMAIN_URL =
  process.env.NEXT_PUBLIC_DOMAIN_URL ?? 'http://localhost:3000';
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  'https://worthy-agreement-b851614a2f.strapiapp.com';
export const MEDIA_LIBRARY_URL =
  process.env.NEXT_PUBLIC_MEDIA_LIBRARY_URL ??
  'https://worthy-agreement-b851614a2f.media.strapiapp.com';
export const STRAPI_LIMIT = 10000;
export const DEFAULT_QUESTIONS = 20;
export const SESSION_TIME = Number(
  process.env.NEXT_PUBLIC_USER_SESSION_TIME || 60 * 60,
); // 1h
export const NO_CACHE = { cache: 'no-cache' };
export const IS_PROD = process.env.NODE_ENV === 'production';

export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
export const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? '';
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? '';
export const SECRET_KEY = process.env.FORM_SECRET || '';

export const CLOUDFLARE_SITE_KEY =
  process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY || '';
export const CLOUDFLARE_SECRET_KEY = process.env.CLOUDFLARE_SECRET_KEY || '';
export const CLOUDFLARE_TOKEN_URL =
  process.env.CLOUDFLARE_TOKEN_URL ||
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';
export const CLOUDFLARE_URL =
  process.env.CLOUDFLARE_URL ||
  'https://challenges.cloudflare.com/turnstile/v0/api.js';
