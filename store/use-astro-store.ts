import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TarotCard } from '@/lib/astro-engine';

export interface UserProfile {
  id?: string;
  name: string;
  birthDate: string;
  birthTime?: string;
  birthPlace?: string;
  sunSign: string;
  ascendantSign?: string;
  loveStatus: string;
  isVip: boolean;
  coinsBalance: number;
  streakCount: number;
  lastReadingDate?: string;
  lastStreakClaimDate?: string;
}

export interface OracleMessage {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  perspectives?: string[];
  category?: string;
  timestamp: string;
}

export interface DailyReadingData {
  card: TarotCard;
  readingText: string;
  adviceText: string;
  loveScore: number;
  energyScore: number;
  workScore: number;
  isFlipped: boolean;
}

interface AstroStoreState {
  profile: UserProfile | null;
  dailyReading: DailyReadingData | null;
  oracleMessages: OracleMessage[];
  paywallModal: {
    isOpen: boolean;
    title: string;
    description: string;
    productType?: 'vip' | 'coins';
  };
  setProfile: (profile: Partial<UserProfile>) => void;
  setDailyReading: (reading: DailyReadingData) => void;
  setOracleMessages: (messages: OracleMessage[]) => void;
  flipDailyCard: () => void;
  useCoin: () => boolean;
  addCoins: (amount: number) => void;
  setVipStatus: (isVip: boolean) => void;
  openPaywall: (title?: string, description?: string, productType?: 'vip' | 'coins') => void;
  closePaywall: () => void;
}

export const useAstroStore = create<AstroStoreState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Stellari',
        birthDate: '1998-05-14',
        sunSign: 'Taureau',
        loveStatus: 'searching',
        isVip: false,
        coinsBalance: 3,
        streakCount: 3,
      },
      dailyReading: null,
      oracleMessages: [],
      paywallModal: {
        isOpen: false,
        title: 'Débloquez votre Destinée',
        description: 'Accédez aux révélations complètes de l\'Oracle IA.',
        productType: 'coins',
      },

      setProfile: (newProfile) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...newProfile } : (newProfile as UserProfile),
        })),

      setDailyReading: (reading) =>
        set({ dailyReading: reading }),

      setOracleMessages: (messages) =>
        set({ oracleMessages: messages }),

      flipDailyCard: () =>
        set((state) => ({
          dailyReading: state.dailyReading
            ? { ...state.dailyReading, isFlipped: true }
            : null,
        })),

      useCoin: () => {
        const { profile } = get();
        if (!profile) return false;
        if (profile.isVip) return true; // VIP has unlimited usage
        if (profile.coinsBalance > 0) {
          set({
            profile: {
              ...profile,
              coinsBalance: profile.coinsBalance - 1,
            },
          });
          return true;
        }
        return false;
      },

      addCoins: (amount) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, coinsBalance: state.profile.coinsBalance + amount }
            : null,
        })),

      setVipStatus: (isVip) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, isVip } : null,
        })),

      openPaywall: (title, description, productType = 'coins') =>
        set({
          paywallModal: {
            isOpen: true,
            title: title || 'Révélation Céleste Verrouillée',
            description: description || 'Débloquez l\'analyse intégrale avec vos crédits ou le Pass VIP.',
            productType,
          },
        }),

      closePaywall: () =>
        set((state) => ({
          paywallModal: { ...state.paywallModal, isOpen: false },
        })),
    }),
    {
      name: 'astropulse-storage',
    }
  )
);
