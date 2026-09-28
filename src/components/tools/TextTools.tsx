"use client";

import React, { useState } from "react";
import { Copy, Check, Trash2 } from "lucide-react";

// 1. WORD & CHARACTER COUNTER
export function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, "").length;
  const sentences = trimmed ? (text.match(/[.!?]+(?:\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;
  const readingTimeMin = (words / 200).toFixed(1);
  const speakingTimeMin = (words / 130).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Real-time Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-center">
          <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400">Words</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-1">
            {words}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-center">
          <span className="text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400">Characters</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-1">
            {charsWithSpaces}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/40 text-center">
          <span className="text-xs uppercase font-bold text-purple-600 dark:text-purple-400">Sentences</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-1">
            {sentences}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-center">
          <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400">Paragraphs</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-1">
            {paragraphs}
          </div>
        </div>
      </div>

      {/* Editor Box */}
      <div className="relative">
        <textarea
          rows={8}
          placeholder="Paste or type your text here to count words, characters, and estimate reading time..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            disabled={!text}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40"
            title="Copy Text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setText("")}
            disabled={!text}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 disabled:opacity-40"
            title="Clear Text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speed Estimates */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex-wrap gap-2">
        <div>
          <span>Characters without spaces: </span>
          <strong className="text-slate-900 dark:text-slate-100 font-mono">{charsNoSpaces}</strong>
        </div>
        <div>
          <span>Reading time: </span>
          <strong className="text-slate-900 dark:text-slate-100 font-mono">~{readingTimeMin} min</strong>
        </div>
        <div>
          <span>Speaking time: </span>
          <strong className="text-slate-900 dark:text-slate-100 font-mono">~{speakingTimeMin} min</strong>
        </div>
      </div>
    </div>
  );
}

// 2. TEXT CASE CONVERTER
export function TextCaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toSentenceCase = () => {
    const res = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(res);
  };
  const toTitleCase = () => {
    const res = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(res);
  };
  const toCamelCase = () => {
    const res = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    setText(res);
  };
  const toSnakeCase = () => {
    const res = text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "_");
    setText(res);
  };
  const toKebabCase = () => {
    const res = text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-");
    setText(res);
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          rows={6}
          placeholder="Paste or write text here to convert into any case..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={copyText}
            disabled={!text}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 disabled:opacity-40"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Conversion Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={toUpperCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          UPPERCASE
        </button>
        <button
          onClick={toLowerCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          lowercase
        </button>
        <button
          onClick={toSentenceCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          Sentence case
        </button>
        <button
          onClick={toTitleCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          Title Case
        </button>
        <button
          onClick={toCamelCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          camelCase
        </button>
        <button
          onClick={toSnakeCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          snake_case
        </button>
        <button
          onClick={toKebabCase}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-bold transition-colors"
        >
          kebab-case
        </button>
      </div>
    </div>
  );
}

// 3. REMOVE DUPLICATE LINES
export function RemoveDuplicateLines() {
  const [input, setInput] = useState("Apple\nBanana\nOrange\nApple\nGrape\nBanana");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = input.split("\n");
  const seen = new Set<string>();
  const outputLines: string[] = [];

  lines.forEach((raw) => {
    const line = trimLines ? raw.trim() : raw;
    if (!line) return;
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      outputLines.push(line);
    }
  });

  if (sortAlphabetical) {
    outputLines.sort((a, b) => a.localeCompare(b));
  }

  const result = outputLines.join("\n");

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Original List ({lines.length} lines)
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Deduplicated ({outputLines.length} unique)
            </label>
            <button
              onClick={copy}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy Clean"}
            </button>
          </div>
          <textarea
            rows={8}
            readOnly
            value={result}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
            className="rounded text-blue-600"
          />
          Case Sensitive Matching
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={trimLines}
            onChange={(e) => setTrimLines(e.target.checked)}
            className="rounded text-blue-600"
          />
          Trim Whitespaces
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={sortAlphabetical}
            onChange={(e) => setSortAlphabetical(e.target.checked)}
            className="rounded text-blue-600"
          />
          Sort Alphabetically (A-Z)
        </label>
      </div>
    </div>
  );
}

// 4. LOREM IPSUM GENERATOR
export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<"paragraphs" | "sentences">("paragraphs");
  const [copied, setCopied] = useState(false);

  const sampleParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
    "Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat.",
    "Vestibulum ullamcorper mauris at ligula. Cras id dui. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac felis sit amet ligula pharetra condimentum.",
  ];

  let output = "";
  if (type === "paragraphs") {
    output = Array.from({ length: count })
      .map((_, i) => sampleParagraphs[i % sampleParagraphs.length])
      .join("\n\n");
  } else {
    const allSentences = sampleParagraphs
      .join(" ")
      .split(". ")
      .filter((s) => s.length > 0)
      .map((s) => (s.endsWith(".") ? s : s + "."));
    output = Array.from({ length: count })
      .map((_, i) => allSentences[i % allSentences.length])
      .join(" ");
  }

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase text-slate-500">Generate:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="w-16 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setType("paragraphs")}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              type === "paragraphs" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800"
            }`}
          >
            Paragraphs
          </button>
          <button
            onClick={() => setType("sentences")}
            className={`px-3 py-1 rounded-lg text-xs font-bold ${
              type === "sentences" ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800"
            }`}
          >
            Sentences
          </button>
        </div>
        <button
          onClick={copy}
          className="ml-auto px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy Output"}
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-serif whitespace-pre-line text-sm">
        {output}
      </div>
    </div>
  );
}
