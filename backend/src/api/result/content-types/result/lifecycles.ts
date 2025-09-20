export default {
  async beforeUpdate(event) {
    const { data, where } = event.params;
    // Перевіряємо тільки коли явно передають certificate_sent=true
    if (data?.certificate_sent === true) {
      const previous = await strapi.db.query('api::result.result').findOne({
        where,
        populate: ['user', 'course'], // нам потрібен і юзер, і курс
      });

      if (previous?.certificate_sent === false) {
        // збережемо у state
        event.state = {
          shouldSendCertificate: true,
          user: previous.user,
          course: previous.course,
        };
      }
    }
  },

  async afterUpdate(event) {
    if (event.state?.shouldSendCertificate) {
      const { result } = event;
      const user = event.state.user ?? result.user;
      const course = event.state.course ?? result.course;
      const courseDocumentId = course?.documentId;

      if (user?.email && courseDocumentId) {
        try {
          const certificate = await strapi.db
            .query('api::certificate.certificate')
            .findOne({
              populate: ['certificate'],
              where: {
                course: {
                  documentId: courseDocumentId,
                },
                user: {
                  id: user.id,
                },
              },
            });
          const certificateUrl = certificate?.certificate?.url;
          if (!certificateUrl || !process.env.STRAPI_PUBLIC_URL) {
            strapi.log.error('Certificate or its URL is missing:', certificate);
            return;
          }
          const emailService = strapi.service('api::result.email-service');
          await emailService.sendCertificateEmail(
            user.email,
            `${process.env.STRAPI_PUBLIC_URL}${certificateUrl}`,
          );
        } catch (err) {
          strapi.log.error(
            'Failed to send certificate email after update:',
            err,
          );
        }
      } else {
        strapi.log.error(
          'Missing data for sending certificate email:',
          user?.email,
        );
      }
    }
  },
};
