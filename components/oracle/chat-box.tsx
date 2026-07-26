'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, Coins, Heart, Briefcase, Compass, Loader2 } from 'lucide-react';
import { useAstroStore } from '@/store/use-astro-store';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  perspectives?: string[];
  category?: string;
  timestamp: string;
}

const SAMPLE_QUESTIONS = [
  '❤️ Mon ex va-t-il/elle revenir dans ma vie ?',
  '💼 Vais-je obtenir une promotion ce mois-ci ?',
  '🔮 Quelle grande surprise les astres me réservent ?',
  '🌟 Quel est mon blocage karmique actuel ?',
];

export function OracleChatBox() {
  const { profile, useCoin, openPaywall } = useAstroStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'oracle',
      text: `Salutations stellaires, ${profile?.name || 'Cher Voyageur'}. Je suis l'Oracle d'AstroPulse. Posez-moi la question qui préoccupe votre âme.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend || isLoading) return;

    // Check coins / VIP status
    const hasAccess = useCoin();
    if (!hasAccess) {
      openPaywall(
        'Crédits Étoiles Épuisés',
        'Rechargez vos crédits ou passez VIP pour bénéficier de consultations Oracle illimitées.',
        'coins'
      );
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/astro/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          category,
          sunSign: profile?.sunSign || 'Bélier',
        }),
      });

      const data = await res.json();
      const oracleMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'oracle',
        text: data.response || 'Les voix des astres se sont momentanément troublées, mais soyez certain(e) que la lumière céleste vous protège.',
        perspectives: data.perspectives || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, oracleMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'oracle',
        text: 'Les flux énergétiques cosmiques ont été perturbés. Réessayez dans un instant.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl glass-card rounded-3xl border-purple-500/30 flex flex-col h-[640px] shadow-2xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 border-b border-purple-500/20 bg-purple-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-amber-400 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-serif">L'Oracle IA AstroPulse</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] text-purple-300">Alignement Cosmique Multi-Perspectives</span>
            </div>
          </div>
        </div>

        {/* Coins / VIP Badge */}
        <div className="flex items-center gap-2 bg-purple-900/40 px-3 py-1.5 rounded-full border border-purple-400/30">
          {profile?.isVip ? (
            <span className="text-xs font-bold text-yellow-300 flex items-center gap-1">
              ✨ PASS VIP (Illimité)
            </span>
          ) : (
            <span className="text-xs font-bold text-purple-200 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-yellow-400" />
              {profile?.coinsBalance ?? 3} Crédits
            </span>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 py-2 bg-purple-950/20 border-b border-purple-500/10 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setCategory('general')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
            category === 'general'
              ? 'bg-purple-600 text-white'
              : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
          }`}
        >
          <Compass className="w-3 h-3" /> Général
        </button>
        <button
          onClick={() => setCategory('love')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
            category === 'love'
              ? 'bg-rose-600 text-white'
              : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
          }`}
        >
          <Heart className="w-3 h-3" /> Amour
        </button>
        <button
          onClick={() => setCategory('career')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
            category === 'career'
              ? 'bg-indigo-600 text-white'
              : 'bg-purple-900/30 text-purple-300 hover:bg-purple-900/50'
          }`}
        >
          <Briefcase className="w-3 h-3" /> Travail
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-amber-500/20 text-yellow-300 border border-yellow-400/40'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-md space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-tr-none'
                    : 'glass-card-gold text-purple-50 rounded-tl-none border-yellow-400/30'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Multiple Perspectives / Guidance Choices */}
                {msg.perspectives && msg.perspectives.length > 0 && (
                  <div className="pt-2 border-t border-yellow-400/20 space-y-1.5">
                    <span className="text-[10px] font-bold text-yellow-300 uppercase tracking-wider block">
                      🔮 Voies de Réflexion Proposées par l'Oracle :
                    </span>
                    {msg.perspectives.map((p, i) => (
                      <div
                        key={i}
                        className="bg-purple-950/60 p-2 rounded-xl border border-yellow-400/20 text-[11px] text-purple-100 font-medium leading-normal hover:border-yellow-400/50 transition-colors"
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                )}

                <span className="block text-[9px] text-purple-300/60 text-right mt-1.5">
                  {msg.timestamp}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-yellow-300 border border-yellow-400/40 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="glass-card-gold p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-yellow-200">
              <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
              L'Oracle génère vos voies de réponse personnalisées...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      {messages.length < 3 && (
        <div className="px-4 py-2 flex flex-wrap gap-1.5 bg-purple-950/30 border-t border-purple-500/10">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 px-3 py-1 rounded-full border border-purple-400/20 text-left transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-purple-950/60 border-t border-purple-500/20 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question aux astres..."
          className="flex-1 bg-purple-900/30 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400/80"
        />
        <Button variant="gold" size="sm" type="submit" disabled={isLoading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
