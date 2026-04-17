"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Send, Key, AlertCircle, Bot, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Playground() {
  const t = useTranslations("playground");
  const [apiKey, setApiKey] = useState("");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const systemPrompt = `You are a knowledgeable AI assistant demonstrating a RAG (Retrieval-Augmented Generation) system built by Akash Patel, an AI/ML engineer.

Answer questions clearly and technically. When relevant, explain how RAG systems work, discuss AI/ML concepts, or help with technical questions. Be concise but informative.`;

  const sendMessage = async () => {
    if (!apiKey.trim()) { setError(t("error_no_key")); return; }
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", content: query.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
            userMsg,
          ],
          max_tokens: 600,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "OpenAI API error");
      }

      const data = await res.json();
      const reply = data.choices[0]?.message?.content ?? "";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="mb-10 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            live demo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border bg-surface overflow-hidden"
        >
          {/* API Key input */}
          <div className="p-4 border-b border-border bg-muted/30">
            <label htmlFor="pg-api-key" className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
              <Key size={11} /> {t("key_label")}
            </label>
            <Input
              id="pg-api-key"
              type="password"
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setError(""); }}
              placeholder={t("key_placeholder")}
              className="font-mono text-xs bg-background border-border"
            />
            <p className="text-xs text-muted-foreground/70 mt-1.5">{t("key_note")}</p>
          </div>

          {/* Chat window */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-sm text-muted-foreground font-mono text-center">
                  {t("enter_key")}
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={13} className="text-accent" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-accent-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={13} className="text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-accent" />
                </div>
                <div className="bg-muted rounded-xl px-3.5 py-2.5 text-sm text-muted-foreground">
                  <span className="font-mono">{t("thinking")}</span>
                  <span className="inline-flex gap-0.5 ml-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1 h-1 rounded-full bg-accent inline-block"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle size={12} /> {error}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border flex gap-2">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              }}
              placeholder={t("query_placeholder")}
              aria-label={t("query_placeholder")}
              rows={1}
              className="resize-none text-sm bg-background border-border min-h-[40px] max-h-32"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !query.trim()}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
              aria-label={t("send")}
            >
              <Send size={15} />
            </button>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground/60 mt-4 max-w-md mx-auto">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
