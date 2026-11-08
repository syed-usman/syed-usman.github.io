---
title: "An allow-list is not a sandbox"
description: "What I learned giving Claude its own identity, credentials and sandbox, so it could look into infrastructure problems without borrowing anyone’s keys."
date: 2026-10-29
---

The quickest way to let an AI agent help with infrastructure is to run it on your laptop with your own credentials. It's also the quickest way to hand it everything you're allowed to do, including the things you would never do on purpose.

We wanted Claude to look into infrastructure problems and fix them on its own, sometimes with nobody watching. This is how we set that up, and the mistake I see people make most often.

## Its own identity

The agent doesn't borrow anyone's access. It has its own identity, and we treat it like any other service account. It can read almost everything it needs to investigate, and change almost nothing. Its credentials are short-lived and OIDC-federated, so there are no long-lived keys sitting in a config file, and a leaked token expires soon anyway. It can only reach the endpoints it needs, and everything it does is logged as the agent, not as whichever engineer happened to start it.

If you've ever set up access for a CI system, none of this will surprise you. That's how I think about it: an agent is a service account that writes its own scripts.

Unattended runs happen in Docker sandboxes, away from production, so the agent can dig around and try things without production being in reach. One thing to watch for: some tools fall back to running privileged when the sandbox doesn't work. Remove that fallback. A sandbox with an escape hatch isn't really a sandbox.

## The allow-list mistake

A common next step is a Claude Code pipeline that goes from a ticket to a merge request, with planning, tests first, review subagents and people approving at the gates.

When we started, the obvious guardrail was a tool allow-list. But in Claude Code an allow-list only means "don't ask me before running these". Anything that isn't on the list isn't blocked. It just asks. And someone who approves prompts all day stops reading them pretty quickly.

So I wrote a hook that denies by default. If a tool isn't explicitly allowed, it's refused, not prompted.

## Tickets are input too

A pipeline like that reads ticket text, and anyone who can file a ticket can write instructions in it. So we treat ticket text the way you'd treat a form field in a web app: something to act on, never something to obey. The same goes for web pages and logs. If the agent reads it, someone else can write it.

Most of this is old advice. We already know how to handle service accounts and untrusted input. The agent is just a new place to apply it.
