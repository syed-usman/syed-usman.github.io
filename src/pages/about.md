---
layout: ../layouts/Page.astro
title: About
eyebrow: About
lead: "I’m Syed, an infrastructure engineer in Berlin. I like the problems that only show up in production, and I like making sure they only show up once."
description: "About Syed Usman, an infrastructure engineer and former Solutions Architect in Berlin: background, how he works, and how to get in touch."
---

## The short version

I studied software engineering at NUST in Islamabad, graduated as a gold medallist in 2015, and started my career at YotaScale, working between Palo Alto and Lahore on a pipeline that dug through AWS bills to find waste. It was my first lesson that infrastructure is mostly about paying attention to what's actually happening, not what the diagram says.

In 2017 I moved to Berlin. After a year at Colormass moving a Django monolith onto Kubernetes, I joined Relayr and spent five years in industrial IoT, growing from solutions engineer to senior solutions engineer to solutions architect. As an architect I was also the tech lead of a cross-functional team of 6–10 engineers, without the title. Hardware is a strict teacher. A bad deploy to a cloud service costs you an hour, but a bad deploy to a gateway bolted inside an elevator shaft costs you a site visit. I learned a lot about vendors, over-the-air updates and debugging a mess of wires at midnight.

Since then I've built AWS platforms at Jillion, and today I'm a Senior DevOps/Infrastructure Engineer at [Multiverse](https://www.multiverse.io) (I joined StackFuel, which Multiverse acquired in 2025), running the Kubernetes platform behind hands-on courses for 10,000+ learners. The full history is on [my work page](/work/).

## How I work

- **Evidence first.** When something breaks, I instrument every layer and rule causes out one at a time. I write down what was ruled out, including my own wrong guesses, so nobody repeats them.
- **Codify, don't patch.** A live fix isn't done until it's in Terraform, Helm or Ansible. A manual change gets reverted by the next deploy, usually at the worst time.
- **Recovery you can actually run.** A backup counts once someone has restored from it. I write the runbook and then run the drill.
- **Short docs that explain why.** Runbooks, ADRs and known-issues pages that record the reasoning as well as the steps.
- **Guardrails for AI agents.** Agents get their own least-privilege identity, short-lived credentials, a sandbox and default-deny tool access. Anything they read from a ticket or a web page is untrusted input.
- **Leading means unblocking.** As a tech lead I hired, ran 1:1s, planned with clients and ran incidents. Most of the job was making it easy for the team to ship.

## The work I enjoy most

Reliability problems that cross layers, platforms that other teams depend on, and teams that care about writing things down. I'm happiest somewhere between hands-on engineering and helping a team decide what to build next, whether that's as a lead or staff engineer or as an engineering manager who still reads the dashboards.

## Languages and certification

I speak English natively and German at B1, improving slowly. I earned the AWS Solutions Architect – Associate certification in 2018, though most of what I know came from production.

## Get in touch

The best way to reach me is email: [syedusmankaleem@live.com](mailto:syedusmankaleem@live.com). I'm also on [LinkedIn](https://www.linkedin.com/in/syedusmankaleem/) and [GitHub](https://github.com/syed-usman).
