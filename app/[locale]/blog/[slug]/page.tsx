import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { blogArticles, getBlogArticle } from "@/lib/blog-data";
import type { Metadata } from "next";

// ISR: regenerate every 24 h — article content is stable but may be updated
export const revalidate = 86400;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://trustfamily.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getBlogArticle(slug);

  if (!article) return { title: "Article not found | TrustFamily" };

  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  return {
    title: `${article.title} | TrustFamily`,
    description: article.intro.slice(0, 160),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${BASE}/en/blog/${article.slug}`,
        "x-default": `${BASE}/en/blog/${article.slug}`,
      },
    },
    openGraph: {
      title: `${article.title} | TrustFamily`,
      description: article.intro.slice(0, 160),
      url: `${BASE}/${locale}/blog/${article.slug}`,
      siteName: "TrustFamily",
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: ["TrustFamily Editorial Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | TrustFamily`,
      description: article.intro.slice(0, 160),
    },
  };
}

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  const canonicalUrl = `${BASE}/en/blog/${article.slug}`;

  // Article JSON-LD — full schema for E-E-A-T and AI engine freshness signals
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.intro,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "url": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": "TrustFamily Editorial Team",
      "url": `${BASE}/en/about`,
      "worksFor": { "@type": "Organization", "name": "TrustFamily", "url": BASE },
    },
    "publisher": {
      "@type": "Organization",
      "name": "TrustFamily",
      "logo": { "@type": "ImageObject", "url": `${BASE}/logo.png` },
      "url": BASE,
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
    "articleSection": "Relocation Guides",
    "inLanguage": "en",
    "about": [
      { "@type": "Thing", "name": "International schools Portugal" },
      { "@type": "Thing", "name": "Expat families Portugal" },
      { "@type": "Place", "name": "Portugal" },
    ],
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE}/en` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE}/en/blog` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": canonicalUrl },
    ],
  };

  return (
    <main className="container mx-auto py-12 px-6 max-w-3xl">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs />

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-ink-muted mb-4">
        <time dateTime={article.datePublished}>{article.datePublished}</time>
        <span>·</span>
        <span>{article.readTime}</span>
        <span>·</span>
        <span>TrustFamily Editorial</span>
      </div>

      {/* Title */}
      <h1 className="font-serif font-semibold text-4xl md:text-5xl text-ink-primary mb-3 leading-tight">
        {article.title}
      </h1>
      <p className="text-ink-muted text-base mb-8 italic">{article.subtitle}</p>

      {/* Intro */}
      <p className="text-lg text-ink-secondary leading-relaxed mb-10">{article.intro}</p>

      {/* Article sections */}
      <div className="space-y-10">
        {article.sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">
              {i + 1}. {section.heading}
            </h2>
            <p className="text-ink-secondary leading-relaxed">{section.body}</p>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-brand-50 border border-border rounded-2xl p-6 text-center">
        <h2 className="font-serif font-semibold text-xl text-ink-primary mb-2">Ready to go deeper?</h2>
        <p className="text-ink-muted text-sm mb-5">
          Use our independent guides to compare schools and neighborhoods — or take the 60-second School Finder quiz.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" asChild>
            <Link href={article.cta.href}>{article.cta.text}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/school-finder">School Finder Quiz</Link>
          </Button>
        </div>
      </div>

      {/* Back to blog */}
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="text-sm text-ink-muted hover:text-brand transition-colors"
        >
          ← All articles
        </Link>
      </div>

    </main>
  );
}
