'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Coins, Heart, MessageSquare, Compass, ArrowRight, RefreshCw, Layers } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { DailyCardFlip } from '@/components/astro/daily-card-flip';
import { ThreeCardSpread } from '@/components/astro/three-card-spread';
import { ZodiacWheel } from '@/components/astro/zodiac-wheel';
import { StreakReward } from '@/components/astro/streak-reward';
import { Button } from '@/components/ui/button';
import { ZodiacSign } from '@/lib/astro-engine';

export default function DashboardPage() {
  const { profile, dailyReading, setDailyReading, openPaywall } = useAstroStore();
  const [loadingCard, setLoadingCard] = useState(false);
  const [spreadMode, setSpreadMode] = useState<'single' | 'three'>('single');

  // Fetch daily tarot card reading on load if not already generated
  useEffect(() => {
    async function loadDailyReading() {
      if (dailyReading) return;
      setLoadingCard(true);
      try {
        const res = await fetch('/api/astro/daily-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sunSign: profile?.sunSign || 'Bélier' }),
        });
        const data = await res.json();
        setDailyReading({
          card: data.card,
          readingText: data.readingText,
          adviceText: data.adviceText,
          loveScore: data.loveScore,
          energyScore: data.energyScore,
          workScore: data.workScore,
          isFlipped: false,
        });
      } catch (err) {
        console.error('Failed to load daily reading:', err);
      } finally {
        setLoadingCard(false);
      }
    }

    loadDailyReading();
  }, [dailyReading, profile?.sunSign, setDailyReading]);

  return (
    <div className="space-y-8 pb-12 flex flex-col items-center">
      {/* Top Banner Profile Summary */}
      <div className="w-full glass-card-gold p-6 rounded-3xl border-yellow-400/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-yellow-400 to-indigo-600 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-xl font-bold font-serif text-yellow-300">
              {profile?.sunSign ? profile.sunSign[0] : '✨'}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-serif">{profile?.name || 'Voyageur Astral'}</h2>
              {profile?.isVip && (
                <span className="text-[10px] bg-yellow-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
                  VIP
                </span>
              )}
            </div>
            <p className="text-xs text-yellow-200/80">
              Signe Solaire : <strong className="text-white">{profile?.sunSign || 'Taureau'}</strong> • Situation : {profile?.loveStatus || 'Célibataire'}
            </p>
          </div>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-4 bg-purple-950/60 p-3 rounded-2xl border border-yellow-400/20">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/60 rounded-xl border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
            <span>Série {profile?.streakCount ?? 1} Jours 🔥</span>
          </div>

          <div
            onClick={() => openPaywall()}
            className="flex items-center gap-1.5 px-3 py-1 bg-purple-900/60 hover:bg-purple-800/80 rounded-xl border border-purple-400/30 text-purple-200 text-xs font-bold cursor-pointer transition-all"
          >
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>{profile?.coinsBalance ?? 3} Crédits</span>
          </div>
        </div>
      </div>

      {/* Streak Reward Chest Banner */}
      <StreakReward />

      {/* Mode Switcher Buttons */}
      <div className="flex items-center gap-2 bg-purple-950/60 p-1.5 rounded-2xl border border-purple-500/30">
        <button
          onClick={() => setSpreadMode('single')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            spreadMode === 'single'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" /> Arcane du Jour (3D)
        </button>
        <button
          onClick={() => setSpreadMode('three')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            spreadMode === 'three'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-purple-300 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> Croix du Destin (3 Cartes)
        </button>
      </div>

      {/* Main Tarot Reading Section */}
      <section className="flex flex-col items-center space-y-4 w-full">
        {spreadMode === 'single' ? (
          loadingCard ? (
            <div className="w-full max-w-sm h-96 glass-card rounded-3xl flex flex-col items-center justify-center gap-3 text-purple-200 text-xs">
              <RefreshCw className="w-8 h-8 text-yellow-300 animate-spin" />
              <span>Harmonisation avec les astres en cours...</span>
            </div>
          ) : (
            <DailyCardFlip />
          )
        ) : (
          <ThreeCardSpread />
        )}
      </section>

      {/* Interactive Zodiac Wheel Section */}
      <ZodiacWheel userSign={(profile?.sunSign as ZodiacSign) || 'Taureau'} />

      {/* Quick Navigation Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <Link href="/oracle">
          <div className="glass-card p-6 rounded-3xl border-amber-500/30 hover:border-amber-400/70 transition-all flex items-center justify-between group cursor-pointer shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">Consulter l'Oracle IA</h3>
                <p className="text-xs text-purple-200/70">Posez vos questions directes à l'intelligence céleste.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/compatibility">
          <div className="glass-card p-6 rounded-3xl border-rose-500/30 hover:border-rose-400/70 transition-all flex items-center justify-between group cursor-pointer shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">Alchimie & Compatibilité</h3>
                <p className="text-xs text-purple-200/70">Calculez le score amoureux et l'accord des signes.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>
    </div>
  );
}
