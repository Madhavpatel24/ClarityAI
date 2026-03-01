import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Zap, Shield, BarChart3, AlertCircle, ShieldAlert } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Header />

      {/* ================= HERO ================= */}
      <section className="relative py-28 px-4 overflow-hidden">
        {/* Gradient Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-indigo-500/20 blur-3xl opacity-60" />
        <div className="absolute top-20 left-1/3 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              CLARITY
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered RBI compliance intelligence that detects regulatory conflicts,
            quantifies risk, and prevents costly violations — in minutes, not weeks.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/upload">
              <Button
                size="lg"
                className="px-8 py-6 text-base rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl transition-all"
              >
                Start Analysis
              </Button>
            </Link>

            <Link href="/methodology">
              <Button size="lg" variant="outline" className="px-8 py-6 text-base rounded-xl">
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= STATS STRIP ================= */}
      <section className="py-10 border-y border-border bg-muted/20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "40×", label: "Faster Reviews" },
            { value: "₹100Cr+", label: "Risk Prevented" },
            { value: "500+", label: "RBI Rules Covered" },
            { value: "AI-Driven", label: "Continuous Monitoring" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES (BENTO STYLE) ================= */}
      {/* Features Section */}
<section className="py-20 px-4 bg-muted/20 relative overflow-hidden">
  {/* subtle background glow */}
  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

  <div className="max-w-6xl mx-auto relative z-10">
    <h2 className="text-3xl font-bold text-center mb-14">
      Powerful Compliance Analysis
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Feature 1 */}
      <Card className="group p-8 bg-gradient-to-br from-blue-50 to-background border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Zap className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Instant Analysis</h3>
        </div>

        <p className="text-muted-foreground mb-6">
          Upload documents and receive clause-level compliance evaluation in minutes.
        </p>

        <div className="text-3xl font-bold text-blue-600">~2 min</div>
        <span className="text-xs text-muted-foreground">
          Avg processing time
        </span>
      </Card>

      {/* Feature 2 */}
      <Card className="group p-8 bg-gradient-to-br from-red-50 to-background border border-red-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertCircle className="text-red-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Conflict Detection</h3>
        </div>

        <p className="text-muted-foreground mb-6">
          Automatically identify regulatory mismatches with explainable AI reasoning.
        </p>

        <div className="text-3xl font-bold text-red-600">100%</div>
        <span className="text-xs text-muted-foreground">
          Clause comparison coverage
        </span>
      </Card>

      {/* Feature 3 */}
      <Card className="group p-8 bg-gradient-to-br from-amber-50 to-background border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
            <ShieldAlert className="text-amber-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Penalty Assessment</h3>
        </div>

        <p className="text-muted-foreground mb-6">
          Quantify financial exposure before regulators do.
        </p>

        <div className="text-3xl font-bold text-amber-600">₹ Risk</div>
        <span className="text-xs text-muted-foreground">
          Estimated regulatory exposure
        </span>
      </Card>

      {/* Feature 4 */}
      <Card className="group p-8 bg-gradient-to-br from-indigo-50 to-background border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
            <BarChart3 className="text-indigo-600 w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold">Risk Visualization</h3>
        </div>

        <p className="text-muted-foreground mb-6">
          Clear breakdown of HIGH / MEDIUM / LOW risk exposure.
        </p>

        <div className="text-3xl font-bold text-indigo-600">3-Tier</div>
        <span className="text-xs text-muted-foreground">
          Categorized risk scoring
        </span>
      </Card>
    </div>
  </div>
</section>

      {/* ================= PROCESS ================= */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold text-center">Simple 3-Step Process</h2>

          {[
            "Upload your internal policy or RBI circular",
            "CLARITY analyzes clauses using AI + regulatory mapping",
            "Receive actionable compliance report with risk & penalties",
          ].map((text, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                {i + 1}
              </div>
              <p className="text-lg text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-indigo-500/10 to-purple-500/10 blur-2xl" />
        <div className="relative max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Start Your Compliance Analysis Today</h2>
          <p className="text-muted-foreground">
            Detect risks early. Reduce manual review. Stay audit-ready.
          </p>

          <Link href="/upload">
            <Button size="lg" className="px-10 py-6 text-base rounded-xl shadow-lg">
              Analyze Document
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}