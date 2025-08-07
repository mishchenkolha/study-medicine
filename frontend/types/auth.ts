export interface ResetPasswordParams {
  code: string | null;
  password: string;
  passwordConfirmation: string;
}

export type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

export type LoginBody = {
  identifier: string;
  password: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ResetPasswordBody = {
  code: string | null;
  password: string;
  passwordConfirmation: string;
};
