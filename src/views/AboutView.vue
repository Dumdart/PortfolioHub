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
      <h1>Backend-focused, practical by default.</h1>
      <p>
          My focus is backend development around APIs, data and tools, with enough DevOps knowledge to take systems from code to deployment.
      </p>

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
          <h2>Engineering focus</h2>
          <p>
              Backend development · APIs · Data · Developer tooling <br>
                  C# / ASP.NET Core · Python · Go · PostgreSQL · Docker
          </p>
        </div>
      </article>
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Selected experience</h2>
          <p>TopicGate: Published Python/MQTT developer tool</p>
          <p>NOVA: Production-used school association operations system · Diploma project</p>
          <p>WKOÖ: Administrative internship · 2024</p>
          <p>Nordfels GmbH: Manufacturing / technical planning internship · 2024</p>
        </div>
      </article>
      <article>
        <i aria-hidden="true"></i>
        <div>
          <h2>Outside software</h2>
          <p>Chinese · French horn / music association · strength training · cooking · chess</p>
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
