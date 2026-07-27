import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ORACLE_SYSTEM_PROMPT, generateVariedOracleResponse } from '@/lib/astro-engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-dummy',
});

// Category & Keyword Response Database for offline/fallback intelligence
const RELEVANT_RESPONSES: Record<string, (q: string, sign: string) => { response: string; perspectives: string[] }> = {
  love: (q, sign) => ({
    response: `L'Oracle de Vénus s'est penché sur votre interrogation ("${q}"). Pour un natif du ${sign}, le ciel amoureux annonce une phase de clarification intense. Les planètes indiquent que la sincérité émotionnelle débloquera la situation.`,
    perspectives: [
      `❤️ Voie de l'Âme : Ne précipitez rien. Laissez les sentiments mûrir sous la protection de Vénus.`,
      `🔥 Voie de la Passion : Exprimez votre vérité sans crainte. L'audace attirera la réciprocité.`,
      `🔮 Voie Karmique : Écoutez ce que cette relation vous enseigne sur vous-même avant d'agir.`,
    ],
  }),
  career: (q, sign) => ({
    response: `En réponse à votre question professionnelle ("${q}"), Saturne et Mars s'alignent dans la maison des réussites du ${sign}. Une opportunité stratégique se dessine d'ici peu.`,
    perspectives: [
      `💼 Voie de l'Ambition : Saisissez l'initiative. Vos compétences sont pleinement reconnues par les astres.`,
      `🧠 Voie de la Stratégie : Analysez les détails des contrats ou propositions avant de vous engager.`,
      `✨ Voie de l'Abondance : L'univers valide vos efforts passés, une moisson matérielle approche.`,
    ],
  }),
  destiny: (q, sign) => ({
    response: `Les portes du destin s'ouvrent pour le ${sign} concernant "${q}". Vous traversez un portail de transformation personnelle majeure.`,
    perspectives: [
      `🌌 Voie Céleste : Faites confiance aux coïncidences et aux synchronicités d'aujourd'hui.`,
      `🛡️ Voie de Protection : Vous êtes protégé(e) contre les énergies négatives. Avancez avec foi.`,
      `🧘 Voie de l'Éveil : Pratiquez le lâcher-prise pour laisser le meilleur advenir.`,
    ],
  }),
  general: (q, sign) => ({
    response: `L'Oracle vous apporte cette guidance céleste pour "${q}" (Signe: ${sign}) : Les constellations confirment que votre intuition actuelle est exacte. Alignez vos actes avec votre vérité intérieure.`,
    perspectives: [
      `🌟 Perspective Énergétique : Renouvelez votre énergie avec du repos et de la méditation.`,
      `🎯 Perspective d'Action : Posez une action concrète dès aujourd'hui pour sceller votre intention.`,
      `👁️ Perspective Spirituelle : Observez les signes et les rêves de cette nuit.`,
    ],
  }),
};

export async function POST(req: Request) {
  try {
    const { question, category, sunSign } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question manquante' }, { status: 400 });
    }

    const sign = sunSign || 'Bélier';
    const catKey = (category && RELEVANT_RESPONSES[category]) ? category : 'general';

    // Keyword detection for specialized responses
    const qLower = question.toLowerCase();
    let detectedCat = catKey;
    if (qLower.includes('ex') || qLower.includes('amour') || qLower.includes('rencontre') || qLower.includes('couple') || qLower.includes('mariage')) {
      detectedCat = 'love';
    } else if (qLower.includes('travail') || qLower.includes('job') || qLower.includes('promotion') || qLower.includes('argent') || qLower.includes('carrière')) {
      detectedCat = 'career';
    } else if (qLower.includes('surpris') || qLower.includes('destin') || qLower.includes('avenir') || qLower.includes('blocage')) {
      detectedCat = 'destiny';
    }

    const generateFallback = RELEVANT_RESPONSES[detectedCat] || RELEVANT_RESPONSES.general;
    let result = generateFallback(question, sign);
    if (Math.random() > 0.3) {
      result = generateVariedOracleResponse(question, detectedCat, sign);
    }

    // Call OpenAI if API key is active
    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('dummy')) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: ORACLE_SYSTEM_PROMPT },
            {
              role: 'user',
              content: `L'utilisateur (${sign}, Catégorie: ${detectedCat}) demande : "${question}".
Génère une réponse structurée en JSON sous le format :
{
  "response": "Interprétation principale mystique et directe de 3 phrases.",
  "perspectives": [
    "Option/Voie 1 : Conseil sur le plan émotionnel/cœur.",
    "Option/Voie 2 : Conseil sur le plan de l'action/volonté.",
    "Option/Voie 3 : Conseil sur le plan du destin/spiritualité."
  ]
}`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          if (parsed.response && Array.isArray(parsed.perspectives)) {
            result = parsed;
          }
        }
      } catch (err) {
        console.warn('OpenAI fallback triggered for Oracle:', err);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process Oracle request' },
      { status: 500 }
    );
  }
}
