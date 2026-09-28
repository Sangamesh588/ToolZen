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
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0c1220] rounded-2xl shadow-2xl shadow-black border border-sky-500/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            placeholder="Search tools (e.g. Merge PDF, CGPA, Attendance, QR, DontPad...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm sm:text-base font-medium"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
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
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-850/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                      <DynamicIcon name={tool.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm group-hover:text-sky-300 transition-colors truncate">
                          {tool.name}
                        </span>
                        {tool.isPopular && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 shrink-0">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0 ml-2">
                    {isFav && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tool.category}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No tools found matching &ldquo;<span className="text-white">{query}</span>&rdquo;.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#080c16] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Navigate with mouse or touch</span>
          <span className="text-sky-400 font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
