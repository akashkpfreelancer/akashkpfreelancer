import { posts, getPost, formatDate } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Akash Patel`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations("blog");

  return (
    <main className="min-h-screen pt-28 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} /> {t("back")}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground font-mono">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readTime} min read
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-snug">
            {post.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>
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
        </div>

        <hr className="border-border mb-10" />

        {/* Article body */}
        <article
          className="prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:font-semibold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-code:text-accent prose-code:bg-accent/10 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:text-xs
            prose-li:text-muted-foreground
            prose-strong:text-foreground
            prose-ol:text-muted-foreground
            prose-ul:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="border-border mt-14 mb-10" />

        {/* CTA */}
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
          <p className="text-sm font-medium text-foreground mb-1">{t("cta_title")}</p>
          <p className="text-xs text-muted-foreground mb-4">{t("cta_subtitle")}</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition-colors"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>
    </main>
  );
}
