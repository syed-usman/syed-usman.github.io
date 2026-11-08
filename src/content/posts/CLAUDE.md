# Writing posts

Each post is a Markdown file in this folder, named `YYYY-MM-DD-slug.md`. It is
published at `/YYYY-MM-DD/slug/` (see `postSlug` in `src/site.ts`). Never
rename a published post: the URL would change and existing links would break.

This file is the only `.md` file here that isn't a post. The collection in
`src/content.config.ts` only loads files whose names start with a digit, so a
post filename must start with its date.

## Frontmatter

```md
---
title: "Post title"
description: "One or two sentences, used for search results, link previews, the feed and llms.txt."
date: 2026-10-28
draft: true   # optional; drafts only appear in `npm run dev`
---
```

- `title` and `date` are required. `description` is optional in the schema
  but every published post has one, so always write one.
- Drafts show a "draft" badge locally and are left out of the built site,
  the feed and the llms files. Remove `draft: true` to publish.
- A post shows up automatically on Home, Writing, `/atom.xml`, `/llms.txt`
  and `/llms-full.txt`. Nothing else needs updating, unless it should also
  be a case study on the Home page (the `cases` array in
  `src/pages/index.astro`).

## Images

No post has images yet. When one does, put them in
`src/assets/posts/<slug>/` and reference them relative to the post, with the
caption straight after:

```md
![Describe the photo for screen readers](../../assets/posts/the-200-user-wall/diagram.png)
<p class="photo-caption">What the caption says.</p>
```

## Who reads these

Mostly engineers and tech leads deciding whether to hire Syed, some of them at
large tech companies, plus recruiters and HR. They skim. A post has to show
real experience in a few minutes, and it must not read as if an AI wrote it.
That costs more trust than a typo does.

## Length

**3 minutes, 5 at the most.** That's about 700 words, never more than 1,150.
The reading time is shown on every post (`readingTime` in `src/site.ts`,
230 words a minute), so check it in `npm run dev` before publishing.

## How the posts read

The best engineering writing is concrete, personal and short: Cloudflare's
incident posts, Julia Evans, Charity Majors ("Keep it short, keep it snappy.
Edit twice as much as you write."), Dan Luu's point that good company blogs
keep the specifics that weaker ones edit out. The 2021 IoT post is closest to
Syed's own voice. Match it.

- **Tell what happened, in order, in the first person.** A problem, what we
  tried, what was wrong, what fixed it. A story, not a list of advice.
- **Keep the specifics:** numbers, tool names, the exact error, the wrong
  guess. Those details are what make it believable.
- **Write how Syed talks:** plain words, contractions, short sentences mixed
  with longer ones. An opinion now and then ("the annoying part", "the user
  nodes never needed ingress traffic in the first place").
- **Mostly paragraphs.** Two or three `##` headings at most. A bullet list
  only when the content really is a list.
- **End plainly**, in a sentence or two. No closing list of lessons.
- **Never add a fact, number, feeling or anecdote that isn't from Syed.**
  If a post needs a real detail, ask Syed for it.
- **Never name** employers, clients, vendors, cloud providers or internal
  settings. Say "a cloud load balancer", "a large hardware vendor", "our
  platform". Rounded results are fine where exact ones would be sensitive
  ("hours, not days").
- Curly quotes and apostrophes in frontmatter, en dashes for ranges.

### Patterns that make writing read as AI-generated

Cut these on sight:

- Every bullet starting with a bold phrase.
- The same structure in every post, especially a "What I'd tell the next
  person" or "Key takeaways" list at the end.
- Quotable one-liners and slogans: "A fix that isn't in code isn't a fix.
  It's a countdown to the next deploy."
- "X, not Y" contrasts in every other sentence, and colon reveals ("The
  answer: …", "Here's the thing:").
- Signposting: "Here's how…", "Let's dive in", "In this post I will…".
- Titles with a colon and a subtitle. Keep titles short.
- Words like leverage, robust, seamless, crucial, delve, journey, landscape,
  game-changer.

Older posts (2017, 2021) are kept for their URLs. If one is out of date, add
an italic note at the top instead of rewriting it, like the one in
`2017-02-17-migrating-db.md`.
