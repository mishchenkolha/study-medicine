import { NextResponse } from 'next/server';
import { invalidateTags, clearAllCache } from '@/utils/cache/cache';
import { revalidateTag } from 'next/cache';
import { COLLECTION_TYPES_ONE, SINGLE_TYPES } from '@/utils/routes';

const SECRET = process.env.CACHE_INVALIDATION_SECRET;
const REVALIDATE_PROFILE = 'max'; //{ expire: 0 };

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

  if (!model) {
    return NextResponse.json(
      { error: 'missing tags or contentType' },
      { status: 400 },
    );
  }

  const redisTags: string[] = [`${model}:${body.entry.documentId}`];
  const nextTags: string[] = [model];

  // Інвалідовуємо кеш у Redis
  const deleted = await invalidateTags(redisTags);

    // --- Інвалідуємо Next.js tag cache ---
  try {
    await Promise.all(nextTags.map((tag) => revalidateTag(tag, REVALIDATE_PROFILE)));
  } catch (err) {
    console.error('Next.js revalidateTag error', err);
  }

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
    const allTags = [...Object.values(COLLECTION_TYPES_ONE), ...Object.values(SINGLE_TYPES)];
      try {
    await Promise.all(allTags.map((tag) => revalidateTag(tag, REVALIDATE_PROFILE)));
  } catch (err) {
    console.error('Next.js revalidateTag error', err);
  }

    return NextResponse.json({ ok: true, deletedKeysCount: deletedCount });
  } catch (err) {
    console.error('Error clearing Redis cache', err);
    return NextResponse.json(
      { error: 'failed to clear cache' },
      { status: 500 },
    );
  }
}
