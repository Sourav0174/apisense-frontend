# APISense

APISense is a developer-focused API observability and intelligence platform designed to help developers monitor API health, understand failures, investigate performance issues, and eventually use AI to turn raw API signals into actionable insights.

**API observability is the core product.** The AI capabilities serve as an intelligence layer built directly on top of observability data to accelerate investigation and resolution.

---

## Current Status

APISense is currently under **active development**. 

The current frontend implementation establishes a premium, production-quality visual identity and user interface architecture. Features currently implemented include:

- Premium observability dashboard
- API health overview metrics
- Performance visualizations
- Endpoint monitoring interface
- Endpoint detail and trace view
- Add Endpoint configuration workflow
- Incident and activity feeds
- AI insight UI surfaces
- Fully responsive design
- Mock data architecture

*Note: Some functionality currently relies on robust mock data to demonstrate the UI/UX. These features will be progressively connected to the FastAPI backend to enable real-time monitoring and AI analysis.*

---

## Product Vision

The core APISense product loop is straightforward:

**Monitor → Detect → Understand → Explain → Improve**

When an issue occurs, APISense is designed to help developers answer the critical questions:
- Are my APIs healthy?
- What changed?
- Which endpoint is affected?
- How serious is the problem?
- What evidence do we have?
- What might be causing it?
- What should I investigate next?

---

## Core Product Areas

### API Observability
Monitor the fundamental signals of API health:
- Availability
- Latency and P99 performance
- Error rates
- Status codes
- Endpoint health
- Historical performance trends

### Endpoint Monitoring
Developers can easily configure new endpoints to track:
- Endpoint URL and HTTP method
- Monitoring intervals
- Custom Headers
- Query parameters
- Request body payloads
- Expected status codes and assertion logic

### Incidents
Identify, track, and manage anomalies:
- Complete endpoint failures
- Degraded performance states
- Error spikes
- Automatic recovery events

### AI Intelligence
The intelligence layer (current and planned) built to assist developers:
- Explain anomalies in plain English
- Summarize complex incidents
- Identify systemic patterns across endpoints
- Suggest possible root causes
- Recommend concrete investigation steps

*Note: AI recommendations in APISense strictly distinguish between observed facts and possible explanations.*

---

## Current Frontend Architecture

The frontend is built with Next.js (App Router), Tailwind CSS, and Framer Motion, organized logically by feature and domain:

```text
apisense/
  app/
    globals.css          # Core design tokens and Emerald Green theme variables
    layout.tsx           # Root application layout
    page.tsx             # Main Dashboard entry point
    endpoints/           # Dynamic routes for endpoint deep-dives

  components/
    dashboard/           # Dashboard-specific features (HealthOverview, EndpointList, etc.)
    endpoint/            # Deep-dive view components (Metrics, RequestTraces, etc.)
    layout/              # Global structural components (AppShell, Sidebar, Header)
    ui/                  # Reusable, unstyled primitives (Button, Input, Badge, Drawer)

  data/
    mock.ts              # Robust mock data structures demonstrating frontend states

  lib/
    utils.ts             # Tailwind class merging and general utilities

  types/
    index.ts             # Global TypeScript interfaces (Endpoint, Incident, etc.)
