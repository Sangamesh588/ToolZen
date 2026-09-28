import React from "react";
import Link from "next/link";
import { CATEGORIES, getPopularTools } from "@/data/tools";
import { Sparkles, Shield, Zap, Globe } from "lucide-react";

export function Footer() {
  const popular = getPopularTools().slice(0, 6);

  return (
    <footer className="border-t border-sky-500/15 bg-[#05070e] text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent">
                ToolGen
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The premier online utility platform for students, developers, and creators. 100% free, private browser-based computations with zero installation required.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Client-Side Fast</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Global Free Access</span>
              </div>
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              Popular Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              {popular.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">
              Platform &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog" className="hover:text-sky-400 transition-colors">
                  SEO &amp; Tech Blog
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-sky-400 transition-colors">
                  Saved Bookmarks
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-sky-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-sky-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ToolGen. Built for extreme speed across all devices.</p>
          <p>Privacy First: PDF tools, calculations, and conversions execute locally.</p>
        </div>
      </div>
    </footer>
  );
}
