# Stationary night-sky background

Status: shared ambient-motion requirements. Updated 2026-09-24.
Implementation exists; verify current behavior against these requirements.

## Purpose and scope

Replace the landing banner's traveling waves and moving particles with a sparse
night sky. Stars and clouds stay in fixed positions while their brightness changes
softly. This is an ongoing ambient animation, not merely an entrance effect.
Read with [intro choreography](intro-animation.md) and
[repository design policy](../../design-qa.md).

Scope includes the landing page and the dark regions of About, Certificates and
Projects. Reuse the shared sky and its controls; the runner intro remains landing
only. Follow the [inner-page styling brief](../design/inner-page-styling.md) for
content density and gradient removal. No new personal information is introduced.

## Settled direction

- Dark ink/teal field, restrained cyan/white light, generous empty space.
- A richer but restrained star field and several subdued cloud silhouettes.
  Current source uses 48 stars and six clouds before responsive hiding and panel
  clipping. These are an inspection baseline, not a required visible count.
  Preserve quiet reading zones rather than filling every empty space.
- Final stars/clouds do not travel, rotate, scale or wobble.
- Light changes slowly; no flashes, shooting stars, traveling particles or waves.
- Keep name, portrait, professional context and controls clear. Basic information
  belongs on About; the landing sky has no basic-information footer to support.
- White sticker region stays visually quiet. Stickers settle once and then stop.
- Resting cyan divider and portrait ring do not independently pulse.
- A restrained partial/crescent moon near the upper-right corner of the usable
  sky region, clear of headings, portrait, navigation and intro controls. It may
  settle with the intro handoff; afterward it remains static and does not pulse.
- Flat dark surfaces and a thin steady cyan divider; remove unnecessary gradient
  washes, diffuse glows and decorative halo layers on the target inner pages.
- Reduced motion uses the completed composition with a completely static sky.
- Skipping the intro reaches the completed composition without replaying reveals.

## Motion specification

The following ranges are proposed tuning values. Review them at real size against
text legibility; these are not implemented measurements or strict random rules.

| Layer | Spatial behavior | Light behavior | Proposed rhythm |
| --- | --- | --- | --- |
| Base field | Fixed | Constant dark ink/teal | None |
| Most stars | Fixed | Remain faint and steady | None |
| A few accent stars | Fixed | Smoothly brighten and dim, never flash | About 4-8 s per soft cycle; independent phases |
| Cloud silhouettes | Fixed | Small opacity or edge-light variation | About 8-14 s per cycle; subtle differences |
| Divider and portrait ring | Fixed after intro | Steady restrained cyan | None |

Flare means slow brightening followed by slow fading. It does not mean bloom
bursts, hard on/off blinking or synchronized breathing of the whole scene.
Stars remain subordinate to text and the main action at their brightest.
Cloud edges retain their positions as the light changes. Avoid continuous glow
around everything; negative space is part of the intended appearance.

## Composition

Place sky detail mainly above and outside the identity group and in unused dark
regions. Avoid a bright star directly against a letter or link, clouds crossing
the portrait. Maintain a quiet
zone behind all reading surfaces. Use fewer details on small displays rather
than packing the desktop sky into a narrow space.

Pixel-shaped stars can echo the dinosaur; cloud contours may remain softly
stepped with restrained edges. Do not turn the sky into a detailed illustration
or a dense particle field. The generated image demonstrates placement and mood,
not an exact sprite count or a production color-token source.

## Intro handoff

1. Waiting scene already contains a few faint stars/clouds.
2. During the run, ground provides the primary travel cue. Any scenery movement
   is secondary; it must not continue into the resting sky.
   Clip stars, clouds and moon above the ground while terrain is visible. Reveal
   lower sky details only after the ground disappears; no scenery below the
   runner's ground line. Preserve this through replay, skip and resizing.
3. Contact produces temporary cyan square particles. These are separate from
   permanent stars; do not silently convert every fragment into a star.
4. Through 5A/5B, retain a few recognizable sky elements while the ground fades.
   They may reposition with the overall scene transformation, then settle.
5. By 6A, all sky positions are fixed. Additional details fade in during 6B without
   traveling. Foreground controls appear at the same time independently.
6. After 4.40 s, only subtle sky brightness modulation continues. No delayed
   wave, extra entrance, or repeated sticker flourish occurs.

## Implementation defaults and screen eligibility

- Intro eligibility is limited to larger screens as defined in the intro
  specification. On screens that bypass it, show
  the same completed sky immediately; intro eligibility and ambient motion are
  separate decisions. Reduced motion always keeps the sky static.
- Provide a discreet Pause background / Resume background control near the
  replay control after social links. Pausing freezes the sky without changing
  layout. Reduced motion overrides this and keeps the sky static; do not offer
  a control that silently circumvents the system preference.
- On return from an inactive tab, resume gently without a flare or accumulated
  entrance effects. A stable static rendering is preferable to a sudden catch-up.
- Reuse the sky on About, Certificates and Projects. Provide discreet accessible
  Pause/Resume controls in their introductions; keep reduced motion authoritative.
  Do not carry the landing intro or its session gate onto inner pages.

## Future visual acceptance

- Observe the resting page for at least 30 seconds: no positional drift, flashing,
  global synchronized pulse, or repeating foreground animation.
- Name, role line, primary action and social labels remain comfortable to read
  throughout the brightest and darkest ambient phases.
- Confirm a few sky landmarks visibly persist through the intro handoff.
- Check wide, laptop, narrow and short viewports; reduce density where needed.
- Verify static/reduced-motion and paused states remain complete compositions.
- Review actual moving output later: a still image cannot verify flare rhythm.

## Supporting reference

[Night-sky and minimal landing study](images/background-night-sky.png) is generated
concept artwork, not a live screenshot or approved replacement portrait. Text
and motion rules in these documents govern when artwork differs.
Its basic-information footer predates the confirmed move to About and is now
superseded. The image is not authority to retain that footer on the landing page.
