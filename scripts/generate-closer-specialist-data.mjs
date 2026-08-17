import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = fs.readFileSync(
  path.join(root, 'docs/closer/content/question-catalog.de-en.md'),
  'utf8'
);

const definitions = [
  ['ROAD_TRIP_QUESTIONS', '## 11. ROAD TRIP', '## 12. FAMILY', 'road-trip'],
  ['FAMILY_QUESTIONS', '## 12. FAMILY', '## 13. COLLEAGUES', 'family'],
  ['COLLEAGUES_QUESTIONS', '## 13. COLLEAGUES', null, 'colleagues'],
];

const exports = definitions.map(([name, heading, nextHeading, idPrefix]) => {
  const start = source.indexOf(heading);
  if (start < 0) throw new Error(`Missing catalog heading: ${heading}`);
  const end = nextHeading ? source.indexOf(nextHeading, start + heading.length) : source.length;
  if (end < 0) throw new Error(`Missing catalog heading: ${nextHeading}`);
  const section = source.slice(start, end);
  const questions = [...section.matchAll(/^\| Q(\d{2}) \| [^|]+ \| (.+?) \| (.+?) \|$/gm)]
    .map((match) => ({
      id: `${idPrefix}-q${match[1]}`,
      de: match[2].trim(),
      en: match[3].trim(),
    }));
  if (questions.length !== 36) {
    throw new Error(`${heading}: expected 36 questions, found ${questions.length}`);
  }
  return `export const ${name} = ${JSON.stringify(questions, null, 2)};`;
});

const target = path.join(root, 'src/closer/content/packs/specialist-question-data.js');
fs.writeFileSync(
  target,
  `/* Generated verbatim from docs/closer/content/question-catalog.de-en.md. */\n\n${exports.join('\n\n')}\n`,
  'utf8'
);
