'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { ZodiacSign } from '@/lib/astro-engine';
import { CompatibilityGauge } from '@/components/astro/compatibility-gauge';
import { Button } from '@/components/ui/button';

const ZODIAC_SIGNS: ZodiacSign[] = [
  'Bélier', 'Taureau', 'Gémeaux', 'Cancer',
  'Lion', 'Vierge', 'Balance', 'Scorpion',
  'Sagittaire', 'Capricorne', 'Verseau', 'Poissons',
];

export default function CompatibilityPage() {
  const { profile, useCoin, openPaywall } = useAstroStore();

  const [partnerName, setPartnerName] = useState('Élisa');
  const [partnerSign, setPartnerSign] = useState<ZodiacSign>('Scorpion');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    detailedAnalysis: string;
    isUnlocked: boolean;
  } | null>(null);

  const handleCalculate = async () => {
    if (!partnerName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/astro/compatibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSign: profile?.sunSign || 'Taureau',
          partnerName: partnerName.trim(),
          partnerSign,
        }),
      });

      const data = await res.json();
      setResult({
        score: data.score,
        detailedAnalysis: data.detailedAnalysis,
        isUnlocked: profile?.isVip || false,
      });
    } catch {
      alert('Erreur lors du calcul d\'affinité amoureuse.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlockAnalysis = () => {
    const hasAccess = useCoin();
    if (hasAccess) {
      setResult((prev) => (prev ? { ...prev, isUnlocked: true } : null));
    } else {
      openPaywall(
        'Rapport d\'Affinité Verrouillé',
        'Débloquez l\'analyse complète et les conseils de couple personnalisés de l\'IA.',
        'coins'
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 fill-rose-400" /> Alchimie Vénusienne
        </div>
        <h1 className="text-3xl font-bold font-serif text-white">Calculateur d'Affinité Amoureuse</h1>
        <p className="text-xs text-purple-200/70 max-w-md mx-auto">
          Découvrez la synergie spirituelle, affective et passionnelle entre vous et votre partenaire.
        </p>
      </div>

      {/* Form Input */}
      <div className="glass-card p-6 rounded-3xl border-purple-500/30 space-y-5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-200">Prénom du Partenaire</label>
            <input
              type="text"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Ex: Clara, Thomas..."
              className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-rose-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-purple-200">Signe Astrologique du Partenaire</label>
            <select
              value={partnerSign}
              onChange={(e) => setPartnerSign(e.target.value as ZodiacSign)}
              className="w-full bg-purple-950/80 border border-purple-500/30 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
            >
              {ZODIAC_SIGNS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          variant="gold"
          size="lg"
          onClick={handleCalculate}
          disabled={loading || !partnerName.trim()}
          className="w-full font-bold shadow-xl shadow-rose-900/30"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Calcul de la Carte du Ciel...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" /> Analyser l'Alchimie de Couple
            </>
          )}
        </Button>
      </div>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6"
          >
            {/* Gauge */}
            <CompatibilityGauge
              score={result.score}
              partnerName={partnerName}
              userSign={profile?.sunSign || 'Taureau'}
              partnerSign={partnerSign}
            />

            {/* Detailed Analysis (Blurred if Locked) */}
            <div className="w-full glass-card p-6 rounded-3xl border-purple-500/30 relative overflow-hidden shadow-2xl">
              <h3 className="text-lg font-bold font-serif text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" /> Bilan d'Affinité Astrale
              </h3>

              <div className={`space-y-4 text-xs text-purple-100 leading-relaxed ${!result.isUnlocked ? 'blur-sm select-none opacity-50 pointer-events-none' : ''}`}>
                <p className="whitespace-pre-line">{result.detailedAnalysis}</p>
              </div>

              {/* Locked Overlay Paywall Trigger */}
              {!result.isUnlocked && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-950/80 border border-yellow-400/50 flex items-center justify-center text-yellow-300">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-serif">Analyse Approfondie Verrouillée</h4>
                  <p className="text-xs text-purple-200/80 max-w-xs">
                    Révélez la chimie cachée, les pièges à éviter et le mantra céleste du couple.
                  </p>
                  <Button variant="gold" size="default" onClick={handleUnlockAnalysis} className="font-bold">
                    Débloquer avec 1 Crédit Étoile 🔓
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
