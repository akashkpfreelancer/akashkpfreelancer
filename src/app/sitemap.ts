import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const base = "https://akashcodecafe.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${base}/${l}`])
      ),
    },
  }));
}
