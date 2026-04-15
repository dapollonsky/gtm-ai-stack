# GTM AI Stack
**A curated, editorially-maintained map of AI-native tools and MCP plumbing for go-to-market teams.**
39 active · 9 watchlist · 3 archived · built 2026-04-15
> This README is generated from [`data/entries/*.yaml`](data/entries). Do not edit it directly — open a PR against a YAML entry and CI will rebuild.
## What this is
An opinionated, funnel-aligned list of AI tools that help revenue teams (marketers, SDRs, AEs, founders, GTM engineers) do more, faster. Every entry has to answer one question: **what specific GTM job does this do better than not having it?**
Three tiers of the stack live here side-by-side:
1. **Plumbing** — MCP servers, aggregators, OSS CRMs, agent frameworks. The substrate agents are built on.
2. **Agents & apps** — End-user tools and autonomous agents for specific GTM jobs.
3. **Skill packs & templates** — Claude Code skills, CrewAI templates, n8n flows — ready-to-install recipes.
What this is **not**: an AI-tool dump. See [`SCOPE.md`](SCOPE.md) for what is in and out, and [`CONTRIBUTING.md`](CONTRIBUTING.md) to submit an entry.
## Why this exists
Existing awesome-lists either (a) cover AI agents generally with no GTM taxonomy, (b) list MCP servers without telling you which ones matter for revenue teams, or (c) silo sales-only vs marketing-only. None map the full GTM funnel against AI tooling with explicit quality criteria and automated pruning. This list does.
## Site
A searchable, filterable version of this list: **[gtm-ai-stack.dev](https://dapollonsky.github.io/gtm-ai-stack/)** _(live once GitHub Pages is enabled)_.
## Contents
- [Prospecting & Enrichment](#prospecting-enrichment) — 5
- [Outbound](#outbound) — 5
- [Content](#content) — 2
- [SEO](#seo) — 5
- [Social](#social) — 4
- [Ads & Creative](#ads-creative) — 3
- [Meetings & Conversation Intelligence](#meetings-conversation-intelligence) — 1
- [Closing](#closing) — 1
- [Plumbing & Substrate](#plumbing-substrate) — 13
- [Watchlist](#watchlist)
- [Archive](#archive)
## Prospecting & Enrichment

ICP modelling, lead research, account briefs, signal detection, data enrichment.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [Firecrawl](https://github.com/firecrawl/firecrawl) | Library | Substrate | ✓ | 109.5k | 2026-04 | The crawler layer behind most OSS lead-research and competitor-monitoring agents — effectively universal in 2026 GTM agent stacks because scraping HTML into clean markdown is the unglamorous step everyone else gets wrong. |
| [GPT Researcher](https://github.com/assafelovic/gpt-researcher) | Agent | AI-native |  | 26.5k | 2026-03 | The most battle-tested OSS foundation for account research packets in 2026 — sellers get a standalone agent that builds a sourced dossier before every discovery call without paying Clay or Perplexity Enterprise. |
| [OpenFang](https://github.com/RightNow-AI/openfang) | Agent | AI-native |  | 16.6k | 2026-04 | The closest OSS analogue to stitching Clay together with an AI SDR product — founders and lean sales teams get a lights-out prospect engine without a Clay bill or an 11x contract. |
| [Exa MCP](https://github.com/exa-labs/exa-mcp-server) | MCP | AI-enabled | ✓ | 4.2k | 2026-04 | The default search primitive for any prospect or account research agent — neural search returns the right company or news item on the first try where keyword search would miss it. |
| [Apollo MCP](https://github.com/Chainscore/apollo-io-mcp) | MCP | AI-enabled | ✓ | 1 | 2026-02 | The most complete community bridge between agents and Apollo until a first-party server ships — SDRs can hand the whole prospecting loop (search → enrich → sequence) to an agent working inside Claude or Cursor. |

## Outbound

Cold email, sequencers, SDR agents, LinkedIn automation, voice dialers.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [Suna](https://github.com/kortix-ai/suna) | Agent | AI-native | ✓ | 19.6k | 2026-04 | Widely forked by GTM engineers as the base for SDR automation, account research, and cold outbound bots — you get a working agent chassis and plug in your own tools instead of writing one from scratch. |
| [Pipecat](https://github.com/pipecat-ai/pipecat) | Framework | AI-native | ✓ | 11.3k | 2026-04 | The most active OSS stack for building voice sales bots, cold-call dialers, and lead-qualification agents — enterprises avoid Vapi and Retell's per-minute pricing by running the whole pipeline themselves. |
| [LiveKit Agents](https://github.com/livekit/agents) | Framework | AI-native | ✓ | 10.1k | 2026-04 | The alternative voice framework to Pipecat for sales-voice builds — gives GTM engineers a production-grade WebRTC transport and telephony plumbing so the team can focus on the call logic, not the audio stack. |
| [AI Marketing Skills](https://github.com/ericosiu/ai-marketing-skills) | Skill pack | AI-native |  | 1.8k | 2026-04 | The strongest pure-GTM skill pack in the wild — solo founders and small sales teams can install a dozen named plays (deal resurrection, trigger prospecting, ICP learning) into Claude Code in minutes instead of building them. |
| [Resend MCP](https://github.com/resend/resend-mcp) | MCP | AI-enabled | ✓ | 500 | 2026-04 | The cleanest email-sending primitive for agent-driven outbound and newsletters — one tool call gets a drafted email out the door with the deliverability of Resend, no SendGrid contract. |

## Content

Long-form writing, blog and article drafting, copy generation, content repurposing.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [ALwrity](https://github.com/AJaySi/ALwrity) | App | AI-native |  | 983 | 2026-04 | One of the few credible OSS alternatives to Jasper, Copy.ai, or Writer that a marketer can self-host today — install it once and stop paying per-seat for a writing tool. |
| [Microsoft Content Generation Accelerator](https://github.com/microsoft/content-generation-solution-accelerator) | Template | AI-native |  | 217 | 2026-04 | A reference architecture for enterprise teams spinning up an internal AI content factory — carries Microsoft's name and patterns, which matters for GTM engineers who have to ship inside a procurement-heavy org. |

## SEO

Keyword research, Search Console analysis, rank tracking, technical SEO, GEO (generative engine optimisation).

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [mcp-gsc](https://github.com/AminForou/mcp-gsc) | MCP | AI-enabled | ✓ | 689 | 2026-04 | Lets a marketer have the model narrate query performance, diagnose ranking drops, and suggest content fixes without opening GSC — the fastest way to turn weekly SEO review meetings into a single Claude thread. |
| [RustySEO](https://github.com/mascanho/RustySEO) | App | AI-enabled |  | 197 | 2026-04 | The most promising OSS Screaming Frog alternative with AI-era features — marketers get a native desktop app they own rather than a licensed per-seat crawler. |
| [DataForSEO MCP](https://github.com/dataforseo/mcp-server-typescript) | MCP | AI-enabled | ✓ | 176 | 2026-04 | The most comprehensive agent-ready SEO data layer — one MCP install gets a marketer the same data set Semrush and Ahrefs sell, usable from any MCP-capable client. |
| [SEO Research MCP](https://github.com/egebese/seo-research-mcp) | MCP | AI-enabled | ✓ | 171 | 2026-01 | Useful for marketing engineers who want to run Ahrefs-quality SEO research from inside Claude Code or Cursor — keeps the workflow in the editor instead of bouncing into Ahrefs' UI. |
| [GEO AI Agent](https://github.com/brightdata/geo-ai-agent) | Agent | AI-native |  | 153 | 2025-10 | Measures and improves how a brand shows up in ChatGPT, Perplexity, and Gemini answers — the first OSS answer to closed GEO tools as buyer research shifts from Google to LLM chats. |

## Social

Social scheduling, short-form video, community outreach, Reddit/X/LinkedIn automation.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | App | AI-native |  | 55.7k | 2026-04 | By far the most popular OSS pipeline for shipping TikToks and Shorts — rough edges, but lets a solo marketer go from topic to posted video without touching a timeline editor. |
| [Postiz](https://github.com/gitroomhq/postiz-app) | App | AI-enabled |  | 28.6k | 2026-04 | The clearest "replace Buffer" OSS story — very actively maintained, covers every channel a modern founder posts to, and keeps the content history and analytics on the team's own infrastructure. |
| [Viral Clips Crew](https://github.com/alexfazio/viral-clips-crew) | Template | AI-native |  | 755 | 2026-02 | The cleanest reference architecture for a video-repurposing agent — easy to fork for podcast or YouTube pipelines, so a single founder can run what used to be an editor's entire job. |
| [Reddit Research MCP](https://github.com/king-of-the-grackles/reddit-research-mcp) | MCP | AI-enabled | ✓ | 105 | 2025-12 | The bridge between agents and Reddit community intelligence — marketers surface real buyer language and pain points for content ideation and prospect research without paying for Reddit Pro or GummySearch. |

## Ads & Creative

Ad copy, creative generation, paid channel automation, static and video creative for marketing.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [Meta Ads MCP](https://github.com/pipeboard-co/meta-ads-mcp) | MCP | AI-enabled | ✓ | 776 | 2026-04 | The most-used bridge between agents and Meta Ads Manager — lets a paid marketer ask "which ad set is leaking spend" and get an answer back without clicking through seven Ads Manager tabs. |
| [Google Ads MCP](https://github.com/googleads/google-ads-mcp) | MCP | AI-enabled | ✓ | 377 | 2026-04 | Lets paid teams drive campaigns by natural language without learning the Google Ads UI — the biggest single time-saver for performance marketers running Search and Performance Max in 2026. |
| [Ads MCP (multi-platform)](https://github.com/amekala/ads-mcp) | MCP | AI-enabled | ✓ | 30 | 2026-04 | The fastest way to give an agent multi-channel paid read/write access from a single endpoint — one install unlocks the whole paid stack instead of running four separate MCP servers. |

## Meetings & Conversation Intelligence

Scheduling, recording, note-taking, and call coaching — for sales conversations.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [Meetily](https://github.com/Zackriya-Solutions/meeting-minutes) | App | AI-native |  | 11.1k | 2026-03 | The closest thing to an OSS Granola a rep can run on their own laptop during sales calls — no audio leaves the machine, no vendor hears the deal terms, and the notes land in the seller's own files. |

## Closing

Proposal writers, RFP agents, contract drafting, deal-desk automation.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [auto_rfp](https://github.com/run-llama/auto_rfp) | App | AI-native |  | 202 | 2026-01 | The closest thing to an OSS Loopio for sales and solutions teams — takes the worst part of any enterprise deal cycle (filling 200 questions from procurement) and turns it into a reviewable first draft. |

## Plumbing & Substrate

MCP servers, aggregators, OSS CRMs, agent frameworks, email infrastructure — the layer GTM agents are built on.

| Project | Type | AI | MCP | Stars | Last commit | Why it matters |
|---|---|---|---|---|---|---|
| [CrewAI](https://github.com/crewAIInc/crewAI) | Framework | AI-native | ✓ | 49.0k | 2026-04 | The most common scaffold GTM engineers reach for when building role-based agent systems — pick a prebuilt crew, swap in your own tools and data, and skip weeks of framework plumbing. |
| [Twenty](https://github.com/twentyhq/twenty) | CRM | Substrate | ✓ | 44.0k | 2026-04 | Gives RevOps teams that want full control of pipeline data, custom fields, and workflows a credible core to build on instead of renting Salesforce or HubSpot — and the API is permissive enough for agents to drive the whole thing. |
| [Composio](https://github.com/ComposioHQ/composio) | Aggregator | AI-enabled | ✓ | 27.8k | 2026-04 | The cleanest option when GTM engineers assemble custom agents on LangGraph or the OpenAI Agents SDK — one SDK loads only the tools the agent actually needs, instead of polluting the context window with hundreds of schemas. |
| [Mastra](https://github.com/mastra-ai/mastra) | Framework | AI-native | ✓ | 23.0k | 2026-04 | The strongest choice for Node and TypeScript shops building GTM agents — keeps the entire stack in TS instead of forcing engineers into Python just to use LangChain. |
| [Mautic](https://github.com/mautic/mautic) | App | Substrate |  | 9.4k | 2026-04 | Lets a marketer own their whole automation stack — sequences, segmentation, landing pages — and layer any LLM or agent on top via the API, instead of paying Marketo or HubSpot Marketing Hub forever. |
| [Klavis AI](https://github.com/Klavis-AI/klavis) | Aggregator | AI-enabled | ✓ | 5.7k | 2026-04 | GTM engineers get a single aggregator that handles OAuth and per-agent tool scoping, plus sandboxes to eval agents before production — the fastest way to go from "interesting prototype" to a tested agent in a real org. |
| [Notion MCP](https://github.com/makenotion/notion-mcp-server) | MCP | AI-enabled | ✓ | 4.2k | 2026-03 | Makes Notion the live content and docs substrate for marketing agents — briefs, editorial calendars, and campaign specs become readable and writable by Claude or Cursor without copy-paste. |
| [Google Workspace MCP](https://github.com/taylorwilsdon/google_workspace_mcp) | MCP | AI-enabled | ✓ | 2.1k | 2026-04 | Replaces four or five separate Google integrations with one hardened server, so any GTM agent can read email threads, book meetings, and update spreadsheets without the team standing up its own OAuth gauntlet. |
| [Salesforce DX MCP](https://github.com/salesforcecli/mcp) | MCP | AI-enabled | ✓ | 355 | 2026-04 | Gives RevOps and GTM engineers in Salesforce-shop orgs a first-party, actively-maintained agent interface to pipeline data and admin actions — no more brittle Einstein or Apex copilot glue. |
| [Attio MCP Server](https://github.com/kesslerio/attio-mcp-server) | MCP | AI-enabled | ✓ | 65 | 2026-04 | Attio shops get a feature-complete agent bridge years before the vendor ships an official server, so reps can let Claude or Cursor update the CRM without leaving the conversation. |
| [Clay MCP](https://github.com/clay-inc/clay-mcp) | MCP | AI-enabled | ✓ | — | — | Plugs the enrichment layer that most 2026 GTM engineering teams already depend on straight into agents — the native way to have Claude or Cursor run Clay lookups inside a larger workflow. |
| [HubSpot MCP](https://developers.hubspot.com/mcp) | MCP | AI-enabled | ✓ | — | — | Lets marketers and reps drive the entire HubSpot CRM from an agent without touching the native UI or waiting on Breeze — the default entry point for any HubSpot-shop GTM automation built in 2026. |
| [Zapier MCP](https://github.com/zapier/zapier-mcp) | Aggregator | AI-enabled | ✓ | — | — | Instantly gives an agent read/write access to Outreach, Salesloft, Front, Lemlist, ActiveCampaign, Marketo, Iterable, Close, and every other tool without a native MCP — the fastest way to backfill a long tail of GTM integrations. |

## Watchlist

Projects listed but not fully endorsed — stale maintenance, ToS risk, very early, or otherwise requiring caution.

- [AI-ContentCraft](https://github.com/nicekate/AI-ContentCraft) — A useful template for founders and marketing teams building content pipelines that span text and audio — one codebase to crib from instead of stitching Jasper and ElevenLabs together.
- [aiwriter](https://github.com/kristianfreeman/aiwriter) — A lightweight way for marketers and founders to produce SEO-aware long-form drafts without running their own GPU infrastructure — deploy it to a free Cloudflare account and start shipping posts the same day.
- [Cal.com MCP](https://github.com/Danielpeter-99/calcom-mcp) — Pair it with Cal.com self-hosted for a fully open scheduling stack an agent can drive end-to-end — the right choice for teams that refuse to put their calendar inside Calendly or Chili Piper.
- [Calendly MCP](https://github.com/meAmitPatil/calendly-mcp-server) — Lets a sales agent schedule discovery calls and demos programmatically inside a longer outbound or nurture flow — the prospect gets a booking link in the same message the agent drafts.
- [Customer Outreach Campaign (CrewAI)](https://github.com/shaadclt/Customer-Outreach-Campaign-crewAI) — A clean, minimal starting point for GTM engineers building their own outbound crew — shows exactly how to divide lead profiling and email drafting across agents without fighting framework plumbing.
- [Fire Enrich](https://github.com/firecrawl/fire-enrich) — The cleanest OSS stand-in for Clearbit or ZoomInfo enrichment — drop an email in and get back a structured profile, no per-contact fees and no vendor lock-in.
- [OpenOutreach](https://github.com/eracle/OpenOutreach) — Interesting as a reference for end-to-end LinkedIn outreach automation, but watchlisted because the scraping and automation it performs likely violates LinkedIn's ToS — evaluate legal risk before running it on any real account.
- [Sales Outreach Automation (LangGraph)](https://github.com/kaymen99/sales-outreach-automation-langgraph) — A clean reference architecture GTM engineers can fork to stand up a custom outbound pipeline — shows exactly how to wire research, scoring, and CRM sync into a single LangGraph flow.
- [SalesGPT](https://github.com/filip-michalsky/SalesGPT) — Still useful as a reference for how to structure sales conversation state, but watchlisted — no commits since September 2024, so not a safe production base for a 2026 build.

## Archive

Previously listed projects, now archived upstream or no longer maintained. Kept for historical reference.

- [AgentGPT](https://github.com/reworkd/AgentGPT) — Many early GTM teams forked AgentGPT for prospecting and research bots; archived by the reworkd team in April 2025 and kept here for historical reference only, not as a live base to build on.
- [AI Company Researcher](https://github.com/mayooear/ai-company-researcher) — A clean reference for how to wire LangGraph and Firecrawl into a company-research agent; archived upstream, so still useful as a fork base for SDRs but not a maintained tool.
- [Hunter MCP](https://github.com/hunter-io/hunter-mcp) — Lets an agent resolve "I need a verified email for X at Y" with a single tool call — no custom integration, no brittle scraping, and no paid-per-seat Hunter UI.

## Editorial
- **[SCOPE.md](SCOPE.md)** — the editorial constitution (what is in, what is out, and why)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — how to submit, schema reference, PR rules
- **License** — code under [MIT](LICENSE); entry data under [CC-BY-SA 4.0](LICENSE-DATA)
## Acknowledgements
Prior work that informed scoping: [Specter — AI × GTM Landscape 2025](https://insights.tryspecter.com/ai-x-gtm-landscape-2025/), [joylarkin/Awesome-AI-Market-Maps](https://github.com/joylarkin/Awesome-AI-Market-Maps), [Menlo 2025 State of Generative AI in the Enterprise](https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/), and the broader MCP community.
