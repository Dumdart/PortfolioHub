<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { PhArrowLeft, PhArrowRight, PhX } from "@phosphor-icons/vue";
import type { Credential } from "../data/credentials";

const props = defineProps<{
  credential: Credential | null;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const pageIndex = ref(0);
const pages = computed(() => props.credential?.pages ?? []);
const activePage = computed(() => pages.value[pageIndex.value]);
const hasMultiplePages = computed(() => pages.value.length > 1);

const selectPage = (index: number) => {
  pageIndex.value = Math.min(Math.max(index, 0), Math.max(pages.value.length - 1, 0));
};

const previousPage = () => selectPage(pageIndex.value - 1);
const nextPage = () => selectPage(pageIndex.value + 1);

const requestClose = () => {
  dialog.value?.close();
};

const handleClose = () => {
  document.body.classList.remove("dialog-open");
  emit("close");
};

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === dialog.value) requestClose();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "ArrowLeft" && pageIndex.value > 0) {
    event.preventDefault();
    previousPage();
  }
  if (event.key === "ArrowRight" && pageIndex.value < pages.value.length - 1) {
    event.preventDefault();
    nextPage();
  }
};

watch(
  () => props.credential,
  () => {
    pageIndex.value = 0;
  },
);

watch(
  () => props.open,
  async (isOpen) => {
    await nextTick();
    if (isOpen && dialog.value && !dialog.value.open) {
      pageIndex.value = 0;
      dialog.value.showModal();
      document.body.classList.add("dialog-open");
      return;
    }
    if (!isOpen && dialog.value?.open) dialog.value.close();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  document.body.classList.remove("dialog-open");
});
</script>

<template>
  <dialog
    ref="dialog"
    class="credential-viewer"
    aria-labelledby="credential-viewer-title"
    @click="handleBackdropClick"
    @close="handleClose"
    @keydown="handleKeydown"
  >
    <div v-if="credential && activePage" class="credential-viewer__panel">
      <header class="credential-viewer__header">
        <h2 id="credential-viewer-title">{{ credential.title }}</h2>
        <span class="credential-viewer__counter">
          {{ pageIndex + 1 }} / {{ pages.length }} · {{ activePage.label }}
        </span>
        <button type="button" class="credential-viewer__close" @click="requestClose">
          <PhX :size="25" aria-hidden="true" />
          <span>Close</span>
        </button>
      </header>

      <div class="credential-viewer__stage" aria-live="polite">
        <Transition name="credential-page" mode="out-in">
          <img :key="activePage.src" :src="activePage.src" :alt="activePage.alt" />
        </Transition>
      </div>

      <div class="credential-viewer__thumbnails" aria-label="Credential pages">
        <button
          v-for="(page, index) in pages"
          :key="page.src"
          type="button"
          :class="{ 'is-selected': index === pageIndex }"
          :aria-current="index === pageIndex ? 'page' : undefined"
          :aria-label="`Show ${page.label}`"
          @click="selectPage(index)"
        >
          <img :src="page.src" alt="" />
          <span><b>{{ index + 1 }}</b>{{ page.label }}</span>
        </button>
      </div>

      <footer class="credential-viewer__controls">
        <button type="button" :disabled="pageIndex === 0" @click="previousPage">
          <PhArrowLeft :size="21" aria-hidden="true" />
          Previous
        </button>
        <button
          v-if="hasMultiplePages"
          type="button"
          :disabled="pageIndex === pages.length - 1"
          @click="nextPage"
        >
          Next
          <PhArrowRight :size="21" aria-hidden="true" />
        </button>
      </footer>
      <p class="credential-viewer__escape">Press Esc to close</p>
    </div>
  </dialog>
</template>

<style scoped>
.credential-viewer {
  width: min(1060px, 88vw);
  height: min(790px, 86vh);
  max-width: none;
  max-height: none;
  overflow: visible;
  border: 1px solid var(--cyan);
  padding: 0;
  background: var(--paper);
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.48), 0 0 34px rgba(22, 201, 220, 0.12);
  color: var(--ink);
}

.credential-viewer[open] {
  animation: viewer-in 300ms var(--ease-out) both;
}

.credential-viewer::backdrop {
  background: rgba(4, 9, 13, 0.8);
  backdrop-filter: blur(3px);
  animation: backdrop-in 240ms ease both;
}

.credential-viewer__panel {
  display: grid;
  height: 100%;
  grid-template-rows: 86px minmax(0, 1fr) 118px 66px;
}

.credential-viewer__header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid rgba(22, 201, 220, 0.35);
  padding: 0 28px;
  background: var(--ink);
  color: var(--paper);
}

.credential-viewer__header h2 {
  margin: 0;
  font-size: 23px;
  letter-spacing: -0.03em;
}

.credential-viewer__counter {
  font-family: var(--mono);
  font-size: 13px;
}

.credential-viewer__close,
.credential-viewer__controls button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid var(--cyan);
  background: transparent;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease, transform 180ms var(--ease-out);
}

.credential-viewer__close {
  justify-self: end;
  padding: 0 14px;
  color: var(--paper);
}

.credential-viewer__close:hover,
.credential-viewer__controls button:hover:not(:disabled) {
  background: var(--cyan);
  color: var(--ink);
  transform: translateY(-2px);
}

.credential-viewer__stage {
  position: relative;
  display: grid;
  min-height: 0;
  place-items: center;
  overflow: hidden;
  padding: 22px 34px 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fcfd 100%);
}

.credential-viewer__stage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: saturate(0.72) contrast(1.02);
}

.credential-viewer__thumbnails {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0 28px;
  border: 1px solid var(--line);
  padding: 10px 12px;
}

.credential-viewer__thumbnails button {
  position: relative;
  display: grid;
  min-width: 0;
  grid-template-columns: 118px 1fr;
  align-items: center;
  gap: 12px;
  border: 0;
  border-bottom: 2px solid transparent;
  padding: 5px;
  background: transparent;
  cursor: pointer;
  color: var(--ink);
  text-align: left;
  transition: border-color 180ms ease, background 180ms ease;
}

.credential-viewer__thumbnails button:hover,
.credential-viewer__thumbnails button.is-selected {
  border-bottom-color: var(--cyan);
  background: var(--cyan-pale);
}

.credential-viewer__thumbnails img {
  width: 118px;
  height: 70px;
  border: 1px solid var(--line);
  object-fit: contain;
  background: var(--paper);
}

.credential-viewer__thumbnails span {
  display: grid;
  gap: 5px;
  font-family: var(--mono);
  font-size: 12px;
}

.credential-viewer__thumbnails b {
  color: var(--cyan-dark);
  font-weight: 600;
}

.credential-viewer__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 28px 12px;
}

.credential-viewer__controls button {
  min-width: 130px;
  padding: 0 16px;
  color: var(--ink);
}

.credential-viewer__controls button:disabled {
  border-color: var(--line);
  color: var(--muted);
  cursor: not-allowed;
  opacity: 0.55;
}

.credential-viewer__escape {
  position: absolute;
  right: 0;
  bottom: -38px;
  left: 0;
  margin: 0;
  color: rgba(255, 255, 255, 0.82);
  font-family: var(--mono);
  font-size: 12px;
  text-align: center;
}

.credential-page-enter-active,
.credential-page-leave-active {
  transition: opacity 220ms ease, transform 220ms var(--ease-out);
}

.credential-page-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.credential-page-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

@keyframes viewer-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
}

@keyframes backdrop-in {
  from {
    opacity: 0;
  }
}

@media (max-width: 760px) {
  .credential-viewer {
    width: calc(100vw - 20px);
    height: calc(100dvh - 24px);
  }

  .credential-viewer__panel {
    grid-template-rows: 92px minmax(0, 1fr) 105px 64px;
  }

  .credential-viewer__header {
    grid-template-columns: 1fr auto;
    gap: 4px 12px;
    padding: 12px 16px;
  }

  .credential-viewer__header h2 {
    font-size: 19px;
  }

  .credential-viewer__counter {
    grid-row: 2;
    grid-column: 1;
  }

  .credential-viewer__close {
    grid-row: 1 / span 2;
    grid-column: 2;
  }

  .credential-viewer__stage {
    padding: 14px;
  }

  .credential-viewer__thumbnails {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    margin-inline: 14px;
    padding: 8px;
  }

  .credential-viewer__thumbnails button {
    min-width: 185px;
    grid-template-columns: 72px 1fr;
  }

  .credential-viewer__thumbnails img {
    width: 72px;
    height: 58px;
  }

  .credential-viewer__controls {
    padding-inline: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .credential-viewer[open],
  .credential-viewer::backdrop {
    animation: none;
  }
}
</style>
