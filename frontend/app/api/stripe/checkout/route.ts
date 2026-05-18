import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: (process.env.STRIPE_VERSION || '2026-04-22.dahlia') as any,
});

export async function POST(req: Request) {
  try {
    const { name, price, referrerUrl } = await req.json();
    if (!price) {
      console.error('Invalid price:', price);
      return NextResponse.json({ error: 'Invalid price' }, { status: 500 });
    }
    if (name?.length > 200) {
      console.error('Name too long:', name);
      return NextResponse.json({ error: 'Name too long' }, { status: 500 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],

      success_url: `${referrerUrl}/?success=true`,
      cancel_url: `${referrerUrl}/?success=false`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
