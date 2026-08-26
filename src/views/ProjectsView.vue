<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ActionLink from "../components/ActionLink.vue";
import ProjectShowcase from "../components/ProjectShowcase.vue";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import { projects, type ProjectId } from "../data/projects";

const route = useRoute();
const router = useRouter();
const selectedId = ref<ProjectId>("smart-home-bridge");

const validProjectId = (value: unknown): value is ProjectId =>
  typeof value === "string" && projects.some((project) => project.id === value);

watch(
  () => route.query.project,
  (value) => {
    if (validProjectId(value)) selectedId.value = value;
  },
  { immediate: true },
);

const selectedProject = computed(
  () => projects.find((project) => project.id === selectedId.value) ?? projects[0],
);

const nextProject = () => {
  const currentIndex = projects.findIndex((project) => project.id === selectedId.value);
  const next = projects[(currentIndex + 1) % projects.length];
  void router.replace({ name: "projects", query: { project: next.id } });
};
</script>

<template>
  <main class="projects-page">
    <SignalBackdrop variant="projects" />

    <aside class="project-rail">
      <div>
        <h1>Selected systems</h1>
      </div>

      <nav aria-label="Project selection">
        <button
          v-for="project in projects"
          :key="project.id"
          type="button"
          :class="{ 'is-selected': project.id === selectedId }"
          @click="
            router.replace({
              name: 'projects',
              query: { project: project.id },
            })
          "
        >
          <i aria-hidden="true"></i>
          <span>{{ project.name }}</span>
        </button>
      </nav>
    </aside>

    <section class="project-detail" aria-live="polite">
      <Transition name="project" mode="out-in">
        <div :key="selectedProject.id">
          <header class="project-detail__header">
            <span v-if="selectedProject.status" class="project-status">
              {{ selectedProject.status }}
            </span>
            <div class="project-detail__title-row">
              <h2>{{ selectedProject.name }}</h2>
              <div class="project-detail__actions">
                <ActionLink
                  v-if="selectedProject.repository"
                  :href="selectedProject.repository"
                  variant="secondary"
                  :external="true"
                >
                  Open GitHub repository
                </ActionLink>
                <ActionLink v-if="selectedProject.documentation" :href="selectedProject.documentation.href" variant="secondary">
                  {{ selectedProject.documentation.label }}
                </ActionLink>
                <button class="action-link action-link--secondary" type="button" @click="nextProject">
                  Next project
                </button>
              </div>
            </div>
            <p>{{ selectedProject.purpose }}</p>
          </header>

          <div class="technologies">
            <h3>Tech stack</h3>
            <p>{{ selectedProject.technologies.join(" · ") }}</p>
          </div>

          <ProjectShowcase v-if="selectedProject.media?.length" :project="selectedProject" />
        </div>
      </Transition>
    </section>
  </main>
</template>
