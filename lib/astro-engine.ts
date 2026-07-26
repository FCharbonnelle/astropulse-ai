export type ZodiacSign = 
  | 'Bélier' | 'Taureau' | 'Gémeaux' | 'Cancer' 
  | 'Lion' | 'Vierge' | 'Balance' | 'Scorpion' 
  | 'Sagittaire' | 'Capricorne' | 'Verseau' | 'Poissons';

export interface TarotCard {
  id: string;
  name: string;
  arcana: 'Major' | 'Minor';
  keywords: string[];
  imageUrl: string;
  element: 'Feu' | 'Terre' | 'Air' | 'Eau';
  summary: string;
}

export const TAROT_DECK: TarotCard[] = [
  {
    id: 'the-fool',
    name: 'Le Mat (0)',
    arcana: 'Major',
    keywords: ['Nouveau Départ', 'Spontanéité', 'Innocence', 'Lâcher-prise'],
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&q=80',
    element: 'Air',
    summary: 'Le Mat symbolise l\'aube d\'un nouveau voyage spirituel et l\'audace du saut dans l\'inconnu.'
  },
  {
    id: 'the-magician',
    name: 'Le Bateleur (I)',
    arcana: 'Major',
    keywords: ['Manifestation', 'Volonté', 'Potentiel Infinie', 'Créativité'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    element: 'Feu',
    summary: 'Le Bateleur vous rappelle que vous possédez déjà tous les outils pour façonner votre propre réalité.'
  },
  {
    id: 'high-priestess',
    name: 'La Papesse (II)',
    arcana: 'Major',
    keywords: ['Intuition', 'Mystère', 'Sagesse Intérieure', 'Subconscient'],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
    element: 'Eau',
    summary: 'La Papesse vous invite à écouter le chuchotement silencieux de votre âme et vos pressentiments.'
  },
  {
    id: 'the-empress',
    name: 'L\'Impératrice (III)',
    arcana: 'Major',
    keywords: ['Abondance', 'Féminité Sacrée', 'Création', 'Harmonie'],
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80',
    element: 'Terre',
    summary: 'L\'Impératrice rayonne d\'énergie fertilisante, de beauté matérielle et de compassion maternelle.'
  },
  {
    id: 'the-emperor',
    name: 'L\'Empereur (IV)',
    arcana: 'Major',
    keywords: ['Autorité', 'Structure', 'Protection', 'Stabilité'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    element: 'Feu',
    summary: 'L\'Empereur incarne la force de réalisation, le leadership éclairé et les fondations solides.'
  },
  {
    id: 'the-lovers',
    name: 'L\'Amoureux (VI)',
    arcana: 'Major',
    keywords: ['Choix du Cœur', 'Union', 'Attraction', 'Alignement'],
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80',
    element: 'Air',
    summary: 'L\'Amoureux révèle une décision affective cruciale et la recherche de l\'harmonie relationnelle.'
  },
  {
    id: 'the-chariot',
    name: 'Le Chariot (VII)',
    arcana: 'Major',
    keywords: ['Victoire', 'Détermination', 'Mouvement', 'Triomphe'],
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
    element: 'Feu',
    summary: 'Le Chariot annonce une progression rapide et le dépassement héroïque des obstacles par la volonté.'
  },
  {
    id: 'the-star',
    name: 'L\'Étoile (XVII)',
    arcana: 'Major',
    keywords: ['Espoir', 'Inspiration', 'Guérison', 'Destinée Astral'],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80',
    element: 'Air',
    summary: 'L\'Étoile déverse une lumière bénéfique, renouvelant votre foi en l\'univers et vos rêves profonds.'
  },
  {
    id: 'the-sun',
    name: 'Le Soleil (XIX)',
    arcana: 'Major',
    keywords: ['Joie Radiante', 'Succès Total', 'Clarté', 'Vitalité'],
    imageUrl: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=600&q=80',
    element: 'Feu',
    summary: 'Le Soleil dissipe toutes les ombres et illumine votre journée de chaleur, de clarté et de réussite.'
  },
  {
    id: 'the-moon',
    name: 'La Lune (XVIII)',
    arcana: 'Major',
    keywords: ['Rêves', 'Illusions', 'Transformation', 'Secrets'],
    imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&q=80',
    element: 'Eau',
    summary: 'La Lune explore les royaumes invisibles de l\'inconscient et révèle les mystères cachés.'
  }
];

export function getZodiacSign(dateString: string): ZodiacSign {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Bélier';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taureau';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gémeaux';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Lion';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Vierge';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Balance';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpion';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittaire';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorne';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Verseau';
  return 'Poissons';
}

export function getZodiacElement(sign: ZodiacSign): string {
  switch (sign) {
    case 'Bélier': case 'Lion': case 'Sagittaire': return 'Feu 🔥';
    case 'Taureau': case 'Vierge': case 'Capricorne': return 'Terre 🌍';
    case 'Gémeaux': case 'Balance': case 'Verseau': return 'Air 💨';
    case 'Cancer': case 'Scorpion': case 'Poissons': return 'Eau 💧';
  }
}

export function calculateCompatibilityScore(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const elem1 = getZodiacElement(sign1);
  const elem2 = getZodiacElement(sign2);

  if (sign1 === sign2) return 92;
  if (elem1 === elem2) return 88;
  
  // Complementary elements (Feu & Air, Terre & Eau)
  if ((elem1.includes('Feu') && elem2.includes('Air')) || (elem1.includes('Air') && elem2.includes('Feu'))) return 95;
  if ((elem1.includes('Terre') && elem2.includes('Eau')) || (elem1.includes('Eau') && elem2.includes('Terre'))) return 94;
  
  // Challenging combinations
  if ((elem1.includes('Feu') && elem2.includes('Eau')) || (elem1.includes('Eau') && elem2.includes('Feu'))) return 68;
  if ((elem1.includes('Terre') && elem2.includes('Air')) || (elem1.includes('Air') && elem2.includes('Terre'))) return 72;

  return 81;
}

export const ORACLE_SYSTEM_PROMPT = `Tu es l'Oracle d'AstroPulse AI, une entité cosmique bienveillante, mystique et perspicace.
Ton rôle est de guider les utilisateurs dans leurs interrogations sur l'amour, la carrière, l'énergie et leur destinée stellaire.
Adopte un ton envoûtant, poétique, profond et très structuré. Utilise des métaphores célestes et apporte des conseils concrets.
Réponds toujours en français fluide, chaleureux et engageant.`;

export const DAILY_CARD_PROMPT = (sunSign: string, cardName: string, keywords: string) => `
Génère une lecture ésotérique quotidienne personnalisée pour un natif du signe ${sunSign} qui a tiré la carte du Tarot "${cardName}" (Mots-clés: ${keywords}).
La réponse doit être un objet JSON valide avec la structure suivante :
{
  "readingText": "Une interprétation mystique et inspirante de 3 à 4 phrases sur l'énergie du jour.",
  "adviceText": "Un conseil d'action précis et concret pour la journée.",
  "loveScore": 85 (un nombre entre 60 et 99),
  "energyScore": 90 (un nombre entre 60 et 99),
  "workScore": 78 (un nombre entre 60 et 99)
}
Ne renvoie rien d'autre que l'objet JSON.
`;

export const COMPATIBILITY_PROMPT = (userSign: string, partnerName: string, partnerSign: string) => `
Analyse la compatibilité amoureuse astromystique entre un(e) natif(ve) du ${userSign} et son/sa partenaire ${partnerName} (signe du ${partnerSign}).
Génère un rapport détaillé captivant de 3 paragraphes structurés :
1. La Chimie Élémentaire et Attractions Stelleres.
2. Les Défis d'Âme et Points de Friction.
3. Le Manta Céleste du Couple pour Réussir.
Adopte un ton passionné, révélateur et empreint de magie céleste.
`;
