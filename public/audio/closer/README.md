CLOSER's optional voice-over lives here as static mp3 files:

```
public/audio/closer/de/q01.mp3 .. q36.mp3
public/audio/closer/en/q01.mp3 .. q36.mp3
```

Nothing in this folder is checked into the repo yet -- generate it with
`npm run voice:closer` (see scripts/generate-closer-voice.js for the required
ElevenLabs API key and voice IDs). Once generated, commit the mp3 files
normally; they are static assets like any image under `public/`.

If a file for the current language/question is missing, the app fails
silently: the "Listen" control on the question screen just doesn't appear.
Voice is always optional -- CLOSER is fully playable with none of these
files present.
