"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";

interface ChatSectionProps {
  fileBase64: string;
  fileMimeType: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Apa kewajiban utama saya?",
  "Apa sanksi jika kontrak dilanggar?",
  "Apakah kontrak ini bisa diubah sepihak?"
];

export function ChatSection({ fileBase64, fileMimeType }: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (questionText: string = input) => {
    const text = questionText.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    
    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text,
          fileBase64,
          fileMimeType,
          chatHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mendapatkan jawaban.");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Terjadi kesalahan";
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${errMsg}`,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full bg-slate-900 border-slate-800 mt-12 overflow-hidden flex flex-col">
      <CardHeader className="border-b border-slate-800 bg-slate-900/50">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          💬 Tanya tentang dokumen ini
        </CardTitle>
        <p className="text-sm text-slate-400 font-normal">
          Aktif karena dokumen sudah dianalisis. Contoh: &apos;Apa yang terjadi jika saya resign sebelum 6 bulan?&apos;
        </p>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px]"
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-10">
              <p className="text-slate-400 mb-2">Pilih contoh pertanyaan atau ketik sendiri di bawah:</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm py-2 px-4 rounded-full transition-colors border border-slate-700"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      m.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed text-sm">{m.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start" aria-live="polite">
                  <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-bl-none border border-slate-700 px-4 py-4 flex items-center gap-1.5" aria-label="Sedang memuat...">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <div className="flex gap-2">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Tanya tentang dokumen ini..."
              aria-label="Pertanyaan tentang dokumen"
              className="resize-none min-h-[60px] bg-slate-900 border-slate-700 text-white focus-visible:ring-blue-500"
              rows={2}
            />
            <Button 
              onClick={() => handleSend()} 
              disabled={!input.trim() || isLoading}
              className="h-auto bg-blue-600 hover:bg-blue-700 shrink-0"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
