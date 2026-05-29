import { Card, CardContent } from "@/components/ui/card";

interface QuestionsPanelProps {
  questions: string[];
}

export function QuestionsPanel({ questions }: QuestionsPanelProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">
        Tanyakan hal ini ke pengacara atau notaris sebelum tanda tangan:
      </h3>
      
      <div className="space-y-3">
        {questions.map((question, index) => (
          <Card key={index} className="bg-slate-900 border-slate-800">
            <CardContent className="p-3 sm:p-5 flex items-start gap-4">
              <span className="text-slate-600 font-bold text-2xl shrink-0 mt-[-4px]">
                {index + 1}
              </span>
              <p className="text-slate-200">
                {question}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <p className="text-slate-500 text-sm italic text-center mt-6">
        LawPilot tidak menyediakan layanan pengacara. Gunakan daftar ini sebagai panduan konsultasi.
      </p>
    </div>
  );
}
