"use client";

import React from "react";
import Link from "next/link";
import { ToolItem } from "@/data/tools";
import { DynamicIcon } from "./DynamicIcon";
import { Star, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface ToolCardProps {
  tool: ToolItem;
  featured?: boolean;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(tool.slug);

  return (
    <div
      className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-[#0c1220]/85 border transition-all duration-200 ${
        featured
          ? "border-sky-500/40 shadow-lg shadow-sky-500/5 hover:border-sky-400 hover:shadow-sky-500/15"
          : "border-slate-800/80 hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/10"
      }`}
    >
      <div>
        {/* Top Header: Icon & Favorite Button */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/30 transition-all duration-200">
            <DynamicIcon name={tool.icon} className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1.5">
            {tool.isPopular && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                Popular
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(tool.slug);
              }}
              title={fav ? "Remove from Favorites" : "Add to Favorites"}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  fav ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/tools/${tool.slug}`} className="block">
          <h3 className="font-bold text-slate-100 text-base group-hover:text-sky-300 transition-colors leading-snug">
            {tool.name}
          </h3>
          <p className="mt-1.5 text-xs text-slate-400 group-hover:text-slate-300 line-clamp-2 leading-relaxed transition-colors">
            {tool.shortDescription}
          </p>
        </Link>
      </div>

      {/* Footer Info: Category & Rating */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <Link
          href={`/category/${tool.category}`}
          className="capitalize font-medium text-slate-400 hover:text-sky-400 transition-colors"
        >
          {tool.category}
        </Link>
        <div className="flex items-center gap-1 text-slate-400 font-medium">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-slate-200">{tool.rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-500">
            ({tool.reviewsCount.toLocaleString()})
          </span>
        </div>
      </div>
    </div>
  );
}
