import { UploadSection } from "@/components/UploadSection";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <section className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-4 text-white">Pahami Dokumen Hukummu</h1>
        <p className="text-lg text-slate-300 mb-2">
          Upload kontrak atau perjanjian — LawPilot baca, analisis, dan jelaskan dalam bahasa manusia.
        </p>
        <p className="text-sm text-slate-500">
          Mendukung PDF dan gambar (JPG, PNG). Dokumen tidak disimpan.
        </p>
      </section>

      <UploadSection />
    </div>
  );
}
