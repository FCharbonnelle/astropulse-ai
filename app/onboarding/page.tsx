'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { getZodiacSign } from '@/lib/astro-engine';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  const router = useRouter();
  const { setProfile } = useAstroStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '1998-05-14',
    birthTime: '14:30',
    birthPlace: 'Paris, France',
    loveStatus: 'single',
  });

  const computedSign = getZodiacSign(formData.birthDate);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save profile to Zustand store
      setProfile({
        name: formData.name || 'Voyageur Astral',
        birthDate: formData.birthDate,
        birthTime: formData.birthTime,
        birthPlace: formData.birthPlace,
        sunSign: computedSign,
        loveStatus: formData.loveStatus,
        coinsBalance: 3,
        streakCount: 1,
      });

      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 flex flex-col items-center justify-center min-h-[75vh]">
      {/* Wizard Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Configuration de la Carte du Ciel
        </div>
        <h1 className="text-3xl font-bold font-serif text-white">Révélez Votre Alignement Astral</h1>
        <p className="text-xs text-purple-200/70">
          Étape {step} sur 3 • Renseignez vos coordonnées de naissance célestes.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-purple-950/60 rounded-full h-2 border border-purple-500/20 mb-8 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-purple-500 via-yellow-400 to-amber-500 h-full"
          initial={{ width: '33%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Step Form Container */}
      <div className="w-full glass-card p-8 rounded-3xl border-purple-500/40 shadow-2xl relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Prénom ou Identifiant Céleste
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Stellari"
                  className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" /> Date de Naissance
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Live Computed Sign Preview */}
              <div className="glass-card-gold p-4 rounded-2xl border-yellow-400/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-yellow-300 font-semibold block">
                    Votre Signe Solaire Calculé :
                  </span>
                  <span className="text-xl font-bold font-serif text-white">{computedSign}</span>
                </div>
                <div className="text-2xl">✨</div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" /> Heure de Naissance (pour le calcul de l'Ascendant)
                </label>
                <input
                  type="time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-purple-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-400" /> Lieu de Naissance
                </label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  placeholder="Ex: Lyon, France"
                  className="w-full bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-purple-300/40 focus:outline-none focus:border-yellow-400"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <label className="text-xs font-semibold text-purple-200 flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-rose-400" /> Situation Amoureuse Actuelle
              </label>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'single', label: 'Célibataire 🔮' },
                  { id: 'in_relationship', label: 'En Couple ❤️' },
                  { id: 'complicated', label: 'C\'est Compliqué 🌀' },
                  { id: 'searching', label: 'En Quête d\'Âme Sœur ✨' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, loveStatus: opt.id })}
                    className={`p-4 rounded-2xl border text-xs font-bold text-center transition-all ${
                      formData.loveStatus === opt.id
                        ? 'bg-gradient-to-r from-purple-700 to-indigo-700 border-yellow-400 text-white shadow-lg shadow-purple-900/50 scale-105'
                        : 'glass-card border-purple-500/20 text-purple-200 hover:border-purple-400/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Controls */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-purple-500/20">
          {step > 1 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(step - 1)}
            >
              Retour
            </Button>
          ) : <div />}

          <Button variant="gold" size="default" onClick={handleNext} className="font-bold">
            {step === 3 ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" /> Valider mon Thème Astral
              </>
            ) : (
              <>
                Suivant <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
