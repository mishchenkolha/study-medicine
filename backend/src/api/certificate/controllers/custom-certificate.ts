import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

// start helpers
const generatePDF = async (
  username: string,
  courseTitle: string,
  certificateUrl: string,
) => {
  const marginX = 50;
  const doc = new PDFDocument({ size: 'A4', margin: marginX });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('error', (err) => {
    throw err;
  });
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height; // ~842pt для A4
  const startY = pageHeight / 4; // четверта частина сторінки

  // 1.1. фон
  doc.opacity(0.1).image('public/logo.png', 100, 150, {
    fit: [400, 400],
    align: 'center',
    valign: 'center',
  });
  doc.opacity(1);

  const qrDataUrl = await QRCode.toDataURL(certificateUrl, {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 150,
  });

  // 2. Малюємо QR-код у верхньому лівому кутку
  const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
  doc.image(qrBuffer, 30, 30, { width: 150, height: 150 });

  // 1.2. текст
  doc
    .fontSize(48)
    .fillColor('#1e3a8a')
    .font('Helvetica-Bold')
    .text('Certificate', marginX, startY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  let currentY = startY + 60; // відступ після заголовку

  doc
    .fontSize(16)
    .fillColor('black')
    .font('Helvetica')
    .text(`This is to certify that`, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  currentY += 30;
  doc
    .fontSize(28)
    .font('Helvetica-Bold')
    .text(`${username}`, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  currentY += 40;
  doc
    .fontSize(16)
    .font('Helvetica')
    .text(
      `has successfully completed the course "${courseTitle}" organized by "Toronto medicine center".`,
      marginX,
      currentY,
      { align: 'center', width: pageWidth - 2 * marginX },
    );

  currentY += 60;
  doc
    .fontSize(14)
    .text(`Issued on ${new Date().toLocaleDateString()}`, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  // 1.3. штамп та підпис
  doc.image('public/stamp.png', pageWidth - 200, pageHeight - 200, {
    fit: [150, 150],
  });
  doc.image('public/signature.png', 80, pageHeight - 180, {
    fit: [200, 100],
  });

  doc.end();
  await new Promise((resolve) => doc.on('end', resolve));
  return Buffer.concat(chunks);
};

const sendEmail = async (to: string, pdfBuffer: Buffer) => {
  // 2. Відправка email (працює)
  return strapi
    .plugin('email')
    .service('email')
    .send({
      to,
      subject: 'Your Certificate',
      text: 'Please find attached your course completion certificate.',
      attachments: [{ filename: 'certificate.pdf', content: pdfBuffer }],
    });
};

const getUniqueNames = (username: string, courseTitle: string) => {
  const safe = (s: string) => s.normalize('NFKD').replace(/[^\w.-]+/g, '_');
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${safe(username || 'user')}__${safe(courseTitle)}__${ts}.pdf`;
  const uniqueTitle = `${username || 'User'} — ${courseTitle} — ${ts}`;
  const slug = uniqueTitle
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return { slug, fileName, uniqueTitle };
};
// end helpers
export default {
  async sendCertificate(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('Авторизація потрібна');

    const { email, username, documentId: userDocumentId, id: userId } = user;
    const { courseId: courseDocumentId, title: courseTitle } =
      ctx.request.body || {};
    if (!courseDocumentId || !courseTitle) {
      return ctx.badRequest('courseId та title (назва курсу) обов’язкові');
    }
    // 0. Перевіряємо чи сертифікат вже було створено
    const existing = await strapi.db
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

    if (existing) {
      return ctx.send({
        isNew: false,
        url: existing.certificate?.url ?? null,
      });
    }

    try {
      // 3. Унікальні імена та slug
      const { slug, fileName, uniqueTitle } = getUniqueNames(
        username,
        courseTitle,
      );
      const certificateUrl = `${process.env.FRONTEND_URL}/certificate/${slug}`;
      // 3.1. Генеруємо pdf
      const pdfBuffer = await generatePDF(
        username,
        courseTitle,
        certificateUrl,
      );
      if (!pdfBuffer.length) throw new Error('PDF не згенерувався');
      await sendEmail(email, pdfBuffer);
      // 4. Завантаження PDF у Media Library через REST API (серверлес)
      const baseUrl =
        process.env.STRAPI_PUBLIC_URL ||
        `http://localhost:${process.env.PORT || 1337}`;
      const apiToken = process.env.STRAPI_API_TOKEN;
      if (!apiToken) throw new Error('Не заданий STRAPI_API_TOKEN');

      const formData = new FormData();
      formData.append(
        'files',
        new Blob([pdfBuffer], { type: 'application/pdf' }),
        fileName,
      );
      formData.append(
        'fileInfo',
        JSON.stringify({
          name: fileName,
          alternativeText: `Certificate for ${username}`,
          caption: `Certificate for ${courseTitle}`,
        }),
      );

      const uploadRes = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiToken}` },
        body: formData as any,
      });

      if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(
          `Upload failed: ${uploadRes.status} ${uploadRes.statusText} — ${errText}`,
        );
      }

      const uploadedJson = await uploadRes.json();
      const uploadedFile = Array.isArray(uploadedJson)
        ? uploadedJson[0]
        : uploadedJson;
      const fileDocumentId = uploadedFile?.id;
      if (!fileDocumentId)
        throw new Error('Upload пройшов, але id файлу не повернувся');

      // 5. Створення сертифікату у Documents API
      const certificateEntry = await strapi
        .documents('api::certificate.certificate')
        .create({
          data: {
            title: uniqueTitle,
            slug,
            user: userDocumentId ?? { id: userId },
            course: courseDocumentId,
            certificate: fileDocumentId, // single media connect
          },
          status: 'published',
        });

      // 6. Відповідь
      return ctx.send({
        isNew: true,
        slug: uploadedFile?.url ? slug : null,
      });
    } catch (err: any) {
      strapi.log.error('Помилка при відправці сертифікату:', err);
      return ctx.internalServerError(
        err?.message || 'Не вдалося відправити сертифікат',
      );
    }
  },
};
