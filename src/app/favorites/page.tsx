"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { TOOLS, getPopularTools } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  const { favorites } = useApp();
  const savedTools = TOOLS.filter((t) => favorites.includes(t.slug));
  const popular = getPopularTools().slice(0, 6);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Personal Workspace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Saved Favorite Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Quickly access your bookmarked calculators and daily utilities stored securely in your browser.
          </p>
        </div>

        {savedTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              No favorites saved yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Click the heart icon on any tool card across the platform to pin your favorite utilities here for instant one-click access.
            </p>
            <div className="pt-2">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20"
              >
                <span>Browse All Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Recommended Popular Tools */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Popular Tools You Might Like
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popular.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
