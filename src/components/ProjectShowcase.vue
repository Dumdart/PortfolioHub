<script setup lang="ts">
import { PhArrowsOutSimple, PhArrowLeft, PhArrowRight } from "@phosphor-icons/vue";
import { computed, ref, watch } from "vue";
import type { Project } from "../data/projects";
import ProjectImageViewer from "./ProjectImageViewer.vue";

type ShowcaseSlide = {
  kind: "image";
  title: string;
  src: string;
  alt: string;
  fit: "contain" | "cover";
  surface: "light" | "dark";
};

const props = defineProps<{
  project: Project;
}>();

const activeIndex = ref(0);
const imageViewerOpen = ref(false);

const slides = computed<ShowcaseSlide[]>(() => [
  ...(props.project.media ?? []).map((item) => ({
    kind: "image" as const,
    title: item.title,
    src: item.src,
    alt: item.alt,
    fit: item.fit ?? "contain",
    surface: item.surface ?? "light",
  })),
]);

const activeSlide = computed(() => slides.value[activeIndex.value]);
const activeImage = computed(() => ({
  src: activeSlide.value.src,
  alt: activeSlide.value.alt,
  title: activeSlide.value.title,
}));

watch(
  () => props.project.id,
  () => {
    activeIndex.value = 0;
    imageViewerOpen.value = false;
  },
);

const showSlide = (index: number) => {
  const count = slides.value.length;
  activeIndex.value = (index + count) % count;
  imageViewerOpen.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (slides.value.length < 2) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(activeIndex.value + (event.key === "ArrowRight" ? 1 : -1));
  }
};
</script>

<template>
  <section class="case-gallery" :aria-label="`${project.name} media showcase`" tabindex="0" @keydown="handleKeydown">
    <figure class="case-gallery__image" :class="`case-gallery__image--${activeSlide.surface}`">
      <img :src="activeSlide.src" :alt="activeSlide.alt" :style="{ objectFit: activeSlide.fit }" @click="imageViewerOpen = true" />
    </figure>
    <div class="case-gallery__caption">
      <span aria-live="polite">{{ activeSlide.title }}</span>
      <button type="button" class="case-gallery__enlarge" @click="imageViewerOpen = true">
        View larger <PhArrowsOutSimple :size="15" aria-hidden="true" />
      </button>
      <div v-if="slides.length > 1" class="case-gallery__controls">
        <button type="button" aria-label="Previous image" @click="showSlide(activeIndex - 1)"><PhArrowLeft :size="17" aria-hidden="true" /></button>
        <span>{{ activeIndex + 1 }} / {{ slides.length }}</span>
        <button type="button" aria-label="Next image" @click="showSlide(activeIndex + 1)"><PhArrowRight :size="17" aria-hidden="true" /></button>
      </div>
    </div>
    <Teleport to="body">
      <ProjectImageViewer :image="activeImage" :open="imageViewerOpen" @close="imageViewerOpen = false" />
    </Teleport>
  </section>
</template>
