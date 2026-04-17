import { posts, formatDate } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Akash Patel",
  description: "AI/ML engineering insights, RAG systems, computer vision, and production lessons from Akash Patel.",
};

export default async function BlogPage() {
  const t = await getTranslations("blog");

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-border bg-surface hover:border-accent/40 transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground font-mono">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {post.readTime} min read
                </span>
              </div>
              <h2 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                  >
                    <Tag size={9} />
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
