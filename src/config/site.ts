// ================================================================
// Stradello — Site Configuration
// ================================================================

export const SITE = {
  name: 'Stradello',
  tagline: 'Viajar devagar. Sentir de verdade.',
  description: 'Blog sobre slow travel, viagens solo, natureza, destinos tranquilos, experiências locais e formas mais conscientes de explorar o mundo.',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.stradello.com.br',
  locale: 'pt-BR',
  language: 'pt',
  author: {
    name: 'Cléber Lima | Stradello',
    email: 'stradello.contato@gmail.com',
    bio: 'Bacharel em Turismo e criador do Stradello. Compartilho experiências sobre slow travel, destinos tranquilos, natureza, viagens solo e formas mais conscientes de explorar o mundo.',
  },
  social: {
    instagram: 'https://www.instagram.com/stradello.blog/',
    pinterest: 'https://br.pinterest.com/stradelloblog',
    tiktok: 'https://www.tiktok.com/@stradello?lang=pt-BR',
    twitter: '',
    youtube: 'https://www.youtube.com/@Stradello',
  },
  analytics: {
    googleAnalyticsId: import.meta.env.PUBLIC_GA_ID || 'G-5176X7WV66',
    googleSearchConsole: import.meta.env.PUBLIC_GSC_VERIFICATION || 'kiYpbLTiBywZ16lUhgbkPRM3lBNVsJ-R-yczrQcfv_M',
  },
  adsense: {
    publisherId: import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID || '',
    enabled: import.meta.env.PUBLIC_ADSENSE_ENABLED === 'true',
  },
} as const;

export const CATEGORIES = [
  {
    slug: 'apresentacao',
    name: 'Apresentação',
    description: 'Conheça o Stradello — um blog de slow travel criado para viajantes introvertidos que preferem experiências calmas, autênticas e contemplativas.',
    emoji: '👋',
    color: 'sage',
    image: '/images/bem-vindo-ao-stradello.jpg',
  },
  {
    slug: 'viagens-solo',
    name: 'Viagens Solo',
    description: 'Viajar sozinho é uma das experiências mais transformadoras. Guias, dicas e histórias para quem escolhe o caminho individual.',
    emoji: '🧍',
    color: 'sage',
  },
  {
    slug: 'slow-travel',
    name: 'Slow Travel',
    description: 'Menos pressa, mais presença. A arte de viajar devagar e verdadeiramente habitar os lugares que visitamos.',
    emoji: '🐢',
    color: 'stone',
  },
  {
    slug: 'lugares-para-desacelerar',
    name: 'Lugares para Desacelerar',
    description: 'Lugares que respiram em ritmo próprio — cidades pequenas, vilas costeiras, aldeias serranas e refúgios naturais.',
    emoji: '🌿',
    color: 'sage',
  },
  {
    slug: 'natureza',
    name: 'Natureza',
    description: 'Trilhas silenciosas, cachoeiras secretas, florestas que curam. A natureza como destino principal.',
    emoji: '🌲',
    color: 'sage',
  },
  {
    slug: 'glamping',
    name: 'Glamping',
    description: 'Conforto com autenticidade. Tendas, cabanas, yurts e experiências de hospedagem imersivas na natureza.',
    emoji: '⛺',
    color: 'terra',
  },
  {
    slug: 'cafeterias-e-livrarias',
    name: 'Cafeterias & Livrarias',
    description: 'Os melhores recantos com uma boa xícara, boa leitura e silêncio suficiente para pensar.',
    emoji: '☕',
    color: 'cream',
  },
  {
    slug: 'para-introvertidos',
    name: 'Para Introvertidos',
    description: 'Estratégias, destinos e experiências pensadas para quem recarrega as energias na tranquilidade.',
    emoji: '🤍',
    color: 'stone',
  },
  {
    slug: 'experiencias-locais',
    name: 'Experiências Locais',
    description: 'Mercados, artesãos, culinária regional, festivais íntimos. O que os guias turísticos raramente mostram.',
    emoji: '🏺',
    color: 'terra',
  },
  {
    slug: 'guias-de-destinos',
    name: 'Guias de Destinos',
    description: 'Roteiros completos e honestos — não listas de atrações, mas convites para habitar um lugar.',
    emoji: '🗺️',
    color: 'sage',
  },
  {
    slug: 'lugares-para-trabalhar-com-calma',
    name: 'Lugares para Trabalhar com Calma',
    description: 'Cafeterias silenciosas, cidades acolhedoras e refúgios perfeitos para quem trabalha remoto sem abrir mão da tranquilidade.',
    emoji: '💻',
    color: 'slate',
  },
] as const;

export const NAV_LINKS = [
  { href: '/',           label: 'Início' },
  { href: '/blog',       label: 'Blog' },
  { href: '/categorias', label: 'Categorias' },
  { href: '/guias',      label: 'Guias' },
  { href: '/recomendacoes', label: 'Recomendações' },
  { href: '/sobre',      label: 'Sobre' },
] as const;

export const POSTS_PER_PAGE = 9;
export const FEATURED_POSTS_COUNT = 3;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category['slug'];
