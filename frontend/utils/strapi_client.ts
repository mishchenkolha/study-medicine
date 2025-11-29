import { trimChar } from '.';
import {
  getCached,
  setCachedWithTags,
  SIX_MONTHS_SECONDS,
} from './cache/cache';
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
    cache = 'force-cache', // або 'default'
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

  if (method === 'GET' && SIX_MONTHS_SECONDS > 0) {
    const key = `cf:${url}`;
    const cached = await getCached(key);
    if (cached) {
      console.log('Cache hit for key:', key);
      return cached as TResponse;
    } else {
      console.log('Cache miss for key:', key);
    }
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      cache: 'no-store',
    });

    const data = await res.json();
    if (!res.ok) {
      console.error({ url, error: data?.error });
      throw new Error(data?.error?.message || 'Strapi API Error');
    }

    if (Array.isArray(data?.data)) {
      for (const item of data.data) {
        if (item?.documentId) {
          tags.push(`${tags[0]}:${item.documentId}`); // перший тег - це модель, додаємо model:id
        }
      }
    } else if (data?.data?.documentId) {
      // якщо це single об’єкт (наприклад, findOne)
      tags.push(`${tags[0]}:${data.data.documentId}`);
    }

    const effectiveTTL = ttl ?? SIX_MONTHS_SECONDS;
    await setCachedWithTags(key, data, effectiveTTL, tags);

    return data as TResponse;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next: cache === 'no-cache' ? undefined : { revalidate },
  });

  const data = await res.json();

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
