'use client';

import { fetcher } from '@/utils';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useUser = () => {
  const GET_USER_URL = '/api/check-session';
  const { data: user, error, isLoading } = useSWR(GET_USER_URL, fetcher);
  if (error) {
    console.error('Error fetching user:', error);
  }
  return { isLoading, user };
};

export const useLogout = () => {
  const GET_LOGOUT_URL = '/api/auth/logout';
  const { trigger: logout, error } = useSWRMutation(GET_LOGOUT_URL, () =>
    fetcher(GET_LOGOUT_URL, 'POST'),
  );
  if (error) {
    console.error('Error logging out:', error);
  }
  return { logout };
};
