---
title: "A backup counts once someone has restored from it"
description: "Velero, Kopia, a restore runbook and a drill: what it takes to turn “we have backups” into a restore time you can say out loud, and how to run your first drill."
date: 2026-10-29
---

Every platform I've worked on has had backups. Far fewer have had restores. The difference only shows up on the worst day, when someone asks "how long until it's back?" and nobody knows.

This post is about how we closed that gap on a Kubernetes platform, and how you can find out where you stand on yours.

## What was at stake

On this platform, the data that matters lives on Kubernetes **persistent volumes**: disks that outlive the pods using them. Users' files live on them, and so do the databases the platform runs on. If a volume is lost or corrupted, that's someone's work gone, or the whole platform down.

Two numbers describe how well you're protected, and they're worth knowing by name:

- **Recovery point objective (RPO):** how much data you can afford to lose, measured in time. Nightly backups mean you can lose up to a day.
- **Recovery time objective (RTO):** how long you can afford to be down while you restore.

Most teams can tell you their RPO, because it's just the backup schedule. Very few can tell you their RTO, because the only way to know it is to restore something and time it.

## What we back up, and how

- **[Velero](https://velero.io) with [Kopia](https://kopia.io)** for volume backups. Velero understands Kubernetes: it knows which volumes belong to which workloads and can put them back. Kopia does the actual copying, deduplicated, so unchanged files aren't stored twice.
- **Retention measured in months, not days**, so a problem nobody notices for a few weeks is still recoverable. Silent corruption is usually noticed late.
- **Everything defined in code** alongside the rest of the platform, not clicked together once and forgotten.

None of this is unusual. That's the point: the backup half is the easy half.

## The restore half

A restore raises questions the backup tool can't answer for you:

- **Which backups do I need?** Many volumes are backed up on their own schedules. Getting the platform back to one point in time means picking the right backup for each volume, so the database and the files it points to match. I wrote a small script that works out that set across volumes, so nobody has to do the arithmetic during an incident.
- **What's the smallest thing I can restore?** Most requests aren't "the cluster is gone". They're "someone lost a file". The runbook covers every size, from a single file to a full environment.
- **Who can run it?** If only the person who set up backups can restore them, you have a single point of failure with a holiday calendar. So the runbook is written for someone who has never done it.

## The drill

Then we did it for real on the main databases: restore from backup, check the data is complete and usable, and time it end to end.

The answer was **hours, not days**, depending on what's being restored. The exact range is now written in the runbook. Next time someone asks how long until it's back, there's an honest answer instead of a guess.

## What this means for you

You can find out where you stand this week. Answer these honestly:

1. **When did anyone last restore from your backups?** Not "check the backup job is green": actually put the data back. If the answer is never, your restore time is unknown.
2. **Could someone who didn't set up the backups restore them**, using only what's written down?
3. **Do you know which backups make up one consistent restore point** across your database and the files or volumes that go with it?

If any answer is "no" or "not sure", run a small drill:

- **Pick one real volume or database** that matters, not a toy one.
- **Restore it somewhere harmless**: a scratch namespace or a separate database instance, never on top of production.
- **Check the data, not just the exit code.** Open the files and query the tables. A restore that "succeeded" onto an empty disk is still a failure.
- **Time it from "we've decided to restore" to "users can work again"**, and write that number down. That's your real recovery time.
- **Fix the first thing that went wrong** in the runbook, and run the drill again after any big migration. A restore that worked before the last migration is a guess now.

The backup job going green tells you data was copied. Only a restore tells you it's usable, and how long it takes to get back.
