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
