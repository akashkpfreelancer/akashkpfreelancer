"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Users, PlayCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CountUp from "@/components/ui/CountUp";

function YoutubeSvg({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramSvg({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function SocialProof() {
  const t = useTranslations("social");

  return (
    <section id="social" className="py-24 px-6 bg-muted/30 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            community
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* YouTube */}
          <motion.a
            href="https://youtube.com/@coderakash"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-2xl border border-border hover:border-red-500/40 bg-surface p-6 overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.5 0.22 25 / 8%), transparent)" }}
            />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <YoutubeSvg size={22} className="text-red-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                  {t("youtube_label")}
                </p>
                <p className="font-semibold text-foreground">{t("youtube_handle")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("youtube_desc")}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-sm font-mono font-bold gradient-text">
                    <Users size={13} />
                    <CountUp to={8} suffix="K+" /> {t("subscribers")}
                  </div>
                  <span className="text-xs text-red-400 flex items-center gap-1">
                    <PlayCircle size={11} /> {t("watch")} →
                  </span>
                </div>
              </div>
            </div>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/akash_code_cafe"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative rounded-2xl border border-border hover:border-pink-500/40 bg-surface p-6 overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.55 0.22 340 / 8%), transparent)" }}
            />
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                <InstagramSvg size={22} className="text-pink-500" />
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1 uppercase tracking-wider">
                  {t("instagram_label")}
                </p>
                <p className="font-semibold text-foreground">{t("instagram_handle")}</p>
                <p className="text-sm text-muted-foreground mt-1">{t("instagram_desc")}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-sm font-mono font-bold gradient-text">
                    <Users size={13} />
                    <CountUp to={8} suffix="K+" /> {t("followers")}
                  </div>
                  <span className="text-xs text-pink-400 flex items-center gap-1">
                    {t("follow")} →
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
