# DevDataWorks website

The official website of DevDataWorks, built with [Astro](https://astro.build) as a fully static site and deployed to GitHub Pages.

## Development

Requires Node.js 22 (see `.nvmrc`).

```sh
npm install
npm run dev       # http://localhost:4321/
npm run build     # type-checks, then builds to dist/
npm run preview   # serves the production build
```

## Project structure

```
src/
  assets/       Logo (transparent web version + original master)
  components/   Header, Footer, hero visual, icons, shared sections
  config/       site.ts: organization details, navigation, URL helper
  data/         content.ts: pillars, expertise, sectors, approach, principles
  layouts/      Base layout with SEO, Open Graph and structured data
  pages/        Home, About, Expertise, Sectors, Contact, 404, robots.txt
  styles/       global.css: design tokens and shared primitives
public/         Favicons, web manifest, Open Graph image
```

Most copy lives in `src/data/content.ts`, so pages stay consistent when it changes.

## Before launch

Update the placeholder details in `src/config/site.ts`:

- `email`: currently `hello@devdataworks.org`, which must be a working mailbox. The contact form composes an email to this address.
- `location`: empty (hidden) until confirmed.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and deploys to GitHub Pages. Pull requests are built but not deployed.

One-time setup: in the repository **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is published at `https://dev-data-works.github.io/` (this repository is the organization's `*.github.io` site). To use a custom domain, add repository variables (Settings → Secrets and variables → Actions → Variables):

| Variable    | Example                    |
| ----------- | -------------------------- |
| `SITE_URL`  | `https://devdataworks.org` |
| `BASE_PATH` | `/`                        |

Then configure the domain under Settings → Pages.

## Brand

Colors are taken from the logo: navy `#0b3558`, blue `#2a6f99`, green `#65963b`. Typography is Instrument Sans, self-hosted. All design tokens are defined at the top of `src/styles/global.css`.
