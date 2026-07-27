<script setup lang="ts">
import { PhGraduationCap } from "@phosphor-icons/vue";
import ActionLink from "../components/ActionLink.vue";
import HomeSkillsPanel from "../components/HomeSkillsPanel.vue";
</script>

<template>
  <main class="home-page">
    <svg
      class="organic-backdrop organic-backdrop--home"
      viewBox="0 0 1440 884"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0H800C815 120 720 165 746 280C774 392 688 438 738 535C790 638 702 702 784 884H0Z" />
    </svg>

    <section class="home-hero">
      <div class="home-copy">
        <h1>Connected systems.<br />Clear decisions.<br />Useful software.</h1>
        <p>
          I turn real operational problems into dependable web, cloud, automation,
          and machine-learning products.
        </p>

        <div class="home-actions">
          <ActionLink to="/projects">Open project map</ActionLink>
          <ActionLink to="/goals" variant="secondary">My next steps</ActionLink>
        </div>

        <div class="qualification">
          <PhGraduationCap :size="24" weight="light" aria-hidden="true" />
          <span>HTL Business Informatics · Graduated 2026 · Upper Austria</span>
        </div>
      </div>

      <div class="portrait-anchor">
        <img src="/assets/paul-thumfart.jpg" alt="Portrait of Paul Thumfart" />
      </div>

      <div class="home-skills-wrap">
        <HomeSkillsPanel />
      </div>
    </section>
  </main>
</template>
