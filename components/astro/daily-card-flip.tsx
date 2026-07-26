'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Compass, Eye, Heart, Zap, Briefcase } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { Button } from '@/components/ui/button';

export function DailyCardFlip() {
  const { dailyReading, flipDailyCard, profile } = useAstroStore();
  const [isFlipping, setIsFlipping] = useState(false);

  if (!dailyReading) return null;

  const handleFlip = () => {
    if (dailyReading.isFlipped || isFlipping) return;
    
    setIsFlipping(true);
    flipDailyCard();

    // Trigger golden star confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#eab308', '#6366f1', '#ffffff'],
    });

    setTimeout(() => {
      setIsFlipping(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-6">
      {/* 3D Flip Card Container */}
      <div className="perspective-1000 w-full max-w-sm h-[480px] cursor-pointer group" onClick={handleFlip}>
        <motion.div
          className="w-full h-full relative transform-style-3d transition-transform duration-700 ease-out"
          animate={{ rotateY: dailyReading.isFlipped ? 180 : 0 }}
        >
          {/* FRONT (Card Back Pattern) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card border-2 border-purple-500/40 p-6 flex flex-col items-center justify-between backface-hidden shadow-2xl hover:border-yellow-400/60 transition-all duration-300">
            <div className="w-full border-t border-b border-purple-400/20 py-2 flex items-center justify-between text-xs text-purple-300 tracking-widest uppercase">
              <span>AstroPulse AI</span>
              <span>• {profile?.sunSign || 'Astres'} •</span>
              <span>Tirage du Jour</span>
            </div>

            {/* Central Mystical Symbol */}
            <div className="w-32 h-32 rounded-full border border-purple-400/30 flex items-center justify-center bg-purple-950/40 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <div className="w-24 h-24 rounded-full border border-yellow-400/40 flex items-center justify-center bg-gradient-to-tr from-purple-900/60 to-indigo-900/60 animate-pulse-glow">
                <Sparkles className="w-12 h-12 text-yellow-300 animate-spin-slow" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h4 className="text-lg font-bold text-yellow-300 font-serif tracking-wider">
                Toucher pour Révéler
              </h4>
              <p className="text-xs text-purple-200/70 max-w-[240px]">
                L'Univers a tiré une arcane majeure pour guider vos pas aujourd'hui.
              </p>
            </div>

            <Button variant="gold" size="sm" className="w-full font-bold">
              <Eye className="w-4 h-4 mr-2" /> Révéler mon Arcane
            </Button>
          </div>

          {/* BACK (Card Front Revealed) */}
          <div className="absolute inset-0 w-full h-full rounded-3xl glass-card-gold border-2 border-yellow-400/60 p-5 flex flex-col items-center justify-between backface-hidden rotate-y-180 shadow-2xl overflow-y-auto">
            {/* Header Badge */}
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-bold text-yellow-300 bg-yellow-950/60 px-3 py-1 rounded-full border border-yellow-400/30">
                {dailyReading.card.arcana} Arcane
              </span>
              <span className="text-xs font-semibold text-purple-200 bg-purple-900/40 px-3 py-1 rounded-full">
                Élément {dailyReading.card.element}
              </span>
            </div>

            {/* Card Image */}
            <div className="relative w-full h-44 rounded-2xl overflow-hidden my-3 border border-yellow-400/40 shadow-md">
              <img
                src={dailyReading.card.imageUrl}
                alt={dailyReading.card.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-2 left-3 right-3 text-center">
                <h3 className="text-lg font-bold text-white font-serif tracking-wide drop-shadow-md">
                  {dailyReading.card.name}
                </h3>
              </div>
            </div>

            {/* Keywords */}
            <div className="flex flex-wrap gap-1 justify-center mb-2">
              {dailyReading.card.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded-md border border-purple-400/20">
                  #{kw}
                </span>
              ))}
            </div>

            {/* Reading text */}
            <p className="text-xs text-purple-100 text-center leading-relaxed italic bg-purple-950/40 p-3 rounded-xl border border-purple-500/20">
              "{dailyReading.readingText}"
            </p>
          </div>
        </motion.div>
      </div>

      {/* Energy Scores Section (Visible when Flipped) */}
      {dailyReading.isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-sm mt-6 space-y-4"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-card p-3 rounded-2xl flex flex-col items-center text-center border-rose-500/30">
              <Heart className="w-5 h-5 text-rose-400 mb-1" />
              <span className="text-[11px] text-purple-300">Amour</span>
              <span className="text-lg font-bold text-rose-300">{dailyReading.loveScore}%</span>
            </div>
            <div className="glass-card p-3 rounded-2xl flex flex-col items-center text-center border-amber-500/30">
              <Zap className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-[11px] text-purple-300">Énergie</span>
              <span className="text-lg font-bold text-amber-300">{dailyReading.energyScore}%</span>
            </div>
            <div className="glass-card p-3 rounded-2xl flex flex-col items-center text-center border-indigo-500/30">
              <Briefcase className="w-5 h-5 text-indigo-400 mb-1" />
              <span className="text-[11px] text-purple-300">Travail</span>
              <span className="text-lg font-bold text-indigo-300">{dailyReading.workScore}%</span>
            </div>
          </div>

          <div className="glass-card-gold p-4 rounded-2xl border-yellow-400/40">
            <div className="flex items-center gap-2 mb-2 text-yellow-300 font-semibold text-sm">
              <Compass className="w-4 h-4" />
              Conseil de l'Oracle
            </div>
            <p className="text-xs text-yellow-100 leading-relaxed">
              {dailyReading.adviceText}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
