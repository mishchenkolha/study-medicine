export default {
  async findMyCourses(ctx) {
    const userId = ctx.state.user?.id;
    if (!userId) return ctx.unauthorized();

    const userCoursesRecords = await strapi
      .documents('api::user-course.user-course')
      .findMany({
        filters: {
          user: {
            id: userId,
          },
        },
        populate: {
          courses: {
            populate: {
              image: true,
              bg_image: true,
              page: {
                populate: {
                  image: true,
                },
              },
              quiz: true,
              attachments: {
                populate: {
                  files: true,
                },
              },
            },
          },
        },
      });
    const allCourses = userCoursesRecords.flatMap(
      (record) => record.courses || [],
    );
    const uniqueCourses = Array.from(
      new Map(allCourses.map((course) => [course.id, course])).values(),
    );

    return uniqueCourses ?? [];
  },
};
