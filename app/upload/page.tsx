'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileUpload } from '@/components/FileUpload';
import { LoadingSteps } from '@/components/LoadingSteps';
import { analyzePolicy, storeResultsInSession } from '@/lib/api';

export default function UploadPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("clarity_token");
    if (!token) router.push("/login");
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File, content: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) formData.append("policy_pdf", file);
      if (content) formData.append("policy_text", content);

      const response = await analyzePolicy(formData);

      if (response.status !== "success" || !response.data) {
        throw new Error(response.error || "Analysis failed");
      }

      const conflicts = response.data.conflicts || [];

      const normalizeSeverity = (riskCategory: string) => {
        if (!riskCategory) return "LOW";
        const value = riskCategory.toUpperCase();
        if (value.includes("CRITICAL")) return "HIGH";
        if (value.includes("HIGH")) return "HIGH";
        if (value.includes("MEDIUM")) return "MEDIUM";
        if (value.includes("LOW")) return "LOW";
        return "LOW";
      };

      const normalizedConflicts = conflicts.map((c: any) => ({
        ...c,
        normalizedSeverity: normalizeSeverity(c.risk_category),
      }));

      const highSeverity = normalizedConflicts.filter(
        (c: any) => c.normalizedSeverity === "HIGH"
      ).length;

      const mediumSeverity = normalizedConflicts.filter(
        (c: any) => c.normalizedSeverity === "MEDIUM"
      ).length;

      const lowSeverity = normalizedConflicts.filter(
        (c: any) => c.normalizedSeverity === "LOW"
      ).length;

      const total = conflicts.length;

      const risk_breakdown = [
        {
          category: "HIGH",
          count: highSeverity,
          percentage: total ? Math.round((highSeverity / total) * 100) : 0,
        },
        {
          category: "MEDIUM",
          count: mediumSeverity,
          percentage: total ? Math.round((mediumSeverity / total) * 100) : 0,
        },
        {
          category: "LOW",
          count: lowSeverity,
          percentage: total ? Math.round((lowSeverity / total) * 100) : 0,
        },
      ];

      const transformedResult = {
        firebase_id: response.firebase_id,
        document_name: file?.name || "Pasted Policy",
        analysis_timestamp: new Date().toISOString(),

        total_clauses: response.data.policy_clauses_count,
        total_conflicts: conflicts.length,

        high_severity_conflicts: highSeverity,
        medium_severity_conflicts: mediumSeverity,
        low_severity_conflicts: lowSeverity,

        total_penalties:
          response.data.summary.critical + response.data.summary.warnings,

        total_penalty_amount: conflicts.reduce(
          (sum: number, c: any) => sum + (c.fine_estimate_crores || 0),
          0
        ),

        conflicts: conflicts.map((c: any, index: number) => ({
          id: `${c.policyid}_${index}`,
          title: c.shorttitle,
          clause_1: c.policytext,
          clause_2: c.rbitext,
          description: c.reason,
          narrative: c.narrative,
          severity: normalizeSeverity(c.risk_category),
          risk_score: c.risk_score,
          fine_amount: c.fine_estimate_crores,
        })),

        risk_breakdown,

        penalties: conflicts
          .filter((c: any) => c.fine_estimate_crores > 0)
          .map((c: any, idx: number) => ({
            penalty_id: idx,
            description: c.shorttitle,
            amount: c.fine_estimate_crores,
            severity: normalizeSeverity(c.risk_category),
          })),
      };

      storeResultsInSession(transformedResult);
      router.push(`/results/${response.firebase_id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze document. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* MAIN SECTION ONLY gets gradient */}
      <main className="relative overflow-hidden">

        {/* Glow Background Scoped to MAIN ONLY */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-indigo-500/5 to-violet-500/10 blur-3xl opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 flex-1 flex flex-col justify-center">

          {isLoading ? (
            <LoadingSteps />
          ) : (
            <>
              {/* HERO */}
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                  AI-Powered Compliance Intelligence
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Upload Your Policy Document
                </h1>

                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI engine analyzes clauses, detects regulatory conflicts,
                  estimates financial exposure, and generates an audit-ready report.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-8 p-5 bg-red-50 border border-red-200 rounded-xl shadow-sm">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* UPLOAD CARD */}
              <div className="bg-card border border-border/50 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  isLoading={isLoading}
                />
              </div>

              {/* INFO STRIP */}
              <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">~2 min</div>
                  <div className="text-sm text-muted-foreground">
                    Average Processing Time
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-red-600">
                    HIGH / MEDIUM / LOW
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Severity Classification
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-indigo-600">
                    ₹ Risk Estimate
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Financial Exposure Calculation
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer now stays PURE white */}
      <Footer />
    </div>
  );
}