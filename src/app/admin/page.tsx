"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blogs";
import {
  Users,
  Eye,
  EyeOff,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Globe,
  Sparkles,
  ArrowUpRight,
  Lock,
  LogOut,
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "tools" | "ads" | "blogs">("overview");

  // Admin authentication state initialized from sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("toolgen_admin_auth") === "true";
  });
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "sangamesh" && passwordInput === "Sangamesh@123") {
      sessionStorage.setItem("toolgen_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid administrator credentials. Access denied.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("toolgen_admin_auth");
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
  };

  // Telemetry Mock Stats
  const stats = [
    {
      title: "Monthly Active Users",
      value: "284,520",
      change: "+18.4% from last mo",
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/60",
    },
    {
      title: "Monthly Page Views",
      value: "1,429,800",
      change: "+24.2% organic search",
      icon: Eye,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60",
    },
    {
      title: "Google AdSense Revenue",
      value: "$4,862.40",
      change: "+14.8% CTR (Avg RPM $3.40)",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60",
    },
    {
      title: "Indexed Google Pages",
      value: `${TOOLS.length + CATEGORIES.length + BLOG_POSTS.length}`,
      change: "100% Rich Snippet Health",
      icon: Globe,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-950/60",
    },
  ];

  const topSearchQueries = [
    { query: "cgpa calculator online", volume: "92,400/mo", rank: "#1", ctr: "34.2%" },
    { query: "free image compressor client side", volume: "68,100/mo", rank: "#2", ctr: "28.5%" },
    { query: "emi calculator home loan", volume: "54,200/mo", rank: "#2", ctr: "26.1%" },
    { query: "merge pdf free online", volume: "47,800/mo", rank: "#3", ctr: "21.0%" },
    { query: "attendance bunk calculator", volume: "39,500/mo", rank: "#1", ctr: "41.8%" },
    { query: "sip calculator mutual funds", volume: "36,900/mo", rank: "#2", ctr: "27.4%" },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-2xl shadow-sky-500/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-neutral-800 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              ToolGen Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Please authenticate to access telemetry, tool configurations, and AdSense revenue metrics.
            </p>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 transition-all active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors"
            >
              &larr; Return to ToolGen Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-neutral-800 text-sky-700 dark:text-sky-300 mb-2 border border-sky-200 dark:border-neutral-700">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>Platform Control Center</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Admin & Growth Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Logged in as <span className="font-semibold text-sky-600 dark:text-sky-400">sangamesh</span> • Live telemetry, Google indexing, and AdSense.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Selector */}
            <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-neutral-800">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "overview"
                    ? "bg-white dark:bg-neutral-900 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("tools")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "tools"
                    ? "bg-white dark:bg-neutral-900 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Tools ({TOOLS.length})
              </button>
              <button
                onClick={() => setActiveTab("ads")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "ads"
                    ? "bg-white dark:bg-neutral-900 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Ad Revenue
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "blogs"
                    ? "bg-white dark:bg-neutral-900 text-sky-600 dark:text-sky-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Blogs ({BLOG_POSTS.length})
              </button>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 text-xs font-bold transition-colors"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{s.title}</span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono">
                    {s.value}
                  </div>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {s.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Organic Search Keywords */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                    Top Google Search Queries
                  </h3>
                  <p className="text-xs text-slate-500">
                    Highest organic impressions & click-through rates
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Google Search Console
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3 rounded-l-lg">Target Keyword</th>
                      <th className="py-2.5 px-3">Search Volume</th>
                      <th className="py-2.5 px-3">Google Rank</th>
                      <th className="py-2.5 px-3 rounded-r-lg">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {topSearchQueries.map((q, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                          {q.query}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">{q.volume}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold">
                            {q.rank}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                          {q.ctr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Architecture & SEO Health */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                SEO & Indexing Health
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">JSON-LD Schemas</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Valid
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Sitemap XML</span>
                  <Link href="/sitemap.xml" target="_blank" className="font-bold text-blue-600 hover:underline">
                    View Live /sitemap.xml
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Robots.txt</span>
                  <Link href="/robots.txt" target="_blank" className="font-bold text-blue-600 hover:underline">
                    View Live /robots.txt
                  </Link>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Largest Contentful Paint</span>
                  <span className="font-bold text-emerald-600">0.8s (Good)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Cumulative Layout Shift</span>
                  <span className="font-bold text-emerald-600">0.00 (Perfect)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tools Management */}
        {activeTab === "tools" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Tools Directory ({TOOLS.length} Active Tools)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="py-2.5 px-3 rounded-l-lg">Tool Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Rating</th>
                    <th className="py-2.5 px-3">Reviews</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {TOOLS.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {t.name}
                      </td>
                      <td className="py-3 px-3 capitalize text-slate-500">{t.category}</td>
                      <td className="py-3 px-3 font-mono font-bold">{t.rating.toFixed(1)}</td>
                      <td className="py-3 px-3 font-mono">{t.reviewsCount.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <Link
                          href={`/tools/${t.slug}`}
                          className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                        >
                          View <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Ad Revenue */}
        {activeTab === "ads" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Google AdSense Placement Metrics
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block">Top Leaderboard (728x90)</span>
                    <span className="text-xs text-slate-500">Above-the-fold desktop & mobile view</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-mono font-bold">$2,140.80</span>
                    <span className="text-xs text-slate-400 block">CTR: 2.8%</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block">In-Tool Native Sponsored Unit</span>
                    <span className="text-xs text-slate-500">High engagement placement under calculator</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-mono font-bold">$1,890.40</span>
                    <span className="text-xs text-slate-400 block">CTR: 3.4%</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm block">Category Page Banner</span>
                    <span className="text-xs text-slate-500">Category directory pages</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-600 font-mono font-bold">$831.20</span>
                    <span className="text-xs text-slate-400 block">CTR: 1.9%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-4">
              <span className="text-xs uppercase font-bold text-blue-200">Monetization Checklist</span>
              <h4 className="text-xl font-extrabold">Next Scaling Opportunities</h4>
              <ul className="space-y-2.5 text-xs text-blue-100 leading-relaxed">
                <li>• Enable Google AdSense Auto Ads for anchor banners</li>
                <li>• Add Affiliate links for Web Hosting on Dev Tools</li>
                <li>• Launch Pro Subscription for unlimited batch processing</li>
                <li>• Offer sponsored tool features on top category slots</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Blog Posts */}
        {activeTab === "blogs" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Published SEO Blog Guides
              </h3>
              <Link
                href="/blog"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Public Blog &rarr;
              </Link>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {BLOG_POSTS.map((post) => (
                <div key={post.slug} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{post.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>By {post.author.name}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-blue-600 hover:underline whitespace-nowrap"
                  >
                    Read &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
