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
