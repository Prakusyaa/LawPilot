import { RiskClause } from "@/types/analysis";

interface RiskPanelProps {
  clauses: RiskClause[];
}

export function RiskPanel({ clauses }: RiskPanelProps) {
  if (clauses.length === 0) {
    return (
      <div className="rounded-lg border border-wire bg-layer p-5 flex items-center justify-center h-full min-h-[120px]">
        <div
          className="w-full rounded-md border p-5 text-center"
          style={{
            backgroundColor: "var(--lp-risk-low-bg)",
            borderColor: "var(--lp-risk-low-border)",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "var(--lp-risk-low)" }}>
            ✓ Tidak ditemukan klausul berisiko.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-wire bg-layer flex flex-col h-[600px]">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-wire flex items-center justify-between">
        <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3">
          Klausul Risiko
        </p>
        <span
          className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded"
          style={{
            backgroundColor: "var(--lp-risk-high-bg)",
            color: "var(--lp-risk-high)",
          }}
        >
          {clauses.length} ditemukan
        </span>
      </div>

      {/* Clause list */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1">
        {clauses.map((clause, index) => {
          const isHigh = clause.riskLevel === "HIGH";
          const isMedium = clause.riskLevel === "MEDIUM";

          const cardBg = isHigh
            ? "var(--lp-risk-high-bg)"
            : isMedium
            ? "var(--lp-risk-medium-bg)"
            : "var(--lp-risk-low-bg)";
          const cardBorder = isHigh
            ? "var(--lp-risk-high-border)"
            : isMedium
            ? "var(--lp-risk-medium-border)"
            : "var(--lp-risk-low-border)";
          const accentColor = isHigh
            ? "var(--lp-risk-high)"
            : isMedium
            ? "var(--lp-risk-medium)"
            : "var(--lp-risk-low)";
          const badgeText = isHigh ? "HIGH" : isMedium ? "MEDIUM" : "LOW";

          return (
            <div
              key={index}
              className="rounded-md border transition-colors"
              style={{
                backgroundColor: cardBg,
                borderColor: cardBorder,
                borderLeftWidth: "2px",
                borderLeftColor: accentColor,
              }}
            >
              <div className="p-4">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h4 className="text-sm font-medium text-ink leading-snug">
                    {clause.clause}
                  </h4>
                  {/* Solid color pill — no glow, sharp */}
                  <span
                    className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 uppercase"
                    style={{ backgroundColor: accentColor, color: "#FFFFFF" }}
                    aria-label={`Tingkat risiko: ${badgeText}`}
                  >
                    {badgeText}
                  </span>
                </div>
                <p className="text-xs text-ink-2 leading-relaxed">{clause.reason}</p>
                {clause.originalText && (
                  <blockquote className="mt-3 pl-3 border-l-2 border-wire">
                    <p className="text-[11px] font-mono text-ink-3 italic">
                      &quot;{clause.originalText}&quot;
                    </p>
                  </blockquote>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
