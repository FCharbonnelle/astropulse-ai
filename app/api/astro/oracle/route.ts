import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ORACLE_SYSTEM_PROMPT } from '@/lib/astro-engine';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-dummy',
});

export async function POST(req: Request) {
  try {
    const { question, category, sunSign } = await req.json();

    if (!question) {
      return NextResponse.json({ error: 'Question manquante' }, { status: 400 });
    }

    let responseText = `En écoutant les murmures des constellations pour le signe du ${sunSign || 'Bélier'}, la réponse à votre question s'illumine : "${question}". L'Univers vous demande de faire confiance à votre sagesse intérieure. Les blocages actuels ne sont que des illusions éphémères avant votre grand alignement.`;

    if (process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('dummy')) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: ORACLE_SYSTEM_PROMPT },
            {
              role: 'user',
              content: `L'utilisateur (Signe solaire: ${sunSign || 'Astres'}, Catégorie: ${category || 'Général'}) demande : "${question}"`,
            },
          ],
          temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content;
        if (content) {
          responseText = content;
        }
      } catch (err) {
        console.warn('OpenAI fallback triggered for Oracle:', err);
      }
    }

    return NextResponse.json({ response: responseText });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process Oracle request' },
      { status: 500 }
    );
  }
}
