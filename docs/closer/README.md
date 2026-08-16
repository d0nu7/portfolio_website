# CLOSER documentation

This directory contains the current product, content, review, and engineering documentation for CLOSER. It intentionally uses living documents rather than one report per iteration.

## Sources of truth

| Area | Document | Authority |
|---|---|---|
| Product behavior and safety | [Gameplay and safety contract](product/gameplay-and-safety.md) | Desired user-visible behavior, consent rules, route semantics, and release acceptance |
| Product-owner actions | [RaDi owner TODO](product/radi-owner-todo.md) | Legal approval, editorial work, user sessions, infrastructure decisions, and release sign-off |
| Questions and routes | [Question catalog DE/EN](content/question-catalog.de-en.md) | Exact bilingual wording, stable IDs, route membership, pack finales, and pilot durations |
| Editorial rationale | [Question-design research](content/question-design-research.md) | Research synthesis, limitations, question criteria, and pack-specific editorial guidance |
| Current assessment | [Holistic review](reviews/current-review.md) | Latest product/code assessment and priorities |
| Defects | [Bug tracker](reviews/bugs.md) | Reproducible bugs, status, and acceptance criteria |
| Enhancements | [Feature requests](reviews/feature-requests.md) | Product additions and platform improvements |
| Architecture | [Refactoring roadmap](engineering/refactoring-roadmap.md) | Incremental structural plan and verification strategy |
| State transitions | [Transition matrix](engineering/transition-matrix.md) | Frozen phase/event contract and migration status |

Product code and automated tests remain the technical source of truth for what the current branch actually ships. When implementation and these documents disagree, record the mismatch in the bug tracker and resolve it deliberately; do not silently rewrite the desired behavior to match a regression.

## Current implementation summary

- Nine catalog packs are implemented: Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, Chaos, and Late Night.
- Late Night is available through a discreet menu preference while retaining independent per-session consent. The local regression gate passes; deployed and physical-device smoke tests remain.
- The implemented packs contain 324 German/English questions with stable IDs and automated exact catalog-fidelity coverage. CLASSIC is editorially immutable and has dedicated fingerprint regression coverage in addition to exact catalog fidelity.
- Road Trip, Family, and Colleagues are editorial candidates on the current feature branch, with 36 bilingual master questions and route, safety, and private-moment specifications each. They are not registered or playable yet. The combined editorial catalog now contains 12 packs and 432 questions; FR-013 and user-session validation remain prerequisites for release.
- Quick, Standard, and Full are curated routes. Packs with one valid style skip the style screen.
- Passing is unconditional; the former heart-based Skip mechanic is removed.
- Pack content is modularized under `src/closer/content/`; the compiled run still originates in `src/constants/closer.js` while the new pure transition core lives under `src/closer/engine/`.
- `compileRun()` is the controller and save parser's runtime source for question order, act boundaries, timing, private-moment placement, and fingerprinting. Persisted transitions, persistence parsing, browser storage, and phase presentation now have explicit tested boundaries.
- FR-011 is complete: compiled run structure, pure persisted transitions, persistence/storage boundaries, and focused presentation components are in place. Local automated verification passes; see [bugs](reviews/bugs.md) for remaining device work.
- TTS is shelved indefinitely and the existing voice branch is not planned for merge. It is outside the active roadmap unless a new product decision reopens it.

## Documentation conventions

- Documentation, source comments, test descriptions, and new commit messages are English.
- Localized product copy remains German/English where the interface supports both languages.
- The bilingual question text in the catalog is preserved verbatim unless an explicit editorial change is approved and synchronized with source plus fidelity tests.
- Do not hard-code passing test counts in living docs; link to the relevant command or CI result instead.
- Do not recreate dated review files. Update the relevant living document and rely on Git history for chronology.
