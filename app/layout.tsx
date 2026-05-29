import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Alert, AlertDescription } from "@/components/ui/alert";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawPilot",
  description: "Pahami dokumen hukummu dengan AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} bg-slate-950 text-slate-100 min-h-screen font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">⚖️ LawPilot</h1>
              <span className="text-sm text-slate-400 hidden sm:inline-block">
                Konsultasikan selalu dengan pengacara berlisensi
              </span>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-4">
            <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/50">
              <AlertDescription className="text-amber-500 font-medium text-sm">
                ⚠️ LawPilot bukan pengganti konsultasi hukum profesional. Analisis ini dibuat 
                oleh AI dan bisa keliru. Selalu konsultasikan dokumen penting dengan pengacara 
                atau notaris berlisensi sebelum tanda tangan.
              </AlertDescription>
            </Alert>
          </div>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
