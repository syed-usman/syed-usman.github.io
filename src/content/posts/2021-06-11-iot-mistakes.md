---
title: "Top 10 mistakes building an IoT product"
description: "Lessons from shipping three end-to-end IoT products: vendors, hardware choices, deployments and more."
date: 2021-06-11
---
I have been working at relayr for more than 3 years, building IoT solutions for large industrial clients.

Lately, i have been working on [Franz](http://hellofranz.com). Franz is the elevator protector. It is our elevator servicing solution that works across brands and models through sensor-based hardware. We are equipping small elevator maintenance and service providers with data to help deliver extra services to end customers and secure the efficiency of their elevator fleets. Also, Franz recently entered production with a the first few hundred deployments on the way.

This is my third time delivering an end to end IoT solution that is now running on a large-enough scale. I am also helping a client to monitor the technical equipment in smart residential buildings and another lift service and maintenance company to monitor if their elevator fleet was in breach of European regulations.

Even in 2021, the development of IoT products has not matured; certainly not when compared to SaaS development. Some frameworks and platforms solve individual problems e.g. compiling operating systems, data processing in the cloud, managing fleets etc., analytics on sensor data etc. but nothing yet that gives a framework for building, shipping and deploying IoT software and hardware at scale. This means that the massive list of stack-overflow threads that exist for each programming problem, provide minimal help when it comes to IoT.

Here are the mistakes we made that cost us time, money and sleepless nights preparing for deployments while debugging a mess of wires in the office at midnight. I hope that you do not go through the same.

#### Not working with the right vendors

We partnered with a large electronics company to build sensors and gateway, expecting fast prototyping. Because of the huge size and corporate inefficiency, it took 9 months to get the first, unfinished sensor units on my desk and another six months to get the fist unit in production. We, in contrast, are a team of 20 and later did the same work in 7 weeks.

We worked with a vendor with a very bad level of support. If there was a problem in the field, we could never depend on them for help.

#### Compromising on the hardware choice

After some cursory research, we chose a indie IoT gateway vendor from Israel while not paying enough attention to the deign. Turned out, that was gateway was not field serviceable, and  fell apart as soon as we started servicing it on-site.

#### Not reviewing work from vendors

We requested a vendor to build firmware for a microphone unit, with a cortex-m4 processor. We chose to supply the vendor with a subset of the firmware which was supposed to process audio. Needless to say, the decision came back to bite us.

Before payment of work to a vendor who was building firmware for a cortex m4 based board with a few sensors, we did not review the code and accepted a 'tested' binary. Turns out the vendor repurposed some code from one of his projects from 10 years ago. My team later re-wrote all codebase because of bugs, design issues and spaghetti code.

#### Building stuff when we should be buying

Building services when we should rather be buying and integrating. We chose to build a scheduling system for maintenance and A plethora of micro-services powering cloud for IoT. The company spent massive amount of time and energy. The platforms were always there (AWS IoT, Azure IoT, Google cloud IoT)

* * *

I attribute most of these mistakes to a very process-oriented approach to thinking. Whenever something used to go wrong at work, we used to think 'what process can we put in place' to safeguard us against this problem. We started valuing 'following the process' rather than first principles thinking. What we did not realize at the time was, that by dummy-proofing the system, we had now a company where only dummies wanted to work.
