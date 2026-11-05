---
title: "The mistakes that cost us most building an IoT product"
description: "Four expensive lessons from shipping three end-to-end IoT products: picking vendors, picking hardware, reviewing vendor work, and knowing when to buy."
date: 2021-06-11
---
I have spent the last few years building IoT products for industrial customers: sensors, gateways, firmware and the cloud behind them. I have now shipped three of them end to end, all running at a large-enough scale.

An "end to end" IoT product has more moving parts than most software. There are sensors that measure something physical, like vibration or sound. A gateway near the sensors collects their data and sends it over the internet. Firmware runs on both, and a cloud backend stores the data, analyses it and shows it to customers. Each layer can come from a different vendor, and a problem in any of them ends up as a technician standing next to a machine, trying to work out why it's offline.

Even in 2021, the development of IoT products has not matured; certainly not when compared to SaaS development. Some frameworks and platforms solve individual problems e.g. compiling operating systems, data processing in the cloud, managing fleets etc., analytics on sensor data etc. but nothing yet that gives a framework for building, shipping and deploying IoT software and hardware at scale. So the Stack Overflow threads that exist for almost every programming problem are of little help when it comes to IoT.

Here are the mistakes we made that cost us time, money and sleepless nights preparing for deployments while debugging a mess of wires in the office at midnight. I hope you don't go through the same.

## 1. Not working with the right vendors

We partnered with a large hardware vendor to build sensors and gateways, expecting fast prototyping. Because of the huge size and corporate inefficiency, it took 9 months to get the first, unfinished sensor units on my desk and another six months to get the first unit in production. Our own team of 20 later did the same work in 7 weeks.

We worked with a vendor with a very bad level of support. If there was a problem in the field, we could never depend on them for help.

## 2. Compromising on the hardware choice

After some cursory research, we chose an indie IoT gateway vendor without paying enough attention to the design. It turned out the gateway was not field-serviceable, and it fell apart as soon as we started servicing it on-site.

## 3. Not reviewing work from vendors

We asked a vendor to build firmware for a microphone unit with a Cortex-M4 processor. We chose to supply the vendor with a subset of the firmware which was supposed to process audio. Needless to say, the decision came back to bite us.

Before paying the vendor, we did not review the code and accepted a 'tested' binary. It turned out the vendor had repurposed some code from a project many years old. My team later rewrote the whole codebase because of bugs, design issues and spaghetti code.

## 4. Building stuff when we should be buying

We built a maintenance scheduling system and a plethora of microservices for our IoT cloud, and spent a massive amount of time and energy on them. Platforms that did most of it were already there: AWS IoT, Azure IoT and Google Cloud IoT. Build what makes your product different and buy the rest.

* * *

I attribute most of these mistakes to a very process-oriented approach to thinking. Whenever something used to go wrong at work, we used to think 'what process can we put in place' to safeguard us against this problem. We started valuing following the process over thinking from first principles. What we did not realize at the time was that by dummy-proofing everything, we were also taking away the judgement that good engineers come to work for.

## What this means for you

If you're about to build a product that involves hardware, here is what I'd do differently, one for each mistake:

- **Pilot a vendor before you commit to one.** Give them a small, paid piece of work with a deadline, and judge them on how fast they deliver and how they respond when something breaks. Their size tells you very little; their support in a real problem tells you a lot.
- **Test hardware the way it will be used in the field.** Before choosing a gateway or a sensor, have the people who will install and service it open it up, mount it and swap parts. If it can't survive a technician, it can't survive the field.
- **Review vendor work before you pay for it.** Ask for the source code, not just a binary, agree on acceptance tests up front, and have your own engineers read the code. "Tested" means nothing until you know what was tested.
- **Buy everything that doesn't make your product different.** Device management, data ingestion and scheduling already exist as products. Spend your engineers on the part your customers actually pay for.
- **Keep the judgement with the engineers.** When something goes wrong, ask what the team needs to make a better call next time before adding another process.
