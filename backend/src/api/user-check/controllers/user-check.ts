import { Context } from 'koa';

export default {
  async checkUsername(ctx: Context) {
    const { username } = ctx.query;

    if (!username) {
      return ctx.badRequest('Username query parameter is required');
    }

    // Call the service logic
    const isUnique = await strapi
      .service('api::user-check.user-check')
      .isUsernameUnique(username as string);

    return {
      unique: isUnique,
    };
  },
  async updatePhone(ctx) {
    const { id, phone } = ctx.request.body;

    // Валідація вхідних даних
    if (!id || !phone) {
      return ctx.badRequest('ID and phone are required');
    }

    try {
      // Виклик логіки з сервісу
      const updatedUser = await strapi
        .service('api::user-check.user-check')
        .updatePhone(id, phone);

      if (!updatedUser) {
        return ctx.notFound('User not found');
      }

      return {
        ok: true,
        phone: updatedUser.phone,
      };
    } catch (err) {
      strapi.log.error('Помилка при оновленні телефону:', err);
      return ctx.internalServerError('Database error');
    }
  },
};
