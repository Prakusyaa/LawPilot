## LawPilot ⚖️ — Deskripsi Lengkap Proyek

---

### 🎯 Gambaran Umum

**LawPilot** adalah aplikasi web berbasis kecerdasan buatan (AI) yang dirancang untuk membantu masyarakat awam — yang tidak memiliki latar belakang hukum — dalam **memahami isi dokumen hukum** seperti kontrak kerja, perjanjian sewa, perjanjian bisnis, dan sejenisnya.

Aplikasi ini dibangun untuk kompetisi **Google #JuaraVibeCoding** dan memanfaatkan model AI **Gemini 2.5 Flash** dari Google sebagai mesin analisisnya.

---

### 🔍 Masalah yang Dipecahkan

Dokumen hukum umumnya ditulis dalam bahasa yang kompleks, penuh dengan istilah teknis (*legalese*), dan sulit dimengerti oleh orang biasa. Akibatnya, banyak orang menandatangani kontrak **tanpa benar-benar memahami hak dan kewajiban mereka** — yang bisa berujung pada kerugian.

LawPilot hadir sebagai "asisten pertama" sebelum seseorang berkonsultasi dengan pengacara profesional.

---

### ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| **Upload Dokumen** | Mendukung PDF, JPG, dan PNG hingga 10MB |
| **Analisis AI Otomatis** | Gemini membaca dan merangkum isi dokumen dalam bahasa yang mudah dipahami |
| **Deteksi Risiko** | Mengidentifikasi klausul berisiko dengan tingkat **HIGH / MEDIUM / LOW** |
| **Panduan Konsultasi** | Menghasilkan daftar pertanyaan yang perlu diajukan ke notaris atau pengacara |
| **Document Q&A (Chat)** | Pengguna bisa bertanya langsung tentang dokumen secara interaktif |
| **Keamanan Privasi** | Dokumen hanya diproses saat analisis dan **tidak disimpan** di server |

---

### 🏗️ Arsitektur Teknis

```
┌─────────────────────┐        ┌──────────────────────┐
│   Browser (Client)  │        │   Next.js Server     │
│                     │        │                      │
│  UploadSection ─────┼──POST──▶ /api/analyze         │
│  (react-dropzone)   │        │  (FormData → base64) │
│                     │        │       ↓               │
│  ChatSection ───────┼──POST──▶ /api/chat            │
│  (messages state)   │        │  (JSON + base64)     │
│                     │        │       ↓               │
│  AnalysisResults    │        │  Gemini 2.5 Flash API│
│  SummaryPanel       │◀──JSON─┤  (Google AI SDK)     │
│  RiskPanel          │        │                      │
│  QuestionsPanel     │        └──────────────────────┘
└─────────────────────┘
```

**Alur kerja:**
1. Pengguna upload dokumen melalui dropzone
2. File dikirim ke `/api/analyze` sebagai `FormData`
3. Server mengkonversi file ke base64 dan mengirimnya ke Gemini bersama prompt analisis terstruktur
4. Gemini mengembalikan respons JSON dengan ringkasan, klausul risiko, dan pertanyaan notaris
5. Hasil ditampilkan di UI dalam format bento grid
6. Pengguna bisa melanjutkan tanya-jawab melalui `/api/chat` yang menyertakan dokumen (base64) sebagai konteks

---

### 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| **Framework** | Next.js 16.2 (App Router, Turbopack) |
| **UI Library** | React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **AI Engine** | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| **Upload** | react-dropzone |
| **Font** | DM Serif Display + Geist Mono |
| **Icons** | lucide-react |

---

### 🎨 Desain

Tema visual LawPilot mengikuti konsep **"Legal Intelligence Terminal"** — serius, profesional, dan terasa seperti alat enterprise:

- **Warna dominan:** Hitam pekat `#080A0F` dengan aksen biru elektrik `#2563EB`
- **Tipografi:** DM Serif Display untuk heading, Geist Mono untuk label teknis
- **Layout:** Bento grid — upload area lebar di kiri, info cards di kanan
- **Hasil analisis:** Tiga panel (Ringkasan | Klausul Risiko | Pertanyaan Notaris) ditampilkan bersamaan, bukan dalam tabs
- **Risk badge:** Pill dengan glow effect warna merah/amber/hijau sesuai tingkat risiko

---

### 🔐 Keamanan & Etika

- Dokumen **tidak pernah disimpan** di database maupun storage server
- Setiap analisis diproses secara *in-memory* dan langsung dibuang setelah respons dikirim
- Ada **timeout 60 detik** dengan `AbortController` agar tidak menggantung
- Disclaimer wajib selalu ditampilkan: *"LawPilot bukan pengganti konsultasi hukum profesional"*

---

### 📁 Struktur File Utama

```
lawpilot/
├── app/
│   ├── api/analyze/route.ts   ← Backend Gemini inference
│   ├── api/chat/route.ts      ← Backend chat Q&A
│   ├── layout.tsx             ← Root layout + header + footer
│   ├── page.tsx               ← Bento grid homepage
│   └── globals.css            ← Design system + fonts
├── components/
│   ├── UploadSection.tsx      ← Dropzone + analisis trigger
│   ├── ChatSection.tsx        ← Document Q&A chat UI
│   ├── AnalysisSkeleton.tsx   ← Loading state
│   ├── ErrorBoundary.tsx      ← Global error handling
│   └── results/
│       ├── AnalysisResults.tsx ← Parent bento layout
│       ├── SummaryPanel.tsx    ← Ringkasan dokumen
│       ├── RiskPanel.tsx       ← Klausul berisiko
│       └── QuestionsPanel.tsx  ← Pertanyaan notaris
├── lib/
│   ├── gemini.ts              ← Gemini client init
│   └── prompts.ts             ← Prompt builder
└── types/
    └── analysis.ts            ← TypeScript interfaces
```
