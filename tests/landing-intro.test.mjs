import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/composables/landingIntro.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const load = (suffix = "") => import(`data:text/javascript;base64,${Buffer.from(outputText + suffix).toString("base64")}`);
const { introEligible, introFrame, transitionIntro, ripplePath, INTRO_DURATION } = await load();

test("the intro sky never extends below visible ground", () => {
  for (let time = 0; time <= 3650; time += 25) {
    assert.equal(introFrame(time).skyGroundInset, 20);
  }
  assert.equal(introFrame(3650).terrain, 0);
  assert.ok(introFrame(4000).skyGroundInset > 0 && introFrame(4000).skyGroundInset < 20);
  assert.equal(introFrame(INTRO_DURATION).skyGroundInset, 0);
});

test("intro eligibility requires both usable dimensions and normal motion", () => {
  for (const [width, height] of [[1440,900], [1280,800], [1024,700]]) assert.equal(introEligible(width, height, false), true);
  for (const [width, height] of [[1023,700], [1024,699], [390,844], [844,390], [768,1024], [720,450]])
    assert.equal(introEligible(width, height, false), false);
  assert.equal(introEligible(1440,900,true), false);
});

test("only an explicit start/replay can run; terminal exits always complete", () => {
  assert.equal(transitionIntro("waiting", "start"), "running");
  assert.equal(transitionIntro("complete", "start"), "complete");
  assert.equal(transitionIntro("complete", "replay"), "running");
  for (const state of ["waiting", "running", "complete"]) {
    for (const event of ["skip", "bypass", "finish"]) assert.equal(transitionIntro(state, event), "complete");
  }
});

test("asset failure and reduced motion cannot be overridden by start or replay", () => {
  for (const [eligible, ready] of [[false,true], [true,false], [false,false]]) {
    assert.equal(transitionIntro("waiting", "start", eligible, ready), "complete");
    assert.equal(transitionIntro("complete", "replay", eligible, ready), "complete");
  }
});

test("name and portrait are readable before the jump and stay visible through arrival", () => {
  assert.ok(introFrame(500).name > 0);
  assert.equal(introFrame(500).portrait, 0);
  for (const time of [1300, 2100, 2550, 2680, 3150, 3650, 3950, 4400]) {
    assert.equal(introFrame(time).name, 1);
    assert.equal(introFrame(time).portrait, 1);
  }
  assert.equal(introFrame(3150).arrival, 0);
  assert.equal(introFrame(3950).arrival, 1);
});

test("P contact holds before the ripple opens; foreground controls do not wait for completion", () => {
  assert.equal(introFrame(2549).contact, false);
  assert.equal(introFrame(2550).contact, true);
  assert.equal(introFrame(2679).opening, 0);
  assert.ok(introFrame(2800).opening > 0);
  assert.equal(introFrame(3650).unfold, 1);
  assert.equal(introFrame(3650).terrain, 0);
  assert.equal(introFrame(3650).navigation, true);
  assert.ok(introFrame(3900).action > 0);
  assert.ok(introFrame(4000).social > 0);
  assert.equal(introFrame(4000).complete, false);
  assert.equal(introFrame(INTRO_DURATION).complete, true);
});

test("a handled tab session survives a fresh controller without persistent storage", async () => {
  const module = await load("// session test");
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const first = module.introSession(storage);
  assert.equal(first.handled(), false);
  first.mark();
  assert.equal(module.introSession(storage).handled(), true);
  assert.deepEqual([...values], [[module.INTRO_SESSION_KEY, "1"]]);
  const freshModule = await load("// reloaded tab");
  assert.equal(freshModule.introSession(storage).handled(), true);
  const freshTab = await load("// separate tab");
  assert.equal(freshTab.introSession({ getItem: () => null, setItem: () => {} }).handled(), false);
});

test("blocked reads bypass and blocked writes cannot trap access or break route returns", async () => {
  const module = await load("// blocked storage");
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.equal(module.introSession(storage).handled(), true);
  assert.equal(module.introSession(undefined).handled(), true);
  assert.doesNotThrow(() => module.introSession(storage).mark());
  assert.equal(module.introSession(storage).handled(), true);
});

test("the contact ring resolves to the same divider regardless of contact origin", () => {
  const start = ripplePath(600,350,2,1024,700,0);
  assert.ok(start.startsWith("M600,348 C"));
  assert.equal(ripplePath(600,350,800,1024,700,1), ripplePath(900,450,1000,1024,700,1));
  assert.doesNotMatch(ripplePath(600,350,800,1024,700,.5), /NaN|Infinity/);
});
