# CLOSER documentation

This directory contains the current product, content, review, and engineering documentation for CLOSER. It intentionally uses living documents rather than one report per iteration.

## Sources of truth

| Area | Document | Authority |
|---|---|---|
| Product behavior and safety | [Gameplay and safety contract](product/gameplay-and-safety.md) | Desired user-visible behavior, consent rules, route semantics, and release acceptance |
| Product-owner actions | [RaDi owner TODO](product/radi-owner-todo.md) | Legal approval, editorial work, user sessions, infrastructure decisions, and FR-011 commissioning |
| Questions and routes | [Question catalog DE/EN](content/question-catalog.de-en.md) | Exact bilingual wording, stable IDs, route membership, pack finales, and pilot durations |
| Editorial rationale | [Question-design research](content/question-design-research.md) | Research synthesis, limitations, question criteria, and pack-specific editorial guidance |
| Current assessment | [Holistic review](reviews/current-review.md) | Latest product/code assessment and priorities |
| Defects | [Bug tracker](reviews/bugs.md) | Reproducible bugs, status, and acceptance criteria |
| Enhancements | [Feature requests](reviews/feature-requests.md) | Product additions and platform improvements |
| Architecture | [Refactoring roadmap](engineering/refactoring-roadmap.md) | Incremental structural plan and verification strategy |

Product code and automated tests remain the technical source of truth for what the current branch actually ships. When implementation and these documents disagree, record the mismatch in the bug tracker and resolve it deliberately; do not silently rewrite the desired behavior to match a regression.

## Current implementation summary

- Live packs: Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, and Chaos.
- Late Night content is complete and available through a discreet menu preference while retaining independent per-session consent. The local regression gate passes; deployed and physical-device smoke tests remain.
- All 324 German/English questions have stable IDs and automated exact catalog-fidelity coverage.
- Quick, Standard, and Full are curated routes. Packs with one valid style skip the style screen.
- Passing is unconditional; the former heart-based Skip mechanic is removed.
- Pack content is modularized under `src/closer/content/`; `src/constants/closer.js` remains a compatibility facade.
- `compileRun()` exists but is not yet the sole runtime source. Reducer extraction and phase-discriminated persistence remain open architecture work.
- The active iteration repairs mobile control spacing, milestone presentation, dialog subview focus, Late Night discovery/consent behavior, STAY safety, and in-app legal reachability. Local automated verification passes; see [bugs](reviews/bugs.md) for remaining device work.
- Voice/TTS work remains isolated on its separate branch until the content identity and normal game changes are stable.

## Documentation conventions

- Documentation, source comments, test descriptions, and new commit messages are English.
- Localized product copy remains German/English where the interface supports both languages.
- The bilingual question text in the catalog is preserved verbatim unless an explicit editorial change is approved and synchronized with source plus fidelity tests.
- Do not hard-code passing test counts in living docs; link to the relevant command or CI result instead.
- Do not recreate dated review files. Update the relevant living document and rely on Git history for chronology.
