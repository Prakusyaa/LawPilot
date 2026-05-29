import { UploadSection } from "@/components/UploadSection";

export default function Home() {
  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
    >
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-ink mb-2 leading-snug">
          Pahami Dokumen Hukummu
        </h1>
        <p className="text-sm sm:text-base text-ink-2 max-w-xl leading-relaxed">
          Upload kontrak atau perjanjian — LawPilot baca, analisis, dan
          jelaskan dalam bahasa yang mudah dipahami.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upload area — 2/3 width on desktop */}
        <div className="lg:col-span-2">
          <UploadSection />
        </div>

        {/* Info sidebar — 1/3 width on desktop */}
        <div className="flex flex-col gap-4">
          {/* What is LawPilot */}
          <div className="rounded-lg border border-wire bg-layer p-5">
            <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3 mb-3">
              Apa itu LawPilot?
            </p>
            <p className="text-sm text-ink-2 leading-relaxed mb-4">
              AI yang membantu Anda memahami kontrak dan perjanjian hukum
              dalam bahasa yang mudah dipahami — bukan legalese.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Analisis kontrak & perjanjian",
                "Deteksi klausul berisiko",
                "Panduan pertanyaan notaris",
                "Q&A dokumen interaktif",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink-2">
                  <span
                    className="w-1 h-1 rounded-full flex-none"
                    style={{ backgroundColor: "var(--lp-accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy */}
          <div className="rounded-lg border border-wire bg-layer p-5">
            <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3 mb-3">
              Privasi & Keamanan
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { icon: "🔒", text: "Dokumen tidak disimpan di server" },
                { icon: "⚡", text: "Diproses in-memory saat analisis" },
                { icon: "🤖", text: "Powered by Gemini 2.5 Flash" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-2.5 text-sm text-ink-2">
                  <span className="text-base leading-none mt-0.5">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Supported formats */}
          <div className="rounded-lg border border-wire bg-layer px-5 py-4">
            <p className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3 mb-3">
              Format yang Didukung
            </p>
            <div className="flex flex-wrap gap-2 items-center">
              {["PDF", "JPG", "PNG"].map((fmt) => (
                <span
                  key={fmt}
                  className="text-xs font-mono px-2.5 py-1 rounded border border-wire text-ink-3"
                >
                  .{fmt}
                </span>
              ))}
              <span className="text-xs text-ink-3">· Maks. 10MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
