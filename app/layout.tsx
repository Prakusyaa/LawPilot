import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ThemeToggle } from "@/components/ThemeToggle";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LawPilot — AI Legal Document Analysis",
  description:
    "Pahami dokumen hukummu dengan AI. Analisis kontrak, deteksi klausul berisiko, dan dapatkan panduan konsultasi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Blocking script — prevents theme flash on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('lawpilot-theme')||'dark';document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)", color: "var(--lp-text-1)" }}>
        {/* Header */}
        <header
          className="sticky top-0 z-50 h-14 border-b border-wire"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-sm font-semibold tracking-widest uppercase text-ink">
                LAWPILOT
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--lp-risk-high)" }}
              />
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>

        {/* Disclaimer footer */}
        <footer className="border-t border-wire py-4 px-4">
          <p className="text-xs text-ink-3 text-center max-w-3xl mx-auto leading-relaxed">
            LawPilot bukan pengganti konsultasi hukum profesional. Selalu
            konsultasikan dokumen penting dengan pengacara atau notaris.
          </p>
        </footer>
      </body>
    </html>
  );
}
