<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from "vue";
import { projectViews, type Project } from "../data/projects";
import ProjectArchitecture from "./ProjectArchitecture.vue";
import ProjectShowcase from "./ProjectShowcase.vue";

const props = defineProps<{ project: Project }>();
const views = computed(() => projectViews(props.project));
const activeView = ref<"product" | "architecture">("product");
const tabs = ref<HTMLElement | null>(null);
const id = useId();
const product = computed(() => ({ ...props.project, media: props.project.media?.filter(item => item.kind !== "architecture") }));
const architectureImages = computed(() => ({ ...props.project, media: props.project.media?.filter(item => item.kind === "architecture") }));

watch(() => props.project.id, () => { activeView.value = views.value[0]; }, { immediate: true });

async function navigateTabs(event: KeyboardEvent) {
  const index = views.value.indexOf(activeView.value);
  let next: number;
  if (event.key === "ArrowRight") next = (index + 1) % views.value.length;
  else if (event.key === "ArrowLeft") next = (index + views.value.length - 1) % views.value.length;
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = views.value.length - 1;
  else return;
  event.preventDefault();
  activeView.value = views.value[next];
  await nextTick();
  tabs.value?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
}
</script>

<template>
  <section class="case-visual" aria-label="Project visuals">
    <div ref="tabs" class="case-tabs" role="tablist" aria-label="Project view" @keydown="navigateTabs">
      <button v-for="view in views" :id="`${id}-${view}-tab`" :key="view" type="button" role="tab"
        :aria-selected="activeView === view" :aria-controls="`${id}-${view}-panel`"
        :tabindex="activeView === view ? 0 : -1" @click="activeView = view">
        {{ view === 'product' ? 'Product' : 'Architecture' }}
      </button>
      <span v-if="project.architecture?.planned && activeView === 'architecture'">Planned design</span>
    </div>
    <div v-for="view in views" v-show="activeView === view" :id="`${id}-${view}-panel`" :key="view"
      role="tabpanel" :aria-labelledby="`${id}-${view}-tab`" tabindex="0">
      <ProjectShowcase v-if="view === 'product'" :project="product" />
      <template v-else-if="activeView === 'architecture'">
        <ProjectArchitecture v-if="project.architecture" :architecture="project.architecture" />
        <ProjectShowcase v-else :project="architectureImages" />
      </template>
    </div>
  </section>
</template>
