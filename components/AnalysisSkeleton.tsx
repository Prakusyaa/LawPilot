export function AnalysisSkeleton() {
  return (
    <div className="w-full mt-8 flex flex-col gap-4" aria-live="polite" aria-label="Menganalisis dokumen...">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-7 w-44 rounded-md" />
        <div className="skeleton h-7 w-28 rounded-md" />
      </div>

      {/* 2-col row: Summary | Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Summary skeleton */}
        <div className="rounded-lg border border-wire bg-layer p-5 flex flex-col gap-4">
          <div className="skeleton h-3.5 w-20 rounded" />
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-24 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-3 w-24 rounded mt-1" />
            <div className="skeleton h-4 w-3/4 rounded" />
            <div className="skeleton h-3 w-24 rounded mt-1" />
            <div className="skeleton h-4 w-1/2 rounded" />
          </div>
          <div className="skeleton h-px w-full rounded" />
          <div className="flex flex-col gap-2">
            <div className="skeleton h-3 w-20 rounded" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="skeleton h-3.5 w-3.5 rounded-full shrink-0 mt-0.5" />
                <div className="skeleton h-3.5 w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Risk skeleton */}
        <div className="rounded-lg border border-wire bg-layer p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="skeleton h-3.5 w-24 rounded" />
            <div className="skeleton h-5 w-20 rounded" />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-md border border-l-2 p-4 flex flex-col gap-2 bg-layer-2"
              style={{ borderLeftColor: "var(--lp-border)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-5 w-14 rounded" />
              </div>
              <div className="skeleton h-3.5 w-full rounded" />
              <div className="skeleton h-3.5 w-5/6 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Questions skeleton — full width */}
      <div className="rounded-lg border border-wire bg-layer p-5 flex flex-col gap-4">
        <div className="skeleton h-3.5 w-40 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-md border border-wire bg-layer-2 p-4 flex items-start gap-3"
            >
              <div className="skeleton h-6 w-6 rounded-full shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="skeleton h-3.5 w-full rounded" />
                <div className="skeleton h-3.5 w-4/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-3 text-center animate-pulse">
        Gemini sedang membaca dokumen Anda...
      </p>
    </div>
  );
}
