"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Search, Layers, Code2, CheckCircle2, HeartHandshake } from "lucide-react";

const icons = [Search, Layers, Code2, CheckCircle2, HeartHandshake];

export default function Process() {
  const t = useTranslations("process");

  const steps = [
    { key: "discovery", icon: icons[0] },
    { key: "architecture", icon: icons[1] },
    { key: "build", icon: icons[2] },
    { key: "review", icon: icons[3] },
    { key: "support", icon: icons[4] },
  ];

  return (
    <section id="process" className="py-24 px-6 bg-muted/20 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-9 left-[calc(10%+28px)] right-[calc(10%+28px)] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                className="relative flex flex-col items-center text-center lg:items-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-4">
                  <div className="w-[56px] h-[56px] rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-accent/40 transition-colors relative z-10">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold font-mono flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {t(`step_${key}_title`)}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
                  {t(`step_${key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {t("timeline_kick")}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {t("timeline_updates")}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            {t("timeline_nda")}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
