<!--
Thanks for contributing to gtm-ai-stack.
Read SCOPE.md and CONTRIBUTING.md before opening a PR.
-->

## Summary

<!-- One line. What does this PR change? -->

## Type of change

- [ ] New entry (added a file under `data/entries/`)
- [ ] Update to an existing entry
- [ ] Removal (archived / out-of-scope / dead project)
- [ ] Infra (scripts, CI, site tooling)
- [ ] Docs (SCOPE, CONTRIBUTING, README template, etc.)

## Editorial checklist (required for new entries and updates)

- [ ] `npm run validate` passes locally — schema is valid
- [ ] Slug is kebab-case and matches the YAML filename (`data/entries/<slug>.yaml`)
- [ ] Entry is in exactly one of the 9 categories defined in [SCOPE.md](../SCOPE.md)
- [ ] `why_it_matters` passes the sniff test: names a specific GTM job, persona, and outcome — no marketing adjectives
- [ ] `closed_alternative` names a real incumbent (or is justifiably `null`)
- [ ] `npm run check:links` passes — all URLs resolve
- [ ] No duplicate slug and no duplicate-in-spirit of an existing entry
- [ ] Entry passes the 3-rule test in [SCOPE.md](../SCOPE.md): GTM job-to-be-done, AI-native or meaningfully AI-augmented, OSS or open component

## Notes for the curator

<!--
Anything the curator should know? E.g.:
- Why this one belongs when a similar entry already exists
- Why closed_alternative is null
- Why the category choice was non-obvious
-->
