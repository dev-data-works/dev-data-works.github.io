// Proves the checks can fail: each fixture must be rejected by its check.
import { spawnSync } from 'node:child_process';

const cases = [
  { name: 'broken link and anchor', cmd: ['scripts/check-links.mjs', '--dir', 'scripts/fixtures/bad-anchor', '--no-legacy'] },
  { name: 'placeholder contact', cmd: ['scripts/check-content.mjs', '--dir', 'scripts/fixtures/placeholder', '--deploy', '--no-git'], env: { CONTENT_DENYLIST: 'unused-term' } },
  { name: 'denylisted term', cmd: ['scripts/check-content.mjs', '--dir', 'scripts/fixtures/denied', '--no-git'], env: { CONTENT_DENYLIST: 'fixture-denied-term' } },
  { name: 'missing denylist on deploy', cmd: ['scripts/check-content.mjs', '--dir', 'scripts/fixtures/denied', '--deploy', '--no-git'], env: { CONTENT_DENYLIST: '' } },
];

let failed = 0;
for (const c of cases) {
  const r = spawnSync(process.execPath, c.cmd, { env: { ...process.env, ...c.env }, encoding: 'utf8' });
  const ok = r.status !== 0;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${c.name} ${ok ? 'is rejected' : 'was NOT rejected'}`);
  if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
