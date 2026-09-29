"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TOOLS } from "@/data/tools";
import { DynamicIcon } from "./DynamicIcon";
import { Search, X, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function CommandPalette() {
  const { isSearchOpen, setIsSearchOpen, favorites } = useApp();
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setQuery("");
    setIsSearchOpen(false);
  };

  const filteredTools = TOOLS.filter((tool) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
      tool.category.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const handleSelect = (slug: string) => {
    handleClose();
    router.push(`/tools/${slug}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-sky-950/20 border border-sky-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-sky-100 gap-3">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            type="text"
            placeholder="Search tools (e.g. Cover Letters, Merge PDF, CGPA, Attendance, QR...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool) => {
              const isFav = favorites.includes(tool.slug);
              return (
                <div
                  key={tool.id}
                  onClick={() => handleSelect(tool.slug)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-sky-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                      <DynamicIcon name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-sm group-hover:text-sky-600 transition-colors truncate">
                          {tool.name}
                        </span>
                        {tool.isPopular && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 shrink-0">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0 ml-2">
                    {isFav && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                    <span className="capitalize px-2 py-0.5 rounded-full bg-sky-50 text-slate-700 border border-sky-200">
                      {tool.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              No tools found matching &ldquo;<span className="text-slate-900 font-semibold">{query}</span>&rdquo;.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-sky-50/50 border-t border-sky-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Navigate with mouse or touch</span>
          <span className="text-sky-700 font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
