interface QuestionsPanelProps {
  questions: string[];
}

export function QuestionsPanel({ questions }: QuestionsPanelProps) {
  return (
    <div className="rounded-lg border border-wire bg-layer flex flex-col max-h-[400px] md:max-h-none">
      {/* Header — always visible */}
      <div className="px-5 py-4 border-b border-wire shrink-0">
        <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3">
          Pertanyaan untuk Notaris
        </p>
      </div>

      {/* Scroll wrapper — flex-1 + min-h-0 so flexbox can actually clip overflow */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {questions.map((question, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-md border border-wire bg-background p-4 hover:bg-layer-2 transition-colors min-h-[44px]"
            >
              <span
                className="flex-none w-6 h-6 rounded-full bg-layer-2 border border-wire flex items-center justify-center text-xs font-mono font-semibold shrink-0"
                style={{ color: "var(--lp-accent)" }}
              >
                {index + 1}
              </span>
              <p className="text-sm text-ink-2 leading-relaxed">{question}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer — always visible */}
      <div className="px-5 py-3 border-t border-wire shrink-0">
        <p className="text-xs text-ink-3 italic">
          LawPilot tidak menyediakan layanan pengacara. Gunakan daftar ini sebagai panduan konsultasi.
        </p>
      </div>
    </div>
  );
}
