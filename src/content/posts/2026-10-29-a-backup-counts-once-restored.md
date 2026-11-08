---
title: "A backup counts once someone has restored from it"
description: "We had backups. What we didn’t have was a restore anyone had tried, or a time we could promise. This is what it took to fix that."
date: 2026-10-29
---

Every platform I've worked on had backups. Far fewer had ever had a restore. You don't notice the difference until the bad day, when someone asks how long until it's back and nobody can answer.

On our platform, user data lives on Kubernetes volumes. Setting up the backups was the easy bit. We use Velero with Kopia: Velero understands Kubernetes objects and volumes, and Kopia makes deduplicated, file-level copies. We keep them for months, so even a problem nobody spots for a few weeks can still be recovered. It's all in code with the rest of the platform. None of this is special.

## The part nobody writes down

The hard part is the restore, and it comes with questions the backup tool doesn't answer for you.

The first is which backups you actually need. Every volume is backed up on its own schedule, so getting back to one point in time means picking the right backup for each volume. That's arithmetic you don't want to do in the middle of an incident, so I wrote a small script that works out the minimal restore chain.

The second is size. Most restore requests aren't "the cluster is gone". They're "I deleted a file". So the runbook starts at a single file and goes all the way up to a full environment.

The third is who can do it. If only the person who set up the backups can restore them, that's a single point of failure with a holiday calendar. I wrote the runbook for someone who has never done a restore before.

## The drill

Then we did it for real on the main databases: restore from backup, check the data, and time the whole thing.

The answer was hours, not days, depending on what you're restoring. The exact numbers are in the runbook now, so the next time someone asks how long until it's back, there's an honest answer.

A green backup job only tells you that data got copied somewhere. You only find out whether it's usable when you restore it, and how long that takes is the number people actually care about. I'd run the drill again after any big change, like a migration. A restore that worked before it is just a guess afterwards.
