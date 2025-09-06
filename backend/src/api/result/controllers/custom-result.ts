const resultsContentApiName = 'api::result.result';
export default {
  async submit(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Авторизація потрібна');
    }

    const {
      quizDocumentId,
      answers,
      score,
      isPassed: passed,
    } = ctx.request.body;

    if (!quizDocumentId || typeof score !== 'number' || !answers) {
      return ctx.badRequest('quizDocumentId, answers і score обов’язкові');
    }
    const entryData = {
      quiz: quizDocumentId,
      user: user.documentId ? user.documentId : { id: user.id },
      score,
      submittedAt: new Date(),
      answers: JSON.stringify(answers),
      passed,
    };
    const resultsContentType = strapi.contentType(resultsContentApiName);
    const sanitizedEntry = await strapi.contentAPI.sanitize.input(
      entryData,
      resultsContentType,
    );

    try {
      const result = await strapi.documents(resultsContentApiName).create({
        data: sanitizedEntry,
        status: 'published',
      });

      return result;
    } catch (error) {
      strapi.log.error('Помилка при створенні результату:', error);
      return ctx.internalServerError('Не вдалося створити результат');
    }
  },
  async countForQuiz(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Авторизація потрібна');
    }

    const { quizDocumentId } = ctx.query;
    if (!quizDocumentId) {
      return ctx.badRequest('quizDocumentId обов’язковий у query');
    }

    try {
      const results = await strapi.db.query(resultsContentApiName).findMany({
        where: {
          quiz: {
            documentId: quizDocumentId,
          },
          user: {
            id: user.id,
          },
        },
      });
      // Витягуємо результати та робимо унікальні по id
      const uniqueResults = [
        ...new Map(results.map((r) => [r.documentId, r])).values(),
      ];
      return { count: uniqueResults.length };
    } catch (error) {
      strapi.log.error('Помилка при підрахунку результатів:', error);
      return ctx.internalServerError('Не вдалося отримати дані');
    }
  },
  async isPassed(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Авторизація потрібна');
    }

    const { quizDocumentId } = ctx.query;
    if (!quizDocumentId) {
      return ctx.badRequest('quizDocumentId обов’язковий у query');
    }
    try {
      const record = await strapi.db.query(resultsContentApiName).findOne({
        where: {
          quiz: {
            documentId: quizDocumentId,
          },
          user: {
            id: user.id,
          },
          passed: true,
        },
      });

      return Boolean(record);
    } catch (error) {
      strapi.log.error('Помилка при перевірці результатів:', error);
      return ctx.internalServerError('Не вдалося отримати дані');
    }
  },
  async latest(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized('Авторизація потрібна');
    }

    try {
      const latestResult = await strapi.db
        .query(resultsContentApiName)
        .findOne({
          populate: ['quiz'],
          where: {
            user: {
              id: user.id,
            },
          },
          orderBy: { id: 'desc' },
        });
      return latestResult ?? {};
    } catch (error) {
      strapi.log.error('Помилка при отриманні останнього результату:', error);
      return ctx.internalServerError('Не вдалося отримати дані');
    }
  },
};
