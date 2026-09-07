<script setup lang="ts">
import { computed, ref, useId, watch } from "vue";
import { PhArrowsOutSimple, PhCaretDown } from "@phosphor-icons/vue";
import type { Project } from "../data/projects";
import ProjectImageViewer from "./ProjectImageViewer.vue";

const props = defineProps<{ architecture: NonNullable<Project["architecture"]> }>();
const svg = ref("");
const failed = ref(false);
const enlarged = ref(false);
const image = computed(() => ({
  src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.value)}`,
  title: props.architecture.planned ? "Planned architecture" : "System architecture",
  alt: props.architecture.description,
}));
const id = `architecture-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

watch(() => props.architecture.source, async (source, _previous, onCleanup) => {
  let cancelled = false;
  onCleanup(() => { cancelled = true; });
  svg.value = "";
  failed.value = false;
  try {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      fontFamily: "Arial, sans-serif",
      themeVariables: { primaryColor: "#effcff", primaryTextColor: "#071015", primaryBorderColor: "#058da3", lineColor: "#64747c" },
      flowchart: { htmlLabels: false, useMaxWidth: true },
    });
    if (cancelled) return;
    const rendered = await mermaid.render(id, source);
    if (!cancelled) svg.value = rendered.svg;
  } catch {
    if (!cancelled) failed.value = true;
  }
}, { immediate: true });
</script>

<template>
  <section class="project-architecture" aria-label="System architecture">
    <div v-if="svg" class="project-architecture__diagram" tabindex="0" role="img" :aria-label="architecture.description" v-html="svg"></div>
    <p v-else-if="!failed" role="status">Loading diagram…</p>
    <p v-else>{{ architecture.description }}</p>
    <button v-if="svg" class="architecture-enlarge" type="button" @click="enlarged = true">
      View larger <PhArrowsOutSimple :size="15" aria-hidden="true" />
    </button>
    <details class="architecture-notes">
      <summary>Diagram notes &amp; source <PhCaretDown :size="16" aria-hidden="true" /></summary>
      <p>{{ architecture.description }}</p>
      <pre>{{ architecture.source }}</pre>
    </details>
    <Teleport to="body">
      <ProjectImageViewer :image="image" :open="enlarged" @close="enlarged = false" />
    </Teleport>
  </section>
</template>
