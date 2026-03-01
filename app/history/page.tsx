'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchHistory, deleteHistoryItem } from '@/lib/api';
import { Clock, FileText, ShieldCheck, Trash2 } from 'lucide-react';

interface HistoryEntry {
  firebase_id: string;
  input_type: string;
  input_length: number;
  critical: number;
  warnings: number;
  createdAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ================= LOAD HISTORY ================= */

  useEffect(() => {
    async function loadHistory() {
      try {
        const response = await fetchHistory();
        setHistory(response.data || []);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      'Delete this report permanently from audit history?'
    );

    if (!confirmDelete) return;

    try {
      await deleteHistoryItem(id);

      // remove from UI instantly
      setHistory((prev) => prev.filter((item) => item.firebase_id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete report');
    }
  };

  /* ================= DATE FORMAT (IST) ================= */

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);

      const formatted = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(date);

      return `${formatted} `;
    } catch {
      return timestamp;
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-indigo-500/5 to-violet-500/10">
      <Header />

      <main className="flex-1">
        {/* HERO */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-3">Compliance Audit Trail</h1>

            <p className="text-muted-foreground">
              Maintain a persistent history of all compliance analyses for audits,
              governance, and regulatory validation.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <div className="max-w-4xl mx-auto px-4 pb-16">
          {isLoading ? (
            <div className="text-center py-16 text-muted-foreground">
              Loading audit records...
            </div>
          ) : history.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">No Analyses Yet</h2>
              <Link href="/upload">
                <Button>Run First Analysis</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-6">
              {history.map((entry) => (
                <Card
                  key={entry.firebase_id}
                  className="p-6 border bg-background hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start">
                    {/* LEFT → Clickable */}
                    <Link
                      href={`/results/${entry.firebase_id}`}
                      className="flex-1"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>

                          <h3 className="font-semibold text-lg">
                            {entry.input_type}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {formatDate(entry.createdAt)}
                        </div>

                        <div className="flex gap-3 pt-2">
                          <span className="px-3 py-1 text-xs rounded-full bg-red-50 text-red-700 border">
                            HIGH: {entry.critical}
                          </span>

                          <span className="px-3 py-1 text-xs rounded-full bg-yellow-50 text-yellow-700 border">
                            MEDIUM: {entry.warnings}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* RIGHT → ACTIONS */}
                    <div className="flex flex-col gap-3">
                      <Link href={`/results/${entry.firebase_id}`}>
                        <Button variant="outline">View</Button>
                      </Link>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(entry.firebase_id)}
                        className="flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}