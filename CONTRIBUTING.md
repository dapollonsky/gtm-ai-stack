# Contributing

Thanks for wanting to add to `gtm-ai-stack`. This file tells you how. Before you open a PR, read [SCOPE.md](./SCOPE.md) — if your submission does not pass the 3-rule test, it will be closed.

## The authoritative contract

[`data/schema.json`](./data/schema.json) is the source of truth for what an entry looks like. Every field, every enum, every length limit lives there. `npm run validate` runs that schema against every entry in `data/entries/`. If validation fails locally, it fails in CI.

## Two ways to submit

1. **YAML PR (preferred for GTM engineers).** Fork, add a file at `data/entries/<slug>.yaml`, run the local workflow below, open a PR.
2. **Issue form (for non-engineers).** Open a "Submit a project" issue. The curator converts approved issues into YAML PRs. You do not need to touch YAML.

## Required fields, with examples

Every field is documented in the schema; this section shows what passes review and what does not.

### `name`
Display name of the project. Max 80 chars.
- **Good:** `Twenty`
- **Bad:** `Twenty — the open source CRM that will replace Salesforce (AI-native!)` — this is marketing copy, not a name.

### `slug`
Kebab-case identifier that **must match the YAML filename without the `.yaml` extension**. Used for deep links, dedup checks, and anchor targets.
- **Good:** `twenty` (file: `data/entries/twenty.yaml`)
- **Bad:** `Twenty_CRM` — wrong case, wrong separator, will not validate.

### `url`
Primary URL. Product home page or main docs. Must resolve (link check runs nightly).
- **Good:** `https://twenty.com`
- **Bad:** `https://github.com/twentyhq/twenty/blob/main/README.md#features` — deep link, not the home.

### `repo`
GitHub repo URL. `null` is allowed for hosted services without an open component.
- **Good:** `https://github.com/twentyhq/twenty`
- **Bad:** `https://twentyhq.com` — that is a product page, not a repo.

### `category`
Exactly one of the nine categories in [SCOPE.md](./SCOPE.md). Pick the primary job. No cross-posting.

### `tags`
Three required keys:

- **`type`** — one of `mcp`, `aggregator`, `agent`, `app`, `framework`, `skill-pack`, `template`, `cms`, `crm`, `library`.
- **`ai_nativeness`** — one of `ai-native`, `ai-enabled`, `substrate`. See [SCOPE.md](./SCOPE.md) for the distinction.
- **`mcp_ready`** — boolean. `true` if the project is or ships an MCP server.

That's it. Three fields. Friction-per-submission is deliberately low.

### `description`
One sentence, 10 to 280 chars. What it is.
- **Good:** `Open-source, modular CRM with a typed schema, GraphQL API, and an MCP server.`
- **Bad:** `The best open-source CRM for modern GTM teams who want to move fast.` — marketing fluff, no information.

### `why_it_matters`
This is the field that gets submissions rejected more than any other. Read the next section.

### `closed_alternative`
Name the incumbent it replaces or competes with. Do not write "none" unless you have actually checked and the category has no dominant closed product.
- **Good:** `Salesforce` (for `twenty`); `Apollo` (for an outbound prospecting agent); `Gong` (for a call-coaching agent).
- **Bad:** `none` for a CRM. There are closed CRMs. Name one.

### `stats`, `submitted`, `status`
Leave `stats` fields as `null` at submission time — `scripts/fetch-stats.js` fills them nightly for entries with a repo URL. Set `submitted` to today's date. Set `status` to `active` unless you are knowingly adding a `watchlist` entry.

## How to write a good `why_it_matters`

Think of it as a job story compressed into one sentence. The test: can a reader learn *specific job*, *specific persona*, *specific outcome*?

- **Good:** `Replaces the Clay + Instantly + hand-rolled Python loop by giving a GTM engineer a single typed schema where ICP signals, enrichment, and outbound messaging live in one repo.`
- **Good:** `Lets a founder self-host the email infrastructure for a cold outbound motion without paying SendGrid or Postmark margins.`
- **Bad:** `A powerful, AI-native platform that helps modern sales teams unlock productivity.` — zero specifics, pure marketing. Rejected.
- **Bad:** `Open-source alternative to Gong.` — this is closed_alternative, not a reason. Why does the OSS path matter for the persona?

If you cannot write this sentence, the entry is not ready. That is a signal about the project, not about your writing.

## How to write a good `closed_alternative`

Name the commercial product a prospective user would otherwise buy. This is not a competitor list — it is a one-name answer to "what would I cancel to adopt this?"

- **Good:** `Clay`, `Apollo`, `Gong`, `Outreach`, `Salesloft`, `HubSpot`, `Salesforce`, `Jasper`, `Copy.ai`, `Ahrefs`.
- **Bad:** `Several` / `Various sales tools` / `The legacy stack` — vague, unhelpful, rejected.
- **Acceptable `null`:** A first-of-its-kind MCP server for a new protocol with no commercial equivalent. Rare.

## Slug rules

- Kebab-case: lowercase letters, digits, hyphens.
- Must match the filename: `data/entries/<slug>.yaml`.
- Must be unique across the whole list. The build script fails on duplicates.
- Prefer the project's canonical short name over a descriptive slug (e.g., `twenty`, not `twenty-crm`).

## Local workflow

```bash
npm install
npm run validate   # schema + dedup check
npm run build      # regenerates README.md from data/entries/
```

Before you open a PR, also run:

```bash
npm run check:links
```

The `check` script runs all three (`npm run check`). Do not commit a regenerated `README.md` unless the curator asks — CI handles it.

## PR review checklist

Copy this into your PR description (the template will prefill it):

- [ ] `npm run validate` passes locally
- [ ] Entry is in the correct category (only one)
- [ ] `why_it_matters` names a specific job, persona, and outcome
- [ ] `closed_alternative` names a real incumbent (or is justifiably `null`)
- [ ] Slug matches the filename and is not a duplicate
- [ ] `npm run check:links` passes
- [ ] Entry belongs per [SCOPE.md](./SCOPE.md)

## What auto-review does vs. what the curator does

**CI (auto-review):**
- Schema validation (`scripts/validate.js`)
- Dedup check on slug
- Build regeneration dry-run (`scripts/build.js`)
- Link check (`scripts/link-check.js`)

**The curator (human review):**
- Does this pass the 3-rule test in [SCOPE.md](./SCOPE.md)?
- Does `why_it_matters` pass the sniff test?
- Is `closed_alternative` honest?
- Is the category the right one?
- Is this a duplicate-in-spirit of an existing entry?
- Is the project alive enough to be worth listing?

CI catches shape. The curator catches substance. Both are required.

## Code of conduct

Contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md). Enforcement is handled by the curator at `dimitry@soar.sh`.
