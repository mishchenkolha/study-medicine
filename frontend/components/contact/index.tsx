'use client';

import { useState } from 'react';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import { Button } from '@/ui/button';
import { ILabelObj } from '@/types/dictionary';
import { error, success } from '@/utils/toast';
import { Icon } from '@/ui/icons';
import { IconType } from '@/ui/icons/IconType';
import Image from '@/ui/image';
import { DOMAIN_URL } from '@/utils/constants';

interface ContactSectionProps {
  dictionary: ILabelObj;
}

export default function ContactSection({ dictionary }: ContactSectionProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Список контактів повністю з dictionary
  const contactInfo = [
    {
      icon: <Icon type={IconType.Email} className="h-5 w-5" />,
      label: dictionary.email,
      value: dictionary.email_address,
    },
    {
      icon: <Icon type={IconType.Phone} className="h-5 w-5" />,
      label: dictionary.phone,
      value: dictionary.phone_number,
    },
    {
      icon: <Icon type={IconType.Map} className="h-5 w-5" />,
      label: dictionary.address,
      value: dictionary.map_address,
    },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (form.name.trim().length < 2)
      newErrors.name = dictionary.error_name_short;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      newErrors.email = dictionary.error_invalid_email;

    const phoneRegex =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (form.phone && !phoneRegex.test(form.phone.replace(/\s/g, ''))) {
      newErrors.phone = dictionary.error_invalid_phone;
    } else if (!form.phone) {
      newErrors.phone = dictionary.error_required;
    }

    if (form.message.trim().length < 10)
      newErrors.message = dictionary.error_message_short;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Очищення помилки відразу при початку введення
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        error(dictionary.send_failed);
      } else {
        success(dictionary.send_success);
        setForm({ name: '', email: '', phone: '', message: '' });
      }
    } catch {
      error(dictionary.server_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white py-12 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Інформаційна панель */}
          <div className="flex h-full justify-between lg:col-span-2 lg:flex-col">
            <div className="space-y-6">
              {contactInfo.map((item, i) => (
                <div key={i} className="group flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative hidden h-48 overflow-hidden rounded-2xl border border-gray-100 shadow-md md:block">
              <Image
                src={`${DOMAIN_URL}/images/map.jpg`}
                alt={dictionary.alt_office_map}
                className="h-full w-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                📍 {dictionary.office_location}
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xl shadow-gray-200/50 md:p-6 lg:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.7 relative">
                  <label className="text-sm font-semibold text-gray-700">
                    {dictionary.name}
                  </label>
                  <Input
                    name="name"
                    placeholder={dictionary.username}
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && (
                    <p className="absolute -bottom-4 ml-1 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.7 relative">
                  <label className="text-sm font-semibold text-gray-700">
                    {dictionary.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder={dictionary.placeholder_email}
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && (
                    <p className="absolute -bottom-4 ml-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.7 relative mt-5">
                <label className="text-sm font-semibold text-gray-700">
                  {dictionary.phone}
                </label>
                <Input
                  name="phone"
                  type="tel"
                  placeholder={dictionary.placeholder_phone}
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && (
                  <p className="absolute -bottom-4 ml-1 text-xs text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.7 relative mt-5">
                <label className="text-sm font-semibold text-gray-700">
                  {dictionary.message}
                </label>
                <Textarea
                  name="message"
                  rows={5}
                  placeholder={dictionary.placeholder_message || '...'}
                  value={form.message}
                  onChange={handleChange}
                  className={`resize-none ${errors.message ? 'input-error' : ''}`}
                />
                {errors.message && (
                  <p className="absolute -bottom-3 ml-1 text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-6 h-14 w-full text-base shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Icon
                      type={IconType.Loading}
                      className="h-5 w-5 animate-spin"
                    />
                    {dictionary.sending}
                  </span>
                ) : (
                  dictionary.send
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
