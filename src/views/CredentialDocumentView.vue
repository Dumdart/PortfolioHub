<script setup lang="ts">
import { computed } from "vue";
import { PhArrowLeft, PhLockKey } from "@phosphor-icons/vue";
import { RouterLink } from "vue-router";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import { credentials } from "../data/credentials";

const props = defineProps<{
  credentialId: string;
}>();

const credential = computed(() => credentials.find(item => item.id === props.credentialId));
</script>

<template>
  <main v-if="credential" class="credential-document-page">
    <SignalBackdrop variant="about" />

    <section class="credential-document-intro">
      <RouterLink class="credential-document-back" to="/certificates">
        <PhArrowLeft :size="18" aria-hidden="true" />
        Back to certificates
      </RouterLink>
      <h1>{{ credential.title }}</h1>
      <p class="credential-document-privacy">
        <PhLockKey :size="18" aria-hidden="true" />
        Public preview with personal identifiers redacted.
      </p>
    </section>

    <section class="credential-document-pages" :aria-label="`${credential.title} pages`">
      <figure v-for="(page, index) in credential.pages" :key="page.src">
        <img
          :src="page.src"
          :alt="page.alt"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />
        <figcaption>
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          {{ page.label }}
        </figcaption>
      </figure>
    </section>
  </main>
</template>

<style scoped>
.credential-document-page {
  position: relative;
  display: grid;
  grid-template-columns: 37% minmax(0, 1fr);
  min-height: 100vh;
  background: var(--ink);
}

.credential-document-intro,
.credential-document-pages {
  position: relative;
  z-index: 1;
}

.credential-document-intro {
  align-self: start;
  padding: 170px 58px 56px;
  color: var(--paper);
}

.credential-document-back {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 9px;
  margin-bottom: 32px;
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 12px;
}

.credential-document-back:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.credential-document-intro h1 {
  margin: 0;
  overflow-wrap: anywhere;
  font-size: clamp(38px, 3.2vw, 52px);
  font-weight: 750;
  letter-spacing: -0.052em;
  line-height: 1.1;
}

.credential-document-privacy {
  display: flex;
  max-width: 360px;
  align-items: flex-start;
  gap: 9px;
  margin: 24px 0 0;
  color: #c4cdd0;
  font-size: 13px;
  line-height: 1.65;
}

.credential-document-privacy svg {
  flex: 0 0 auto;
  margin-top: 2px;
  color: var(--cyan);
}

.credential-document-pages {
  display: grid;
  align-content: start;
  gap: 40px;
  min-width: 0;
  padding: 170px 58px 64px 64px;
  background: var(--paper);
}

.credential-document-pages figure {
  min-width: 0;
  margin: 0;
}

.credential-document-pages img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
  background: var(--paper);
}

.credential-document-pages figcaption {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-top: 12px;
  color: var(--muted);
  font-size: 13px;
}

.credential-document-pages figcaption span {
  color: var(--cyan-dark);
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 700;
}

@media (max-width: 1120px) {
  .credential-document-intro {
    padding-inline: 38px;
  }

  .credential-document-pages {
    padding-inline: 38px 24px;
  }
}

@media (max-width: 860px) {
  .credential-document-page {
    display: block;
    padding-top: var(--site-header-height);
  }

  .credential-document-intro {
    padding: 72px 24px 48px;
  }

  .credential-document-pages {
    gap: 32px;
    padding: 42px 24px 56px;
  }
}
</style>
