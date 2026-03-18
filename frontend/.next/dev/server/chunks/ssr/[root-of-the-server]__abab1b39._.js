module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/ui/link/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
;
;
;
//import CoreLink from 'next/link';
const LazyLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/ui/link/link.tsx [app-ssr] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/ui/link/link.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    }
});
const Link = ({ children, ...props })=>{
    //  return <CoreLink {...props}>{children}</CoreLink>;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyLink, {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/ui/link/index.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Link;
}),
"[project]/utils/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-ssr] (ecmascript)");
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
    return `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MEDIA_LIBRARY_URL"]}${url}`;
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
"[project]/hooks/useUser.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLogout",
    ()=>useLogout,
    "useUser",
    ()=>useUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/index/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/swr/dist/mutation/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
const useUser = ()=>{
    const GET_USER_URL = '/api/check-session';
    const { data: user, error, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])(GET_USER_URL, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"]);
    if (error) {
        console.error('Error fetching user:', error);
    }
    return {
        isLoading,
        user
    };
};
const useLogout = ()=>{
    const GET_LOGOUT_URL = '/api/auth/logout';
    const { trigger: logout, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swr$2f$dist$2f$mutation$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(GET_LOGOUT_URL, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetcher"])(GET_LOGOUT_URL, 'POST'));
    if (error) {
        console.error('Error logging out:', error);
    }
    return {
        logout
    };
};
}),
"[project]/ui/button/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "VARIANTS",
    ()=>VARIANTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/link/index.tsx [app-ssr] (ecmascript)");
;
;
;
var VARIANTS = /*#__PURE__*/ function(VARIANTS) {
    VARIANTS["PRIMARY"] = "primary";
    VARIANTS["SECONDARY"] = "secondary";
    VARIANTS["DANGER"] = "danger";
    VARIANTS["SUCCESS"] = "success";
    return VARIANTS;
}({});
const Button = ({ children, variant = "primary", className, target, href, ...rest })=>{
    const base = 'px-4 py-2 rounded font-semibold cursor-pointer';
    let styles = '';
    switch(variant){
        case "primary":
            styles = 'btn';
            break;
        case "danger":
            styles = 'btn-danger';
            break;
        case "success":
            styles = 'btn-success';
            break;
        default:
            styles = 'btn-secondary';
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex justify-center', base, styles, className),
            target: target ?? (href.startsWith('http') ? '_blank' : undefined),
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/ui/button/index.tsx",
            lineNumber: 46,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            className: `${base} ${styles} ${className}`,
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/ui/button/index.tsx",
            lineNumber: 55,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
};
}),
"[project]/utils/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/components/auth-buttons/index.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthButtons
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useUser.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/button/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function AuthButtons({ dictionary }) {
    const { user: userData, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const user = userData?.user || {};
    const { logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useUser$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLogout"])();
    const onLogout = ()=>{
        logout();
        setTimeout(()=>window.open('/', '_self'), 500);
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-40 h-10"
        }, void 0, false, {
            fileName: "[project]/components/auth-buttons/index.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: !user?.username ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    className: "!hidden xl:!inline-flex",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN,
                    children: dictionary.login
                }, void 0, false, {
                    fileName: "[project]/components/auth-buttons/index.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    className: "!hidden xl:!inline-flex",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].REGISTER,
                    variant: __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].SECONDARY,
                    children: dictionary.register
                }, void 0, false, {
                    fileName: "[project]/components/auth-buttons/index.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth-buttons/index.tsx",
            lineNumber: 22,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    className: "!hidden xl:!inline-flex",
                    onClick: onLogout,
                    children: dictionary.logout
                }, void 0, false, {
                    fileName: "[project]/components/auth-buttons/index.tsx",
                    lineNumber: 36,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    className: "!hidden xl:!inline-flex",
                    href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].PROFILE,
                    variant: __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VARIANTS"].SECONDARY,
                    children: [
                        dictionary.greeting,
                        " ",
                        user?.username
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/auth-buttons/index.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/auth-buttons/index.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, this)
    }, void 0, false);
}
}),
"[project]/components/navbar/mobile.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MobileMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/link/index.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$buttons$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/auth-buttons/index.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function MobileMenu({ menu, dictionary }) {
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return ()=>{
            document.body.style.overflow = '';
        };
    }, [
        isOpen
    ]);
    const onClose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(false), []);
    const onOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>setIsOpen(true), []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "xl:hidden flex flex-col justify-between w-6 h-5 focus:outline-none",
                onClick: onOpen,
                "aria-label": "Open menu",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-0.5 bg-gray-800 rounded"
                    }, void 0, false, {
                        fileName: "[project]/components/navbar/mobile.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-0.5 bg-gray-800 rounded"
                    }, void 0, false, {
                        fileName: "[project]/components/navbar/mobile.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block h-0.5 bg-gray-800 rounded"
                    }, void 0, false, {
                        fileName: "[project]/components/navbar/mobile.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/navbar/mobile.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/50 z-40",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/navbar/mobile.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed top-0 right-0 w-full h-14 bg-white z-50 shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute top-4 right-4 w-6 h-6 focus:outline-none",
                        "aria-label": "Close menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute w-6 h-0.5 bg-gray-800 rotate-45 top-1/2 left-0 translate-y-[-50%]"
                            }, void 0, false, {
                                fileName: "[project]/components/navbar/mobile.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute w-6 h-0.5 bg-gray-800 -rotate-45 top-1/2 left-0 translate-y-[-50%]"
                            }, void 0, false, {
                                fileName: "[project]/components/navbar/mobile.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/navbar/mobile.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "max-h-[calc(100vh-46px)] overflow-y-auto bg-white rounded-br-md rounded-bl-md p-2 shadow mt-12 flex flex-col space-y-4 text-gray-700 font-medium",
                        children: [
                            menu.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: item.href,
                                            onClick: onClose,
                                            title: item.alt,
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar/mobile.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        item.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-4 flex flex-col space-y-2 text-sm",
                                            children: item.children.map((subItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: subItem.href,
                                                            onClick: onClose,
                                                            title: subItem.alt,
                                                            children: subItem.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar/mobile.tsx",
                                                            lineNumber: 78,
                                                            columnNumber: 23
                                                        }, this),
                                                        subItem.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "ml-4 flex flex-col space-y-1 text-sm",
                                                            children: subItem.children.map((thirdItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: thirdItem.href,
                                                                    onClick: onClose,
                                                                    title: thirdItem.alt,
                                                                    children: thirdItem.title
                                                                }, thirdItem.title, false, {
                                                                    fileName: "[project]/components/navbar/mobile.tsx",
                                                                    lineNumber: 88,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/navbar/mobile.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, subItem.title, true, {
                                                    fileName: "[project]/components/navbar/mobile.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/navbar/mobile.tsx",
                                            lineNumber: 72,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.title, true, {
                                    fileName: "[project]/components/navbar/mobile.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$auth$2d$buttons$2f$index$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                dictionary: dictionary
                            }, void 0, false, {
                                fileName: "[project]/components/navbar/mobile.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/navbar/mobile.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/navbar/mobile.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__abab1b39._.js.map