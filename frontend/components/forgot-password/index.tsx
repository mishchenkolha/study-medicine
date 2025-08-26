'use client';

import { useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { forgotPassword, resetPassword } from '@/services/auth.service';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import type { ResetPasswordParams } from '@/types/auth';
import { ILabelObj } from '@/types/dictionary';
import { error, success } from '@/utils/toast';

export default function ForgotPassword({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [form, setForm] = useState({
    passwordConfirm: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword(form.email);
      success(dictionary.forgot_password_success);
    } catch (e: unknown) {
      error((e as Error).message ?? dictionary.server_error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.passwordConfirm) {
      error(dictionary.passwords_do_not_match);
      setLoading(false);
      return;
    }

    try {
      const data: ResetPasswordParams = {
        code,
        password: form.password,
        passwordConfirmation: form.passwordConfirm,
      };
      await resetPassword(data);
      success(dictionary.reset_password_success);
    } catch (e: unknown) {
      error((e as Error).message ?? dictionary.server_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={code ? handleResetPassword : handleForgotPassword}
      className="max-w-sm mx-auto space-y-4 p-4"
    >
      {code ? (
        <>
          <Input
            name="password"
            placeholder={dictionary.new_password}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="passwordConfirm"
            placeholder={dictionary.confirm_password}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? dictionary.changing : dictionary.change_password}
          </Button>
        </>
      ) : (
        <>
          <Input
            type="email"
            name="email"
            placeholder={dictionary.email}
            onChange={handleChange}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? dictionary.sending : dictionary.recover_password}
          </Button>
        </>
      )}
    </form>
  );
}
