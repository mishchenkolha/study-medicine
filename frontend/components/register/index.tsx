'use client';

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Button } from '@/ui/button';
import { ILabelObj } from '@/types/dictionary';
import { AUTO_CLOSE_TOAST, error, success } from '@/utils/toast';
import { fetcher, isValidEmail } from '@/utils';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';

function validatePassword(password: string, password2: string) {
  return {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    special: /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(password),
    latinOnly:
      password.length > 0 &&
      /^[A-Za-z0-9!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]+$/.test(password),

    match: password.length > 0 && password === password2,
  };
}

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

  const validations = validatePassword(form.password, form.password2);
  const allValid = Object.values(validations).every(Boolean);
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

  const rules = [
    { key: 'length', label: dictionary.password_requirement_length },
    { key: 'uppercase', label: dictionary.password_requirement_uppercase },
    { key: 'digit', label: dictionary.password_requirement_digit },
    { key: 'special', label: dictionary.password_requirement_special },
    { key: 'latinOnly', label: dictionary.password_requirement_latin },
    { key: 'match', label: dictionary.passwords_must_match },
  ] as const;

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
        placeholder={dictionary.password_again}
        onChange={handleChange}
        required
      />
      <ul className="space-y-0.5 text-xs list-none pl-0.5">
        {rules.map((rule) => {
          const ok = validations[rule.key];
          return (
            <li
              key={rule.key}
              className={`flex items-center gap-2 before:content-[''] before:inline-block before:w-3 before:h-3 before:rounded-full ${
                ok
                  ? 'text-green-600 before:bg-green-600'
                  : 'text-gray-400 before:border before:border-gray-400'
              }`}
            >
              {rule.label}
            </li>
          );
        })}
      </ul>
      <Button
        type="submit"
        disabled={
          loading ||
          !form.username ||
          !form.email ||
          !form.password ||
          !isValidEmail(form.email) ||
          !allValid
        }
      >
        {loading ? dictionary.registering : dictionary.register}
      </Button>
    </form>
  );
}
