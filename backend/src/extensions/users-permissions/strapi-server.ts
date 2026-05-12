export default (plugin) => {
  const originalEmailConfirmation = plugin.controllers.auth.emailConfirmation;

  plugin.controllers.auth.emailConfirmation = async (ctx) => {
    const { confirmation: confirmationToken } = ctx.query;

    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { confirmationToken },
    });

    await originalEmailConfirmation(ctx);

    if (user) {
      const adminEmail = strapi.config.get('server.customSettings.adminEmail');
      const fromEmail = strapi.config.get('server.customSettings.fromEmail');
      try {
        await Promise.all([
          // Email 1: To the User
          strapi.plugins['email'].services.email.send({
            to: user.email,
            from: fromEmail,
            subject: 'Welcome! Your email is confirmed',
            text: `Hi ${user.username}, thanks for joining us! We will contact to you soon to provide detailed information about joining the course.`,
          }),
          // Email 2: To the Admin
          strapi.plugins['email'].services.email.send({
            to: adminEmail,
            from: fromEmail,
            subject: 'New Verified User Registered',
            text: `User ${user.username} with phone ${user.phone} and email ${user.email} has registered and confirmed their email. Please contact him ASAP.`,
          }),
        ]);
      } catch (err) {
        strapi.log.error('Post-confirmation email failed:', err);
      }
    }
  };

  return plugin;
};
