// ================================
// RBI Compliance Analysis Types
// ================================

export type Severity = "HIGH" | "MEDIUM" | "LOW";

// --------------------------------
// Conflict (Frontend Normalized)
// --------------------------------
export interface Conflict {
  id: string;                 // unique frontend id (policyid or generated)
  title: string;              // shorttitle from backend

  clause_1: string;           // policytext
  clause_2: string;           // rbitext

  severity: Severity;         // normalized from risk_category

  description: string;        // reason
  narrative?: string;         // detailed narrative

  risk_score: number;         // numeric risk score
  fine_amount: number;        // fine_estimate_crores
}

// --------------------------------
// Penalty
// --------------------------------
export interface Penalty {
  penalty_id: number;
  description: string;
  amount: number;             // in Crores
  severity: Severity;
}

// --------------------------------
// Risk Breakdown
// --------------------------------
export interface RiskBreakdown {
  category: string;     // HIGH / MEDIUM / LOW
  count: number;
  percentage: number;
}

// --------------------------------
// Main Analysis Result
// --------------------------------
export interface AnalysisResult {
  firebase_id: string;
  document_name: string;
  analysis_timestamp: string;

  total_clauses: number;
  total_conflicts: number;

  high_severity_conflicts: number;
  medium_severity_conflicts: number;
  low_severity_conflicts: number;

  total_penalties: number;
  total_penalty_amount: number;   // in Crores

  conflicts: Conflict[];
  penalties: Penalty[];
  risk_breakdown: RiskBreakdown[];
}

// --------------------------------
// API Request / Response
// --------------------------------
export interface AnalysisRequest {
  file_name: string;
  document_content: string;
}

export interface AnalysisResponse {
  status: string;
  data?: AnalysisResult;
  error?: string;
  firebase_id?: string;
}

// --------------------------------
// History Entry
// --------------------------------
export interface HistoryEntry {
  firebase_id: string;
  document_name: string;
  analysis_timestamp: string;
  total_conflicts: number;
  high_severity_conflicts: number;
}