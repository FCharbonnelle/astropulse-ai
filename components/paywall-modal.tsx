'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Zap, CheckCircle2, ShieldCheck, Crown, Coins } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { Button } from '@/components/ui/button';

export function PaywallModal() {
  const { paywallModal, closePaywall } = useAstroStore();
  const [loadingProduct, setLoadingProduct] = useState<string | null>(null);

  if (!paywallModal.isOpen) return null;

  const handleCheckout = async (priceId: string, mode: 'subscription' | 'payment') => {
    setLoadingProduct(priceId);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Redirection vers le paiement Stripe...');
      }
    } catch {
      alert('Erreur de connexion au service de paiement Stripe.');
    } finally {
      setLoadingProduct(null);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg glass-card-gold rounded-3xl p-6 border-2 border-yellow-400/50 relative shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={closePaywall}
            className="absolute top-4 right-4 text-purple-300 hover:text-white bg-purple-950/60 p-1.5 rounded-full border border-purple-400/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-950/80 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Offre Céleste Exclusive
            </div>
            <h2 className="text-2xl font-bold text-white font-serif tracking-wide">
              {paywallModal.title}
            </h2>
            <p className="text-xs text-purple-200/80 max-w-xs mx-auto leading-relaxed">
              {paywallModal.description}
            </p>
          </div>

          {/* Pricing Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* VIP Weekly Pass */}
            <div className="glass-card p-4 rounded-2xl border-2 border-yellow-400/80 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-purple-950/80 to-slate-950">
              <div className="absolute top-0 right-0 bg-yellow-400 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl uppercase">
                Populaire
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-sm font-bold text-white">Pass VIP Astral</h3>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-black text-yellow-300">3,99€</span>
                  <span className="text-xs text-purple-300"> / semaine</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-purple-200 mb-4">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                    Oracle IA en direct illimité
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                    Rapports de compatibilité complets
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                    Badge VIP & Pas de pub
                  </li>
                </ul>
              </div>

              <Button
                variant="gold"
                size="sm"
                className="w-full font-bold text-xs"
                onClick={() => handleCheckout('price_vip_weekly', 'subscription')}
                disabled={loadingProduct === 'price_vip_weekly'}
              >
                {loadingProduct === 'price_vip_weekly' ? 'Paiement...' : 'Débloquer Tout (3,99€)'}
              </Button>
            </div>

            {/* Coin Pack */}
            <div className="glass-card p-4 rounded-2xl border border-purple-400/30 flex flex-col justify-between bg-purple-950/40">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-purple-400" />
                  <h3 className="text-sm font-bold text-white">Pack 5 Crédits</h3>
                </div>

                <div className="mb-3">
                  <span className="text-2xl font-black text-white">0,99€</span>
                  <span className="text-xs text-purple-300"> (Unique)</span>
                </div>

                <ul className="space-y-1.5 text-[11px] text-purple-200 mb-4">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    5 tirages / questions d'Oracle
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    Sans engagement
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    Actif immédiatement
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full font-bold text-xs"
                onClick={() => handleCheckout('price_coin_pack', 'payment')}
                disabled={loadingProduct === 'price_coin_pack'}
              >
                {loadingProduct === 'price_coin_pack' ? 'Paiement...' : 'Acheter 5 Crédits (0,99€)'}
              </Button>
            </div>
          </div>

          {/* Security Guarantee */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-purple-300/70 border-t border-purple-500/20 pt-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Paiement sécurisé par Stripe • Annulation à tout moment</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
