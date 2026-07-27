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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pack Starter 5 Crédits */}
        <div className="glass-card p-6 rounded-3xl border border-purple-400/40 flex flex-col justify-between shadow-xl bg-purple-950/40">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white font-serif">{STRIPE_PRODUCTS.COIN_PACK_5.name}</h2>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black text-white">0,99 €</span>
              <span className="text-xs text-purple-300"> (Achat unique)</span>
            </div>

            <p className="text-xs text-purple-200/80 mb-4">{STRIPE_PRODUCTS.COIN_PACK_5.description}</p>

            <ul className="space-y-2 text-xs text-purple-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                5 tirages / questions d'Oracle
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                Sans abonnement
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full font-bold text-xs"
            onClick={() => handleBuy(STRIPE_PRODUCTS.COIN_PACK_5.id, 'payment')}
            disabled={loading === STRIPE_PRODUCTS.COIN_PACK_5.id}
          >
            {loading === STRIPE_PRODUCTS.COIN_PACK_5.id ? 'Paiement...' : 'Acheter 5 Crédits (0,99€)'}
          </Button>
        </div>

        {/* Pass VIP Weekly */}
        <div className="glass-card-gold p-6 rounded-3xl border-2 border-yellow-400/80 flex flex-col justify-between relative shadow-2xl bg-gradient-to-b from-purple-950/90 to-slate-950 scale-105">
          <div className="absolute top-0 right-0 bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            ⚡ Le Plus Populaire
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
                Transits planétaires & Compatibilité
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                Pas de publicité & Support VIP
              </li>
            </ul>
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full font-bold shadow-xl shadow-yellow-500/20 text-xs"
            onClick={() => handleBuy(STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id, 'subscription')}
            disabled={loading === STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id}
          >
            {loading === STRIPE_PRODUCTS.VIP_PASS_WEEKLY.id ? 'Paiement...' : 'Souscrire Pass VIP (3,99€)'}
          </Button>
        </div>

        {/* Pack Pro 20 Crédits */}
        <div className="glass-card p-6 rounded-3xl border border-indigo-400/50 flex flex-col justify-between shadow-xl bg-purple-950/40 relative">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            🔥 -40% Meilleure Valeur
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-6 h-6 text-indigo-400" />
              <h2 className="text-lg font-bold text-white font-serif">Pack Pro 20 Crédits</h2>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-black text-white">2,99 €</span>
              <span className="text-xs text-purple-300"> (Achat unique)</span>
            </div>

            <p className="text-xs text-purple-200/80 mb-4">20 Crédits Étoiles + Rapport de Numérologie offert.</p>

            <ul className="space-y-2 text-xs text-purple-100 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                20 consultations d'Oracle ou d'Affinité
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                Inclus : Thème de Chemin de Vie
              </li>
            </ul>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full font-bold text-xs border-indigo-400 text-indigo-200 hover:bg-indigo-950"
            onClick={() => handleBuy('price_coin_pack_pro', 'payment')}
            disabled={loading === 'price_coin_pack_pro'}
          >
            {loading === 'price_coin_pack_pro' ? 'Paiement...' : 'Obtenir 20 Crédits (2,99€)'}
          </Button>
        </div>
      </div>

      {/* Customer Reviews & Social Proof */}
      <div className="glass-card p-6 rounded-3xl border-purple-500/20 space-y-4">
        <h3 className="text-center font-bold font-serif text-white text-base">Avis de Nos Membres Célestes ⭐</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-purple-200">
          <div className="bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/20 space-y-1.5">
            <div className="text-yellow-300 font-bold">★★★★★ "Incroyablement précis"</div>
            <p className="italic text-purple-100">"L'Oracle m'a éclairée sur une décision de carrière cruciale. Le Pass VIP vaut 100x son prix."</p>
            <span className="block text-[10px] text-purple-400 font-semibold">— Élodie M., Natif de la Balance</span>
          </div>
          <div className="bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/20 space-y-1.5">
            <div className="text-yellow-300 font-bold">★★★★★ "Alchimie de couple bluffante"</div>
            <p className="italic text-purple-100">"Le test de compatibilité a visé juste à 100% sur notre dynamique de couple avec Thomas."</p>
            <span className="block text-[10px] text-purple-400 font-semibold">— Camilla R., Natif du Scorpion</span>
          </div>
          <div className="bg-purple-950/40 p-3.5 rounded-2xl border border-purple-500/20 space-y-1.5">
            <div className="text-yellow-300 font-bold">★★★★★ "Mon rituel du matin"</div>
            <p className="italic text-purple-100">"Le tirage quotidien du Tarot 3D est devenu ma routine bien-être indispensable."</p>
            <span className="block text-[10px] text-purple-400 font-semibold">— Marc L., Natif du Lion</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-purple-300/70 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Transactions 100% sécurisées via Stripe SSL • Satisfait ou remboursé 14 jours</span>
      </div>
    </div>
  );
}
