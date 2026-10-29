---
title: "Migrating large databases to AWS"
description: "What to plan for when moving large on-premise databases to AWS: transfer mechanisms, downtime, RDS sizing and migration time."
date: 2017-02-17
---
*Written in 2017. Instance types and some services have moved on since, but the planning questions and checklists still hold.*

If you are moving a large on-premise database into the cloud, read on; it will help.

AWS provides a few choices for deploying large-scale solutions in a rapid, reliable, and cost-effective manner. That said, there are quite many things that come to mind when tearing down on-premise data centers and making the move to AWS. A migration project is akin to you moving someplace. There’s a lot of things that need to be considered.

Here is a list of some of the key things we’d need to deliberate upon as we dive into this process:

- Number & Type of databases
- Data Types & Character Sets
- Data Transfer Mechanism
- Downtime sensitivity
- Choosing the right RDS instance.
- Strategies for moving large-scale data (≥ 500Gib) to AWS
- Total migration time.
- Any Applications, databases, processes or data pipelines linked up to this database. Think what would break if the DB moves over.

Before formally starting this, I would take some time to research related amazon white papers, documents, related articles, threads on AWS forums and the rest of the internet. I would push our team to go through the details of the migration process and finding out about the common issues/roadblocks that engineers face in such scenarios and what can be done to mitigate/prevent such problems. This way when we start discussing the details of migration, we’ll have a good understanding of migration projects and we’ll be asking the right questions. I have found this strategy to be exceptionally helpful in my past endeavors. Thorough and extensive planning pays off in the later stages of a project.

Collect as much info as possible. Some good questions to ask would be:

- What the nature of load the DB is being used for.
- Is it transactional/batched?
- What’s the acceptable latency range?
- Is downtime acceptable? if yes, why? if no, why?
- What degree of scalability & redundancy do they need?
- The versions of the installed applications i.e. operating system, oracle DB etc.
- The hardware and software specifications of the systems that are currently supporting this infrastructure.
- Details of how and when backups are done
- Any security-related details that we need to be aware of before we get to work.
- Compliance issues, ISO Standards that are being followed and should be taken care of.

Even though everybody knows the steps to go through, sometimes people forget. So it is useful to keep a checklist.

Here is a standard pre-migration checklist:

- Take a snapshot/backup of the on-premise database so that we have something to roll back to in case of failure.
- Disable Backups on the Target RDS instance. back-ups would slow down the bulk data upload.
- Use the largest possible single AZ instance (currently, its DB.m4.10xlarge, provisioned IOPS if you can). A synchronous-replicated instance is only going to slow you down during migration.
- Any staging EC2 instances should be in the same availability zone.
- Security configuration for migration e.g. allow cross DB traffic.

The first step would be making a disaster recovery plan. In case something happens during the migration or we face issues/constraints, we should have hot backups to go to without facing downtime.

Also, the migration should be performed at a time when there is the least load on the application, e.g. 2 AM on a Sunday.

At this time, I would suggest the team sit down and deliberate upon the nitty-gritty. Do a very thorough comparative analysis of the possible options/methods for carrying this out. The following key things would serve as the metrics with which we rate our migration methodologies:

- Data Integrity
- Total Cost
- Total Time Required
- Downtime
- Performance
- Fail-safe

Following are a few methods:
One thing I would recommend before moving is getting rid of the unnecessary stuff. A lot of times in databases used for BI & Reporting, we see a lot of indexes. Sometimes the index size is so big that it is half the size of the whole DB. So we can throw away the indexes and then rebuild them on RDS. The key point here is ‘don’t move data that does not need to be moved’.
Another important recommendation would be running a small pilot/POC of a few approaches and then selecting taking a data-driven decision. This would help us figure out possible problems/issues that we could run into.

## APPROACH 1: Oracle to EC2

This is in case we select the Oracle DB to be on EC2 rather than RDS. This way, we’d have operating system level access. Given a choice, I won’t go this way but your specific use case might require operating system level access.

- **STEP 1** Export the database DDL using whatever favorite tool with no data.
- **STEP 2** Export the data of any table with < 100 million rows to a file. This is the standard export as an insert statement. I would do any table > 1m rows in its session and all the smaller tables in a single session.
- **STEP 3** Compress, encrypt and SFTP those files to the target AWS EC2 instance. Once there, run all the inserts with RI turned off. If the total size is large, using Tsunami UDP here instead of SFTP is recommended.
Note: It is not a bad idea to get a checksum MD5 hash of everything before and after to make sure it’s moved OK.
All of this should only take a few hours in total.
- **STEP 4** Export All the tables greater than 100m rows using Tom’s Oracle C* SQL unloader to a single commodity TB drive in a format that makes sense and FedX to AWS. They will import it to the EC2 instance that you can then import into your DB with a standard SQL loader. 400–600k rows a second is easily attainable for a decent database.
The import also should be done in a few hours. The FedEx part, of course, takes the most time but people have done this in a few days. AWS also has a ‘snowball’ service for regularly shipping >=TBs of data to the cloud but I would not suggest that for a 1x conversion.
If you tuned the DB ok, the SQL loader should be importing at least 800k rows a second. This should suck in a few terabytes pretty fast.
The last step is to turn RI back on.


## APPROACH 2: Oracle Data Pump & Tsunami UDP

This approach is refined and would leverage a lot of parallelism and multi-threading. In addition to an RDS instance, we’ll set up one EC2 instance (the largest EC2 instance we can find with multiple EBS volumes) which will function as the bridge instance. We don’t need to worry about the cost so much because we’ll be using this for short time. We need this instance as the RDS instance is AWS managed and we don’t have operating system level access.

We’ll start by kicking off Oracle Data Pump Export on the on-premise instance. Oracle Data Pump Export is a very powerful tool, it lets you pick and choose the kind of data that you want. A couple of other key things that you need to pay attention to is parallelism (we have to specify how many processes we want working together r the export) and data compression.
After this step, we’ll have the files on local storage. Now we find out the best way to move those files to our bridge EC2 instance. We could just put these in an external USB Hard Drive and FedEx it to AWS OR we could set up something like Tsunami UDP on both the on-premise machine and our bridge EC2 instance. For the transfer, we don’t want to use FTP or SFTP because that will use just a fraction of the available bandwidth. Instead, TsunamiUDP will make use of every piece of bandwidth that we have, allowing us to move whole chunks of data in parallel and getting it done as soon as possible.
The data pump export creates files in batches and once we have the first batch ready, we don’t need to wait for the rest of the files. We should start the Tsunami transfer right away. Doing multiple things in parallel would decrease overall process time.

Now we’d have data coming into our large EC2 instance. In the RDS instance, there is a directory called "DATAPUMPDIR" which is externally accessible. We can write a Perl script using Oracle’s UTL File Package to transfer the data from our EC2 instance to the RDS instance’s "DATAPUMPDIR". A great time saver would be not waiting for Tsunami to bring in all the files first by starting the transfer immediately as the first file arrives. Another way we can leverage parallelism here is to spin up multiple of these Perl scripts at once.
So what would be happening at this moment: There would be data export happening in the on-premise server. Tsunami UDP would be pushing these files to AWS and our Perl scripts would be moving these files to RDS; all at the same time (concurrently).
Once we have all the files on our RDS instance, we can use Oracle Data Pump Import to get the data back into the target database. What we can do is write a PL/SQL script that uses Oracle Data Pump. We can do multi-threaded import as well (the same way we did the export) and leverage parallelism.
To give a rough idea of the time required: In a benchmark run, AWS Engineer Abdul Sattar Sait transferred a 500 GB Oracle Database, exported and compressed it into 175 GB files. The whole process took 6 hours and 42 minutes. If we roughly extrapolate that, we can do this in under 15 hours.

## APPROACH 3: AWS DMS

Instead of using tools to manually unload the data and then upload the data, we could just use AWS Database Migration Service (DMS). AWS DMS does all the heavy lifting itself, makes it very straightforward to set up replication jobs. AWS Database Migration Service monitors for replication tasks, network or host failures, and automatically provisions a host replacement in case of failures that can’t be repaired. I have yet to see stories of people using this service and what hiccups/issues that they run into. a good idea would be running a POC and using DMS to migrate a 50 GB Oracle DB to see what happens.

When you are done, here is a simple post-migration checklist:

- Run Benchmarks in the end to compare performance. If performance is lower than expected on peak load, then tweak the instance size and IOPS for best performance & utilization.
- Turn on backups
- Turn on Multi-AZ
- Tighten down the security
- Setup cloud-watch notifications.
- Put anything else back in place which you might have changed for migration.
