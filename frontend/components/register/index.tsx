'use client';

import { useState } from 'react';
import { register } from '@/services/auth.service';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { ILabelObj } from '@/types/dictionary';
import { error, success } from '@/utils/toast';

export default function RegisterForm({
  dictionary,
}: {
  dictionary: ILabelObj;
}) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form);
      success(dictionary.register_success);
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
      <Button type="submit" disabled={loading}>
        {loading ? dictionary.registering : dictionary.register}
      </Button>
    </form>
  );
}
