'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { playChimeSound } from '@/lib/sound-fx';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      playChimeSound();
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={isMuted ? 'Activer l\'ambiance sonore' : 'Désactiver le son'}
      className="p-2 rounded-full glass-card hover:border-yellow-400/50 text-purple-300 hover:text-yellow-300 transition-all cursor-pointer"
    >
      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-yellow-300 animate-pulse" />}
    </button>
  );
}
