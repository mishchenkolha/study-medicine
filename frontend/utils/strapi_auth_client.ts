import { cookies } from 'next/headers';
import { strapiService } from './strapi_client';

const REVALIDATION_TIME = 60; // 1min
const ERROR_TEXT = 'Error fetching from Strapi with Auth user:';
export function strapiAuthService(customToken?: string) {
  return {
    get: async <TResponse>(
      path: string,
      options?: Omit<Parameters<typeof strapiService.get>[1], 'token'>,
    ) => {
      const token = customToken ?? (await cookies()).get('token')?.value;
      if (!token) {
        return null;
      }
      try {
        return strapiService.get<TResponse>(path, {
          ...options,
          token,
          revalidate: REVALIDATION_TIME,
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
      const token = customToken ?? (await cookies()).get('token')?.value;
      if (!token) {
        return null;
      }
      try {
        return strapiService.post<TResponse, TBody>(path, body, {
          ...options,
          token,
          revalidate: REVALIDATION_TIME,
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
      const token = customToken ?? (await cookies()).get('token')?.value;
      if (!token) {
        return null;
      }
      try {
        return strapiService.put<TResponse, TBody>(path, body, {
          ...options,
          token,
          revalidate: REVALIDATION_TIME,
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
      const token = customToken ?? (await cookies()).get('token')?.value;
      if (!token) {
        return null;
      }
      try {
        return strapiService.delete<TResponse>(path, {
          ...options,
          token,
          revalidate: REVALIDATION_TIME,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },

    me: async <TResponse>() => {
      const token = customToken ?? (await cookies()).get('token')?.value;
      if (!token) {
        return null;
      }
      try {
        return strapiService.get<TResponse>('/users/me', {
          token,
          revalidate: REVALIDATION_TIME,
        });
      } catch (error) {
        console.error(ERROR_TEXT, error);
        return null;
      }
    },
  };
}
