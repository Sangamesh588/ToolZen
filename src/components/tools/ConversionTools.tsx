"use client";

import React, { useState } from "react";
import { formatNumber } from "@/lib/utils";

// 1. LENGTH CONVERTER
export function LengthConverter() {
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("m");

  // In meters
  const units: Record<string, { name: string; factor: number }> = {
    m: { name: "Meters (m)", factor: 1 },
    km: { name: "Kilometers (km)", factor: 1000 },
    cm: { name: "Centimeters (cm)", factor: 0.01 },
    mm: { name: "Millimeters (mm)", factor: 0.001 },
    mi: { name: "Miles (mi)", factor: 1609.344 },
    yd: { name: "Yards (yd)", factor: 0.9144 },
    ft: { name: "Feet (ft)", factor: 0.3048 },
    in: { name: "Inches (in)", factor: 0.0254 },
  };

  const meters = (parseFloat(val) || 0) * units[from].factor;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Value
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Unit
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
          >
            {Object.entries(units).map(([key, u]) => (
              <option key={key} value={key}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(units).map(([key, u]) => {
          const converted = meters / u.factor;
          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all ${
                key === from
                  ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 font-bold"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <span className="text-[11px] text-slate-400 block">{u.name}</span>
              <div className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {formatNumber(converted, 4)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 2. WEIGHT CONVERTER
export function WeightConverter() {
  const [val, setVal] = useState("1");
  const [from, setFrom] = useState("kg");

  // In kilograms
  const units: Record<string, { name: string; factor: number }> = {
    kg: { name: "Kilograms (kg)", factor: 1 },
    g: { name: "Grams (g)", factor: 0.001 },
    mg: { name: "Milligrams (mg)", factor: 0.000001 },
    lb: { name: "Pounds (lbs)", factor: 0.45359237 },
    oz: { name: "Ounces (oz)", factor: 0.02834952 },
    st: { name: "Stones (st)", factor: 6.35029 },
    t: { name: "Metric Tonnes (t)", factor: 1000 },
  };

  const kg = (parseFloat(val) || 0) * units[from].factor;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Value
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Unit
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
          >
            {Object.entries(units).map(([key, u]) => (
              <option key={key} value={key}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(units).map(([key, u]) => {
          const converted = kg / u.factor;
          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all ${
                key === from
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 font-bold"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <span className="text-[11px] text-slate-400 block">{u.name}</span>
              <div className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {formatNumber(converted, 4)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. TEMPERATURE CONVERTER
export function TemperatureConverter() {
  const [val, setVal] = useState("25");
  const [scale, setScale] = useState<"C" | "F" | "K">("C");

  const num = parseFloat(val) || 0;
  let c = 0;
  let f = 0;
  let k = 0;

  if (scale === "C") {
    c = num;
    f = (num * 9) / 5 + 32;
    k = num + 273.15;
  } else if (scale === "F") {
    c = ((num - 32) * 5) / 9;
    f = num;
    k = c + 273.15;
  } else {
    k = num;
    c = num - 273.15;
    f = (c * 9) / 5 + 32;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Temperature Value
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Scale
          </label>
          <div className="flex gap-2">
            {(["C", "F", "K"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold ${
                  scale === s
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {s === "C" ? "Celsius (°C)" : s === "F" ? "Fahrenheit (°F)" : "Kelvin (K)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-center">
          <span className="text-xs uppercase font-semibold text-blue-200">Celsius</span>
          <div className="text-3xl font-extrabold font-mono mt-1">{c.toFixed(2)} °C</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center">
          <span className="text-xs uppercase font-semibold text-amber-200">Fahrenheit</span>
          <div className="text-3xl font-extrabold font-mono mt-1">{f.toFixed(2)} °F</div>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white text-center">
          <span className="text-xs uppercase font-semibold text-purple-200">Kelvin</span>
          <div className="text-3xl font-extrabold font-mono mt-1">{k.toFixed(2)} K</div>
        </div>
      </div>
    </div>
  );
}

// 4. DATA STORAGE CONVERTER
export function DataStorageConverter() {
  const [val, setVal] = useState("1024");
  const [from, setFrom] = useState("MB");

  // In Bytes
  const units: Record<string, { name: string; bytes: number }> = {
    B: { name: "Bytes (B)", bytes: 1 },
    KB: { name: "Kilobytes (KB)", bytes: 1024 },
    MB: { name: "Megabytes (MB)", bytes: 1024 * 1024 },
    GB: { name: "Gigabytes (GB)", bytes: 1024 * 1024 * 1024 },
    TB: { name: "Terabytes (TB)", bytes: 1024 * 1024 * 1024 * 1024 },
    PB: { name: "Petabytes (PB)", bytes: 1024 * 1024 * 1024 * 1024 * 1024 },
  };

  const totalBytes = (parseFloat(val) || 0) * units[from].bytes;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Storage Size
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Unit
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
          >
            {Object.entries(units).map(([key, u]) => (
              <option key={key} value={key}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(units).map(([key, u]) => {
          const converted = totalBytes / u.bytes;
          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all ${
                key === from
                  ? "bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 font-bold"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <span className="text-[11px] text-slate-400 block">{u.name}</span>
              <div className="text-lg font-mono font-bold text-slate-900 dark:text-slate-100 mt-1 truncate">
                {formatNumber(converted, 4)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
