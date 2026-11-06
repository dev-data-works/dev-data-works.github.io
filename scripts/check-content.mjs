// Content safety checks.
// 1. Denylist: no listed term (employer, client, product or personal names) may
//    appear in the built site or in any tracked file. Terms come from the
//    CONTENT_DENYLIST env var (one per line) or the gitignored .content-denylist.
//    The list is never committed: a committed list would publish the names.
// 2. With --deploy: the build must not contain the placeholder contact marker,
//    and a missing denylist is an error instead of a warning.
// Usage: node scripts/check-content.mjs [--dir dist] [--deploy] [--no-git]
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const dir = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'dist';
const deploy = args.includes('--deploy');
const TEXT = new Set(['.html', '.css', '.js', '.mjs', '.ts', '.astro', '.json', '.md', '.txt', '.xml', '.svg', '.yml', '.yaml', '.webmanifest', '']);

const raw = process.env.CONTENT_DENYLIST ?? (existsSync('.content-denylist') ? readFileSync('.content-denylist', 'utf8') : '');
const terms = raw
  .split('\n')
  .map((t) => t.trim().toLowerCase())
  .filter((t) => t && !t.startsWith('#'));

const errors = [];
const walk = (d) =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const scan = (label, text) => {
  const lower = text.toLowerCase();
  for (const t of terms) if (lower.includes(t)) errors.push(`${label}: contains a denylisted term (#${terms.indexOf(t) + 1})`);
};

const built = walk(dir).filter((f) => TEXT.has(extname(f)));
for (const f of built) {
  const text = readFileSync(f, 'utf8');
  scan(f, f + '\n' + text);
  if (deploy && text.includes('data-contact-placeholder'))
    errors.push(`${f}: contact email is still a placeholder (set contact.emailIsPlaceholder = false in src/config/site.ts)`);
}

if (!args.includes('--no-git')) {
  const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  for (const f of files) {
    // Lockfiles hold only package names and base64 hashes, which produce false matches.
    if (!TEXT.has(extname(f)) || !existsSync(f) || f.endsWith('package-lock.json')) continue;
    scan(f, f + '\n' + readFileSync(f, 'utf8'));
  }
}

if (terms.length === 0) {
  const msg = 'check-content: no denylist found (CONTENT_DENYLIST or .content-denylist)';
  if (deploy) errors.push(msg);
  else console.warn(`${msg}; denylist scan skipped`);
}

if (errors.length) {
  // Terms are reported by number only, so CI logs never print them.
  console.error(`check-content: ${errors.length} problem(s)\n  ` + [...new Set(errors)].join('\n  '));
  process.exit(1);
}
console.log(`check-content: OK (${terms.length} denylist terms, ${built.length} built files${deploy ? ', deploy mode' : ''})`);
