"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "dark" | "light";
}>({ theme: "dark", setTheme: () => {}, resolved: "dark" });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [resolved, setResolved] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme) ?? "dark";
    setThemeState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (t: Theme) => {
      const r = t === "system" ? (mq.matches ? "dark" : "light") : t;
      root.classList.remove("dark", "light");
      root.classList.add(r);
      setResolved(r);
    };
    apply(theme);
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      mq.addEventListener("change", () => apply("system"));
      return () => mq.removeEventListener("change", () => apply("system"));
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
