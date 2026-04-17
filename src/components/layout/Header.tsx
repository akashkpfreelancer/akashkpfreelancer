"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useTheme } from "./ThemeProvider";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Moon, Sun, Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCALES: Record<string, string> = {
  en: "EN", es: "ES", fr: "FR", de: "DE", ar: "AR", pt: "PT",
};

export default function Header() {
  const t = useTranslations("nav");
  const { resolved, setTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#work", label: t("work") },
    { href: "#playground", label: t("playground") },
    { href: "#about", label: t("about") },
    { href: "/blog", label: t("blog"), isPage: true },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-border/60 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight flex items-center gap-1.5"
        >
          <span className="gradient-text text-base font-bold">Akash</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground/70 font-normal">ai·ml</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) =>
            l.isPage ? (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((p) => !p)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-md hover:bg-muted transition-colors"
              aria-label="Switch language"
            >
              <Globe size={13} />
              <span className="font-mono uppercase">
                {LOCALES[pathname?.split("/")[1] ?? "en"] ?? "EN"}
              </span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 glass rounded-lg border border-border shadow-xl overflow-hidden min-w-[80px]"
                >
                  {routing.locales.map((locale) => (
                    <Link
                      key={locale}
                      href={pathname ?? "/"}
                      locale={locale}
                      onClick={() => setLangOpen(false)}
                      className="block px-3 py-1.5 text-xs font-mono hover:bg-muted hover:text-foreground text-muted-foreground transition-colors"
                    >
                      {LOCALES[locale]}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {resolved === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Resume */}
          <a
            href="/resume.pdf"
            download
            className="hidden md:flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
          >
            {t("resume")} ↓
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/60 glass overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              {navLinks.map((l) =>
                l.isPage ? (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}
              <div className="border-t border-border/40 pt-3 mt-1 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {routing.locales.map((locale) => (
                    <Link
                      key={locale}
                      href={pathname ?? "/"}
                      locale={locale}
                      onClick={() => setMenuOpen(false)}
                      className="text-xs font-mono px-2 py-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {LOCALES[locale]}
                    </Link>
                  ))}
                </div>
                <a
                  href="/resume.pdf"
                  download
                  className="text-xs font-mono px-3 py-1.5 rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                >
                  {t("resume")} ↓
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
