"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async findMyCourses(ctx) {
        var _a, _b;
        const userId = (_a = ctx.state.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId)
            return ctx.unauthorized();
        const userCourses = await strapi.db
            .query('api::user-course.user-course')
            .findMany({
            where: { user: userId },
            populate: {
                courses: {
                    populate: ['image', 'bg_image', 'page.image', 'quiz', 'courses'],
                },
            },
        });
        // Витягуємо курси з user-courses та робимо унікальні по id
        const uniqueCourses = [
            ...new Map(userCourses.map((uc) => [uc.courses.documentId, uc.courses])).values(),
        ];
        return (_b = uniqueCourses === null || uniqueCourses === void 0 ? void 0 : uniqueCourses[0]) !== null && _b !== void 0 ? _b : [];
    },
};
