'use client';

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export default function LoginForm() {
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Невдалий вхід');
      } else {
        setMessage('Вхід успішний!');
        // Можна зробити редірект, наприклад:
        // window.location.href = '/dashboard';
      }
    } catch {
      setMessage('Помилка серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4">
      <Input
        name="identifier"
        placeholder="Email або ім'я користувача"
        onChange={handleChange}
        required
      />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Вхід...' : 'Увійти'}
      </Button>
      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  );
}
