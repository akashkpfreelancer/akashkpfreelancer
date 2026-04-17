import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akash Patel",
  url: "https://akashcodecafe.tech",
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  description:
    "I build production-grade RAG systems, computer vision pipelines, and AI agents — turning complex ML research into working software that ships.",
  image: "https://akashcodecafe.tech/images/akash.jpeg",
  sameAs: [
    "https://github.com/akashkpfreelancer",
    "https://linkedin.com/in/akashdeveloper",
    "https://youtube.com/@coderakash",
    "https://instagram.com/akash_code_cafe",
  ],
  knowsAbout: [
    "Machine Learning",
    "RAG Systems",
    "Computer Vision",
    "AI Agents",
    "LangChain",
    "PyTorch",
    "Next.js",
    "FastAPI",
  ],
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressCountry: "IN" },
  offers: {
    "@type": "Offer",
    description: "Freelance AI/ML engineering and full-stack development",
    areaServed: "Worldwide",
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  const desc = t("tagline");
  return {
    title: "Akash Patel — AI/ML Engineer & Full-Stack Developer",
    description: desc,
    keywords: [
      "AI ML engineer freelance",
      "RAG system developer",
      "computer vision engineer",
      "LangChain developer",
      "Next.js full-stack developer",
      "AI agent developer",
      "freelance machine learning",
      "Akash Patel",
    ],
    authors: [{ name: "Akash Patel", url: "https://akashcodecafe.tech" }],
    metadataBase: new URL("https://akashcodecafe.tech"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale,
      siteName: "Akash Patel",
      title: "Akash Patel — AI/ML Engineer & Full-Stack Developer",
      description: desc,
      url: `https://akashcodecafe.tech/${locale}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Akash Patel" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Akash Patel — AI/ML Engineer & Full-Stack Developer",
      description: desc,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
