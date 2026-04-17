"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, Lock } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

function GithubSvg({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

const projects = [
  {
    id: "rag-enterprise",
    title: "Enterprise Knowledge Base RAG",
    description:
      "Multi-tenant RAG system over 500K+ proprietary documents. Hybrid search (BM25 + dense), context reranking, and streaming responses. Reduced support ticket volume by ~40%.",
    stack: ["LlamaIndex", "Pinecone", "FastAPI", "React", "OpenAI"],
    type: "rag",
    nda: true,
    liveUrl: null,
    githubUrl: null,
    accentColor: "cyan",
  },
  {
    id: "cv-quality",
    title: "Real-time Defect Detection (CV)",
    description:
      "Computer vision quality control system for manufacturing. YOLOv11 fine-tuned on custom dataset, ONNX-optimized for edge inference at 60fps. Deployed to Raspberry Pi + Coral TPU.",
    stack: ["PyTorch", "YOLOv11", "ONNX", "OpenCV", "FastAPI"],
    type: "vision",
    nda: true,
    liveUrl: null,
    githubUrl: null,
    accentColor: "violet",
  },
  {
    id: "research-agent",
    title: "AI Research Agent",
    description:
      "Autonomous research agent that takes a topic, searches the web, reads papers, synthesizes findings and produces structured reports. Built with LangGraph multi-agent orchestration.",
    stack: ["LangGraph", "OpenAI", "Tavily", "FastAPI", "Next.js"],
    type: "agents",
    nda: false,
    liveUrl: "#playground",
    githubUrl: "https://github.com/akashpatel",
    accentColor: "cyan",
  },
  {
    id: "saas-platform",
    title: "Multi-tenant SaaS Dashboard",
    description:
      "Full-stack CRUD platform with real-time analytics, RBAC, webhooks, and a REST + GraphQL API. Handles 100K+ daily active users across 200+ tenant organizations.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Prisma", "Stripe"],
    type: "fullstack",
    nda: true,
    liveUrl: null,
    githubUrl: null,
    accentColor: "violet",
  },
];

const typeColors: Record<string, string> = {
  rag: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  vision: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  agents: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  fullstack: "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

const typeLabels: Record<string, string> = {
  rag: "RAG",
  vision: "Computer Vision",
  agents: "AI Agents",
  fullstack: "Full-Stack",
};

export default function Work() {
  const t = useTranslations("work");

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            lab &amp; work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="group relative rounded-2xl border border-border hover:border-accent/30 bg-surface hover:bg-surface-raised transition-all duration-300 p-6 overflow-hidden"
            >
              {/* accent glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    project.accentColor === "cyan"
                      ? "radial-gradient(circle, oklch(0.82 0.15 200 / 8%), transparent 70%)"
                      : "radial-gradient(circle, oklch(0.72 0.2 280 / 8%), transparent 70%)",
                }}
              />

              <div className="flex items-start justify-between gap-3 mb-3">
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded border ${typeColors[project.type]}`}
                >
                  {typeLabels[project.type]}
                </span>
                {project.nda && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock size={10} /> NDA
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-foreground text-lg mb-2">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                  >
                    <ExternalLink size={12} /> {t("live")}
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">{t("live")}: {t("coming")}</span>
                )}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <GithubSvg size={12} /> {t("code")}
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
