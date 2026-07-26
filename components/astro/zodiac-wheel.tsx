'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon, Zap, Shield, Compass } from 'lucide-react';
import { ZodiacSign } from '@/lib/astro-engine';

interface SignInfo {
  sign: ZodiacSign;
  symbol: string;
  element: string;
  ruler: string;
  transit: string;
}

const ZODIAC_DATA: SignInfo[] = [
  { sign: 'Bélier', symbol: '♈', element: 'Feu 🔥', ruler: 'Mars', transit: 'Mars insuffle une audace sans limite.' },
  { sign: 'Taureau', symbol: '♉', element: 'Terre 🌍', ruler: 'Vénus', transit: 'Vénus apporte stabilité et sensualité.' },
  { sign: 'Gémeaux', symbol: '♊', element: 'Air 💨', ruler: 'Mercure', transit: 'Mercure stimule les idées brillantes.' },
  { sign: 'Cancer', symbol: '♋', element: 'Eau 💧', ruler: 'Lune', transit: 'La Lune illumine votre intuition naturelle.' },
  { sign: 'Lion', symbol: '♌', element: 'Feu 🔥', ruler: 'Soleil', transit: 'Le Soleil fait rayonner votre charisme.' },
  { sign: 'Vierge', symbol: '♍', element: 'Terre 🌍', ruler: 'Mercure', transit: 'L\'alignement favorise l\'organisation parfaite.' },
  { sign: 'Balance', symbol: '♎', element: 'Air 💨', ruler: 'Vénus', transit: 'Recherche active de l\'harmonie relationnelle.' },
  { sign: 'Scorpion', symbol: '♏', element: 'Eau 💧', ruler: 'Pluton', transit: 'Transformation spirituelle intense.' },
  { sign: 'Sagittaire', symbol: '♐', element: 'Feu 🔥', ruler: 'Jupiter', transit: 'Jupiter élargit vos horizons.' },
  { sign: 'Capricorne', symbol: '♑', element: 'Terre 🌍', ruler: 'Saturne', transit: 'La persévérance porte ses fruits.' },
  { sign: 'Verseau', symbol: '♒', element: 'Air 💨', ruler: 'Uranus', transit: 'Inspiration novatrice et liberté.' },
  { sign: 'Poissons', symbol: '♓', element: 'Eau 💧', ruler: 'Neptune', transit: 'Rêves lucides et connexion cosmique.' },
];

export function ZodiacWheel({ userSign }: { userSign: ZodiacSign }) {
  const [selectedSign, setSelectedSign] = useState<SignInfo>(
    ZODIAC_DATA.find((s) => s.sign === userSign) || ZODIAC_DATA[0]
  );

  return (
    <div className="w-full max-w-xl glass-card p-6 rounded-3xl border-purple-500/30 flex flex-col items-center space-y-6 shadow-2xl my-4">
      <div className="text-center space-y-1">
        <span className="text-xs uppercase tracking-widest text-yellow-300 font-semibold flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Carte Céleste Interactive
        </span>
        <h3 className="text-xl font-bold font-serif text-white">Roue du Zodiaque & Transits</h3>
      </div>

      {/* Interactive Zodiac Wheel Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 w-full">
        {ZODIAC_DATA.map((item) => {
          const isSelected = selectedSign.sign === item.sign;
          const isUserSign = item.sign === userSign;

          return (
            <motion.button
              key={item.sign}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSign(item)}
              className={`p-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'glass-card-gold border-yellow-400 text-yellow-300 scale-105 shadow-lg shadow-yellow-500/20'
                  : 'glass-card border-purple-500/20 text-purple-200 hover:border-purple-400/50'
              }`}
            >
              <span className="text-2xl mb-1">{item.symbol}</span>
              <span className="text-[10px] font-bold tracking-tight">{item.sign}</span>
              {isUserSign && (
                <span className="text-[8px] bg-yellow-400 text-slate-950 font-extrabold px-1.5 py-0.2 rounded-full mt-1">
                  Moi
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Sign Transit Info Banner */}
      <motion.div
        key={selectedSign.sign}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass-card-gold p-4 rounded-2xl border-yellow-400/40 space-y-2 text-xs"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedSign.symbol}</span>
            <div>
              <h4 className="font-bold text-white text-sm font-serif">{selectedSign.sign}</h4>
              <span className="text-[10px] text-yellow-300 font-semibold">
                Élément : {selectedSign.element} • Planète Maître : {selectedSign.ruler}
              </span>
            </div>
          </div>
        </div>

        <p className="text-purple-100 italic bg-purple-950/40 p-2.5 rounded-xl border border-yellow-400/20">
          ✨ <strong>Influence Céleste Actuelle :</strong> {selectedSign.transit}
        </p>
      </motion.div>
    </div>
  );
}
