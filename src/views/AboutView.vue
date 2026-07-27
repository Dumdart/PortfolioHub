<script setup lang="ts">
import { ref } from "vue";
import {
  PhEnvelopeSimple,
  PhGithubLogo,
  PhLinkedinLogo,
  PhLockKey,
  PhX,
} from "@phosphor-icons/vue";

interface Credential {
  title: string;
  src: string;
  alt: string;
}

const credentials: Credential[] = [
  {
    title: "Matura & Diploma",
    src: "/assets/diploma-redacted.png",
    alt: "Redacted preview of Paul Thumfart's Matura and diploma certificate",
  },
  {
    title: "School report 2025/26",
    src: "/assets/school-report-redacted.png",
    alt: "Redacted preview of Paul Thumfart's 2025/26 school report",
  },
];

const dialog = ref<HTMLDialogElement | null>(null);
const activeCredential = ref<Credential>(credentials[0]);

const openCredential = (credential: Credential) => {
  activeCredential.value = credential;
  dialog.value?.showModal();
};
</script>

<template>
  <main class="about-page">
    <svg
      class="organic-backdrop organic-backdrop--about"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 0H520C574 130 468 196 522 312C574 426 456 510 510 622C570 746 452 846 590 1024H0Z" />
    </svg>

    <section class="about-intro">
      <h1>Grounded in practice,<br />still moving forward.</h1>
      <p>
        HTL Business Informatics graduate with hands-on work across full-stack
        development, cloud systems, SQL-backed products, automation, and practical AI.
      </p>
      <img src="/assets/paul-thumfart.jpg" alt="Portrait of Paul Thumfart" />

      <div class="contact-links" aria-label="Contact Paul">
        <a href="mailto:paul.thumfart@gmail.com">
          <PhEnvelopeSimple :size="21" aria-hidden="true" />Email
        </a>
        <a href="https://linkedin.com/in/paul-thumfart-74b7543b8" target="_blank" rel="noreferrer">
          <PhLinkedinLogo :size="21" aria-hidden="true" />LinkedIn
        </a>
        <a href="https://github.com/Dumdart" target="_blank" rel="noreferrer">
          <PhGithubLogo :size="21" aria-hidden="true" />GitHub
        </a>
      </div>
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
        type="button"
        @click="openCredential(credential)"
      >
        <span>{{ credential.title }}</span>
        <img :src="credential.src" :alt="credential.alt" />
      </button>
      <p><PhLockKey :size="20" aria-hidden="true" />Public previews redact personal identifiers.</p>
    </aside>

    <dialog ref="dialog" class="credential-dialog" @click.self="dialog?.close()">
      <button class="credential-dialog__close" type="button" aria-label="Close credential preview" @click="dialog?.close()">
        <PhX :size="24" aria-hidden="true" />
      </button>
      <h2>{{ activeCredential.title }}</h2>
      <img :src="activeCredential.src" :alt="activeCredential.alt" />
    </dialog>
  </main>
</template>
