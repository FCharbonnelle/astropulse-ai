import { NextResponse } from 'next/server';
import { stripe, STRIPE_PRODUCTS } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { priceId, mode } = await req.json();

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('dummy')) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: priceId.includes('vip') ? STRIPE_PRODUCTS.VIP_PASS_WEEKLY.name : STRIPE_PRODUCTS.COIN_PACK_5.name,
                description: priceId.includes('vip') ? STRIPE_PRODUCTS.VIP_PASS_WEEKLY.description : STRIPE_PRODUCTS.COIN_PACK_5.description,
              },
              unit_amount: priceId.includes('vip') ? 399 : 99, // in cents
              recurring: mode === 'subscription' ? { interval: 'week' } : undefined,
            },
            quantity: 1,
          },
        ],
        mode: mode || 'payment',
        success_url: `${appUrl}/dashboard?payment=success`,
        cancel_url: `${appUrl}/store?payment=cancel`,
      });

      return NextResponse.json({ url: session.url });
    }

    // Fallback simulation for local dev without active Stripe API key
    const paymentType = priceId.includes('vip') ? 'success_vip' : 'success_coins';
    return NextResponse.json({
      url: `${appUrl}/dashboard?payment=${paymentType}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
