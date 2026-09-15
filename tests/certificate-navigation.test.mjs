import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const certificateView = await readFile(new URL("../src/views/CertificateView.vue", import.meta.url), "utf8");
const documentView = await readFile(new URL("../src/views/CredentialDocumentView.vue", import.meta.url), "utf8");
const router = await readFile(new URL("../src/router.ts", import.meta.url), "utf8");
const siteHeader = await readFile(new URL("../src/components/SiteHeader.vue", import.meta.url), "utf8");

test("certificate sections present academic credentials before course badges and supporting documents", () => {
  const academicPosition = certificateView.indexOf('aria-labelledby="academic-credentials-title"');
  const coursePosition = certificateView.indexOf('aria-labelledby="course-badges-title"');
  const supportingPosition = certificateView.indexOf('aria-labelledby="supporting-documents-title"');

  assert.ok(academicPosition >= 0);
  assert.ok(coursePosition > academicPosition);
  assert.ok(supportingPosition > coursePosition);
  assert.match(certificateView, /<h2 id="course-badges-title">Course &amp; badges<\/h2>/);
});

test("course badges share a two-column row with a single-column mobile fallback", () => {
  assert.match(certificateView, /<div class="course-badges">\s*<article v-for="badge in courseBadges"/);
  assert.match(certificateView, /\.course-badges \{[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(certificateView, /@media \(max-width: 560px\)[\s\S]*\.course-badges \{ grid-template-columns: minmax\(0, 1fr\)/);
});

test("diploma thesis download leads the academic section before certificate previews", () => {
  const academicSection = certificateView.match(/<section aria-labelledby="academic-credentials-title">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(academicSection);
  assert.match(academicSection, /<img[^>]*:src="diplomaThesis.preview.src"[^>]*:alt="diplomaThesis.preview.alt"[^>]*loading="lazy"/);
  assert.match(academicSection, /<h2[^>]*>Academic credentials<\/h2>\s*<a[^>]*:href="diplomaThesis.href"[^>]*:download="diplomaThesis.filename"/);
  assert.match(academicSection, /\{\{ diplomaThesis.title \}\}[\s\S]*\{\{ diplomaThesis.detail \}\}[\s\S]*<PhDownloadSimple[\s\S]*<div class="academic-credentials">/);
  assert.match(academicSection, /<\/div>\s*<p class="certificates-privacy">/);
});

test("academic credential cards open bookmarkable document routes in a new tab", () => {
  assert.match(certificateView, /<RouterLink[\s\S]*v-for="credential in credentials"[\s\S]*name: 'credential-document'/);
  assert.match(certificateView, /params: \{ credentialId: credential\.id \}/);
  assert.match(certificateView, /target="_blank"/);
  assert.match(certificateView, /rel="noopener noreferrer"/);
  assert.match(certificateView, /Open \$\{credential\.title\} in a new tab/);
  assert.doesNotMatch(certificateView, /CredentialViewer|openCredential|activeCredential/);
});

test("credential document routes retain the Certificates header and reject stale IDs", () => {
  assert.match(router, /path: "\/certificates",[\s\S]*children:/);
  assert.match(router, /path: ":credentialId"/);
  assert.match(router, /name: "credential-document"/);
  assert.match(router, /props: true/);
  assert.match(router, /meta: \{ headerVariant: "certificates" \}/);
  assert.match(router, /credentials\.some\(credential => credential\.id === to\.params\.credentialId\)/);
  assert.match(router, /: \{ name: "certificates" \}/);
  assert.match(siteHeader, /route\.meta\.headerVariant \?\? route\.name/);
});

test("credential document view renders every redacted page in source order", () => {
  assert.match(documentView, /credentials\.find\(item => item\.id === props\.credentialId\)/);
  assert.match(documentView, /v-for="\(page, index\) in credential\.pages"/);
  assert.match(documentView, /:src="page\.src"/);
  assert.match(documentView, /:alt="page\.alt"/);
  assert.match(documentView, /\{\{ page\.label \}\}/);
  assert.match(documentView, /Public preview with personal identifiers redacted\./);
  assert.doesNotMatch(documentView, /<dialog|showModal\(/);
});
