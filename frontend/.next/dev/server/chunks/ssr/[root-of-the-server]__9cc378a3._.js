module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
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
        token: ("TURBOPACK compile-time value", "4e6dd3e07fb0750f78b31dc2606d9b33e3eeb05d57c511d63d48ce583cb4866bb0faa19e94e229cd097460a1d1b32ea9049343d8fe06e69bbb484113310e60424668b9d22e5b836d838537314643beaa71c0625d0289f81968c1f8a06882df4a05b6d78321ba074ed0e45bc31f0483248023b2bcef7185d559764e9a82813950"),
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
"[project]/utils/not_found.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "noParamsChecker",
    ()=>noParamsChecker
]);
const noParamsChecker = async ({ params })=>{
    try {
        if (!params) {
            return {
                title: 'Course Not Found',
                description: 'The requested course does not exist'
            };
        }
        const { slug } = await params;
        if (!slug) {
            return {
                title: 'Course Not Found',
                description: 'The requested course does not exist'
            };
        }
    } catch (error) {
        return {
            title: 'Course Not Found',
            description: 'The requested course does not exist'
        };
    }
    return {};
};
}),
"[project]/app/[...slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaticPage,
    "generateMetadata",
    ()=>generateMetadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$meta$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/meta.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/pages.services.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/html-block/html-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$not_found$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/not_found.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function generateMetadata({ params }) {
    const notFoundData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$not_found$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["noParamsChecker"])({
        params
    });
    if (notFoundData?.title) {
        return notFoundData;
    }
    const { slug } = await params;
    if (!slug || Array.isArray(slug) && slug.length > 1) {
        return {};
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$meta$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMeta"])(`/${slug?.[0]?.toLowerCase?.()}`);
}
async function StaticPage({ params }) {
    if (!params) return null;
    const { slug } = await params;
    if (!slug || Array.isArray(slug) && slug.length > 1) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const staticPagePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$pages$2e$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getStaticPage"])(slug?.[0] ?? '');
    const staticPage = await staticPagePromise;
    if (!staticPage) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up",
                children: staticPage.title
            }, void 0, false, {
                fileName: "[project]/app/[...slug]/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTMLBlock"], {
                content: staticPage.description,
                className: "py-2 md:py-3 xl:py-4"
            }, void 0, false, {
                fileName: "[project]/app/[...slug]/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/[...slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/[...slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9cc378a3._.js.map