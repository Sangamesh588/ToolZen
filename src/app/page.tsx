"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLS, CATEGORIES, getPopularTools } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blogs";
import { ToolCard } from "@/components/ToolCard";
import { AdBanner } from "@/components/AdBanner";
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
  const recentTools = TOOLS.filter((t) => recents.includes(t.slug));

  const filteredTools =
    selectedCategory === "all"
      ? TOOLS
      : TOOLS.filter((t) => t.category === selectedCategory);

  const trendingLinks = [
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
    <div className="min-h-screen bg-[#070a12] text-slate-100">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-sky-500/10">
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          {/* Spotlight Search Trigger */}
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-[#0c1220]/90 border border-sky-500/30 shadow-xl shadow-sky-500/5 hover:border-sky-400 hover:shadow-sky-500/20 cursor-pointer transition-all text-left group"
          >
            <Search className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
            <span className="flex-1 text-slate-400 group-hover:text-slate-200 text-sm sm:text-base transition-colors truncate">
              Search tools — Merge PDF, CGPA, Attendance, DontPad, QR...
            </span>
            <kbd className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 text-sky-300 border border-sky-500/30 shrink-0">
              ⌘K
            </kbd>
          </div>

          {/* Quick Keyword Links - PDF First */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold shrink-0">Trending:</span>
            {trendingLinks.map((item) => (
              <Link
                key={item.slug}
                href={`/tools/${item.slug}`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl font-medium bg-[#0c1220]/80 text-slate-300 hover:text-white border border-slate-800 hover:border-sky-400/60 hover:bg-sky-500/10 transition-all shadow-sm"
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

      {/* ── RECENTLY USED ── */}
      {recentTools.length > 0 && (
        <section className="py-8 bg-[#090e1a]/60 border-y border-slate-850">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-sky-400" />
              <h2 className="text-base font-bold text-white">Recently Used by You</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTools.slice(0, 4).map((tool) => (
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
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Most Frequently Used</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Popular Utilities
              </h2>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline transition-colors"
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

      {/* ── CATEGORY EXPLORER WITH LIVE FILTERS ── */}
      <section className="py-12 md:py-16 bg-[#090e1a]/80 border-y border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Catalog Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
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
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/25"
                  : "bg-[#0c1220] text-slate-300 border-slate-800 hover:border-sky-500/40 hover:text-white"
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
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-400 shadow-md shadow-sky-500/25"
                    : "bg-[#0c1220] text-slate-300 border-slate-800 hover:border-sky-500/40 hover:text-white"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0c1220] border border-slate-800 hover:border-sky-400 text-sm font-bold text-slate-200 hover:text-sky-300 shadow-sm transition-all"
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
      <section className="py-12 md:py-16 border-t border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Educational Knowledge</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Featured Guides &amp; Tutorials
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline transition-colors"
            >
              <span>Explore all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <div
                key={post.slug}
                className="group p-6 rounded-2xl bg-[#0c1220]/85 border border-slate-800 hover:border-sky-500/50 shadow-sm hover:shadow-lg hover:shadow-sky-500/5 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block text-xs font-bold text-sky-300 bg-sky-500/15 border border-sky-500/30 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
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
