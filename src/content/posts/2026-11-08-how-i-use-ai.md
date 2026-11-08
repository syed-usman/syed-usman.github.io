---
title: "How I do almost all my work with AI now"
description: "About 3,600 prompts in five months, most of them shorter than this sentence. What I hand to Claude, what I keep, and where it still goes wrong."
date: 2026-11-08
---

Between June and October this year I sent Claude about 3,600 prompts. I know because I asked it to go through my history and count. The median prompt was 45 characters long. Most of them are short corrections, things like "git reset and start fresh".

That's probably the most honest summary of how I use it. I don't write long, careful prompts. I steer.

## At work

My day job is infrastructure: Kubernetes, Terraform, Helm, Ansible, CI. Over the past year about 99% of that work has gone through Claude. My part is deciding what we're doing, checking what comes back, and stopping it when it heads somewhere I didn't ask for.

Anything I do on a regular basis becomes a skill. Some projects run on a harness, sometimes the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD), more often a simple one we built and tuned for our team. Others don't need one. A few of the best skills we use came from [Matt Pocock](https://github.com/mattpocock/skills).

My favourite one is a set of skills that learn how my colleagues review code. Every reviewer has things they always pick up on. The skills spot those patterns and check my merge requests for them before anyone sees them, so ideally nobody has to leave a comment at all.

I work one ticket per branch, often several at once in separate git worktrees, with skills and subagents for the repetitive parts and jobs running in the background. Some days that adds up to more than a thousand messages.

I also co-built a pipeline that takes a ticket all the way to a merge request. It starts by asking clarifying questions. Then three planners each write a plan (a minimal one, one that fits the existing codebase, and the ideal one) and the plans get scored against a rubric. After that it writes the tests first, implements, and a group of review subagents check the result for security, edge cases, testability, architecture and drift from the plan. Finally it writes an ADR and opens the merge request. There are two points where a person has to approve, and it stops before merging.

What I'm most careful about is what it's allowed to touch. I wrote about the guardrails in [another post](/2026-10-29/guardrails-for-ai-agents/). The short version is that an allow-list only skips the prompt, so we deny by default, and ticket text counts as untrusted input.

## Where it goes wrong

The mistakes are pretty consistent. It starts work on the wrong branch or the wrong merge request. It does more than I asked: I want stubs and get the full logic, I ask for a story and get an epic. Sometimes it does things nobody asked for, like creating DNS records. Once it called something a "major gap" when it really wasn't.

Each of those costs me an interruption, and the same ones kept coming back across sessions. Some of that is on me. A 45-character prompt leaves a lot unsaid.

We also took out things that didn't pay off. The pipeline used to enforce which files a plan was allowed to change. We removed that and rely on review instead, and the memory it keeps between runs ended up as a single file.

## At home

Outside work it's smaller stuff. This website is built and maintained with Claude Code, including the writing guide it follows so the posts don't sound like an AI wrote them. I also have a skill built from about 800 of my own LinkedIn conversations, so draft replies to recruiters sound like me. It never sends anything. It drafts, and I decide.

When I updated my CV, I asked my work Claude to go through my git history, tickets and prompts and tell me what I'd actually done. It labelled every claim as seen, inferred or unknown, and pointed out where my memory and the evidence disagreed. That was more useful than anything I'd have written about myself, and less flattering.

## What I've settled on

I let it do the typing and I keep the decisions. What it builds gets reviewed like a colleague's work, and anything it can touch gets the same rules as a service account.

What I'm still working on is saying the scope up front instead of fixing it afterwards. Short prompts are fast, right up until you correct the same mistake again.
