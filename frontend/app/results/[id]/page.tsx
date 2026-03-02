'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SummaryCards } from '@/components/SummaryCards';
import { ConflictsTable } from '@/components/ConflictsTable';
import { RiskChart } from '@/components/RiskChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getResultsFromSession } from '@/lib/api';
import { AnalysisResult } from '@/lib/types';
import { ArrowLeft, Download } from 'lucide-react';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const firebaseId = params.id as string;

  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getResultsFromSession(firebaseId);
    if (data) setResults(data);
    setIsLoading(false);
  }, [firebaseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading results...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Results Not Found</h1>
            <Button onClick={() => router.push('/upload')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

const handleDownload = async () => {
  try {
    const token = localStorage.getItem("clarity_token");

    const response = await fetch(
      `${API_BASE_URL}/report/${results.firebase_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download report");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "CLARITY_Full_Audit_Report.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error(err);
    alert("Download failed. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/30 to-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* ---------- REPORT HEADER ---------- */}
          <div className="rounded-2xl p-8 mb-10 ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/upload')}
                  className="mb-3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <h1 className="text-3xl md:text-4xl font-bold">
                  Compliance Analysis Report
                </h1>

                <p className="text-muted-foreground mt-2">
                  {results.document_name} •{" "}
                  {new Date(results.analysis_timestamp).toLocaleDateString()}
                </p>
              </div>

              <Button
                onClick={handleDownload}
                className="h-fit px-6 py-5 text-base shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Full Audit Report
              </Button>
            </div>
          </div>

          {/* ---------- SUMMARY ---------- */}
          <div className="mb-12">
            <SummaryCards
              totalClauses={results.total_clauses}
              totalConflicts={results.total_conflicts}
              totalPenalties={results.total_penalties}
              totalPenaltyAmount={results.total_penalty_amount}
            />
          </div>

          {/* ---------- RISK CHART ---------- */}
          <Card className="p-8 mb-12 shadow-sm border bg-background/70 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">
              Risk Distribution Overview
            </h2>
            <RiskChart data={results.risk_breakdown} />
          </Card>

          {/* ---------- CONFLICTS ---------- */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              Clause-Level Conflict Analysis
            </h2>

            <div className="bg-background/70 backdrop-blur rounded-2xl border shadow-sm p-6">
              <ConflictsTable conflicts={results.conflicts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}