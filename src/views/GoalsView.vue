<script setup lang="ts">
import ActionLink from "../components/ActionLink.vue";
</script>

<template>
  <main class="goals-page">
    <svg
      class="organic-backdrop organic-backdrop--goals"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M682 0H1440V1024H702C740 900 628 826 676 698C722 578 614 502 662 382C710 260 620 178 682 0Z" />
    </svg>

    <section class="goals-copy">
      <h1>A deliberate<br />next chapter</h1>
      <p>
        The plan is simple: build useful systems, grow through ownership, and keep
        learning close to practice.
      </p>
      <ActionLink to="/projects">See the work behind the plan</ActionLink>
    </section>

    <section class="roadmap" aria-label="Short-term and mid-term plan">
      <article class="roadmap__phase roadmap__phase--short">
        <div class="roadmap__meta">
          <span class="roadmap__stage">01 · Short term</span>
          <span class="roadmap__date">2026–2027</span>
        </div>
        <h2>Start in software or cloud engineering</h2>
        <ul>
          <li>Contribute to production systems</li>
          <li>Deepen .NET, Azure, and Vue</li>
          <li>Ship and operate this portfolio from my homelab</li>
        </ul>
      </article>

      <article class="roadmap__phase roadmap__phase--mid">
        <div class="roadmap__meta">
          <span class="roadmap__stage">02 · Mid term</span>
          <span class="roadmap__date">From September 2027</span>
        </div>
        <h2>Study Software Engineering part-time</h2>
        <ul>
          <li>FH Hagenberg</li>
          <li>Grow into broader technical ownership</li>
          <li>Connect formal study with real delivery</li>
        </ul>
      </article>
    </section>

    <section class="continuing-threads" aria-labelledby="threads-heading">
      <h2 id="threads-heading">Ongoing focus areas</h2>
      <div class="continuing-threads__list">
        <span
          v-for="thread in ['Cloud architecture', 'Reliable interfaces', 'Automation', 'Applied machine learning']"
          :key="thread"
        >
          {{ thread }}
        </span>
      </div>
    </section>
  </main>
</template>
