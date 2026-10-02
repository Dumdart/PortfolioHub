<script setup lang="ts">
import { PhArrowRight } from "@phosphor-icons/vue";
import DetailMasthead from "../components/DetailMasthead.vue";
import SocialLinks from "../components/SocialLinks.vue";
import { projects } from "../data/projects";
import { internshipStatement, profilePlans } from "../data/profile";
const selectedWork = projects.filter(project => ['topicgate', 'nova'].includes(project.id));
</script>

<template>
  <main class="inner-page about-page--concise">
    <DetailMasthead title="About" introduction="Backend-focused, practical by default." />

    <div class="inner-content"><section class="about-introduction">

      <p>
        I build backend APIs, data systems, and developer tools with C#/.NET, Python, and SQL.
        I enjoy turning requirements into coherent systems, implementing solutions, and reviewing and testing the results.
      </p>

      <SocialLinks :order="['email', 'linkedin', 'github']" />
    </section>

    <section class="about-overview" aria-label="Background and experience">
      <section class="about-education">
        <div class="about-section-title"><h2>HTL Neufelden</h2><span>2026</span></div>
        <p>Business Informatics · Matura &amp; Diploma</p>
        <p>Upper Austria</p>
        <RouterLink class="about-certificates-link" to="/certificates">
          View certificates <PhArrowRight :size="16" aria-hidden="true" />
        </RouterLink>
      </section>

      <section class="about-work">
        <div class="about-section-title">
          <h2>Built in practice</h2>
          <RouterLink to="/projects">All projects <PhArrowRight :size="16" aria-hidden="true" /></RouterLink>
        </div>
        <RouterLink v-for="project in selectedWork" :key="project.id"
          class="about-work-link" :to="{ name: 'projects', query: { project: project.id } }">
          <img :src="project.media![0].src" :alt="project.media![0].alt" />
          <span><strong>{{ project.name }}</strong><small>{{ project.id === 'topicgate' ? 'Published MQTT developer tool' : 'School association system in use' }}</small></span>
          <PhArrowRight :size="20" weight="light" aria-hidden="true" />
        </RouterLink>
      </section>

      <section class="about-next">
        <h2>What’s next</h2>
        <dl>
          <div><dt>Learning</dt><dd>{{ profilePlans.learning.course }}<small>{{ profilePlans.learning.status }}</small></dd></div>
          <div><dt>Interests</dt><dd>{{ profilePlans.interests }}</dd></div>
          <div><dt>{{ profilePlans.study.start }} · {{ profilePlans.study.status }}</dt><dd>{{ profilePlans.study.subject }}</dd></div>
        </dl>
        <p class="about-opportunity">{{ internshipStatement }}</p>
      </section>

      <section class="about-personal">
        <h2>Outside software</h2>
        <p>Music association, Chinese, endurance sports, cooking, and chess.</p>
      </section>

      <section class="about-internships">
        <h2>Earlier internships</h2>
        <p><strong>WKOÖ · 2024</strong>Administrative work</p>
        <section class="about-internship" aria-labelledby="nordfels-title">
          <h3 id="nordfels-title">Nordfels GmbH · 2024</h3>
          <ul>
            <li>Created manufacturing plans.</li>
            <li>Gained insight into mechatronic processes.</li>
            <li>Contributed frontend design for a new company wiki.</li>
          </ul>
        </section>
      </section>
    </section>
    </div>
  </main>
</template>

<style scoped>
.about-introduction .social-links { position: static; flex-wrap: wrap; justify-content: flex-start; gap: 8px 24px; margin-top: 32px; }
.about-introduction :deep(.social-links a) { min-height: 44px; padding: 8px 0; border: 0; font-size: 14px; }
.about-introduction :deep(.social-links a::after) { display: none; }
.about-introduction { margin-bottom: 48px; } .about-introduction > p { max-width: 65ch; font-size: 20px; line-height: 1.65; margin: 0; } .about-introduction :deep(.social-links a) { color: var(--cyan-dark); } .about-overview { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: var(--inner-section-gap); }
.about-personal, .about-internships { grid-column: 1 / -1; }
.about-overview h2 { margin: 0; font-size: 24px; font-weight: 650; letter-spacing: -.03em; }
.about-overview p { max-width: 65ch; margin: 16px 0 0; color: var(--muted); font-size: 16px; line-height: 1.65; }
.about-section-title { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 24px; }
.about-section-title > span { font: 14px var(--mono); color: var(--muted); }
.about-certificates-link, .about-section-title > a { display: inline-flex; align-items: center; gap: 10px; min-height: 44px; color: var(--cyan-dark); font-size: 14px; }
.about-certificates-link { margin-top: 16px; }
.about-certificates-link:hover, .about-section-title > a:hover { text-decoration: underline; text-underline-offset: 4px; }
.about-work-link { display: grid; grid-template-columns: 112px minmax(0, 1fr) 20px; align-items: center; gap: 24px; padding: 24px 0; }
.about-work-link + .about-work-link { border-top: 1px solid var(--line); }
.about-work-link img { width: 100%; height: 80px; object-fit: cover; object-position: top; border: 1px solid var(--line); border-radius: 4px; }
.about-work-link strong { display: block; font-size: 20px; font-weight: 650; }
.about-work-link small { display: block; margin-top: 8px; font-size: 14px; line-height: 1.6; color: var(--muted); }
.about-work-link > svg { color: var(--cyan-dark); }
.about-work-link:hover strong { color: var(--cyan-dark); }
.about-next dl { display: grid; gap: 24px; margin: 24px 0 0; }
.about-next dl > div { display: grid; grid-template-columns: 140px minmax(0, 1fr); gap: 16px; }
.about-next dt { color: var(--muted); font: 13px/1.7 var(--mono); }
.about-next dd { margin: 0; font-size: 16px; line-height: 1.6; }
.about-next dd small { display: block; margin-top: 8px; font-size: 14px; color: var(--muted); }
.about-next .about-opportunity { margin-top: 32px; }
.about-internships strong { display: block; margin-bottom: 8px; font-weight: 600; color: var(--ink); }
.about-internship { margin-top: 24px; }
.about-internship h3 { margin: 0; font-size: 16px; line-height: 1.65; font-weight: 600; }
.about-internship ul { margin: 8px 0 0; padding-left: 20px; color: var(--muted); font-size: 16px; line-height: 1.65; }
.about-internship li + li { margin-top: 4px; }
@media (max-width: 1120px) {
  .about-work-link { grid-template-columns: 80px minmax(0, 1fr) 18px; gap: 16px; }
  .about-next dl > div { grid-template-columns: minmax(0, 1fr); gap: 8px; }
}
@media (max-width: 860px) { .about-overview { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 360px) {
  .about-work-link { grid-template-columns: 64px minmax(0, 1fr) 16px; gap: 12px; }
  .about-work-link img { height: 64px; }
}
</style>
