import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";
const { projects, resolveProjectId, nextProjectId, projectViews } = await import(await loadTypeScript(new URL("../src/data/projects.ts", import.meta.url)));

test("missing, malformed, and removed project queries return the flagship", () => {
  for (const query of [undefined, null, "", "missing", ["nova"], { project: "nova" }]) {
    assert.equal(resolveProjectId(query), "topicgate");
  }
  for (const project of projects) assert.equal(resolveProjectId(project.id), project.id);
});

test("next project follows the featured-first rail order and wraps around", () => {
  const order = ["topicgate", "nova", "clipstack", "smart-home-bridge", "homelab", "serverless-portfolio", "portfolio-hub"];
  assert.deepEqual(projects.map(project => project.id), order);
  order.forEach((id, index) => assert.equal(nextProjectId(id), order[(index + 1) % order.length]));
});

test("all project media and local supporting links exist", async () => {
  for (const project of projects) {
    for (const media of project.media ?? []) {
      await access(new URL(`../public${media.src}`, import.meta.url));
    }
    if (project.documentation?.href.startsWith("/")) {
      await access(new URL(`../public${project.documentation.href}`, import.meta.url));
    }
  }
});

test("ClipStack distinguishes the completed private prototype from future development", () => {
  const clipstack = projects.find(project => project.id === "clipstack");
  assert.equal(clipstack.status, "Prototype complete · Awaiting barbershop approval");
  assert.equal(clipstack.architecture.planned, undefined);
  assert.ok(clipstack.technologies.includes("ASP.NET Core"));
  assert.ok(!clipstack.technologies.includes("Azure Functions"));
  assert.match(clipstack.contribution, /built most of the prototype.*onboarded a teammate/);
  assert.equal(clipstack.repository, undefined);
  assert.equal(projects.find(project => project.id === "smart-home-bridge").media[0].title, "Door control");
});

test("visual tabs expose actual product images and architecture without empty panels", () => {
  for (const project of projects) {
    const expected = ["topicgate", "nova", "clipstack", "smart-home-bridge"].includes(project.id)
      ? ["product", "architecture"]
      : ["architecture"];
    assert.deepEqual(projectViews(project), expected, project.id);
  }
  assert.deepEqual(projectViews({ media: [] }), []);
  assert.deepEqual(projectViews({ media: [{ src: "product.png" }] }), ["product"]);
  assert.deepEqual(projectViews({ media: [{ kind: "architecture" }] }), ["architecture"]);
});

test("serverless portfolio describes the backend-mediated Gemini analysis", () => {
  const project = projects.find(project => project.id === "serverless-portfolio");
  const aiBoundary = project.decisions.find(decision => decision.title.includes("Gemini"));

  assert.match(project.summary, /Gemini-powered analysis/);
  assert.match(project.purpose, /portfolio statistics and analyze uploaded document text/);
  assert.match(aiBoundary.reason, /only the backend reads the Gemini API key/);
  assert.ok(project.technologies.includes("Gemini API"));
});


const { validateProjects } = await import(await loadTypeScript(new URL('../src/data/projectValidation.ts', import.meta.url)));
const order = projects.map(p => p.id);
test('JSON validator reports project and field for malformed authored content', () => {
  for (const [mutate, expected] of [
    [p => p.coreStory = [], /topicgate.coreStory/],
    [p => p.primaryMedia = 900, /topicgate.primaryMedia/],
    [p => p.links[0].url = 'javascript:alert(1)', /topicgate.links\[0\].url/],
    [p => p.advancedBlocks[0].type = 'script', /topicgate.advancedBlocks\[0\].type/],
    [p => p.advancedBlocks[1].id = p.advancedBlocks[0].id, /topicgate.advancedBlocks\[1\].id/],
    [p => p.media[0].alt = '', /topicgate.media\[0\].alt/],
    [p => p.architecture.planned = 'yes', /topicgate.architecture.planned/],
  ]) {
    const documents = structuredClone(projects); mutate(documents[0]);
    assert.throws(() => validateProjects(order, documents), expected);
  }
  assert.throws(() => validateProjects([...order, order[0]], projects), /duplicate IDs/);
  assert.throws(() => validateProjects(order, projects.slice(1)), /topicgate document is missing/);
});
test('optional blocks and assets can be omitted without losing a valid core story', () => {
  const documents = structuredClone(projects);
  const p = documents[0]; p.advancedBlocks = []; p.links = [];
  delete p.icon; delete p.primaryMedia; delete p.media; delete p.architecture;
  assert.equal(validateProjects(order, documents)[0].advancedBlocks.length, 0);
});
test('restored repositories and approved thesis survive the JSON boundary', () => {
  for (const [id, url] of Object.entries({topicgate:'https://github.com/Dumdart/TopicGate', 'smart-home-bridge':'https://github.com/Dumdart/SmartHomeBridge', 'serverless-portfolio':'https://github.com/Dumdart/CCDEProject-SSPH'})) {
    assert.ok(projects.find(p=>p.id===id).links.some(l=>l.url===url));
  }
  assert.ok(projects.find(p=>p.id==='nova').links.some(l=>l.url==='/documents/diploma-thesis.pdf'));
  assert.match(projects[0].icon.src, /raw.githubusercontent.com\/Dumdart\/TopicGate\/master\/src\/topicgate\/assets\/icon.png$/);
});
test('core stories identify team role and archived experiments honestly', () => {
  assert.match(projects.find(p=>p.id==='nova').coreStory.join(' '), /team.*backend developer/);
  assert.match(projects.find(p=>p.id==='smart-home-bridge').coreStory.join(' '), /false positives.*archive/);
  assert.match(projects.find(p=>p.id==='clipstack').coreStory.join(' '), /approval/);
});
