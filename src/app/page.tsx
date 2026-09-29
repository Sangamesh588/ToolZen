"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLS, CATEGORIES, getPopularTools } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blogs";
import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/AdBanner";
import { FeedbackPoll } from "@/components/FeedbackPoll";
import { useApp } from "@/context/AppContext";
import {
  Search,
  ArrowRight,
  TrendingUp,
  History,
  BookOpen,
  LayoutGrid,
} from "lucide-react";

export default function HomePage() {
  const { setIsSearchOpen, recents } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const popularTools = getPopularTools().slice(0, 8);
  // Show last 5 used tools in exact order of usage
  const recentTools = recents
    .map((slug) => TOOLS.find((t) => t.slug === slug))
    .filter((t): t is (typeof TOOLS)[0] => Boolean(t))
    .slice(0, 5);

  const filteredTools =
    selectedCategory === "all"
      ? TOOLS
      : TOOLS.filter((t) => t.category === selectedCategory);

  const trendingLinks = [
    { name: "✨ Cover Letters", slug: "cover-letter-generator" },
    { name: "📄 Merge PDF", slug: "merge-pdf" },
    { name: "🖼️ Image to PDF", slug: "image-to-pdf" },
    { name: "🔒 Protect PDF", slug: "protect-pdf" },
    { name: "📝 PDF to Word", slug: "pdf-to-word" },
    { name: "🎓 CGPA Calc", slug: "cgpa-calculator" },
    { name: "📅 Attendance", slug: "attendance-calculator" },
    { name: "📋 DontPad", slug: "dontpad" },
    { name: "🔲 QR Studio", slug: "qr-code-generator" },
  ];

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-slate-900">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-sky-100">
        {/* Ambient Subtle Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] bg-sky-200/50 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          {/* Spotlight Search Trigger */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white border border-sky-200 shadow-lg shadow-sky-500/5 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer transition-all text-left group"
          >
            <Search className="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform shrink-0" />
            <span className="flex-1 text-slate-500 group-hover:text-slate-800 text-sm sm:text-base transition-colors truncate">
              Search tools — Cover Letters, Merge PDF, CGPA, Attendance, QR, EMI...
            </span>
            <kbd className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-sky-50 text-sky-700 border border-sky-200 shrink-0">
              ⌘K
            </kbd>
          </div>

          {/* Quick Keyword Links */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-1 text-xs">
            <span className="text-slate-500 font-semibold shrink-0">Trending:</span>
            {trendingLinks.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl font-medium bg-white text-slate-700 hover:text-sky-700 border border-sky-200 hover:border-sky-400 hover:bg-sky-50 transition-all shadow-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD BANNER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner format="leaderboard" adSlotId="home-leaderboard-top" />
      </div>

      {/* ── RECENTLY USED TOOLS (SHOW LAST 5) ── */}
      {recentTools.length > 0 && (
        <section className="py-8 bg-white border-y border-sky-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-600" />
                <h2 className="text-base font-bold text-slate-900">Recently Used Tools (Last {recentTools.length})</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">Auto-saved to your browser</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recentTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── POPULAR UTILITIES SECTION ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Most Frequently Used</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Popular Utilities
              </h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
            >
              <span>View all tools</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEEDBACK POLL: WHICH TOOL SHOULD WE BUILD NEXT? ── */}
      <FeedbackPoll />

      {/* ── CATEGORY EXPLORER WITH LIVE FILTERS ── */}
      <section className="py-12 md:py-16 bg-white border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Catalog Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Explore Tools by Category
              </h2>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === "all"
                  ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20"
                  : "bg-sky-50/80 text-slate-700 border-sky-200 hover:border-sky-400 hover:bg-sky-100"
              }`}
            >
              All Tools ({TOOLS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.slug
                    ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20"
                    : "bg-sky-50/80 text-slate-700 border-sky-200 hover:border-sky-400 hover:bg-sky-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Filtered Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.slice(0, 12).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length > 12 && (
            <div className="text-center pt-4">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-sky-200 hover:border-sky-400 text-sm font-bold text-slate-800 hover:text-sky-600 shadow-sm transition-all"
              >
                <span>Browse All {filteredTools.length} Matching Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── MID-PAGE NATIVE AD UNIT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdBanner format="in-article" adSlotId="home-native-mid" />
      </div>

      {/* ── LATEST BLOG & GUIDES SECTION ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-wider mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Educational Knowledge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Guides &amp; Tutorials
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline transition-colors"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <div
                key={post.slug}
                className="group p-6 rounded-2xl bg-white border border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-lg hover:shadow-sky-500/5 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
                  >
                    Read Guide &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
