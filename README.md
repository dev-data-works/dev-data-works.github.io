# DevDataWorks website

The official website of DevDataWorks, built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages. No client-side framework, no analytics, no third-party scripts; the only JavaScript is the small inline script for the mobile menu.

## Development

Requires Node.js 22 (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321/
npm run build     # type-checks, then builds to dist/
npm run preview   # serves the production build
npm run verify    # build + link check + content check + check self-test
```

## Project structure

```
src/
  assets/         Logo; platforms/ holds official platform logos (see SOURCES.md there)
  components/     Header, Footer, sections, ContactCta, Diagram, PatternEntry, ...
    diagrams/     Static SVG architecture diagrams, one per system pattern
  config/         site.ts: organisation facts, contact, team, navigation, helpers
  data/           content.ts: system patterns, capabilities, sectors, platforms, stack, copy
  layouts/        Base layout with SEO, Open Graph and structured data
  pages/          Home, Work, Expertise, Sectors, About, Contact, 404, robots.txt
  styles/         global.css: design tokens, editorial primitives, motion contract, print
scripts/          Build checks, their fixtures, and the OG image template
public/           Favicons, web manifest, Open Graph image
```

## Where things live

- **Copy** is in `src/data/content.ts` and `src/config/site.ts`, so pages stay consistent when it changes.
- **Empty means hidden.** These fields are hidden while empty and appear everywhere they belong (footer, About, Contact, JSON-LD) once filled in, with no page changes: `org.legalName`, `org.jurisdiction`, `org.registration`, `org.location`, `contact.whatsapp` (business number only), `links.github`, `team[].name`, `team[].years`.
- **Contact.** `contact.email` is the single address used everywhere. While `contact.emailIsPlaceholder` is `true`, every contact element carries a marker, JSON-LD omits the contact point, and **the deploy fails**. Set it to `false` once the mailbox is live and tested.

## System patterns and diagrams

`/work` describes kinds of systems the team designs. To add or change one:

1. Edit the entry in `patterns` (`src/data/content.ts`): problem, exactly three features, stack, caption and flow steps.
2. Link it from the relevant `capabilities[].patterns` and `sectors[].patterns` (links are stored only there).
3. Add the diagram (nodes with kind, label, grid position and icon; edges) to `scripts/build-diagrams.py`, run `python3 scripts/build-diagrams.py`, and register the new SVG in `Diagram.astro`.

Diagrams are icon cards on a grid (card 128 × 76, column pitch 150, row pitch 112). Card kinds: `person` (green), `app` and `service` (white), `store` (blue tint), `external` (dashed). Icons come from `src/data/tool-icons.ts` (the same brand icons as the stack chips), `src/assets/platforms/`, or the script's own line-icon set. The numbered flow under each drawing is its text alternative, so keep the two in step.

## Content rule (check before every push)

Nothing on the site, in its metadata, or in commit messages and issue text may point to a specific project. Before pushing, check:

- no client, employer, product or project names, and no personal names;
- no region below continent level, and no language, channel provider or figure tied to one project;
- each pattern lists at most three features, each common across the sector;
- no combination of features distinctive enough to identify one project;
- no screenshots of real systems.

The content check enforces the names part automatically (below). The rest is a human review.

## Checks

| Command | What it checks |
| --- | --- |
| `npm run check:links` | Every internal link and `#anchor` in `dist/` resolves, and the anchors older links may use (`/#approach`, `/#expertise`, `/expertise#…`, `/sectors#…`) still exist. |
| `npm run check:content` | No denylisted term appears in `dist/` or in any tracked file. With `--deploy`, also fails on the placeholder email or a missing denylist. |
| `npm run test:checks` | Proves each check rejects a known-bad fixture (`scripts/fixtures/`). |
| `npm run lighthouse` | Lighthouse CI on all seven pages: transfer size, script size and accessibility block; performance score, LCP and CLS warn. Locally, set `CHROME_PATH` to a Chrome or Chromium binary. |

**Denylist.** The list of terms that must never be published is kept out of the repository on purpose (a committed list would publish the names it protects):

- **Locally:** create `.content-denylist` (gitignored), one term per line, `#` for comments. Run `npm run verify` before every push.
- **CI (one-time setup):** add a repository secret `CONTENT_DENYLIST` (Settings → Secrets and variables → Actions → Secrets) with the same lines. A push to `main` fails while it is missing.

## Open Graph image

`public/og-image.jpg` is rendered from `scripts/og/og.html`:

```sh
npm run og
```

## Deployment

`.github/workflows/deploy.yml` builds and checks every push to `main` and every pull request, and deploys to GitHub Pages only from `main` and only if every check passes. Pull requests upload the built site as a `site-preview` artifact.

One-time setup: in the repository **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is published at `https://dev-data-works.github.io/`. To use a custom domain, add repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable    | Example                    |
| ----------- | -------------------------- |
| `SITE_URL`  | `https://devdataworks.org` |
| `BASE_PATH` | `/`                        |

Then configure the domain under Settings → Pages.

**Rollback:** `git revert` the commits in question and push. A revert does not remove anything already published from git history or caches, so the content rule above is the real safeguard.

## Brand

Colours come from the logo: navy `#0b3558`, blue `#2a6f99`, green `#65963b` (`#4a7a2a` for text). Typography is Instrument Sans (weight axis, Latin subset preloaded), self-hosted. All tokens are defined at the top of `src/styles/global.css`.

Motion is CSS only. Section headings reveal and diagrams draw as they scroll into view, only in browsers that support scroll-driven animation and only when the reader has not asked for reduced motion. Everywhere else, content is fully visible from the start.
