import { redis, redisConnected, tryConnectRedis } from './redis';

if(process.env.USE_REDIS === 'true') {
  tryConnectRedis();
}

export const SIX_MONTHS_SECONDS = Number(process.env.CACHE_DEFAULT_TTL ?? '0');

export async function getCached(key: string) {
  if (!redisConnected || !redis) {
    return null;
  }
  const raw = await redis.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export async function setCachedWithTags(
  key: string,
  value: unknown,
  ttlSec: number,
  tags: string[],
) {
  if (!redisConnected || !redis) {
    return;
  }
  const str = JSON.stringify(value);
  // set with TTL
  await redis.set(key, str, 'EX', ttlSec);

  // register key under each tag
  if (Array.isArray(tags) && tags.length > 0) {
    const pipeline = redis.pipeline();
    for (const t of tags) {
      pipeline.sadd(`tag:${t}`, key);
    }
    await pipeline.exec();
  }
}

export async function deleteKeys(keys: string[]) {
  if (!redisConnected || !redis) {
    return 0;
  }
  if (!keys || keys.length === 0) return 0;
  const res = await redis.del(...keys);
  return res;
}

export async function invalidateTags(tags: string[]) {
  if (!redisConnected || !redis) {
    return { deleted: 0, keys: [] };
  }
  if (!tags || tags.length === 0) return { deleted: 0, keys: [] };

  // 1. Отримуємо всі ключі для кожного тегу через pipeline
  const pipeline = redis.pipeline();
  for (const t of tags) {
    pipeline.smembers(`tag:${t}`);
  }
  const results = await pipeline.exec();
  console.log('Pipeline results:', results);
  // 2. Flatten results і видаляємо null/undefined
  const keys: string[] = (results || [])
    .flatMap((res) => {
      const [, set] = res;
      return Array.isArray(set) ? set : [];
    })
    .filter(Boolean);

  console.log('InvalidateTags called with tags:', tags, 'and keys:', keys);
  // 3. Видаляємо самі ключі кешу
  const deletedKeysCount = keys.length ? await deleteKeys(keys) : 0;

  // 4. Видаляємо множини тегів
  const tagKeys = tags.map((t) => `tag:${t}`);
  if (tagKeys.length) {
    await redis.del(...tagKeys);
  }

  return {
    deleted: deletedKeysCount,
    keys,
  };
}

export async function findTagsForKey(key: string) {
  if (!redisConnected || !redis) {
    return [];
  }
  // 1. отримати всі теги (якщо у тебе список тегів відомий, наприклад ['posts', 'posts:10', ...])
  const allTags = await redis.keys('tag:*'); // масив усіх tag:* множин
  const result: string[] = [];

  for (const t of allTags) {
    const members = await redis.smembers(t);
    if (members.includes(key)) {
      result.push(t.replace(/^tag:/, '')); // обрізаємо префікс
    }
  }

  return result;
}

export const clearAllCache = async () => {
  if (!redisConnected || !redis) {
    return;
  }
  return redis.flushdb();
};
