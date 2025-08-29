export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  'random-sort': {
    enabled: true,
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: env.int('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        secure: false,
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'),
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
  'users-permissions': {
    config: {
      register: {
        confirmation: true,
      },
    },
  },
});
