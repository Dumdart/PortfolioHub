<script setup lang="ts">
import type { Project } from "../data/projects";

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="architecture" :aria-label="`${project.name} architecture map`">
    <svg class="architecture__paths" viewBox="0 0 820 350" aria-hidden="true">
      <path d="M140 60 C280 60 285 175 410 175" />
      <path d="M140 175 H410" />
      <path d="M140 290 C280 290 285 175 410 175" />
      <path d="M410 175 C535 175 540 60 680 60" />
      <path d="M410 175 H680" />
      <path d="M410 175 C535 175 540 290 680 290" />
      <circle cx="410" cy="175" r="44" />
      <circle class="architecture__core" cx="410" cy="175" r="12" />
    </svg>

    <div class="architecture__column architecture__column--left">
      <span v-for="node in project.leftNodes" :key="node">{{ node }}<i></i></span>
    </div>
    <div class="architecture__column architecture__column--right">
      <span v-for="node in project.rightNodes" :key="node"><i></i>{{ node }}</span>
    </div>
  </div>
</template>
