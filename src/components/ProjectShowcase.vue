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
  if (event.key === "ArrowLeft") showSlide(activeIndex.value - 1);
  if (event.key === "ArrowRight") showSlide(activeIndex.value + 1);
};
</script>

<template>
  <section
    class="project-showcase"
    :aria-label="`${project.name} media showcase`"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div class="project-showcase__toolbar">
      <div class="project-showcase__tabs" role="tablist" aria-label="Showcase pages">
        <button
          v-for="(slide, index) in slides"
          :key="`${slide.kind}-${slide.title}`"
          type="button"
          role="tab"
          :aria-selected="index === activeIndex"
          :tabindex="index === activeIndex ? 0 : -1"
          :class="{ 'is-active': index === activeIndex }"
          @click="showSlide(index)"
        >
          {{ slide.title }}
        </button>
      </div>

      <div v-if="slides.length > 1" class="project-showcase__controls">
        <button type="button" aria-label="Previous slide" @click="showSlide(activeIndex - 1)">
          <PhArrowLeft :size="20" weight="light" aria-hidden="true" />
        </button>
        <span aria-live="polite">
          <strong>{{ String(activeIndex + 1).padStart(2, "0") }}</strong>
          / {{ String(slides.length).padStart(2, "0") }}
        </span>
        <button type="button" aria-label="Next slide" @click="showSlide(activeIndex + 1)">
          <PhArrowRight :size="20" weight="light" aria-hidden="true" />
        </button>
      </div>
    </div>

    <div class="project-showcase__stage project-showcase__stage--image">
      <Transition name="showcase" mode="out-in">
        <figure
          :key="`${project.id}-${activeIndex}`"
          class="showcase-image"
          :class="`showcase-image--${activeSlide.surface}`"
        >
          <img
            :src="activeSlide.src"
            :alt="activeSlide.alt"
            :style="{ objectFit: activeSlide.fit }"
            @click="imageViewerOpen = true"
          />
          <button type="button" class="showcase-image__open" @click="imageViewerOpen = true">
            <PhArrowsOutSimple :size="18" aria-hidden="true" />
            View larger
          </button>
        </figure>
      </Transition>
    </div>

    <Teleport to="body">
      <ProjectImageViewer
        :image="activeImage"
        :open="imageViewerOpen"
        @close="imageViewerOpen = false"
      />
    </Teleport>
  </section>
</template>
