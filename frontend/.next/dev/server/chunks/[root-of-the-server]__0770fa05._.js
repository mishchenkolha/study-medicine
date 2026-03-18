module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/utils/cache/redis.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redis",
    ()=>redis,
    "redisConnected",
    ()=>redisConnected,
    "tryConnectRedis",
    ()=>tryConnectRedis
]);
const redisUrl = process.env.REDIS_URL;
let redis = null;
let redisConnected = null; // null = ще не перевіряли
async function tryConnectRedis() {
    if (!redisUrl || redisConnected !== null) return; // вже спробували
    const { default: Redis } = await __turbopack_context__.A("[project]/node_modules/ioredis/built/index.js [app-route] (ecmascript, async loader)");
    redis = new Redis(redisUrl, {
        lazyConnect: true,
        retryStrategy: ()=>null
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
        redis.on('error', (err)=>{
            console.warn('[Redis] Error after initial connect', err.message);
            redisConnected = false;
        });
        redis.on('end', ()=>{
            console.warn('[Redis] Connection closed');
            redisConnected = false;
        });
    }
}
;
}),
"[project]/utils/cache/cache.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SIX_MONTHS_SECONDS",
    ()=>SIX_MONTHS_SECONDS,
    "clearAllCache",
    ()=>clearAllCache,
    "deleteKeys",
    ()=>deleteKeys,
    "findTagsForKey",
    ()=>findTagsForKey,
    "getCached",
    ()=>getCached,
    "invalidateTags",
    ()=>invalidateTags,
    "setCachedWithTags",
    ()=>setCachedWithTags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cache/redis.ts [app-route] (ecmascript)");
;
if (process.env.USE_REDIS === 'true') {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tryConnectRedis"])();
}
const SIX_MONTHS_SECONDS = Number(process.env.CACHE_DEFAULT_TTL ?? '0');
async function getCached(key) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return null;
    }
    const raw = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].get(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return raw;
    }
}
async function setCachedWithTags(key, value, ttlSec, tags) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return;
    }
    const str = JSON.stringify(value);
    // set with TTL
    await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].set(key, str, 'EX', ttlSec);
    // register key under each tag
    if (Array.isArray(tags) && tags.length > 0) {
        const pipeline = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].pipeline();
        for (const t of tags){
            pipeline.sadd(`tag:${t}`, key);
        }
        await pipeline.exec();
    }
}
async function deleteKeys(keys) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return 0;
    }
    if (!keys || keys.length === 0) return 0;
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].del(...keys);
    return res;
}
async function invalidateTags(tags) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return {
            deleted: 0,
            keys: []
        };
    }
    if (!tags || tags.length === 0) return {
        deleted: 0,
        keys: []
    };
    // 1. Отримуємо всі ключі для кожного тегу через pipeline
    const pipeline = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].pipeline();
    for (const t of tags){
        pipeline.smembers(`tag:${t}`);
    }
    const results = await pipeline.exec();
    console.log('Pipeline results:', results);
    // 2. Flatten results і видаляємо null/undefined
    const keys = (results || []).flatMap((res)=>{
        const [, set] = res;
        return Array.isArray(set) ? set : [];
    }).filter(Boolean);
    console.log('InvalidateTags called with tags:', tags, 'and keys:', keys);
    // 3. Видаляємо самі ключі кешу
    const deletedKeysCount = keys.length ? await deleteKeys(keys) : 0;
    // 4. Видаляємо множини тегів
    const tagKeys = tags.map((t)=>`tag:${t}`);
    if (tagKeys.length) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].del(...tagKeys);
    }
    return {
        deleted: deletedKeysCount,
        keys
    };
}
async function findTagsForKey(key) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return [];
    }
    // 1. отримати всі теги (якщо у тебе список тегів відомий, наприклад ['posts', 'posts:10', ...])
    const allTags = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].keys('tag:*'); // масив усіх tag:* множин
    const result = [];
    for (const t of allTags){
        const members = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].smembers(t);
        if (members.includes(key)) {
            result.push(t.replace(/^tag:/, '')); // обрізаємо префікс
        }
    }
    return result;
}
const clearAllCache = async ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"].flushdb();
};
}),
"[project]/utils/routes.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLLECTION_TYPES_ONE",
    ()=>COLLECTION_TYPES_ONE,
    "ROUTES",
    ()=>ROUTES,
    "SINGLE_PAGES",
    ()=>SINGLE_PAGES,
    "SINGLE_TYPES",
    ()=>SINGLE_TYPES
]);
const SINGLE_PAGES = {
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'forgot-password',
    PROFILE: 'profile'
};
const SINGLE_TYPES = {
    ABOUT: 'about',
    ALL_COURSES: 'all-courses',
    CONSULTING_AND_NETWORKING: 'consulting-and-networking',
    CONTACT: 'contact',
    DICTIONARY: 'dictionary',
    HOME: 'homepage',
    TESTIMONIAL: 'testimonial'
};
const COLLECTION_TYPES_ONE = {
    courses: 'course',
    questions: 'question',
    results: 'result',
    certificates: 'certificate',
    navbars: 'navbar',
    categories: 'category',
    pages: 'page',
    quizzes: 'quiz',
    users: 'user',
    'user-courses': 'user-course'
};
const ROUTES = {
    // single pages
    LOGIN: `/${SINGLE_PAGES.LOGIN}`,
    REGISTER: `/${SINGLE_PAGES.REGISTER}`,
    FORGOT_PASSWORD: `/${SINGLE_PAGES.FORGOT_PASSWORD}`,
    PROFILE: `/${SINGLE_PAGES.PROFILE}`,
    // single types
    ABOUT: `${SINGLE_TYPES.ABOUT}`,
    CONSULTING_AND_NETWORKING: `${SINGLE_TYPES.CONSULTING_AND_NETWORKING}`,
    TESTIMONIALS: `${SINGLE_TYPES.TESTIMONIAL}`,
    CONTACTS: `${SINGLE_TYPES.CONTACT}`,
    ALL_COURSES: `${SINGLE_TYPES.ALL_COURSES}`,
    HOME: `${SINGLE_TYPES.HOME}`,
    DICTIONARY: `${SINGLE_TYPES.DICTIONARY}`,
    // collection types
    COURSES: '/courses',
    QUESTIONS: '/questions',
    USER_COURSES: '/user-courses',
    RESULTS: '/results',
    CERTIFICATES: '/certificates'
};
}),
"[project]/app/api/invalidate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cache/cache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-route] (ecmascript)");
;
;
;
;
const SECRET = process.env.CACHE_INVALIDATION_SECRET;
const REVALIDATE_PROFILE = 'max'; //{ expire: 0 };
async function POST(req) {
    // Перевірка авторизації
    const auth = req.headers.get('authorization') || '';
    if (!SECRET || auth !== `Bearer ${SECRET}`) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'unauthorized'
        }, {
            status: 401
        });
    }
    // Зчитування тіла
    const body = await req.json().catch(()=>null);
    if (!body || !body.model) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'invalid body'
        }, {
            status: 400
        });
    }
    const model = body.model.toLowerCase();
    if (!model) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'missing tags or contentType'
        }, {
            status: 400
        });
    }
    const redisTags = [
        `${model}:${body.entry.documentId}`
    ];
    const nextTags = [
        model
    ];
    // Інвалідовуємо кеш у Redis
    const deleted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["invalidateTags"])(redisTags);
    // --- Інвалідуємо Next.js tag cache ---
    try {
        await Promise.all(nextTags.map((tag)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidateTag"])(tag, REVALIDATE_PROFILE)));
    } catch (err) {
        console.error('Next.js revalidateTag error', err);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        deletedCount: deleted.deleted,
        deletedKeys: deleted.keys
    });
}
async function GET(req) {
    const auth = req.headers.get('authorization') || '';
    if (!SECRET || auth !== `Bearer ${SECRET}`) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'unauthorized'
        }, {
            status: 401
        });
    }
    try {
        const deletedCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearAllCache"])();
        const allTags = [
            ...Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COLLECTION_TYPES_ONE"]),
            ...Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SINGLE_TYPES"])
        ];
        try {
            await Promise.all(allTags.map((tag)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidateTag"])(tag, REVALIDATE_PROFILE)));
        } catch (err) {
            console.error('Next.js revalidateTag error', err);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            deletedKeysCount: deletedCount
        });
    } catch (err) {
        console.error('Error clearing Redis cache', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'failed to clear cache'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0770fa05._.js.map