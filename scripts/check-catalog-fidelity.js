const fs = require('fs');

const md = fs.readFileSync('docs/closer/content/CLOSER_Fragenkatalog_DE_EN.md', 'utf8');
const code = fs.readFileSync('src/constants/closer.js', 'utf8');

// Normalise both sides the same way: collapse whitespace, unify quote glyphs.
const norm = (s) =>
  s.replace(/\s+/g, ' ')
   .replace(/[“”„]/g, '"')
   .replace(/[‘’‚]/g, "'")
   .trim();

const codeFlat = norm(code);

// Catalog question rows look like: | Qnn | [Route |] German | English |
const rows = [];
for (const m of md.matchAll(/^\|\s*(Q\d\d)\s*\|(.+)$/gm)) {
  const cells = m[2].split('|').map((s) => s.trim()).filter((s) => s.length);
  // Packs with a Route column have 3 cells (route, de, en); others have 2 (de, en).
  const de = cells.length >= 3 ? cells[1] : cells[0];
  if (de) rows.push({ id: m[1], de: norm(de) });
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const missing = rows.filter((r) => {
  if (r.de.length < 15) return false;
  // Probe on a distinctive middle slice: avoids false negatives from the
  // leading word alone, short enough to survive minor trailing edits.
  const probe = escape(r.de.slice(0, 45));
  return !new RegExp(probe).test(codeFlat);
});

console.log('catalog question rows parsed :', rows.length);
console.log('NOT found verbatim in code   :', missing.length);
for (const m of missing.slice(0, 30)) {
  console.log('   ' + m.id + ' :: ' + m.de.slice(0, 90));
}
