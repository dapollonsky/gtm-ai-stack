#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'data', 'entries');

const CONCURRENCY = 8;
const TIMEOUT_MS = 20000;
const UA = 'gtm-ai-stack-linkcheck/0.1 (+https://github.com/dapollonsky/gtm-ai-stack)';

async function checkUrl(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: ctl.signal,
      headers: { 'User-Agent': UA, Accept: '*/*' },
    });
    if ([403, 405, 406, 501].includes(res.status)) {
      res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: ctl.signal,
        headers: { 'User-Agent': UA, Accept: '*/*' },
      });
    }
    return { ok: res.ok || res.status === 304, status: res.status };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  } finally {
    clearTimeout(t);
  }
}

async function main() {
  const files = (await fs.readdir(ENTRIES_DIR))
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .sort();

  const targets = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(ENTRIES_DIR, f), 'utf8');
    const entry = yaml.load(raw);
    targets.push({ file: f, field: 'url', url: entry.url });
    if (entry.repo) targets.push({ file: f, field: 'repo', url: entry.repo });
  }

  if (targets.length === 0) {
    console.log('ℹ No links to check yet.');
    return;
  }

  const results = [];
  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const batch = targets.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (t) => ({ ...t, ...(await checkUrl(t.url)) }))
    );
    results.push(...batchResults);
  }

  let failed = 0;
  for (const r of results) {
    if (!r.ok) {
      console.error(
        `✗ ${r.file} ${r.field}: ${r.url} → ${r.status}${r.error ? ` (${r.error})` : ''}`
      );
      failed++;
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} of ${targets.length} link(s) broken`);
    process.exit(1);
  }
  console.log(`✓ ${targets.length} link(s) OK`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
