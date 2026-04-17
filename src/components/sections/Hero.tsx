"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Calendar } from "lucide-react";
import CountUp from "@/components/ui/CountUp";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
  ssr: false,
});

function FadeUp({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { key: "experience", count: 6, suffix: "+" },
  { key: "projects", count: 40, suffix: "+" },
  { key: "specialization", count: null, label: "AI/ML" },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden aurora grid-bg"
    >
      {/* WebGL particle network */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--background) 100%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16 text-center">
        {/* Available badge */}
        <FadeUp i={0}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t("available")}
          </div>
        </FadeUp>

        {/* Name */}
        <FadeUp i={1}>
          <div className="mb-3">
            <span className="text-muted-foreground text-lg font-light mr-3">
              {t("greeting")}
            </span>
            <span className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text">
              {t("name")}
            </span>
          </div>
        </FadeUp>

        {/* Role */}
        <FadeUp i={2}>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground/80 mb-6 leading-snug">
            {t("role")}{" "}
            <span className="text-foreground">{t("role2")}</span>
          </div>
        </FadeUp>

        {/* Tagline */}
        <FadeUp i={3}>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
            {t("tagline")}
          </p>
        </FadeUp>

        {/* CTAs */}
        <FadeUp i={4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a
            href="#contact"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-all duration-200 shadow-lg shadow-accent/20"
          >
            <Calendar size={15} />
            {t("cta_primary")}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </a>
          <a
            href="#work"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:border-foreground/30 text-foreground/80 hover:text-foreground font-medium text-sm transition-all duration-200"
          >
            {t("cta_secondary")}
          </a>
          </div>
        </FadeUp>

        {/* Stats */}
        <FadeUp i={5}>
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {stats.map((s) => (
              <div key={s.key} className="text-center">
                <div className="text-2xl font-bold font-mono gradient-text">
                  {s.count !== null ? (
                    <CountUp to={s.count!} suffix={s.suffix} />
                  ) : (
                    s.label
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                  {t(s.key as "experience" | "projects" | "specialization")}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
