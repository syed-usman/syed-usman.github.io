---
title: "An allow-list is not a sandbox: guardrails for AI agents on real infrastructure"
description: "What I learned giving Claude its own identity, credentials and sandbox so it could investigate infrastructure issues without anyone’s keys."
date: 2026-10-29
---

The fastest way to let an AI agent help with infrastructure is to run it on your laptop, with your credentials. That's also the fastest way to give it everything you can do, including the things you'd never do on purpose.

We wanted Claude to investigate and resolve infrastructure issues on its own, sometimes unattended. Here is how we set it up, and the one misunderstanding I see most often.

## Give the agent its own identity

The agent doesn't borrow a human's access. It has a dedicated identity of its own:

- **Least privilege, scoped read-only.** It can look at almost everything it needs to investigate and change almost nothing.
- **Short-lived, OIDC-federated credentials.** No long-lived keys sitting in a config file. If a token leaks, it expires soon.
- **Network allow-listing.** It can reach the endpoints it needs and nothing else.
- **Full audit logging.** Every action is attributable to the agent, not to whichever engineer happened to start it.

If you've designed access for a CI system, none of this is new. That's the right mental model: an agent is a service account that writes its own scripts.

## Run it somewhere it can't hurt you

Unattended runs happen in Docker sandboxes, isolated from production. The agent can dig into a problem and try things there without production being in reach.

Elsewhere, an automation tool's built-in AI assistant needed to execute code. We isolated it in sysbox-runc sandboxes and removed the privileged fallback, because a sandbox with a "run privileged if this fails" escape hatch is a sandbox in name only.

## The misunderstanding: allow-lists don't block anything

I also co-built a Claude Code pipeline that takes a Jira ticket to a merge request: competing planners, test-first implementation, review subagents and two human approval gates.

When we started, the obvious guardrail was a tool allow-list. But in Claude Code, an allow-list only means "don't ask me before running these". It doesn't block anything that isn't on it; it just asks. And a person approving prompts all day eventually stops reading them.

So I wrote a **default-deny tool-access hook**: anything not explicitly permitted is refused, not prompted.

## Treat what the agent reads as untrusted

The pipeline reads ticket text, and anyone who can file a ticket can write instructions in it. We treat that text as untrusted input, the same way you'd treat a form field in a web app: data to act on, never instructions to follow.

## What I'd tell the next person

- **Agents get service accounts, not people's accounts.** Own identity, least privilege, short-lived credentials, audit logs.
- **Know what your guardrail actually does.** "Allowed without asking" and "everything else blocked" are different controls.
- **Sandboxes don't have escape hatches.** If there's a privileged fallback, assume it will be used.
- **Every input is a potential prompt.** Tickets, web pages, logs: if the agent reads it, an attacker can write it.
