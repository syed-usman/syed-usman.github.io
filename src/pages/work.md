---
layout: ../layouts/Page.astro
title: My Work
description: "Experience of Syed Usman: Kubernetes, cloud infrastructure, reliability and AI-agent guardrails, plus IoT platform leadership."
---

## Experience

### [Multiverse](https://www.multiverse.io) (formerly StackFuel)

#### Senior DevOps/Infrastructure Engineer

Aug. 2024 – Present · Berlin\
StackFuel was acquired by Multiverse in 2025.

- **Scaling a learner platform to 200 concurrent users:** A load test of JupyterHub on Kubernetes (Scaleway Kapsule) stalled at ~170 of 200 users, with 15–23% of logins failing below the application layer. Over ten instrumented runs (Locust, tcpdump, py-spy) I ruled out the hub, auth, ingress, kernel and client, and traced the failures to node autoscaling repeatedly reconfiguring the load balancer's backends. Excluding the autoscaling pool from the load balancer and lifting the hub's spawn limit took it to 200/200 servers with zero login or spawn failures, reproduced on a second run and codified in Terraform and Helm. [Read the write-up](/2026-10-28/the-200-user-wall/).
- **Backup and recovery for learner data:** Built Kubernetes volume backups with Velero and Kopia (90-day retention), a restore runbook for single-file to full-environment recovery, and a script that computes the minimal restore chain across volumes. Ran recovery drills for the platform's two main databases, with a measured restore time of 1–4 hours.
- **Kubernetes platform and identity as code:** Upgraded clusters across three environments to Kubernetes 1.35. Built the new learner stack on managed Kubernetes, with the Keycloak realm (clients, roles, auth flows) managed in Terraform and tested against an empty instance, and moved DNS from manual registrar records to Terraform.
- **Sandboxed automation platform:** Deployed n8n to three environments with Ansible and Keycloak SSO. Isolated its AI assistant in sysbox-runc sandboxes sized from runner memory limits, removed the privileged fallback, and hardened code execution (decision recorded as an ADR).
- **AI agent identity, access and sandboxing:** Designed a dedicated, least-privilege identity for Claude: short-lived OIDC-federated credentials, network allow-listing and full audit logging, scoped read-only. Ran it unattended in Docker sandboxes to investigate and resolve infrastructure issues, isolated from production.
- **AI-assisted delivery pipeline:** Co-built a Claude Code pipeline that takes a Jira ticket to a merge request: competing planners, test-first implementation, a fleet of review subagents and two human approval gates. Designed its default-deny tool-access hook (an allow-list only skips prompts, it doesn't block the rest) and treated ticket text as untrusted input. Also deployed a company-wide AI experimentation platform with Helm.
- **Platform migrations and cost:** Moved Coding Labs (JupyterHub) and the analytics stack (Airflow, Metabase) from manual and on-premise servers to autoscaling Kubernetes on Hetzner and Scaleway for 10,000+ learners, cutting infrastructure cost by more than 30%. Built with Terraform, Ansible and GitLab CI/CD.
- **Monitoring and IaC hygiene:** Standardized monitoring on New Relic (agents via Ansible, alert policies via Terraform), split a monolithic Ansible codebase into modular roles with GitLab CI, and rolled out Renovate and lock-file standards across repositories.

### Jillion

#### Senior Cloud Infrastructure Engineer

Nov. 2023 – June 2024 · Berlin

- **Terraform and GitOps:** Designed and deployed Staging and Production environments on AWS using Terraform with GitOps principles. Also managed permissions to AWS infrastructure declaratively, using Terraform.
- **CI/CD and Automation:** Built GitHub Actions pipelines for infrastructure deployment to AWS, quality checks with SonarQube, linting, testing, and image builds pushed to AWS ECR, including runners on Kubernetes for secure task handling.
- **Kubernetes and Optimization:** Deployed ArgoCD to manage deployments on AWS EKS. Improved cluster resilience with capacity reservations, pod priority classes, eviction policies, and resource requests/limits enforcement via admission control.
- **Observability and Self-Service Platform:** Deployed OpenTelemetry and Datadog for service instrumentation, metrics, and log aggregation. Built self-service jobs enabling engineers to provision infrastructure, manage secrets, and deploy K8s workloads independently.
- **Deployment, VPN and Access Control:** Developed Helm charts for internal and external services (Gloo, Oathkeeper, OpenTelemetry, Datadog). Configured Pritunl site-to-site VPN with declarative access control for developers and infrastructure teams.

### [Relayr](https://relayr.io)

#### Tech Lead

May 2019 – June 2023 · Berlin

- **Team leadership:** Led a cross-functional team of 6–10 engineers: hiring and technical interviews, 1:1s and mentoring, sprint and roadmap planning, requirement workshops with clients, and incident response with postmortems and on-call.
- **Cloud & Kubernetes Strategy:** Led company-wide adoption of Kubernetes and GitOps across AWS and Azure for 5+ client platforms, using Terraform with PR automation via Atlantis to streamline infrastructure changes as a team.
- **Equipment as a Service (EaaS), industrial machine rental platform:** Built and operated Kubernetes clusters on-premise and on EKS, with CI/CD on GitHub, large-scale Azure Postgres, and Prometheus/Grafana monitoring for IoT devices and microservices.
- **Franz, IoT elevator monitoring platform:** Led a cross-functional team (FE, BE, firmware, Linux) to deliver a working MVP in under 6 months; the platform now monitors 900+ lifts in production. Built the edge software layer (Python, MQTT, Buildroot) and an OTA update system for embedded Linux devices.
- **Cincinnati, hydraulic press & laser cutting machine monitoring:** Architected a near-real-time IoT data-processing backend on Kubernetes and Azure, migrating a monolithic Django backend to Flask microservices and centralizing observability with Prometheus and EFK.
- **Gropyus & Ecospray, smart building and maritime IoT platforms:** Built cloud infrastructure and observability (Telegraf, InfluxDB, Grafana, Prometheus) for IoT monitoring platforms on AWS, contributing to a ~12% reduction in vessel fuel costs for Ecospray and streamlined field onboarding for Gropyus.

#### Solutions Engineer

Jul. 2018 – Apr. 2019 · Berlin

- **Infrastructure & CI/CD:** Built backend infrastructure on AWS to monitor lifts, including dockerized microservices on Kubernetes and a Python gateway agent for real-time sensor data. Implemented Jenkins pipelines for microservice deployment, embedded Linux builds, and IoT hardware stress testing.
- **Monitoring & Vendor Management:** Set up monitoring and alerting with Prometheus and Grafana, and managed AWS infrastructure with Terraform across DEV, STG, and PROD. Collaborated with vendors to industrialize IoT hardware (gateways, sensors, controllers, firmware).

### [Colormass](https://www.colormass.com)

#### Software Engineer

Jul. 2017 – Apr. 2018 · Berlin

- **Infrastructure Migration & Automation:** Migrated a monolithic Django app on Google App Engine to dockerized microservices on Kubernetes, building a Jenkins CI/CD pipeline and cloud infra from scratch. Built a render farm on GCP VMs with Python, cutting image render times by roughly 50%.

### [YotaScale](https://www.yotascale.com)

#### Software Engineer

Aug. 2015 – Jun. 2017 · Palo Alto & Lahore

- **Data Processing and Cost Analysis:** Developed a data pipeline with AWS Kinesis, Lambda, and Redshift to analyze AWS cost/utilization and reduce spend, with dashboards in TypeScript, Highcharts, and Flask microservices to surface trends and anomalies. Implemented Jenkins pipelines to deploy Dockerized microservices and Lambda functions, and migrated on-prem Postgres to AWS RDS.

## Skills

- **Leadership:** Proven track record of motivating and leading diverse engineering teams.
- **Communication:** Strong verbal/written English, presenting technical info to technical and non-technical audiences alike; working knowledge of German (B1).
- **Interpersonal:** Builds and maintains strong relationships with colleagues, clients, and vendors.
