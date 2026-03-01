

// // 'use client';

// // import { useState } from 'react';
// // import { Card } from '@/components/ui/card';
// // import { ChevronDown } from 'lucide-react';
// // import { Conflict } from '@/lib/types';

// // interface ConflictsTableProps {
// //   conflicts: Conflict[];
// // }

// // function getSeverityColor(severity: string) {
// //   switch (severity) {
// //     case 'HIGH':
// //       return 'bg-destructive/10 text-destructive border-destructive/20';
// //     case 'MEDIUM':
// //       return 'bg-yellow-50 text-yellow-700 border-yellow-200';
// //     case 'LOW':
// //       return 'bg-green-50 text-green-700 border-green-200';
// //     default:
// //       return 'bg-muted text-muted-foreground';
// //   }
// // }

// // function getSeverityLabel(severity: string) {
// //   switch (severity) {
// //     case 'HIGH':
// //       return 'Red';
// //     case 'MEDIUM':
// //       return 'Amber';
// //     case 'LOW':
// //       return 'Green';
// //     default:
// //       return 'Blue';
// //   }
// // }

// // export function ConflictsTable({ conflicts }: ConflictsTableProps) {
// //   const [expandedId, setExpandedId] = useState<string | null>(null);

// //   if (!conflicts.length) {
// //     return (
// //       <Card className="p-8 text-center">
// //         <p className="text-muted-foreground">No conflicts found.</p>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {conflicts.map((conflict) => (
// //         <Card key={conflict.id} className="overflow-hidden">
// //           {/* ---------- HEADER ROW ---------- */}
// //           <button
// //             onClick={() =>
// //               setExpandedId(expandedId === conflict.id ? null : conflict.id)
// //             }
// //             className="w-full p-6 flex items-center justify-between hover:bg-muted/40"
// //           >
// //             <div className="flex items-center gap-4 text-left">
// //               <span
// //                 className={`px-3 py-1 rounded border text-xs font-semibold ${getSeverityColor(
// //                   conflict.severity
// //                 )}`}
// //               >
// //                 {getSeverityLabel(conflict.severity)}
// //               </span>

// //               <h3 className="font-semibold text-foreground">
// //                 {conflict.title}
// //               </h3>
// //             </div>

// //             <div className="flex items-center gap-6">
// //               {/* Fine */}
// //               <span className="font-bold text-orange-600">
// //                 ₹{conflict.fine_amount?.toFixed(1)} Cr
// //               </span>

// //               <ChevronDown
// //                 className={`w-5 h-5 transition-transform ${
// //                   expandedId === conflict.id ? 'rotate-180' : ''
// //                 }`}
// //               />
// //             </div>
// //           </button>

// //           {/* ---------- EXPANDED CONTENT ---------- */}
// //           {expandedId === conflict.id && (
// //             <div className="border-t bg-muted/20 p-6 space-y-6">
// //               <div>
// //                 <h4 className="font-semibold mb-2">Policy Clause</h4>
// //                 <p className="text-sm">{conflict.clause_1}</p>
// //               </div>

// //               <div>
// //                 <h4 className="font-semibold mb-2">RBI Requirement</h4>
// //                 <p className="text-sm">{conflict.clause_2}</p>
// //               </div>

// //               <div>
// //                 <h4 className="font-semibold mb-2">Why This Is a Conflict</h4>
// //                 <p className="text-sm">{conflict.description}</p>
// //               </div>

// //               {conflict.narrative && (
// //                 <div>
// //                   <h4 className="font-semibold mb-2">Detailed Regulatory Analysis</h4>
// //                   <p className="text-sm whitespace-pre-line">
// //                     {conflict.narrative}
// //                   </p>
// //                 </div>
// //               )}

// //               <div className="flex justify-between text-sm pt-4 border-t">
// //                 <span>Risk Score: {conflict.risk_score}/10</span>
// //                 <span className="font-semibold text-orange-600">
// //                   Potential Penalty: ₹{conflict.fine_amount?.toFixed(1)} Cr
// //                 </span>
// //               </div>
// //             </div>
// //           )}
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// 'use client';

// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { ChevronDown, AlertTriangle, ShieldCheck } from 'lucide-react';
// import { Conflict } from '@/lib/types';

// interface ConflictsTableProps {
//   conflicts: Conflict[];
// }

// /* ---------------- Severity Styling System ---------------- */

// function getSeverityStyles(severity: string) {
//   switch (severity) {
//     case 'HIGH':
//       return {
//         badge: 'bg-red-50 text-red-700 border-red-200',
//         accent: 'border-l-red-500',
//         glow: 'hover:shadow-red-100',
//         icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
//         label: 'Critical Risk',
//       };
//     case 'MEDIUM':
//       return {
//         badge: 'bg-amber-50 text-amber-700 border-amber-200',
//         accent: 'border-l-amber-500',
//         glow: 'hover:shadow-amber-100',
//         icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
//         label: 'Moderate Risk',
//       };
//     default:
//       return {
//         badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
//         accent: 'border-l-emerald-500',
//         glow: 'hover:shadow-emerald-100',
//         icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
//         label: 'Low Risk',
//       };
//   }
// }

// /* ---------------- Component ---------------- */

// export function ConflictsTable({ conflicts }: ConflictsTableProps) {
//   const [expandedId, setExpandedId] = useState<string | null>(null);

//   if (!conflicts.length) {
//     return (
//       <Card className="p-10 text-center bg-gradient-to-br from-background to-muted/20">
//         <p className="text-muted-foreground">No compliance conflicts detected 🎉</p>
//       </Card>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {conflicts.map((conflict) => {
//         const styles = getSeverityStyles(conflict.severity);

//         return (
//           <Card
//             key={conflict.id}
//             className={`overflow-hidden border border-border border-l-4 ${styles.accent}
//             bg-gradient-to-br from-background to-muted/20
//             transition-all duration-300 hover:scale-[1.01] ${styles.glow}`}
//           >
//             {/* ================= HEADER ================= */}
//             <button
//               onClick={() =>
//                 setExpandedId(expandedId === conflict.id ? null : conflict.id)
//               }
//               className="w-full p-6 flex items-center justify-between text-left"
//             >
//               <div className="flex items-center gap-4 flex-1">
//                 {/* Severity Badge */}
//                 <span
//                   className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2 ${styles.badge}`}
//                 >
//                   {styles.icon}
//                   {styles.label}
//                 </span>

//                 {/* Title */}
//                 <h3 className="font-semibold text-foreground text-base md:text-lg">
//                   {conflict.title}
//                 </h3>
//               </div>

//               {/* Right Section */}
//               <div className="flex items-center gap-6">
//                 {/* Risk Score */}
//                 <span className="hidden md:block text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
//                   Risk {conflict.risk_score?.toFixed(2)}
//                 </span>

//                 {/* Fine */}
//                 {conflict.fine_amount > 0 && (
//                   <span className="font-semibold text-orange-600">
//                     ₹{conflict.fine_amount.toFixed(1)} Cr
//                   </span>
//                 )}

//                 <ChevronDown
//                   className={`w-5 h-5 transition-transform ${
//                     expandedId === conflict.id ? 'rotate-180' : ''
//                   }`}
//                 />
//               </div>
//             </button>

//             {/* ================= EXPANDED SECTION ================= */}
//             {expandedId === conflict.id && (
//               <div className="border-t border-border bg-gradient-to-b from-muted/30 to-background p-8 space-y-8">
                
//                 {/* Clause Comparison Grid */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="p-5 rounded-xl border bg-background shadow-sm">
//                     <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
//                       Policy Clause
//                     </h4>
//                     <p className="text-sm leading-relaxed">
//                       {conflict.clause_1}
//                     </p>
//                   </div>

//                   <div className="p-5 rounded-xl border bg-background shadow-sm">
//                     <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
//                       RBI Requirement
//                     </h4>
//                     <p className="text-sm leading-relaxed">
//                       {conflict.clause_2}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Conflict Explanation */}
//                 <div>
//                   <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
//                     Why This Is a Conflict
//                   </h4>
//                   <p className="text-sm leading-relaxed">
//                     {conflict.description}
//                   </p>
//                 </div>

//                 {/* Detailed Analysis */}
//                 {conflict.narrative && (
//                   <div>
//                     <h4 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
//                       Detailed Regulatory Analysis
//                     </h4>
//                     <div className="p-5 rounded-xl bg-muted/30 border text-sm leading-relaxed whitespace-pre-line">
//                       {conflict.narrative}
//                     </div>
//                   </div>
//                 )}

//                 {/* Footer Metrics */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t">
//                   <div className="text-sm">
//                     <span className="font-semibold">Risk Score:</span>{' '}
//                     {conflict.risk_score}/10
//                   </div>

//                   {conflict.fine_amount > 0 && (
//                     <div className="text-sm font-semibold text-orange-600">
//                       Estimated Financial Exposure: ₹{conflict.fine_amount.toFixed(1)} Cr
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Card>
//         );
//       })}
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, AlertTriangle, ShieldCheck, Gauge } from 'lucide-react';
import { Conflict } from '@/lib/types';

interface ConflictsTableProps {
  conflicts: Conflict[];
}

/* ---------------- Severity Visual System ---------------- */

function getSeverityStyles(severity: string) {
  switch (severity) {
    case 'HIGH':
      return {
        badge: 'bg-red-50 text-red-700 border-red-200',
        accent: 'border-l-red-500',
        glow: 'hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.35)]',
        gradient: 'from-red-50/40 to-transparent',
        icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
        label: 'Critical Risk',
      };
    case 'MEDIUM':
      return {
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        accent: 'border-l-amber-500',
        glow: 'hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.35)]',
        gradient: 'from-amber-50/40 to-transparent',
        icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
        label: 'Moderate Risk',
      };
    default:
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        accent: 'border-l-emerald-500',
        glow: 'hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.35)]',
        gradient: 'from-emerald-50/40 to-transparent',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
        label: 'Low Risk',
      };
  }
}

/* ---------------- Risk Meter ---------------- */

function RiskMeter({ score }: { score: number }) {
  const width = Math.min(Math.max(score * 10, 5), 100); // normalize 0-10 → %

  return (
    <div className="w-32">
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary via-indigo-500 to-violet-500 transition-all duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="text-xs text-muted-foreground mt-1 text-right">
        {score.toFixed(2)} / 10
      </div>
    </div>
  );
}

/* ---------------- Component ---------------- */

export function ConflictsTable({ conflicts }: ConflictsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!conflicts.length) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-background to-muted/20">
        <p className="text-muted-foreground">
          ✅ No compliance conflicts detected
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {conflicts.map((conflict) => {
        const styles = getSeverityStyles(conflict.severity);

        return (
          <Card
            key={conflict.id}
            className={`
              overflow-hidden border border-border border-l-4 ${styles.accent}
              bg-gradient-to-br ${styles.gradient} from-background
              transition-all duration-300 hover:scale-[1.01] ${styles.glow}
            `}
          >
            {/* ================= HEADER ================= */}
            <button
              onClick={() =>
                setExpandedId(expandedId === conflict.id ? null : conflict.id)
              }
              className="w-full p-6 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Severity Badge */}
                <span
                  className={`px-3 py-1 rounded-full border text-xs font-semibold flex items-center gap-2 ${styles.badge}`}
                >
                  {styles.icon}
                  {styles.label}
                </span>

                {/* Title */}
                <h3 className="font-semibold text-base md:text-lg text-foreground">
                  {conflict.title}
                </h3>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                <RiskMeter score={conflict.risk_score} />

                {conflict.fine_amount > 0 && (
                  <span className="font-semibold text-orange-600 whitespace-nowrap">
                    ₹{conflict.fine_amount.toFixed(2)} Cr
                  </span>
                )}

                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedId === conflict.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {/* ================= EXPANDED ================= */}
            {expandedId === conflict.id && (
              <div className="border-t bg-gradient-to-b from-muted/30 to-background p-8 space-y-8 animate-in fade-in duration-300">

                {/* Clause Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl border bg-background shadow-sm">
                    <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Your Policy Clause
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {conflict.clause_1}
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border bg-background shadow-sm">
                    <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      RBI Requirement
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {conflict.clause_2}
                    </p>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                    Why This Is a Conflict
                  </h4>
                  <p className="text-sm leading-relaxed">
                    {conflict.description}
                  </p>
                </div>

                {/* Narrative */}
                {conflict.narrative && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                      Regulatory Interpretation
                    </h4>
                    <div className="p-5 rounded-xl bg-muted/30 border text-sm whitespace-pre-line leading-relaxed">
                      {conflict.narrative}
                    </div>
                  </div>
                )}

                {/* Footer Metrics */}
                <div className="flex justify-between items-center pt-6 border-t text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gauge className="w-4 h-4" />
                    Risk Score: <span className="font-semibold text-foreground">
                      {conflict.risk_score.toFixed(2)}
                    </span>
                  </div>

                  {conflict.fine_amount > 0 && (
                    <div className="font-semibold text-orange-600">
                      Estimated Exposure: ₹{conflict.fine_amount.toFixed(2)} Cr
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}