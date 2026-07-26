import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

export const STRIPE_PRODUCTS = {
  VIP_PASS_WEEKLY: {
    id: 'price_vip_weekly',
    name: 'Pass VIP Astral (Hebdomadaire)',
    price: 3.99,
    currency: 'eur',
    interval: 'week',
    description: 'Accès illimité à l\'Oracle IA, tirages prioritaires & analyses de compatibilité complètes.',
  },
  COIN_PACK_5: {
    id: 'price_coin_pack',
    name: 'Pack 5 Crédits Étoiles',
    price: 0.99,
    currency: 'eur',
    coins: 5,
    description: 'Débloquez 5 consultations de l\'Oracle ou de rapports d\'affinité amoureuse.',
  },
};
