module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/certificates/me',
      handler: 'custom-certificate.sendCertificate',
      config: {
        auth: {},
      },
    },
  ],
};
