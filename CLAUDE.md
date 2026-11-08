# syed-usman.github.io

Personal site and blog of Syed Usman (Syed Usman Kaleem), a Senior DevOps &
Platform Engineer in Berlin who does almost all of his infrastructure work with
AI agents. Built with [Astro](https://astro.build) 7 and
deployed to GitHub Pages at <https://syed-usman.github.io/>.

This file is the project's only documentation, for agents and humans alike.
Rules for writing posts are in `src/content/posts/CLAUDE.md`.

## Private context

The repo is public. `.context/` is git-ignored and only exists on Syed's
machine. It holds background material for writing posts and site copy:

- `.context/work-ai-profile.md`: an evidence-based profile of Syed's work
  from Syed's work Claude (projects, numbers, AI use, gaps), with every claim
  labelled SEEN, INFERRED or UNKNOWN. Only use SEEN facts without asking,
  and never publish its provider names, commit counts or weaknesses section.

Never move anything from `.context/` into a committed file without checking
the privacy rules below.

## Commands

Requires Node 22.12 or newer (Astro's minimum).

```sh
npm install
npm run dev      # http://localhost:4321, drafts included
npm run build    # astro check (type-check) + build into dist/
npm run preview  # serve the built dist/
```

Run `npm run build` before every commit. Type errors fail it, and a failing
build means a failed deploy.

## Deploy

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`
(`withastro/action` + `actions/deploy-pages`). There is no staging: **pushing
to `main` publishes to the live site.** Only commit or push when asked.

## Where things live

| Path | What it is |
| --- | --- |
| `src/site.ts` | Site name, `tagline` (browser tab and search results), `headline` (the Home `<h1>`), job title, email, nav, social links; post helpers (`getPosts`, `postUrl`, dates, reading time) |
| `src/pages/index.astro` | Home page: hero, "How I work now" (AI), `numbers`, `cases`, posts, and "Working together" (roles, work setup, facts, email and CV buttons) |
| `src/pages/work.astro` | Work page. Content is data at the top (`glance` career strip, `strengths`, `roles` with photos, `toolbox`) |
| `src/pages/about.astro` | About page: the story as HTML at the bottom of the file, with photos beside each section via `Figure` |
| `src/pages/writing.astro` | List of all posts |
| `src/pages/[...slug].astro` | Renders each post, with newer/older links |
| `src/pages/atom.xml.ts` | Atom feed at `/atom.xml` (kept Atom for subscribers from the old Jekyll site) |
| `src/pages/llms.txt.ts`, `llms-full.txt.ts` | Plain-text summaries for AI agents, built by `src/llms.ts` |
| `src/llms.ts` | Hand-written profile (experience, skills, education) used by both llms files |
| `src/layouts/Base.astro` | HTML shell: meta tags, Open Graph image, JSON-LD structured data, header, footer |
| `src/layouts/Page.astro` | Layout for Markdown pages (`title`, `eyebrow`, `lead`, `description` frontmatter); currently unused |
| `src/components/PostList.astro` | Post list used on Home and Writing |
| `src/components/Figure.astro` | Responsive photo with caption (`src`, `alt`, `caption`) |
| `src/content.config.ts` | Post schema (`title`, `description?`, `date`, `draft`) |
| `src/content/posts/` | Blog posts, see `src/content/posts/CLAUDE.md` |
| `src/styles/global.css` | All styles, with light and dark mode via `prefers-color-scheme` |
| `src/assets/` | Images processed by Astro: `display-picture.jpg` (portrait), `about/`, `work/` |
| `scripts/og-card.mjs` | Builds `public/og-card.jpg`, the 1200×630 link-preview image. Re-run with `node scripts/og-card.mjs` after changing the portrait, title or headline |
| `public/` | Copied as-is: favicon, `robots.txt`, Google Search Console verification file, `og-card.jpg`, `syed-usman-cv.pdf` |

## Things that aren't obvious from the code

- **Keep facts in sync.** Work history and numbers appear in
  `src/pages/work.astro`, `src/pages/index.astro`, the hand-written profile
  in `src/llms.ts`, `SITE.description` in `src/site.ts`, the link-preview
  card and the CV. When one changes, update the others.
- **The CV** is built in Syed's separate `resume` repo
  (`~/Documents/code/resume`, private): edit `cv/lead-infra-engineer.tex`,
  run `make cv/lead-infra-engineer.pdf` there (add `-g` to `latexmk` if it
  says up to date), then copy the PDF to `public/syed-usman-cv.pdf`.
- **Positioning.** Title: "Senior DevOps & Platform Engineer". Open to staff,
  lead and engineering manager roles, and freelance. Say it quietly ("always
  happy to hear about…"), never "actively looking". Work setup is phrased
  positively: "I work from my own office near Berlin, and I'm there in person
  for onboarding, workshops and the moments that matter." Never say "no office
  days". Location is "Berlin". Only claim AI work on infrastructure, not web
  development or apps.
- **No GitHub link.** Syed's GitHub profile is sparse, so the site doesn't
  link to it.
- **URLs keep the old Jekyll format.** `trailingSlash: 'always'` and
  `build.format: 'directory'` in `astro.config.mjs`, and posts at
  `/YYYY-MM-DD/slug/`. Changing either breaks existing links and search
  results, so don't.
- **Internal links need the trailing slash**, e.g. `/work/`, not `/work`.
- **Privacy.** The site doesn't name current or past employers' clients,
  vendors, cloud providers or internal settings in posts, and has no phone
  number. Employer names appear only on the Work page and in `src/llms.ts`.
  People other than Syed in photos have their faces blurred.
- **Images go in `src/assets/`**, not `public/`, so Astro resizes and
  optimises them. In `.astro` pages, import the image and use `Figure`:

  ```astro
  import Figure from '../components/Figure.astro';
  import deskToday from '../assets/about/desk-today.jpg';

  <Figure src={deskToday} alt="Describe the photo for screen readers" caption="My desk today." />
  ```

  In Markdown, use a relative path with a `<p class="photo-caption">` straight
  after. On the Work page, add photos to a role's `photos` array instead.
- **Text style.** Curly quotes and apostrophes (’ “ ”) and en dashes for ranges
  (2015–2017) are used throughout the site. Keep them.

## Custom domain (not set up)

To serve the site from a custom domain:

1. Add `public/CNAME` containing the domain.
2. Change `site` in `astro.config.mjs`.
3. Change the sitemap URL in `public/robots.txt`.
4. Change the `Website:` line in `src/llms.ts`.
5. Set the domain under **Settings → Pages** on GitHub and point its DNS at
   GitHub Pages.
6. Verify the new domain in Google Search Console.

## Commits

Short imperative subject line describing the change from a reader's point of
view, e.g. "Add photos from relayr to the work page".
