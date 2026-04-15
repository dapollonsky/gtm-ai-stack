#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'data', 'entries');
const README_PATH = path.join(ROOT, 'README.md');
const SITE_DATA_PATH = path.join(ROOT, 'site', 'src', 'data', 'entries.json');

const CATEGORIES = [
  {
    id: 'prospecting',
    title: 'Prospecting & Enrichment',
    blurb: 'ICP modelling, lead research, account briefs, signal detection, data enrichment.',
  },
  {
    id: 'outbound',
    title: 'Outbound',
    blurb: 'Cold email, sequencers, SDR agents, LinkedIn automation, voice dialers.',
  },
  {
    id: 'content',
    title: 'Content',
    blurb: 'Long-form writing, blog and article drafting, copy generation, content repurposing.',
  },
  {
    id: 'seo',
    title: 'SEO',
    blurb: 'Keyword research, Search Console analysis, rank tracking, technical SEO, GEO (generative engine optimisation).',
  },
  {
    id: 'social',
    title: 'Social',
    blurb: 'Social scheduling, short-form video, community outreach, Reddit/X/LinkedIn automation.',
  },
  {
    id: 'ads',
    title: 'Ads & Creative',
    blurb: 'Ad copy, creative generation, paid channel automation, static and video creative for marketing.',
  },
  {
    id: 'meetings',
    title: 'Meetings & Conversation Intelligence',
    blurb: 'Scheduling, recording, note-taking, and call coaching — for sales conversations.',
  },
  {
    id: 'closing',
    title: 'Closing',
    blurb: 'Proposal writers, RFP agents, contract drafting, deal-desk automation.',
  },
  {
    id: 'plumbing',
    title: 'Plumbing & Substrate',
    blurb: 'MCP servers, aggregators, OSS CRMs, agent frameworks, email infrastructure — the layer GTM agents are built on.',
  },
];

const TYPE_LABEL = {
  mcp: 'MCP',
  aggregator: 'Aggregator',
  agent: 'Agent',
  app: 'App',
  framework: 'Framework',
  'skill-pack': 'Skill pack',
  template: 'Template',
  cms: 'CMS',
  crm: 'CRM',
  library: 'Library',
};

const AI_LABEL = {
  'ai-native': 'AI-native',
  'ai-enabled': 'AI-enabled',
  substrate: 'Substrate',
};

function slugifyAnchor(s) {
  return s
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function formatStars(n) {
  if (n == null) return '—';
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function formatMonth(s) {
  if (!s) return '—';
  return s.slice(0, 7);
}

function escapePipes(s) {
  return s.replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
}

async function loadEntries() {
  const files = (await fs.readdir(ENTRIES_DIR))
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .sort();
  const entries = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(ENTRIES_DIR, f), 'utf8');
    entries.push(yaml.load(raw));
  }
  return entries;
}

function renderEntryRow(e) {
  const href = e.repo || e.url;
  const name = `[${e.name}](${href})`;
  const type = TYPE_LABEL[e.tags.type] || e.tags.type;
  const ai = AI_LABEL[e.tags.ai_nativeness];
  const mcp = e.tags.mcp_ready ? '✓' : '';
  const stars = formatStars(e.stats?.stars);
  const last = formatMonth(e.stats?.last_commit);
  const why = escapePipes(e.why_it_matters);
  return `| ${name} | ${type} | ${ai} | ${mcp} | ${stars} | ${last} | ${why} |`;
}

function renderCategorySection(cat, entries) {
  if (entries.length === 0) return '';
  const sorted = entries.slice().sort((a, b) => {
    const sa = a.stats?.stars ?? -1;
    const sb = b.stats?.stars ?? -1;
    if (sb !== sa) return sb - sa;
    return a.name.localeCompare(b.name);
  });
  return [
    `## ${cat.title}`,
    '',
    cat.blurb,
    '',
    '| Project | Type | AI | MCP | Stars | Last commit | Why it matters |',
    '|---|---|---|---|---|---|---|',
    sorted.map(renderEntryRow).join('\n'),
    '',
  ].join('\n');
}

async function main() {
  const entries = await loadEntries();
  const active = entries.filter((e) => e.status === 'active');
  const watchlist = entries.filter((e) => e.status === 'watchlist');
  const archived = entries.filter((e) => e.status === 'archived');

  const byCategory = Object.fromEntries(CATEGORIES.map((c) => [c.id, []]));
  for (const e of active) {
    if (byCategory[e.category]) byCategory[e.category].push(e);
  }

  const toc = CATEGORIES
    .filter((c) => byCategory[c.id].length > 0)
    .map((c) => `- [${c.title}](#${slugifyAnchor(c.title)}) — ${byCategory[c.id].length}`);
  if (watchlist.length > 0) toc.push('- [Watchlist](#watchlist)');
  if (archived.length > 0) toc.push('- [Archive](#archive)');

  const sections = CATEGORIES.map((c) => renderCategorySection(c, byCategory[c.id])).filter(Boolean);

  const watchlistSection = watchlist.length
    ? [
        '## Watchlist',
        '',
        'Projects listed but not fully endorsed — stale maintenance, ToS risk, very early, or otherwise requiring caution.',
        '',
        ...watchlist
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((e) => `- [${e.name}](${e.repo || e.url}) — ${e.why_it_matters}`),
        '',
      ].join('\n')
    : '';

  const archivedSection = archived.length
    ? [
        '## Archive',
        '',
        'Previously listed projects, now archived upstream or no longer maintained. Kept for historical reference.',
        '',
        ...archived
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((e) => `- [${e.name}](${e.repo || e.url}) — ${e.why_it_matters}`),
        '',
      ].join('\n')
    : '';

  const today = new Date().toISOString().slice(0, 10);

  const md = [
    '# GTM AI Stack',
    '',
    '**A curated, editorially-maintained map of AI-native tools and MCP plumbing for go-to-market teams.**',
    '',
    `${active.length} active · ${watchlist.length} watchlist · ${archived.length} archived · built ${today}`,
    '',
    '> This README is generated from [`data/entries/*.yaml`](data/entries). Do not edit it directly — open a PR against a YAML entry and CI will rebuild.',
    '',
    '## What this is',
    '',
    'An opinionated, funnel-aligned list of AI tools that help revenue teams (marketers, SDRs, AEs, founders, GTM engineers) do more, faster. Every entry has to answer one question: **what specific GTM job does this do better than not having it?**',
    '',
    'Three tiers of the stack live here side-by-side:',
    '',
    '1. **Plumbing** — MCP servers, aggregators, OSS CRMs, agent frameworks. The substrate agents are built on.',
    '2. **Agents & apps** — End-user tools and autonomous agents for specific GTM jobs.',
    '3. **Skill packs & templates** — Claude Code skills, CrewAI templates, n8n flows — ready-to-install recipes.',
    '',
    'What this is **not**: an AI-tool dump. See [`SCOPE.md`](SCOPE.md) for what is in and out, and [`CONTRIBUTING.md`](CONTRIBUTING.md) to submit an entry.',
    '',
    '## Why this exists',
    '',
    'Existing awesome-lists either (a) cover AI agents generally with no GTM taxonomy, (b) list MCP servers without telling you which ones matter for revenue teams, or (c) silo sales-only vs marketing-only. None map the full GTM funnel against AI tooling with explicit quality criteria and automated pruning. This list does.',
    '',
    '## Site',
    '',
    'A searchable, filterable version of this list: **[gtm-ai-stack.dev](https://dapollonsky.github.io/gtm-ai-stack/)** _(live once GitHub Pages is enabled)_.',
    '',
    '## Contents',
    '',
    toc.join('\n'),
    '',
    sections.join('\n'),
    watchlistSection,
    archivedSection,
    '## Editorial',
    '',
    '- **[SCOPE.md](SCOPE.md)** — the editorial constitution (what is in, what is out, and why)',
    '- **[CONTRIBUTING.md](CONTRIBUTING.md)** — how to submit, schema reference, PR rules',
    '- **License** — code under [MIT](LICENSE); entry data under [CC-BY-SA 4.0](LICENSE-DATA)',
    '',
    '## Acknowledgements',
    '',
    'Prior work that informed scoping: [Specter — AI × GTM Landscape 2025](https://insights.tryspecter.com/ai-x-gtm-landscape-2025/), [joylarkin/Awesome-AI-Market-Maps](https://github.com/joylarkin/Awesome-AI-Market-Maps), [Menlo 2025 State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), and the broader MCP community.',
    '',
  ]
    .filter((x) => x !== '')
    .join('\n');

  await fs.writeFile(README_PATH, md + '\n', 'utf8');

  await fs.mkdir(path.dirname(SITE_DATA_PATH), { recursive: true });
  const siteData = {
    built_at: today,
    categories: CATEGORIES,
    entries: entries.map((e) => ({ ...e, href: e.repo || e.url })),
    counts: {
      active: active.length,
      watchlist: watchlist.length,
      archived: archived.length,
    },
  };
  await fs.writeFile(SITE_DATA_PATH, JSON.stringify(siteData, null, 2) + '\n', 'utf8');

  const populatedCats = CATEGORIES.filter((c) => byCategory[c.id].length > 0).length;
  console.log(
    `✓ README.md + site/src/data/entries.json built — ${active.length} active across ${populatedCats}/${CATEGORIES.length} categories`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
