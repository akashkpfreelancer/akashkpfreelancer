"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const t = useTranslations("faq");
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    "timeline",
    "pricing",
    "existing_codebase",
    "timezone",
    "nda",
    "stack",
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-muted/20 border-y border-border">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal className="mb-12 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="space-y-2">
          {items.map((key, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                  isOpen ? "border-accent/30 bg-surface" : "border-border bg-surface"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">
                    {t(`q_${key}`)}
                  </span>
                  <span className="flex-shrink-0 text-accent">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {t(`a_${key}`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {t("more")}{" "}
            <a href="/#contact" className="text-accent hover:underline">
              {t("more_link")}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
