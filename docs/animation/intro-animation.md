# Cyan Dinosaur intro animation

Status: choreography and regression requirements. Updated 2026-09-24.
Implementation exists; current source and browser checks establish compliance.

Start with the [handoff and acceptance plan](README.md). Defaults below resolve
remaining design details for implementation; they are not claims of prior user
approval for each numeric value. Tune them through the required visual checks
without changing the agreed story or scope.

## Purpose and authority

CyanDinosaur890 runs into Paul Thumfart: the former gaming identity leads into
the personal portfolio. A short, visitor-started runner scene becomes the actual
landing-page composition. This document records the direction agreed in the
design conversation; numeric values are proposed choreography targets, not
measured or implemented behavior.

Read with [background animation](background-animation.md) and
[repository design policy](../../design-qa.md). The agreed landing-page direction
intentionally replaces the old large professional headline, paragraph, profile
rail and internal divider with one name-above-portrait group. It also replaces
the landing banner's traveling waves with the stationary night sky. These are
landing-page requirements. The separate
[inner-page brief](../design/inner-page-styling.md) governs the three-page styling
pass; the dinosaur sequence remains exclusive to the landing page. No deployment
or new personal claims are authorized by either specification.

## Settled visual direction

- Dark ink/teal, cyan accents, white typography; crisp pixel dinosaur.
- Click starts one short choreographed run. Name enters before the portrait.
- Name is above the circular portrait throughout; neither is replaced at arrival.
- Dinosaur hops and touches the left edge of the P in Paul with its nose.
- Local cyan pixel burst, contact pause, then expanding ripple.
- Ripple becomes the curved cyan boundary of the landing page.
- Identity group persists into the final page, with generous negative space.
- Technology stickers occupy the white region and settle once.
- Actions arrive in 6B, overlapping the end of sticker settling.
- Stars and clouds remain afterward, fixed in position with subtle light changes.

## Confirmed visitor behavior

- Offer the intro once per browser session on eligible screens. Returning from
  an inner page goes directly to the completed homepage; no involuntary replay.
- Provide a quiet Replay intro control on the completed page where the intro is
  eligible. Replay is deliberate and uses the same fixed choreography.
- One explicit start action supports pointer, touch and keyboard. Skip intro is
  available before and throughout the sequence and reaches the completed page.
- Interaction is minimal: start, skip and replay. The jump and successful outcome
  are choreographed; there is no mandatory timed input or failure state.
- Reduced motion goes directly to the completed composition with a static sky;
  no hop, zoom, particles or sticker tilt. Replay must respect that preference.
- Silent experience. Include the restrained partial moon specified in the
  [shared sky requirements](background-animation.md), clear of content and controls.
- Basic information belongs on About, not in the landing hero or its entrances.
  Check existing About content before moving facts, avoid duplication, and
  preserve their verified meaning. The inner-page styling pass must retain this
  placement rather than copying basic information back into the landing hero.

The intro is for larger screens only. Use the eligibility defaults below and
validate usable space before retaining the intro at a particular size.

## Composition and continuity

Desktop starting composition: dinosaur in the left third facing right, thin
ground near the lower fifth, sparse cactus scenery. Identity enters into the
right half, with name above portrait. Leave clear space between dinosaur and P
for an unmistakable approach and jump. Exact sizes depend on the final viewport;
do not infer production geometry from generated illustrations.

Final dark-region hierarchy: Paul Thumfart, circular portrait, one understated
professional line, Explore projects action, then Email/GitHub/LinkedIn row.
Basic information moves to About; do not reserve a footer row for it in the hero.
Keep the existing approved facts and destinations;
copy and header defaults are specified below. The white technology
region remains alongside the dark region on desktop. The hero name is not
duplicated in a second profile rail. Smaller screens show the final composition.

Use the same visible name and portrait across the transition. Do not cross them,
swap their order, fade in a duplicate, or zoom the name out of readability.
Keep spacing within the group nearly constant until its final settling motion.

## Timeline and dependencies

Time zero is the visitor's start action. Total target: 4.40 seconds, excluding
the unlimited waiting state. Small timing refinements are allowed only if the
reading pause and causal sequence remain clear.

| Phase | Time | Main event | Parallel events | Exit condition |
| --- | --- | --- | --- | --- |
| 1 Waiting | Before start | Dinosaur waits; clear start invitation | Faint stationary sky; minimal idle motion | Visitor starts or skips |
| 2 Run | 0.00-0.45 s | Small crouch, first running steps | Prompt fades; ground accelerates left | Running is established |
| 3 Reveal | 0.45-1.30 s | Name slides in from right; portrait follows about 0.12 s later | Running continues; ground scrolls | Both identity elements settle |
| 4 Approach | 1.30-2.10 s | Name remains readable; dinosaur closes gap | Scenery becomes less prominent | Clear jump path to P |
| 5 Jump | 2.10-2.55 s | Short deliberate hop, nose aimed at left edge of P | Camera stays steady | Nose makes contact |
| 5 Contact | 2.55-2.68 s | Brief compression and contact hold | Compact cyan pixel burst; P gets a brief cyan edge highlight | Contact is perceptible |
| 5A Opening | 2.68-3.15 s | Ripple expands; modest camera push | Sparse edge pixels; dinosaur begins downward exit | Opening is established |
| 5B Unfold | 3.15-3.65 s | Ripple edge becomes divider; white area emerges | Identity moves as a group; ground and cactus fade | Final composition is recognizable |
| 6A Arrival | 3.65-3.95 s | Identity slows to final position | Professional line/navigation fade; stickers begin settling | Identity is stationary |
| 6B Actions | 3.85-4.40 s | Primary action, then social row | Stickers finish; additional sky details softly appear | All foreground content is still and available |
| 7 Rest | After 4.40 s | Normal landing page | Only subtle sky luminance animation | Visitor explores |

Strict order: start -> run -> readable identity -> jump -> contact -> ripple ->
recognizable landing composition -> completed foreground. 6A and 6B overlap;
the last sticker must never gate access to the primary action.

## Contact and particles

Proposed tuning: approximately 8-12 small square cyan particles at contact,
fanning outward/upward and fading over roughly 0.25-0.45 seconds. Keep the burst
local and away from the portrait and most letters. Name stays intact; no shards,
explosion, game-over face, screen shake, or full-screen flash.

The ripple carries only about 3-6 additional sparse square accents for roughly
0.35-0.60 seconds. This is a secondary trail, not a continuous emitter. All
collision particles disappear before the resting page. Counts are tuning
proposals; visual restraint is the acceptance criterion.

## Detailed 5A -> 5B -> 6A transition

### 5A: contact opens the scene

Ripple starts exactly at the P contact point, behind the name. Initially its
edge is subtly stepped; it smooths as it expands. Camera push is moderate so
the name remains readable. Portrait and name stay visible above the effect.
Dinosaur releases from contact and follows a short downward arc toward the
lower-left foreground, fading with the terrain rather than vanishing instantly.

### 5B: the page unfolds around the identity

The right edge of the ripple resolves into the curved cyan divider. White space
and technology stickers are revealed on its right. Identity group travels
together toward its final location in the dark region with gentle scaling.
At least a few stars/clouds remain visible across the change. Terrain disappears;
there is no blank interstitial frame or replacement identity.

### 6A: identity settles

Group decelerates smoothly without springy overshoot. Only near the destination
may its internal spacing relax slightly. Divider stops moving. No former large
headline, long paragraph, or internal vertical rail reappears. Professional
context is one understated line. Header/navigation enters without displacing
the composition. Sticker wave is a single small tilt/correction/settle, not a
permanent wobble.

### 6B: useful controls complete the scene

At about 3.85 s, fade the project action with at most a tiny upward settle.
Social links fade together about 0.10 s later and finish by 4.40 s. There is no
basic-information entrance; that content belongs on About. Retain the remaining
settling time rather than filling it with another reveal. No separate flights per icon. Controls
become available as they appear; invisible controls must not intercept input.
Navigation is independent of the sticker wave. Existing content destinations
must be preserved when implementation is later authorized.

## Implementation defaults

| Detail | Default |
| --- | --- |
| Eligibility | Start with at least 1024 CSS pixels wide AND 700 CSS pixels high, normal motion preference, and enough room for readable name, portrait and jump clearance. Validate and tighten this rule if visual evidence requires it. |
| Start | Visible Start intro button; support click, tap, Enter and Space through ordinary button behavior. No automatic start. |
| Skip | Skip intro in a stable top corner, visible before and throughout the run; immediately resolve to final content. |
| Replay | Quiet Replay intro control after social links; available only while eligible and normal motion is enabled. It does not reset ordinary session behavior. |
| Session | Treat completion, skip or automatic bypass as having handled the introduction for the current tab session. Reload and internal navigation must not offer it again in that session. No persistent first-ever-visit record. |
| Focus | After start, keep Skip accessible. On skip or completion, transfer focus from a disappearing intro control to the landing heading; do not steal focus from a destination the visitor already selected. |
| Small/short screens | Show completed responsive homepage immediately; name above portrait, role and actions, then stickers below as space requires. Natural scrolling is allowed. |
| Resize or orientation change | If no longer eligible, finish immediately. Enlarging never starts or offers an intro automatically; deliberate replay may become available. |
| Interrupted tab | If the tab becomes hidden during the run, resolve to final content on return; no catch-up animation. |
| Asset failure | Do not trap the visitor in loading. Bypass the intro if essential assets fail or are not ready at start. Preserve portrait geometry with a neutral initials fallback if needed. |
| Copy | Paul Thumfart; Backend Software Engineer; Explore projects; existing Email/GitHub/LinkedIn labels and destinations. No added specialization paragraph. |
| Header | Preserve existing wordmark and navigation conventions; Pathu.dev in the concept images is not an instruction to rename the header. |

These defaults are bounded implementation choices, not permission to redesign
the experience. Do not add analytics, a new consent flow, real gameplay, sound,
or a permanent cross-session visitor record. Browser storage failure must not
prevent access to the homepage.

### Larger-screen rationale

The run, legible identity,
jump clearance and ripple need space; a separate mobile choreography would add
complexity without improving access to the portfolio. Smaller screens should
open the complete responsive homepage immediately, with the same name-above-
portrait hierarchy, role line and controls. Stickers can stack below; the subtle
stationary sky can remain unless reduced motion is requested. Skipping the intro
does not mean removing the landing-page atmosphere.

Determine eligibility from usable width AND height rather than device labels:
a landscape phone may be wide but too short, while a large tablet may have room.
Validate the starting threshold against narrow laptops, tablets, short landscape
screens and browser zoom. No separate mobile intro or below-hero ripple is in
scope. Document the final validated threshold in the implementation evidence.

### Professional context

Retain one role line, using the existing Backend Software Engineer wording as
the final working copy. It tells recruiters what the person does; technology stickers
alone do not express a professional role. Place it directly below the portrait,
above the project action, and reveal it in 6A. Give it normal reading contrast
and comfortable size, subordinate to the name but not styled as faint metadata.

Do not add text merely to fill empty space. Tune portrait size, group spacing and
placement before adding another descriptor. The former paragraph and large
headline remain removed. A second specialization line is not approved; evaluate
the single-line composition at desktop and mobile sizes first. Exact typography
and spacing await a visual pass; no new professional claim is authorized.

## Future acceptance checklist

- Name and portrait are continuously identifiable, in the same order, through 5-6.
- Name has a reading pause before contact; nose visibly touches P before ripple.
- Ripple grows from contact, then resolves into the page boundary.
- Dinosaur exit and terrain fade resolve without an abrupt cut.
- Final foreground is minimal, stable and legible; controls are not sticker-gated.
- Skip/reduced-motion/repeat-visit states reach the same completed composition.
- Keyboard and touch access, focus after skip, and responsive layouts are reviewed.
- No automatic replay on ordinary navigation and no trapped partial sequence.
- No basic-information footer or late entrance remains in the landing hero.
- Role line remains readable, including on screens that bypass the intro.
- Validate motion in an actual animation later; still images cannot prove timing.

## Supporting visual references

The images below are generated planning illustrations, not screenshots or final
assets. Written sequence and decisions take priority over rendering errors.
Portrait circles in new studies are neutral placeholders, not replacement photos.

- [Intro and final handoff storyboard](images/intro-transition-storyboard.png)
- [Resting sky and minimal landing composition](images/background-night-sky.png)

The early conversation storyboard showed an older, crowded arrival and a changed
name/portrait order. Those aspects are superseded by this specification.

### Image review and provenance

Generated with the built-in image generation tool after drafting these documents.
Storyboard brief: six consecutive frames showing wait, reveal, P contact, ripple,
6A identity arrival and 6B actions; cyan pixel dinosaur, name above neutral portrait,
minimal dark/white landing split, stationary sky. Background brief: a single
resting desktop composition with the same identity hierarchy, fixed sparse stars
and two dim pixel clouds, labeled controls, no moon or traveling waves. This
historical artwork brief predates the richer sky and crescent-moon requirement;
use the current background specification for implementation.

Known illustration deviations: the storyboard leaves a small gap at the depicted
P contact, centers its ripple too near the portrait, and shifts the identity
between 6A and 6B. Implementation must follow the exact contact origin and stable
identity rules above, not reproduce those artifacts. Its dotted jump path is an
annotation, not an on-screen effect. The generated availability wording in its
footer is invented filler and must not be used as a personal claim. Both studies
simplify the sticker inventory; they do not authorize removing existing skills.
Pathu.dev header text is illustrative; preserve the existing site wordmark.
Both generated studies predate the 2026-09-24 decision to move basic information
to About. Their basic-information footers are superseded and must be omitted.
