import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function AnalysisSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-24 space-y-6" aria-live="polite">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Hasil Analisis</h2>
        <Skeleton className="h-6 w-32 bg-slate-800" />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1 rounded-lg">
          <Skeleton className="h-10 w-full bg-slate-800" />
          <Skeleton className="h-10 w-full bg-slate-800" />
          <Skeleton className="h-10 w-full bg-slate-800" />
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <Skeleton className="h-8 w-1/3 bg-slate-800 mb-6" />
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-5/6 bg-slate-800" />
              <Skeleton className="h-4 w-4/6 bg-slate-800" />
            </div>

            <div className="my-6">
              <Skeleton className="h-[1px] w-full bg-slate-800" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-1/4 bg-slate-800 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
                <Skeleton className="h-4 w-full bg-slate-800" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
                <Skeleton className="h-4 w-5/6 bg-slate-800" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <p className="text-center text-slate-400 mt-4 animate-pulse">
        ⏳ Gemini sedang membaca dokumen Anda...
      </p>
    </div>
  );
}
