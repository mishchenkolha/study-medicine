import { INTERNAL_API_KEY, STRAPI_URL } from '@/utils/constants';
import { getStripe } from '@/utils/stripe';
import Stripe from 'stripe';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return new Response('Invalid webhook', { status: 400 });
  }

  try {
    // 🔥 головний момент
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const response = await fetch(`${STRAPI_URL}/api/payment/confirm`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${INTERNAL_API_KEY}`,
        },

        body: JSON.stringify({
          stripeSessionId: session.id,
        }),
      });

      if (!response.ok) {
        console.error('Failed to confirm payment:', await response.text());
        return new Response('Payment confirmation failed', {
          status: response.status,
        });
      }
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Webhook processing failed', { status: 500 });
  }
}
