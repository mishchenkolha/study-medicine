import { trimChar } from '.';
import {
  //getCached,
  setCachedWithTags,
  SIX_MONTHS_SECONDS,
} from './cache/cache';

import { redis, redisConnected } from './cache/redis';

import { STRAPI_URL } from './constants';
import { COLLECTION_TYPES_ONE } from './routes';

const STRAPI_API_URL = `${STRAPI_URL}/api`;
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<TBody = unknown> {
  method?: RequestMethod;
  body?: TBody;
  token?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  ttl?: number;
}

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  const normalized: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      normalized[key] = value;
    });
  } else if (Array.isArray(headers)) {
    headers.forEach(([key, value]) => {
      normalized[key] = value;
    });
  } else if (typeof headers === 'object' && headers !== null) {
    Object.entries(headers).forEach(([key, value]) => {
      normalized[key] = value;
    });
  }

  return normalized;
}

async function fetchFromStrapi<TResponse, TBody = unknown>(
  path: string,
  {
    method = 'GET',
    body,
    token,
    headers = {},
    cache = 'force-cache',
    revalidate = Number(process.env.NEXT_PUBLIC_CACHING_TIME ?? 0),
    ttl,
    tags = [],
  }: FetchOptions<TBody> = {},
): Promise<TResponse> {
  const url = `${STRAPI_API_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...normalizeHeaders(headers),
  };

  if (token) {
    finalHeaders['Authorization'] = `Bearer ${token}`;
  }

  const purePath = trimChar(path, '/').toLowerCase().split('?')[0];
  tags = tags?.length ? tags : [COLLECTION_TYPES_ONE[purePath] || purePath];

  const isGet = method === 'GET';

  if (isGet && SIX_MONTHS_SECONDS > 0) {
    const key = `cf:${url}`;
    // let cached: TResponse | null = null;

    const isRedisConnected = redisConnected && redis;

    // --- Спроба отримати кеш через прослойку ---
    // try {
    //   cached = await getCached(key);
    // } catch (err) {
    //   console.warn('[Cache] Redis або основний кеш недоступний, fallback на Next.js tag cache', err);
    // }

    // if (isRedisConnected && cached) {
    //   console.log('Cache hit from Redis for key:', key);
    //   return cached as TResponse;
    // }
    // --- робимо fetch з Strapi ---
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      cache: !isRedisConnected ? cache : 'no-store',
      next: !isRedisConnected ? { tags } : undefined, // fallback Next.js tag cache, якщо getCached не спрацював
    });

    const data: any = await res.json();
    if (!res.ok) {
      console.error({ url, error: data?.error });
      throw new Error(data?.error?.message || 'Strapi API Error');
    }

    // --- enrichment тегів для Redis / прослойки ---
    if (Array.isArray(data?.data)) {
      for (const item of data.data) {
        if (item?.documentId) {
          tags.push(`${tags[0]}:${item.documentId}`);
        }
      }
    } else if (data?.data?.documentId) {
      tags.push(`${tags[0]}:${data.data.documentId}`);
    }

    const effectiveTTL = ttl ?? SIX_MONTHS_SECONDS;
    try {
      await setCachedWithTags(key, data, effectiveTTL, tags);
    } catch (err) {
      console.warn('[Cache] Не вдалося записати кеш, продовжуємо без нього', err);
    }

    return data as TResponse;
  }

  // --- для POST/PUT/DELETE або GET без TTL ---
  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next: cache === 'no-cache' ? undefined : { revalidate },
  });

  const data: any = await res.json();
  if (!res.ok) {
    console.error({ url, error: data?.error });
    throw new Error(data?.error?.message || 'Strapi API Error');
  }

  return data;
}

export const strapiService = {
  get: <TResponse>(path: string, options?: FetchOptions) =>
    fetchFromStrapi<TResponse>(path, { ...options, method: 'GET' }),

  post: <TResponse, TBody>(
    path: string,
    body: TBody,
    options?: FetchOptions<TBody>,
  ) =>
    fetchFromStrapi<TResponse, TBody>(path, {
      ...options,
      cache: 'no-cache',
      method: 'POST',
      body,
    }),

  put: <TResponse, TBody>(
    path: string,
    body: TBody,
    options?: FetchOptions<TBody>,
  ) =>
    fetchFromStrapi<TResponse, TBody>(path, {
      ...options,
      cache: 'no-cache',
      method: 'PUT',
      body,
    }),

  delete: <TResponse>(path: string, options?: FetchOptions) =>
    fetchFromStrapi<TResponse>(path, {
      ...options,
      cache: 'no-cache',
      method: 'DELETE',
    }),
};
