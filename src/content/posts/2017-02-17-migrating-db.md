---
title: "Migrating large databases to AWS"
description: "What to plan for when moving a large on-premise Oracle database to AWS: the questions to ask, three ways to move the data, and the checklists around them."
date: 2017-02-17
---

*Written in 2017. Instance types and some AWS services have changed since, but the planning questions and checklists still hold.*

Moving a large on-premise database to AWS is a lot like moving house. Most of the work happens before anything gets moved, and the things you forget are the ones that hurt.

## Ask a lot of questions first

Before starting, I'd get the team to read up: AWS white papers, forum threads, other people's migration stories. You want to know the common problems before you're in the middle of them, and it means you ask the right questions when you sit down to plan:

- How many databases are there, of what type, and with which data types and character sets?
- What kind of load is it? Transactional or batch? What latency is acceptable?
- Can we afford downtime? Why, or why not?
- How much scalability and redundancy is needed?
- Which versions are we running (OS, Oracle and so on), and on what hardware?
- How and when are backups done today?
- Are there security or compliance requirements we need to know about?
- What else talks to this database? Applications, processes, data pipelines. Work out what breaks when it moves.

Then compare your options on the same few things: data integrity, cost, total time, downtime, performance, and how easily you can recover if it fails. If you can, run a small pilot of a couple of approaches and decide from the results.

Two more things before choosing. Don't move data you don't need. Databases used for BI and reporting often carry huge indexes, sometimes half the size of the database, so drop them and rebuild them on the other side. And have a disaster recovery plan, and do the move when load is lowest, like 2 AM on a Sunday.

## Before you start

Everyone knows these steps and people still forget them, so keep a checklist:

- Take a snapshot or backup of the on-premise database, so you have something to roll back to.
- Turn off backups on the target RDS instance. They slow down the bulk load.
- Use the biggest single-AZ instance you can (at the time, db.m4.10xlarge, with provisioned IOPS). Multi-AZ replication only slows the migration down.
- Keep any staging EC2 instances in the same availability zone.
- Open up the security config the migration needs, like traffic between the databases.

## Approach 1: Oracle on EC2

If you need operating system access, you'd run Oracle on EC2 instead of RDS. Given the choice I wouldn't, but some setups need it.

Export the schema (DDL) without data. Export every table under 100 million rows as insert statements, with tables over a million rows in their own session and the small ones together. Compress, encrypt and send those files to the EC2 instance with SFTP (or Tsunami UDP if they're large), then run the inserts with referential integrity turned off. Take MD5 checksums before and after. This part takes a few hours.

Unload the tables over 100 million rows to a commodity drive, ship it to AWS, and load them with SQL\*Loader. A reasonably tuned database should load 400,000 to 800,000 rows a second, so a few terabytes go in quickly. The shipping takes longest, usually a few days. Then turn referential integrity back on.

## Approach 2: Data Pump and Tsunami UDP

RDS doesn't give you OS access, so this approach uses a large EC2 instance with several EBS volumes as a bridge. It only runs for a short time, so the cost doesn't matter much.

Start Oracle Data Pump Export on the on-premise server, with parallel processes and compression. As soon as the first batch of files is ready, start sending them to the bridge instance with Tsunami UDP. FTP and SFTP only use a fraction of your bandwidth, and Tsunami uses all of it.

On the bridge, a Perl script using Oracle's `UTL_FILE` package copies each file into the RDS instance's `DATA_PUMP_DIR` as soon as it arrives. Run several of these scripts at once. At that point the export, the transfer and the copy are all happening at the same time, and that's where the time savings come from. When everything is in, run Data Pump Import from a PL/SQL script, also in parallel.

For a sense of timing: in a benchmark by AWS engineer Abdul Sattar Sait, a 500 GB Oracle database was exported and compressed into 175 GB of files, and the whole process took 6 hours and 42 minutes. Extrapolating roughly, we could do ours in under 15 hours.

## Approach 3: AWS DMS

AWS Database Migration Service does the unloading and loading for you. You set up a replication job, and it watches for failures and replaces hosts that break. When I wrote this I hadn't heard many real stories from people using it, so I'd start with a proof of concept, say a 50 GB Oracle database, and see what goes wrong.

## When you're done

- Run benchmarks. If peak performance is lower than expected, adjust the instance size and IOPS.
- Turn backups back on.
- Turn on Multi-AZ.
- Tighten the security config again.
- Set up CloudWatch alerts.
- Put back anything else you changed for the migration.
