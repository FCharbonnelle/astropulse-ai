import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { calculateCompatibilityScore, COMPATIBILITY_PROMPT, ZodiacSign } from '@/lib/astro-engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-dummy',
});

export async function POST(req: Request) {
  try {
    const { userSign, partnerName, partnerSign } = await req.json();

    if (!userSign || !partnerName || !partnerSign) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    const score = calculateCompatibilityScore(userSign as ZodiacSign, partnerSign as ZodiacSign);

    let detailedAnalysis = `L'alchimie entre le ${userSign} et le ${partnerSign} ({partnerName}) est guidée par une puissante synergie stellaire. 
    
    1. Chimie Élémentaire : Vos éléments célestes s'entrelacent pour créer une attirance magnétique naturelle. La passion du ${userSign} trouve un écho vibrant auprès de ${partnerName}.
    
    2. Défis d'Âme : Prenez garde aux malentendus lors des rétrogradations de Mercure. La communication bienveillante sera votre plus grand bouclier.
    
    3. Mantra Céleste du Couple : "Unis par les astres, forts dans la vérité du cœur."`;

    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('dummy')) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Tu es un astrologue de couple renommé expert en alchimie amoureuse.',
            },
            {
              role: 'user',
              content: COMPATIBILITY_PROMPT(userSign, partnerName, partnerSign),
            },
          ],
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          detailedAnalysis = content;
        }
      } catch (err) {
        console.warn('OpenAI fallback triggered for compatibility:', err);
      }
    }

    return NextResponse.json({
      score,
      detailedAnalysis,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to calculate compatibility' },
      { status: 500 }
    );
  }
}
