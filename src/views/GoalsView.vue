<script setup lang="ts">
import SignalBackdrop from "../components/SignalBackdrop.vue";

const roadmap = [
  {
    number: "01",
    stage: "Next step",
    title: "Start in software or cloud engineering",
    date: "2026–2027",
  },
  {
    number: "02",
    stage: "Build depth",
    title: "Study Software Engineering part-time",
    date: "From September 2027",
  },
  {
    number: "03",
    stage: "Always",
    title: "Continue building and learning",
    date: "Ongoing",
  },
];
</script>

<template>
  <main class="goals-page">
    <section class="goals-hero">
      <SignalBackdrop variant="goals" />

      <div class="goals-copy">
        <h1>Goals &amp; Plans</h1>
        <p>Build. Learn. Take ownership.</p>
      </div>
    </section>

    <section class="goals-roadmap" aria-label="Goals and plans roadmap">
      <article v-for="step in roadmap" :key="step.number" class="roadmap-step">
        <div class="roadmap-step__meta">
          <span>{{ step.number }}</span>
          <time>{{ step.date }}</time>
        </div>
        <h2>{{ step.title }}</h2>
        <p>{{ step.stage }}</p>
      </article>
    </section>
  </main>
</template>
