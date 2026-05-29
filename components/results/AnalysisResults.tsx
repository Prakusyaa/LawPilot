import { AnalysisResult } from "@/types/analysis";
import { SummaryPanel } from "./SummaryPanel";
import { RiskPanel } from "./RiskPanel";
import { QuestionsPanel } from "./QuestionsPanel";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const isHigh = result.overallRisk === "HIGH";
  const isMedium = result.overallRisk === "MEDIUM";

  const pillBg = isHigh
    ? "var(--lp-risk-high)"
    : isMedium
    ? "var(--lp-risk-medium)"
    : "var(--lp-risk-low)";

  const pillText = isHigh ? "HIGH RISK" : isMedium ? "MEDIUM RISK" : "LOW RISK";

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header + risk badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-ink">Hasil Analisis</h2>
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-semibold uppercase tracking-wide self-start sm:self-auto"
          style={{ backgroundColor: pillBg, color: "#FFFFFF" }}
          aria-label={`Tingkat risiko keseluruhan: ${pillText}`}
        >
          {pillText}
        </div>
      </div>

      {/* 2-col: Summary | Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SummaryPanel summary={result.summary} />
        <RiskPanel clauses={result.riskClauses} />
      </div>

      {/* Full-width: Questions */}
      <QuestionsPanel questions={result.notaryQuestions} />
    </div>
  );
}
