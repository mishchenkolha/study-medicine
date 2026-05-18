const bcrypt = require('bcryptjs');

module.exports = (plugin) => {
  const originalAuthFactory = plugin.controllers.auth;

  plugin.controllers.auth = ({ strapi }) => {
    const originalAuth = originalAuthFactory({ strapi });

    originalAuth.callback = async (ctx) => {
      const provider = ctx.params.provider || 'local';

      if (provider !== 'local') {
        const originalCallback = originalAuthFactory({ strapi }).callback;
        return originalCallback(ctx);
      }

      const { identifier, password } = ctx.request.body;

      if (!identifier || !password) {
        return ctx.badRequest('Please provide your credentials.');
      }

      // 1. Шукаємо користувача, де поле email АБО поле username збігається з введеним identifier
      const user = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({
          where: {
            $or: [
              { email: identifier.toLowerCase() },
              { username: identifier }, // username зазвичай чутливий до регістру, але можна теж додати .toLowerCase(), якщо у вас так у базі
            ],
          },
        });

      // Якщо користувача не знайдено ні за email, ні за username
      if (!user) {
        return ctx.badRequest('Invalid credentials.');
      }

      // 2. Перевірка блокування
      if (user.blocked) {
        return ctx.badRequest('Your account has been blocked.');
      }

      // 3. Перевірка підтвердження пошти
      const advancedSettings = await strapi
        .store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
        .get();

      if (advancedSettings.email_confirmation && !user.confirmed) {
        return ctx.badRequest('Your account email is not confirmed.');
      }

      // 4. Валідація пароля через bcryptjs
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return ctx.badRequest('Invalid credentials.');
      }

      // 5. Випускаємо JWT токен
      const jwtService = strapi.plugin('users-permissions').service('jwt');
      const jwt = jwtService.issue({ id: user.id });

      // 6. Безпечно очищаємо об'єкт користувача перед відправкою
      const {
        password: _password,
        resetPasswordToken: _rt,
        confirmationToken: _ct,
        ...sanitizedUser
      } = user;

      ctx.send({
        jwt,
        user: sanitizedUser,
      });
    };

    return originalAuth;
  };

  return plugin;
};
