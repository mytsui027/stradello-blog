# 🌿 Stradello — Blog de Slow Travel

> *"Stradello" é uma palavra italiana para viela, caminho secundário, trilha menos percorrida.*

Blog de viagens minimalista, editorial e contemplativo para introvertidos e viajantes que preferem experiências calmas, autênticas e lentas. Construído com **Astro 4**, **Tailwind CSS** e **MDX**.

---

## ✨ O que está incluído

### Páginas criadas
| Rota | Descrição |
|------|-----------|
| `/` | Homepage editorial com hero, categorias, artigos recentes, manifesto slow travel |
| `/blog` | Listagem paginada de artigos |
| `/blog/[slug]` | Artigo individual com barra de progresso, breadcrumb, schema markup |
| `/categorias` | Grid visual de todas as categorias |
| `/categorias/[slug]` | Listagem de artigos por categoria |
| `/guias` | Listagem de guias de destinos |
| `/guias/[slug]` | Guia individual completo |
| `/busca` | Busca interna client-side (sem backend) |
| `/tags/[tag]` | Artigos por tag |
| `/sobre` | Página sobre o blog com valores e manifesto |
| `/newsletter` | Página de inscrição com form |
| `/contato` | Formulário de contato com seleção de assunto |
| `/recomendacoes` | Livros, apps, produtos e plataformas recomendadas |
| `/rss.xml` | Feed RSS completo |
| `/404` | Página de erro personalizada |

### Componentes
- **Header** — Fixo com scroll-detect, dark mode toggle, busca, menu mobile
- **Footer** — Newsletter compacta, redes sociais, categorias, links legais
- **ArticleCard** — Card de artigo com imagem, badge de categoria, meta
- **NewsletterBanner** — 3 variantes: `full`, `compact`, `inline`
- **AdUnit** — Placeholder/integração AdSense, sem poluir o design
- **ThemeScript** — Prevenção de flash no carregamento do tema escuro

### Funcionalidades técnicas
- ✅ **SEO completo** — meta tags, OG, Twitter Card, schema.org JSON-LD
- ✅ **Sitemap automático** — via `@astrojs/sitemap`
- ✅ **RSS Feed** — via `@astrojs/rss`
- ✅ **Modo escuro** — persistido no localStorage, sem flash
- ✅ **Busca interna** — client-side, sem servidor, debounced
- ✅ **Paginação** — no blog com URLs limpas
- ✅ **Reading progress bar** — nos artigos
- ✅ **Scroll reveal** — animações baseadas em IntersectionObserver
- ✅ **Acessibilidade** — ARIA labels, skip link, `aria-current`, semântica correta
- ✅ **Performance** — lazy loading, imagens otimizadas, CSS crítico inline
- ✅ **Responsivo total** — mobile-first, fluido em todos os breakpoints
- ✅ **Print styles** — para artigos
- ✅ **Reduced motion** — respeita `prefers-reduced-motion`

---

## 🚀 Iniciando o projeto

### Pré-requisitos
- Node.js 18+
- npm / pnpm / yarn

### Instalação

```bash
# Extrair o arquivo
tar -xzf stradello-blog.tar.gz
cd stradello

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O blog estará disponível em `http://localhost:4321`

### Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção em `dist/` |
| `npm run preview` | Preview do build de produção |

---

## 📁 Estrutura de pastas

```
stradello/
├── public/                   # Arquivos estáticos
│   ├── favicon.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ArticleCard.astro
│   │   ├── NewsletterBanner.astro
│   │   ├── AdUnit.astro
│   │   └── ThemeScript.astro
│   ├── config/
│   │   └── site.ts           # ⚙️ Configurações centrais do site
│   ├── content/
│   │   ├── config.ts         # Schema das coleções de conteúdo
│   │   ├── blog/             # Artigos (.md ou .mdx)
│   │   └── guides/           # Guias de destinos (.md ou .mdx)
│   ├── layouts/
│   │   ├── BaseLayout.astro  # Layout raiz com SEO completo
│   │   └── ArticleLayout.astro
│   ├── pages/                # Rotas do site
│   ├── styles/
│   │   └── global.css        # Estilos globais + design tokens
│   └── utils/
│       └── helpers.ts        # Funções utilitárias
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## ✍️ Como criar conteúdo

### Artigo de blog

Crie um arquivo `.md` ou `.mdx` em `src/content/blog/`:

```markdown
---
title: "Título do artigo"
description: "Descrição curta (até 200 caracteres)"
pubDate: 2026-05-01
category: "Slow Travel"          # Nome da categoria
tags: ["slow travel", "brasil"]
author: "Seu Nome"
featured: false                  # Aparece em destaque na home
draft: false                     # true = não aparece no build
heroImage: "../../assets/foto.jpg"  # Opcional
heroImageAlt: "Descrição da foto"
destination: "Ouro Preto"        # Opcional
country: "Brasil"                # Opcional
hasAffiliateLinks: false
---

Conteúdo em Markdown aqui...
```

### Guia de destino

Crie em `src/content/guides/`:

```markdown
---
title: "Guia de [Destino]"
description: "Descrição"
pubDate: 2026-05-01
destination: "Nome do Destino"
country: "País"
duration: "3-5 dias"
budget: "moderado"              # econômico | moderado | confortável | luxo
bestFor: ["Introvertidos", "Viajantes solo"]
difficulty: "tranquilo"         # tranquilo | moderado | ativo
---
```

---

## ⚙️ Configurações essenciais

Edite `src/config/site.ts`:

```typescript
export const SITE = {
  name: 'Stradello',
  url: 'https://stradello.com.br',        // ← seu domínio
  author: {
    email: 'stradello.contato@gmail.com',        // ← seu e-mail
  },
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX', // ← seu GA4 ID
    googleSearchConsole: 'xxxxx',      // ← meta tag de verificação
  },
  adsense: {
    publisherId: 'ca-pub-XXXXX',       // ← seu publisher ID
    enabled: false,                    // ← true após aprovação
  },
};
```

---

## 💰 Monetização com Google AdSense

Os espaços de anúncio já estão estruturados no código, mas aparecem como placeholders durante o desenvolvimento.

**Para ativar:**
1. Configure `publisherId` e `enabled: true` em `src/config/site.ts`
2. Substitua os `slot` IDs nos componentes `<AdUnit>` pelos IDs reais do AdSense
3. Os anúncios estão posicionados estrategicamente:
   - Logo após o hero da homepage (leaderboard)
   - Antes do corpo do artigo (rectangle)
   - Meio do artigo (in-article — melhor CTR)
   - Barra lateral (futuro, quando adicionar sidebar)

---

## 📧 Newsletter

O formulário está pronto. Para integrar com um provedor:

- **ConvertKit / Kit:** Substitua o `action` do form pelo endpoint da API
- **Brevo (Sendinblue):** Use o endpoint de subscription
- **Mailchimp:** Integre via API ou embed
- **Netlify Forms:** Adicione `netlify` ao `<form>` — funciona automaticamente

---

## 🌍 Deploy

### Netlify (recomendado para Astro estático)
```bash
# Build command:
npm run build

# Publish directory:
dist
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```yaml
# .github/workflows/deploy.yml
- uses: withastro/action@v2
```

---

## 🎨 Identidade Visual

**Tipografia:**
- Display: *Cormorant Garamond* (literária, atemporal)
- Body: *DM Sans* (limpo, amigável)
- Citações: *Lora* (serifada, elegante)

**Paleta:**
- Stone (warm grays) — tons neutros quentes
- Sage (green) — acento principal, natureza
- Cream — destaques âmbar suaves
- Terra — toques de terracota para variedade

**Filosofia de design:** Minimalismo editorial. Espaço negativo generoso. Sem banners. Sem poluição visual.

---

## 📌 Próximos passos recomendados

- [ ] Configurar domínio e SSL
- [ ] Adicionar Google Analytics ID
- [ ] Verificar no Google Search Console
- [ ] Solicitar aprovação do AdSense
- [ ] Criar conta no Pinterest e vincular (Pinterest SEO é fundamental para blogs de viagem)
- [ ] Integrar provedor de newsletter (ConvertKit, Brevo, etc.)
- [ ] Adicionar imagens reais aos artigos e guias
- [ ] Criar og-default.jpg (1200×630px) para compartilhamento social
- [ ] Escrever artigos! A estrutura está pronta.

---

*Feito com calma e propósito. 🌿*
