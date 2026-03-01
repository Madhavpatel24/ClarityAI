'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import { RiskBreakdown } from '@/lib/types';

interface RiskChartProps {
  data: RiskBreakdown[];
}

const COLORS: Record<string, string> = {
  HIGH: '#dc2626',     // red
  MEDIUM: '#f59e0b',   // amber
  LOW: '#10b981',      // green
};

export function RiskChart({ data }: RiskChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-64 bg-muted/30 rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No risk data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

        {/* X Axis = Severity */}
        <XAxis
          dataKey="category"
          stroke="var(--color-muted-foreground)"
        />

        {/* Y Axis = Count */}
        <YAxis stroke="var(--color-muted-foreground)" />

        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [`${value} conflicts`, 'Count']}
        />

        <Bar dataKey="count" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.category] || '#2563eb'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}