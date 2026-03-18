module.exports = [
"[project]/ui/link/link.tsx [app-rsc] (ecmascript, next/dynamic entry, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/_161391e2._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/ui/link/link.tsx [app-rsc] (ecmascript, next/dynamic entry)");
    });
});
}),
"[project]/node_modules/ioredis/built/index.js [app-rsc] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_fcf528ba._.js",
  "server/chunks/ssr/[externals]__ec928000._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/ioredis/built/index.js [app-rsc] (ecmascript)");
    });
});
}),
];