# syed-usman.github.io

Personal blog of Syed Usman, built with [Astro](https://astro.build) and deployed to
GitHub Pages at <https://syed-usman.github.io/>.

## Develop

Requires Node 22.23 or newer.

```sh
npm install
npm run dev      # http://localhost:4321, drafts included
npm run build    # type-check and build into dist/
npm run preview  # serve the built site
```

## Writing

Posts live in `src/content/posts/` as Markdown, named `YYYY-MM-DD-slug.md`:

```md
---
title: "Post title"
description: "One or two sentences, used for search results and link previews."
date: 2026-10-28
draft: true   # optional; drafts only appear in `npm run dev`
---
```

The post is published at `/YYYY-MM-DD/slug/`. The About page is Markdown in
`src/pages/about.md`; the home and Work pages keep their content as data at the
top of `src/pages/index.astro` and `src/pages/work.astro`. Site name, email,
navigation and social links are in `src/site.ts`.

## Deploy

Every push to `main` builds and deploys the site through
`.github/workflows/deploy.yml`.

To serve it from a custom domain later: add `public/CNAME` containing the
domain, set `site` in `astro.config.mjs` (and the sitemap URL in
`public/robots.txt`) to it, set the domain under **Settings → Pages**, and point
its DNS at GitHub Pages.
