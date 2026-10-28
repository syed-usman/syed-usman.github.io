---
layout: ../layouts/Page.astro
title: My Work
description: "Experience of Syed Usman: DevOps, cloud infrastructure, Kubernetes and IoT platform engineering in Berlin."
---

## Experience

### [Multiverse](https://www.multiverse.io) (formerly StackFuel)

#### Senior DevOps/Infrastructure Engineer

Aug. 2024 – Present · Berlin\
StackFuel was acquired by Multiverse in 2025.

- **AI Agent Looping Harness & Platform:** Built a looping harness that runs Claude autonomously against DevOps tasks, iterating tool calls until completion without manual intervention. Also deployed a company-wide AI experimentation platform with Helm, enabling employees to try generative AI and learn prompt engineering.
- **AI Agent Identity, Access & Sandboxing:** Designed a dedicated, least-privilege identity for Claude: short-lived OIDC-federated credentials, network allow-listing, and full audit logging, scoped read-only. Ran it unattended in Docker sandboxes to investigate and resolve infrastructure issues, isolated from production.
- **JupyterHub Migration:** Moved Coding Labs infrastructure from manual servers to JupyterHub on Hetzner Cloud using Terraform and Ansible. Standardized infrastructure as code and improved observability for German school students.
- **Data Warehouse Migration:** Rebuilt the analytics stack from an old on-premise server to Hetzner Cloud. Used Terraform and Ansible to migrate Airflow, Metabase, and all data for better reliability and easier maintenance.
- **Kubernetes Cluster Automation:** Set up automated Kubernetes clusters for the StackFuel e-learning platform. Migrated JupyterHub workloads to autoscaling clusters in Hetzner and Scaleway. Used Terraform and GitLab CI/CD for GitOps. Integrated Keycloak for secure access.
- **Monitoring and Alerting:** Standardized monitoring and alerting across all infrastructure using New Relic. Automated agent deployment with Ansible and alert policies with Terraform. Routed alerts to Slack for faster incident response.
- **Ansible Codebase Modernization:** Split a large, complex Ansible codebase into modular roles and separate repos. Removed shared conditional logic and added GitLab CI for automated deployments. Improved transparency and consistency.

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
