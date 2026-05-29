import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { buildAnalysisPrompt } from "@/lib/prompts";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const docType = (formData.get("docType") as string) ?? "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // File size guard (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = file.type as "application/pdf" | "image/jpeg" | "image/png";

    const prompt = buildAnalysisPrompt(docType);

    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
    ]);

    const raw = result.response.text();
    
    // Strip any accidental markdown fences
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      { error: "Gagal menganalisis dokumen. Coba lagi." },
      { status: 500 }
    );
  }
}
