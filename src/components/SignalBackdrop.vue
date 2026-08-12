<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useReducedMotion } from "../composables/useReducedMotion";

export type SignalVariant = "home" | "projects" | "goals" | "about";

const props = defineProps<{
  variant: SignalVariant;
}>();

const root = ref<HTMLDivElement | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const reducedMotion = useReducedMotion();

const darkPaths: Record<SignalVariant, string> = {
  home: "M0 0H800C824 128 714 180 750 300C784 418 690 470 744 582C798 694 702 790 792 1024H0Z",
  projects: "M0 0H466C500 132 380 188 426 312C470 430 368 506 420 626C475 752 360 838 448 1024H0Z",
  goals: "M682 0H1440V1024H702C740 900 628 826 676 698C722 578 614 502 662 382C710 260 620 178 682 0Z",
  about: "M0 0H520C574 130 468 196 522 312C574 426 456 510 510 622C570 746 452 846 590 1024H0Z",
};

const darkPath = computed(() => darkPaths[props.variant]);
const maskId = computed(() => `signal-paper-mask-${props.variant}`);

let context: CanvasRenderingContext2D | null = null;
let resizeObserver: ResizeObserver | undefined;
let animationFrame = 0;
let width = 0;
let height = 0;
let lastFrame = 0;
let scrollOffset = 0;
let pointerX = 0;
let pointerY = 0;
let targetPointerX = 0;
let targetPointerY = 0;

const variantFocus: Record<SignalVariant, number> = {
  home: 0.35,
  projects: 0.2,
  goals: 0.76,
  about: 0.2,
};

const seeded = (index: number, salt = 0) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const resizeCanvas = () => {
  if (!root.value || !canvas.value) return;

  width = Math.max(1, root.value.clientWidth);
  height = Math.max(1, root.value.clientHeight);
  const scale = Math.min(window.devicePixelRatio || 1, 1.5);

  canvas.value.width = Math.round(width * scale);
  canvas.value.height = Math.round(height * scale);
  canvas.value.style.width = `${width}px`;
  canvas.value.style.height = `${height}px`;

  context = canvas.value.getContext("2d", { alpha: false });
  context?.setTransform(scale, 0, 0, scale, 0, 0);
};

const drawField = (time = 0) => {
  if (!context) return;

  const ctx = context;
  const seconds = time / 1000;
  const focusX = width * variantFocus[props.variant];
  const parallaxX = pointerX * 18;
  const parallaxY = pointerY * 12 + scrollOffset * 0.025;

  ctx.fillStyle = "#071015";
  ctx.fillRect(0, 0, width, height);

  const glowPoints = [
    { x: focusX - width * 0.16, y: height * 0.22, radius: width * 0.3 },
    { x: focusX + width * 0.04, y: height * 0.52, radius: width * 0.34 },
    { x: focusX - width * 0.11, y: height * 0.82, radius: width * 0.28 },
  ];

  glowPoints.forEach((point, index) => {
    const driftX = Math.sin(seconds * 0.16 + index * 2.1) * 34 + parallaxX;
    const driftY = Math.cos(seconds * 0.13 + index * 1.6) * 24 + parallaxY;
    const gradient = ctx.createRadialGradient(
      point.x + driftX,
      point.y + driftY,
      0,
      point.x + driftX,
      point.y + driftY,
      point.radius,
    );
    gradient.addColorStop(0, "rgba(22, 201, 220, 0.13)");
    gradient.addColorStop(0.36, "rgba(10, 119, 137, 0.07)");
    gradient.addColorStop(1, "rgba(7, 16, 21, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });

  ctx.lineCap = "round";
  for (let line = 0; line < 34; line += 1) {
    const baseline = (line / 33) * height;
    ctx.beginPath();
    for (let x = -40; x <= width + 40; x += 30) {
      const distance = Math.abs(x - focusX) / Math.max(width, 1);
      const amplitude = 16 + (1 - Math.min(distance, 1)) * 26;
      const y =
        baseline +
        Math.sin(x * 0.006 + line * 0.43 + seconds * 0.1) * amplitude +
        Math.sin(x * 0.0028 - seconds * 0.07 + line) * 12 +
        parallaxY * 0.22;
      if (x === -40) ctx.moveTo(x + parallaxX * 0.25, y);
      else ctx.lineTo(x + parallaxX * 0.25, y);
    }
    ctx.strokeStyle = `rgba(22, 201, 220, ${0.025 + (line % 5 === 0 ? 0.025 : 0)})`;
    ctx.lineWidth = line % 5 === 0 ? 1.1 : 0.7;
    ctx.stroke();
  }

  for (let band = 0; band < 3; band += 1) {
    const bandY = height * (0.24 + band * 0.28);
    ctx.beginPath();
    for (let x = -50; x <= width + 50; x += 24) {
      const envelope = Math.exp(-Math.pow((x - focusX) / (width * 0.34), 2));
      const y =
        bandY +
        Math.sin(x * 0.008 + seconds * 0.22 + band * 1.7) * (24 + 36 * envelope) +
        Math.cos(x * 0.003 - seconds * 0.12) * 18 +
        parallaxY * 0.35;
      if (x === -50) ctx.moveTo(x + parallaxX * 0.45, y);
      else ctx.lineTo(x + parallaxX * 0.45, y);
    }
    ctx.save();
    ctx.shadowColor = "rgba(22, 201, 220, 0.7)";
    ctx.shadowBlur = 18;
    ctx.strokeStyle = "rgba(22, 201, 220, 0.24)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  for (let particle = 0; particle < 76; particle += 1) {
    const speed = 0.004 + seeded(particle, 5) * 0.006;
    const baseX = seeded(particle, 1) * width;
    const baseY = seeded(particle, 2) * height;
    const x = (baseX + seconds * speed * width * 14 + parallaxX * 0.6) % width;
    const y = baseY + Math.sin(seconds * 0.18 + particle) * 10 + parallaxY * 0.25;
    const alpha = 0.08 + seeded(particle, 3) * 0.22;
    ctx.fillStyle = `rgba(22, 201, 220, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, 0.6 + seeded(particle, 4) * 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
};

const stopAnimation = () => {
  window.cancelAnimationFrame(animationFrame);
  animationFrame = 0;
};

const animate = (time: number) => {
  animationFrame = window.requestAnimationFrame(animate);
  if (time - lastFrame < 28) return;
  lastFrame = time;
  pointerX += (targetPointerX - pointerX) * 0.045;
  pointerY += (targetPointerY - pointerY) * 0.045;
  drawField(time);
};

const startAnimation = () => {
  stopAnimation();
  if (reducedMotion.value || document.hidden) {
    pointerX = 0;
    pointerY = 0;
    drawField(0);
    return;
  }
  animationFrame = window.requestAnimationFrame(animate);
};

const handlePointer = (event: PointerEvent) => {
  targetPointerX = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
  targetPointerY = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
};

const handleScroll = () => {
  scrollOffset = window.scrollY;
};

const handleVisibility = () => {
  if (document.hidden) stopAnimation();
  else startAnimation();
};

onMounted(() => {
  resizeCanvas();
  resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
    if (reducedMotion.value) drawField(0);
  });
  if (root.value) resizeObserver.observe(root.value);

  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", handlePointer, { passive: true });
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
  startAnimation();
});

watch(reducedMotion, startAnimation);

onBeforeUnmount(() => {
  stopAnimation();
  resizeObserver?.disconnect();
  window.removeEventListener("pointermove", handlePointer);
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("visibilitychange", handleVisibility);
});
</script>

<template>
  <div ref="root" class="signal-backdrop" aria-hidden="true">
    <canvas ref="canvas" class="signal-backdrop__canvas"></canvas>
    <svg
      class="signal-backdrop__mask"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="none"
    >
      <defs>
        <mask :id="maskId">
          <rect width="1440" height="1024" fill="white" />
          <path :d="darkPath" fill="black" />
        </mask>
      </defs>
      <rect
        class="signal-backdrop__paper"
        width="1440"
        height="1024"
        :mask="`url(#${maskId})`"
      />
      <path class="signal-backdrop__edge signal-backdrop__edge--echo" :d="darkPath" />
      <path class="signal-backdrop__edge" :d="darkPath" />
    </svg>
  </div>
</template>

<style scoped>
.signal-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.signal-backdrop__canvas,
.signal-backdrop__mask {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.signal-backdrop__canvas {
  display: block;
}

.signal-backdrop__mask {
  overflow: visible;
}

.signal-backdrop__paper {
  fill: #ffffff;
}

.signal-backdrop__edge {
  fill: none;
  stroke: #16c9dc;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
  animation: seam-breathe 12s ease-in-out infinite alternate;
}

.signal-backdrop__edge--echo {
  opacity: 0.14;
  stroke-width: 18;
  filter: blur(5px);
}

@keyframes seam-breathe {
  from {
    transform: translateX(-2px) scaleX(0.997);
  }
  to {
    transform: translateX(5px) scaleX(1.003);
  }
}

@media (max-width: 860px) {
  .signal-backdrop__mask {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signal-backdrop__edge {
    animation: none;
  }
}
</style>
