export default (config, { strapi }) => {
  return async (ctx, next) => {
    const isPdf =
      ctx.url.startsWith('/uploads/') && ctx.url.toLowerCase().endsWith('.pdf');

    if (isPdf) {
      // Перевіряємо секретний ключ, який надішле ваш Next.js сервер
      const internalSecret = ctx.get('x-internal-secret');

      if (internalSecret !== process.env.INTERNAL_API_KEY) {
        ctx.status = 403;
        ctx.body = {
          error: 'Forbidden',
          message: 'Access denied',
        };
        return;
      }
    }

    await next();
  };
};
