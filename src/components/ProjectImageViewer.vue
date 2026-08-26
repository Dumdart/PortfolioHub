<script setup lang="ts">
import { PhArrowCounterClockwise, PhMinus, PhPlus, PhX } from "@phosphor-icons/vue";
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

interface ViewerImage {
  src: string;
  alt: string;
  title: string;
}

const props = defineProps<{
  image: ViewerImage | null;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const zoom = ref(1);
const minimumZoom = 1;
const maximumZoom = 4;
const zoomStep = 0.5;

const zoomLabel = computed(() => `${Math.round(zoom.value * 100)}%`);
const canvasStyle = computed(() => ({
  width: `${zoom.value * 100}%`,
  height: `${zoom.value * 100}%`,
}));

const setZoom = (value: number) => {
  zoom.value = Math.min(Math.max(value, minimumZoom), maximumZoom);
};

const zoomIn = () => setZoom(zoom.value + zoomStep);
const zoomOut = () => setZoom(zoom.value - zoomStep);
const resetZoom = () => setZoom(1);
const requestClose = () => dialog.value?.close();

const handleClose = () => {
  document.body.classList.remove("dialog-open");
  emit("close");
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === dialog.value) requestClose();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    event.preventDefault();
    requestClose();
    return;
  }
  if (event.key === "+" || event.key === "=") {
    event.preventDefault();
    zoomIn();
  }
  if (event.key === "-") {
    event.preventDefault();
    zoomOut();
  }
  if (event.key === "0") {
    event.preventDefault();
    resetZoom();
  }
};

watch(
  () => props.open,
  async (isOpen) => {
    await nextTick();
    if (isOpen && dialog.value && !dialog.value.open) {
      resetZoom();
      dialog.value.showModal();
      document.body.classList.add("dialog-open");
      return;
    }
    if (!isOpen && dialog.value?.open) dialog.value.close();
  },
  { immediate: true },
);

watch(
  () => props.image?.src,
  () => resetZoom(),
);

onBeforeUnmount(() => {
  document.body.classList.remove("dialog-open");
});
</script>

<template>
  <dialog
    ref="dialog"
    class="project-image-viewer"
    aria-labelledby="project-image-viewer-title"
    @click="handleBackdropClick"
    @close="handleClose"
    @keydown="handleKeydown"
  >
    <div v-if="image" class="project-image-viewer__panel">
      <header class="project-image-viewer__header">
        <div>
          <span>Image preview</span>
          <h2 id="project-image-viewer-title">{{ image.title }}</h2>
        </div>

        <div class="project-image-viewer__controls" aria-label="Image zoom controls">
          <button type="button" aria-label="Zoom out" :disabled="zoom === minimumZoom" @click="zoomOut">
            <PhMinus :size="20" aria-hidden="true" />
          </button>
          <output aria-live="polite">{{ zoomLabel }}</output>
          <button type="button" aria-label="Zoom in" :disabled="zoom === maximumZoom" @click="zoomIn">
            <PhPlus :size="20" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Reset zoom" :disabled="zoom === minimumZoom" @click="resetZoom">
            <PhArrowCounterClockwise :size="20" aria-hidden="true" />
          </button>
          <button type="button" class="project-image-viewer__close" @click="requestClose">
            <PhX :size="22" aria-hidden="true" />
            <span>Close</span>
          </button>
        </div>
      </header>

      <div class="project-image-viewer__stage">
        <div class="project-image-viewer__canvas" :style="canvasStyle">
          <img :src="image.src" :alt="image.alt" draggable="false" @dblclick="zoomIn" />
        </div>
      </div>

      <footer>
        <span>Use +/− to zoom · scroll to pan · double-click the image to zoom in</span>
        <span>Esc closes</span>
      </footer>
    </div>
  </dialog>
</template>

<style scoped>
.project-image-viewer {
  width: min(1440px, 94vw);
  height: min(920px, 92vh);
  max-width: none;
  max-height: none;
  overflow: visible;
  border: 1px solid var(--cyan);
  padding: 0;
  background: var(--ink);
  box-shadow: 0 28px 100px rgba(0, 0, 0, 0.58);
  color: var(--paper);
}

.project-image-viewer[open] {
  animation: image-viewer-in 240ms var(--ease-out) both;
}

.project-image-viewer::backdrop {
  background: rgba(4, 9, 13, 0.88);
  backdrop-filter: blur(4px);
}

.project-image-viewer__panel {
  display: grid;
  height: 100%;
  grid-template-rows: 76px minmax(0, 1fr) 38px;
}

.project-image-viewer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(22, 201, 220, 0.4);
  padding: 0 22px 0 26px;
}

.project-image-viewer__header > div:first-child {
  display: grid;
  min-width: 0;
  gap: 3px;
}

.project-image-viewer__header > div:first-child span {
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-image-viewer__header h2 {
  overflow: hidden;
  margin: 0;
  font-size: 20px;
  font-weight: 650;
  letter-spacing: -0.025em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-image-viewer__controls {
  display: flex;
  min-width: 0;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
}

.project-image-viewer__controls button {
  display: inline-flex;
  min-width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: transparent;
  color: var(--paper);
  cursor: pointer;
  font-family: var(--mono);
  font-size: 11px;
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
}

.project-image-viewer__controls button:hover:not(:disabled) {
  border-color: var(--cyan);
  background: var(--cyan);
  color: var(--ink);
}

.project-image-viewer__controls button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.project-image-viewer__controls output {
  width: 58px;
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 12px;
  text-align: center;
}

.project-image-viewer__close {
  min-width: 92px !important;
  margin-left: 6px;
}

.project-image-viewer__stage {
  min-width: 0;
  min-height: 0;
  overflow: auto;
  padding: 18px;
  background: #edf3f5;
  overscroll-behavior: contain;
}

.project-image-viewer__canvas {
  display: grid;
  min-width: 100%;
  min-height: 100%;
  place-items: center;
  transition: width 180ms var(--ease-out), height 180ms var(--ease-out);
}

.project-image-viewer__canvas img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: zoom-in;
  user-select: none;
}

.project-image-viewer footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  color: rgba(255, 255, 255, 0.62);
  font-family: var(--mono);
  font-size: 9px;
}

@keyframes image-viewer-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.99);
  }
}

@media (max-width: 680px) {
  .project-image-viewer {
    width: calc(100vw - 14px);
    height: calc(100dvh - 18px);
  }

  .project-image-viewer__panel {
    grid-template-rows: 116px minmax(0, 1fr) 42px;
  }

  .project-image-viewer__header {
    align-items: start;
    flex-direction: column;
    gap: 10px;
    padding: 13px 12px 11px;
  }

  .project-image-viewer__header h2 {
    font-size: 17px;
  }

  .project-image-viewer__controls {
    width: 100%;
    gap: 6px;
    justify-content: flex-end;
  }

  .project-image-viewer__controls button {
    min-width: 38px;
    height: 38px;
  }

  .project-image-viewer__close {
    min-width: 82px !important;
    margin-left: 0;
  }

  .project-image-viewer__controls output {
    width: 46px;
  }

  .project-image-viewer__stage {
    padding: 8px;
  }

  .project-image-viewer footer {
    justify-content: center;
    padding-inline: 10px;
    text-align: center;
  }

  .project-image-viewer footer span:last-child {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-image-viewer[open] {
    animation: none;
  }

  .project-image-viewer__canvas {
    transition: none;
  }
}
</style>
