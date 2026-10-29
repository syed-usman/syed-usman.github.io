---
title: "A backup counts once someone has restored from it"
description: "Velero, Kopia, a restore runbook and a drill: what it takes to turn “we have backups” into a number you can say out loud."
date: 2026-10-29
---

Every platform I've worked on has had backups. Far fewer have had restores. The difference only shows up on the worst day, when someone asks "how long until it's back?" and nobody knows.

On a platform where user data lives on Kubernetes volumes, this is how we got from "backups are configured" to "here's how long a restore takes, and here's the runbook".

## What we back up, and how

- **Velero with Kopia** for Kubernetes volume backups. Velero knows about Kubernetes objects and volumes; Kopia does the file-level, deduplicated copies.
- **Retention measured in months, not days**, so a problem nobody notices for a few weeks is still recoverable.
- Everything defined in code alongside the rest of the platform, not clicked together once and forgotten.

None of this is unusual. That's the point: the backup half is the easy half.

## The restore half

A restore has questions the backup tool can't answer for you:

- **Which backups do I need?** With many volumes backed up on their own schedules, getting back to one point in time means picking the right backup for each volume. I wrote a small script that works out the minimal restore chain across volumes, so nobody has to do that arithmetic during an incident.
- **What's the smallest thing I can restore?** Most requests aren't "the cluster is gone". They're "someone lost a file". The runbook covers every size, from a single file to a full environment.
- **Who runs it?** If only the person who set up backups can restore them, you have a single point of failure with a holiday calendar. The runbook is written for someone who has never done it.

## The drill

Then we did it for real, on the main databases: restore from backup, check the data, and time it end to end.

The measured answer was **hours, not days**, depending on what's being restored. The exact range is now written down in the runbook, so the next time someone asks how long until it's back, there's an honest answer.

## What I'd tell the next person

- **Time the restore, not the backup.** A green backup job tells you data was copied. Only a restore tells you it's usable, and how long it takes.
- **Write the runbook for a stranger.** Write it for whoever is on call at the worst possible moment, not for yourself.
- **Automate the arithmetic.** Anything you'd have to work out under pressure, like which backups make up a consistent restore, belongs in a script.
- **Drill again after big changes.** A restore that worked before the last migration is a hypothesis now.
