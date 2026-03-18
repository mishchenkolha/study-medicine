(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__953f6f0c._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/utils/constants.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [middleware-edge] (ecmascript)");
;
;
async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('pathname', pathname);
    requestHeaders.set('x-url', request.url);
    const token = request.cookies.get('token')?.value;
    const user = request.cookies.get('user')?.value;
    // Якщо куки є — оновлюємо їх
    if (token && user) {
        const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            secure: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IS_PROD"],
            path: '/',
            maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SESSION_TIME"],
            sameSite: 'lax'
        });
        response.cookies.set({
            name: 'user',
            value: user,
            httpOnly: true,
            secure: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["IS_PROD"],
            path: '/',
            maxAge: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["SESSION_TIME"],
            sameSite: 'lax'
        });
        return response;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next({
        request: {
            headers: requestHeaders
        }
    });
}
const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|images/|api/|favicon.ico|static/).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__953f6f0c._.js.map