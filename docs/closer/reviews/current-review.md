# CLOSER – current review

**Reviewed:** 18 August 2026
**Trackers:** [features](feature-requests.md) · [bugs](bugs.md) · [owner TODO](../product/radi-owner-todo.md)

## Assessment

CLOSER is a coherent, testable shared-device two-person product. Sixteen bilingual packs ship with curated routes, exact catalog fidelity, free Pass, versioned saves, and a configurable library. Spoken answers and private free text never enter application state. The phone remains secondary during questions and activities.

Classic stays immutable. Pressure mechanics are deterministic and limited to approved pack/question combinations. Private Moments are asymmetric, route-specific, and absent from Quick and excluded packs. Adult content is hidden by default, uses one shared introduction, and leaves ongoing communication between the people rather than adding repeated device rituals.

The automated release gate passes. The remaining evidence gap is real-world use: physical iOS/Android accessibility, timing calibration, and moderated sessions cannot be replaced by browser automation.

## Pack snapshot

| Group | Packs | Current position | Main follow-up |
|---|---|---|---|
| Core | Classic, Friends, Old Friends, Deep, Chaos | Broad conversation, friendship, depth, and playful absurdity | Observe duration, fatigue, and PLAYFUL pressure |
| Relationships | First Date, Date Night, Couples | Pressure-aware romantic/relationship contexts | Validate positioning and partner-test risk |
| Specialist | Road Trip, Family, Colleagues | Hidden contexts with conservative boundaries and no Private Moments | Test varied real settings and participants |
| Activities | Off Script | Cooperative, unscored, multimodal situational play with no sensors, essential timing, synchronization, or assumed contact | Test physical, quiet, public, and varied-access settings |
| Youth | Youth Workshop (14–17) | Hidden, non-resumable comparable-peer icebreaker with no answer recording and an explicit interpersonal secrecy limit | Safeguarding, educator, bilingual, accessibility, privacy, and moderated review |
| Adult | Late Night, Power, by Choice, Slow Burn | Hidden explicit conversation/touch experiences with low-attention interaction | Complete named external and moderated reviews |

Road Trip remains parked/no-participating-driver only. Colleagues is voluntary and intended for near-peers, not evaluation. Slow Burn excludes genitals, anus, penetration, breath/neck play, restraint, impact, and surprise touch. None of the experimental packs should be described as scientifically, legally, or clinically validated.

## Current priorities

1. Run safeguarding, educator, bilingual, accessibility, and moderated review for Youth Workshop before broad institutional promotion.
2. Test OFF SCRIPT in physical, quiet, public, seated, and limited-mobility settings.
3. Research and write Students/FH Salzburg (FR-015).
4. Curate replacement-question pools before implementing FR-006.
5. Continue safe pack-aware PLAYFUL pilots (FR-016).
6. Run moderated timing/content sessions (FR-008) and complete BUG-010 device checks.
7. Decide whether `closer.radi.solutions` warrants a separate origin (FR-010).

Offline support and TTS are not active work.

## Verification

Use a fresh export:

```text
npm run content:generate
npm run lint
npm test -- --runInBand
npm run test:e2e
git diff --check
```

Implementation detail and old review chronology live in tests and Git history, not in this document.
