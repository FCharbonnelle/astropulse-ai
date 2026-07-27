'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface CompatibilityGaugeProps {
  score: number;
  partnerName: string;
  userSign: string;
  partnerSign: string;
}

export function CompatibilityGauge({
  score,
  partnerName,
  userSign,
  partnerSign,
}: CompatibilityGaugeProps) {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 glass-card rounded-3xl border-purple-500/40 relative overflow-hidden my-4 w-full max-w-md">
      {/* Background Sparkles */}
      <div className="absolute top-4 left-6 text-purple-400/40 animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-4 right-6 text-yellow-400/40 animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="text-center mb-4">
        <h4 className="text-sm font-semibold uppercase tracking-widest text-purple-300">
          Alchimie Céleste
        </h4>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="text-base font-bold text-white">{userSign}</span>
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-bounce" />
          <span className="text-base font-bold text-white">{partnerName} ({partnerSign})</span>
        </div>
      </div>

      {/* SVG Circular Progress Gauge */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="rgba(168, 85, 247, 0.15)"
            strokeWidth="14"
            fill="transparent"
          />
          {/* Animated score circle */}
          <motion.circle
            cx="90"
            cy="90"
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute flex flex-col items-center justify-center">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-300 to-yellow-300 font-serif"
          >
            {score}%
          </motion.span>
          <span className="text-[11px] font-medium text-purple-200 uppercase tracking-wider mt-1">
            Affinité Vénusienne
          </span>
        </div>
      </div>
    </div>
  );
}
