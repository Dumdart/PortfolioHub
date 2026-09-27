<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ActionLink from "../components/ActionLink.vue";
import HomeSkillsPanel from "../components/HomeSkillsPanel.vue";
import LandingSky from "../components/LandingSky.vue";
import SocialLinks from "../components/SocialLinks.vue";
import { useReducedMotion } from "../composables/useReducedMotion";
import { INTRO_DURATION, introEligible, introFrame, introSession, mix, progress, ripplePath, smooth, transitionIntro, type IntroState } from "../composables/landingIntro";
import "../landing.css";

const emit = defineEmits<{ introNavigation: [hidden: boolean] }>();
const root = ref<HTMLElement | null>(null);
const identity = ref<HTMLElement | null>(null);
const heading = ref<HTMLElement | null>(null);
const letter = ref<HTMLElement | null>(null);
const portrait = ref<HTMLImageElement | null>(null);
const skip = ref<HTMLButtonElement | null>(null);
const state = ref<IntroState>("complete");
const time = ref(INTRO_DURATION);
const width = ref(1440);
const height = ref(900);
const reduced = useReducedMotion();
const hidden = ref(false);
const portraitFailed = ref(false);
const eligible = computed(() => introEligible(width.value, height.value, reduced.value));
const frame = computed(() => introFrame(time.value));
const complete = computed(() => state.value === "complete");
const identityScale = .88;
const scene = ref({ dx: 0, dy: 0, contactX: 0, contactY: 0, startX: 0, ground: 0 });
let session: ReturnType<typeof introSession>;
let raf = 0;
let watchdog = 0;
let started = 0;
let mounted = false;
const isIntroControl = (element: Element | null) => element instanceof HTMLElement && element.hasAttribute("data-intro-control");

const identityStyle = computed(() => {
  if (complete.value) return {};
  const amount = frame.value.arrival;
  return { transform: `translate(${scene.value.dx * (1 - amount)}px, ${scene.value.dy * (1 - amount)}px) scale(${mix(identityScale + frame.value.opening * .04, 1, amount)})` };
});
const revealedStyle = (value: number, distance = 0) => ({
  opacity: value, visibility: value > 0 ? "visible" as const : "hidden" as const,
  transform: `translateX(${(1 - value) * distance}px)`,
});
const boundary = computed(() => ripplePath(
  scene.value.contactX, scene.value.contactY,
  mix(2, width.value * .72, frame.value.opening), width.value, height.value,
  complete.value ? 1 : frame.value.unfold,
));
const dinoStyle = computed(() => {
  const t = time.value;
  const { startX, contactX, contactY, ground } = scene.value;
  const noseY = 23;
  const restY = ground - 112;
  const contactLeft = contactX - 112;
  let x = startX;
  let y = restY;
  let scaleX = 1;
  let scaleY = 1;
  if (t < 450) {
    x += 32 * progress(t, 0, 450);
    scaleY = 1 - Math.sin(progress(t, 0, 450) * Math.PI) * .07;
  } else if (t < 2100) {
    x = mix(startX + 32, contactLeft - 135, smooth(progress(t, 450, 2100)));
    y += Math.sin(t / 48) * 2;
  } else if (t < 2550) {
    const p = progress(t, 2100, 2550);
    x = mix(contactLeft - 135, contactLeft, p);
    y = mix(restY, contactY - noseY, p) - Math.sin(p * Math.PI) * 42;
  } else if (t < 2680) {
    x = contactLeft;
    y = contactY - noseY;
    scaleX = .96;
  } else {
    const p = smooth(progress(t, 2680, 3480));
    x = mix(contactLeft, contactLeft - 135, p);
    y = mix(contactY - noseY, ground + 80, p) - Math.sin(p * Math.PI) * 35;
  }
  return { transform: `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`, opacity: 1 - smooth(progress(t, 3040, 3560)) };
});
const burst = computed(() => Array.from({ length: 10 }, (_, index) => {
  const p = progress(time.value, 2550, 2910);
  const angle = (-175 + index * 16) * Math.PI / 180;
  const distance = (24 + index % 3 * 13) * p;
  return { x: scene.value.contactX + Math.cos(angle) * distance, y: scene.value.contactY + Math.sin(angle) * distance, opacity: time.value >= 2550 ? 1 - p : 0 };
}));
const accents = computed(() => Array.from({ length: 4 }, (_, index) => {
  const p = progress(time.value, 2680, 3200);
  const angle = (-125 + index * 48) * Math.PI / 180;
  return { x: scene.value.contactX + Math.cos(angle) * (20 + p * 150), y: scene.value.contactY + Math.sin(angle) * (20 + p * 150), opacity: time.value >= 2680 ? (1 - p) * .65 : 0 };
}));

function stopClock() {
  cancelAnimationFrame(raf);
  window.clearTimeout(watchdog);
}
function finish() {
  const restore = isIntroControl(document.activeElement);
  stopClock();
  state.value = transitionIntro(state.value, "finish");
  time.value = INTRO_DURATION;
  session?.mark();
  if (restore) void nextTick(() => {
    if (mounted && (isIntroControl(document.activeElement) || document.activeElement === document.body)) heading.value?.focus({ preventScroll: true });
  });
}
function measureScene() {
  if (!identity.value || !letter.value || !root.value) return false;
  const rootRect = root.value.getBoundingClientRect();
  // Measure the same, untransformed identity that the intro will carry home.
  const previous = identity.value.style.transform;
  identity.value.style.transform = "none";
  const previousHeading = heading.value?.style.transform ?? "";
  if (heading.value) heading.value.style.transform = "none";
  const group = identity.value.getBoundingClientRect();
  const p = letter.value.getBoundingClientRect();
  const targetLeft = width.value * .53;
  const targetTop = height.value * .47;
  const dx = targetLeft - (group.left - rootRect.left);
  const dy = targetTop - (group.top - rootRect.top);
  const font = getComputedStyle(letter.value);
  const context = document.createElement("canvas").getContext("2d");
  if (context) context.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
  const bearing = -(context?.measureText("P").actualBoundingBoxLeft ?? -3);
  scene.value = {
    dx, dy, contactX: targetLeft + (p.left - group.left + bearing) * identityScale,
    contactY: targetTop + (p.top - group.top + p.height * .48) * identityScale,
    startX: width.value * .16, ground: height.value * .8,
  };
  identity.value.style.transform = previous;
  if (heading.value) heading.value.style.transform = previousHeading;
  return scene.value.contactX > scene.value.startX + 260;
}
function assetsReady() {
  return !portraitFailed.value && !!portrait.value?.complete && portrait.value.naturalWidth > 0 && document.fonts.status === "loaded";
}
async function start(replay = false) {
  if (!eligible.value || !assetsReady()) { finish(); return; }
  if (replay) window.scrollTo({ top: 0, behavior: "instant" });
  stopClock();
  session?.mark();
  state.value = transitionIntro(state.value, replay ? "replay" : "start", eligible.value, true);
  time.value = 0;
  await nextTick();
  if (!mounted || !eligible.value || !measureScene()) { finish(); return; }
  skip.value?.focus({ preventScroll: true });
  started = performance.now();
  const tick = (now: number) => {
    if (!mounted || state.value !== "running") return;
    time.value = Math.min(INTRO_DURATION, now - started);
    if (time.value >= INTRO_DURATION) finish();
    else raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  watchdog = window.setTimeout(finish, INTRO_DURATION + 700);
}
function assetFailure() {
  portraitFailed.value = true;
  if (!complete.value) finish();
}
function resize() {
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  if (!complete.value) {
    if (!eligible.value) finish();
    else if (state.value === "running") finish();
    else void nextTick(measureScene);
  }
}
function visibility() {
  hidden.value = document.hidden;
  if (document.hidden && state.value === "running") finish();
}
watch(() => complete.value || frame.value.navigation, value => emit("introNavigation", !value), { immediate: true });
watch(reduced, value => { if (value && !complete.value) finish(); });
onMounted(() => {
  mounted = true;
  let storage: Storage | undefined;
  try { storage = window.sessionStorage; } catch { /* A blocked store is an automatic bypass. */ }
  session = introSession(storage);
  width.value = window.innerWidth;
  height.value = window.innerHeight;
  if (eligible.value && !session.handled() && !portraitFailed.value) {
    state.value = "waiting";
    time.value = 0;
    void nextTick(measureScene);
    void document.fonts.ready.then(() => { if (mounted && state.value === "waiting") measureScene(); });
  } else finish();
  if (portrait.value?.complete && !portrait.value.naturalWidth) assetFailure();
  hidden.value = document.hidden;
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", visibility);
});
onBeforeUnmount(() => {
  mounted = false;
  stopClock();
  session?.mark();
  emit("introNavigation", false);
  window.removeEventListener("resize", resize);
  document.removeEventListener("visibilitychange", visibility);
});
</script>

<template>
  <main ref="root" class="landing" :class="{ 'landing--intro': !complete, 'landing--running': state === 'running' }"
    :data-intro-state="state" :data-intro-time="Math.round(time)" :style="{ '--terrain': frame.terrain }">
    <svg class="landing-boundary" :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="none" aria-hidden="true">
      <defs><clipPath id="landing-sky-clip"><path :d="boundary" /></clipPath></defs>
      <rect v-if="!complete" width="100%" height="100%" fill="#07191e" :opacity="1 - frame.unfold" />
      <path class="landing-boundary__edge" :d="boundary" :shape-rendering="!complete && time < 2860 ? 'crispEdges' : 'geometricPrecision'" :opacity="complete || time >= 2680 ? 1 : 0" />
    </svg>
    <div class="landing-sky-mask" :style="complete || time >= 3150 ? { clipPath: 'url(#landing-sky-clip)' } : undefined">
      <LandingSky :paused="hidden" :reduced="reduced" :details="complete ? 1 : smooth(progress(time, 3950, 4400))"
        :style="{ '--moon-left': mix(90, 54, frame.unfold) + '%', '--moon-top': mix(28, 104, frame.unfold) + 'px', clipPath: `inset(0 0 ${frame.skyGroundInset}% 0)` }" />
    </div>

    <div v-if="!complete" class="intro-scene" aria-hidden="true">
      <div class="intro-terrain" :style="{ opacity: frame.terrain, top: scene.ground + 'px' }">
        <div class="intro-ground" :style="{ transform: `translateX(${-(time < 450 ? time * time / 6000 : (time - 225) * .15)}px)` }" />
        <svg class="intro-cactus" viewBox="0 0 44 78" :style="{ transform: `translateX(${-time * .1}px)`, opacity: .7 - .35 * smooth(progress(time, 1300, 2100)) }">
          <path d="M20 78V48H7V38H0V18H8V36H20V0H28V48H36V28H44V52H38V58H28V78Z" />
        </svg>
      </div>
      <svg class="intro-dinosaur" :class="{ 'is-stepping': state === 'running' && time < 2100 }" viewBox="0 0 112 112" :style="dinoStyle">
        <g fill="currentColor">
          <path d="M64 8H104V14H112V32H84V38H100V44H78V54H92V60H78V72H68V84H58V94H32V88H22V80H14V70H6V58H0V42H8V56H16V64H24V70H34V66H44V60H52V50H58V38H64Z" />
          <path class="dino-leg dino-leg--one" d="M32 86H44V104H52V112H32Z" />
          <path class="dino-leg dino-leg--two" d="M54 82H64V98H72V106H54Z" />
        </g>
        <path d="M92 14H98V20H92Z" fill="#07191e" />
      </svg>
      <svg class="intro-particles" :viewBox="`0 0 ${width} ${height}`">
        <rect v-for="(particle, index) in burst" :key="'burst' + index" :x="particle.x" :y="particle.y" width="4" height="4" :opacity="particle.opacity" />
        <rect v-for="(particle, index) in accents" :key="'accent' + index" :x="particle.x" :y="particle.y" width="3" height="3" :opacity="particle.opacity" />
      </svg>
    </div>

    <section class="landing-profile" aria-label="Profile">
      <div ref="identity" class="landing-identity" :style="identityStyle">
        <h1 ref="heading" tabindex="-1" :style="revealedStyle(frame.name, width * .46)">
          <span ref="letter" :class="{ 'contact-letter': frame.contact }">P</span>aul Thumfart
        </h1>
        <div class="landing-portrait" :style="revealedStyle(frame.portrait, width * .46)">
          <img v-if="!portraitFailed" ref="portrait" src="/assets/black-cat-profile.jpg"
            alt="Paul Thumfart's black cat profile picture" fetchpriority="high" @error="assetFailure" />
          <span v-else class="landing-initials" role="img" aria-label="Paul Thumfart — profile image unavailable">PT</span>
        </div>
      </div>
      <p class="landing-role" :style="revealedStyle(frame.role)">Backend Software Engineer</p>
      <div class="landing-action" :inert="frame.action === 0" :style="revealedStyle(frame.action)">
        <ActionLink to="/projects">Explore projects</ActionLink>
      </div>
      <div class="landing-social" :inert="frame.social === 0" :style="revealedStyle(frame.social)">
        <SocialLinks label="Contact and social links" />
      </div>
      <div class="landing-motion" :style="revealedStyle(complete ? 1 : 0)" :inert="!complete">
        <button v-if="eligible" type="button" data-intro-control @click="start(true)">Replay intro</button>
      </div>
    </section>
    <div class="landing-technologies" :style="{ opacity: complete ? 1 : smooth(progress(time, 3450, 3850)), visibility: complete || time > 3450 ? 'visible' : 'hidden', '--sticker-progress': complete ? 1 : smooth(progress(time, 3650, 4400)) }">
      <HomeSkillsPanel />
    </div>
    <div v-if="state === 'waiting' || time < 450" class="intro-invitation"
      :style="{ opacity: 1 - smooth(progress(time, 0, 250)) }" :inert="state !== 'waiting'" :aria-hidden="state !== 'waiting'">
      <p>CyanDinosaur890</p>
      <button type="button" class="action-link" data-intro-control @click="start()">Start intro <span aria-hidden="true">→</span></button>
    </div>
    <button v-if="!complete" ref="skip" type="button" class="intro-skip" data-intro-control @click="finish">Skip intro <span aria-hidden="true">↗</span></button>
  </main>
</template>
