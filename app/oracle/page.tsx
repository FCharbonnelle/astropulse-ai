'use client';

import React from 'react';
import { OracleChatBox } from '@/components/oracle/chat-box';
import { Sparkles } from 'lucide-react';

export default function OraclePage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" /> Voyance IA Directe
        </div>
        <h1 className="text-3xl font-bold font-serif text-white">L'Oracle AstroPulse</h1>
        <p className="text-xs text-purple-200/70 max-w-sm mx-auto">
          Posez vos questions sur l'amour, l'avenir professionnel et votre chemin d'âme.
        </p>
      </div>

      <OracleChatBox />
    </div>
  );
}
