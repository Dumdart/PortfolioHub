import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/data/projects.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { projects, resolveProjectId, nextProjectId, projectViews } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

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

test("in-development architecture is explicitly marked as planned", () => {
  const clipstack = projects.find(project => project.id === "clipstack");
  assert.equal(clipstack.status, "In development");
  assert.equal(clipstack.architecture.planned, true);
  assert.equal(projects.find(project => project.id === "smart-home-bridge").media[0].title, "Door control");
});

test("visual tabs expose actual product images and architecture without empty panels", () => {
  for (const project of projects) {
    const expected = ["topicgate", "nova", "smart-home-bridge"].includes(project.id)
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
