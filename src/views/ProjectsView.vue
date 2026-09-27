<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhArrowRight, PhCaretDown } from "@phosphor-icons/vue";
import DetailMasthead from "../components/DetailMasthead.vue";
import ProjectShowcase from "../components/ProjectShowcase.vue";
import ProjectArchitecture from "../components/ProjectArchitecture.vue";
import { projects, resolveProjectId, nextProjectId, type ProjectId } from "../data/projects";
import "../project-case-study.css";

const route = useRoute();
const router = useRouter();
const selectedId = computed(() => resolveProjectId(route.query.project));
const selectedProject = computed(() => projects.find(project => project.id === selectedId.value)!);
const advanced = computed(() => route.query.advanced === "true");
const title = ref<HTMLElement | null>(null);
const modeControl = ref<HTMLButtonElement | null>(null);
const advancedRegion = ref<HTMLElement | null>(null);
const iconFailed = ref(false);
const primaryProject = computed(() => ({ ...selectedProject.value, media: selectedProject.value.primaryMedia === undefined ? [] : [selectedProject.value.media![selectedProject.value.primaryMedia]] }));
function selectProject(id: ProjectId) {
  void router.push({ name: "projects", query: { ...route.query, project: id } });
}
function toggleAdvanced() {
  const query = { ...route.query };
  if (advanced.value) delete query.advanced;
  else query.advanced = "true";
  void router.replace({ query });
}
watch(selectedId, async () => {
  iconFailed.value = false;
  await nextTick();
  title.value?.focus({ preventScroll: true });
  title.value?.scrollIntoView({ block: "start", behavior: "instant" });
});
watch(advanced, (enabled) => {
  if (!enabled && advancedRegion.value?.contains(document.activeElement)) modeControl.value?.focus({ preventScroll: true });
}, { flush: "sync" });
</script>

<template>
  <main class="inner-page case-page">
    <DetailMasthead title="Projects" introduction="Practical software, personal projects, and what I learned building them." />
    <div class="inner-content case-content">
      <div class="case-selection">
        <label><span>Project</span><select :value="selectedId" @change="selectProject(resolveProjectId(($event.target as HTMLSelectElement).value))">
          <option v-for="project in projects" :key="project.id" :value="project.id">{{ project.name }}</option>
        </select></label>
        <button class="case-next" type="button" @click="selectProject(nextProjectId(selectedId))">Next project <PhArrowRight :size="20" aria-hidden="true" /></button>
      </div>
      <article :key="selectedId" :aria-label="selectedProject.name">
        <header class="case-heading">
          <div class="case-heading__row">
            <span v-if="selectedProject.icon" class="case-icon"><img v-if="!iconFailed" :src="selectedProject.icon.src" alt="" width="40" height="40" @error="iconFailed = true" /></span>
            <h2 ref="title" tabindex="-1">{{ selectedProject.name }}</h2>
          </div>
          <p class="case-status">{{ selectedProject.status }}</p>
        </header>
        <div class="case-story"><p v-for="paragraph in selectedProject.coreStory" :key="paragraph">{{ paragraph }}</p></div>
        <div class="case-visual">
          <ProjectShowcase v-if="primaryProject.media.length" :project="primaryProject" />
          <ProjectArchitecture v-else-if="selectedProject.architecture" :architecture="selectedProject.architecture" :show-notes="false" />
        </div>
        <div v-if="selectedProject.links.length" class="case-links">
          <a v-for="link in selectedProject.links" :key="link.url" :href="link.url" :target="link.url.startsWith('https:') ? '_blank' : undefined" :rel="link.url.startsWith('https:') ? 'noopener noreferrer' : undefined">{{ link.label }} <PhArrowRight :size="18" aria-hidden="true" /></a>
        </div>
        <div v-if="selectedProject.advancedBlocks.length" class="case-mode">
          <button ref="modeControl" type="button" :aria-expanded="advanced" aria-controls="advanced-content" @click="toggleAdvanced">
            <span>Advanced mode</span>
            <PhCaretDown class="case-mode__chevron" :size="24" aria-hidden="true" />
          </button>
        </div>
        <div v-if="advanced && selectedProject.advancedBlocks.length" id="advanced-content" ref="advancedRegion" class="case-advanced">
          <section v-for="block in selectedProject.advancedBlocks" :key="block.id">
            <h3>{{ block.heading }}</h3>
            <template v-if="block.type === 'text'"><p v-for="paragraph in block.paragraphs" :key="paragraph">{{ paragraph }}</p></template>
            <p v-else-if="block.type === 'decision'">{{ block.reason }}</p>
            <ul v-else-if="block.type === 'list'"><li v-for="item in block.items" :key="item">{{ item }}</li></ul>
            <div v-else-if="block.type === 'architecture'" class="case-visual"><p v-if="block.architecture.planned">Planned architecture</p><ProjectArchitecture :architecture="block.architecture" /></div>
            <ProjectShowcase v-else-if="block.type === 'media'" :project="{ ...selectedProject, media: block.media }" />
          </section>
        </div>
      </article>
    </div>
  </main>
</template>
