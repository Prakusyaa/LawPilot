import { Summary } from "@/types/analysis";

interface SummaryPanelProps {
  summary: Summary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  return (
    <div className="rounded-lg border border-wire bg-layer flex flex-col h-[600px]">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-wire">
        <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3">
          Ringkasan
        </p>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto">
        <h3 className="text-base font-semibold text-ink leading-snug">
          {summary.title}
        </h3>

        <dl className="flex flex-col gap-3">
          {[
            { label: "Pihak yang terlibat", value: summary.parties.join(", ") },
            { label: "Durasi", value: summary.duration },
            { label: "Nilai kontrak", value: summary.value },
          ].map(({ label, value }) => (
            <div key={label}>
              <dt className="text-[11px] font-mono uppercase tracking-wide text-ink-3 mb-0.5">
                {label}
              </dt>
              <dd className="text-sm text-ink-2">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-wire pt-4">
          <p className="text-[11px] font-mono uppercase tracking-wide text-ink-3 mb-2.5">
            Poin Penting
          </p>
          <ul className="flex flex-col gap-2">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-ink-2">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full flex-none"
                  style={{ backgroundColor: "var(--lp-accent)" }}
                />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
