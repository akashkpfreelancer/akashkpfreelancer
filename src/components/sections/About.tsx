"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

function GithubSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}

function LinkedinSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function YoutubeSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramSvg({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

const stack = [
  "Python", "PyTorch", "LangChain", "LlamaIndex", "OpenAI API",
  "LangGraph", "YOLO", "OpenCV", "FastAPI", "Next.js",
  "TypeScript", "PostgreSQL", "Redis", "Pinecone", "Docker",
  "AWS", "Vercel", "Prisma", "GraphQL", "Git",
];

const socials = [
  { label: "GitHub", icon: GithubSvg, href: "https://github.com/akashkpfreelancer", color: "" },
  { label: "LinkedIn", icon: LinkedinSvg, href: "https://linkedin.com/in/akashdeveloper", color: "text-blue-400" },
  { label: "YouTube", icon: YoutubeSvg, href: "https://youtube.com/@coderakash", color: "text-red-400" },
  { label: "Instagram", icon: InstagramSvg, href: "https://instagram.com/akash_code_cafe", color: "text-pink-400" },
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">about</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("title")}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Photo + social */}
          <ScrollReveal direction="left" className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-52 h-52 lg:w-64 lg:h-64 rounded-2xl overflow-hidden border border-border"
              style={{ boxShadow: "0 0 0 1px oklch(0.82 0.15 200 / 20%), 0 20px 60px oklch(0.82 0.15 200 / 10%)" }}
            >
              <Image
                src="/images/akash.jpeg"
                alt="Akash Patel"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 208px, 256px"
              />
              {/* cyan glow border on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/0 hover:ring-accent/30 transition-all duration-300 pointer-events-none" />
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, icon: Icon, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ${color}`}
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Bio + stack */}
          <ScrollReveal direction="right" delay={0.1} className="lg:col-span-3 space-y-8">
            <p className="text-foreground/80 leading-relaxed text-base">{t("bio")}</p>

            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4 font-mono uppercase tracking-wider">
                {t("stack_title")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.4) }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-muted border border-border text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors duration-200 cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
