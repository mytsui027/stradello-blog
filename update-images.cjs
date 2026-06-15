const fs = require('fs');

const destinos = JSON.parse(fs.readFileSync('src/data/destinos.json', 'utf8'));

// Update image paths for the 5 manually added destinations
const imageUpdates = {
  'sao-bento-do-sapucai': '/assets/blog/sao-bento-do-sapucai.jpeg',
  'alter-do-chao': '/assets/blog/alter-do-chão.jpg',
  'cunha': '/assets/blog/cunha-sp.jpg',
  'sao-lourenco': '/assets/blog/sao-jose.jpg',
  'sao-jose-sc': '/assets/blog/sao-jose.jpg'
};

let updatedCount = 0;
destinos.forEach(d => {
  if (imageUpdates[d.slug]) {
    d.imagem = imageUpdates[d.slug];
    updatedCount++;
    console.log('Updated:', d.slug, '->', d.imagem);
  }
});

// Add new destinations
const newDestinations = [
  {
    "slug": "vitoria-es",
    "nome": "Vitória",
    "estado": "Espírito Santo",
    "pais": "Brasil",
    "descricao": "Capital capixaba com orla urbana, gastronomia de frutos do mar, ilhas paradisíacas e clima tropical vibrante.",
    "imagem": "/assets/blog/vitoria-es.jpg",
    "categorias": [
      "praia",
      "cidade",
      "gastronomia",
      "ilhas",
      "tropical"
    ],
    "similares": [
      "ilha-grande",
      "buzios",
      "cabofrio"
    ],
    "alternativas": [
      "ilha-grande",
      "buzios"
    ],
    "pontuacoes": {
      "solo": 7,
      "casal": 9,
      "familia": 8,
      "natureza": 7,
      "praia": 10,
      "cidade": 9,
      "gastronomia": 8,
      "ilhas": 9,
      "tropical": 10,
      "calor": 10,
      "frio": 0,
      "economico": 7,
      "medio": 8,
      "premium": 8
    }
  },
  {
    "slug": "itaunas",
    "nome": "Itaúnas",
    "estado": "Espírito Santo",
    "pais": "Brasil",
    "descricao": "Vila de pescadores com dunas gigantes, praia selvagem preservada, forró tradicional e atmosfera de village rústico.",
    "imagem": "/assets/blog/vila-de-itaunas.jpg",
    "categorias": [
      "praia",
      "natureza",
      "dunas",
      "cultura",
      "rustico"
    ],
    "similares": [
      "arraial-do-cabo",
      "jericoacoara",
      "alter-do-chao"
    ],
    "alternativas": [
      "jericoacoara",
      "arraial-do-cabo"
    ],
    "pontuacoes": {
      "solo": 8,
      "casal": 9,
      "familia": 7,
      "natureza": 10,
      "praia": 10,
      "dunas": 10,
      "cultura": 8,
      "rustico": 9,
      "calor": 10,
      "frio": 0,
      "economico": 8,
      "medio": 7,
      "premium": 6
    }
  }
];

destinos.push(...newDestinations);
console.log('Added', newDestinations.length, 'new destinations');

fs.writeFileSync('src/data/destinos.json', JSON.stringify(destinos, null, 2));

console.log('\nSUMMARY:');
console.log('Updated image paths:', updatedCount);
console.log('Added new destinations:', newDestinations.length);
console.log('Total destinations:', destinos.length);
