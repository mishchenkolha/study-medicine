module.exports = [
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
"[project]/.next-internal/server/app/courses/private/[slug]/result/page/actions.js { ACTIONS_MODULE0 => \"[project]/services/auth.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/courses/private/[slug]/result/page/actions.js { ACTIONS_MODULE0 => \"[project]/services/auth.service.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0083fb43c2df2c288c67cf3c2d959a93df9d4b3a90",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUserToken"],
    "00b4f860153782da488742763b4be5f4a212432fdc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUser"],
    "406de0b46859bd60636be6de906e8981e40fe26059",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["changePassword"],
    "40b900988bc685914d1e3f49ed8b193b67d9a88e57",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"],
    "40d7a4ea44ad035e8f8a8d3c4449c1a81d9859cf06",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resetPassword"],
    "40d8713a3eff2d1f332ca1747ff623a53245370841",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forgotPassword"],
    "40ee4458ea908c771edfe206e1a18f8b2b0f1eab01",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["register"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$courses$2f$private$2f5b$slug$5d2f$result$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/courses/private/[slug]/result/page/actions.js { ACTIONS_MODULE0 => "[project]/services/auth.service.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/auth.service.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_211c5cd3._.js.map