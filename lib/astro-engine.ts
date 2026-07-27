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
    keywords: ['Manifestation', 'Volonté', 'Potentiel Infini', 'Créativité'],
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
    id: 'the-hierophant',
    name: 'Le Pape (V)',
    arcana: 'Major',
    keywords: ['Tradition', 'Transmission', 'Sagesse', 'Alignement Spirituel'],
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    element: 'Terre',
    summary: 'Le Pape enseigne la patience, la connaissance ancestrale et la quête de sens.'
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
    id: 'justice',
    name: 'La Justice (VIII)',
    arcana: 'Major',
    keywords: ['Équilibre', 'Vérité', 'Karma', 'Clarté'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    element: 'Air',
    summary: 'La Justice tranche avec équité et apporte la clarté nécessaire sur les décisions passées.'
  },
  {
    id: 'the-hermit',
    name: 'L\'Ermite (IX)',
    arcana: 'Major',
    keywords: ['Introspection', 'Lumière Intérieure', 'Guidance', 'Sagesse'],
    imageUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=600&q=80',
    element: 'Terre',
    summary: 'L\'Ermite éclaire le chemin intérieur et vous invite à un temps de recul salvateur.'
  },
  {
    id: 'wheel-of-fortune',
    name: 'La Roue de la Fortune (X)',
    arcana: 'Major',
    keywords: ['Destinée', 'Cycles', 'Opportunité', 'Bascule'],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80',
    element: 'Feu',
    summary: 'La Roue tourne en votre faveur : préparez-vous à saisir un virage positif inattendu.'
  },
  {
    id: 'strength',
    name: 'La Force (XI)',
    arcana: 'Major',
    keywords: ['Courage', 'Maîtrise de soi', 'Douceur', 'Ténacité'],
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&q=80',
    element: 'Feu',
    summary: 'La Force démontre que la compassion et la sérénité sont de plus grandes victoires que la brutalité.'
  },
  {
    id: 'the-hanged-man',
    name: 'Le Pendu (XII)',
    arcana: 'Major',
    keywords: ['Nouveau Regard', 'Lâcher-prise', 'Inversion', 'Patience'],
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    element: 'Eau',
    summary: 'Le Pendu vous demande de changer de perspective et d\'accepter une pause révélatrice.'
  },
  {
    id: 'death',
    name: 'L\'Arcane Sans Nom (XIII)',
    arcana: 'Major',
    keywords: ['Renaissance', 'Métamorphose', 'Renouveau', 'Libération'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    element: 'Eau',
    summary: 'Cette carte annonce la fin d\'un ancien cycle pour faire fleurir un renouveau radieux.'
  },
  {
    id: 'temperance',
    name: 'La Tempérance (XIV)',
    arcana: 'Major',
    keywords: ['Fluidité', 'Guérison', 'Modération', 'Paix'],
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&q=80',
    element: 'Eau',
    summary: 'La Tempérance harmonise les énergies opposées et fait couler la sérénité dans votre vie.'
  },
  {
    id: 'the-tower',
    name: 'La Maison Dieu (XVI)',
    arcana: 'Major',
    keywords: ['Éveil', 'Prise de Conscience', 'Vérité', 'Illumination'],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    element: 'Feu',
    summary: 'Une révélation subite fait voler en éclats les illusions pour bâtir sur des bases authentiques.'
  },
  {
    id: 'the-star',
    name: 'L\'Étoile (XVII)',
    arcana: 'Major',
    keywords: ['Espoir', 'Inspiration', 'Guérison', 'Destinée Astrale'],
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&q=80',
    element: 'Air',
    summary: 'L\'Étoile déverse une lumière bénéfique, renouvelant votre foi en l\'univers et vos rêves profonds.'
  },
  {
    id: 'the-moon',
    name: 'La Lune (XVIII)',
    arcana: 'Major',
    keywords: ['Rêves', 'Illusions', 'Transformation', 'Secrets'],
    imageUrl: 'https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&q=80',
    element: 'Eau',
    summary: 'La Lune explore les royaumes invisibles de l\'inconscient et révèle les mystères cachés.'
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
    id: 'judgement',
    name: 'Le Jugement (XX)',
    arcana: 'Major',
    keywords: ['Appel de l\'Âme', 'Révélation', 'Pardon', 'Élévation'],
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80',
    element: 'Feu',
    summary: 'Le Jugement fait sonner l\'heure du grand réveil et de l\'alignement avec votre mission suprême.'
  },
  {
    id: 'the-world',
    name: 'Le Monde (XXI)',
    arcana: 'Major',
    keywords: ['Accomplissement', 'Totalité', 'Célébration', 'Expansion'],
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
    element: 'Terre',
    summary: 'Le Monde clôture l\'aventure dans une apothéose d\'harmonie, de réussite et d\'intégration globale.'
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

export function calculateAscendant(birthDate: string, birthTime: string): ZodiacSign {
  const sunSign = getZodiacSign(birthDate);
  const zodiacs: ZodiacSign[] = [
    'Bélier', 'Taureau', 'Gémeaux', 'Cancer',
    'Lion', 'Vierge', 'Balance', 'Scorpion',
    'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'
  ];
  
  const [hours, minutes] = (birthTime || '12:00').split(':').map(Number);
  const totalMinutes = (isNaN(hours) ? 12 : hours) * 60 + (isNaN(minutes) ? 0 : minutes);
  
  const sunIndex = zodiacs.indexOf(sunSign);
  const offset = Math.floor(totalMinutes / 120) % 12;
  const ascendantIndex = (sunIndex + offset) % 12;
  
  return zodiacs[ascendantIndex];
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
  
  if ((elem1.includes('Feu') && elem2.includes('Air')) || (elem1.includes('Air') && elem2.includes('Feu'))) return 95;
  if ((elem1.includes('Terre') && elem2.includes('Eau')) || (elem1.includes('Eau') && elem2.includes('Terre'))) return 94;
  
  if ((elem1.includes('Feu') && elem2.includes('Eau')) || (elem1.includes('Eau') && elem2.includes('Feu'))) return 68;
  if ((elem1.includes('Terre') && elem2.includes('Air')) || (elem1.includes('Air') && elem2.includes('Terre'))) return 72;

  return 81;
}

// Dynamic response generator for Oracle Chat Fallback
export function generateVariedOracleResponse(question: string, category: string, sunSign: string): { response: string; perspectives: string[] } {
  const intros = [
    `Salutations célestes. En scrutant l'alignement des astres pour le signe du ${sunSign}, `,
    `Les sphères supérieures résonnent fortement avec votre question. Pour le natif du ${sunSign}, `,
    `Les cartes stellaires s'ouvrent avec une énergie magnétique. En tant que ${sunSign}, `,
    `L'Oracle ressent la vibration profonde de votre demande. Dans le thème du ${sunSign}, `
  ];

  const loveBodies = [
    `l'influence de Vénus et de Neptune indique un dénouement romantique favorable. Une libération émotionnelle est imminente : accueillez le changement les bras ouverts.`,
    `les flux passionnels réclament de la clarté et un alignement du cœur. Les tensions récentes se dissipent pour laisser place à une vraie reconnexion spirituelle.`,
    `l'attraction astrale favorise une rencontre magique ou un renouveau profond dans votre couple. Fiez-vous à votre intuition affective.`
  ];

  const careerBodies = [
    `Jupiter déverse des opportunités majeures de succès et de reconnaissance. Un projet en suspens va s'accélérer grâce à votre détermination.`,
    `Mercure vous invite à structurer vos idées et à négocier avec audace. Vos talents uniques sont prêts à briller de mille feux.`,
    `les astres vous conseillent d'oser sortir de votre zone de confort. La chance favorise votre prise d'initiative pro.`
  ];

  const generalBodies = [
    `une grande transformation spirituelle s'opère. Laissez aller ce qui ne sert plus votre élévation et ayez confiance en la sagesse cosmique.`,
    `votre aura vibratoire est au sommet. Les synchronicités vont se multiplier aujourd'hui : gardez les yeux et le cœur ouverts.`,
    `les guides stellaires veillent sur vos pas. Un équilibre précieux se réinstalle progressivement entre votre esprit et votre corps.`
  ];

  const selectedIntro = intros[Math.floor(Math.random() * intros.length)];
  let selectedBody = generalBodies[Math.floor(Math.random() * generalBodies.length)];
  if (category === 'love' || question.toLowerCase().includes('amour') || question.toLowerCase().includes('ex') || question.toLowerCase().includes('couple')) {
    selectedBody = loveBodies[Math.floor(Math.random() * loveBodies.length)];
  } else if (category === 'career' || question.toLowerCase().includes('travail') || question.toLowerCase().includes('argent') || question.toLowerCase().includes('job')) {
    selectedBody = careerBodies[Math.floor(Math.random() * careerBodies.length)];
  }

  const perspectivesList = [
    [
      "✨ Voie 1 : Agir avec audace et exprimer immédiatement votre vérité.",
      "🌙 Voie 2 : Observer en silence et laisser les événements mûrir naturellement."
    ],
    [
      "🔥 Voie 1 : Prendre l'initiative d'un dialogue ouvert et libérateur.",
      "🌿 Voie 2 : Prendre soin de votre énergie personnelle avant d'engager le changement."
    ],
    [
      "🌟 Voie 1 : Suivre l'élan spontané de votre cœur sans crainte du jugement.",
      "🔮 Voie 2 : Méditer et demander conseil à votre sagesse intérieure lors du prochain croissant de lune."
    ]
  ];

  const selectedPerspectives = perspectivesList[Math.floor(Math.random() * perspectivesList.length)];

  return {
    response: selectedIntro + selectedBody,
    perspectives: selectedPerspectives,
  };
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
1. La Chimie Élémentaire et Attractions Stellaires.
2. Les Défis d'Âme et Points de Friction.
3. Le Mantra Céleste du Couple pour Réussir.
Adopte un ton passionné, révélateur et empreint de magie céleste.
`;

export function calculateLifePath(birthDate: string): number {
  if (!birthDate) return 7;
  const digits = birthDate.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }
  return sum || 7;
}

export function getLifePathDetails(num: number) {
  const map: Record<number, { archetype: string; title: string; summary: string; superPower: string }> = {
    1: { archetype: 'Le Pionnier 🌟', title: 'Chemin 1 - L\'Indépendant', summary: 'Vous êtes né(e) pour ouvrir de nouvelles voies et créer votre propre univers avec audace.', superPower: 'Leadership & Volonté Inébranlable' },
    2: { archetype: 'L\'Alchimiste 🕊️', title: 'Chemin 2 - Le Médiateur', summary: 'Votre don naturel est la diplomatie, l\'empathie sacrée et l\'harmonie dans les relations.', superPower: 'Intuition Relationnelle' },
    3: { archetype: 'Le Créateur 🎨', title: 'Chemin 3 - L\'Artiste', summary: 'La joie de vivre, l\'expression créative et la communication sont les piliers de votre âme.', superPower: 'Magnétisme & Rayonnement' },
    4: { archetype: 'Le Bâtisseur 🏛️', title: 'Chemin 4 - Le Protecteur', summary: 'Vous concrétisez vos idées avec méthode, loyauté et une discipline remarquable.', superPower: 'Stabilité & Ancrage' },
    5: { archetype: 'L\'Explorateur 🦅', title: 'Chemin 5 - Le Visionnaire', summary: 'Soif de liberté, goût du voyage et capacité d\'adaptation extraordinaire animent votre vie.', superPower: 'Métamorphose Rapide' },
    6: { archetype: 'Le Guide 💎', title: 'Chemin 6 - L\'Harmonisateur', summary: 'Dévoué(e) au bien-être de vos proches, vous créez la beauté et la guérison autour de vous.', superPower: 'Amour Inconditionnel' },
    7: { archetype: 'Le Sage 🔮', title: 'Chemin 7 - Le Mystique', summary: 'En quête permanente de vérité profonde, vous possédez un esprit analytique et spirituel unique.', superPower: 'Clairvoyance & Analyse' },
    8: { archetype: 'Le Conquérant ⚡', title: 'Chemin 8 - Le Bâtisseur d\'Empire', summary: 'Force de concrétisation matérielle et sens des affaires remarquable scellent votre destinée.', superPower: 'Abondance & Maîtrise' },
    9: { archetype: 'L\'Humaniste 🌌', title: 'Chemin 9 - L\'Inspirateur', summary: 'Votre compassion universelle et votre sagesse éclairent le monde vers un avenir meilleur.', superPower: 'Élévation Spirituelle' },
    11: { archetype: 'Le Maître Éveillé ✨', title: 'Chemin Maître 11 - L\'Illuminateur', summary: 'Connecté(e) aux fréquences supérieures, vous êtes un canal d\'inspiration céleste pour les autres.', superPower: 'Canal Cosmique' },
    22: { archetype: 'Le Maître Architecte 🏰', title: 'Chemin Maître 22 - Le Bâtisseur Céleste', summary: 'Capacité exceptionnelle à transformer les rêves les plus fous en réalités matérielles durables.', superPower: 'Création à Grande Échelle' },
    33: { archetype: 'Le Maître Enseignant 🌞', title: 'Chemin Maître 33 - Le Guide Cosmique', summary: 'L\'amour universel incarné : vous apportez guérison et réconfort à grande échelle.', superPower: 'Guérison Universelle' }
  };
  return map[num] || map[7];
}

export function getDailyTransits(sunSign: ZodiacSign) {
  return [
    {
      id: 'venus-transit',
      planet: 'Vénus 💖',
      title: 'Vénus en Sextile avec le Soleil',
      aspect: 'Alchimie & Séduction',
      impact: '+25% d\'Attraction Romantique',
      isVipOnly: false,
      summary: `Les influx vénusiens dynamisent votre pouvoir de séduction pour le signe du ${sunSign}. C'est le moment idéal pour exprimer votre tendresse.`
    },
    {
      id: 'jupiter-transit',
      planet: 'Jupiter 💰',
      title: 'Trine de Jupiter en Maison IX',
      aspect: 'Chance & Opportunités Pro',
      impact: 'Portail d\'Abondance Actif',
      isVipOnly: true,
      summary: `Jupiter ouvre un canal financier et professionnel inattendu. Une décision prise aujourd'hui portera des fruits majeurs.`
    },
    {
      id: 'moon-transit',
      planet: 'Lune 🌙',
      title: 'Lune Révélatrice & Neptune',
      aspect: 'Prémonitions & Intuition',
      impact: 'Rêves d\'Âme Lucides',
      isVipOnly: true,
      summary: `Vos rêves et ressentiments inconscients contiennent un message karmique clé concernant votre avenir immédiat.`
    }
  ];
}
