import assert from "node:assert/strict";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { createRouter, createMemoryHistory } from "vue-router";

const server = await createServer({
  root: fileURLToPath(new URL("..", import.meta.url)),
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
after(() => server.close());
const { default: About } = await server.ssrLoadModule("/src/views/AboutView.vue");
const { default: Goals } = await server.ssrLoadModule("/src/views/GoalsView.vue");
const { default: Home } = await server.ssrLoadModule("/src/views/HomeView.vue");
const { default: Certificates } = await server.ssrLoadModule("/src/views/CertificateView.vue");

async function render(component, path = "/about") {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", name: "home", component: Home },
      { path: "/about", name: "about", component: About },
      { path: "/projects", name: "projects", component: { render: () => null } },
      { path: "/certificates", name: "certificates", component: Certificates },
      { path: "/certificates/:credentialId", name: "credential-document", component: { render: () => null } },
    ],
  });
  await router.push(path);
  await router.isReady();
  const app = createSSRApp({ render: () => h(component) });
  app.use(router);
  return renderToString(app);
}

test("About presents an undecided Informatik study plan and concrete internship availability", async () => {
  const html = await render(About);
  assert.match(html, /Autumn 2027 · planned/);
  assert.match(html, /Computer Science \(Informatik\)/);
  assert.doesNotMatch(html, /FH Hagenberg|part-time|Planned for September 2027/);
  assert.match(html, /Seeking a full-time software development internship from mid-April to August\/September 2027, preferably in Upper Austria, with a focus on backend and systems work\./);
});

test("About separates unfinished coursework from systems interests", async () => {
  const html = await render(About);
  assert.match(html, /CS50 Web<small[^>]*>in progress<\/small>/);
  assert.match(html, /Software architecture and distributed systems/);
  assert.doesNotMatch(html, /Go &amp; distributed systems|CS50.{0,80}(completed|certified)/);
});

test("About retains WKOÖ and renders all three bounded Nordfels responsibilities", async () => {
  const html = await render(About);
  assert.match(html, /WKOÖ · 2024<\/strong>Administrative work/);
  assert.match(html, /Nordfels GmbH · 2024/);
  for (const responsibility of [
    "Created manufacturing plans.",
    "Gained insight into mechatronic processes.",
    "Contributed frontend design for a new company wiki.",
  ]) assert.ok(html.includes(`>${responsibility}</li>`));
});

test("the dormant Goals roadmap consumes the same corrected study plan", async () => {
  const html = await render(Goals);
  assert.match(html, /Study Computer Science \(Informatik\)/);
  assert.match(html, /Autumn 2027 · planned/);
  assert.match(html, /mid-April to August\/September 2027/);
  assert.doesNotMatch(html, /part-time|FH Hagenberg/);
});

test("Home and Certificates do not present availability or unfinished coursework as credentials", async () => {
  for (const [component, path] of [[Home, "/"], [Certificates, "/certificates"]]) {
    assert.doesNotMatch(await render(component, path), /CS50|mid-April|Seeking a full-time/);
  }
  const html = await render(Certificates, "/certificates");
  assert.match(html, /Build with AI - Codex Pathway Completion/);
  assert.match(html, /Claude Code 101/);
});
