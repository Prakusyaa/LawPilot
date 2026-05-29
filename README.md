# LawPilot ⚖️
LawPilot adalah aplikasi web yang membantu masyarakat non-hukum memahami dokumen legal, kontrak, dan perjanjian menggunakan kecerdasan buatan. Upload dokumen Anda, dan AI akan menganalisis poin-poin penting, klausul berisiko, dan pertanyaan yang perlu Anda ajukan ke notaris.

## Features
- **Upload Mudah**: Mendukung format PDF, JPG, dan PNG dengan ukuran hingga 10MB.
- **Analisis AI Instan**: Ekstraksi poin penting dan detail kontrak dalam bahasa manusia.
- **Deteksi Risiko**: Identifikasi klausul berisiko Tinggi, Sedang, atau Rendah secara otomatis.
- **Panduan Konsultasi Notaris**: Mendapatkan daftar pertanyaan spesifik untuk ditanyakan sebelum tanda tangan.
- **Q&A Dokumen**: Chat langsung dengan dokumen untuk menanyakan hal-hal spesifik menggunakan AI.
- **Aman & Privasi**: Dokumen tidak disimpan di server dan hanya diproses secara in-memory.

## Tech Stack
- Next.js (App Router)
- React 19
- Tailwind CSS v4
- shadcn/ui
- Google Gemini 2.5 Flash
- Google Cloud Platform (GCP)

## Getting Started
```bash
npm install
# Add GEMINI_API_KEY to .env.local
npm run dev
```

## Disclaimer
⚠️ LawPilot bukan pengganti konsultasi hukum profesional. Analisis ini dibuat oleh AI dan bisa keliru. Selalu konsultasikan dokumen penting dengan pengacara atau notaris berlisensi sebelum tanda tangan.

## Built for Google #JuaraVibeCoding