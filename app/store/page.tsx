'use client';

import React, { useState } from 'react';
import { Crown, Coins, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { Button } from '@/components/ui/button';
import { STRIPE_PRODUCTS } from '@/lib/stripe';

export default function StorePage() {
  const { profile } = useAstroStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (priceId: string, mode: 'subscription' | 'payment') => {
    setLoading(priceId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert('Erreur lors du lancement de la transaction.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Store Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-950/60 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Boutique Céleste
        </div>
        <h1 className="text-3xl font-bold font-serif text-white">Rechargez vos Crédits Étoiles</h1>
        <p className="text-xs text-purple-200/70 max-w-sm mx-auto">
          Choisissez l'offre qui correspond à vos besoins de voyance et de guidage astrale.
        </p>
      </div>

      {/* Profile balance banner */}
      <div className="glass-card p-4 rounded-2xl border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
        <span>Solde Actuel :</span>
        <div className="flex items-center gap-2 font-bold">
          {profile?.isVip ? (
            <span className="text-yellow-300 flex items-center gap-1">✨ PASS VIP (Illimité)</span>
          ) : (
            <span className="text-yellow-400 flex items-center gap-1">
              <Coins className="w-4 h-4" /> {profile?.coinsBalance ?? 3} Crédits Étoiles
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pass VIP */}
        <div className="glass-card-gold p-6 rounded-3xl border-2 border-yellow-400/80 flex flex-col justify-between relative shadow-2xl bg-gradient-to-b from-purple-950/90 to-slate-950">
          <div className="absolute top-0 right-0 bg-yellow-400 text-slate-950 text-xs font-extrabold px-4 py-1 rounded-bl-2xl uppercase tracking-wider">
            Recommandé
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white font-serif">{STRIPE_PRODUCTS.VIP_PASS_WEEKLY.name}</h2>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black text-yellow-300">3,99 €</span>
              <span className="text-xs text-purple-300"> / semaine</span>
            </div>

            <p className="text-xs text-purple-200/80 mb-4">{STRIPE_PRODUCTS.VIP_PASS_WEEKLY.description}</p>

            <ul className="space-y-2 text-xs text-purple-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                Accès illimité à l'Oracle IA 24/7
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                Toutes les analyses de compatibilité amoureuse
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                Pas de publicité & Support prioritaire
              </li>
            </ul>
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full font-bold shadow-xl shadow-yellow-500/20"
            onClick={() => handleBuy(STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id, 'subscription')}
            disabled={loading === STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id}
          >
            {loading === STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id ? 'Paiement...' : 'Souscrire au Pass VIP (3,99€)'}
          </Button>
        </div>

        {/* Coin Pack */}
        <div className="glass-card p-6 rounded-3xl border border-purple-400/40 flex flex-col justify-between shadow-2xl bg-purple-950/40">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white font-serif">{STRIPE_PRODUCTS.COIN_PACK_5.name}</h2>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black text-white">0,99 €</span>
              <span className="text-xs text-purple-300"> (Achat unique)</span>
            </div>

            <p className="text-xs text-purple-200/80 mb-4">{STRIPE_PRODUCTS.COIN_PACK_5.description}</p>

            <ul className="space-y-2 text-xs text-purple-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                5 consultations d'Oracle ou d'Affinité
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                Pas de récurrence ni abonnement
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                Valable sans limite de durée
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full font-bold"
            onClick={() => handleBuy(STRIPE_PRODUCTS.COIN_PACK_5.id, 'payment')}
            disabled={loading === STRIPE_PRODUCTS.COIN_PACK_5.id}
          >
            {loading === STRIPE_PRODUCTS.COIN_PACK_5.id ? 'Paiement...' : 'Acheter 5 Crédits (0,99€)'}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-purple-300/70 pt-4">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Transactions 100% sécurisées via Stripe SSL</span>
      </div>
    </div>
  );
}
