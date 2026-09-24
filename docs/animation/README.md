# Animation implementation handoff

Requirements updated 2026-09-24. An implementation exists in the worktree;
verify its current behavior rather than treating this document as QA evidence.
See the [documentation index](../README.md) for current scope and authority.

## Goal

Deliver the CyanDinosaur890-to-Paul-Thumfart intro and its continuous transition
into a minimal, usable portfolio homepage with a stationary ambient night sky.
The completed page must work equally well when the intro is skipped or bypassed.

## Read in order

1. [Intro specification](intro-animation.md): choreography, final composition,
   visitor behavior, defaults and continuity requirements.
2. [Background specification](background-animation.md): permanent sky behavior.
3. [Image guide](images/README.md): visual references and known inaccuracies.
4. Repository AGENTS.md and [design policy](../../design-qa.md).

The written animation specifications govern the intentional landing-page changes
where older landing-page policy differs. All unrelated design guidance remains
in force. Generated artwork is subordinate to the written specification and
current verified content. It is not a screenshot, production asset or factual
source. Numeric motion ranges are tuning targets; semantic sequence is required.

## Scope and constraints

- Implement the desktop/large-screen intro, final minimal landing composition,
  stationary sky, skip/replay/session handling and accessible bypass states.
- Keep one name-above-portrait group, one role line, project action and social links.
- Preserve current technology inventory, public portrait, links and navigation.
- Remove the old large descriptive headline, paragraph and internal profile rail.
- Move landing basic information to About only where it is not already present.
  Reuse verified facts, inspect current About content and avoid duplication.
- This handoff governs the landing experience. The separate
  [inner-page styling brief](../design/inner-page-styling.md) governs the requested
  About, Certificates and Projects decluttering pass; do not duplicate the intro.
- Preserve Vue, Router, TypeScript and Vite patterns and unrelated work.
- Do not replace personal assets with generated placeholders, introduce private
  artifacts or claims, copy image filler text, add sound or real gameplay.
- Do not stage, commit, push, publish or deploy unless separately requested.

## Suggested execution sequence

1. Inspect current components, assets, tests, content and repository guidance.
2. Establish the final responsive homepage and verified About content placement.
3. Add stationary sky and accessible motion controls.
4. Implement the continuous intro into that same final composition.
5. Finish session, skip, replay, focus, resize and failure handling.
6. Run tests and inspect real motion; refine until the evidence below passes.

Do not stop at a separate animation mockup, static screenshot, or approximated
transition. The real page and the intro must share the intended visual identity.

## Completion evidence

| Requirement | Evidence required |
| --- | --- |
| Full choreography | Observe/record one uninterrupted start-to-finish run; confirm reading pause, hop, actual P contact, local burst, ripple origin and dinosaur exit. |
| 5A-6B continuity | Capture contact, opening, arrival and completed state; verify name above portrait throughout and no swap, duplicate or late layout jump. |
| Resting sky | Observe at least 30 seconds; stars/clouds fixed, only gentle luminance changes, no waves, moving particles or sticker loop. |
| Useful final page | Project action, navigation and all social links work; controls never wait for the last sticker. Role line readable; no basic-information footer. |
| About | Verify all moved facts against prior public content, preserve existing material and remove duplicates. |
| Eligibility | Check 1440x900 and 1280x800; both sides of final width/height thresholds; 390x844 phone, 844x390 landscape phone, 768x1024 tablet and 200% browser zoom. |
| Bypass | Verify small viewport, reduced motion, skip before start and skip during run all reach the same usable final layout. |
| Session/replay | Verify refresh, internal return, deliberate replay and a fresh tab session; no involuntary replay. |
| Resilience/accessibility | Check keyboard start/skip/focus, resize during run, hidden-tab return, essential-asset failure, no invisible input blockers and no focus trap. |
| Regression | Relevant tests and full npm test, npm run typecheck, npm run build; inspect browser errors and git diff --check. |

Add meaningful behavior tests for the newly implemented states. Still-image
comparison and source-pattern tests alone cannot prove motion or interaction.
Record checked viewport sizes, commands, outcomes, final eligibility threshold
and any unresolved limits in the implementation handoff. Goal completion requires
the requested behavior and visual evidence, not just a successful build.

## Goal-mode prompt

See [implementation prompt](implementation-prompt.md). It is a draft instruction
for a future implementation run; saving it does not start implementation.
For the inner-page styling task, use the
[inner-page goal metaprompt](../design/implementation-prompt.md) instead.
