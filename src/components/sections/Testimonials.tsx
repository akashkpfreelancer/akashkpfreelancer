"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Akash delivered a RAG pipeline that genuinely works in production — not just a demo. Hallucination rate dropped below 2% within the first month. The evaluation loop he set up means we can actually measure quality over time.",
    name: "Marcus T.",
    role: "CTO",
    company: "LegalTech SaaS, USA",
    initials: "MT",
    color: "oklch(0.72 0.18 200)",
  },
  {
    id: 2,
    quote:
      "We needed a computer vision system deployed on edge hardware in a warehouse with no stable internet. Akash scoped it correctly from day one, handled the thermal throttling issue before it became a problem, and delivered two weeks early.",
    name: "Priya S.",
    role: "Head of Engineering",
    company: "Logistics Platform, UK",
    initials: "PS",
    color: "oklch(0.72 0.18 280)",
  },
  {
    id: 3,
    quote:
      "The architecture document he delivered before writing a single line of code was more thorough than what most senior engineers produce. It caught three design issues upfront that would have cost us weeks to fix later.",
    name: "Ahmed K.",
    role: "Founder",
    company: "AI Startup, UAE",
    initials: "AK",
    color: "oklch(0.75 0.18 150)",
  },
  {
    id: 4,
    quote:
      "Async-friendly, clear updates every week, and zero surprises at handoff. The 30-day support window after delivery is something I wish every freelancer offered — we found two edge cases and they were fixed within hours.",
    name: "Sofia R.",
    role: "Product Manager",
    company: "HealthTech Company, Brazil",
    initials: "SR",
    color: "oklch(0.72 0.2 340)",
  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-surface p-6 flex flex-col gap-4 overflow-hidden group hover:border-accent/30 transition-colors duration-300"
            >
              {/* subtle glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 40% at 0% 0%, ${item.color}12, transparent)`,
                }}
              />

              {/* Quote icon */}
              <Quote size={18} className="text-accent/40 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: item.color }}
                >
                  {item.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.role} · {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground/50 mt-8"
        >
          {t("note")}
        </motion.p>
      </div>
    </section>
  );
}
