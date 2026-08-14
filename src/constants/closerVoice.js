/*
 * CLOSER's optional voice-over.
 *
 * Audio is pre-generated (see scripts/generate-closer-voice.js) and shipped
 * as static files under public/audio/closer/<lang>/<id>.mp3 -- the app never
 * calls a text-to-speech API itself, so there is no key to hold and nothing
 * new to be private about. If a file is missing (not generated yet, or a
 * question was added since), playback just fails quietly and the control
 * disappears; the game is always fully playable with voice off.
 */

export function voiceId(qIndex) {
  return `q${String(qIndex + 1).padStart(2, '0')}`;
}

export function voiceSrc(lang, qIndex) {
  return `/audio/closer/${lang}/${voiceId(qIndex)}.mp3`;
}
