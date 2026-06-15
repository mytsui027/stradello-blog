const fs = require('fs');

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeSpace(str) {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/ +/g, ' ')
    .trim();
}

const destinos = JSON.parse(fs.readFileSync('src/data/destinos.json', 'utf8'));
const images = fs.readdirSync('public/assets/blog');

const imageMap = {};
const imageMapSpace = {};

images.forEach(img => {
  if (!img.match(/\.(jpg|jpeg|png|webp)$/i)) return;
  const base = img.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const normalized = normalize(base);
  const normalizedSpace = normalizeSpace(base);
  imageMap[normalized] = img;
  imageMapSpace[normalizedSpace] = img;
});

const manualMatches = {
  'monte-verde': 'monteverde.jpg',
  'arraial-dajuda': 'Arraial d\'Ajuda.jpeg',
  'campos-do-jordao-sp': 'campos do jordão.jpg',
  'lencois-ba': 'lencois-maranhenses.jpg',
  'iguacu-national-park': 'Parque Nacional do Iguaçu.jpg'
};

const destinationsWithoutImages = [
  'sao-bento-do-sapucai',
  'alter-do-chao',
  'cunha',
  'sao-lourenco',
  'sao-jose-sc'
];

let fixedCount = 0;
let fallbackRemoved = 0;
const noMatches = [];

destinos.forEach(d => {
  const normalizedSlug = normalize(d.slug);
  const normalizedSlugSpace = normalizeSpace(d.slug);
  let matchingImage = imageMap[normalizedSlug] || imageMapSpace[normalizedSlug] || manualMatches[d.slug];
  
  if (destinationsWithoutImages.includes(d.slug)) {
    // Remove incorrect image paths for destinations without images
    if (d.imagem && !d.imagem.includes('bem-vindo-ao-stradello')) {
      d.imagem = '';
      fixedCount++;
    }
    noMatches.push({slug: d.slug, nome: d.nome, current: 'REMOVED'});
  } else if (matchingImage && d.imagem !== '/assets/blog/' + matchingImage) {
    if (d.imagem.includes('bem-vindo-ao-stradello')) {
      fallbackRemoved++;
    }
    d.imagem = '/assets/blog/' + matchingImage;
    fixedCount++;
  } else if (!matchingImage && !d.imagem) {
    noMatches.push({slug: d.slug, nome: d.nome, current: 'NO IMAGE'});
  }
});

fs.writeFileSync('src/data/destinos.json', JSON.stringify(destinos, null, 2));

console.log('FIXED:', fixedCount);
console.log('FALLBACKS REMOVED:', fallbackRemoved);
console.log('NO MATCHES:', noMatches.length);
console.log('\nDESTINATIONS WITHOUT IMAGES:');
noMatches.forEach(n => console.log(n.slug, '-', n.nome, '|', n.current));
