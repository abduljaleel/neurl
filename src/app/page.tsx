import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import {
  ArrowRight,
  Route,
  Shield,
  BarChart3,
  Eye,
  Key,
  ScrollText,
  Bell,
  Terminal,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090b] text-[#e4e4e7]">
      {/* Nav */}
      <header className="border-b border-[#1e1e24]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#22c55e]/10 border border-[#22c55e]/20">
              <Terminal className="h-4 w-4 text-[#22c55e]" />
            </div>
            <span className="font-mono font-semibold text-base text-[#e4e4e7]">neurl</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-[#71717a] hover:text-[#e4e4e7] hover:bg-transparent font-mono text-sm">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#22c55e] text-[#09090b] hover:bg-[#16a34a] font-mono text-sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1e1e24] bg-[#0f0f12] px-4 py-1.5 text-sm text-[#71717a] font-mono">
          <span className="inline-block h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
          AI routing infrastructure
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl font-mono">
          The airport for<br />
          <span className="text-[#22c55e]">intelligence</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[#71717a] font-light">
          Route, observe, and control your AI traffic from one place.
          One gateway for every model, every policy, every dollar.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-[#22c55e] text-[#09090b] hover:bg-[#16a34a] font-mono h-12 px-8">
              Start routing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-[#1e1e24] text-[#71717a] hover:text-[#22c55e] hover:border-[#22c55e]/40 font-mono h-12 px-8 bg-transparent">
              Sign in
            </Button>
          </Link>
        </div>

        {/* Terminal code block */}
        <div className="mt-16 w-full max-w-2xl rounded-lg border border-[#1e1e24] bg-[#0f0f12] text-left overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e1e24] bg-[#0c0c0e]">
            <div className="h-3 w-3 rounded-full bg-[#ef4444]/60" />
            <div className="h-3 w-3 rounded-full bg-[#eab308]/60" />
            <div className="h-3 w-3 rounded-full bg-[#22c55e]/60" />
            <span className="ml-3 text-xs text-[#71717a] font-mono">neurl.config.ts</span>
          </div>
          <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto">
<span className="text-[#71717a]">{"// Route requests based on cost, latency, and content"}</span>{"\n"}
<span className="text-[#818cf8]">export const</span> <span className="text-[#e4e4e7]">routes</span> <span className="text-[#71717a]">=</span> {"{"}{"\n"}
{"  "}<span className="text-[#22c55e]">&quot;gpt-4o&quot;</span><span className="text-[#71717a]">:</span> {"{"} <span className="text-[#e4e4e7]">priority</span><span className="text-[#71717a]">:</span> <span className="text-[#f59e0b]">1</span><span className="text-[#71717a]">,</span> <span className="text-[#e4e4e7]">maxCost</span><span className="text-[#71717a]">:</span> <span className="text-[#f59e0b]">0.03</span> {"}"}<span className="text-[#71717a]">,</span>{"\n"}
{"  "}<span className="text-[#22c55e]">&quot;claude-sonnet&quot;</span><span className="text-[#71717a]">:</span> {"{"} <span className="text-[#e4e4e7]">priority</span><span className="text-[#71717a]">:</span> <span className="text-[#f59e0b]">2</span><span className="text-[#71717a]">,</span> <span className="text-[#e4e4e7]">fallback</span><span className="text-[#71717a]">:</span> <span className="text-[#22c55e]">true</span> {"}"}<span className="text-[#71717a]">,</span>{"\n"}
{"  "}<span className="text-[#22c55e]">&quot;gemini-pro&quot;</span><span className="text-[#71717a]">:</span> {"{"} <span className="text-[#e4e4e7]">priority</span><span className="text-[#71717a]">:</span> <span className="text-[#f59e0b]">3</span><span className="text-[#71717a]">,</span> <span className="text-[#e4e4e7]">latencyMs</span><span className="text-[#71717a]">:</span> <span className="text-[#f59e0b]">500</span> {"}"}<span className="text-[#71717a]">,</span>{"\n"}
{"}"}</pre>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-[#1e1e24]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center text-3xl font-bold font-mono">
            Infrastructure-grade <span className="text-[#22c55e]">AI ops</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-[#71717a]">
            Stop managing AI integrations ad hoc. Neurl gives your platform team a single control plane.
          </p>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Route, title: "Model Routing", desc: "Route to the right model based on content, cost, latency, or custom policies. Auto-fallback on failure." },
              { icon: Shield, title: "Policy Engine", desc: "Priority-ordered policies. Cost ceilings, latency guards, content dispatch, and compliance rules." },
              { icon: BarChart3, title: "Cost Analytics", desc: "Track spend per model, per key, per team. Set budgets and get alerts before costs spiral." },
              { icon: Key, title: "API Keys", desc: "Manage keys per team, per project, per environment. Full audit trail and rotation support." },
              { icon: ScrollText, title: "Request Logs", desc: "Full request-level logging with latency, tokens, cost, and policy decisions. Search in real time." },
              { icon: Bell, title: "Alerts", desc: "Threshold alerts for cost, latency, error rates. Route to Slack, PagerDuty, or webhooks." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-lg border border-[#1e1e24] bg-[#0f0f12] p-6 hover:border-[#22c55e]/20 transition-colors group">
                <feature.icon className="h-5 w-5 text-[#22c55e]" />
                <h3 className="mt-4 text-sm font-semibold font-mono">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#71717a] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="border-t border-[#1e1e24] bg-[#0c0c0e]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center text-3xl font-bold font-mono mb-12">How it works</h2>
          <div className="max-w-3xl mx-auto rounded-lg border border-[#1e1e24] bg-[#09090b] p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-md border border-[#1e1e24] bg-[#0f0f12] px-6 py-3 text-[#e4e4e7]">Your App</div>
                <span className="text-[#71717a] text-xs">SDK / HTTP</span>
              </div>
              <div className="text-[#22c55e] text-2xl hidden md:block">&rarr;</div>
              <div className="text-[#22c55e] text-2xl md:hidden">&darr;</div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-md border border-[#22c55e]/30 bg-[#22c55e]/5 px-6 py-3 text-[#22c55e] font-semibold">Neurl Gateway</div>
                <span className="text-[#71717a] text-xs">Route + Policy + Log</span>
              </div>
              <div className="text-[#22c55e] text-2xl hidden md:block">&rarr;</div>
              <div className="text-[#22c55e] text-2xl md:hidden">&darr;</div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-md border border-[#1e1e24] bg-[#0f0f12] px-6 py-3 text-[#e4e4e7]">AI Models</div>
                <span className="text-[#71717a] text-xs">GPT / Claude / Gemini</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-[#1e1e24]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            {[
              { value: "1.2M", label: "Requests routed" },
              { value: "340ms", label: "Avg latency" },
              { value: "$12K", label: "Saved monthly" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold font-mono text-[#22c55e]">{stat.value}</div>
                <div className="mt-2 text-sm text-[#71717a] font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1e1e24] bg-[#0c0c0e]">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm font-mono text-[#22c55e] mb-4 tracking-wider uppercase">Built for platform teams</p>
          <h2 className="text-3xl font-bold font-mono">
            Take control of your AI traffic
          </h2>
          <p className="mt-4 text-lg text-[#71717a]">
            One gateway. Every model. Full visibility.
          </p>
          <Link href="/signup" className="mt-10 inline-block">
            <Button size="lg" className="bg-[#22c55e] text-[#09090b] hover:bg-[#16a34a] font-mono h-12 px-8">
              Start routing free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e1e24]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-xs text-[#71717a] font-mono">
          <span>&copy; {new Date().getFullYear()} {appConfig.name}</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}
