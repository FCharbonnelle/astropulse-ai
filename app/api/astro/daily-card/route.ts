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

    // Pick a card based on current date so it's deterministic for the day
    const todayStr = new Date().toISOString().split('T')[0];
    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash * 31 + todayStr.charCodeAt(i)) % TAROT_DECK.length;
    }
    const card = TAROT_DECK[hash];

    // Try OpenAI call, fallback to rich built-in reading if API key is invalid/missing
    let readingText = `${card.name} résonne puissamment dans la maison astrale du ${sign}. Les astres indiquent une journée propice au renouveau et aux initiatives créatives.`;
    let adviceText = `Alignez vos pensées avec vos intentions les plus hautes. Prenez 5 minutes de méditation au soleil.`;
    let loveScore = 88;
    let energyScore = 92;
    let workScore = 84;

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
