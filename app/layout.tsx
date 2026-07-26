import type { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { PaywallModal } from '@/components/paywall-modal';
import { StarfieldBg } from '@/components/ui/starfield-bg';
import { SoundToggle } from '@/components/ui/sound-toggle';
import Link from 'next/link';
import { Sparkles, Compass, Heart, MessageSquare, ShoppingBag, Flame } from 'lucide-react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'AstroPulse AI - Horoscope, Tarot & Oracle IA',
  description: 'Révélez votre destinée astrale guidée par l\'intelligence artificielle cosmique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="cosmic-bg text-purple-50 min-h-screen flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
        {/* Floating Canvas Starfield & Meteors Background */}
        <StarfieldBg />

        {/* Top Navbar */}
        <header className="sticky top-0 z-40 w-full glass-card border-b border-purple-500/20 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-yellow-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                </div>
              </div>
              <span className="text-xl font-bold font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-yellow-200 to-amber-400">
                AstroPulse AI
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-purple-200">
              <Link href="/dashboard" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Compass className="w-4 h-4 text-purple-400" /> Mon Ciel
              </Link>
              <Link href="/compatibility" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <Heart className="w-4 h-4 text-rose-400" /> Compatibilité
              </Link>
              <Link href="/oracle" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <MessageSquare className="w-4 h-4 text-amber-400" /> Oracle IA
              </Link>
              <Link href="/store" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors">
                <ShoppingBag className="w-4 h-4 text-emerald-400" /> Boutique
              </Link>
            </nav>

            {/* Action CTA & Sound Toggle */}
            <div className="flex items-center gap-3">
              <SoundToggle />

              <Link
                href="/onboarding"
                className="text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-4 py-2 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 fill-slate-950" /> Thème Astral
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 relative z-10">
          {children}
        </main>

        {/* Global Paywall Impulse Modal */}
        <PaywallModal />

        {/* Mobile Navigation Footer Bar */}
        <footer className="md:hidden sticky bottom-0 z-40 w-full glass-card border-t border-purple-500/20 px-4 py-3 flex items-center justify-around text-xs font-medium text-purple-300">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 hover:text-yellow-300">
            <Compass className="w-5 h-5 text-purple-400" /> Ciel
          </Link>
          <Link href="/compatibility" className="flex flex-col items-center gap-1 hover:text-yellow-300">
            <Heart className="w-5 h-5 text-rose-400" /> Affinité
          </Link>
          <Link href="/oracle" className="flex flex-col items-center gap-1 hover:text-yellow-300">
            <MessageSquare className="w-5 h-5 text-amber-400" /> Oracle
          </Link>
          <Link href="/store" className="flex flex-col items-center gap-1 hover:text-yellow-300">
            <ShoppingBag className="w-5 h-5 text-emerald-400" /> Boutique
          </Link>
        </footer>
      </body>
    </html>
  );
}
