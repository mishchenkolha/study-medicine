import { MEDIA_LIBRARY_URL } from './constants';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

declare global {
  interface String {
    trimChar(char?: string): string;
  }
}

export const trimChar = function (str: string, char?: string): string {
  if (!char) {
    return str.trim(); // стандартна поведінка — пробіли
  }
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // екранування спецсимволів
  const regex = new RegExp(`^${escapedChar}+|${escapedChar}+$`, 'g');
  return str.replace(regex, '');
};

export const fetcher = (url: string, method = 'GET', body?: object) =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());

export type TData = {
  [key: string]: string;
};
export const setTemplateData = (template: string, data: TData) => {
  if (!template) {
    return '';
  }
  let templateData = template;
  Object.entries(data).forEach(([key, value]) => {
    templateData = templateData.replaceAll(`{${key}}`, value);
  });

  return templateData;
};

function isNumeric(str: string): boolean {
  const regex = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
  return regex.test(str.trim());
}

export const isNumber = (value: unknown) => {
  return (
    (typeof value === 'number' && isFinite(value)) ||
    (typeof value === 'string' && isNumeric(value))
  );
};

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.toLowerCase());
}

export const getImageURL = (url: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('http')) {
    return url;
  }
  return `${MEDIA_LIBRARY_URL}${url}`;
};

export function extractRemotePattern(url: string): {
  protocol: string;
  hostname: string;
  port?: string;
  pathname?: string;
}[] {
  try {
    const parsedUrl = new URL(url);

    const pattern: { protocol: string; hostname: string; port?: string, pathname?: string } = {
      protocol: parsedUrl.protocol.replace(':', ''),
      hostname: parsedUrl.hostname,
    };

    return [pattern];
  } catch (err) {
    console.error('Invalid URL:', url, err);
    return [{ protocol: 'http', hostname: 'localhost' }];
  }
}
