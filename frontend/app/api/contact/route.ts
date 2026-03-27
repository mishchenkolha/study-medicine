import { verifyFormSignature } from '@/components/crypto';
import {
  CONTACT_EMAIL,
  RESEND_API_KEY,
  RESEND_FROM_EMAIL,
} from '@/utils/constants';

export async function POST(req: Request) {
  const formFields = await req.json();
  const { email, signature, timestamp, ...rest } = formFields;

  if (!verifyFormSignature(signature, timestamp)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid signature' }),
      { status: 400 },
    );
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: CONTACT_EMAIL,
      subject: `Site message from ${email}`,
      text: [
        email,
        Object.entries(rest).map(([key, value]) => `${key}: ${value}`),
      ].join('\n'),
      reply_to: email,
    }),
  });

  return new Response(JSON.stringify({ success: true }));
}
