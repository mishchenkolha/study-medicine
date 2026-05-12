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
    {
      method: 'POST',
      path: '/user/update-phone',
      handler: 'user-check.updatePhone',
      config: {
        auth: false, // Ми захистимо його внутрішнім токеном або перевіркою, якщо треба
      },
    },
  ],
};
