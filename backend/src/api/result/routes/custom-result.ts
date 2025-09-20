export default {
  routes: [
    {
      method: 'POST',
      path: '/results/me',
      handler: 'custom-result.submit',
      config: {
        auth: {},
      },
    },
    {
      method: 'GET',
      path: '/results/me',
      handler: 'custom-result.countForQuiz',
      config: {
        auth: {},
      },
    },
    {
      method: 'GET',
      path: '/results/me/is-passed',
      handler: 'custom-result.isPassed',
      config: {
        auth: {},
      },
    },
    {
      method: 'GET',
      path: '/results/me/is-certificate-sent',
      handler: 'custom-result.isCertificateSent',
      config: {
        auth: {},
      },
    },
    {
      method: 'GET',
      path: '/results/me/latest',
      handler: 'custom-result.latest',
      config: {
        auth: {},
      },
    },
  ],
};
