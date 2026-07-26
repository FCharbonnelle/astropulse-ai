'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Eye, Compass, Heart } from 'lucide-react';
import { TAROT_DECK, TarotCard } from '@/lib/astro-engine';
import { useAstroStore } from '@/store/use-astro-store';
import { playCardFlipSound, playChimeSound } from '@/lib/sound-fx';
import { Button } from '@/components/ui/button';

interface SpreadState {
  past: TarotCard;
  present: TarotCard;
  future: TarotCard;
  flipped: { past: boolean; present: boolean; future: boolean };
}

export function ThreeCardSpread() {
  const { profile } = useAstroStore();

  const [spread, setSpread] = useState<SpreadState>(() => {
    // Pick 3 unique cards
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    return {
      past: shuffled[0],
      present: shuffled[1],
      future: shuffled[2],
      flipped: { past: false, present: false, future: false },
    };
  });

  const flipCard = (position: 'past' | 'present' | 'future') => {
    if (spread.flipped[position]) return;

    playCardFlipSound();

    setSpread((prev) => {
      const nextFlipped = { ...prev.flipped, [position]: true };
      
      // If all 3 flipped, trigger fireworks confetti & chime
      if (nextFlipped.past && nextFlipped.present && nextFlipped.future) {
        setTimeout(() => {
          playChimeSound();
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#a855f7', '#eab308', '#ec4899', '#ffffff'],
          });
        }, 400);
      }

      return { ...prev, flipped: nextFlipped };
    });
  };

  const allFlipped = spread.flipped.past && spread.flipped.present && spread.flipped.future;

  return (
    <div className="w-full flex flex-col items-center space-y-6 my-6">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Tirage de la Croix du Destin
        </span>
        <h3 className="text-2xl font-bold font-serif text-white">Tirage 3 Cartes (Passé • Présent • Futur)</h3>
      </div>

      {/* 3 Cards Container Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {[
          { pos: 'past' as const, label: '1. Passé (Racines)', card: spread.past },
          { pos: 'present' as const, label: '2. Présent (Action)', card: spread.present },
          { pos: 'future' as const, label: '3. Futur (Destinée)', card: spread.future },
        ].map(({ pos, label, card }) => {
          const isFlipped = spread.flipped[pos];

          return (
            <div key={pos} className="flex flex-col items-center space-y-2">
              <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">{label}</span>

              <div
                className="perspective-1000 w-full h-80 cursor-pointer"
                onClick={() => flipCard(pos)}
              >
                <motion.div
                  className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-out"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* FRONT (Card Back) */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl glass-card border-2 border-purple-500/40 p-4 flex flex-col items-center justify-between backface-hidden shadow-xl hover:border-yellow-400/60 transition-all">
                    <span className="text-[10px] text-purple-300 uppercase tracking-widest">AstroPulse</span>
                    <div className="w-16 h-16 rounded-full border border-yellow-400/40 flex items-center justify-center bg-purple-900/40 animate-pulse-glow">
                      <Sparkles className="w-8 h-8 text-yellow-300" />
                    </div>
                    <Button variant="gold" size="sm" className="w-full text-xs font-bold">
                      <Eye className="w-3.5 h-3.5 mr-1" /> Retourner
                    </Button>
                  </div>

                  {/* BACK (Card Revealed) */}
                  <div className="absolute inset-0 w-full h-full rounded-2xl glass-card-gold border-2 border-yellow-400/60 p-3 flex flex-col items-center justify-between backface-hidden rotate-y-180 shadow-xl overflow-y-auto">
                    <span className="text-[10px] font-bold text-yellow-300 uppercase bg-yellow-950/60 px-2 py-0.5 rounded-full border border-yellow-400/30">
                      {card.arcana} Arcane
                    </span>

                    <div className="relative w-full h-32 rounded-xl overflow-hidden my-2 border border-yellow-400/30">
                      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-1 left-2 right-2 text-center text-xs font-bold text-white font-serif">
                        {card.name}
                      </span>
                    </div>

                    <p className="text-[11px] text-purple-100 text-center italic bg-purple-950/40 p-2 rounded-lg border border-purple-500/20">
                      "{card.summary}"
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis Report when all 3 flipped */}
      {allFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl glass-card-gold p-5 rounded-3xl border-yellow-400/40 space-y-3 text-xs shadow-2xl"
        >
          <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
            <Compass className="w-5 h-5 text-yellow-300" /> Synthèse de la Croix du Destin
          </h4>
          <p className="text-purple-100 leading-relaxed">
            Votre passé sous l'égide de <strong>{spread.past.name}</strong> a forgé vos bases. Aujourd'hui, <strong>{spread.present.name}</strong> vous invite à agir en conscience. Vers l'avenir, <strong>{spread.future.name}</strong> s'annonce comme la clé de votre épanouissement spirituel pour {profile?.sunSign || 'votre signe'}.
          </p>
        </motion.div>
      )}
    </div>
  );
}
