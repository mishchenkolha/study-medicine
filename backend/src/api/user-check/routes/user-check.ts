export default {
  routes: [
    {
      method: 'GET',
      path: '/user-check/is-unique',
      handler: 'user-check.checkUsername',
      config: {
        auth: false, // Set to false so guests can check availability during registration
      },
    },
  ],
};
