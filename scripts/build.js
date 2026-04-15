#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ENTRIES_DIR = path.join(ROOT, 'data', 'entries');
const README_PATH = path.join(ROOT, 'README.md');

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

const CATEGORY_EMOJI = {
  prospecting: '🧲',
  outbound: '🚀',
  content: '✍️',
  seo: '🔍',
  social: '📱',
  ads: '💰',
  meetings: '🎙️',
  closing: '🏆',
  plumbing: '🔌',
};

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
  const emoji = CATEGORY_EMOJI[cat.id] || '';
  return [
    `<a id="${cat.id}"></a>`,
    `### ${emoji} ${cat.title}`,
    '',
    '| Project | Type | AI | MCP | ⭐ | 🔄 | Why |',
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
    .map((c) => `- [${CATEGORY_EMOJI[c.id]} ${c.title}](#${c.id}) — ${byCategory[c.id].length}`);
  if (watchlist.length > 0) toc.push('- [⚠️ Watchlist](#watchlist)');
  if (archived.length > 0) toc.push('- [📦 Archive](#archive)');

  const sections = CATEGORIES
    .map((c) => renderCategorySection(c, byCategory[c.id]))
    .filter(Boolean);

  const watchlistSection = watchlist.length
    ? [
        '<a id="watchlist"></a>',
        '### ⚠️ Watchlist',
        '',
        '_Flagged but not fully endorsed — stale maintenance, ToS risk, very early._',
        '',
        ...watchlist
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((e) => `- **[${e.name}](${e.repo || e.url})** — ${e.why_it_matters}`),
        '',
      ].join('\n')
    : '';

  const archivedSection = archived.length
    ? [
        '<a id="archive"></a>',
        '### 📦 Archive',
        '',
        '_Archived upstream — kept for historical reference._',
        '',
        ...archived
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((e) => `- **[${e.name}](${e.repo || e.url})** — ${e.why_it_matters}`),
        '',
      ].join('\n')
    : '';

  const today = new Date().toISOString().slice(0, 10);

  const md = [
    '```text',
    ' ██████╗ ████████╗███╗   ███╗     █████╗ ██╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗',
    '██╔════╝ ╚══██╔══╝████╗ ████║    ██╔══██╗██║    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝',
    '██║  ███╗   ██║   ██╔████╔██║    ███████║██║    ███████╗   ██║   ███████║██║     █████╔╝ ',
    '██║   ██║   ██║   ██║╚██╔╝██║    ██╔══██║██║    ╚════██║   ██║   ██╔══██║██║     ██╔═██╗ ',
    '╚██████╔╝   ██║   ██║ ╚═╝ ██║    ██║  ██║██║    ███████║   ██║   ██║  ██║╚██████╗██║  ██╗',
    ' ╚═════╝    ╚═╝   ╚═╝     ╚═╝    ╚═╝  ╚═╝╚═╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '          ░▒▓  AI × go-to-market, from prospecting to plumbing  ▓▒░',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '```',
    '',
    `🎯 **${active.length} active** · ⚠️ **${watchlist.length} watchlist** · 📦 **${archived.length} archived** · 🔄 built ${today}`,
    '',
    '> Generated from [`data/entries/*.yaml`](data/entries) — open a PR against a YAML entry, not this file.',
    '',
    '## ⚡ What',
    '',
    'A curated, editorially-maintained map of AI-native tools and MCP plumbing for go-to-market teams — sales, marketing, and the plumbing that powers them. Every entry answers one question: **what specific GTM job does this do better than not having it?**',
    '',
    '→ [`SCOPE.md`](SCOPE.md) · [`CONTRIBUTING.md`](CONTRIBUTING.md)',
    '',
    '## 🗺️ The stack',
    '',
    toc.join('\n'),
    '',
    '---',
    '',
    sections.join('\n'),
    watchlistSection,
    archivedSection,
    '---',
    '',
    '🎯 [marketing-ai-stack](https://github.com/dapollonsky/marketing-ai-stack) (stricter marketer-first view) · 📜 [MIT](LICENSE) · [CC-BY-SA 4.0](LICENSE-DATA)',
    '',
  ]
    .filter((x) => x !== '')
    .join('\n');

  await fs.writeFile(README_PATH, md + '\n', 'utf8');

  const populatedCats = CATEGORIES.filter((c) => byCategory[c.id].length > 0).length;
  console.log(
    `✓ README.md built — ${active.length} active across ${populatedCats}/${CATEGORIES.length} categories`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
