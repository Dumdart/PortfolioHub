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
      <div class="roadmap__now">
        <span>Now · July 2026</span>
        <i aria-hidden="true"></i>
      </div>

      <article class="roadmap__phase roadmap__phase--short">
        <span class="roadmap__date">2026–2027</span>
        <h2>Start in software or<br />cloud engineering</h2>
        <ul>
          <li>Contribute to production systems</li>
          <li>Deepen .NET, Azure, and Vue</li>
          <li>Ship and operate this portfolio from my homelab</li>
        </ul>
      </article>

      <article class="roadmap__phase roadmap__phase--mid">
        <span class="roadmap__date">From September 2027</span>
        <h2>Study Software Engineering<br />part-time</h2>
        <ul>
          <li>FH Hagenberg</li>
          <li>Grow into broader technical ownership</li>
          <li>Connect formal study with real delivery</li>
        </ul>
      </article>

      <svg class="roadmap__paths" viewBox="0 0 800 650" aria-hidden="true">
        <path d="M245 325 C330 325 330 98 420 98 H500" />
        <path d="M245 325 C330 325 330 480 420 480 H500" />
        <circle cx="245" cy="325" r="16" />
        <circle class="roadmap__core" cx="245" cy="325" r="6" />
        <circle cx="500" cy="98" r="12" />
        <circle cx="500" cy="480" r="12" />
      </svg>
    </section>

    <section class="continuing-threads" aria-labelledby="threads-heading">
      <h2 id="threads-heading" class="sr-only">Continuing threads</h2>
      <div v-for="thread in ['Cloud architecture', 'Reliable interfaces', 'Automation', 'Applied machine learning']" :key="thread">
        <span>{{ thread }}</span><i aria-hidden="true"></i>
      </div>
    </section>
  </main>
</template>
