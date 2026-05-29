import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, fileBase64, fileMimeType, chatHistory } = body;

    if (!question || !fileBase64 || !fileMimeType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contents: Array<Record<string, unknown>> = [
      {
        role: "user",
        parts: [
          { text: "You are a legal document assistant. The user has already uploaded a legal document (provided below as an attachment). Answer questions about the document only. Be concise, clear, and use plain Bahasa Indonesia. If the question cannot be answered from the document, say so honestly." },
          { inlineData: { mimeType: fileMimeType, data: fileBase64 } }
        ]
      },
      {
        role: "model",
        parts: [{ text: "Mengerti. Silakan berikan pertanyaan Anda tentang dokumen ini." }]
      }
    ];

    for (const msg of chatHistory || []) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: question }]
    });

    const result = await model.generateContent({ contents });
    const answer = result.response.text();

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Gagal memproses pertanyaan. Coba lagi." },
      { status: 500 }
    );
  }
}
