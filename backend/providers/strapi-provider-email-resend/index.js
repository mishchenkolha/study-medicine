const { Resend } = require('resend');

module.exports = {
  init(providerOptions, settings) {
    const resend = new Resend(providerOptions.apiKey);

    return {
      async send(options) {
        const { from, to, subject, text, html, attachments } = options;

        const { data, error } = await resend.emails.send({
          from: from || settings.defaultFrom,
          to: Array.isArray(to) ? to : [to],
          subject: subject,
          html: html || text,
          attachments: attachments, // Твій pdfBuffer тут
        });

        if (error) throw new Error(error.message);
        return data;
      },
    };
  },
};
