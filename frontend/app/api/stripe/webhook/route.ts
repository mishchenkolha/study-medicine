import Stripe from 'stripe';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: (process.env.STRIPE_VERSION || '2026-04-22.dahlia') as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

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

      await fetch(`${process.env.STRAPI_URL}/api/payment/confirm`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.INTERNAL_API_KEY}`,
        },

        body: JSON.stringify({
          stripeSessionId: session.id,
        }),
      });
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response('Webhook processing failed', { status: 500 });
  }
}
