import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
export const redis = new Redis(redisUrl ?? '', {
  tls: redisUrl?.startsWith('redis://') ? {} : undefined,
});
