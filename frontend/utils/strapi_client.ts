const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions<TBody = unknown> {
  method?: RequestMethod;
  body?: TBody;
  token?: string;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
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
    revalidate = 3600, // 1 година кешу за замовчуванням
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

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    cache,
    next: cache === 'no-store' ? undefined : { revalidate },
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
      method: 'PUT',
      body,
    }),

  delete: <TResponse>(path: string, options?: FetchOptions) =>
    fetchFromStrapi<TResponse>(path, { ...options, method: 'DELETE' }),
};
