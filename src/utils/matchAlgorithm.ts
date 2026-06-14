// ================================================================
// Stradello Match — Local Recommendation Algorithm
// ================================================================

import destinations from '../data/destinos.json';

export type Destination = typeof destinations[number];
export type QuizAnswer = string;
export type QuizResponses = Record<string, QuizAnswer>;

export interface MatchResult {
  destination: Destination;
  score: number;
  compatibility: 'excelente' | 'muito-bom' | 'bom' | 'moderado';
}

export interface MatchResults {
  topMatches: MatchResult[];
  alternatives: MatchResult[];
  similar: MatchResult[];
}

// Quiz questions and their corresponding scoring keys
export const quizQuestions = [
  {
    id: 'travel_companions',
    question: 'Viaja sozinho(a), casal, família, amigos ou trabalho?',
    options: [
      { value: 'solo', label: 'Sozinho(a)', scoreKey: 'solo' },
      { value: 'casal', label: 'Casal', scoreKey: 'casal' },
      { value: 'familia', label: 'Família', scoreKey: 'familia' },
      { value: 'amigos', label: 'Amigos', scoreKey: 'familia' }, // Similar to family
      { value: 'trabalho', label: 'Trabalho', scoreKey: 'workation' },
    ],
  },
  {
    id: 'destination_type',
    question: 'Prefere praia, montanha, serra, cidade histórica ou natureza?',
    options: [
      { value: 'praia', label: 'Praia', scoreKey: 'calor' },
      { value: 'montanha', label: 'Montanha', scoreKey: 'frio' },
      { value: 'serra', label: 'Serra', scoreKey: 'frio' },
      { value: 'cidade-historica', label: 'Cidade Histórica', scoreKey: 'tranquilidade' },
      { value: 'natureza', label: 'Natureza', scoreKey: 'natureza' },
    ],
  },
  {
    id: 'cafes_restaurants',
    question: 'Gosta de cafés e restaurantes?',
    options: [
      { value: 'sim', label: 'Sim, muito', scoreKey: 'cafes' },
      { value: 'moderado', label: 'Moderadamente', scoreKey: 'cafes' },
      { value: 'nao', label: 'Não tanto', scoreKey: 'cafes' },
    ],
  },
  {
    id: 'tranquility',
    question: 'Busca tranquilidade?',
    options: [
      { value: 'sim', label: 'Sim, essencial', scoreKey: 'tranquilidade' },
      { value: 'moderado', label: 'Moderadamente', scoreKey: 'tranquilidade' },
      { value: 'nao', label: 'Não tanto', scoreKey: 'tranquilidade' },
    ],
  },
  {
    id: 'temperature',
    question: 'Prefere frio ou calor?',
    options: [
      { value: 'frio', label: 'Frio', scoreKey: 'frio' },
      { value: 'calor', label: 'Calor', scoreKey: 'calor' },
      { value: 'morno', label: 'Morno/Ameno', scoreKey: 'frio' },
    ],
  },
  {
    id: 'accommodation',
    question: 'Busca glamping ou camping?',
    options: [
      { value: 'glamping', label: 'Glamping', scoreKey: 'glamping' },
      { value: 'camping', label: 'Camping', scoreKey: 'camping' },
      { value: 'hotel', label: 'Hotel/Pousada', scoreKey: 'tranquilidade' },
    ],
  },
  {
    id: 'local_experiences',
    question: 'Busca experiências locais?',
    options: [
      { value: 'sim', label: 'Sim, muito', scoreKey: 'experienciasLocais' },
      { value: 'moderado', label: 'Moderadamente', scoreKey: 'experienciasLocais' },
      { value: 'nao', label: 'Não tanto', scoreKey: 'experienciasLocais' },
    ],
  },
  {
    id: 'remote_work',
    question: 'Trabalha remotamente?',
    options: [
      { value: 'sim', label: 'Sim, sempre', scoreKey: 'workation' },
      { value: 'as-vezes', label: 'Às vezes', scoreKey: 'workation' },
      { value: 'nao', label: 'Não', scoreKey: 'workation' },
    ],
  },
  {
    id: 'budget',
    question: 'Faixa de orçamento?',
    options: [
      { value: 'economico', label: 'Econômico', scoreKey: 'economico' },
      { value: 'medio', label: 'Médio', scoreKey: 'medio' },
      { value: 'premium', label: 'Premium', scoreKey: 'premium' },
    ],
  },
];

/**
 * Calculate compatibility score for a destination based on quiz responses
 */
function calculateDestinationScore(
  destination: Destination,
  responses: QuizResponses
): number {
  let totalScore = 0;
  let maxPossibleScore = 0;

  quizQuestions.forEach((question) => {
    const response = responses[question.id];
    if (!response) return;

    const selectedOption = question.options.find((opt) => opt.value === response);
    if (!selectedOption) return;

    const scoreKey = selectedOption.scoreKey;
    const destinationScore = destination.pontuacoes[scoreKey as keyof typeof destination.pontuacoes] || 0;

    // Weight the score based on question importance
    const weight = getQuestionWeight(question.id);
    totalScore += destinationScore * weight;
    maxPossibleScore += 10 * weight; // Max score per question is 10
  });

  // Normalize to percentage
  return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
}

/**
 * Get weight for each question (higher = more important)
 */
function getQuestionWeight(questionId: string): number {
  const weights: Record<string, number> = {
    travel_companions: 1.2,
    destination_type: 1.5,
    cafes_restaurants: 0.8,
    tranquility: 1.3,
    temperature: 1.4,
    accommodation: 1.0,
    local_experiences: 1.1,
    remote_work: 0.9,
    budget: 1.0,
  };
  return weights[questionId] || 1.0;
}

/**
 * Get compatibility label based on score
 */
function getCompatibilityLabel(score: number): MatchResult['compatibility'] {
  if (score >= 80) return 'excelente';
  if (score >= 65) return 'muito-bom';
  if (score >= 50) return 'bom';
  return 'moderado';
}

/**
 * Main function to calculate matches based on quiz responses
 */
export function calculateMatches(responses: QuizResponses): MatchResults {
  // Calculate scores for all destinations
  const scoredDestinations = destinations.map((destination) => ({
    destination,
    score: calculateDestinationScore(destination, responses),
    compatibility: getCompatibilityLabel(calculateDestinationScore(destination, responses)),
  }));

  // Sort by score descending
  scoredDestinations.sort((a, b) => b.score - a.score);

  // Get top 3 matches
  const topMatches = scoredDestinations.slice(0, 3);

  // Get alternatives (destinations with good scores but not in top 3)
  const alternatives = scoredDestinations
    .slice(3)
    .filter((result) => result.score >= 50)
    .slice(0, 5);

  // Get similar destinations based on the top match
  const similar = getSimilarDestinations(topMatches[0]?.destination);

  return {
    topMatches,
    alternatives,
    similar,
  };
}

/**
 * Get similar destinations based on a destination's "similares" field
 */
function getSimilarDestinations(destination?: Destination): MatchResult[] {
  if (!destination) return [];

  const similarSlugs = destination.similares || [];
  const similarDestinations = destinations.filter((d) =>
    similarSlugs.includes(d.slug)
  );

  return similarDestinations.map((d) => ({
    destination: d,
    score: 70, // Default score for similar destinations
    compatibility: 'bom',
  }));
}

/**
 * Get destination by slug
 */
export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

/**
 * Get all destinations
 */
export function getAllDestinations(): Destination[] {
  return destinations;
}

/**
 * Get destinations by category
 */
export function getDestinationsByCategory(category: string): Destination[] {
  return destinations.filter((d) => d.categorias.includes(category));
}

/**
 * Get alternative destinations for a specific destination
 */
export function getAlternativeDestinations(slug: string): MatchResult[] {
  const destination = getDestinationBySlug(slug);
  if (!destination) return [];

  const alternativeSlugs = destination.alternativas || [];
  const alternativeDestinations = destinations.filter((d) =>
    alternativeSlugs.includes(d.slug)
  );

  return alternativeDestinations.map((d) => ({
    destination: d,
    score: 65,
    compatibility: 'muito-bom',
  }));
}
