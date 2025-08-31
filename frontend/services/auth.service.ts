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

export const register = (data: RegisterBody) =>
  strapiService.post<AuthResponse, RegisterBody>('/auth/local/register', data);

export const login = (data: LoginBody) =>
  strapiService.post<AuthResponse, LoginBody>('/auth/local', data);

export const forgotPassword = (email: string) =>
  strapiService.post<unknown, ForgotPasswordBody>('/auth/forgot-password', {
    email,
  });

export interface ChangePasswordBody {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

export const changePassword = (data: ChangePasswordBody) =>
  strapiAuthService().post('/auth/change-password', data);

export const resetPassword = (data: ResetPasswordBody) =>
  strapiService.post<AuthResponse, ResetPasswordBody>(
    '/auth/reset-password',
    data,
  );

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('user');
  return { success: true };
};

export const getUserToken = async () => (await cookies()).get('token')?.value;

export const getUser = async (): Promise<IUser | null> => {
  const user = (await cookies()).get('user')?.value;
  if (!user) return null;
  return JSON.parse(user);
};
