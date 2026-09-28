"use client";

import React, { useState } from "react";
import { Info, Sparkles } from "lucide-react";

interface AdBannerProps {
  format?: "leaderboard" | "rectangle" | "in-article";
  className?: string;
  adSlotId?: string;
}

export function AdBanner({ format = "leaderboard", className = "", adSlotId = "ad-slot-default" }: AdBannerProps) {
  if (format === "rectangle") {
    return (
      <div className={`relative bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-4 flex flex-col items-center justify-center min-h-[250px] w-full max-w-[300px] mx-auto text-center overflow-hidden ${className}`}>
        <div className="absolute top-2 right-2 text-[10px] text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1">
          <Info className="w-3 h-3" /> Ad
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            Fast Web Hosting & Cloud VPS
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deploy Next.js apps with zero configuration. 99.99% uptime guarantee.
          </p>
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block mt-2 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }

  if (format === "in-article") {
    return (
      <div className={`my-6 p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-indigo-50/60 dark:from-slate-900/60 dark:to-blue-950/30 border border-blue-100 dark:border-blue-900/30 text-center relative ${className}`}>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium block mb-2">
          Sponsored Link
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Automate your workflows with AI API Access
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Get 10,000 free API calls every month for batch processing & utilities.
            </p>
          </div>
          <a
            href="#pricing"
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 rounded-xl whitespace-nowrap shadow-sm"
          >
            Get API Key
          </a>
        </div>
      </div>
    );
  }

  // Leaderboard banner
  return (
    <div className={`w-full my-6 bg-slate-50/80 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-3 text-center relative ${className}`}>
      <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block mb-1">
        Advertisement
      </span>
      <div className="min-h-[70px] sm:min-h-[90px] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Google AdSense Leaderboard Placement ({adSlotId})
          </span>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            728 × 90 Responsive
          </span>
        </div>
      </div>
    </div>
  );
}
