export default (plugin) => {
  // --- 1. Handle Saving the Phone Field ---
  const originalRegister = plugin.controllers.auth.register;

  plugin.controllers.auth.register = async (ctx) => {
    // We don't need to manually inject 'phone' here because Strapi 5's
    // default register controller actually uses ctx.request.body.
    // HOWEVER, it only saves fields that exist in the User Content-Type.
    // AS LONG AS you added 'phone' in the Admin Panel, the originalRegister will save it.

    return await originalRegister(ctx);
  };

  // --- 2. Handle Post-Confirmation Emails ---
  const originalEmailConfirmation = plugin.controllers.auth.emailConfirmation;

  plugin.controllers.auth.emailConfirmation = async (ctx) => {
    // Store the token from the query before the original controller consumes it
    const { confirmation: confirmationToken } = ctx.query;

    // Run the original confirmation logic (this updates the user to confirmed: true)
    await originalEmailConfirmation(ctx);

    // Find the user associated with that token to get their email/username
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { confirmationToken },
    });

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
