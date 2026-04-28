import path from 'path';
import PDFDocument from 'pdfkit';
// import QRCode from 'qrcode';

// start helpers
const generatePDF = async (
  username: string,
  courseTitle: string,
  certificateUrl: string,
) => {
  const marginX = 60;
  const doc = new PDFDocument({ size: 'A4', margin: marginX });

  // Визначаємо шляхи до шрифтів
  const fontsPath = path.join(process.cwd(), 'public/fonts');

  // Реєструємо шрифти
  doc.registerFont('Pacifico', path.join(fontsPath, 'Pacifico-Regular.ttf'));
  doc.registerFont('Lexend', path.join(fontsPath, 'Lexend-Regular.ttf'));
  doc.registerFont('Lexend-Bold', path.join(fontsPath, 'Lexend-Bold.ttf'));

  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('error', (err) => {
    throw err;
  });
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height; // ~842pt для A4
  const startY = pageHeight / 3; // третина сторінки

  // 1.1. фон
  doc.image('public/bg.png', 0, 0, {
    width: pageWidth + 1,
    height: pageHeight,
  });

  // const qrDataUrl = await QRCode.toDataURL(certificateUrl, {
  //   errorCorrectionLevel: 'H',
  //   margin: 1,
  //   width: 150,
  // });

  // // 2. Малюємо QR-код у верхньому лівому кутку
  // const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
  // doc.image(qrBuffer, 30, 30, { width: 150, height: 150 });

  // 1.1.1 Малюємо вертикальну акцентну лінію
  doc
    .save()
    .lineWidth(2)
    .strokeColor('#408FC1') // Гарний блакитний колір
    .moveTo(70, startY + 60) // Початок від самого верху (x=20 для відступу від краю)
    .lineTo(70, startY + pageHeight / 3 + 30) // До самого низу
    .stroke()
    .restore();
  doc
    .save()
    .lineWidth(2)
    .strokeColor('#408FC1') // Гарний блакитний колір
    .moveTo(pageWidth - 70, startY + 60) // Початок від самого верху (x=20 для відступу від краю)
    .lineTo(pageWidth - 70, startY + pageHeight / 3 + 30)
    .stroke()
    .restore();

  // 1.1.2 лого
  const logoWidth = 274.32; // Половина ширини A4
  const logoHeight = 171.36;
  const logoX = (pageWidth - logoWidth) / 2 - 1; // Центрування по горизонталі
  const logoY = 75; // Відступ від верху в пікселях (точках)
  doc.image('public/logo.png', logoX, logoY, {
    width: logoWidth,
    height: logoHeight,
  });

  // 1.2. текст
  doc
    .fontSize(38)
    .fillColor('#10385F')
    .font('Pacifico')
    .text('Certificate of Completion', marginX, startY - 10, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  let currentY = startY + 70; // відступ після заголовку

  doc
    .fontSize(20)
    .fillColor('#10385F')
    .font('Lexend')
    .text(`This is to certify that`, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  // 1.3 Генерація прізвища з наклоном
  currentY += 38;
  const centerX = pageWidth / 2;
  const centerY = currentY + 11; // 11 — це приблизно половина висоти шрифту 22pt

  doc.save();

  // 1. Переносимо центр координат у центр тексту
  doc.translate(centerX, centerY);

  // 2. Робимо нахил (skew)
  doc.transform(1, 0, -0.2, 1, 0, 0);

  // 3. Повертаємо координати назад, щоб малювати текст
  doc.translate(-centerX, -centerY);

  doc
    .fontSize(28)
    .fillColor('#10385F')
    .font('Lexend-Bold')
    .text(`${username}`, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });
  doc.restore();

  const description =
    'has successfully completed the professional training course of';
  currentY += 50;
  doc
    .fontSize(20)
    .fillColor('#10385F')
    .font('Lexend')
    .text(description, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });
  let textHeight = doc.heightOfString(description, {
    width: pageWidth - 2 * marginX,
  });
  currentY += textHeight + 10;

  doc
    .fontSize(20)
    .fillColor('#10385F')
    .font('Lexend-Bold')
    .text(courseTitle, marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });
  textHeight = doc.heightOfString(courseTitle, {
    width: pageWidth - 2 * marginX,
  });
  currentY += textHeight + 25;

  doc
    .fontSize(13)
    .fillColor('#10385F')
    .font('Lexend')
    .text('Non-credit program', marginX, currentY, {
      align: 'center',
      width: pageWidth - 2 * marginX,
    });

  currentY += 95;
  const margin = marginX * 2 + 10;
  // 1. Текст зліва
  doc
    .fontSize(14)
    .fillColor('#10385F')
    .font('Lexend')
    .text('MEE Training Team', margin, currentY, {
      align: 'left',
    });

  // 2. Дата справа (на тій же висоті footerY)
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  doc.text(`Date: ${currentDate}`, margin, currentY, {
    align: 'right',
    width: pageWidth - 2 * margin, // Обмежуємо ширину для коректного вирівнювання вправо
  });

  // 1.1.3. штамп (розмір 126x126)
  const stampSize = 126;
  const marginRight = 110; // відступ справа
  const marginBottom = 30; // відступ знизу

  doc.image(
    'public/stamp.png',
    pageWidth - marginRight - stampSize,
    pageHeight - marginBottom - stampSize,
    {
      fit: [stampSize, stampSize],
    },
  );

  doc.end();
  await new Promise((resolve) => doc.on('end', resolve));
  return Buffer.concat(chunks);
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
        slug: existing.slug ?? null,
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
      // Email ми шлемо окремо
      //await sendEmail(email, pdfBuffer);
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
