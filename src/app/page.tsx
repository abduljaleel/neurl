import Link from "next/link";
import { appConfig } from "@/lib/config";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-[#e4e4e7]" style={{ fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace" }}>
      {/* Nav */}
      <header className="border-b border-[#1a1a1a]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-[#e4e4e7]">neurl</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-[#555] hover:text-[#22c55e] transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="text-xs border border-[#22c55e]/40 text-[#22c55e] px-4 py-1.5 hover:bg-[#22c55e]/10 transition-colors">
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pt-32 pb-20 text-center">
        <div className="flex items-center gap-2 mb-10">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#22c55e] animate-pulse" style={{ boxShadow: '0 0 8px #22c55e, 0 0 20px #22c55e40' }} />
          <span className="text-xs tracking-[0.3em] uppercase text-[#22c55e]">System Online</span>
        </div>
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter text-white" style={{ fontFamily: "'SF Mono', 'Fira Code', Menlo, monospace", fontWeight: 700 }}>
          neurl
        </h1>
        <p className="mt-6 text-lg text-[#555] tracking-wide">
          The control tower for AI traffic
        </p>
      </section>

      {/* Live Traffic Visualization */}
      <section className="border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-xs text-[#555] uppercase tracking-[0.2em]">Live Traffic</span>
          </div>

          <div className="space-y-4">
            {/* Lane 1: GPT-4o */}
            <div className="flex items-center gap-4">
              <span className="w-28 text-right text-xs text-[#666] shrink-0">GPT-4o</span>
              <div className="flex-1 h-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.4s linear infinite', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.4s linear infinite 0.8s', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.4s linear infinite 1.6s', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>

            {/* Lane 2: Claude 3.5 */}
            <div className="flex items-center gap-4">
              <span className="w-28 text-right text-xs text-[#666] shrink-0">Claude 3.5</span>
              <div className="flex-1 h-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 1.8s linear infinite', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 1.8s linear infinite 0.6s', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 1.8s linear infinite 1.2s', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>

            {/* Lane 3: Gemini */}
            <div className="flex items-center gap-4">
              <span className="w-28 text-right text-xs text-[#666] shrink-0">Gemini</span>
              <div className="flex-1 h-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 3.2s linear infinite', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 3.2s linear infinite 1.6s', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>

            {/* Lane 4: Llama 3 */}
            <div className="flex items-center gap-4">
              <span className="w-28 text-right text-xs text-[#666] shrink-0">Llama 3</span>
              <div className="flex-1 h-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.0s linear infinite', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.0s linear infinite 1.0s', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>

            {/* Lane 5: Mistral */}
            <div className="flex items-center gap-4">
              <span className="w-28 text-right text-xs text-[#666] shrink-0">Mistral</span>
              <div className="flex-1 h-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded relative overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.8s linear infinite 0.5s', boxShadow: '0 0 6px #22c55e' }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#22c55e]" style={{ animation: 'slidePacket 2.8s linear infinite 1.9s', boxShadow: '0 0 6px #22c55e' }} />
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-[#22c55e]" style={{ textShadow: '0 0 10px #22c55e40' }}>
            1.2M requests routed in the last 24 hours
          </p>
        </div>
      </section>

      {/* Terminal Code Block */}
      <section className="border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-lg border border-[#1a1a1a] overflow-hidden" style={{ boxShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0c0c0c] border-b border-[#1a1a1a]">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-4 text-xs text-[#555]">Terminal -- neurl</span>
            </div>
            {/* Terminal content */}
            <div className="bg-[#0a0a0a] p-6 text-sm leading-loose">
              <div>
                <span className="text-[#555]">$</span>{" "}
                <span className="text-white">neurl route</span>{" "}
                <span className="text-[#666]">\</span>
              </div>
              <div className="pl-6">
                <span className="text-[#818cf8]">--model</span>{" "}
                <span className="text-[#22c55e]">&quot;best&quot;</span>{" "}
                <span className="text-[#666]">\</span>
              </div>
              <div className="pl-6">
                <span className="text-[#818cf8]">--budget</span>{" "}
                <span className="text-[#22c55e]">&quot;$0.05&quot;</span>{" "}
                <span className="text-[#666]">\</span>
              </div>
              <div className="pl-6">
                <span className="text-[#818cf8]">--latency</span>{" "}
                <span className="text-[#22c55e]">&quot;&lt;500ms&quot;</span>{" "}
                <span className="text-[#666]">\</span>
              </div>
              <div className="pl-6">
                <span className="text-[#818cf8]">--fallback</span>{" "}
                <span className="text-[#22c55e]">&quot;gpt-4o-mini&quot;</span>
              </div>
              <div className="mt-4 border-t border-[#1a1a1a] pt-4">
                <span className="text-[#22c55e]">{"→"}</span>{" "}
                <span className="text-[#e4e4e7]">Routed to</span>{" "}
                <span className="text-white font-semibold">claude-3.5-sonnet</span>{" "}
                <span className="text-[#555]">(</span>
                <span className="text-[#f59e0b]">340ms</span>
                <span className="text-[#555]">,</span>{" "}
                <span className="text-[#22c55e]">$0.003</span>
                <span className="text-[#555]">)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features as Terminal Commands */}
      <section className="border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { cmd: "neurl models", label: "Model Registry", desc: "Unified catalog of every model. Capabilities, pricing, latency benchmarks." },
              { cmd: "neurl policies", label: "Policy Engine", desc: "Priority-ordered rules. Cost ceilings, latency guards, content routing." },
              { cmd: "neurl logs", label: "Request Logs", desc: "Full request-level traces. Latency, tokens, cost, policy decisions." },
              { cmd: "neurl costs", label: "Cost Analytics", desc: "Spend per model, per key, per team. Budgets and alerts." },
            ].map((f) => (
              <div key={f.cmd} className="border border-[#1a1a1a] bg-[#0a0a0a] p-5 hover:border-[#22c55e]/30 transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#555]">$</span>
                  <span className="text-[#22c55e] text-sm group-hover:text-white transition-colors">{f.cmd}</span>
                </div>
                <div className="text-white text-sm font-semibold mb-1">{f.label}</div>
                <div className="text-xs text-[#555] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow - ASCII style */}
      <section className="border-t border-[#1a1a1a] bg-[#050505]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-xs text-[#555] uppercase tracking-[0.2em] mb-10 text-center">Architecture</p>
          <div className="overflow-x-auto">
            <pre className="text-sm text-center leading-relaxed whitespace-pre">
<span className="text-[#555]">{"   "}+-----------+{"       "}+----------------+{"       "}+---------------+{"       "}+------------+</span>{"\n"}
<span className="text-[#e4e4e7]">{"   "}|</span> <span className="text-white">Your App</span> <span className="text-[#e4e4e7]">|</span><span className="text-[#22c55e]">{"  "}----&gt;{"  "}</span><span className="text-[#e4e4e7]">|</span> <span className="text-[#22c55e]">Neurl Gateway</span> <span className="text-[#e4e4e7]">|</span><span className="text-[#22c55e]">{"  "}----&gt;{"  "}</span><span className="text-[#e4e4e7]">|</span> <span className="text-[#f59e0b]">Policy Engine</span> <span className="text-[#e4e4e7]">|</span><span className="text-[#22c55e]">{"  "}----&gt;{"  "}</span><span className="text-[#e4e4e7]">|</span> <span className="text-[#818cf8]">AI Models</span> <span className="text-[#e4e4e7]">|</span>{"\n"}
<span className="text-[#555]">{"   "}+-----------+{"       "}+----------------+{"       "}+---------------+{"       "}+------------+</span>{"\n"}
<span className="text-[#555]">{"     "}SDK / HTTP{"          "}Route + Observe{"           "}Rules + Guards{"          "}GPT / Claude</span>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-6xl px-6 py-28 text-center">
          <p className="text-[#555] text-sm mb-6">One gateway. Every model. Full control.</p>
          <Link
            href="/signup"
            className="inline-block border border-[#22c55e] text-[#22c55e] px-8 py-3 text-sm hover:bg-[#22c55e] hover:text-black transition-all duration-200"
            style={{ boxShadow: '0 0 20px #22c55e20' }}
          >
            Deploy your gateway {"→"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a1a]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-xs text-[#333]">
          <span>&copy; {new Date().getFullYear()} {appConfig.name}</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes slidePacket {
          0% { left: -4px; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { left: calc(100% + 4px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
