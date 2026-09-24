# PortfolioHub design documentation

Updated 2026-09-24. These documents define requirements; they do not certify
that the current worktree satisfies them. Verify source and rendered behavior.

## Read in order

1. [Repository agent guidance](../AGENTS.md) and applicable scoped guidance.
2. [Shared design policy and QA](../design-qa.md).
3. [Inner-page styling and density brief](design/inner-page-styling.md) for About,
   Certificates and Projects: shared landing visual language, less clutter,
   lower spatial density and removal of unnecessary gradients.
4. [Shared stationary sky](animation/background-animation.md).
5. [Landing intro and regression requirements](animation/README.md), including
   the [intro choreography](animation/intro-animation.md) and
   [reference-image guide](animation/images/README.md).

## Authority and communication

- The user's current request takes precedence. Within these documents, the
  inner-page brief governs the new three-page styling pass; the animation
  specification governs landing choreography and shared ambient motion.
- Written requirements override generated artwork and historical screenshots.
  The live landing page is the visual reference, not a mandate to copy its
  content or layout literally. Inspect it before making implementation choices.
- Distinguish requirements, tuning defaults, observed implementation, and
  verified results. Do not label a specification as proof of completion.
- Report each requirement as verified, incomplete, or unverified, with concrete
  evidence and limitations. A successful build alone is not visual acceptance.
- Keep changes to professional facts and public/private artifacts outside this
  styling task. Preserve existing uncommitted work.

## Execution prompts

- [Inner-page goal metaprompt](design/implementation-prompt.md): the next styling
  and decluttering task. Saving this prompt does not start implementation.
- [Landing animation implementation prompt](animation/implementation-prompt.md):
  scoped to the landing experience; not the prompt for the inner-page task.
