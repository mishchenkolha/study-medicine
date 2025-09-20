import { strapiService } from './strapi_client';
import { getUserToken } from '@/services/auth.service';

const REVALIDATION_TIME = 10; // 10s
const ERROR_TEXT = 'Error fetching from Strapi with Auth user:';
export function strapiAuthService(customToken?: string) {
  return {
    get: async <TResponse>(
      path: string,
      options?: Omit<Parameters<typeof strapiService.get>[1], 'token'>,
    ) => {
      const token = customToken ?? (await getUserToken());
      if (!token) {
        return null;
      }
      try {
        return strapiService.get<TResponse>(path, {
          token,
          ...(options &&
            (options as { cache?: string }).cache !== 'no-cache' && {
              revalidate: REVALIDATION_TIME,
            }),
          ...options,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },

    post: async <TResponse, TBody>(
      path: string,
      body: TBody,
      options?: Omit<Parameters<typeof strapiService.post>[2], 'token'>,
    ) => {
      const token = customToken ?? (await getUserToken());
      if (!token) {
        return null;
      }
      try {
        return strapiService.post<TResponse, TBody>(path, body, {
          token,
          ...options,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },

    put: async <TResponse, TBody>(
      path: string,
      body: TBody,
      options?: Omit<Parameters<typeof strapiService.put>[2], 'token'>,
    ) => {
      const token = customToken ?? (await getUserToken());
      if (!token) {
        return null;
      }
      try {
        return strapiService.put<TResponse, TBody>(path, body, {
          token,
          ...options,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },

    delete: async <TResponse>(
      path: string,
      options?: Omit<Parameters<typeof strapiService.delete>[1], 'token'>,
    ) => {
      const token = customToken ?? (await getUserToken());
      if (!token) {
        return null;
      }
      try {
        return strapiService.delete<TResponse>(path, {
          token,
          ...options,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },

    me: async <TResponse>() => {
      const token = customToken ?? (await getUserToken());
      if (!token) {
        return null;
      }
      try {
        return strapiService.get<TResponse>('/users/me', {
          token,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },
  };
}
