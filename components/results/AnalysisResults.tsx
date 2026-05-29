import { AnalysisResult } from "@/types/analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SummaryPanel } from "./SummaryPanel";
import { RiskPanel } from "./RiskPanel";
import { QuestionsPanel } from "./QuestionsPanel";

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const isHigh = result.overallRisk === "HIGH";
  const isMedium = result.overallRisk === "MEDIUM";

  const badgeClass = isHigh 
    ? "bg-red-500 text-white hover:bg-red-600" 
    : isMedium 
      ? "bg-amber-500 text-white hover:bg-amber-600" 
      : "bg-green-500 text-white hover:bg-green-600";
      
  const badgeText = isHigh 
    ? "⚠️ Risiko Tinggi" 
    : isMedium 
      ? "⚡ Risiko Sedang" 
      : "✅ Risiko Rendah";

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Hasil Analisis</h2>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">Tingkat Risiko Keseluruhan:</span>
          <Badge className={`${badgeClass} text-sm px-3 py-1 border-0`}>
            {badgeText}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-slate-900 border border-slate-800 p-1 rounded-lg h-auto">
          <TabsTrigger value="summary" className="py-2.5 data-[state=active]:bg-slate-800 data-[state=active]:text-white whitespace-normal text-xs sm:text-sm h-full">
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="risks" className="py-2.5 data-[state=active]:bg-slate-800 data-[state=active]:text-white flex items-center justify-center gap-1 sm:gap-2 whitespace-normal text-xs sm:text-sm h-full">
            <span>Klausul Risiko</span>
            {result.riskClauses.length > 0 && (
              <span className="bg-red-500/20 text-red-400 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full shrink-0">
                {result.riskClauses.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="questions" className="py-2.5 data-[state=active]:bg-slate-800 data-[state=active]:text-white whitespace-normal text-xs sm:text-sm h-full">
            Pertanyaan Notaris
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="summary" className="m-0 focus-visible:outline-none">
            <SummaryPanel summary={result.summary} />
          </TabsContent>
          <TabsContent value="risks" className="m-0 focus-visible:outline-none">
            <RiskPanel clauses={result.riskClauses} />
          </TabsContent>
          <TabsContent value="questions" className="m-0 focus-visible:outline-none">
            <QuestionsPanel questions={result.notaryQuestions} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
