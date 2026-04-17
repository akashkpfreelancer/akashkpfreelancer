"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 py-8 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          © {year} Akash Patel. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="hover:text-foreground transition-colors"
          >
            {t("download_resume")} ↓
          </a>
          <span className="text-border">|</span>
          <span className="font-mono">{t("built")}</span>
        </div>
      </div>
    </footer>
  );
}
