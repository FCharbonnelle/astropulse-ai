import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { TAROT_DECK, DAILY_CARD_PROMPT } from '@/lib/astro-engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-dummy',
});

export async function POST(req: Request) {
  try {
    const { sunSign } = await req.json();
    const sign = sunSign || 'Bélier';

    // Pick a card based on current date + sun sign so different signs get distinct cards
    const seed = `${new Date().toISOString().split('T')[0]}_${sign}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 37 + seed.charCodeAt(i)) % TAROT_DECK.length;
    }
    const card = TAROT_DECK[Math.abs(hash)];

    // Rich varied fallback reading
    const readings = [
      `${card.name} résonne avec puissance dans le ciel du ${sign}. ${card.summary} Une vague d'inspiration débloquera vos projets aujourd'hui.`,
      `Sous le regard bénéfique des astres, ${card.name} vous transmet son énergie pour le signe du ${sign}. Mots-clés du jour : ${card.keywords.join(', ')}.`,
      `L'arcane ${card.name} s'invite dans votre thème quotidien (${sign}). Accueillez cette vibration pour manifester vos désirs profonds.`
    ];

    const advices = [
      `Prenez un moment pour respirer en conscience et écouter vos pressentiments avant toute décision majeure.`,
      `Exprimez vos intentions à voix haute et accordez-vous une pause régénératrice en fin de journée.`,
      `Portez votre attention sur la gratitude : l'univers répond favorablement à votre attitude positive.`
    ];

    let readingText = readings[Math.abs(hash) % readings.length];
    let adviceText = advices[Math.abs(hash) % advices.length];
    let loveScore = 75 + (Math.abs(hash * 7) % 23);
    let energyScore = 70 + (Math.abs(hash * 11) % 28);
    let workScore = 72 + (Math.abs(hash * 13) % 26);

    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('dummy')) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Tu es un astrologue mystique expert et tarologue professionnel.',
            },
            {
              role: 'user',
              content: DAILY_CARD_PROMPT(sign, card.name, card.keywords.join(', ')),
            },
          ],
          response_format: { type: 'json_object' },
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          readingText = parsed.readingText || readingText;
          adviceText = parsed.adviceText || adviceText;
          loveScore = parsed.loveScore || loveScore;
          energyScore = parsed.energyScore || energyScore;
          workScore = parsed.workScore || workScore;
        }
      } catch (err) {
        console.warn('OpenAI fallback triggered for daily-card:', err);
      }
    }

    return NextResponse.json({
      card,
      readingText,
      adviceText,
      loveScore,
      energyScore,
      workScore,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate daily tarot reading' },
      { status: 500 }
    );
  }
}
