import type { Project } from "./projectTypes";

/** Validate authored JSON at the shared boundary, before any view consumes it. */
export function validateProjects(order: unknown, documents: unknown[]): Project[] {
  const fail = (path: string): never => { throw new Error(`Project data: ${path}`); };
  const object = (value: unknown, path: string): Record<string, unknown> => {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(`${path} must be an object`);
    return value as Record<string, unknown>;
  };
  const text = (value: unknown, path: string) => {
    if (typeof value !== "string" || !value.trim()) fail(`${path} must be nonempty text`);
  };
  const texts = (value: unknown, path: string) => {
    if (!Array.isArray(value) || !value.length) fail(`${path} must be a nonempty list`);
    (value as unknown[]).forEach((item, i) => text(item, `${path}[${i}]`));
  };
  const url = (value: unknown, path: string, localOnly = false) => {
    text(value, path);
    if (!/^(\/assets\/|\/documents\/)/.test(value as string) &&
        (localOnly || !/^https:\/\/[^\s]+$/.test(value as string))) fail(`${path} must be an approved local path or HTTPS URL`);
    if ((value as string).includes("..")) fail(`${path} cannot traverse directories`);
    if ((value as string).startsWith("https:")) {
      try {
        const parsed = new URL(value as string);
        if (!parsed.hostname || parsed.username || parsed.password) fail(`${path} must be a public URL without credentials`);
      } catch { fail(`${path} is not a valid public URL`); }
    }
  };
  const architecture = (value: unknown, path: string) => {
    const a = object(value, path);
    text(a.source, `${path}.source`); text(a.description, `${path}.description`);
    if (a.planned !== undefined && typeof a.planned !== "boolean") fail(`${path}.planned must be boolean`);
  };
  const media = (value: unknown, path: string) => {
    if (!Array.isArray(value) || !value.length) fail(`${path} must contain media`);
    (value as unknown[]).forEach((item, i) => {
      const m = object(item, `${path}[${i}]`);
      url(m.src, `${path}[${i}].src`, true); text(m.alt, `${path}[${i}].alt`); text(m.title, `${path}[${i}].title`);
      for (const [key, allowed] of Object.entries({fit: ["contain", "cover"], surface: ["light", "dark"], kind: ["product", "architecture"]})) {
        if (m[key] !== undefined && !allowed.includes(m[key] as string)) fail(`${path}[${i}].${key} is unsupported`);
      }
    });
  };
  texts(order, "index");
  const ids = order as string[];
  if (new Set(ids).size !== ids.length) fail("index contains duplicate IDs");
  const found = new Map<string, Project>();
  for (const document of documents) {
    const p = object(document, "document");
    text(p.id, "id"); const id = p.id as string;
    if (!ids.includes(id) || found.has(id)) fail(`${id}.id is unknown or duplicated`);
    for (const key of ["name", "summary", "status", "purpose", "roleSummary", "result", "contribution", "lesson"]) text(p[key], `${id}.${key}`);
    for (const key of ["coreStory", "technologies", "leftNodes", "rightNodes"]) texts(p[key], `${id}.${key}`);
    if (!Array.isArray(p.decisions)) fail(`${id}.decisions must be a list`);
    (p.decisions as unknown[]).forEach((value, i) => { const d = object(value, `${id}.decisions[${i}]`); text(d.title, `${id}.decisions[${i}].title`); text(d.reason, `${id}.decisions[${i}].reason`); });
    if (p.media !== undefined) media(p.media, `${id}.media`);
    if (p.architecture !== undefined) architecture(p.architecture, `${id}.architecture`);
    if (p.primaryMedia !== undefined && (!Number.isInteger(p.primaryMedia) || (p.primaryMedia as number) < 0 || !Array.isArray(p.media) || (p.primaryMedia as number) >= p.media.length)) fail(`${id}.primaryMedia references missing media`);
    if (p.icon !== undefined) { const icon = object(p.icon, `${id}.icon`); url(icon.src, `${id}.icon.src`); }
    if (p.repository !== undefined) url(p.repository, `${id}.repository`);
    if (p.documentation !== undefined) {
      const d = object(p.documentation, `${id}.documentation`);
      url(d.href, `${id}.documentation.href`); text(d.label, `${id}.documentation.label`);
    }
    if (!Array.isArray(p.links)) fail(`${id}.links must be a list`);
    (p.links as unknown[]).forEach((value, i) => {
      const l = object(value, `${id}.links[${i}]`);
      if (!["repository", "document", "package", "site"].includes(l.kind as string)) fail(`${id}.links[${i}].kind is unsupported`);
      text(l.label, `${id}.links[${i}].label`); url(l.url, `${id}.links[${i}].url`);
    });
    if (!Array.isArray(p.advancedBlocks)) fail(`${id}.advancedBlocks must be a list`);
    const blocks = new Set();
    (p.advancedBlocks as unknown[]).forEach((value, i) => {
      const path = `${id}.advancedBlocks[${i}]`; const b = object(value, path);
      text(b.id, `${path}.id`); text(b.heading, `${path}.heading`);
      if (blocks.has(b.id)) fail(`${path}.id is duplicated`); blocks.add(b.id);
      switch (b.type) {
        case "text": texts(b.paragraphs, `${path}.paragraphs`); break;
        case "decision": text(b.reason, `${path}.reason`); break;
        case "list": texts(b.items, `${path}.items`); break;
        case "media": media(b.media, `${path}.media`); break;
        case "architecture": architecture(b.architecture, `${path}.architecture`); break;
        default: fail(`${path}.type is unsupported`);
      }
    });
    found.set(id, p as unknown as Project);
  }
  return ids.map(id => found.get(id) ?? fail(`${id} document is missing`));
}
