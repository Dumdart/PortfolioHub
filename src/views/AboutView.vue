<script setup lang="ts">
import { nextTick, ref } from "vue";
import {
  PhDownloadSimple,
  PhLockKey,
  PhArrowRight,
} from "@phosphor-icons/vue";
import CredentialViewer from "../components/CredentialViewer.vue";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import SocialLinks from "../components/SocialLinks.vue";
import { projects } from "../data/projects";
import {
  credentials,
  supportingDocuments,
  type Credential,
} from "../data/credentials";

const activeCredential = ref<Credential | null>(null);
const selectedWork = projects.filter(project => ['topicgate', 'nova'].includes(project.id));
const credentialTrigger = ref<HTMLElement | null>(null);

const openCredential = (event: MouseEvent, credential: Credential) => {
  credentialTrigger.value = event.currentTarget as HTMLElement;
  activeCredential.value = credential;
};

const closeCredential = async () => {
  activeCredential.value = null;
  await nextTick();
  credentialTrigger.value?.focus();
};
</script>

<template>
  <main class="about-page about-page--concise">
    <SignalBackdrop variant="about" />

    <section class="about-intro">
      <h1>Backend-focused, practical by default.</h1>
      <p>
        I build APIs and developer tools with C#/.NET, Python, and SQL—from code to deployment.
      </p>

      <SocialLinks :order="['email', 'linkedin', 'github']" />
    </section>

    <section class="about-overview" aria-label="Background and experience">
      <section class="about-education">
        <div class="about-section-title"><h2>HTL Neufelden</h2><span>2026</span></div>
        <p>Business Informatics · Matura &amp; Diploma</p>
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
          <div><dt>Learning</dt><dd>Go &amp; distributed systems</dd></div>
          <div><dt>2027 · planned</dt><dd>Software Engineering · FH Hagenberg<small>Part-time study</small></dd></div>
        </dl>
      </section>

      <section class="about-personal">
        <h2>Outside software</h2>
        <p>Music association, Chinese, endurance sports, cooking, and chess.</p>
      </section>

      <section class="about-internships">
        <h2>Earlier internships</h2>
        <p><strong>WKOÖ · 2024</strong>Administrative work</p>
        <p><strong>Nordfels GmbH · 2024</strong>Manufacturing plans &amp; mechatronics</p>
      </section>
    </section>
    <aside class="credentials">
      <h2>Credentials</h2>
      <button
        v-for="credential in credentials"
        :key="credential.title"
        class="credential-card"
        type="button"
        @click="openCredential($event, credential)"
      >
        <span>{{ credential.title }}</span>
        <img :src="credential.pages[0].src" :alt="credential.pages[0].alt" />
      </button>
      <p><PhLockKey :size="20" aria-hidden="true" />Public previews redact personal identifiers.</p>

      <section class="credential-downloads" aria-labelledby="credential-downloads-title">
        <h3 id="credential-downloads-title">Supporting documents</h3>
        <a
          v-for="document in supportingDocuments"
          :key="document.href"
          :href="document.href"
          :download="document.filename"
        >
          <span>
            <strong>{{ document.title }}</strong>
            <small>{{ document.detail }}</small>
          </span>
          <PhDownloadSimple :size="22" aria-hidden="true" />
        </a>
      </section>
    </aside>

    <CredentialViewer
      :credential="activeCredential"
      :open="activeCredential !== null"
      @close="closeCredential"
    />
  </main>
</template>

<style scoped>
.about-overview {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 32px;
  min-width: 0;
  padding: 170px 36px 56px 64px;
}
.about-overview h2 { margin: 0; font-size: 21px; font-weight: 650; letter-spacing: -0.03em; }
.about-overview p { margin: 12px 0 0; color: var(--muted); font-size: 14px; line-height: 1.65; }
.about-section-title { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.about-section-title > span { font: 12px var(--mono); color: var(--cyan-dark); }
.about-section-title > a { display: inline-flex; align-items: center; gap: 8px; color: var(--cyan-dark); font-size: 12px; white-space: nowrap; }
.about-education { padding-bottom: 24px; border-bottom: 1px solid var(--line); }
.about-work-link {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr) 20px;
  align-items: center;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--line);
}
.about-work-link img { width: 100%; height: 70px; object-fit: cover; object-position: top; border: 1px solid var(--line); border-radius: 4px; }
.about-work-link strong { display: block; font-size: 18px; font-weight: 650; }
.about-work-link small { display: block; margin-top: 6px; font-size: 12px; line-height: 1.5; color: var(--muted); }
.about-work-link > svg { color: var(--cyan-dark); transition: transform 160ms ease; }
.about-work-link:hover strong { color: var(--cyan-dark); }
.about-work-link:hover > svg { transform: translateX(3px); }
.about-next dl { display: grid; gap: 16px; margin: 18px 0 0; }
.about-next dl > div { display: grid; grid-template-columns: 112px 1fr; gap: 12px; }
.about-next dt { color: var(--cyan-dark); font: 11px/1.7 var(--mono); }
.about-next dd { margin: 0; font-size: 14px; line-height: 1.5; }
.about-next dd small { display: block; margin-top: 4px; font-size: 12px; color: var(--muted); }
.about-internships {
  border-top: 1px solid var(--line);
  padding-top: 18px;
}
.about-internships > p { margin: 16px 0 0; }
.about-internships > p + p { margin-top: 12px; }
.about-internships strong { display: block; font-weight: 600; color: var(--ink); }
@media (max-width: 1120px) {
  .about-overview { padding-inline: 38px 24px; }
  .about-work-link { grid-template-columns: 74px minmax(0, 1fr) 16px; gap: 12px; }
  .about-work-link img { height: 60px; }
}
@media (max-width: 860px) {
  .about-page--concise .about-intro { min-height: auto; padding-bottom: 42px; }
  .about-page--concise .about-intro .social-links { position: static; margin-top: 40px; }
  .about-overview { background: #fff; padding: 42px 24px; gap: 30px; }
  .about-work-link { grid-template-columns: 90px minmax(0, 1fr) 18px; }
  .about-next dl > div { grid-template-columns: 100px 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .about-work-link > svg { transition: none; }
}
</style>
