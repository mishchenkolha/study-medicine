export default {
  async confirm(ctx) {
    const auth = ctx.request.headers.authorization;

    if (auth !== `Bearer ${process.env.INTERNAL_API_KEY}`) {
      return ctx.unauthorized();
    }
    try {
      const result = await strapi
        .service('api::payment.payment')
        .confirmPayment(ctx.request.body);

      ctx.body = result;
    } catch (error) {
      strapi.log.error(error);

      ctx.throw(500, 'Payment processing failed');
    }
  },
};
