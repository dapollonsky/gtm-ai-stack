#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'data', 'entries');

const GH_TOKEN = process.env.GITHUB_TOKEN || '';
const headers = {
  'User-Agent': 'gtm-ai-stack-refresh',
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};
if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;

const STALE_DAYS = 180;

function parseRepo(url) {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+?)(?:\.git)?\/?$/);
  if (!m) return null;
  return { owner: m[1], name: m[2] };
}

async function fetchRepo(owner, name) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${name}`, { headers });
  if (res.status === 404) return { notFound: true };
  if (res.status === 403) throw new Error(`rate-limited or forbidden: ${await res.text()}`);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const data = await res.json();
  return {
    stars: data.stargazers_count ?? null,
    last_commit: (data.pushed_at || '').slice(0, 10) || null,
    license: data.license?.spdx_id ?? null,
    archived: !!data.archived,
  };
}

function canonicalize(entry) {
  return {
    name: entry.name,
    slug: entry.slug,
    kind: entry.kind,
    url: entry.url,
    repo: entry.repo ?? null,
    category: entry.category,
    tags: {
      type: entry.tags.type,
      personas: entry.tags.personas,
      openness: entry.tags.openness,
      maturity: entry.tags.maturity,
      ai_nativeness: entry.tags.ai_nativeness,
      mcp_ready: entry.tags.mcp_ready,
    },
    description: entry.description,
    why_it_matters: entry.why_it_matters,
    closed_alternative: entry.closed_alternative ?? null,
    stats: {
      stars: entry.stats?.stars ?? null,
      last_commit: entry.stats?.last_commit ?? null,
      license: entry.stats?.license ?? null,
    },
    submitted: entry.submitted,
    status: entry.status,
  };
}

function daysSince(isoDate) {
  if (!isoDate) return Infinity;
  const ms = Date.now() - new Date(isoDate).getTime();
  return ms / (1000 * 60 * 60 * 24);
}

async function main() {
  if (!GH_TOKEN) {
    console.warn('⚠ No GITHUB_TOKEN set — unauthenticated requests will hit rate limits quickly.');
  }

  const files = (await fs.readdir(ENTRIES_DIR))
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .sort();

  let updated = 0;
  let skipped = 0;
  let failed = 0;
  let flagged = 0;

  for (const f of files) {
    const fp = path.join(ENTRIES_DIR, f);
    const raw = await fs.readFile(fp, 'utf8');
    const entry = yaml.load(raw);

    if (entry.kind !== 'repo' || !entry.repo) {
      await fs.writeFile(fp, yaml.dump(canonicalize(entry), { lineWidth: 100, noRefs: true }), 'utf8');
      skipped++;
      continue;
    }

    const ref = parseRepo(entry.repo);
    if (!ref) {
      console.warn(`? ${f}: couldn't parse repo URL ${entry.repo}`);
      skipped++;
      continue;
    }

    try {
      const stats = await fetchRepo(ref.owner, ref.name);
      if (stats.notFound) {
        console.warn(`✗ ${f}: repo not found upstream`);
        failed++;
        continue;
      }
      entry.stats = {
        stars: stats.stars,
        last_commit: stats.last_commit,
        license: stats.license,
      };

      if (stats.archived && entry.status !== 'archived') {
        console.warn(`! ${f}: upstream archived — flagging status=archived`);
        entry.status = 'archived';
        flagged++;
      } else if (
        entry.status === 'active' &&
        daysSince(stats.last_commit) > STALE_DAYS
      ) {
        console.warn(`! ${f}: no commits for >${STALE_DAYS} days — flagging status=watchlist`);
        entry.status = 'watchlist';
        flagged++;
      }

      await fs.writeFile(fp, yaml.dump(canonicalize(entry), { lineWidth: 100, noRefs: true }), 'utf8');
      updated++;
    } catch (e) {
      console.error(`✗ ${f}: ${e.message}`);
      failed++;
    }

    await new Promise((r) => setTimeout(r, 120));
  }

  console.log(`\n${updated} updated · ${skipped} skipped · ${flagged} status-flagged · ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
