import openaiIcon from "@iconify-icons/simple-icons/openai";
import claudeIcon from "@iconify-icons/simple-icons/claude";
import type { IconifyIcon } from "@iconify/vue";

export interface CourseBadge {
  id: string;
  title: string;
  issuer: string;
  visual: { icon: IconifyIcon } | { src: string; alt: string };
  issuedMonth?: string;
  expiryMonth?: string;
  credentialId?: string;
  proofUrl: string;
}

export const courseBadges: CourseBadge[] = [
  {
    id: "codex-pathway-completion",
    title: "Build with AI - Codex Pathway Completion",
    issuer: "OpenAI Academy",
    visual: { icon: openaiIcon },
    proofUrl: "https://oaiacademy.credential.net/40b752c9-db77-4b1f-bfc1-fd9954b7af9c?key=7a8fc6fbe6688b662cc5be9caa3503433e88aa81f87d2d4bc537b9dc05b0d291#acc.YSv6TGEq",
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic Academy",
    visual: { icon: claudeIcon },
    proofUrl: "https://academy.claude.com/badges/55e1be07-2ff9-4f76-85f7-26b71d5a6a43",
  },
];

export interface CredentialPage {
  src: string;
  alt: string;
  label: string;
}

export interface Credential {
  id: string;
  title: string;
  pages: CredentialPage[];
}

export interface SupportingDocument {
  title: string;
  detail: string;
  href: string;
  filename: string;
}

export const credentials: Credential[] = [
  {
    id: "matura-diploma",
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
    id: "school-report-2025-26",
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

export const diplomaThesis: SupportingDocument & { preview: CredentialPage } = {
  title: "Diploma thesis",
  detail: "English · PDF · 196 pages",
  href: "/documents/diploma-thesis.pdf",
  filename: "Paul-Thumfart-Diploma-Thesis.pdf",
  preview: {
    src: "/assets/diploma-thesis-first-page.png",
    alt: "Title area of the diploma thesis first page: School Association Management System",
    label: "Thesis title page",
  },
};

export const supportingDocuments: SupportingDocument[] = [
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
