import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sharedStyles = await readFile(new URL("../src/styles.css", import.meta.url), "utf8");
const projectStyles = await readFile(new URL("../src/project-case-study.css", import.meta.url), "utf8");

test("inner pages retain the shared responsive header geometry", () => {
  assert.match(sharedStyles, /--site-header-height:\s*100px/);
  assert.match(sharedStyles, /@media\s*\(max-width:\s*860px\)[\s\S]*--site-header-height:\s*76px/);
  assert.match(sharedStyles, /\.site-header\s*{[\s\S]*?height:\s*var\(--site-header-height\)/);
  assert.match(projectStyles, /\.case-page\s*{[\s\S]*?padding-top:\s*var\(--site-header-height\)/);

  const projectHeaderRules = [...projectStyles.matchAll(/\.site-header\.header--projects\s*{([^}]*)}/g)];
  for (const [, declarations] of projectHeaderRules) {
    assert.doesNotMatch(declarations, /\bheight\s*:/);
    assert.doesNotMatch(declarations, /\bpadding(?:-inline)?\s*:/);
    assert.doesNotMatch(declarations, /border-bottom\s*:\s*[^0]/);
  }
});


test("Projects preserves the shared active navigation underline", () => {
  assert.match(sharedStyles, /\.primary-nav a\.router-link-active::after\s*{[^}]*transform:\s*scaleX\(1\)/);
  assert.doesNotMatch(projectStyles, /\.header--projects[^{}]*::after\s*{[^}]*(?:display:\s*none|transform:\s*scaleX\(0\))/);
});

test("Projects presents the page heading and full-page inner backdrop before project details", async () => {
  const view = await readFile(new URL("../src/views/ProjectsView.vue", import.meta.url), "utf8");
  assert.match(view, /<SignalBackdrop variant="about"\s*\/>/);
  assert.match(view, /<h1>Projects<\/h1>/);
  assert.match(view, /<h2>{{ selectedProject.name }}<\/h2>/);
  assert.doesNotMatch(view, /case-field|viewBox=/);
});
