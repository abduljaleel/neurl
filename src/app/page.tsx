import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import { ArrowRight, Route, Shield, BarChart3, Eye } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {appConfig.name.charAt(0)}
            </div>
            <span className="font-semibold text-lg">{appConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
          AI routing infrastructure
        </div>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          The airport for intelligence
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Route, observe, and control your AI traffic from one place.
          One gateway for every model, every policy, every dollar.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg">
              Start routing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
        {/* Terminal-style code snippet */}
        <div className="mt-12 w-full max-w-xl rounded-lg border bg-muted/50 p-4 text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              terminal
            </span>
          </div>
          <pre className="text-sm font-mono text-muted-foreground overflow-x-auto">
            <code>
              <span className="text-foreground">curl</span>{" "}
              https://gateway.neurl.sg/v1/chat/completions \{"\n"}
              {"  "}-H{" "}
              <span className="text-green-600 dark:text-green-400">
                {'"'}Authorization: Bearer sk-nr-...{'"'}
              </span>{" "}
              \{"\n"}
              {"  "}-d{" "}
              <span className="text-green-600 dark:text-green-400">
                {'"'}&#123;&quot;model&quot;: &quot;auto&quot;, ...&#125;{'"'}
              </span>
            </code>
          </pre>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold">
            Infrastructure-grade AI operations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Stop managing AI integrations ad hoc. Neurl gives your engineering
            team a single control plane for model traffic.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Route,
                title: "Model Routing",
                desc: "Route requests to the right model based on content, cost, latency, or custom policies. Automatic fallback on failure.",
              },
              {
                icon: Shield,
                title: "Policy Engine",
                desc: "Define routing rules with priority-ordered policies. Cost ceilings, latency guards, and content-based dispatch.",
              },
              {
                icon: BarChart3,
                title: "Cost Analytics",
                desc: "Track spend per model, per key, per team. Set budgets and get alerts before costs escalate.",
              },
              {
                icon: Eye,
                title: "Observability",
                desc: "Full request-level logging with latency, tokens, cost, and policy audit trail. Search and filter in real time.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-background p-6"
              >
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h2 className="text-center text-3xl font-bold">
            Drop-in gateway. Zero rewrite.
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Point your SDK",
                desc: "Change your base URL to gateway.neurl.sg. Compatible with OpenAI, Anthropic, and Google SDK formats.",
              },
              {
                step: "02",
                title: "Define policies",
                desc: "Set routing rules in the dashboard. Content-based routing, cost guards, latency limits, and automatic fallback.",
              },
              {
                step: "03",
                title: "Ship with control",
                desc: "Every request is logged, measured, and routable. Swap models in production without code changes.",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-3">
                <span className="inline-block text-sm font-mono font-bold text-primary">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-bold">
            Take control of your AI traffic
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One gateway. Every model. Full visibility.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg">
              Start routing free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} {appConfig.name}. All rights
            reserved.
          </span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}
