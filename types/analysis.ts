export type RiskLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Summary {
  title: string;
  parties: string[];
  duration: string;
  value: string;
  keyPoints: string[];
}

export interface RiskClause {
  clause: string;
  reason: string;
  riskLevel: RiskLevel;
  originalText: string;
}

export interface AnalysisResult {
  summary: Summary;
  riskClauses: RiskClause[];
  notaryQuestions: string[];
  overallRisk: RiskLevel;
  language: string;
}
