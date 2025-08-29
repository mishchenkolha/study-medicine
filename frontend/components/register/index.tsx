'use client';

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { ILabelObj } from '@/types/dictionary';
import { AUTO_CLOSE_TOAST, error, success } from '@/utils/toast';
import { fetcher, isValidEmail } from '@/utils';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';

export default function RegisterForm({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetcher('/api/register', 'POST', form);
      success(dictionary.register_success);
      setForm({ username: '', email: '', password: '', password2: '' });
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, AUTO_CLOSE_TOAST);
    } catch (e: unknown) {
      error((e as Error).message ?? dictionary.server_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4">
      <Input
        name="username"
        placeholder={dictionary.username}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder={dictionary.email}
        onChange={handleChange}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder={dictionary.password}
        onChange={handleChange}
        required
      />
      <Input
        name="password2"
        type="password"
        placeholder={dictionary.passwordAgain}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        disabled={
          loading ||
          !form.username ||
          !form.email ||
          !form.password ||
          !isValidEmail(form.email) ||
          form.password !== form.password2
        }
      >
        {loading ? dictionary.registering : dictionary.register}
      </Button>
    </form>
  );
}
