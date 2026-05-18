export default {
  routes: [
    {
      method: 'POST',

      path: '/payment/confirm',

      handler: 'payment.confirm',

      config: {
        auth: false,
      },
    },
  ],
};
