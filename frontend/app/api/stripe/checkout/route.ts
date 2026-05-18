import { getStripe } from '@/utils/stripe';
import { NextResponse } from 'next/server';

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

    const stripe = getStripe();

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
