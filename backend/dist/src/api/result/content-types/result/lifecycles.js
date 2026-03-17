"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async beforeUpdate(event) {
        const { data, where } = event.params;
        // Перевіряємо тільки коли явно передають certificate_sent=true
        if ((data === null || data === void 0 ? void 0 : data.certificate_sent) === true) {
            const previous = await strapi.db.query('api::result.result').findOne({
                where,
                populate: ['user', 'course'], // нам потрібен і юзер, і курс
            });
            if ((previous === null || previous === void 0 ? void 0 : previous.certificate_sent) === false) {
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
        var _a, _b, _c, _d;
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.shouldSendCertificate) {
            const { result } = event;
            const user = (_b = event.state.user) !== null && _b !== void 0 ? _b : result.user;
            const course = (_c = event.state.course) !== null && _c !== void 0 ? _c : result.course;
            const courseDocumentId = course === null || course === void 0 ? void 0 : course.documentId;
            if ((user === null || user === void 0 ? void 0 : user.email) && courseDocumentId) {
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
                    const certificateUrl = (_d = certificate === null || certificate === void 0 ? void 0 : certificate.certificate) === null || _d === void 0 ? void 0 : _d.url;
                    if (!certificateUrl || !process.env.STRAPI_PUBLIC_URL) {
                        strapi.log.error('Certificate or its URL is missing:', certificate);
                        return;
                    }
                    const emailService = strapi.service('api::result.email-service');
                    await emailService.sendCertificateEmail(user.email, `${process.env.STRAPI_PUBLIC_URL}${certificateUrl}`);
                }
                catch (err) {
                    strapi.log.error('Failed to send certificate email after update:', err);
                }
            }
            else {
                strapi.log.error('Missing data for sending certificate email:', user === null || user === void 0 ? void 0 : user.email);
            }
        }
    },
};
