#!/usr/bin/env node
/*
 * Generates the optional CLOSER voice-over: one mp3 per question, per
 * language, via the ElevenLabs text-to-speech API.
 *
 * This is deliberately a one-off admin script, not part of the build. CLOSER
 * is a static export with no backend and no server-side secrets, so audio is
 * generated once, ahead of time, on your machine, and the resulting mp3
 * files are committed to the repo like any other static asset under
 * public/. The app never calls ElevenLabs at runtime and never ships an API
 * key to the browser.
 *
 * Usage:
 *   ELEVENLABS_API_KEY=... \
 *   ELEVENLABS_VOICE_ID_DE=... \
 *   ELEVENLABS_VOICE_ID_EN=... \
 *   node scripts/generate-closer-voice.js [--lang=de|en] [--only=q01,q07] [--force]
 *
 * Env vars (or a .env.local -- this script reads that file itself, see below):
 *   ELEVENLABS_API_KEY     required. From https://elevenlabs.io/app/settings/api-keys
 *   ELEVENLABS_VOICE_ID_DE required. Voice ID for German lines.
 *   ELEVENLABS_VOICE_ID_EN required. Voice ID for English lines.
 *     Both can point at the same voice ID if you want one voice for both
 *     languages -- eleven_multilingual_v2 handles German and English from a
 *     single English-trained voice reasonably well. Pick a voice from your
 *     ElevenLabs "Voice Library" (Voices -> Explore) and copy its Voice ID
 *     from the voice's settings. Nothing here can verify what a voice
 *     *sounds* like ahead of time -- listen to the library preview and pick
 *     the one that matches what you want (RaDi asked for something like a
 *     calm, warm, plain-spoken male voice; "Adam" or "Josh" in the stock
 *     library are reasonable starting points, but this is a matter of taste,
 *     confirm by ear).
 *   ELEVENLABS_MODEL_ID    optional, defaults to eleven_multilingual_v2.
 *
 * Flags:
 *   --lang=de|en   only generate one language (default: both)
 *   --only=q01,q07 only generate specific question ids (default: all 36)
 *   --force        regenerate even if the mp3 already exists (default: skip
 *                  existing files, so a partial/interrupted run is safe to
 *                  re-run and re-runs after adding a question don't re-spend
 *                  credits on the other 35)
 *
 * Output: public/audio/closer/<lang>/<id>.mp3 (e.g. public/audio/closer/de/q01.mp3)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.join(__dirname, '..');

// Load a local .env.local by hand -- no dependency on dotenv for a script
// that runs maybe twice ever.
function loadDotEnvLocal() {
  const file = path.join(ROOT, '.env.local');
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, key, rawVal] = m;
    if (process.env[key] !== undefined) continue; // real env wins
    process.env[key] = rawVal.replace(/^["']|["']$/g, '');
  }
}
loadDotEnvLocal();

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1];
const has = (name) => args.includes(`--${name}`);

const LANGS = flag('lang') ? [flag('lang')] : ['de', 'en'];
const ONLY = flag('only') ? flag('only').split(',').map((s) => s.trim()) : null;
const FORCE = has('force');

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = { de: process.env.ELEVENLABS_VOICE_ID_DE, en: process.env.ELEVENLABS_VOICE_ID_EN };
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';

function fail(msg) {
  console.error(`\n${msg}\n`);
  process.exit(1);
}

if (!API_KEY) {
  fail(
    'ELEVENLABS_API_KEY is not set.\n' +
      'Get one from https://elevenlabs.io/app/settings/api-keys and either export it\n' +
      'or put it in a .env.local file in the repo root (already gitignored):\n\n' +
      '  ELEVENLABS_API_KEY=xi-...\n' +
      '  ELEVENLABS_VOICE_ID_DE=...\n' +
      '  ELEVENLABS_VOICE_ID_EN=...\n'
  );
}
for (const lang of LANGS) {
  if (!VOICE_ID[lang]) {
    fail(
      `ELEVENLABS_VOICE_ID_${lang.toUpperCase()} is not set. Pick a voice in the ElevenLabs\n` +
        'Voice Library and copy its Voice ID (Voices -> your voice -> Voice ID).'
    );
  }
}

const LINES = JSON.parse(fs.readFileSync(path.join(__dirname, 'closer-voice-lines.json'), 'utf8'));
const WANTED = ONLY ? LINES.filter((l) => ONLY.includes(l.id)) : LINES;

function ttsRequest(text, voiceId) {
  const body = JSON.stringify({
    text,
    model_id: MODEL_ID,
    voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  });
  const options = {
    method: 'POST',
    hostname: 'api.elevenlabs.io',
    path: `/v1/text-to-speech/${voiceId}`,
    headers: {
      'xi-api-key': API_KEY,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
      'Content-Length': Buffer.byteLength(body),
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(buf);
        else reject(new Error(`HTTP ${res.statusCode}: ${buf.toString('utf8').slice(0, 400)}`));
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  let made = 0;
  let skipped = 0;
  let failed = 0;

  for (const lang of LANGS) {
    const dir = path.join(ROOT, 'public', 'audio', 'closer', lang);
    fs.mkdirSync(dir, { recursive: true });

    for (const line of WANTED) {
      const out = path.join(dir, `${line.id}.mp3`);
      if (!FORCE && fs.existsSync(out)) {
        skipped += 1;
        continue;
      }
      const text = line[lang];
      process.stdout.write(`${lang}/${line.id} ... `);
      try {
        const audio = await ttsRequest(text, VOICE_ID[lang]);
        fs.writeFileSync(out, audio);
        made += 1;
        console.log(`ok (${(audio.length / 1024).toFixed(0)} KB)`);
      } catch (err) {
        failed += 1;
        console.log(`FAILED -- ${err.message}`);
      }
      // Be polite to the API rather than firing 36+36 requests back to back.
      await sleep(350);
    }
  }

  console.log(`\n${made} generated, ${skipped} already existed, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

run();
