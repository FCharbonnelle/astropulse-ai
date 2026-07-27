'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Heart, MessageSquare, Flame, ShieldCheck, ArrowRight, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto pt-6 relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/60 border border-yellow-400/50 text-yellow-300 text-xs font-bold uppercase tracking-widest shadow-xl border-glow-gold animate-pulse-glow"
        >
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" /> L'EXPÉRIENCE ASTROLOGIQUE IA N°1 EN FRANCE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black font-serif leading-tight text-white tracking-wide"
        >
          Décodez votre Destinée avec l'
          <span className="gold-text-shimmer block mt-1">
            Oracle IA Astrologique
          </span>
        </motion.h1>

        <p className="text-base md:text-lg text-purple-200/90 max-w-xl mx-auto leading-relaxed">
          Tirages de Tarot 3D quotidiens, alchimie de couple ultra-précise, calcul de votre <strong className="text-yellow-300">Chemin de Vie</strong> et guidance spirituelle en direct.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/onboarding">
            <Button variant="gold" size="lg" className="shadow-2xl shadow-yellow-500/30">
              <Sparkles className="w-5 h-5 mr-2" /> Calculer mon Thème Astral Gratuit
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              <Eye className="w-5 h-5 mr-2" /> Tirage du Jour (3D)
            </Button>
          </Link>
        </div>

        {/* Social Proof Counter */}
        <div className="flex items-center justify-center gap-6 pt-6 text-xs text-purple-300 border-t border-purple-500/20 max-w-md mx-auto">
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400" />
            ))}
          </div>
          <span>+24 000 consultations stellaires réalisées</span>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card p-6 rounded-3xl border-purple-500/30 flex flex-col justify-between space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-900/60 border border-purple-400/40 flex items-center justify-center text-yellow-300">
            <Compass className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-serif text-white">Tirage de Tarot 3D</h3>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Retournez l'arcane majeure du jour et recevez une interprétation ésotérique sur-mesure avec jauges d'énergie (Amour, Énergie, Travail).
            </p>
          </div>
          <Link href="/dashboard" className="text-xs font-bold text-yellow-300 flex items-center gap-1 hover:underline">
            Tirer ma carte <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card p-6 rounded-3xl border-rose-500/30 flex flex-col justify-between space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-950/60 border border-rose-400/40 flex items-center justify-center text-rose-400">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-serif text-white">Alchimie & Compatibilité</h3>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Analysez les affinités cachées avec votre partenaire grâce au calcul vénusien et recevez un bilan amourologique complet.
            </p>
          </div>
          <Link href="/compatibility" className="text-xs font-bold text-rose-300 flex items-center gap-1 hover:underline">
            Tester mon couple <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card p-6 rounded-3xl border-amber-500/30 flex flex-col justify-between space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-serif text-white">Oracle IA 24/7</h3>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Posez toutes vos questions sur l'amour, l'avenir professionnel et votre chemin d'âme à l'Oracle conversationnel.
            </p>
          </div>
          <Link href="/oracle" className="text-xs font-bold text-amber-300 flex items-center gap-1 hover:underline">
            Consulter l'Oracle <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="glass-card-gold p-8 rounded-3xl border-yellow-400/40 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white font-serif">Avis des Initiés AstroPulse</h2>
          <p className="text-xs text-yellow-200/80">Ce que disent nos membres guidés par la lumière céleste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-purple-950/60 p-4 rounded-2xl border border-yellow-400/20 space-y-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400" />
              ))}
            </div>
            <p className="text-purple-100 italic">
              "L'Oracle m'a prévenue d'une opportunité pro essentielle. Le tirage du Tarot 3D est d'une précision bluffante !"
            </p>
            <span className="block font-bold text-yellow-300">— Camille M. (Scorpion ♏)</span>
          </div>

          <div className="bg-purple-950/60 p-4 rounded-2xl border border-yellow-400/20 space-y-2">
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400" />
              ))}
            </div>
            <p className="text-purple-100 italic">
              "Le test de compatibilité avec mon copain a révélé exactement nos dynamiques relationnelles. Le Pass VIP vaut 100% le coup !"
            </p>
            <span className="block font-bold text-yellow-300">— Alexandre L. (Balance ♎)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
