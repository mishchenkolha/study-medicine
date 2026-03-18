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
"[project]/utils/constants.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_QUESTIONS",
    ()=>DEFAULT_QUESTIONS,
    "DOMAIN_URL",
    ()=>DOMAIN_URL,
    "IS_PROD",
    ()=>IS_PROD,
    "MEDIA_LIBRARY_URL",
    ()=>MEDIA_LIBRARY_URL,
    "NO_CACHE",
    ()=>NO_CACHE,
    "SESSION_TIME",
    ()=>SESSION_TIME,
    "SITE_DESCRIPTION",
    ()=>SITE_DESCRIPTION,
    "SITE_KEYWORDS",
    ()=>SITE_KEYWORDS,
    "SITE_NAME",
    ()=>SITE_NAME,
    "STRAPI_LIMIT",
    ()=>STRAPI_LIMIT,
    "STRAPI_URL",
    ()=>STRAPI_URL
]);
const SITE_NAME = 'Study medicine';
const SITE_DESCRIPTION = 'Study medicine description';
const SITE_KEYWORDS = [
    'study',
    'medicine',
    'education',
    'Toronto'
];
const DOMAIN_URL = ("TURBOPACK compile-time value", "http://localhost:3000") ?? 'http://localhost:3000';
const STRAPI_URL = ("TURBOPACK compile-time value", "https://worthy-agreement-b851614a2f.strapiapp.com") ?? 'https://worthy-agreement-b851614a2f.strapiapp.com';
const MEDIA_LIBRARY_URL = ("TURBOPACK compile-time value", "https://worthy-agreement-b851614a2f.media.strapiapp.com") ?? 'https://worthy-agreement-b851614a2f.media.strapiapp.com';
const STRAPI_LIMIT = 10000;
const DEFAULT_QUESTIONS = 20;
const SESSION_TIME = Number(("TURBOPACK compile-time value", "3600") || 60 * 60); // 1h
const NO_CACHE = {
    cache: 'no-cache'
};
const IS_PROD = ("TURBOPACK compile-time value", "development") === 'production';
}),
"[project]/utils/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "extractRemotePattern",
    ()=>extractRemotePattern,
    "fetcher",
    ()=>fetcher,
    "getImageURL",
    ()=>getImageURL,
    "isNumber",
    ()=>isNumber,
    "isValidEmail",
    ()=>isValidEmail,
    "setTemplateData",
    ()=>setTemplateData,
    "trimChar",
    ()=>trimChar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-route] (ecmascript)");
;
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
const trimChar = function(str, char) {
    if (!char) {
        return str.trim(); // стандартна поведінка — пробіли
    }
    const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // екранування спецсимволів
    const regex = new RegExp(`^${escapedChar}+|${escapedChar}+$`, 'g');
    return str.replace(regex, '');
};
const fetcher = (url, method = 'GET', body)=>fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res)=>res.json());
const setTemplateData = (template, data)=>{
    if (!template) {
        return '';
    }
    let templateData = template;
    Object.entries(data).forEach(([key, value])=>{
        templateData = templateData.replaceAll(`{${key}}`, value);
    });
    return templateData;
};
function isNumeric(str) {
    const regex = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
    return regex.test(str.trim());
}
const isNumber = (value)=>{
    return typeof value === 'number' && isFinite(value) || typeof value === 'string' && isNumeric(value);
};
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email.toLowerCase());
}
const getImageURL = (url)=>{
    if (!url) {
        return '';
    }
    if (url.startsWith('http')) {
        return url;
    }
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MEDIA_LIBRARY_URL"]}${url}`;
};
function extractRemotePattern(url) {
    try {
        const parsedUrl = new URL(url);
        const pattern = {
            protocol: parsedUrl.protocol.replace(':', ''),
            hostname: parsedUrl.hostname
        };
        return [
            pattern
        ];
    } catch (err) {
        console.error('Invalid URL:', url, err);
        return [
            {
                protocol: 'http',
                hostname: 'localhost'
            }
        ];
    }
}
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
// import type Redis from 'ioredis';
const redisUrl = process.env.REDIS_URL;
let redis = null;
let redisConnected = false; // null = ще не перевіряли
async function tryConnectRedis() {
    if ("TURBOPACK compile-time truthy", 1) return; // вже спробували
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
*/ }
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
// const raw = await redis.get(key);
// if (!raw) return null;
// try {
//   return JSON.parse(raw);
// } catch {
//   return raw;
// }
}
async function setCachedWithTags(key, value, ttlSec, tags) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return;
    }
// const str = JSON.stringify(value);
// // set with TTL
// await redis.set(key, str, 'EX', ttlSec);
// // register key under each tag
// if (Array.isArray(tags) && tags.length > 0) {
//   const pipeline = redis.pipeline();
//   for (const t of tags) {
//     pipeline.sadd(`tag:${t}`, key);
//   }
//   await pipeline.exec();
// }
}
async function deleteKeys(keys) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return 0;
    }
// if (!keys || keys.length === 0) return 0;
// const res = await redis.del(...keys);
// return res;
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
// // 1. Отримуємо всі ключі для кожного тегу через pipeline
// const pipeline = redis.pipeline();
// for (const t of tags) {
//   pipeline.smembers(`tag:${t}`);
// }
// const results = await pipeline.exec();
// console.log('Pipeline results:', results);
// // 2. Flatten results і видаляємо null/undefined
// const keys: string[] = (results || [])
//   .flatMap((res) => {
//     const [, set] = res;
//     return Array.isArray(set) ? set : [];
//   })
//   .filter(Boolean);
// console.log('InvalidateTags called with tags:', tags, 'and keys:', keys);
// // 3. Видаляємо самі ключі кешу
// const deletedKeysCount = keys.length ? await deleteKeys(keys) : 0;
// // 4. Видаляємо множини тегів
// const tagKeys = tags.map((t) => `tag:${t}`);
// if (tagKeys.length) {
//   await redis.del(...tagKeys);
// }
// return {
//   deleted: deletedKeysCount,
//   keys,
// };
}
async function findTagsForKey(key) {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return [];
    }
// 1. отримати всі теги (якщо у тебе список тегів відомий, наприклад ['posts', 'posts:10', ...])
// const allTags = await redis.keys('tag:*'); // масив усіх tag:* множин
// const result: string[] = [];
// for (const t of allTags) {
//   const members = await redis.smembers(t);
//   if (members.includes(key)) {
//     result.push(t.replace(/^tag:/, '')); // обрізаємо префікс
//   }
// }
// return result;
}
const clearAllCache = async ()=>{
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] || !__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"]) {
        return;
    }
// return redis.flushdb();
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
"[project]/utils/strapi_client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "strapiService",
    ()=>strapiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cache/cache.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/cache/redis.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-route] (ecmascript)");
;
;
;
;
;
const STRAPI_API_URL = `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STRAPI_URL"]}/api`;
function normalizeHeaders(headers) {
    const normalized = {};
    if (headers instanceof Headers) {
        headers.forEach((value, key)=>{
            normalized[key] = value;
        });
    } else if (Array.isArray(headers)) {
        headers.forEach(([key, value])=>{
            normalized[key] = value;
        });
    } else if (typeof headers === 'object' && headers !== null) {
        Object.entries(headers).forEach(([key, value])=>{
            normalized[key] = value;
        });
    }
    return normalized;
}
async function fetchFromStrapi(path, { method = 'GET', body, token, headers = {}, cache = 'force-cache', revalidate = Number(("TURBOPACK compile-time value", "3600") ?? 0), ttl, tags = [] } = {}) {
    const url = `${STRAPI_API_URL}${path.startsWith('/') ? path : `/${path}`}`;
    const finalHeaders = {
        'Content-Type': 'application/json',
        ...normalizeHeaders(headers)
    };
    if (token) {
        finalHeaders['Authorization'] = `Bearer ${token}`;
    }
    const purePath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trimChar"])(path, '/').toLowerCase().split('?')[0];
    tags = tags?.length ? tags : [
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["COLLECTION_TYPES_ONE"][purePath] || purePath
    ];
    const isGet = method === 'GET';
    if (isGet && __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIX_MONTHS_SECONDS"] > 0) {
        const key = `cf:${url}`;
        // let cached: TResponse | null = null;
        const isRedisConnected = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redisConnected"] && __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$redis$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["redis"];
        // --- Спроба отримати кеш через прослойку ---
        // try {
        //   cached = await getCached(key);
        // } catch (err) {
        //   console.warn('[Cache] Redis або основний кеш недоступний, fallback на Next.js tag cache', err);
        // }
        // if (isRedisConnected && cached) {
        //   console.log('Cache hit from Redis for key:', key);
        //   return cached as TResponse;
        // }
        // --- робимо fetch з Strapi ---
        const res = await fetch(url, {
            method,
            headers: finalHeaders,
            cache: !isRedisConnected ? cache : 'no-store',
            next: !isRedisConnected ? {
                tags
            } : undefined
        });
        const data = await res.json();
        if (!res.ok) {
            console.error({
                url,
                error: data?.error
            });
            throw new Error(data?.error?.message || 'Strapi API Error');
        }
        // --- enrichment тегів для Redis / прослойки ---
        if (Array.isArray(data?.data)) {
            for (const item of data.data){
                if (item?.documentId) {
                    tags.push(`${tags[0]}:${item.documentId}`);
                }
            }
        } else if (data?.data?.documentId) {
            tags.push(`${tags[0]}:${data.data.documentId}`);
        }
        const effectiveTTL = ttl ?? __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SIX_MONTHS_SECONDS"];
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$cache$2f$cache$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setCachedWithTags"])(key, data, effectiveTTL, tags);
        } catch (err) {
            console.warn('[Cache] Не вдалося записати кеш, продовжуємо без нього', err);
        }
        return data;
    }
    // --- для POST/PUT/DELETE або GET без TTL ---
    const res = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
        cache,
        next: cache === 'no-cache' ? undefined : {
            revalidate
        }
    });
    const data = await res.json();
    if (!res.ok) {
        console.error({
            url,
            error: data?.error
        });
        throw new Error(data?.error?.message || 'Strapi API Error');
    }
    return data;
}
const strapiService = {
    get: (path, options)=>fetchFromStrapi(path, {
            ...options,
            method: 'GET'
        }),
    post: (path, body, options)=>fetchFromStrapi(path, {
            ...options,
            cache: 'no-cache',
            method: 'POST',
            body
        }),
    put: (path, body, options)=>fetchFromStrapi(path, {
            ...options,
            cache: 'no-cache',
            method: 'PUT',
            body
        }),
    delete: (path, options)=>fetchFromStrapi(path, {
            ...options,
            cache: 'no-cache',
            method: 'DELETE'
        })
};
}),
"[project]/utils/strapi_auth_client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "strapiAuthService",
    ()=>strapiAuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-route] (ecmascript)");
;
;
const REVALIDATION_TIME = 10; // 10s
const ERROR_TEXT = 'Error fetching from Strapi with Auth user:';
function strapiAuthService(customToken) {
    return {
        get: async (path, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].get(path, {
                    token,
                    ...options && options.cache !== 'no-cache' && {
                        revalidate: REVALIDATION_TIME
                    },
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        post: async (path, body, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].post(path, body, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        put: async (path, body, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].put(path, body, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        delete: async (path, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].delete(path, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        me: async ()=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].get('/users/me', {
                    token
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        }
    };
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/services/auth.service.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0083fb43c2df2c288c67cf3c2d959a93df9d4b3a90":"getUserToken","00b4f860153782da488742763b4be5f4a212432fdc":"getUser","406de0b46859bd60636be6de906e8981e40fe26059":"changePassword","40b900988bc685914d1e3f49ed8b193b67d9a88e57":"login","40d7a4ea44ad035e8f8a8d3c4449c1a81d9859cf06":"resetPassword","40d8713a3eff2d1f332ca1747ff623a53245370841":"forgotPassword","40ee4458ea908c771edfe206e1a18f8b2b0f1eab01":"register"},"",""] */ __turbopack_context__.s([
    "changePassword",
    ()=>changePassword,
    "forgotPassword",
    ()=>forgotPassword,
    "getUser",
    ()=>getUser,
    "getUserToken",
    ()=>getUserToken,
    "login",
    ()=>login,
    "register",
    ()=>register,
    "resetPassword",
    ()=>resetPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_auth_client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_client.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-route] (ecmascript)");
;
;
;
;
const register = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/local/register', data);
const login = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/local', data);
const forgotPassword = async (email)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/forgot-password', {
        email
    });
const changePassword = async (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiAuthService"])().post('/auth/change-password', data);
const resetPassword = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/reset-password', data);
const getUserToken = async ()=>{
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get('token')?.value;
    if (!token) return null;
    return token;
};
const getUser = async ()=>{
    const user = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])()).get('user')?.value;
    if (!user) return null;
    return JSON.parse(user);
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    register,
    login,
    forgotPassword,
    changePassword,
    resetPassword,
    getUserToken,
    getUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(register, "40ee4458ea908c771edfe206e1a18f8b2b0f1eab01", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40b900988bc685914d1e3f49ed8b193b67d9a88e57", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(forgotPassword, "40d8713a3eff2d1f332ca1747ff623a53245370841", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(changePassword, "406de0b46859bd60636be6de906e8981e40fe26059", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPassword, "40d7a4ea44ad035e8f8a8d3c4449c1a81d9859cf06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserToken, "0083fb43c2df2c288c67cf3c2d959a93df9d4b3a90", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerServerReference"])(getUser, "00b4f860153782da488742763b4be5f4a212432fdc", null);
}),
"[project]/app/api/check-session/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function GET() {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUser"])();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        user
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da87e1c6._.js.map