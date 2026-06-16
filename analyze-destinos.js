import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data/destinos.json', 'utf8'));

console.log('Total destinations:', data.length);

const fields = [
  'atmosfera',
  'whyVisit',
  'attractions',
  'restaurants',
  'cafes',
  'viewpoints',
  'trails',
  'localTips',
  'alternativeExperiences',
  'similarDestinations',
  'hiddenAlternatives',
  'porqueCombina',
  'experienciasAutenticas',
  'dicaStradello'
];

fields.forEach(field => {
  const missing = data.filter(d => !d[field] || d[field] === '').length;
  console.log(`Missing ${field}:`, missing);
});

// Show first few destinations missing atmosfera
const missingAtmosfera = data.filter(d => !d.atmosfera);
console.log('\nFirst 10 destinations missing atmosfera:');
missingAtmosfera.slice(0, 10).forEach(d => {
  console.log(`- ${d.nome} (${d.slug})`);
});
