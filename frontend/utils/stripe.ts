import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY');
  }

  if (!stripe) {
    stripe = new Stripe(key, {
      apiVersion: (process.env.STRIPE_VERSION || '2026-04-22.dahlia') as any,
    });
  }

  return stripe;
}
