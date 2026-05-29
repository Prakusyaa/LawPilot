import { Summary } from "@/types/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryPanelProps {
  summary: Summary;
}

export function SummaryPanel({ summary }: SummaryPanelProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">{summary.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
            <span className="font-semibold text-slate-400 min-w-[150px]">Pihak yang terlibat:</span>
            <span>{summary.parties.join(", ")}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-semibold text-slate-400 min-w-[150px]">Durasi:</span>
            <span>{summary.duration}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-semibold text-slate-400 min-w-[150px]">Nilai kontrak:</span>
            <span>{summary.value}</span>
          </div>
        </div>
        
        <Separator className="bg-slate-800" />
        
        <div>
          <h3 className="font-semibold text-white mb-3">Poin Penting:</h3>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-200">
                <span className="text-blue-400 font-bold">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
