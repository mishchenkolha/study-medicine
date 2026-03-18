module.exports = [
"[project]/services/meta.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMeta",
    ()=>getMeta
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const getMeta = async (page, query = {}, seoData = null)=>{
    const header = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        ...query,
        populate: 'seo.metaImage'
    });
    const responce = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].get(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["trimChar"])(page, '/')}?${queryString}`, {
        token: ("TURBOPACK compile-time value", "42cbcf4f82deddfe59e7e4fcc91f2a700110f1f7dff6689d4b57738c6a5c0c2b6d3d80241c7b6e5f0ddb3045d4c74ed5e10f779ba97e8b326bf47d103e16bb44cb41904f5e5e5c6da8c775b38216f7fda1cae8f75f43245ed8ea8bcb9fdb13d63951ab80c119e0d6d0a30ea166ba84f420a27570dcb5f9a77a4ee7502690342e"),
        revalidate: Number(("TURBOPACK compile-time value", "86400") ?? 0)
    });
    const seo = seoData ?? responce?.data?.seo ?? {};
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DOMAIN_URL"]}${header.get('pathname') || ''}`;
    const fallbackImage = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DOMAIN_URL"] + '/images/logo.svg';
    const image = seo.metaImage?.data?.url ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getImageURL"])(seo.metaImage.data.url) : fallbackImage;
    const title = seo.metaTitle?.trim() || __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_NAME"];
    const description = seo.metaDescription?.trim() || __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_DESCRIPTION"];
    const keywords = seo.keywords?.split(',').map((k)=>k.trim()).filter(Boolean) || __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_KEYWORDS"];
    // OpenGraph fallback
    const ogImageUrl = seo.openGraph?.ogImage?.data?.url || image;
    const ogTitle = seo.openGraph?.ogTitle || title;
    const ogDescription = seo.openGraph?.ogDescription || description;
    const ogUrl = seo.openGraph?.ogUrl || url;
    const ogType = seo.openGraph?.ogType || 'website';
    return {
        title,
        description,
        keywords,
        robots: 'index, follow',
        alternates: {
            canonical: url
        },
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            url: ogUrl,
            siteName: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SITE_NAME"],
            images: [
                {
                    url: ogImageUrl,
                    width: 1200,
                    height: 630,
                    alt: ogTitle
                }
            ],
            type: ogType,
            locale: 'en_US'
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description: ogDescription,
            images: [
                ogImageUrl
            ]
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon_16x16.png',
            apple: '/favicon_16x16.png'
        }
    };
};
}),
"[project]/components/courses/index.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/courses/index.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/courses/index.tsx <module evaluation>", "default");
}),
"[project]/components/courses/index.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/courses/index.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/courses/index.tsx", "default");
}),
"[project]/components/courses/index.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/courses/index.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/courses/index.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/ui/button/index.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "VARIANTS",
    ()=>VARIANTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/link/index.tsx [app-rsc] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: href ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$link$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('inline-flex justify-center', base, styles, className),
            target: target ?? (href.startsWith('http') ? '_blank' : undefined),
            ...rest,
            children: children
        }, void 0, false, {
            fileName: "[project]/ui/button/index.tsx",
            lineNumber: 46,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
"[project]/services/auth.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_auth_client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const register = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/local/register', data);
const login = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/local', data);
const forgotPassword = async (email)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/forgot-password', {
        email
    });
const changePassword = async (data)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().post('/auth/change-password', data);
const resetPassword = async (data)=>__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].post('/auth/reset-password', data);
const getUserToken = async ()=>{
    const token = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('token')?.value;
    if (!token) return null;
    return token;
};
const getUser = async ()=>{
    const user = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])()).get('user')?.value;
    if (!user) return null;
    return JSON.parse(user);
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    register,
    login,
    forgotPassword,
    changePassword,
    resetPassword,
    getUserToken,
    getUser
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(register, "40ee4458ea908c771edfe206e1a18f8b2b0f1eab01", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40b900988bc685914d1e3f49ed8b193b67d9a88e57", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(forgotPassword, "40d8713a3eff2d1f332ca1747ff623a53245370841", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changePassword, "406de0b46859bd60636be6de906e8981e40fe26059", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPassword, "40d7a4ea44ad035e8f8a8d3c4449c1a81d9859cf06", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserToken, "0083fb43c2df2c288c67cf3c2d959a93df9d4b3a90", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUser, "00b4f860153782da488742763b4be5f4a212432fdc", null);
}),
"[project]/utils/strapi_auth_client.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "strapiAuthService",
    ()=>strapiAuthService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
;
;
const REVALIDATION_TIME = 10; // 10s
const ERROR_TEXT = 'Error fetching from Strapi with Auth user:';
function strapiAuthService(customToken) {
    return {
        get: async (path, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].get(path, {
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
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].post(path, body, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        put: async (path, body, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].put(path, body, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        delete: async (path, options)=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].delete(path, {
                    token,
                    ...options
                });
            } catch (error) {
                console.error(ERROR_TEXT, error);
                return null;
            }
        },
        me: async ()=>{
            const token = customToken ?? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"])();
            if (!token) {
                return null;
            }
            try {
                return __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiService"].get('/users/me', {
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
"[project]/services/courses.service.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkCertificateSent",
    ()=>checkCertificateSent,
    "checkPassedQuiz",
    ()=>checkPassedQuiz,
    "getCertificateBySlug",
    ()=>getCertificateBySlug,
    "getCourseBySlug",
    ()=>getCourseBySlug,
    "getQuestions",
    ()=>getQuestions,
    "getUserAttempts",
    ()=>getUserAttempts,
    "getUserCourses",
    ()=>getUserCourses,
    "getUserLatestResult",
    ()=>getUserLatestResult,
    "saveUserResults",
    ()=>saveUserResults,
    "sendCertificate",
    ()=>sendCertificate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qs/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/strapi_auth_client.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/constants.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const getCourseBySlug = async (slug)=>{
    if (!slug) return;
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        populate: [
            'image',
            'bg_image',
            'post.image',
            'quiz'
        ],
        'filters[slug][$eqi]': slug,
        pagination: {
            limit: 1
        }
    });
    const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES}?${queryString}`);
    return responce?.data?.[0];
};
const getUserCourses = async ()=>{
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        pagination: {
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STRAPI_LIMIT"]
        }
    });
    const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].USER_COURSES}/me?${queryString}`);
    return responce ?? [];
};
const getQuestions = async (documentId, count = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DEFAULT_QUESTIONS"])=>{
    if (!documentId) return [];
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        populate: [
            'answers.image',
            'quiz'
        ],
        pagination: {
            limit: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["STRAPI_LIMIT"]
        },
        filters: {
            quiz: {
                documentId: {
                    $eqi: documentId
                }
            }
        },
        randomSort: true
    });
    const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].QUESTIONS}?${queryString}`);
    return (responce?.data ?? []).slice(0, count);
};
const getUserAttempts = async (quizId)=>{
    if (!quizId) return 0;
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        quizDocumentId: quizId
    });
    try {
        const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS}/me?${queryString}`, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NO_CACHE"]);
        return responce?.count ?? 0;
    } catch (e) {
        console.error(e);
        return 0;
    }
};
const saveUserResults = async ({ quizId, courseId, answers, score, isPassed })=>{
    if (!quizId || !courseId || !answers || !Object.keys(answers)?.length) return false;
    const userResults = {
        quizDocumentId: quizId,
        courseDocumentId: courseId,
        answers,
        score,
        isPassed
    };
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().post(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS}/me`, userResults);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
const checkPassedQuiz = async (quizId)=>{
    if (!quizId) return false;
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        quizDocumentId: quizId
    });
    try {
        const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS}/me/is-passed?${queryString}`);
        return Boolean(responce);
    } catch (e) {
        console.error(e);
        return false;
    }
};
const checkCertificateSent = async (quizId)=>{
    if (!quizId) return false;
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        quizDocumentId: quizId
    });
    try {
        const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS}/me/is-certificate-sent?${queryString}`, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NO_CACHE"]);
        return Boolean(responce);
    } catch (e) {
        console.error(e);
        return false;
    }
};
const getUserLatestResult = async ()=>{
    try {
        const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].RESULTS}/me/latest`, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$constants$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["NO_CACHE"]);
        return responce ?? null;
    } catch (e) {
        console.error(e);
        return null;
    }
};
const getCertificateBySlug = async (slug)=>{
    if (!slug) return null;
    const queryString = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qs$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["stringify"])({
        filters: {
            slug: {
                $eqi: slug
            }
        },
        pagination: {
            limit: 1
        }
    });
    try {
        const responce = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().get(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].CERTIFICATES}?${queryString}`);
        return responce?.data?.[0] ?? null;
    } catch (e) {
        console.error(e);
        return null;
    }
};
const sendCertificate = async (courseId, title)=>{
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user?.email || !user.username) return {
        isNew: false,
        slug: null
    };
    try {
        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$strapi_auth_client$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["strapiAuthService"])().post(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].CERTIFICATES}/me`, {
            courseId,
            title
        });
    } catch (e) {
        console.error(e);
        return {
            isNew: false,
            slug: null
        };
    }
};
}),
"[project]/components/courses/buy-course.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/courses/buy-course.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/courses/buy-course.tsx <module evaluation>", "default");
}),
"[project]/components/courses/buy-course.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/components/courses/buy-course.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/courses/buy-course.tsx", "default");
}),
"[project]/components/courses/buy-course.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$buy$2d$course$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/courses/buy-course.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$buy$2d$course$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/courses/buy-course.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$buy$2d$course$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4026326e445861d8da4131b33c2f4e85b337e23b5e":"default","40e15338216cf221ec82e1bba1c6a64b69ca4d7cc2":"generateMetadata"},"",""] */ __turbopack_context__.s([
    "default",
    ()=>CousePage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pages.services.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$meta$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/meta.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$navbar$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/navbar.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$menu$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/menu.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/courses/index.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/types/pages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/html-block/html-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/button/index.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$dictionary$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/dictionary.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/courses.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$buy$2d$course$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/courses/buy-course.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCoursePage"])(slug);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$meta$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMeta"])(__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].ALL_COURSES, {}, post?.seo ?? null);
}
async function CousePage({ params }) {
    const { slug } = await params;
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    const dictionaryPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$dictionary$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])();
    const coursePagePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCoursePage"])(slug);
    const categoriesPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$navbar$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoriesTree"])();
    const dictionary = await dictionaryPromise;
    const coursePage = await coursePagePromise;
    const categoriesTree = await categoriesPromise;
    const coursesTree = Object.values(categoriesTree).find((item)=>item.slug === 'courses');
    let categoryIds = {};
    if (coursesTree?.children) {
        categoryIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$menu$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCoursesIds"])(coursesTree.children);
    }
    const pureCatIds = categoryIds?.[slug]?.list ?? [];
    const coursesList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllCategoryPages"])(pureCatIds);
    const courses = coursesList.map((item)=>{
        const card = item.blocks?.find?.((block)=>block.__component === __TURBOPACK__imported__module__$5b$project$5d2f$types$2f$pages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["BLOCK"].CARD);
        return {
            id: item.id,
            title: item.title ?? card?.title ?? '',
            slug: item?.category?.slug ?? '',
            duration: card?.time ?? '',
            level: card?.level ?? '',
            audience: card?.description ?? '',
            image: item?.image?.url ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getImageURL"])(item.image.url)}` : ''
        };
    });
    const userCoursesPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserCourses"])();
    const userCourses = await userCoursesPromise;
    const userPageCourse = userCourses.find((item)=>item.page.slug === slug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up",
                children: coursePage.title
            }, void 0, false, {
                fileName: "[project]/app/courses/[slug]/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTMLBlock"], {
                content: coursePage.description,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])('py-2 md:py-3 xl:py-4', courses.length > 0 ? 'text-center' : '')
            }, void 0, false, {
                fileName: "[project]/app/courses/[slug]/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            courses.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                courses: courses,
                categoryIds: categoryIds,
                showFilters: false
            }, void 0, false, {
                fileName: "[project]/app/courses/[slug]/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                children: userPageCourse ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-auto pt-2 pb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES}/private/${userPageCourse.slug}`,
                        children: dictionary.view_private_course
                    }, void 0, false, {
                        fileName: "[project]/app/courses/[slug]/page.tsx",
                        lineNumber: 87,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/courses/[slug]/page.tsx",
                    lineNumber: 86,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-auto pt-2 pb-4",
                    children: user?.email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$buy$2d$course$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        name: coursePage.title,
                        dictionary: dictionary
                    }, void 0, false, {
                        fileName: "[project]/app/courses/[slug]/page.tsx",
                        lineNumber: 94,
                        columnNumber: 17
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                        className: "!hidden xl:!inline-flex",
                        href: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN,
                        children: dictionary.login
                    }, void 0, false, {
                        fileName: "[project]/app/courses/[slug]/page.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/courses/[slug]/page.tsx",
                    lineNumber: 92,
                    columnNumber: 13
                }, this)
            }, void 0, false)
        ]
    }, void 0, true);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    generateMetadata,
    CousePage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(generateMetadata, "40e15338216cf221ec82e1bba1c6a64b69ca4d7cc2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(CousePage, "4026326e445861d8da4131b33c2f4e85b337e23b5e", null);
}),
"[project]/.next-internal/server/app/courses/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/services/auth.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$courses$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/courses/[slug]/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/services/auth.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0083fb43c2df2c288c67cf3c2d959a93df9d4b3a90",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"],
    "00b4f860153782da488742763b4be5f4a212432fdc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"],
    "4026326e445861d8da4131b33c2f4e85b337e23b5e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$courses$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    "406de0b46859bd60636be6de906e8981e40fe26059",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["changePassword"],
    "40b900988bc685914d1e3f49ed8b193b67d9a88e57",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40d7a4ea44ad035e8f8a8d3c4449c1a81d9859cf06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"],
    "40d8713a3eff2d1f332ca1747ff623a53245370841",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forgotPassword"],
    "40e15338216cf221ec82e1bba1c6a64b69ca4d7cc2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$courses$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["generateMetadata"],
    "40ee4458ea908c771edfe206e1a18f8b2b0f1eab01",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["register"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$courses$2f5b$slug$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$courses$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/courses/[slug]/page/actions.js { ACTIONS_MODULE0 => "[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/services/auth.service.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$courses$2f5b$slug$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/courses/[slug]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_07cdce30._.js.map