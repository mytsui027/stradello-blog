import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    // Required
    title: z.string().max(100),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    category: z.string(),

    // Optional
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    heroImageCredit: z.string().optional(),
    author: z.string().default('Cléber Lima | Stradello'),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    
    // SEO
    canonicalUrl: z.string().url().optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    
    // Article metadata
    readingTime: z.number().optional(), // minutes — auto-calculated if not set
    locale: z.enum(['pt', 'en']).default('pt'),
    
    // Destination-specific
    destination: z.string().optional(),
    country: z.string().optional(),
    region: z.string().optional(),
    
    // Monetization / affiliates
    hasAffiliateLinks: z.boolean().default(false),
    affiliateDisclosure: z.string().optional(),
    
    // Schema.org
    articleType: z.enum([
      'Article',
      'TravelArticle',
      'NewsArticle',
      'BlogPosting',
    ]).default('TravelArticle'),
  }),
});

const guides = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().max(100),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    destination: z.string(),
    country: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    author: z.string().default('Cléber Lima | Stradello'),
    duration: z.string().optional(), // '3-5 dias', '1 semana'
    budget: z.enum(['econômico', 'moderado', 'confortável', 'luxo']).optional(),
    travelStyle: z.array(z.string()).default([]),
    bestFor: z.array(z.string()).default([]),
    difficulty: z.enum(['tranquilo', 'moderado', 'ativo']).optional(),
    canonicalUrl: z.string().url().optional(),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { blog, guides };
