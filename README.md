# APISense

APISense is a developer-focused API observability and intelligence platform designed to help developers monitor API health, understand failures, investigate performance issues, and eventually use AI to turn raw API signals into actionable insights.

**API observability is our core product.** AI serves as a powerful intelligence layer built on top of high-fidelity observability data, allowing developers to move from simply seeing errors to instantly understanding root causes.

---

## Current Status

**Status: Active Development**

APISense is currently in active development. We are actively building out the core infrastructure, defining the design language, and integrating the frontend with our FastAPI backend services. 

### What's Built So Far
- **Next.js App Router Architecture**: A robust, modern React foundation optimized for performance.
- **Design System & UI**: A premium, developer-focused dark mode interface using glassmorphism, semantic design tokens, and high-quality iconography (Lucide).
- **Authentication System**: Complete end-to-end authentication flows including Login, Registration, Email Verification, and Password Resets wired securely to the backend via JWT token rotation.
- **Dashboard Observability (Preview)**: A comprehensive dashboard layout featuring performance charts, API health overviews, activity feeds, and a detailed endpoint inspection view.
- **Mock Data Architecture**: Comprehensive mock datasets to demonstrate full UI/UX capabilities while backend integrations are in progress.

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

## Frontend Architecture

The frontend is built with Next.js (App Router), Tailwind CSS, and Framer Motion, organized logically by feature and domain:

```text
apisense/
  app/
    (auth)/              # Authentication route group (login, register, reset, verify)
    globals.css          # Core design tokens and Emerald Green theme variables
    layout.tsx           # Root application layout
    page.tsx             # Main Dashboard entry point
    endpoints/           # Dynamic routes for endpoint deep-dives

  components/
    dashboard/           # Dashboard-specific features (HealthOverview, EndpointList, etc.)
    endpoint/            # Deep-dive view components (Metrics, RequestTraces, etc.)
    layout/              # Global structural components (AppShell, Sidebar, Header, ProtectedRoute)
    ui/                  # Reusable, unstyled primitives (Button, Input, Badge, Drawer)

  data/
    mock.ts              # Robust mock data structures demonstrating frontend states

  lib/
    api.ts               # Centralized Axios API client with interceptors
    auth.service.ts      # Authentication service layer
    auth-context.tsx     # React context & auth state provider
    utils.ts             # Tailwind class merging and general utilities

  types/
    index.ts             # Global TypeScript interfaces (Endpoint, Incident, Auth, etc.)
```

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Backend API**: FastAPI (Python)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sourav0174/apisense-frontend.git
   cd apisense-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory and configure your backend API base URL:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Contributing

As this project is in active early-stage development, please consult the core maintainers before opening major feature Pull Requests. Bug fixes, UI improvements, and documentation updates are always welcome!
