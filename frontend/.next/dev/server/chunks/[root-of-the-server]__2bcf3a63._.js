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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/auth/logout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
async function POST() {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: true
    });
    response.cookies.set({
        name: 'token',
        value: '',
        httpOnly: true,
        secure: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IS_PROD"],
        path: '/',
        maxAge: 0,
        sameSite: 'lax'
    });
    response.cookies.set({
        name: 'user',
        value: '',
        httpOnly: true,
        secure: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["IS_PROD"],
        path: '/',
        maxAge: 0,
        sameSite: 'lax'
    });
    return response;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2bcf3a63._.js.map