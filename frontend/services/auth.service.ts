import {
  ForgotPasswordBody,
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
} from '@/types/auth';
import { AuthResponse } from '@/types/strapi';
import { strapiService } from '@/utils/strapi_client';

export const register = (data: RegisterBody) =>
  strapiService.post<AuthResponse, RegisterBody>('/auth/local/register', data);

export const login = (data: LoginBody) =>
  strapiService.post<AuthResponse, LoginBody>('/auth/local', data);

export const forgotPassword = (email: string) =>
  strapiService.post<unknown, ForgotPasswordBody>('/auth/forgot-password', {
    email,
  });

export const resetPassword = (data: ResetPasswordBody) =>
  strapiService.post<AuthResponse, ResetPasswordBody>(
    '/auth/reset-password',
    data,
  );
