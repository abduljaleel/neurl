-- neurl.sg: AI Routing & Orchestration Infrastructure
-- Migration: 00002_routing
-- Tables: api_keys, model_configs, routing_policies, usage_logs, alerts

-- API keys for authenticating requests to the gateway
create table if not exists public.api_keys (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  name text not null,
  key_hash text not null,
  prefix text not null,
  permissions jsonb default '[]',
  rate_limit integer default 1000,
  active boolean default true,
  created_by uuid references auth.users(id),
  last_used_at timestamptz,
  created_at timestamptz default now()
);

-- Model configurations per org
create table if not exists public.model_configs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  provider text not null,
  model_name text not null,
  endpoint_url text,
  active boolean default true,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

-- Routing policies define how requests are routed to models
create table if not exists public.routing_policies (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  name text not null,
  conditions jsonb default '{}',
  target_model text not null,
  fallback_model text,
  cost_ceiling_cents integer,
  latency_max_ms integer,
  priority integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- Usage logs for tracking all routed requests
create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  api_key_id uuid references public.api_keys(id),
  policy_id uuid references public.routing_policies(id),
  model_used text not null,
  tokens_in integer default 0,
  tokens_out integer default 0,
  latency_ms integer,
  cost_cents integer default 0,
  status text default 'success' check (status in ('success', 'error', 'timeout', 'fallback')),
  created_at timestamptz default now()
);

-- Alerts for cost, latency, and error thresholds
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id),
  alert_type text not null check (alert_type in ('cost', 'latency', 'error_rate', 'usage')),
  threshold numeric not null,
  current_value numeric,
  triggered_at timestamptz,
  acknowledged_by uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.api_keys enable row level security;
alter table public.model_configs enable row level security;
alter table public.routing_policies enable row level security;
alter table public.usage_logs enable row level security;
alter table public.alerts enable row level security;

-- RLS Policies
create policy "Org members can manage api keys"
  on public.api_keys for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );

create policy "Org members can manage model configs"
  on public.model_configs for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );

create policy "Org members can manage routing policies"
  on public.routing_policies for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );

create policy "Org members can view usage logs"
  on public.usage_logs for select
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );

-- Insert policy for usage logs (system-level writes via service role)
create policy "Service role can insert usage logs"
  on public.usage_logs for insert
  with check (true);

create policy "Org members can manage alerts"
  on public.alerts for all
  using (
    org_id in (select org_id from public.profiles where id = auth.uid())
  );
