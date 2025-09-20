'use server';
import {
  AuthResponse,
  ForgotPasswordBody,
  IUser,
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
} from '@/types/auth';
import { strapiAuthService } from '@/utils/strapi_auth_client';
import { strapiService } from '@/utils/strapi_client';
import { cookies } from 'next/headers';

export const register = async (data: RegisterBody) =>
  strapiService.post<AuthResponse, RegisterBody>('/auth/local/register', data);

export const login = async (data: LoginBody) =>
  strapiService.post<AuthResponse, LoginBody>('/auth/local', data);

export const forgotPassword = async (email: string) =>
  strapiService.post<unknown, ForgotPasswordBody>('/auth/forgot-password', {
    email,
  });

export interface ChangePasswordBody {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export const changePassword = async (data: ChangePasswordBody) =>
  strapiAuthService().post('/auth/change-password', data);

export const resetPassword = async (data: ResetPasswordBody) =>
  strapiService.post<AuthResponse, ResetPasswordBody>(
    '/auth/reset-password',
    data,
  );

export const getUserToken = async (): Promise<string | null> => {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  return token;
};

export const getUser = async (): Promise<IUser | null> => {
  const user = (await cookies()).get('user')?.value;
  if (!user) return null;

  return JSON.parse(user);
};
