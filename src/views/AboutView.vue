<script setup lang="ts">
import { nextTick, ref } from "vue";
import {
  PhDownloadSimple,
  PhLockKey,
} from "@phosphor-icons/vue";
import CredentialViewer from "../components/CredentialViewer.vue";
import SignalBackdrop from "../components/SignalBackdrop.vue";
import SocialLinks from "../components/SocialLinks.vue";
import {
  credentials,
  supportingDocuments,
  type Credential,
} from "../data/credentials";

const activeCredential = ref<Credential | null>(null);
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
  <main class="about-page">
    <SignalBackdrop variant="about" />

    <section class="about-intro">
      <h1>Grounded in practice,<br />still moving forward.</h1>
      <p>
        HTL Business Informatics graduate with hands-on work across full-stack
        development, cloud systems, SQL-backed products, automation, and practical AI.
      </p>
      <img src="/assets/paul-thumfart.jpg" alt="Portrait of Paul Thumfart" />

      <SocialLinks :order="['email', 'linkedin', 'github']" />
    </section>

    <section class="about-timeline" aria-label="Education, experience, and interests">
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Education</h2>
          <p>HTL Neufelden · Business Informatics · Graduated June 2026</p>
        </div>
      </article>
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Diploma project</h2>
          <p>NOVA · School Association Management System · Sehr gut</p>
        </div>
      </article>
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Experience</h2>
          <p>WKOÖ · Internship · 2024</p>
          <p>Nordfels GmbH · Internship · 2024</p>
        </div>
      </article>
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Outside software</h2>
          <p>Cooking · Music association · Chess · Sport</p>
        </div>
      </article>
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
