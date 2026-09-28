"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  Trash2,
  Share2,
  Lock,
  Clock,
  RefreshCw,
} from "lucide-react";

export function DontPadTool() {
  const [padCode, setPadCode] = useState<string>("welcome");
  const [inputCode, setInputCode] = useState<string>("welcome");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLinkCopied, setIsLinkCopied] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>("");
  const [recentPads, setRecentPads] = useState<string[]>([]);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentCodeRef = useRef<string>("welcome");

  // ---------- helpers ----------
  const addToRecents = useCallback((code: string) => {
    try {
      const stored = localStorage.getItem("toolgen_dontpad_recents") ?? "[]";
      const arr: string[] = JSON.parse(stored);
      const updated = [code, ...arr.filter((c) => c !== code)].slice(0, 8);
      localStorage.setItem("toolgen_dontpad_recents", JSON.stringify(updated));
      setRecentPads(updated);
    } catch {
      /* ignore */
    }
  }, []);

  // ---------- core fetch ----------
  const fetchPad = useCallback(async (code: string, silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch(`/api/dontpad?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = (await res.json()) as { content?: string };
        if (typeof data.content === "string") {
          // Only update if this code is still active
          if (currentCodeRef.current === code) {
            setContent(data.content);
            localStorage.setItem(`toolgen_dontpad_${code}`, data.content);
          }
        }
      }
    } catch {
      // offline — content already loaded from localStorage
    } finally {
      if (!silent) {
        setIsLoading(false);
        setLastSaved(new Date().toLocaleTimeString());
      }
    }
  }, []);

  // ---------- load pad ----------
  const loadPad = useCallback(
    async (raw: string) => {
      const code = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "") || "welcome";

      // Stop old polling
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);

      currentCodeRef.current = code;
      setPadCode(code);
      setInputCode(code);
      setContent(""); // clear stale content immediately

      // Update URL without reload
      if (typeof window !== "undefined") {
        const newUrl = `${window.location.pathname}?code=${code}`;
        window.history.pushState({ path: newUrl }, "", newUrl);

        // Show cached content instantly while fetching
        const cached = localStorage.getItem(`toolgen_dontpad_${code}`);
        if (cached !== null) setContent(cached);
      }

      await fetchPad(code, false);
      addToRecents(code);

      // Poll every 5 s for live sync
      pollTimerRef.current = setInterval(() => {
        fetchPad(code, true);
      }, 5000);
    },
    [fetchPad, addToRecents]
  );

  // ---------- initial mount ----------
  useEffect(() => {
    let initialCode = "welcome";

    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("code");
      if (q) initialCode = q.trim().toLowerCase();

      try {
        const arr: string[] = JSON.parse(
          localStorage.getItem("toolgen_dontpad_recents") ?? "[]"
        );
        setRecentPads(arr.length > 0 ? arr : ["welcome"]);
      } catch {
        setRecentPads(["welcome"]);
      }
    }

    loadPad(initialCode);

    return () => {
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    };
  }, [loadPad]);

  // ---------- typing handler ----------
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setContent(newText);
    setLastSaved("Saving...");

    if (typeof window !== "undefined") {
      localStorage.setItem(`toolgen_dontpad_${padCode}`, newText);
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        await fetch("/api/dontpad", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: padCode, content: newText }),
        });
        setLastSaved(new Date().toLocaleTimeString());
      } catch {
        setLastSaved(new Date().toLocaleTimeString() + " (saved locally)");
      }
    }, 400);
  };

  const handleSwitchPad = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) loadPad(inputCode);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const copyShareLink = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(
      `${window.location.origin}/tools/dontpad?code=${padCode}`
    );
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const downloadText = (format: "txt" | "md") => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${padCode}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearPad = async () => {
    if (!confirm(`Clear all text in pad "${padCode}"?`)) return;
    setContent("");
    if (typeof window !== "undefined")
      localStorage.removeItem(`toolgen_dontpad_${padCode}`);
    try {
      await fetch("/api/dontpad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: padCode, content: "" }),
      });
    } catch {
      /* ignore */
    }
    setLastSaved(new Date().toLocaleTimeString());
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const lines = content.length > 0 ? content.split("\n").length : 0;

  return (
    <div className="space-y-6">
      {/* Code Selector Bar */}
      <div className="p-5 rounded-3xl bg-[#0c1220]/90 border border-sky-500/25 shadow-xl shadow-sky-500/5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <form onSubmit={handleSwitchPad} className="flex-1 flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-sky-500/10 border border-sky-500/25 text-sky-300 font-mono text-xs shrink-0">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">toolgen/dontpad/</span>
            </div>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter pad code..."
              className="flex-1 px-4 py-2.5 rounded-2xl bg-[#080c16] border border-slate-750 text-white placeholder-slate-500 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-400 outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-500/25 transition-all flex items-center gap-1.5"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
              <span>{isLoading ? "Opening..." : "Open Pad"}</span>
            </button>
          </form>

          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            {isLinkCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{isLinkCopied ? "Link Copied!" : "Share Link"}</span>
          </button>
        </div>

        {/* Recent pads */}
        {recentPads.length > 0 && (
          <div className="flex items-center gap-2 pt-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-slate-400 font-semibold shrink-0">Recent:</span>
            {recentPads.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => loadPad(code)}
                className={`px-3 py-1 rounded-xl font-mono text-xs transition-colors shrink-0 ${
                  padCode === code
                    ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/25"
                    : "bg-[#080c16] text-slate-300 border border-slate-800 hover:border-sky-500/40 hover:text-white"
                }`}
              >
                /{code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Editor */}
      <div className="rounded-3xl bg-[#0c1220]/95 border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-3.5 bg-[#080c16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono font-bold text-sky-400">
              <FileText className="w-4 h-4" />
              <span>pad: /{padCode}</span>
            </div>
            {lastSaved && (
              <div className="hidden sm:flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400/70" />
                <span>Saved: {lastSaved}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 font-semibold transition-colors"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? "Copied" : "Copy All"}</span>
            </button>
            <button
              onClick={() => downloadText("txt")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.txt</span>
            </button>
            <button
              onClick={() => downloadText("md")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-sky-500/50 text-slate-200 font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.md</span>
            </button>
            <button
              onClick={clearPad}
              className="p-1.5 rounded-xl hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
              title="Clear Note"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Textarea */}
        {isLoading ? (
          <div className="flex items-center justify-center h-56 text-slate-400 text-sm gap-2">
            <RefreshCw className="w-5 h-5 animate-spin text-sky-400" />
            <span>Loading pad <span className="font-mono font-bold text-sky-400">/{padCode}</span>...</span>
          </div>
        ) : (
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder={`Pad /${padCode} is empty. Start typing — it auto-saves and anyone with this code can see it instantly.`}
            rows={16}
            className="w-full p-6 bg-transparent text-slate-100 font-mono text-sm sm:text-base leading-relaxed resize-y focus:outline-none placeholder:text-slate-600"
          />
        )}

        {/* Footer stats */}
        <div className="px-6 py-3 bg-[#080c16] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-4">
            <span>{words} words</span>
            <span>{chars} chars</span>
            <span>{lines} lines</span>
          </div>
          <span className="text-[11px] text-sky-400 font-sans font-semibold">
            ⚡ Live Synced · Auto-refreshes every 5s
          </span>
        </div>
      </div>
    </div>
  );
}
