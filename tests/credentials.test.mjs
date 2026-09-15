import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/data/credentials.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const resolvedSource = outputText.replace(/from "([^"]+)"/g, (_, specifier) => `from "${import.meta.resolve(specifier)}"`);
const { courseBadges, credentials, diplomaThesis, supportingDocuments } = await import(`data:text/javascript;base64,${Buffer.from(resolvedSource).toString("base64")}`);

test("Codex pathway completion preserves the supplied credential evidence and proof link", () => {
  const badge = courseBadges.find(badge => badge.id === "codex-pathway-completion");
  assert.ok(badge);
  assert.equal(badge.title, "Build with AI - Codex Pathway Completion");
  assert.equal(badge.issuer, "OpenAI Academy");
  assert.equal(badge.issuedMonth, undefined);
  assert.equal(badge.expiryMonth, undefined);
  assert.equal(badge.credentialId, undefined);
  assert.equal(badge.proofUrl, "https://oaiacademy.credential.net/40b752c9-db77-4b1f-bfc1-fd9954b7af9c?key=7a8fc6fbe6688b662cc5be9caa3503433e88aa81f87d2d4bc537b9dc05b0d291#acc.YSv6TGEq");
});

test("Claude Code 101 preserves the supplied Academy badge link", () => {
  const badge = courseBadges.find(badge => badge.id === "claude-code-101");
  assert.ok(badge);
  assert.equal(badge.title, "Claude Code 101");
  assert.equal(badge.issuer, "Anthropic Academy");
  assert.equal(badge.proofUrl, "https://academy.claude.com/badges/55e1be07-2ff9-4f76-85f7-26b71d5a6a43");
});

test("course badges have unique IDs, usable visuals, HTTPS proof links, and month-only dates", async () => {
  assert.equal(new Set(courseBadges.map(badge => badge.id)).size, courseBadges.length);
  for (const badge of courseBadges) {
    assert.ok(badge.id && badge.title && badge.issuer);
    assert.equal(new URL(badge.proofUrl).protocol, "https:");
    for (const month of [badge.issuedMonth, badge.expiryMonth]) {
      if (month !== undefined) assert.match(month, /^\d{4}-(0[1-9]|1[0-2])$/);
    }
    if ("icon" in badge.visual) assert.ok(badge.visual.icon.body);
    else {
      assert.ok(badge.visual.alt);
      assert.match(badge.visual.src, /^\/assets\//);
      await access(new URL(`../public${badge.visual.src}`, import.meta.url));
    }
  }
});

test("featured diploma thesis retains its published metadata and leaves supporting documents", async () => {
  assert.deepEqual(diplomaThesis, {
    title: "Diploma thesis",
    detail: "English · PDF · 196 pages",
    href: "/documents/diploma-thesis.pdf",
    filename: "Paul-Thumfart-Diploma-Thesis.pdf",
    preview: {
      src: "/assets/diploma-thesis-first-page.png",
      alt: "Title area of the diploma thesis first page: School Association Management System",
      label: "Thesis title page",
    },
  });
  await access(new URL(`../public${diplomaThesis.href}`, import.meta.url));
  const preview = await readFile(new URL(`../public${diplomaThesis.preview.src}`, import.meta.url));
  assert.equal(preview.subarray(1, 4).toString(), "PNG");
  assert.equal(preview.readUInt32BE(16), 928);
  assert.equal(preview.readUInt32BE(20), 380);
  assert.ok(!supportingDocuments.some(document => document.href === diplomaThesis.href));
  assert.deepEqual(supportingDocuments.map(document => document.title), [
    "Certificate supplement",
    "Diploma certificate explanation",
  ]);
});

test("academic previews and supporting downloads retain their public files", async () => {
  assert.equal(credentials.length, 2);
  assert.equal(supportingDocuments.length, 2);
  assert.equal(new Set(credentials.map(credential => credential.id)).size, credentials.length);
  for (const credential of credentials) {
    assert.match(credential.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(credential.pages.length > 0);
    for (const page of credential.pages) {
      assert.ok(page.alt && page.label);
      await access(new URL(`../public${page.src}`, import.meta.url));
    }
  }
  for (const document of supportingDocuments) {
    assert.match(document.href, /^\/documents\/.+\.pdf$/);
    assert.match(document.filename, /\.pdf$/);
    await access(new URL(`../public${document.href}`, import.meta.url));
  }
});
