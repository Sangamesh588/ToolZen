"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, ThumbsUp, Send, CheckCircle2, MessageSquarePlus } from "lucide-react";
import Link from "next/link";

interface PollOption {
  id: string;
  title: string;
  description: string;
  badge: string;
  votes: number;
  link?: string;
}

export function FeedbackPoll() {
  const [votedIds, setVotedIds] = useState<string[]>([]);
  const [customIdea, setCustomIdea] = useState("");
  const [submittedCustom, setSubmittedCustom] = useState(false);

  const initialOptions: PollOption[] = [
    {
      id: "cover-letter-generator",
      title: "Cover Letter Generator",
      description: "AI-styled professional cover letters tailored to job description & company",
      badge: "🔥 Most Requested",
      votes: 342,
      link: "/tools/cover-letter-generator",
    },
    {
      id: "fresher-cover-letter",
      title: "Fresher Cover Letters",
      description: "College graduate templates highlighting projects, coursework & quick learning",
      badge: "🎓 Students Favorite",
      votes: 289,
      link: "/tools/cover-letter-generator?type=fresher",
    },
    {
      id: "internship-cover-letter",
      title: "Internship Cover Letters",
      description: "Persuasive application letters for summer & semester internship programs",
      badge: "🚀 High Demand",
      votes: 215,
      link: "/tools/cover-letter-generator?type=internship",
    },
  ];

  const [options, setOptions] = useState<PollOption[]>(initialOptions);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ToolGen_feedback_votes");
      if (saved) setVotedIds(JSON.parse(saved));
    } catch {}
  }, []);

  const handleVote = (id: string) => {
    if (votedIds.includes(id)) return;

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {}

    const updated = [...votedIds, id];
    setVotedIds(updated);
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt))
    );
    try {
      localStorage.setItem("ToolGen_feedback_votes", JSON.stringify(updated));
    } catch {}
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customIdea.trim()) return;

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {}

    setSubmittedCustom(true);
    setCustomIdea("");
    setTimeout(() => setSubmittedCustom(false), 5000);
  };

  return (
    <section className="py-12 bg-white border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 border border-blue-200/90 shadow-lg shadow-blue-500/5">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-300 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
                <MessageSquarePlus className="w-3.5 h-3.5 text-blue-600" />
                <span>Community Feedback Form</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Which tool should we build next?
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                We build tools requested by our community. Cast your vote below or write in your dream utility.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-medium">
              ⚡ Over 840+ votes collected this week
            </div>
          </div>

          {/* Voting Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {options.map((opt) => {
              const hasVoted = votedIds.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  className={`relative p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                    hasVoted
                      ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md shadow-blue-500/10"
                      : "border-blue-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-500/10"
                  }`}
                >
                  <div className="space-y-2.5">
                    <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                      {opt.badge}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-blue-100 flex items-center justify-between gap-2">
                    <div className="text-xs font-bold text-slate-700 font-mono">
                      {opt.votes} votes
                    </div>
                    <div className="flex items-center gap-2">
                      {opt.link && (
                        <Link
                          href={opt.link}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                        >
                          Try Now &rarr;
                        </Link>
                      )}
                      <button
                        onClick={() => handleVote(opt.id)}
                        disabled={hasVoted}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          hasVoted
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                            : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20 active:scale-95"
                        }`}
                      >
                        {hasVoted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Voted</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Vote</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Suggest Custom Tool Input */}
          <form
            onSubmit={handleCustomSubmit}
            className="p-5 rounded-2xl bg-white border border-blue-200 flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="flex items-center gap-2.5 text-slate-700 shrink-0">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Have another idea?
              </span>
            </div>
            <input
              type="text"
              value={customIdea}
              onChange={(e) => setCustomIdea(e.target.value)}
              placeholder="e.g. Resume ATS Checker, Markdown to PDF, GST Calculator..."
              className="flex-1 w-full px-4 py-2.5 rounded-xl border border-blue-200 bg-blue-50/40 text-slate-900 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Suggestion</span>
            </button>
          </form>

          {submittedCustom && (
            <div className="mt-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your suggestion has been added to our development backlog. 🚀</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
