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
"[project]/app/courses/private/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PrivateCousePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/courses.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$dictionary$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/dictionary.service.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/button/index.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ui/html-block/html-block.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/routes.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
async function PrivateCousePage({ params }) {
    const { slug } = await params;
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"])();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN);
    }
    const dictionaryPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$dictionary$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getDictionary"])();
    const userCoursesPromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserCourses"])();
    const [dictionary, userCourses] = await Promise.all([
        dictionaryPromise,
        userCoursesPromise
    ]);
    const currentCourse = userCourses.find((course)=>course.slug === slug);
    if (!currentCourse) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES);
    }
    const isPassedQuiz = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkPassedQuiz"])(currentCourse?.quiz?.documentId || '');
    if (!isPassedQuiz) {
        const currentQuiz = currentCourse?.quiz;
        const attemptsCount = Number(currentQuiz?.attempts_count ?? 0);
        const userAttempts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$courses$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserAttempts"])(currentQuiz?.documentId);
        const attemptsLeft = attemptsCount ? attemptsCount - userAttempts > 0 ? attemptsCount - userAttempts : 0 : -1;
        if (attemptsLeft <= 0) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES}/private/${slug}/result`);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "header1 pb-4 md:pb-5 xl:pb-6 animate-fade-in-up",
                children: currentCourse.title
            }, void 0, false, {
                fileName: "[project]/app/courses/private/[slug]/page.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$html$2d$block$2f$html$2d$block$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HTMLBlock"], {
                content: currentCourse.description ?? '',
                className: "py-2 md:py-3 xl:py-4"
            }, void 0, false, {
                fileName: "[project]/app/courses/private/[slug]/page.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-auto pt-2 pb-4",
                children: isPassedQuiz ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                    href: `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES}/private/${slug}/result`,
                    variant: __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VARIANTS"].SUCCESS,
                    children: dictionary.check_result
                }, void 0, false, {
                    fileName: "[project]/app/courses/private/[slug]/page.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Button"], {
                    href: `${__TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$routes$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ROUTES"].COURSES}/private/${slug}/quiz`,
                    variant: __TURBOPACK__imported__module__$5b$project$5d2f$ui$2f$button$2f$index$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["VARIANTS"].DANGER,
                    children: dictionary.start_quiz
                }, void 0, false, {
                    fileName: "[project]/app/courses/private/[slug]/page.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/courses/private/[slug]/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/courses/private/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/courses/private/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e1cc1a32._.js.map