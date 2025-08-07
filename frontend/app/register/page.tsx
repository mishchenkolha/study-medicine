'use client';

import { useState } from 'react';
import { register } from '@/services/auth.service';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      await register(form);
      setMessage('Реєстрація успішна! Перевірте пошту для підтвердження.');
    } catch (error: any) {
      setMessage(error.message || 'Сталася помилка при реєстрації');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 p-4">
      <Input name="username" placeholder="Імʼя користувача" onChange={handleChange} required />
      <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <Input
        name="password"
        type="password"
        placeholder="Пароль"
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Реєстрація...' : 'Зареєструватися'}
      </Button>
      {message && <p className="text-center text-red-600">{message}</p>}
    </form>
  );
}
