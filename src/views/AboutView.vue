<script setup lang="ts">
import { ref } from "vue";
import {
  PhDownloadSimple,
  PhEnvelopeSimple,
  PhGithubLogo,
  PhLinkedinLogo,
  PhLockKey,
  PhX,
} from "@phosphor-icons/vue";

interface Credential {
  title: string;
  pages: {
    src: string;
    alt: string;
    label: string;
  }[];
}

const credentials: Credential[] = [
  {
    title: "Matura & Diploma",
    pages: [
      {
        src: "/assets/diploma-redacted.png",
        alt: "Redacted first page of Paul Thumfart's Matura and diploma certificate",
        label: "Certificate",
      },
      {
        src: "/assets/diploma-redacted-page-2.png",
        alt: "Redacted examination results from Paul Thumfart's Matura and diploma certificate",
        label: "Examination results",
      },
      {
        src: "/assets/diploma-redacted-page-3.png",
        alt: "Curriculum and hours table from Paul Thumfart's Matura and diploma certificate",
        label: "Curriculum",
      },
    ],
  },
  {
    title: "School report 2025/26",
    pages: [
      {
        src: "/assets/school-report-redacted.png",
        alt: "Redacted preview of Paul Thumfart's final 2025/26 school report",
        label: "Final annual report",
      },
    ],
  },
];

const supportingDocuments = [
  {
    title: "Certificate supplement",
    detail: "English · PDF · 2 pages",
    href: "/documents/certificate-supplement.pdf",
    filename: "Paul-Thumfart-Certificate-Supplement.pdf",
  },
  {
    title: "Diploma certificate explanation",
    detail: "German · PDF · 2 pages",
    href: "/documents/diploma-certificate-explanation-de.pdf",
    filename: "Paul-Thumfart-Zeugniserlaeuterung.pdf",
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

    <dialog ref="dialog" class="credential-dialog" @click.self="dialog?.close()">
      <button class="credential-dialog__close" type="button" aria-label="Close credential preview" @click="dialog?.close()">
        <PhX :size="24" aria-hidden="true" />
      </button>
      <h2>{{ activeCredential.title }}</h2>
      <div class="credential-dialog__pages">
        <figure v-for="(page, index) in activeCredential.pages" :key="page.src">
          <figcaption>{{ index + 1 }} / {{ activeCredential.pages.length }} · {{ page.label }}</figcaption>
          <img :src="page.src" :alt="page.alt" />
        </figure>
      </div>
    </dialog>
  </main>
</template>
