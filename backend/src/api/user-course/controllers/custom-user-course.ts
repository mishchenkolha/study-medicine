export default {
  async findMyCourses(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

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
      ...new Map(
        userCourses.map((uc) => [uc.courses.documentId, uc.courses]),
      ).values(),
    ];

    return uniqueCourses?.[0] ?? [];
  },
};
