<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { PhArrowUpRight, PhDownloadSimple, PhLockKey } from "@phosphor-icons/vue";
import { RouterLink } from "vue-router";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import { courseBadges, credentials, diplomaThesis, supportingDocuments } from "../data/credentials";

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const formatMonth = (month: string) => monthFormatter.format(new Date(`${month}-01T00:00:00Z`));
</script>

<template>
  <main class="certificates-page">
    <SignalBackdrop variant="about" />

    <section class="certificates-intro">
      <h1>Certificates</h1>
      <p>Course badges, academic credentials, and the documents behind them.</p>
    </section>

    <div class="certificates-content">
      <section aria-labelledby="academic-credentials-title">
        <h2 id="academic-credentials-title">Academic credentials</h2>
        <a class="certificate-document diploma-thesis" :href="diplomaThesis.href" :download="diplomaThesis.filename">
          <img :src="diplomaThesis.preview.src" :alt="diplomaThesis.preview.alt" width="928" height="380" loading="lazy" />
          <span><strong>{{ diplomaThesis.title }}</strong><small>{{ diplomaThesis.detail }}</small></span>
          <PhDownloadSimple :size="22" aria-hidden="true" />
        </a>
        <div class="academic-credentials">
          <RouterLink
            v-for="credential in credentials"
            :key="credential.id"
            class="academic-credential"
            :to="{ name: 'credential-document', params: { credentialId: credential.id } }"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open ${credential.title} in a new tab`"
          >
            <img :src="credential.pages[0].src" :alt="credential.pages[0].alt" loading="lazy" />
            <span>{{ credential.title }} <PhArrowUpRight :size="18" aria-hidden="true" /></span>
          </RouterLink>
        </div>
        <p class="certificates-privacy"><PhLockKey :size="18" aria-hidden="true" />Public previews redact personal identifiers.</p>
      </section>

      <section aria-labelledby="course-badges-title">
        <h2 id="course-badges-title">Course &amp; badges</h2>
        <div class="course-badges">
          <article v-for="badge in courseBadges" :key="badge.id" class="course-badge">
            <Icon v-if="'icon' in badge.visual" :icon="badge.visual.icon" class="course-badge__image" aria-hidden="true" />
            <img v-else :src="badge.visual.src" :alt="badge.visual.alt" class="course-badge__image" />
            <div class="course-badge__content">
              <h3>{{ badge.title }}</h3>
              <p class="course-badge__issuer">{{ badge.issuer }}</p>
              <p v-if="badge.issuedMonth || badge.expiryMonth" class="course-badge__dates">
                <span v-if="badge.issuedMonth">Issued <time :datetime="badge.issuedMonth">{{ formatMonth(badge.issuedMonth) }}</time></span>
                <span v-if="badge.issuedMonth && badge.expiryMonth" aria-hidden="true"> · </span>
                <span v-if="badge.expiryMonth">Expires <time :datetime="badge.expiryMonth">{{ formatMonth(badge.expiryMonth) }}</time></span>
              </p>
              <p v-if="badge.credentialId" class="course-badge__id">Credential ID: {{ badge.credentialId }}</p>
              <a class="certificate-proof" :href="badge.proofUrl" target="_blank" rel="noopener noreferrer"
                :aria-label="`Show proof for ${badge.title} (opens in a new tab)`">
                Show proof <PhArrowUpRight :size="16" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </section>

      <section class="certificate-documents" aria-labelledby="supporting-documents-title">
        <h2 id="supporting-documents-title">Supporting documents</h2>
        <a v-for="document in supportingDocuments" :key="document.href" class="certificate-document" :href="document.href" :download="document.filename">
          <span><strong>{{ document.title }}</strong><small>{{ document.detail }}</small></span>
          <PhDownloadSimple :size="22" aria-hidden="true" />
        </a>
      </section>
    </div>
  </main>
</template>

<style scoped>
.certificates-page {
  position: relative;
  display: grid;
  grid-template-columns: 37% minmax(0, 1fr);
  min-height: 100vh;
  background: var(--ink);
}
.certificates-intro { position: relative; z-index: 1; padding: 170px 58px 56px; color: var(--paper); }
.certificates-intro h1 { margin: 0 0 22px; font-size: clamp(38px, 3.2vw, 52px); font-weight: 750; letter-spacing: -0.052em; line-height: 1.1; }
.certificates-intro p { max-width: 360px; margin: 0; color: #c4cdd0; font-size: 17px; line-height: 1.65; }
.certificates-content { position: relative; z-index: 1; display: grid; align-content: start; gap: 40px; min-width: 0; padding: 170px 58px 64px 64px; }
.certificates-content h2 { margin: 0 0 24px; font-size: 21px; font-weight: 650; letter-spacing: -0.03em; }
.course-badges { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.course-badge { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 20px; min-width: 0; padding: 0 0 26px; border-bottom: 1px solid var(--line); }
.course-badge__image { width: 40px; height: 40px; object-fit: contain; margin-top: 2px; }
.course-badge h3 { margin: 0; font-size: 18px; font-weight: 650; letter-spacing: -0.02em; }
.course-badge p { margin: 6px 0 0; font-size: 13px; line-height: 1.6; }
.course-badge__dates, .course-badge__id { color: var(--muted); }
.course-badge__dates > span { display: inline-block; }
.course-badge__dates > span[aria-hidden] { margin-inline: 0.35em; }
.course-badge__id { overflow-wrap: anywhere; }
.certificate-proof { display: inline-flex; align-items: center; gap: 8px; min-height: 40px; margin-top: 16px; border: 1px solid var(--cyan-dark); border-radius: 24px; padding: 8px 16px; color: var(--cyan-dark); font-size: 13px; font-weight: 600; }
.certificate-proof:hover { background: var(--cyan-pale); }
.academic-credentials { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.academic-credential { min-width: 0; padding: 0; border: 1px solid var(--line); background: var(--paper); text-align: left; cursor: pointer; }
.academic-credential > img { display: block; width: 100%; height: 205px; object-fit: cover; object-position: top; border-bottom: 1px solid var(--line); }
.academic-credential > span { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px; font-size: 13px; font-weight: 600; }
.academic-credential svg { flex-shrink: 0; color: var(--cyan-dark); }
.academic-credential:hover { border-color: var(--cyan-dark); }
.certificates-privacy { display: flex; align-items: center; gap: 8px; margin: 16px 0 0; color: var(--muted); font-size: 12px; line-height: 1.6; }
.certificates-privacy svg { flex-shrink: 0; color: var(--cyan-dark); }
.certificate-document { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 18px 0; border-bottom: 1px solid var(--line); }
.certificate-document:first-of-type { border-top: 1px solid var(--line); }
.certificate-document strong { display: block; font-size: 14px; font-weight: 600; }
.certificate-document small { display: block; margin-top: 6px; color: var(--muted); font-size: 12px; }
.certificate-document svg { flex-shrink: 0; color: var(--cyan-dark); }
.certificate-document:hover strong { color: var(--cyan-dark); }
.diploma-thesis { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0; padding: 0; margin-bottom: 24px; border: 1px solid var(--line); }
.diploma-thesis > img { grid-column: 1 / -1; display: block; width: 100%; height: 205px; object-fit: contain; background: white; border-bottom: 1px solid var(--line); }
.diploma-thesis > span { padding: 16px; }
.diploma-thesis > svg { margin-right: 16px; }
.diploma-thesis:hover { border-color: var(--cyan-dark); }
@media (max-width: 1120px) {
  .certificates-intro { padding-inline: 38px; }
  .certificates-content { padding-inline: 38px 24px; }
  .academic-credentials { gap: 16px; }
  .course-badges { gap: 16px; }
}
@media (max-width: 860px) {
  .certificates-page { display: block; padding-top: 76px; }
  .certificates-intro { padding: 72px 24px 48px; }
  .certificates-content { padding: 42px 24px 56px; background: var(--paper); }
}
@media (max-width: 560px) {
  .academic-credentials { grid-template-columns: minmax(0, 1fr); }
  .course-badges { grid-template-columns: minmax(0, 1fr); gap: 0; }
  .course-badge { grid-template-columns: 32px minmax(0, 1fr); gap: 16px; }
  .course-badge + .course-badge { padding-top: 26px; }
  .course-badge__image { width: 32px; height: 32px; }
}
</style>
