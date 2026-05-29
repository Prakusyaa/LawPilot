"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

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
  "Apakah kontrak ini bisa diubah sepihak?",
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
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          fileBase64,
          fileMimeType,
          chatHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
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

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : "Terjadi kesalahan";
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `Error: ${errMsg}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const canSend = !!input.trim() && !isLoading;

  return (
    <div
      className="mt-4 rounded-lg border border-wire overflow-hidden flex flex-col"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-wire flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "var(--lp-accent)" }}
          />
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-ink-3">
            Document Q&amp;A
          </span>
        </div>
        <span className="text-xs text-ink-3">
          Aktif — dokumen sudah dianalisis
        </span>
      </div>

      {/* Message area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px] min-h-[240px]"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 py-6 text-center">
            <p className="text-xs text-ink-3">
              Pilih contoh pertanyaan atau ketik sendiri:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3 py-2 rounded-full border border-wire text-ink-2 hover:border-cta hover:text-cta hover:bg-layer-2 transition-colors min-h-[36px]"
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
                className={`flex w-full msg-appear ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? {
                          backgroundColor: "var(--lp-accent)",
                          color: "var(--lp-accent-fg)",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          backgroundColor: "var(--lp-elevated)",
                          color: "var(--lp-text-1)",
                          border: "1px solid var(--lp-border)",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start" aria-live="polite">
                <div
                  className="rounded-lg px-4 py-3 flex items-center gap-1.5"
                  style={{
                    backgroundColor: "var(--lp-elevated)",
                    border: "1px solid var(--lp-border)",
                    borderBottomLeftRadius: "4px",
                  }}
                  aria-label="Sedang memuat..."
                >
                  {["-0.3s", "-0.15s", "0s"].map((delay, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "var(--lp-accent)",
                        animationDelay: delay,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input bar */}
      <div
        className="p-3 border-t border-wire flex gap-2"
        style={{ backgroundColor: "var(--lp-surface)" }}
      >
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tanya tentang dokumen ini..."
          aria-label="Pertanyaan tentang dokumen"
          className="resize-none text-sm min-h-[52px] border-wire bg-background text-ink placeholder:text-ink-3 focus-visible:ring-1"
          style={{ "--tw-ring-color": "var(--lp-accent)" } as React.CSSProperties}
          rows={2}
        />
        <button
          onClick={() => handleSend()}
          disabled={!canSend}
          aria-label="Kirim pertanyaan"
          className="shrink-0 w-10 rounded-md flex items-center justify-center transition-colors"
          style={{
            backgroundColor: canSend
              ? "var(--lp-accent)"
              : "var(--lp-elevated)",
            cursor: canSend ? "pointer" : "not-allowed",
          }}
        >
          <Send
            className="h-4 w-4"
            style={{
              color: canSend ? "var(--lp-accent-fg)" : "var(--lp-text-3)",
            }}
          />
        </button>
      </div>
    </div>
  );
}
