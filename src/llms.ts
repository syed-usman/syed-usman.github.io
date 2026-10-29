import { SITE, SOCIAL, formatDate, getPosts, postUrl } from './site';

// Plain-markdown profile for AI agents and LLM crawlers (https://llmstxt.org).
// Keep in sync with the Work and About pages.
const profile = `# ${SITE.author}

> ${SITE.author} (${SITE.alternateName}) is an infrastructure and DevOps engineer in Berlin, Germany, with a decade of building and running production platforms: Kubernetes, Terraform, reliability, backup and recovery, and guardrails for AI agents on real infrastructure. Previously Solutions Architect and team tech lead in industrial IoT.

- Location: Berlin, Germany
- Email: ${SITE.email}
- Website: https://syed-usman.github.io/
${SOCIAL.filter((s) => s.href.startsWith('http'))
  .map((s) => `- ${s.label}: ${s.href}`)
  .join('\n')}

## Experience

- **Senior DevOps/Infrastructure Engineer, Multiverse** (joined StackFuel, acquired by Multiverse in 2025), Berlin, Aug 2024 – present. Runs the infrastructure behind hands-on data and coding courses for 10,000+ learners. Scaled the platform to 200 concurrent users by tracing failures below the application layer; cut infrastructure cost by 30%+ moving to autoscaling Kubernetes; built backups, restore runbooks and timed recovery drills; gave an AI agent its own least-privilege identity; co-built an AI-assisted ticket-to-merge-request pipeline with default-deny tool access.
- **Senior Cloud Infrastructure Engineer, Jillion**, Berlin, Nov 2023 – Jun 2024. AWS platform in Terraform with GitOps, CI/CD and self-service jobs for developers, Kubernetes resilience, OpenTelemetry observability.
- **Solutions Architect, Relayr**, Berlin, May 2021 – Jun 2023. Tech lead of a cross-functional team of 6–10 engineers (hiring, 1:1s, planning with clients, incidents and on-call). Led Kubernetes and GitOps adoption across AWS and Azure for 5+ client platforms.
- **Senior Solutions Engineer, Relayr**, Berlin, May 2019 – Apr 2021. Took Franz, an elevator-monitoring IoT product, to a working MVP in under six months; it now monitors 900+ lifts. Built the edge software (Python, MQTT, Buildroot) and an over-the-air update system.
- **Solutions Engineer, Relayr**, Berlin, Jul 2018 – Apr 2019. Backend for lift monitoring on AWS and Kubernetes, CI for embedded Linux and hardware tests.
- **Software Engineer, Colormass**, Berlin, Jul 2017 – Apr 2018. First engineer; moved a Django monolith to Kubernetes and built a GCP render farm.
- **Software Engineer, YotaScale**, Palo Alto & Lahore, Aug 2015 – Jun 2017. Early engineer on an AWS cost-analytics pipeline.

## Skills

- Kubernetes (managed and self-run), Helm, ArgoCD, Velero
- Terraform, Ansible, Atlantis, GitOps
- AWS, Azure, Hetzner, Scaleway
- GitLab CI, GitHub Actions, Jenkins
- Prometheus, Grafana, OpenTelemetry, New Relic, Datadog
- Keycloak, OIDC federation, sandboxing, secrets management
- AI tooling: Claude Code pipelines, agent identity and sandboxing
- Python, Bash, SQL, PostgreSQL, Kafka, MQTT

## Education

- BSc Software Engineering, National University of Sciences & Technology (NUST), Islamabad, 2011–2015, gold medallist
- AWS Certified Solutions Architect – Associate
- Languages: English (native), German (B1)
`;

export async function llmsTxt(site: URL, full: boolean): Promise<string> {
  const posts = await getPosts();
  const pages = `## Pages

- [Home](${new URL('/', site).href}): summary and selected work
- [Work](${new URL('/work/', site).href}): full experience
- [About](${new URL('/about/', site).href}): background and how I work
- [Writing](${new URL('/writing/', site).href}): all posts
- [Full text for agents](${new URL('/llms-full.txt', site).href}): this file plus every post in markdown
`;
  const list = `## Writing

${posts
  .map((p) => `- [${p.data.title}](${new URL(postUrl(p), site).href})${p.data.description ? `: ${p.data.description}` : ''}`)
  .join('\n')}
`;
  if (!full) return `${profile}\n${pages}\n${list}`;

  const bodies = posts
    .map(
      (p) =>
        `---\n\n# ${p.data.title}\n\nURL: ${new URL(postUrl(p), site).href}\nPublished: ${formatDate(p.data.date)}\n\n${(p.body ?? '').trim()}\n`,
    )
    .join('\n');
  return `${profile}\n${list}\n${bodies}`;
}
