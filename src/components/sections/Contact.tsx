"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, Clock, Globe2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project: z.string().min(10),
  budget: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function Contact() {
  const t = useTranslations("contact");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
        reset();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 aurora">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal className="mb-14 text-center">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">{t("subtitle")}</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">{t("email_direct")}</p>
                <a
                  href="mailto:akash@akashcodecafe.tech"
                  className="text-sm text-accent hover:underline font-mono"
                >
                  akash@akashcodecafe.tech
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">{t("response_time")}</p>
                <p className="text-sm text-muted-foreground">{t("timezone")}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                <Globe2 size={14} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">Remote-first</p>
                <p className="text-sm text-muted-foreground">
                  Working with clients across US, EU, Middle East, and Southeast Asia.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 py-12 text-center rounded-2xl border border-accent/30 bg-accent/5">
                <CheckCircle2 size={36} className="text-accent" />
                <p className="text-foreground font-medium">{t("form_success")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-2xl border border-border bg-surface p-6 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      {...register("name")}
                      placeholder={t("form_name")}
                      className="bg-background border-border"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder={t("form_email")}
                      className="bg-background border-border"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Textarea
                    {...register("project")}
                    placeholder={t("form_project")}
                    rows={4}
                    className="bg-background border-border resize-none"
                  />
                  {errors.project && (
                    <p className="text-xs text-destructive mt-1">{errors.project.message}</p>
                  )}
                </div>
                <Input
                  {...register("budget")}
                  placeholder={t("form_budget")}
                  className="bg-background border-border"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-accent/20"
                >
                  <Send size={14} />
                  {submitting ? t("form_sending") : t("form_send")}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
