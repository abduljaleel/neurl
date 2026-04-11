# Neurl

**The airport for intelligence. Route AI traffic with control.**

Part of the [12 Cities](https://github.com/abduljaleel) venture ecosystem.

## What it does

Neurl is an AI routing and orchestration infrastructure platform. It provides a unified control plane for managing model traffic, routing policies, cost optimization, and observability across AI providers.

### Core Features

- **Model Registry** — Configure and manage AI providers (OpenAI, Anthropic, Google, custom endpoints) with status monitoring
- **Routing Policy Engine** — Conditional routing rules with priority ordering, cost ceilings, latency limits, and fallback chains
- **API Key Management** — Generate, revoke, and monitor API keys with per-key usage statistics
- **Cost/Performance Analytics** — Model comparison, latency distributions, token usage, and cost breakdown dashboards
- **Request Log Explorer** — Searchable request history with model, tokens, latency, cost, and policy matching details
- **Alert System** — Configurable alerts for cost thresholds, latency spikes, and error rate anomalies

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Auth & Database:** Supabase (Auth, Postgres, RLS)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Add your Supabase URL and anon key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 12 Cities Role

**Domain:** neurl.sg | **Tier:** 1 (Core) | **Layer:** Foundations

## License

Private — 12 Cities Venture System
