import assert from "node:assert/strict";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";

const server = await createServer({
  root: fileURLToPath(new URL("..", import.meta.url)),
  server: { middlewareMode: true },
  appType: "custom",
});
after(() => server.close());
const { default: SignalBackdrop } = await server.ssrLoadModule("/src/components/SignalBackdrop.vue");
const render = props => renderToString(createSSRApp({ render: () => h(SignalBackdrop, props) }));

test("night-sky backdrop replaces the traveling canvas and preserves the shared boundary", async () => {
  const html = await render({ variant: "about", nightSky: true });
  assert.doesNotMatch(html, /<canvas/);
  assert.equal((html.match(/<i\b[^>]*\bsky-star\b/g) ?? []).length, 48);
  assert.equal((html.match(/<svg\b[^>]*\bsky-cloud\b/g) ?? []).length, 6);
  assert.match(html, /class="sky-moon"/);
  assert.match(html, /signal-backdrop__mask/);
  assert.match(html, /<path d="M0 0H520C574 130[^\"]*H0Z" fill="black"/);
  assert.match(html, /class="signal-backdrop__edge" d="M520 0C574 130[^\"]*590 1024"/);
  assert.doesNotMatch(html, /class="signal-backdrop__edge" d="M0 0H520/);
  assert.match(html, /aria-hidden="true"/);
  assert.doesNotMatch(html, /signal-backdrop__edge--echo/);
});

test("background pause reaches the shared sky without changing other backdrop consumers", async () => {
  const paused = await render({ variant: "about", nightSky: true, paused: true });
  assert.match(paused, /landing-sky is-paused/);
  const legacy = await render({ variant: "about" });
  assert.match(legacy, /<canvas/);
  assert.match(legacy, /signal-backdrop__edge--echo/);
  assert.match(legacy, /class="signal-backdrop__edge" d="M0 0H520C574 130[^\"]*H0Z"/);
  assert.doesNotMatch(legacy, /class="landing-sky/);
});
