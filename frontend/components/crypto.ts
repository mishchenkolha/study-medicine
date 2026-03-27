import { SECRET_KEY } from '@/utils/constants';
import { createHmac } from 'crypto';

// Генерація підпису для форми
export function generateFormSignature(timestamp = Date.now()) {
  const data = String(timestamp);
  const hmac = createHmac('sha256', SECRET_KEY).update(data).digest('hex');
  return { signature: hmac, timestamp };
}

// Перевірка підпису та таймстампу
export function verifyFormSignature(signature: string, timestamp: number) {
  const now = Date.now();

  if (now - timestamp < 5000) return false;

  const data = String(timestamp);
  const expected = createHmac('sha256', SECRET_KEY).update(data).digest('hex');

  return expected === signature;
}
