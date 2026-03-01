'use client';

import { Card } from '@/components/ui/card';
import { AlertCircle, TrendingDown, FileText, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  totalClauses: number;
  totalConflicts: number;
  totalPenalties: number;
  totalPenaltyAmount: number;
}

export function SummaryCards({
  totalClauses,
  totalConflicts,
  totalPenalties,
  totalPenaltyAmount,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Clauses */}
      <Card className="p-6 border border-border bg-background hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Clauses</p>
            <p className="text-3xl font-bold text-foreground">{totalClauses}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Clauses extracted and analyzed</p>
      </Card>

      {/* Total Conflicts */}
      <Card className="p-6 border border-border bg-background hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Conflicts Found</p>
            <p className="text-3xl font-bold text-foreground">{totalConflicts}</p>
          </div>
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Regulatory conflicts identified</p>
      </Card>

      {/* Total Penalties */}
      <Card className="p-6 border border-border bg-background hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Penalties Identified</p>
            <p className="text-3xl font-bold text-foreground">{totalPenalties}</p>
          </div>
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-accent" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Potential penalty clauses</p>
      </Card>

      {/* Total Penalty Amount */}
      <Card className="p-6 border border-border bg-background hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Max Penalty Amount</p>
            <p className="text-3xl font-bold text-foreground">₹{Number(totalPenaltyAmount).toFixed(2)} Cr</p>
          </div>
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-orange-600" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Maximum financial exposure</p>
      </Card>
    </div>
  );
}
