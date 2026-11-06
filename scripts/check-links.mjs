// Checks that every internal link and #anchor in the built site resolves,
// and that the legacy anchors proposals may link to still exist.
// Usage: node scripts/check-links.mjs [--dir dist] [--no-legacy]
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const args = process.argv.slice(2);
const dir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'dist';
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

/** Anchors that must keep working (design Goal 9). */
const LEGACY = [
  '/#approach',
  '/#expertise',
  ...['software', 'data-platforms', 'analytics', 'gis', 'ai', 'advisory'].map((s) => `/expertise#${s}`),
  ...['agriculture', 'wash', 'health', 'climate', 'education', 'governance'].map((s) => `/sectors#${s}`),
];

const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const pages = walk(dir).filter((f) => f.endsWith('.html'));
const idsCache = new Map();
const idsOf = (file) => {
  if (!idsCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
};
const fileFor = (path) => {
  const rel = path.slice(base.length);
  const candidates = rel === '' ? ['index.html'] : rel.endsWith('/') ? [rel + 'index.html'] : [rel, rel + '/index.html', rel + '.html'];
  return candidates.map((c) => join(dir, c)).find((c) => existsSync(c) && statSync(c).isFile());
};

const errors = [];
const check = (href, from) => {
  const [path, frag] = href.split('#');
  const target = path === '' ? from : fileFor(decodeURI(path));
  if (!target) return errors.push(`${relative(dir, from)}: broken link ${href}`);
  if (frag && target.endsWith('.html') && !idsOf(target).has(decodeURIComponent(frag)))
    errors.push(`${relative(dir, from)}: missing anchor ${href}`);
};

for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(href)) continue;
    if (href.startsWith('#') || href.startsWith(base)) check(href.replace(/&amp;/g, '&'), page);
  }
}
if (!args.includes('--no-legacy')) {
  for (const l of LEGACY) check(base + l.slice(1), join(dir, 'index.html'));
}

if (errors.length) {
  console.error(`check-links: ${errors.length} problem(s)\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`check-links: ${pages.length} pages OK (base ${base})`);
