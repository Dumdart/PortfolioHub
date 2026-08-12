<script setup lang="ts">
import type { Project } from "../data/projects";
import { useReducedMotion } from "../composables/useReducedMotion";

defineProps<{
  project: Project;
}>();

const reducedMotion = useReducedMotion();
</script>

<template>
  <figure v-if="project.screenshot" class="project-screenshot">
    <img :src="project.screenshot.src" :alt="project.screenshot.alt" />
  </figure>

  <div v-else class="architecture" :aria-label="`${project.name} architecture map`">
    <svg
      class="architecture__paths"
      viewBox="0 0 510 350"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path class="architecture__route" pathLength="1" d="M0 60 C145 60 120 175 255 175" />
      <path class="architecture__route" pathLength="1" d="M0 175 H255" />
      <path class="architecture__route" pathLength="1" d="M0 290 C145 290 120 175 255 175" />
      <path class="architecture__route" pathLength="1" d="M255 175 C390 175 365 60 510 60" />
      <path class="architecture__route" pathLength="1" d="M255 175 H510" />
      <path class="architecture__route" pathLength="1" d="M255 175 C390 175 365 290 510 290" />
      <circle class="architecture__hub-ring architecture__hub-ring--outer" cx="255" cy="175" r="44" />
      <circle class="architecture__hub-ring architecture__hub-ring--inner" cx="255" cy="175" r="29" />
      <circle class="architecture__core" cx="255" cy="175" r="12" />
      <template v-if="!reducedMotion">
        <circle class="architecture__packet" r="4">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M0 60 C145 60 120 175 255 175" />
        </circle>
        <circle class="architecture__packet" r="4">
          <animateMotion dur="4.4s" begin="-1.4s" repeatCount="indefinite" path="M0 290 C145 290 120 175 255 175" />
        </circle>
        <circle class="architecture__packet" r="4">
          <animateMotion dur="4s" begin="-2s" repeatCount="indefinite" path="M255 175 C390 175 365 290 510 290" />
        </circle>
      </template>
    </svg>

    <div class="architecture__column architecture__column--left">
      <span v-for="node in project.leftNodes" :key="node">{{ node }}<i></i></span>
    </div>
    <div class="architecture__column architecture__column--right">
      <span v-for="node in project.rightNodes" :key="node"><i></i>{{ node }}</span>
    </div>
  </div>
</template>
