<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ActionLink from "../components/ActionLink.vue";
import ProjectArchitecture from "../components/ProjectArchitecture.vue";
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
    <svg
      class="organic-backdrop organic-backdrop--projects"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0H466C500 132 380 188 426 312C470 430 368 506 420 626C475 752 360 838 448 1024H0Z" />
    </svg>

    <aside class="project-rail">
      <div>
        <h1>Selected systems</h1>
        <p>Four projects, each built around a real operational problem.</p>
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
            <h2>{{ selectedProject.name }}</h2>
            <p>{{ selectedProject.purpose }}</p>
          </header>

          <ProjectArchitecture :project="selectedProject" />

          <div class="evidence">
            <h3>Evidence</h3>
            <div class="evidence__items">
              <span v-for="item in selectedProject.evidence" :key="item">
                <i aria-hidden="true"></i>{{ item }}
              </span>
            </div>
          </div>

          <div class="technologies">
            <h3>Technologies</h3>
            <p>{{ selectedProject.technologies.join(" · ") }}</p>
          </div>

          <div class="project-detail__actions">
            <ActionLink
              v-if="selectedProject.repository"
              :href="selectedProject.repository"
              :external="true"
            >
              View public repository
            </ActionLink>
            <span v-else class="private-label">Private project · portfolio case study</span>
            <button class="action-link action-link--secondary" type="button" @click="nextProject">
              Next project
            </button>
          </div>
        </div>
      </Transition>
    </section>
  </main>
</template>
