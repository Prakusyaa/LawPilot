import { RiskClause } from "@/types/analysis";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskPanelProps {
  clauses: RiskClause[];
}

export function RiskPanel({ clauses }: RiskPanelProps) {
  if (clauses.length === 0) {
    return (
      <Card className="bg-green-950/20 border-green-900/50">
        <CardContent className="p-6 text-center text-green-400 font-medium">
          ✅ Tidak ditemukan klausul berisiko tinggi.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {clauses.map((clause, index) => {
        const isHigh = clause.riskLevel === "HIGH";
        const isMedium = clause.riskLevel === "MEDIUM";
        
        const borderClass = isHigh 
          ? "border-l-4 border-l-red-500 border-t-slate-800 border-r-slate-800 border-b-slate-800" 
          : isMedium 
            ? "border-l-4 border-l-amber-400 border-t-slate-800 border-r-slate-800 border-b-slate-800" 
            : "border-l-4 border-l-blue-400 border-t-slate-800 border-r-slate-800 border-b-slate-800";

        const badgeVariant = isHigh ? "destructive" : isMedium ? "default" : "secondary";
        const badgeClass = isHigh 
          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
          : isMedium 
            ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" 
            : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
            
        const badgeText = isHigh ? "Risiko Tinggi" : isMedium ? "Risiko Sedang" : "Perhatikan";

        return (
          <Card key={index} className={`bg-slate-900 overflow-hidden ${borderClass}`}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start gap-4 mb-3">
                <h4 className="text-slate-100 font-medium leading-relaxed">{clause.clause}</h4>
                <Badge variant={badgeVariant} className={`shrink-0 ${badgeClass} border-0`}>
                  {badgeText}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm mb-4">{clause.reason}</p>
              
              {clause.originalText && (
                <blockquote className="border-l-2 border-slate-700 pl-3 py-1 mt-3 bg-slate-950/50 rounded-r-md">
                  <p className="text-slate-500 italic text-xs">
                    "{clause.originalText}"
                  </p>
                </blockquote>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
