# Scope

`gtm-ai-stack` is a curated, editorially-maintained map of AI-native tools and MCP plumbing for go-to-market teams. This document is the editorial constitution. If you are considering a submission, read this first. If you are reviewing a PR, this is the rubric.

## The thesis

Every entry on this list must answer one question: **what specific GTM job does this do better than not having it?** If the entry cannot name the job, the persona, and the closed-source incumbent it replaces or competes with, it does not belong here. This is not an AI-tool dump. The bar is editorial judgement backed by automated pruning.

## What belongs (the 3-rule test)

An entry must pass all three rules or it is rejected on review.

1. **GTM job-to-be-done.** It directly helps a marketer, SDR/AE, GTM engineer, or founder do one of: find accounts, reach buyers, write content, rank in search, ship social, run ads, run meetings, close deals, or plumb any of the above together. If you cannot point at a line item on a revenue team's job description, it is out of scope.
2. **AI-native or meaningfully AI-augmented.** Either the product is architected around an LLM/agent loop (`ai-native`), or it has added AI features that materially change the workflow (`ai-enabled`), or it is widely used as the foundation for GTM agents even if it is not AI itself (`substrate` — think email infrastructure, OSS CRMs, headless CMSes, MCP servers).
3. **OSS or open component.** The project is open source, or has an open core, or ships an open MCP server / SDK / skill-pack that a GTM engineer can fork, self-host, or read the source of. A hosted product with zero open surface area does not qualify.

## What does NOT belong

- **Closed-only SaaS.** No source, no MCP, no SDK, no hook for a GTM engineer to extend. These go into a one-line Market Context section only — never a full entry.
- **Customer success, support, onboarding, help desks.** Out of scope. This list is about winning revenue, not keeping it.
- **RevOps forecasting and pipeline analytics.** Out of scope. Interesting category, not this list.
- **Generic chatbots and general-purpose assistants.** If the GTM framing is "you could use this to write a cold email," that is not enough.
- **Pure LLM wrappers with no GTM framing.** Another prompt template for ChatGPT is not an entry.
- **Dead projects.** Archived upstream, no commits in 180+ days with no `reference` designation, broken links that stay broken — these age out automatically.

## The 9 categories

Every entry lives in exactly one category. Cross-posting is not allowed; pick the primary job.

- **`prospecting`** — ICP modelling, lead research, account briefs, signal detection, data enrichment.
- **`outbound`** — Cold email, sequencers, SDR agents, LinkedIn automation, voice dialers.
- **`content`** — Long-form writing, blog and article drafting, copy generation, content repurposing.
- **`seo`** — Keyword research, Search Console analysis, rank tracking, technical SEO, GEO.
- **`social`** — Social scheduling, short-form video, community outreach.
- **`ads`** — Ad copy, creative generation, paid channel automation.
- **`meetings`** — Scheduling, recording, note-taking, call coaching for sales conversations.
- **`closing`** — Proposal writers, RFP agents, contract drafting.
- **`plumbing`** — MCP servers, aggregators, OSS CRMs, agent frameworks, email infrastructure — the layer GTM agents are built on.

## The `ai_nativeness` distinction

Every entry is tagged with one of three values. This is load-bearing for readers deciding what to trust.

- **`ai-native`** — The architecture is AI-first. Remove the LLM or agent loop and the product does nothing useful. Example: an SDR agent whose entire control flow is a planner + tool calls.
- **`ai-enabled`** — A pre-existing product that added AI features that materially changed the workflow. The non-AI version of the product still works; the AI version works better.
- **`substrate`** — Not AI itself, but widely used as the foundation for GTM agents. Email infrastructure (Resend, Postal), OSS CRMs (Twenty, ERPNext), headless CMSes, MCP servers, agent frameworks. Substrate entries must still pass the GTM job test — a generic database does not qualify, a CRM schema does.

## Anti-dump principles

The failure mode for any list like this is entropy — every new "AI tool for sales" gets added, the signal-to-noise ratio collapses, the list becomes a directory, readers stop trusting it. These principles exist to prevent that.

- **`why_it_matters` is mandatory and specific.** One sentence. Name the job, the persona, the outcome. Marketing adjectives get rejected on review. "Fast and reliable" is not a reason.
- **`closed_alternative` is mandatory unless genuinely none exists.** If you cannot name the incumbent, either the category is too small to matter or you have not done the research. Null is allowed but rare and scrutinized.
- **Automated nightly pruning.** `scripts/fetch-stats.js` refreshes stars, last commit, and license for every `kind=repo` entry. `scripts/link-check.js` checks every URL. Entries that fail these checks are flagged for review, not silently hidden.
- **Editorial judgement over breadth.** Two strong entries beat ten mediocre ones. The curator will reject submissions that technically pass schema validation if they fail the sniff test.
- **Hard cap on skill-packs.** Claude Code skills, CrewAI templates, and other skill-pack entries are secondary. They are useful as examples of what agents can do, not as load-bearing infrastructure. Ceiling: roughly 10% of total entries, reviewed quarterly.

## Removal policy

- **Upstream archived** → entry status flipped to `archived`, kept on the list with a note, no longer shown in the default view.
- **No commits in 180 days and not tagged `reference`** → moved to `watchlist` for curator review; may return to `active` with justification or age out.
- **Broken links** → automated PR opened by `scripts/link-check.js`; curator fixes or removes.
- **ToS change making self-hosting or OSS use impractical** → flagged via the stale-entry issue form, reviewed, usually removed.
- **Scope change** (project pivots away from GTM) → removed with a note in the commit history.

## Closed-source policy

Closed-source tools that dominate a category get exactly one line in a **Market Context** section at the top of the relevant category. Format: name, one-sentence description, link. No tags, no writeups, no stars. This exists so readers can orient themselves against the commercial landscape — not to promote closed products. If a closed tool later ships a meaningful OSS component (MCP server, SDK, self-hostable core), it can graduate to a full entry under the appropriate `openness` value.

## Calling the shot

This list will be wrong sometimes. Categories will shift, incumbents will change, projects will die. The editorial model is curator + community PRs with template-enforced schema and CI gates. When in doubt, the curator's judgement wins, and the curator's judgement is accountable to this document. If you disagree with a decision, open an issue — but read this file first.
