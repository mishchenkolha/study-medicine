import { NextResponse } from 'next/server';
import { invalidateTags, clearAllCache } from '@/utils/cache/cache';

const SECRET = process.env.CACHE_INVALIDATION_SECRET;

export async function POST(req: Request) {
  // Перевірка авторизації
  const auth = req.headers.get('authorization') || '';
  if (!SECRET || auth !== `Bearer ${SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  // Зчитування тіла
  const body = await req.json().catch(() => null);

  if (!body || !body.model) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const model = body.model.toLowerCase();
  const tags: string[] = [`${model}:${body.entry.documentId}`];

  if (tags.length === 0) {
    return NextResponse.json(
      { error: 'missing tags or contentType' },
      { status: 400 },
    );
  }

  // Інвалідовуємо кеш у Redis
  const deleted = await invalidateTags(tags);

  return NextResponse.json({
    ok: true,
    deletedCount: deleted.deleted,
    deletedKeys: deleted.keys,
  });
}

export async function GET(req: Request) {
  const auth = req.headers.get('authorization') || '';
  if (!SECRET || auth !== `Bearer ${SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const deletedCount = await clearAllCache();
    return NextResponse.json({ ok: true, deletedKeysCount: deletedCount });
  } catch (err) {
    console.error('Error clearing Redis cache', err);
    return NextResponse.json(
      { error: 'failed to clear cache' },
      { status: 500 },
    );
  }
}
