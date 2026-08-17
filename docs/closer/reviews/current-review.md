# CLOSER – current holistic review

**Reviewed:** 17 August 2026
**Scope:** current `main` release candidate after pack-library and final UI polish
**Detailed trackers:** [bugs](bugs.md) · [feature requests](feature-requests.md) · [refactoring roadmap](../engineering/refactoring-roadmap.md)

## Overall assessment

CLOSER is a coherent, testable shared-device conversation product. The current branch completes the configurable pack library, makes Road Trip, Family, and Colleagues playable, and introduces a deliberately sparse pack-aware PLAYFUL rollout. The core experience still keeps the phone secondary: answers are spoken, Pass is free, timers never advance the game, and high-intensity or professionally sensitive packs do not inherit pressure actions.

The current main candidate passes its automated release gate. Public confidence still benefits from deployment smoke checks, broader physical Android/iOS coverage, and moderated sessions. RaDi has accepted the initial Android check and decided not to commission professional legal advice or offline support at the current stage; those decisions should be reopened only after a material product or risk change.

## Delivered in this branch

- Twelve implemented bilingual packs and 432 exact catalog questions.
- A versioned `visiblePackIds` preference with migration from the former Late Night boolean.
- A menu checklist for every registered pack; at least one pack must remain visible.
- Mainstream packs remain visible after migration. Late Night, Road Trip, Family, and Colleagues start hidden.
- Hiding a setup selection chooses a visible fallback, while an active or resumable hidden-pack run remains valid.
- Road Trip, Family, and Colleagues use no private handoff and have route-specific direct finales.
- Colleagues exposes Quick and Standard only, keeps its editorial reserve out of runtime, and disables the timer by default when selected.
- Road Trip uses the conservative first-release rule: parked vehicle or no participating driver only.
- Date Night, Couples, and Friends expose default plus PLAYFUL styles. Chaos retains a single thematic PLAYFUL style with safe co-creative actions.
- Deep, Late Night, Road Trip, Family, and Colleagues cannot render `PREDICT`, `BOTH`, or `NO THINKING` actions.
- PLAYFUL assignments are deterministic question data. Quick contains at most three actions; all routes enforce spacing and per-act density ceilings.
- Content revision 4 intentionally invalidates incompatible active saves after route/style behavior changed.
- The start screen now points to optional packs in the Menu. Adult packs are
  grouped in a collapsed 18+ section at the bottom, with Late Night and its
  explanation kept together.
- Milestone scenes use their original compact 2.1/2.5-second duration again;
  only the final scene/overlay fade is slowed, avoiding the previous stretched
  movement and hold phases.

## Product review by pack

| Pack | Current fit | Follow-up |
|---|---|---|
| Classic | Canonical research-derived sequence; wording remains untouched. | Preserve the immutable fingerprint. |
| First Date | Light, pressure-aware progression with a credible Quick default. | Consider PLAYFUL only after the first rollout is observed. |
| Date Night | Warm and suggestive without becoming explicit; PLAYFUL is limited to low-stakes moments. | Watch whether prediction ever feels like a partner test. |
| Couples | Positive-first and practical; PLAYFUL avoids repair, unmet needs, and conflict. | Pilot emotional fatigue on Full. |
| Friends | Clearly platonic and strong on appreciation and shared context. | Watch simultaneous shared-memory prompts for differing recollections. |
| Old Friends | Specific and non-prescriptive about renewed closeness. | Keep the current restrained style until reunion-sensitive testing is complete. |
| Deep | Correctly intentional, slower, and free of pressure mechanics. | Monitor fatigue and difficult-valence density. |
| Chaos | Co-creation and harmless absurdity support the strongest game-like identity. | Test whether Full sustains novelty without action fatigue. |
| Late Night | Explicit, discreet, independently consent-gated, and communication-centered. | Legal, safety, and diverse-adult sessions remain mandatory before broad promotion. |
| Road Trip | Travel-specific and inclusive without requiring distance, budget, or international travel. | Pilot parked and public-transport use before reconsidering any moving-vehicle design. |
| Family | Inclusive of chosen and non-traditional family; avoids assuming harmony or reconciliation. | Test with varied family forms and levels of contact. |
| Colleagues | Practical working preferences without assessment framing; reserve stays non-playable. | Use only voluntarily among near-peers and test across work contexts. |

## Remaining product opportunities

These are intentionally not blockers for closing this branch:

1. **Students / FH Salzburg (FR-015):** still needs its own research, bilingual editorial bank, local-name approval, and content owner. It should be a separate content feature, not improvised during this release closeout.
2. **PLAYFUL expansion:** First Date and Old Friends are later pilot candidates. Deep, Late Night, moving-vehicle Road Trip, and Colleagues require different or no interaction concepts rather than inherited Classic actions.
3. **Real sessions:** route duration, action fatigue, pressure, passing frequency, and attention to the phone cannot be validated mechanically.
4. **Physical platforms:** Android installed PWA, iOS Add to Home Screen, safe areas, system navigation, VoiceOver, TalkBack, and WebKit remain device checks.
5. **Infrastructure:** offline support is not planned for the current product. The custom-subdomain question remains an explicit owner decision.

## Verification contract

Run the full gate from a clean worktree:

```text
npm run content:generate
npm run lint
npm test -- --runInBand
npm run test:e2e
git diff --check
```

`npm run test:e2e` creates a fresh static export. Do not treat a run against an older `out/` directory as release evidence.
