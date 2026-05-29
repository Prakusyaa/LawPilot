"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileIcon } from "@/components/ui/FileIcon";
import { X, AlertTriangle, FileText } from "lucide-react";
import { AnalysisResult } from "@/types/analysis";
import { AnalysisResults } from "@/components/results/AnalysisResults";
import { ChatSection } from "@/components/ChatSection";
import { AnalysisSkeleton } from "@/components/AnalysisSkeleton";

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (analysisResult && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysisResult]);

  const resetAll = () => {
    setFile(null);
    setDocType("");
    setAnalysisResult(null);
    setFileBase64(null);
    setFileMimeType(null);
    setError(null);
  };

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setError(null);

    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors[0]?.code === "file-too-large") {
        setError("File terlalu besar. Maksimal 10MB.");
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        setError("Format tidak didukung. Gunakan PDF, JPG, atau PNG.");
      } else {
        setError("Terjadi kesalahan saat mengunggah file.");
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    if (file.type === "application/pdf" && file.size > 8 * 1024 * 1024) {
      setError("PDF besar mungkin memerlukan waktu lebih lama untuk dianalisis.");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (docType) {
        formData.append("docType", docType);
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Gagal menganalisis dokumen.");
      }

      setAnalysisResult(json.data);

      const toBase64 = (f: File): Promise<string> =>
        new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res((reader.result as string).split(",")[1]);
          reader.onerror = rej;
          reader.readAsDataURL(f);
        });

      const b64 = await toBase64(file);
      setFileBase64(b64);
      setFileMimeType(file.type);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        setError("Analisis memakan waktu terlalu lama. Coba dengan dokumen yang lebih kecil.");
      } else if (err instanceof Error) {
        setError(err.message || "Terjadi kesalahan yang tidak terduga.");
      } else {
        setError("Terjadi kesalahan yang tidak terduga.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const canAnalyze = !!file && !isAnalyzing;

  return (
    <div className="w-full flex flex-col">
      {/* Upload card */}
      <div className="rounded-lg border border-wire bg-layer p-5 sm:p-6 flex flex-col gap-5">

        {/* Document type selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-mono font-medium uppercase tracking-widest text-ink-3">
            Document Type
          </label>
          <Select value={docType} onValueChange={(val) => setDocType(val || "")}>
            <SelectTrigger
              className="w-full font-sans text-sm border-wire bg-background text-ink-2"
            >
              <SelectValue placeholder="Pilih jenis dokumen (opsional)" />
            </SelectTrigger>
            <SelectContent
              className="border-wire bg-layer text-ink"
            >
              <SelectItem value="employment">Kontrak Kerja</SelectItem>
              <SelectItem value="rental">Perjanjian Sewa</SelectItem>
              <SelectItem value="business">Perjanjian Bisnis</SelectItem>
              <SelectItem value="other">Lainnya</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          role="button"
          aria-label="Upload dokumen"
          className="relative flex flex-col items-center justify-center min-h-[160px] sm:min-h-[180px] p-6 rounded-md border-2 border-dashed cursor-pointer transition-colors text-center"
          style={{
            borderColor: isDragActive ? "var(--lp-accent)" : "var(--lp-border)",
            backgroundColor: isDragActive
              ? "color-mix(in oklch, var(--lp-accent) 6%, transparent)"
              : "var(--background)",
          }}
        >
          <input {...getInputProps()} />

          {file ? (
            <div
              className="flex items-center gap-3 w-full max-w-sm rounded-md border border-wire p-3"
              style={{ backgroundColor: "var(--lp-surface)" }}
            >
              <FileIcon type={file.type} />
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-medium text-ink truncate w-full text-left">
                  {file.name}
                </span>
                <span className="text-xs text-ink-3 mt-0.5">
                  {formatFileSize(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                aria-label="Hapus file"
                className="shrink-0 h-7 w-7 flex items-center justify-center rounded text-ink-3 hover:text-ink hover:bg-layer-2 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FileText
                className="h-8 w-8 mb-1"
                style={{
                  color: isDragActive ? "var(--lp-accent)" : "var(--lp-text-3)",
                }}
              />
              <p className="text-sm font-medium text-ink">
                {isDragActive
                  ? "Lepaskan file di sini..."
                  : "Drag & drop PDF atau foto dokumen"}
              </p>
              {!isDragActive && (
                <p className="text-xs text-ink-3">
                  atau klik untuk pilih file · Maks. 10MB · PDF, JPG, PNG
                </p>
              )}
            </div>
          )}
        </div>

        {/* Inline error */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-md border px-4 py-3"
            style={{
              backgroundColor: "var(--lp-risk-high-bg)",
              borderColor: "var(--lp-risk-high-border)",
            }}
          >
            <AlertTriangle
              className="h-4 w-4 mt-0.5 shrink-0"
              style={{ color: "var(--lp-risk-high)" }}
              aria-hidden="true"
            />
            <p className="text-sm font-medium" style={{ color: "var(--lp-risk-high)" }}>
              {error}
            </p>
          </div>
        )}

        {/* Analyze CTA */}
        <button
          disabled={!canAnalyze}
          onClick={handleAnalyze}
          className="w-full py-3 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors"
          style={{
            backgroundColor: canAnalyze ? "var(--lp-accent)" : "var(--lp-elevated)",
            color: canAnalyze ? "var(--lp-accent-fg)" : "var(--lp-text-3)",
            cursor: canAnalyze ? "pointer" : "not-allowed",
          }}
        >
          {isAnalyzing ? "Analyzing Document..." : "Analyze Document"}
        </button>
      </div>

      {/* Results */}
      {isAnalyzing ? (
        <AnalysisSkeleton />
      ) : analysisResult ? (
        <div className="w-full mt-6" ref={resultsRef}>
          <AnalysisResults result={analysisResult} />

          {fileBase64 && fileMimeType && (
            <ChatSection fileBase64={fileBase64} fileMimeType={fileMimeType} />
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={resetAll}
              className="px-4 py-2.5 rounded-md border border-wire bg-layer text-ink-2 hover:bg-layer-2 hover:text-ink text-sm transition-colors"
            >
              ↺ Analisis Dokumen Lain
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
