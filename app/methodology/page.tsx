import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import {
  CheckCircle2,
  Database,
  Brain,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <Header />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-indigo-500/5 to-violet-500/10 blur-3xl opacity-60 pointer-events-none" />

      <main className="flex-1 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-20">

          {/* ================= HERO ================= */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              AI-Powered Regulatory Intelligence
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">CLARITY</span> Works
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              CLARITY combines Natural Language Processing, regulatory mapping, and
              risk intelligence to detect compliance conflicts and financial exposure —
              transforming weeks of manual review into minutes.
            </p>
          </div>

          {/* ================= PIPELINE ================= */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-10 text-center">
              Compliance Analysis Pipeline
            </h2>

            <div className="space-y-8">
              {[
                {
                  icon: Database,
                  title: "Document Processing",
                  desc: "Extracts structured clauses from policy documents while preserving legal context.",
                },
                {
                  icon: Brain,
                  title: "Clause Intelligence",
                  desc: "NLP models interpret meaning, obligations, timelines, and regulatory references.",
                },
                {
                  icon: AlertCircle,
                  title: "Conflict Detection",
                  desc: "Identifies contradictions between internal policy and RBI master directions.",
                },
                {
                  icon: AlertCircle,
                  title: "Risk Quantification",
                  desc: "Scores violations using regulatory severity + enforcement likelihood.",
                },
                {
                  icon: BarChart3,
                  title: "Executive Report Generation",
                  desc: "Produces audit-ready output with actionable remediation insights.",
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    {i !== 4 && (
                      <div className="w-px h-full bg-border mt-4" />
                    )}
                  </div>

                  <div className="pt-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SEVERITY ================= */}
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-center mb-10">
              Risk Classification Framework
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  color: "red",
                  title: "High Severity",
                  desc: "Direct RBI violations requiring immediate remediation.",
                },
                {
                  color: "amber",
                  title: "Medium Severity",
                  desc: "Interpretation gaps or policy misalignment needing review.",
                },
                {
                  color: "emerald",
                  title: "Low Severity",
                  desc: "Minor inconsistencies suitable for monitoring.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className={`p-8 border-${item.color}-200 bg-${item.color}-50/40
                  hover:shadow-lg transition`}
                >
                  <h3 className={`text-${item.color}-600 font-semibold text-lg mb-3`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.desc}</p>

                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 text-${item.color}-600`} />
                      Regulatory interpretation mapping
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 text-${item.color}-600`} />
                      Penalty exposure estimation
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle2 className={`w-4 h-4 text-${item.color}-600`} />
                      Action prioritization guidance
                    </li>
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* ================= TECH ================= */}
          <Card className="p-10 mb-24">
            <h2 className="text-xl font-bold mb-6">Technology Foundation</h2>

            <div className="grid md:grid-cols-2 gap-10 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-3">AI Stack</h3>
                <ul className="space-y-2">
                  <li>• Regulatory NLP Models</li>
                  <li>• Semantic Clause Mapping</li>
                  <li>• Risk Scoring Engine</li>
                  <li>• Document Intelligence Pipelines</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Regulatory Knowledge Base</h3>
                <ul className="space-y-2">
                  <li>• RBI Master Directions</li>
                  <li>• Compliance Circular Corpus</li>
                  <li>• Enforcement Precedents</li>
                  <li>• Penalty Framework Mapping</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* ================= DISCLAIMER ================= */}
          <Card className="p-6 border border-border bg-muted/30">
            <h3 className="font-semibold mb-2">Professional Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              CLARITY is a decision-support system designed to augment compliance
              teams. Outputs should be validated by qualified legal and regulatory
              professionals prior to implementation.
            </p>
          </Card>

        </div>
      </main>

      <Footer />
    </div>
  );
}