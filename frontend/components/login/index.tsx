'use client';

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button, VARIANTS } from '@/ui/button';
import { ILabelObj } from '@/types/dictionary';
import { ROUTES } from '@/utils/routes';
import { error, success } from '@/utils/toast';

export default function LoginForm({ dictionary }: { dictionary: ILabelObj }) {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        error(dictionary.login_failed);
      } else {
        success(dictionary.login_success);
        window.open(ROUTES.COURSES, '_self');
      }
    } catch {
      error(dictionary.server_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4">
      <Input
        name="identifier"
        placeholder={dictionary.email_or_username}
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
      <div className="flex gap-3 w-full justify-between">
        <Button type="submit" disabled={loading}>
          {loading ? dictionary.logging_in : dictionary.login}
        </Button>
        <Button
          href={ROUTES.FORGOT_PASSWORD}
          disabled={loading}
          variant={VARIANTS.SECONDARY}
        >
          {dictionary.forgot_password}
        </Button>
      </div>
    </form>
  );
}
