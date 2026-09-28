import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { TOOLS, getToolBySlug, getRelatedTools, CATEGORIES } from "@/data/tools";
import { ToolDispatcher } from "@/components/tools/ToolDispatcher";
import { ToolCard } from "@/components/ToolCard";
import { ToolJsonLd } from "@/components/JsonLd";
import { AdBanner } from "@/components/AdBanner";
import { DynamicIcon } from "@/components/DynamicIcon";
import {
  Star,
  ShieldCheck,
  Zap,
  HelpCircle,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found - ToolGen",
    };
  }

  const url = `https://toolgen.app/tools/${tool.slug}`;

  return {
    title: `${tool.metaTitle} | ToolGen`,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: url,
      siteName: "ToolGen",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const related = getRelatedTools(tool.slug, 3);
  const categoryInfo = CATEGORIES.find((c) => c.slug === tool.category);
  const canonicalUrl = `https://toolgen.app/tools/${tool.slug}`;

  return (
    <div className="min-h-screen py-8">
      {/* SEO Schema Injection */}
      <ToolJsonLd tool={tool} url={canonicalUrl} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link
            href={`/category/${tool.category}`}
            className="capitalize hover:text-blue-600 dark:hover:text-blue-400"
          >
            {categoryInfo ? categoryInfo.name : tool.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate">
            {tool.name}
          </span>
        </nav>

        {/* Tool Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                <DynamicIcon name={tool.icon} className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    {tool.name}
                  </h1>
                  {tool.isPopular && (
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                  {tool.shortDescription}
                </p>
              </div>
            </div>

            {/* Rating & Trust Badges */}
            <div className="flex items-center gap-3 self-center sm:self-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{tool.rating.toFixed(1)}</span>
                <span className="text-slate-400">({tool.reviewsCount.toLocaleString()} votes)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Free & Private</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant Client-Side Engine</span>
            </div>
          </div>
        </div>

        {/* Top Responsive Leaderboard Ad Slot */}
        <AdBanner format="leaderboard" adSlotId={`ad-tool-${tool.id}-top`} />

        {/* Main Interactive Tool Container */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
          <ToolDispatcher tool={tool} />
        </div>

        {/* In-tool Native Ad Unit */}
        <AdBanner format="in-article" adSlotId={`ad-tool-${tool.id}-mid`} />

        {/* SEO Rich Content: How to Use Guide */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h2>How to Use {tool.name}</h2>
          </div>
          <ol className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 list-decimal list-inside leading-relaxed">
            {tool.instructions.map((step, idx) => (
              <li key={idx} className="pl-1">
                <span className="font-medium text-slate-800 dark:text-slate-200">{step}</span>
              </li>
            ))}
          </ol>

          {/* Formula or Logic Box if available */}
          {tool.formula && (
            <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-xs font-semibold uppercase text-slate-400">
                Mathematical Formula
              </span>
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                {tool.formula}
              </div>
            </div>
          )}
        </div>

        {/* SEO FAQ Accordion with Schema */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-lg">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {tool.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools Section */}
        {related.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Related {categoryInfo?.name || "Tools"}
              </h2>
              <Link
                href={`/category/${tool.category}`}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((relTool) => (
                <ToolCard key={relTool.id} tool={relTool} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
