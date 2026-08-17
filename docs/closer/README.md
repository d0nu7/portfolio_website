# CLOSER documentation

This directory contains the current product, content, review, and engineering documentation for CLOSER. It intentionally uses living documents rather than one report per iteration.

## Sources of truth

| Area | Document | Authority |
|---|---|---|
| Product behavior and safety | [Gameplay and safety contract](product/gameplay-and-safety.md) | Desired user-visible behavior, consent rules, route semantics, and release acceptance |
| Product-owner actions | [RaDi owner TODO](product/radi-owner-todo.md) | Legal approval, editorial work, user sessions, infrastructure decisions, and release sign-off |
| Questions and routes | [Question catalog DE/EN](content/question-catalog.de-en.md) | Exact bilingual wording, stable IDs, route membership, pack finales, and pilot durations |
| Editorial rationale | [Question-design research](content/question-design-research.md) | Research synthesis, limitations, question criteria, and pack-specific editorial guidance |
| Focused evidence reviews | [Research index](research/README.md) | FR-018–020 evidence base, source limits, candidate banks, cross-pack audit, and independent citation/safety QA |
| Current assessment | [Holistic review](reviews/current-review.md) | Latest product/code assessment and priorities |
| Defects | [Bug tracker](reviews/bugs.md) | Reproducible bugs, status, and acceptance criteria |
| Enhancements | [Feature requests](reviews/feature-requests.md) | Product additions and platform improvements |
| Architecture | [Refactoring roadmap](engineering/refactoring-roadmap.md) | Incremental structural plan and verification strategy |
| State transitions | [Transition matrix](engineering/transition-matrix.md) | Frozen phase/event contract and migration status |

Product code and automated tests remain the technical source of truth for what the current branch actually ships. When implementation and these documents disagree, record the mismatch in the bug tracker and resolve it deliberately; do not silently rewrite the desired behavior to match a regression.

## Current implementation summary

- Fourteen catalog packs are implemented: Classic, First Date, Date Night, Couples, Friends, Old Friends, Deep, Chaos, Late Night, Road Trip, Family, Colleagues, Power, by Choice, and Slow Burn.
- Late Night is available through a discreet menu preference. Like the other adult packs, it states the participation contract once in a shared introduction and then leaves check-ins to the people. The local regression gate passes; deployed and physical-device smoke tests remain.
- The implemented packs contain 489 German/English questions or action cards with stable IDs and automated exact catalog-fidelity coverage. CLASSIC is editorially immutable and has dedicated fingerprint regression coverage in addition to exact catalog fidelity.
- The menu contains a versioned, persistent pack library. Mainstream packs remain visible by default; specialist and adult packs start hidden and can be enabled independently without turning visibility into consent. Late Night remains the final item in the collapsed adult group.
- Date Night, Couples, and Friends offer an optional pack-aware PLAYFUL style. Chaos uses the same sparse action contract in its existing PLAYFUL presentation. Sensitive and professional packs remain free of countdown, prediction, and simultaneous-answer pressure.
- Quick, Standard, and Full are curated routes. Packs with one valid style skip the style screen.
- Passing is unconditional; the former heart-based Skip mechanic is removed.
- Pack content is modularized under `src/closer/content/`; specialist question data is reproducibly generated from the authoritative catalog with `npm run content:generate`.
- `compileRun()` is the controller and save parser's runtime source for question order, act boundaries, timing, private-moment placement, and fingerprinting. Persisted transitions, persistence parsing, browser storage, and phase presentation now have explicit tested boundaries.
- FR-005 is implemented: eligible Standard/Full routes use pack-specific asymmetric Private Moments, stable A/B handoffs, explicit shared and individual decline paths, route-specific use/discard points, and pack-specific finales. Quick has no Private Moment; adult packs do not use device-mediated participation gates.
- FR-011 is complete: compiled run structure, pure persisted transitions, persistence/storage boundaries, and focused presentation components are in place. Local automated verification passes; see [bugs](reviews/bugs.md) for remaining device work.
- The FR-018–020 evidence programme is complete. RaDi approved experimental implementations of the conversation-only **POWER, BY CHOICE** bank and the 21-card **SLOW BURN** guide on 17 August 2026, then approved a sharper editorial pass across all three adult packs. SLOW BURN now progresses to explicitly named touch at the chest or breasts, buttocks, and inner thighs while continuing to exclude genitals, anus, penetration, breath or neck play, restraint, impact, and surprise touch. After the first real-device playtest, both new packs use one shared introduction and ordinary prompt navigation: wishes, changes, pauses, and stopping are communicated between the people rather than entered into the phone. Implementation is not scientific, legal, accessibility, or safety validation; all external review and moderated-session gates named in the research remain open. Classic's 36 questions remain unchanged.
- TTS is shelved indefinitely and the existing voice branch is not planned for merge. It is outside the active roadmap unless a new product decision reopens it.

## Documentation conventions

- Documentation, source comments, test descriptions, and new commit messages are English.
- Localized product copy remains German/English where the interface supports both languages.
- The bilingual question text in the catalog is preserved verbatim unless an explicit editorial change is approved and synchronized with source plus fidelity tests.
- Do not hard-code passing test counts in living docs; link to the relevant command or CI result instead.
- Do not recreate dated review files. Update the relevant living document and rely on Git history for chronology.
