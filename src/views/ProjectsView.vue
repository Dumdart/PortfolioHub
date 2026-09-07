<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhArrowRight, PhCaretDown } from "@phosphor-icons/vue";
import ProjectVisual from "../components/ProjectVisual.vue";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import { projects, resolveProjectId, nextProjectId, type ProjectId } from "../data/projects";
import "../project-case-study.css";

const route = useRoute();
const router = useRouter();
const selectedId = computed(() => resolveProjectId(route.query.project));
const selectedProject = computed(() => projects.find(project => project.id === selectedId.value)!);
const projectGroups = [
  { label: "Featured", projects: projects.slice(0, 3) },
  { label: "Other systems", projects: projects.slice(3) },
];

function selectProject(id: ProjectId) {
  void router.replace({ name: "projects", query: { project: id } });
}
</script>

<template>
  <main class="case-page">
    <div class="case-field" aria-hidden="true">
      <SignalBackdrop variant="projects" viewBox="0 0 500 1024" />
    </div>
    <aside class="case-rail">
      <h2>Projects</h2>
      <nav aria-label="Project selection">
        <section v-for="group in projectGroups" :key="group.label">
          <h2>{{ group.label }}</h2>
          <button v-for="project in group.projects" :key="project.id" type="button"
            :aria-current="project.id === selectedId ? 'true' : undefined"
            @click="selectProject(project.id)">{{ project.name }}</button>
        </section>
      </nav>
      <label class="case-mobile-select">
        <span>Select project</span>
        <select :value="selectedId" @change="selectProject(resolveProjectId(($event.target as HTMLSelectElement).value))">
          <optgroup v-for="group in projectGroups" :key="group.label" :label="group.label">
            <option v-for="project in group.projects" :key="project.id" :value="project.id">{{ project.name }}</option>
          </optgroup>
        </select>
      </label>
    </aside>

    <article :key="selectedProject.id" class="case-content" :aria-label="selectedProject.name">
      <header class="case-heading">
        <div class="case-heading__row">
          <h1>{{ selectedProject.name }}</h1>
          <button class="case-next" type="button" @click="selectProject(nextProjectId(selectedId))">
            Next project <PhArrowRight :size="24" weight="light" aria-hidden="true" />
          </button>
        </div>
        <p class="case-summary">{{ selectedProject.summary }}</p>
        <p v-if="selectedProject.status" class="case-status">{{ selectedProject.status }}</p>
      </header>

      <dl class="case-meta">
        <div><dt>My work</dt><dd>{{ selectedProject.roleSummary }}</dd></div>
        <div><dt>Stack</dt><dd>{{ selectedProject.technologies.join(' · ') }}</dd></div>
      </dl>

      <ProjectVisual :project="selectedProject" />

      <section class="case-decisions" aria-label="Engineering decisions">
        <h3>Engineering decisions</h3>
        <details v-for="(decision, index) in selectedProject.decisions" :key="decision.title">
          <summary>
            <span class="case-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span>{{ decision.title }}</span>
            <PhCaretDown :size="18" weight="light" aria-hidden="true" />
          </summary>
          <p>{{ decision.reason }}</p>
        </details>
      </section>

      <details class="case-outcome">
        <summary>
          <span>{{ selectedProject.result }}</span>
          <span class="case-outcome__label">Outcome &amp; lessons <PhCaretDown :size="18" weight="light" aria-hidden="true" /></span>
        </summary>
        <div class="case-outcome__body">
          <section><h3>My contribution</h3><p>{{ selectedProject.contribution }}</p></section>
          <section><h3>What I learned</h3><p>{{ selectedProject.lesson }}</p></section>
        </div>
      </details>
      <footer v-if="selectedProject.documentation || selectedProject.repository" class="case-links">
        <a v-if="selectedProject.documentation" :href="selectedProject.documentation.href">
          {{ selectedProject.documentation.label }} <PhArrowRight :size="18" aria-hidden="true" />
        </a>
        <a v-if="selectedProject.repository" :href="selectedProject.repository" target="_blank" rel="noopener noreferrer">
          GitHub repository <PhArrowRight :size="18" aria-hidden="true" />
        </a>
      </footer>
    </article>
  </main>
</template>
