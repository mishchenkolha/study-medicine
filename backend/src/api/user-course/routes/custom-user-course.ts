export default {
  routes: [
    {
      method: 'GET',
      path: '/user-courses/me',
      handler: 'custom-user-course.findMyCourses',
      config: {
        auth: {},
      },
    },
  ],
};
