async function getFileBufferFromUrl(fileUrl) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    // Повертаємо буфер, використовуючи Buffer.from()
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (err) {
    strapi.log.error('Error fetching file buffer:', err);
    throw err;
  }
}

const sendEmail = async (to: string, pdfBuffer: Buffer) => {
  return strapi
    .plugin('email')
    .service('email')
    .send({
      to,
      subject: 'Your Certificate',
      text: 'Please find attached your course completion certificate.',
      attachments: [
        {
          filename: 'certificate.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
};

async function sendCertificateEmail(toEmail, fileUrl) {
  try {
    const pdfBuffer = await getFileBufferFromUrl(fileUrl);
    await sendEmail(toEmail, pdfBuffer);
    strapi.log.info(`Certificate email sent to ${toEmail}`);
  } catch (err) {
    strapi.log.error('Failed to send certificate email:', err);
  }
}

export default { sendCertificateEmail };
