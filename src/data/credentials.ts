export interface CredentialPage {
  src: string;
  alt: string;
  label: string;
}

export interface Credential {
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
