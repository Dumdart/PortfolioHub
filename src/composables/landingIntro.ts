export const INTRO_DURATION = 4400;
export const INTRO_SESSION_KEY = "portfoliohub:intro-handled";
export const introEligible = (width: number, height: number, reducedMotion: boolean) =>
  width >= 1024 && height >= 700 && !reducedMotion;

export type IntroState = "waiting" | "running" | "complete";
export type IntroEvent = "start" | "finish" | "skip" | "bypass" | "replay";
export function transitionIntro(state: IntroState, event: IntroEvent, eligible = true, ready = true): IntroState {
  if (event === "finish" || event === "skip" || event === "bypass") return "complete";
  if (event === "replay") return eligible && ready ? "running" : "complete";
  return state === "waiting" ? (eligible && ready ? "running" : "complete") : state;
}

let handledInMemory = false;
export function introSession(storage: Pick<Storage, "getItem" | "setItem"> | undefined) {
  return {
    handled() {
      // If storage is unavailable, bypass rather than offer again after every reload.
      try { return handledInMemory || !storage || storage.getItem(INTRO_SESSION_KEY) === "1"; }
      catch { return true; }
    },
    mark() {
      handledInMemory = true;
      try { storage?.setItem(INTRO_SESSION_KEY, "1"); } catch { /* In-memory navigation still works. */ }
    },
  };
}

export const progress = (time: number, start: number, end: number) =>
  Math.max(0, Math.min(1, (time - start) / (end - start)));
export const smooth = (value: number) => value * value * (3 - 2 * value);
export const mix = (from: number, to: number, amount: number) => amount === 0 ? from : amount === 1 ? to : from + (to - from) * amount;
export function introFrame(time: number) {
  return {
    name: smooth(progress(time, 450, 1150)),
    portrait: smooth(progress(time, 570, 1300)),
    arrival: smooth(progress(time, 3150, 3950)),
    terrain: 1 - smooth(progress(time, 2800, 3650)),
    // Keep the sky above the ground until the terrain has disappeared.
    skyGroundInset: 20 * (1 - smooth(progress(time, 3650, 4400))),
    opening: smooth(progress(time, 2680, 3150)),
    unfold: smooth(progress(time, 3150, 3650)),
    role: smooth(progress(time, 3650, 3950)),
    action: smooth(progress(time, 3850, 4150)),
    social: smooth(progress(time, 3950, 4400)),
    navigation: time >= 3650,
    contact: time >= 2550 && time < 2680,
    complete: time >= INTRO_DURATION,
  };
}

// Both shapes use four cubic segments: the contact ring's right edge becomes
// the final divider. The left segments move offscreen, never cutting the identity.
export function ripplePath(cx: number, cy: number, radius: number, width: number, height: number, unfold: number) {
  const k = 0.55228475;
  const circle = [
    cx, cy - radius,
    cx + k * radius, cy - radius, cx + radius, cy - k * radius, cx + radius, cy,
    cx + radius, cy + k * radius, cx + k * radius, cy + radius, cx, cy + radius,
    cx - k * radius, cy + radius, cx - radius, cy + k * radius, cx - radius, cy,
    cx - radius, cy - k * radius, cx - k * radius, cy - radius, cx, cy - radius,
  ];
  const final = [
    width * .63, -20,
    width * .60, height * .18, width * .55, height * .32, width * .59, height * .51,
    width * .65, height * .76, width * .61, height * .88, width * .58, height + 20,
    -width * 2, height + 20, -width * 2, height + 20, -width * 2, height * .5,
    -width * 2, -20, -width * 2, -20, width * .63, -20,
  ];
  const points = circle.map((point, i) => mix(point, final[i], unfold));
  return `M${points[0]},${points[1]} C${points.slice(2, 8).join(" ")} C${points.slice(8, 14).join(" ")} C${points.slice(14, 20).join(" ")} C${points.slice(20).join(" ")} Z`;
}
