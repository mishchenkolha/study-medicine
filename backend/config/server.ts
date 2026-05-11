export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  customSettings: {
    adminEmail: env('ADMIN_EMAIL_ADDRESS', 'medesthetexperts@gmail.com'),
    fromEmail: env('DEFAULT_FROM', 'no_reply@medesthetexperts.com'),
  },
});
