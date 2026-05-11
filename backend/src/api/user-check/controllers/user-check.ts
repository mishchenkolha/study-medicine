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
};
