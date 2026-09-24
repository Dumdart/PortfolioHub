<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps<{ paused: boolean; reduced: boolean; details: number }>();
const sky = ref<HTMLElement | null>(null);
watch(() => props.paused, () => {
  // Commit the CSS pause now: hidden tabs can defer style updates until return.
  sky.value?.getAnimations({ subtree: true });
}, { flush: "post" });
const stars = [
  [5, 12], [17, 19], [32, 10], [48, 16], [56, 28], [8, 36],
  [51, 48], [5, 68], [14, 86], [43, 89], [55, 76], [23, 8],
  [37, 17], [47, 69], [9, 53], [53, 9], [20, 92], [34, 93],
  [3, 43], [12, 7], [28, 14], [41, 6], [58, 40], [16, 74],
  [39, 80], [2, 91], [45, 36], [11, 61], [57, 94], [36, 5],
  [64, 8], [72, 13], [81, 6], [94, 16], [68, 31], [85, 28],
  [97, 42], [76, 39], [91, 52], [65, 91], [79, 87], [95, 94],
  [6, 25], [19, 43], [41, 56], [54, 61], [88, 83], [30, 84],
];
const clouds = ["one", "two", "three", "four", "five", "six"];
</script>

<template>
  <div ref="sky" class="landing-sky" :class="{ 'is-paused': paused, 'is-reduced': reduced }" aria-hidden="true">
    <i v-for="(star, index) in stars" :key="index" class="sky-star"
      :class="{ 'sky-star--accent': index === 1 || index === 6 || index === 9, 'sky-star--late': index >= 36 }"
      :style="{ left: star[0] + '%', top: star[1] + '%', opacity: index >= 36 ? details * .35 : undefined, '--cycle': (5 + index % 4) + 's', '--phase': (-index * 1.7) + 's' }" />
    <svg v-for="cloud in clouds" :key="cloud" class="sky-cloud" :class="`sky-cloud--${cloud}`" viewBox="0 0 140 40">
      <path d="M0 36H12V28H28V20H40V12H52V4H76V12H86V20H99V27H114V32H140V40H0Z" />
    </svg>
    <svg class="sky-moon" viewBox="0 0 80 80">
      <path d="M56 5A35 35 0 1 0 72 58A31 31 0 0 1 56 5Z" />
    </svg>
  </div>
</template>

<style scoped>
.landing-sky { position: absolute; inset: 0; pointer-events: none; }
.sky-star { position: absolute; width: 2px; height: 2px; background: #9acbd0; opacity: .35; }
.sky-star--accent { width: 4px; height: 4px; background: #6be3ea; animation: starlight var(--cycle) ease-in-out var(--phase) infinite; }
.sky-star--accent::after { content: ""; position: absolute; inset: -3px 1px; background: inherit; opacity: .3; }
.sky-cloud { position: absolute; width: 115px; fill: #2f5660; opacity: .22; animation: cloudlight 12s ease-in-out -4s infinite; }
.sky-cloud--one { left: 4%; top: 24%; }
.sky-cloud--two { left: 48%; top: 64%; width: 90px; animation-duration: 10s; animation-delay: -7s; }
.sky-cloud--three { left: 43%; top: 31%; width: 80px; animation-duration: 13s; animation-delay: -9s; }
.sky-cloud--four { left: 9%; top: 82%; width: 105px; animation-duration: 14s; animation-delay: -2s; }
.sky-cloud--five { left: 72%; top: 22%; width: 140px; animation-duration: 11s; animation-delay: -6s; }
.sky-cloud--six { left: 88%; top: 65%; width: 100px; animation-duration: 12s; animation-delay: -10s; }
.sky-moon { position: absolute; left: var(--moon-left, 54%); top: var(--moon-top, 104px); width: clamp(44px, 5vw, 64px); transform: translateX(-50%); fill: #93bcc3; opacity: .48; }
.is-paused *, .is-reduced * { animation-play-state: paused; }
.is-reduced .sky-star--accent { animation: none; opacity: .42; }
.is-reduced .sky-cloud { animation: none; opacity: .22; }
@keyframes starlight { 0%, 100% { opacity: .25; } 50% { opacity: .65; } }
@keyframes cloudlight { 0%, 100% { opacity: .18; } 50% { opacity: .3; } }
@media (max-width: 860px) {
  .sky-star:nth-child(2n) { display: none; }
  .sky-cloud--two { left: 78%; top: 70%; width: 64px; }
  .sky-cloud--three { left: 2%; top: 56%; width: 44px; }
  .sky-cloud--four { left: 83%; top: 88%; width: 54px; }
  .sky-cloud--five, .sky-cloud--six { display: none; }
  .sky-moon { left: calc(100% - 42px); top: 92px; width: 36px; }
}
@media (prefers-reduced-motion: reduce) { .landing-sky * { animation: none; } }
</style>
