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
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);

  const validations = validatePassword(form.password, form.password2);
  const allValid = Object.values(validations).every(Boolean);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'phone') {
      const value = e.target.value.replace(/\D/g, '');
      if (value.length > 15) return;
      setForm((prev) => ({ ...prev, [e.target.name]: value }));
      return;
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetcher('/api/register', 'POST', form);
      if (!result?.error) {
        success(dictionary.register_success);
        setForm({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          password: '',
          password2: '',
        });
        setTimeout(() => {
          router.push(ROUTES.LOGIN);
        }, AUTO_CLOSE_TOAST);
      } else {
        error(result.error || dictionary.register_failed);
      }
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
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 p-4">
      <Input
        name="firstname"
        placeholder={dictionary.firstname}
        onChange={handleChange}
        required
      />
      <Input
        name="lastname"
        placeholder={dictionary.lastname}
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        value={form.phone}
        type="tel"
        placeholder={dictionary.phone}
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
      <ul className="list-none space-y-0.5 pl-0.5 text-xs">
        {rules.map((rule) => {
          const ok = validations[rule.key];
          return (
            <li
              key={rule.key}
              className={`flex items-center gap-2 before:inline-block before:h-3 before:w-3 before:rounded-full before:content-[''] ${
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
          !form.firstname ||
          !form.lastname ||
          !form.phone ||
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
