'use client';

import { useSearchParams } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { forgotPassword, resetPassword } from '@/services/auth.service';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import type { ResetPasswordParams } from '@/types/auth';

export default function ForgotPassword() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await forgotPassword(email);
      setMessage('Інструкції для відновлення паролю надіслані на пошту.');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Сталася помилка');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== passwordConfirm) {
      setMessage('Паролі не співпадають');
      setLoading(false);
      return;
    }

    try {
      const data: ResetPasswordParams = {
        code,
        password,
        passwordConfirmation: passwordConfirm,
      };
      await resetPassword(data);
      setMessage('Пароль успішно змінено. Тепер ви можете увійти.');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Сталася помилка');
      }
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
            type="password"
            placeholder="Новий пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Підтвердіть пароль"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Зміна...' : 'Змінити пароль'}
          </Button>
        </>
      ) : (
        <>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Надсилання...' : 'Відновити пароль'}
          </Button>
        </>
      )}
      {message && <p className="text-center text-green-600">{message}</p>}
    </form>
  );
}
