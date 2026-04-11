// ─── Models ───────────────────────────────────────────────
export type ModelProvider = "OpenAI" | "Anthropic" | "Google" | "Custom";

export interface Model {
  id: string;
  name: string;
  provider: ModelProvider;
  modelId: string;
  endpoint: string;
  status: "active" | "inactive";
  avgLatency: number; // ms
  costPer1kTokens: number; // USD
}

export const models: Model[] = [
  {
    id: "m-1",
    name: "GPT-4o",
    provider: "OpenAI",
    modelId: "gpt-4o",
    endpoint: "https://api.openai.com/v1/chat/completions",
    status: "active",
    avgLatency: 320,
    costPer1kTokens: 0.005,
  },
  {
    id: "m-2",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    modelId: "gpt-4o-mini",
    endpoint: "https://api.openai.com/v1/chat/completions",
    status: "active",
    avgLatency: 180,
    costPer1kTokens: 0.00015,
  },
  {
    id: "m-3",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    modelId: "claude-3-5-sonnet-20241022",
    endpoint: "https://api.anthropic.com/v1/messages",
    status: "active",
    avgLatency: 410,
    costPer1kTokens: 0.003,
  },
  {
    id: "m-4",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    modelId: "claude-3-haiku-20240307",
    endpoint: "https://api.anthropic.com/v1/messages",
    status: "active",
    avgLatency: 140,
    costPer1kTokens: 0.00025,
  },
  {
    id: "m-5",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    modelId: "gemini-1.5-pro",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    status: "active",
    avgLatency: 350,
    costPer1kTokens: 0.00125,
  },
  {
    id: "m-6",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    modelId: "gemini-1.5-flash",
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
    status: "inactive",
    avgLatency: 120,
    costPer1kTokens: 0.000075,
  },
  {
    id: "m-7",
    name: "Llama 3.1 70B",
    provider: "Custom",
    modelId: "llama-3.1-70b",
    endpoint: "https://inference.neurl.sg/v1/completions",
    status: "active",
    avgLatency: 280,
    costPer1kTokens: 0.0009,
  },
];

// ─── Policies ─────────────────────────────────────────────
export interface Policy {
  id: string;
  name: string;
  priority: number;
  status: "active" | "inactive";
  conditions: {
    type: "content_contains" | "cost_exceeds" | "latency_exceeds";
    value: string;
  }[];
  targetModel: string;
  fallbackModel: string;
  costCeiling: number | null;
  latencyMax: number | null;
}

export const policies: Policy[] = [
  {
    id: "p-1",
    name: "Code Generation → GPT-4o",
    priority: 1,
    status: "active",
    conditions: [{ type: "content_contains", value: "code, function, implement, debug" }],
    targetModel: "GPT-4o",
    fallbackModel: "Claude 3.5 Sonnet",
    costCeiling: 0.50,
    latencyMax: 5000,
  },
  {
    id: "p-2",
    name: "Analysis → Claude Sonnet",
    priority: 2,
    status: "active",
    conditions: [{ type: "content_contains", value: "analyze, summarize, research" }],
    targetModel: "Claude 3.5 Sonnet",
    fallbackModel: "GPT-4o",
    costCeiling: 1.00,
    latencyMax: 10000,
  },
  {
    id: "p-3",
    name: "Cost Guard — Route Cheap",
    priority: 3,
    status: "active",
    conditions: [{ type: "cost_exceeds", value: "$0.10" }],
    targetModel: "GPT-4o Mini",
    fallbackModel: "Claude 3 Haiku",
    costCeiling: 0.10,
    latencyMax: null,
  },
  {
    id: "p-4",
    name: "Latency Guard — Fast Path",
    priority: 4,
    status: "active",
    conditions: [{ type: "latency_exceeds", value: "500ms" }],
    targetModel: "Claude 3 Haiku",
    fallbackModel: "Gemini 1.5 Flash",
    costCeiling: null,
    latencyMax: 500,
  },
  {
    id: "p-5",
    name: "Multilingual → Gemini",
    priority: 5,
    status: "inactive",
    conditions: [{ type: "content_contains", value: "translate, multilingual, language" }],
    targetModel: "Gemini 1.5 Pro",
    fallbackModel: "GPT-4o",
    costCeiling: 0.25,
    latencyMax: 8000,
  },
];

// ─── API Keys ─────────────────────────────────────────────
export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "revoked";
  rateLimit: number; // requests per minute
}

export const apiKeys: ApiKey[] = [
  {
    id: "k-1",
    name: "Production API",
    prefix: "sk-nr-prod-****7f2a",
    createdAt: "2024-11-15",
    lastUsed: "2025-04-11",
    status: "active",
    rateLimit: 1000,
  },
  {
    id: "k-2",
    name: "Staging Environment",
    prefix: "sk-nr-stag-****3b1c",
    createdAt: "2024-12-03",
    lastUsed: "2025-04-10",
    status: "active",
    rateLimit: 500,
  },
  {
    id: "k-3",
    name: "Development",
    prefix: "sk-nr-dev-****9e4d",
    createdAt: "2025-01-20",
    lastUsed: "2025-04-09",
    status: "active",
    rateLimit: 200,
  },
  {
    id: "k-4",
    name: "CI/CD Pipeline",
    prefix: "sk-nr-ci-****5a8f",
    createdAt: "2025-02-10",
    lastUsed: "2025-04-11",
    status: "active",
    rateLimit: 100,
  },
  {
    id: "k-5",
    name: "Legacy v1 Key",
    prefix: "sk-nr-v1-****2c7e",
    createdAt: "2024-08-01",
    lastUsed: "2025-01-15",
    status: "revoked",
    rateLimit: 50,
  },
];

// ─── Request Logs ─────────────────────────────────────────
export interface RequestLog {
  id: string;
  timestamp: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  latency: number; // ms
  cost: number;
  status: "success" | "error";
  policyMatched: string | null;
  requestBody: string;
  responseBody: string;
}

function generateLogs(): RequestLog[] {
  const modelNames = ["GPT-4o", "GPT-4o Mini", "Claude 3.5 Sonnet", "Claude 3 Haiku", "Gemini 1.5 Pro", "Llama 3.1 70B"];
  const policyNames = ["Code Generation → GPT-4o", "Analysis → Claude Sonnet", "Cost Guard — Route Cheap", "Latency Guard — Fast Path", null];
  const logs: RequestLog[] = [];

  const baseTime = new Date("2025-04-11T12:00:00Z").getTime();

  for (let i = 0; i < 100; i++) {
    const model = modelNames[i % modelNames.length];
    const isError = i % 17 === 0;
    const tokensIn = 50 + Math.floor((i * 37) % 2000);
    const tokensOut = 20 + Math.floor((i * 53) % 3000);
    const latency = 80 + Math.floor((i * 41) % 900);
    const cost = parseFloat(((tokensIn + tokensOut) * 0.000003).toFixed(6));

    logs.push({
      id: `log-${String(i + 1).padStart(3, "0")}`,
      timestamp: new Date(baseTime - i * 180000).toISOString(),
      model,
      tokensIn,
      tokensOut,
      latency,
      cost,
      status: isError ? "error" : "success",
      policyMatched: policyNames[i % policyNames.length],
      requestBody: JSON.stringify({
        model,
        messages: [{ role: "user", content: `Sample request #${i + 1}: ${isError ? "This request triggered an error" : "Process this input data"}` }],
        max_tokens: tokensOut,
      }, null, 2),
      responseBody: isError
        ? JSON.stringify({ error: { message: "Rate limit exceeded", type: "rate_limit_error", code: 429 } }, null, 2)
        : JSON.stringify({
            id: `resp-${i + 1}`,
            model,
            usage: { prompt_tokens: tokensIn, completion_tokens: tokensOut },
            choices: [{ message: { role: "assistant", content: `Response for request #${i + 1}` } }],
          }, null, 2),
    });
  }

  return logs;
}

export const requestLogs = generateLogs();

// ─── Hourly Usage (last 24h) ─────────────────────────────
export interface HourlyUsage {
  hour: string;
  requests: number;
}

export const hourlyUsage: HourlyUsage[] = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  requests: Math.floor(80 + Math.sin(i / 3.8) * 60 + (i > 8 && i < 20 ? 120 : 0) + ((i * 7) % 40)),
}));

// ─── Model Usage Breakdown ───────────────────────────────
export interface ModelUsage {
  model: string;
  requests: number;
  totalCost: number;
  avgLatency: number;
  p95Latency: number;
  tokensProcessed: number;
}

export const modelUsage: ModelUsage[] = [
  { model: "GPT-4o", requests: 12840, totalCost: 128.40, avgLatency: 320, p95Latency: 890, tokensProcessed: 25_680_000 },
  { model: "GPT-4o Mini", requests: 34200, totalCost: 10.26, avgLatency: 180, p95Latency: 420, tokensProcessed: 68_400_000 },
  { model: "Claude 3.5 Sonnet", requests: 8920, totalCost: 53.52, avgLatency: 410, p95Latency: 1100, tokensProcessed: 17_840_000 },
  { model: "Claude 3 Haiku", requests: 21500, totalCost: 10.75, avgLatency: 140, p95Latency: 310, tokensProcessed: 43_000_000 },
  { model: "Gemini 1.5 Pro", requests: 5600, totalCost: 14.00, avgLatency: 350, p95Latency: 950, tokensProcessed: 11_200_000 },
  { model: "Llama 3.1 70B", requests: 9400, totalCost: 16.92, avgLatency: 280, p95Latency: 720, tokensProcessed: 18_800_000 },
];

// ─── Alerts ──────────────────────────────────────────────
export interface Alert {
  id: string;
  severity: "warning" | "error" | "info";
  message: string;
  timestamp: string;
}

export const alerts: Alert[] = [
  { id: "a-1", severity: "error", message: "GPT-4o error rate exceeded 5% threshold (current: 6.2%)", timestamp: "2025-04-11T11:42:00Z" },
  { id: "a-2", severity: "warning", message: "Claude 3.5 Sonnet latency p95 above 1000ms", timestamp: "2025-04-11T11:15:00Z" },
  { id: "a-3", severity: "warning", message: "Daily cost approaching budget limit ($180 / $200)", timestamp: "2025-04-11T10:30:00Z" },
  { id: "a-4", severity: "info", message: "Gemini 1.5 Flash model marked inactive by admin", timestamp: "2025-04-11T09:00:00Z" },
];
