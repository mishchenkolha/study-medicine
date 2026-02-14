// import type Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL;
let redis: /*Redis | */null = null;
let redisConnected: boolean | null = false; // null = ще не перевіряли

async function tryConnectRedis() {
  if (!redisUrl || redisConnected !== null) return; // вже спробували
/*
  const { default: Redis } = await import('ioredis');
  redis = new Redis(redisUrl, {
    lazyConnect: true,       // не підключаємось автоматично
    retryStrategy: () => null, // не робимо повторних спроб
  });

  try {
    await redis.connect();
    console.log('[Redis] Connected');
    redisConnected = true;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.warn('[Redis] Connection failed, fallback to memory cache', errorMessage);
    redisConnected = false;
    redis.disconnect();
    redis = null;
  }

  if (redis) {
    redis.on('error', (err) => {
      console.warn('[Redis] Error after initial connect', err.message);
      redisConnected = false;
    });
    redis.on('end', () => {
      console.warn('[Redis] Connection closed');
      redisConnected = false;
    });
  }
*/
}

export { redis, redisConnected, tryConnectRedis };
