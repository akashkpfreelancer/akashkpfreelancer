"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Brain, Eye, Bot, Code2 } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const icons = [Brain, Eye, Bot, Code2];
const serviceKeys = ["rag", "vision", "agents", "fullstack"] as const;


export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {serviceKeys.map((key, i) => {
            const Icon = icons[i];
            const tags = t.raw(`${key}.tags`) as string[];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                className="group relative rounded-2xl p-6 border border-border hover:border-accent/40 bg-surface hover:bg-surface-raised transition-all duration-300 overflow-hidden"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.82 0.15 200 / 6%), transparent)",
                  }}
                />

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2 text-lg">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {t(`${key}.desc`)}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
