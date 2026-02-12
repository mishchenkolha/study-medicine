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
        host: env('SMTP_HOST', 'smtp.mailersend.net'),
        port: env.int('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        secure: false,
      },
      settings: {
        defaultFrom: `Romola Med Clinic <${env('DEFAULT_FROM')}>`,
        defaultReplyTo: env('DEFAULT_FROM'),
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
