"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { CATEGORIES } from "@/data/tools";
import {
  Search,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  FileText,
  BookOpen,
} from "lucide-react";

export function Navbar() {
  const { setIsSearchOpen, favorites } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-100 bg-white/90 backdrop-blur-xl shadow-sm shadow-sky-500/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-slate-900 via-sky-900 to-sky-600 bg-clip-text text-transparent">
                ToolGen
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  categoriesOpen
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:text-slate-900 hover:bg-sky-50"
                }`}
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform ${
                    categoriesOpen ? "rotate-180 text-sky-600" : ""
                  }`}
                />
              </button>

              {categoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setCategoriesOpen(false)}
                  />
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl shadow-sky-900/10 border border-sky-100 p-2 z-20 grid grid-cols-1 gap-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sky-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-slate-700 group-hover:text-sky-600 transition-colors">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-1.5 mt-1 border-t border-sky-100">
                      <Link
                        href="/categories"
                        onClick={() => setCategoriesOpen(false)}
                        className="block text-center text-xs font-semibold text-sky-600 py-1.5 hover:underline"
                      >
                        View All Categories &rarr;
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Link
              href="/tools/cover-letter-generator"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname.startsWith("/tools/cover-letter-generator")
                  ? "bg-sky-50 text-sky-700 font-semibold border border-sky-200"
                  : "text-slate-700 hover:text-slate-900 hover:bg-sky-50"
              }`}
            >
              Cover Letters
            </Link>

            <Link
              href="/category/pdf"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname === "/category/pdf"
                  ? "bg-sky-50 text-sky-700 font-semibold border border-sky-200"
                  : "text-slate-700 hover:text-slate-900 hover:bg-sky-50"
              }`}
            >
              PDF Tools
            </Link>

            <Link
              href="/tools/dontpad"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname.startsWith("/tools/dontpad")
                  ? "bg-sky-50 text-sky-700 font-semibold border border-sky-200"
                  : "text-slate-700 hover:text-slate-900 hover:bg-sky-50"
              }`}
            >
              DontPad
            </Link>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-xl transition-all ${
                pathname.startsWith("/blog")
                  ? "bg-sky-50 text-sky-700 font-semibold border border-sky-200"
                  : "text-slate-700 hover:text-slate-900 hover:bg-sky-50"
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>

        {/* Search Bar Trigger & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50/80 hover:bg-sky-100/80 border border-sky-200 text-slate-700 hover:text-slate-900 text-xs sm:text-sm transition-all shadow-sm group"
          >
            <Search className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium">Search tools...</span>
            <span className="hidden lg:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-sky-200 text-sky-600">
              ⌘K
            </span>
          </button>

          {/* Favorites Link */}
          <Link
            href="/favorites"
            className="relative p-2.5 rounded-xl hover:bg-sky-50 border border-transparent hover:border-sky-200 text-slate-600 hover:text-rose-500 transition-colors"
            title="My Saved Tools"
          >
            <Heart className="w-5 h-5" />
            {mounted && favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-in fade-in">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-sky-50 text-slate-700 hover:text-slate-900 border border-transparent hover:border-sky-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-sky-100 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2">
          <Link
            href="/tools/cover-letter-generator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Cover Letter Generator</span>
          </Link>
          <Link
            href="/category/pdf"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            <FileText className="w-4 h-4 text-sky-600" />
            <span>PDF Tools</span>
          </Link>
          <Link
            href="/categories"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            All Categories
          </Link>
          <Link
            href="/tools/dontpad"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            DontPad Shared Notepad
          </Link>
          <Link
            href="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            <span>Saved Favorites</span>
            {mounted && favorites.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 border border-rose-500/30 text-xs font-bold">
                {favorites.length}
              </span>
            )}
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-slate-800 hover:text-sky-600 hover:bg-sky-50"
          >
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Blog &amp; Guides</span>
          </Link>
        </div>
      )}
    </header>
  );
}
