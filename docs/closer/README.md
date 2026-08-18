# CLOSER documentation

Living product documentation only. Git history preserves completed iteration detail.

## Start here

| Need | Source of truth |
|---|---|
| Current priorities and product assessment | [Current review](reviews/current-review.md) |
| Open and delivered enhancements | [Feature requests](reviews/feature-requests.md) |
| Defects and device verification | [Bug tracker](reviews/bugs.md) |
| RaDi decisions and external work | [Owner TODO](product/radi-owner-todo.md) |
| User-visible behavior and safety | [Gameplay and safety](product/gameplay-and-safety.md) |
| Youth Workshop facilitation | [Facilitator guide (ages 14–17)](product/youth-workshop-facilitator-guide.md) |
| Exact DE/EN questions and routes | [Question catalog](content/question-catalog.de-en.md) |
| Editorial evidence and limitations | [Question-design research](content/question-design-research.md) and [research index](research/README.md) |
| Architecture and state | [Architecture record](engineering/refactoring-roadmap.md) and [transition contract](engineering/transition-matrix.md) |

## Current product

- Sixteen bilingual packs and 537 catalog questions/action cards ship.
- Classic is immutable and fingerprint-protected.
- Pack visibility is configurable. Fresh installs show a neutral five-pack core; relationship, situation, activity, youth, and adult packs remain discoverable in the library.
- Passing is free and unlimited. Routes, styles, Private Moments, and finales are pack-aware.
- Spoken answers and private free text are never stored.
- Adult packs use one shared introduction and keep ongoing communication between the people.
- Content, compiled runs, persisted transitions, browser storage, and phase views have explicit tested boundaries.
- TTS and offline support are not active work.

Product code and automated tests are authoritative for the deployed implementation. Record any documentation mismatch as a bug instead of silently changing the contract.

## Documentation rules

- Keep one living document per purpose; remove completed narrative that tests or Git already preserve.
- Keep open requirements detailed and delivered items to a status plus durable invariant.
- Documentation, source comments, tests, and commit messages are English.
- Localized UI and the catalog remain bilingual.
- Never edit catalog wording without synchronizing source, content revision, and fidelity tests.
- Frozen research reports may remain long because they preserve evidence and citations; do not treat their candidate copy as current runtime truth.
