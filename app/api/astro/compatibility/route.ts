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

    const compatibilityVariations = [
      `L'alchimie entre le ${userSign} et le ${partnerSign} (${partnerName}) est guidée par une puissante synergie stellaire. 
      
      1. Chimie Élémentaire : Vos éléments célestes s'entrelacent pour créer une attirance magnétique naturelle. La passion du ${userSign} trouve un écho vibrant auprès de ${partnerName}.
      
      2. Défis d'Âme : Prenez garde aux malentendus lors des périodes de doute. La communication bienveillante sera votre plus grand bouclier.
      
      3. Mantra Céleste du Couple : "Unis par les astres, forts dans la vérité du cœur."`,

      `Les constellations révèlent une résonance affective profonde entre un(e) natif(ve) du ${userSign} et ${partnerName} (${partnerSign}).
      
      1. Attraction & Complémentarité : Votre union dégage une aura de confiance et de complicité spontanée. ${partnerName} apporte un équilibre précieux à la nature du ${userSign}.
      
      2. Clé du Bonheur : Cultivez l'écoute active et préservez des espaces de liberté sacrés au sein du couple.
      
      3. Mantra Céleste du Couple : "Complémentaires dans nos différences, invincibles ensemble."`,

      `La carte du ciel annonce une alliance passionnée et féconde pour le couple ${userSign} & ${partnerName} (${partnerSign}).
      
      1. Synergie Spirituelle : Une flamme karmique anime vos échanges. Les projets communs initiés à deux bénéficieront d'un soutien cosmique exceptionnel.
      
      2. Vigilance & Harmonie : Évitez les rapports de force et privilégiez la tendresse face aux petites sautes d'humeur.
      
      3. Mantra Céleste du Couple : "L'amour sincère transforme chaque épreuve en victoire."`
    ];

    const hash = (userSign.length + partnerName.length + partnerSign.length) % compatibilityVariations.length;
    let detailedAnalysis = compatibilityVariations[hash];

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
