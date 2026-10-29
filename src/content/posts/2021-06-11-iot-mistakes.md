---
title: "The mistakes that cost us most building an IoT product"
description: "Four expensive lessons from shipping three end-to-end IoT products: picking vendors, picking hardware, reviewing vendor work, and knowing when to buy."
date: 2021-06-11
---
I have been working at relayr for more than 3 years, building IoT solutions for large industrial clients.

Lately, I have been working on [Franz](http://hellofranz.com). Franz is the elevator protector. It is our elevator servicing solution that works across brands and models through sensor-based hardware. We are equipping small elevator maintenance and service providers with data to help deliver extra services to end customers and secure the efficiency of their elevator fleets. Franz recently entered production, with the first few hundred deployments on the way.

This is my third time delivering an end to end IoT solution that is now running on a large-enough scale. I am also helping a client to monitor the technical equipment in smart residential buildings and another lift service and maintenance company to monitor if their elevator fleet was in breach of European regulations.

Even in 2021, the development of IoT products has not matured; certainly not when compared to SaaS development. Some frameworks and platforms solve individual problems e.g. compiling operating systems, data processing in the cloud, managing fleets etc., analytics on sensor data etc. but nothing yet that gives a framework for building, shipping and deploying IoT software and hardware at scale. So the Stack Overflow threads that exist for almost every programming problem are of little help when it comes to IoT.

Here are the mistakes we made that cost us time, money and sleepless nights preparing for deployments while debugging a mess of wires in the office at midnight. I hope you don't go through the same.

## 1. Not working with the right vendors

We partnered with a large electronics company to build sensors and gateway, expecting fast prototyping. Because of the huge size and corporate inefficiency, it took 9 months to get the first, unfinished sensor units on my desk and another six months to get the first unit in production. Our own team of 20 later did the same work in 7 weeks.

We worked with a vendor with a very bad level of support. If there was a problem in the field, we could never depend on them for help.

## 2. Compromising on the hardware choice

After some cursory research, we chose an indie IoT gateway vendor without paying enough attention to the design. It turned out the gateway was not field-serviceable, and it fell apart as soon as we started servicing it on-site.

## 3. Not reviewing work from vendors

We asked a vendor to build firmware for a microphone unit with a Cortex-M4 processor. We chose to supply the vendor with a subset of the firmware which was supposed to process audio. Needless to say, the decision came back to bite us.

Before paying the vendor, we did not review the code and accepted a 'tested' binary. It turned out the vendor had repurposed some code from one of his projects from 10 years ago. My team later rewrote the whole codebase because of bugs, design issues and spaghetti code.

## 4. Building stuff when we should be buying

We built a maintenance scheduling system and a plethora of microservices for our IoT cloud, and spent a massive amount of time and energy on them. Platforms that did most of it were already there: AWS IoT, Azure IoT and Google Cloud IoT. Build what makes your product different and buy the rest.

* * *

I attribute most of these mistakes to a very process-oriented approach to thinking. Whenever something used to go wrong at work, we used to think 'what process can we put in place' to safeguard us against this problem. We started valuing following the process over thinking from first principles. What we did not realize at the time was that by dummy-proofing everything, we were also taking away the judgement that good engineers come to work for.
