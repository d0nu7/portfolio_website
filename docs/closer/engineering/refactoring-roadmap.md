# CLOSER – architecture and refactoring record

**Updated:** 18 August 2026
**Status:** FR-011 complete

The refactoring is closed. This document records the architecture and maintenance rules that must survive future product work; completed phase-by-phase history lives in Git.

## Current architecture

```text
src/closer/
  content/
    packs/                    # one module per pack or specialist bundle
    privateMoments.js         # pack-specific private content
    shared.js
    index.js
  engine/
    transitions.js            # pure persisted navigation
    persistence.js            # canonical state, parsing, migration, validation
  infrastructure/
    storage.js                # guarded localStorage boundary

src/components/Closer/
  CloserGame.js               # browser effects and event orchestration
  CloserStartView.js
  CloserSetupView.js
  CloserConsentView.js        # dormant generic capability; no current pack uses it
  CloserActView.js
  CloserPrivateMomentView.js
  CloserQuestionView.js
  CloserFinaleView.js
  CloserMenu.js
  CloserScreenFrame.js

src/constants/closer.js       # compatibility exports and compileRun()
```

`compileRun()` is the runtime source for question order, act boundaries, timing, route-specific Private Moments, content revision, and fingerprint. Persisted navigation is handled by pure transitions. Focus, countdowns, animation, visibility, Wake Lock, and active timer effects remain intentionally browser-local.

## Stable run contract

```js
{
  packId,
  routeId,
  modeId,
  hasStyleChoice,
  requiresConsent,
  questions,
  actStarts,
  timing,
  secretAtIndex,
  privateMoment,
  contentRevision,
  fingerprint
}
```

`modeId` is a legacy persisted name for style. Renaming it is a separate optional save migration, not routine cleanup.

## Product invariants

1. Pass is free, unlimited, immediate, and never a token.
2. Replacement questions are a separate optional mechanic.
3. Singleton setup choices are skipped in both directions.
4. Quick routes omit long Private Moment and Question 37 ceremonies.
5. Private Moments are pack/route-specific, asymmetric, optional, and store no answer text.
6. Timing derives from route data; timers never advance the game.
7. Saves require compatible versions, run identity, and characterized phase state.
8. Milestones celebrate shared progress, never disclosure, speed, or consent.
9. Adult discovery, entering a pack, and agreement to any real-world action are separate.
10. SLOW BURN uses ordinary prompt state; body areas, adjustments, and agreement never enter app state.
11. Classic wording, translation, order, and route membership remain immutable.
12. TTS and offline support are outside the active architecture.

## Completed structural checks

- Content is modular and catalog-fidelity tested with globally stable IDs.
- Run fingerprints include every behavior-defining pack, route, and style choice.
- Restart uses canonical state; incompatible saves fail safely.
- Setup, questions, Pass, acts, Private Moments, finales, restart, and global settings have characterized pure transition coverage.
- Browser storage has one guarded ownership boundary.
- Active time is checkpointed and excludes hidden/dialog/celebration time.
- Presentation is split into focused phase views behind one shared screen stack.
- Adult packs reuse the low-attention controller instead of parallel interaction engines.

The detailed event contract remains in the [transition matrix](transition-matrix.md).

## Maintenance rules

- Change content in its pack module and synchronized bilingual catalog.
- Bump content/preference/state versions when compatibility changes.
- Add a transition only after characterizing valid origins, destination, state patch, and browser effects.
- Keep rendering-time randomness out of run structure.
- Keep localized copy out of engine logic.
- Do not add persisted intimate answers, consent decisions, body preferences, or private free text.
- Do not restore device-mediated adult confirmation rituals without a new product decision and real evidence.
- Remove only demonstrably unused code and documentation.
- Keep new documentation, source comments, tests, and commit messages in English.
- Use Git history instead of retaining completed iteration narratives.

## Verification

```text
npm run content:generate
npm run lint
npm test -- --runInBand
npm run test:e2e
git diff --check
```

Physical platforms and assistive technologies remain release validation under [BUG-010](../reviews/bugs.md#bug-010--physical-pwa-and-assistive-technology-coverage), not unfinished refactoring.
