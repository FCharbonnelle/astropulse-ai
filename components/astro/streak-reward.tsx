'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Coins, Gift, CheckCircle2 } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { playCoinSound } from '@/lib/sound-fx';
import { Button } from '@/components/ui/button';

export function StreakReward() {
  const { profile, addCoins } = useAstroStore();
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    if (claimed) return;

    playCoinSound();
    addCoins(1);
    setClaimed(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#eab308', '#a855f7', '#ffffff'],
    });
  };

  return (
    <div className="glass-card-gold p-4 rounded-3xl border-yellow-400/40 flex items-center justify-between gap-4 w-full max-w-xl my-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-yellow-400/50 flex items-center justify-center text-amber-300">
          <Flame className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white font-serif">Série Astrale : {profile?.streakCount || 1} Jours</h4>
            <span className="text-[10px] bg-yellow-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
              🔥 En Feu
            </span>
          </div>
          <p className="text-[11px] text-yellow-200/80">
            Revenez chaque jour pour débloquer des Crédits Étoiles gratuits !
          </p>
        </div>
      </div>

      <Button
        variant={claimed ? 'outline' : 'gold'}
        size="sm"
        onClick={handleClaim}
        disabled={claimed}
        className="font-bold text-xs flex-shrink-0"
      >
        {claimed ? (
          <>
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-400" /> Réclamé (+1 🪙)
          </>
        ) : (
          <>
            <Gift className="w-4 h-4 mr-1" /> Réclamer (+1 🪙)
          </>
        )}
      </Button>
    </div>
  );
}
