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

- Twelve catalog packs are implemented: Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, Chaos, Late Night, Road Trip, Family, and Colleagues.
- Late Night is available through a discreet menu preference while retaining independent per-session consent. The local regression gate passes; deployed and physical-device smoke tests remain.
- The implemented packs contain 432 German/English questions with stable IDs and automated exact catalog-fidelity coverage. CLASSIC is editorially immutable and has dedicated fingerprint regression coverage in addition to exact catalog fidelity.
- The menu contains a versioned, persistent pack library. Mainstream packs remain visible by default; Late Night and the three specialist packs start hidden and can be enabled independently without turning visibility into consent.
- Date Night, Couples, and Friends offer an optional pack-aware PLAYFUL style. Chaos uses the same sparse action contract in its existing PLAYFUL presentation. Sensitive and professional packs remain free of countdown, prediction, and simultaneous-answer pressure.
- Quick, Standard, and Full are curated routes. Packs with one valid style skip the style screen.
- Passing is unconditional; the former heart-based Skip mechanic is removed.
- Pack content is modularized under `src/closer/content/`; specialist question data is reproducibly generated from the authoritative catalog with `npm run content:generate`.
- `compileRun()` is the controller and save parser's runtime source for question order, act boundaries, timing, private-moment placement, and fingerprinting. Persisted transitions, persistence parsing, browser storage, and phase presentation now have explicit tested boundaries.
- FR-011 is complete: compiled run structure, pure persisted transitions, persistence/storage boundaries, and focused presentation components are in place. Local automated verification passes; see [bugs](reviews/bugs.md) for remaining device work.
- TTS is shelved indefinitely and the existing voice branch is not planned for merge. It is outside the active roadmap unless a new product decision reopens it.

## Documentation conventions

- Documentation, source comments, test descriptions, and new commit messages are English.
- Localized product copy remains German/English where the interface supports both languages.
- The bilingual question text in the catalog is preserved verbatim unless an explicit editorial change is approved and synchronized with source plus fidelity tests.
- Do not hard-code passing test counts in living docs; link to the relevant command or CI result instead.
- Do not recreate dated review files. Update the relevant living document and rely on Git history for chronology.
