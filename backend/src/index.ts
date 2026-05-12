import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      async afterUpdate(event) {
        // Отримуємо результат оновлення та вхідні дані
        const { result, params } = event;

        // Перевіряємо, чи в цьому запиті поле 'confirmed' було встановлено в true
        if (params.data && params.data.confirmed === true) {
          const adminEmail = strapi.config.get(
            'server.customSettings.adminEmail',
          );
          const fromEmail = strapi.config.get(
            'server.customSettings.fromEmail',
          );

          try {
            await Promise.all([
              // Email 1: To the User
              strapi.plugins['email'].services.email.send({
                to: result.email,
                from: fromEmail,
                subject: 'Welcome! Your email is confirmed',
                text: `Hi ${result.username}, thanks for joining us! We will contact to you soon to provide detailed information about joining the course.`,
              }),
              // Email 2: To the Admin
              strapi.plugins['email'].services.email.send({
                to: adminEmail,
                from: fromEmail,
                subject: 'New Verified User Registered',
                text: `User ${result.username} with phone ${result.phone} and email ${result.email} has registered and confirmed their email. Please contact him ASAP.`,
              }),
            ]);

            strapi.log.info(`Emails sent for: ${result.email}`);
          } catch (err) {
            strapi.log.error('Помилка в Lifecycle Hook при відправці:', err);
          }
        }
      },
    });
  },
};
