"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileIcon } from "@/components/ui/FileIcon";
import { Loader2, X, AlertTriangle } from "lucide-react";

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [analysisResult, setAnalysisResult] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);

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
    console.log("Analyzing file:", file?.name, "Type:", docType);
    setIsAnalyzing(true);
    // Simulate analyzing for step 3 later
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl bg-slate-900 border-slate-800 mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Select value={docType} onValueChange={(val) => setDocType(val || "")}>
              <SelectTrigger className="w-full bg-slate-950 border-slate-700 text-slate-100">
                <SelectValue placeholder="Pilih jenis dokumen (opsional)" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-100">
                <SelectItem value="employment">Kontrak Kerja</SelectItem>
                <SelectItem value="rental">Perjanjian Sewa</SelectItem>
                <SelectItem value="business">Perjanjian Bisnis</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            {...getRootProps()}
            className={`
              relative flex flex-col items-center justify-center min-h-[200px] p-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors text-center
              ${
                isDragActive
                  ? "border-blue-400 bg-blue-950/30"
                  : "border-slate-600 bg-slate-900 hover:bg-slate-800/50 hover:border-slate-500"
              }
            `}
          >
            <input {...getInputProps()} />
            
            {file ? (
              <div className="flex flex-col items-center gap-3">
                <FileIcon type={file.type} />
                <div className="flex flex-col items-center">
                  <span className="text-slate-200 font-medium break-all text-sm">{file.name}</span>
                  <span className="text-slate-400 text-xs mt-1">{formatFileSize(file.size)}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-slate-200 font-medium">
                  {isDragActive
                    ? "Lepaskan file di sini..."
                    : "Drag & drop PDF atau foto dokumen di sini"}
                </p>
                {!isDragActive && (
                  <p className="text-slate-400 text-sm">
                    atau klik untuk pilih file • Maks. 10MB • PDF, JPG, PNG
                  </p>
                )}
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-950/30 text-red-400 border-red-900/50">
              <AlertTriangle className="h-4 w-4 !text-red-400" />
              <AlertDescription className="ml-2 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <Button 
            size="lg" 
            className="w-full font-semibold"
            disabled={!file || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sedang menganalisis...
              </>
            ) : (
              "🔍 Analisis Dokumen"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
