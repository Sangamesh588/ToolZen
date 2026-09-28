"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

// 1. AGE CALCULATOR
export function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-15");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  const birth = new Date(dob);
  const target = new Date(targetDate);

  let years = 0;
  let months = 0;
  let days = 0;
  let totalDays = 0;
  let nextBdayDays = 0;

  if (!isNaN(birth.getTime()) && !isNaN(target.getTime()) && target >= birth) {
    const diffTime = target.getTime() - birth.getTime();
    totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    years = target.getFullYear() - birth.getFullYear();
    months = target.getMonth() - birth.getMonth();
    days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Next birthday calculation
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }
    nextBdayDays = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
  }

  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = totalDays * 24;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Age At Date Of
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
      </div>

      {/* Main Age Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/10">
        <span className="text-xs uppercase font-semibold text-blue-200 tracking-wider">
          Exact Age
        </span>
        <div className="text-3xl sm:text-4xl font-extrabold mt-1">
          {years} <span className="text-lg font-normal">Years,</span> {months}{" "}
          <span className="text-lg font-normal">Months,</span> {days}{" "}
          <span className="text-lg font-normal">Days</span>
        </div>
        <p className="text-xs text-blue-100/80 mt-2">
          🎉 Next birthday in <strong className="text-white">{nextBdayDays} days</strong>!
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-400">Total Days</span>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
            {totalDays.toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-400">Total Weeks</span>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
            {totalWeeks.toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-400">Total Hours</span>
          <div className="text-xl font-bold font-mono text-slate-800 dark:text-slate-200 mt-1">
            {totalHours.toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-400">Next Birthday</span>
          <div className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">
            {nextBdayDays}d
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. DATE DIFFERENCE CALCULATOR
export function DateDifferenceCalculator() {
  const [start, setStart] = useState("2026-01-01");
  const [end, setEnd] = useState("2026-12-31");

  const d1 = new Date(start);
  const d2 = new Date(end);

  let totalDays = 0;
  let businessDays = 0;

  if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
    const diff = Math.abs(d2.getTime() - d1.getTime());
    totalDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    // Calculate business days
    const cur = new Date(Math.min(d1.getTime(), d2.getTime()));
    const final = new Date(Math.max(d1.getTime(), d2.getTime()));
    while (cur < final) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) businessDays++;
      cur.setDate(cur.getDate() + 1);
    }
  }

  const weeks = (totalDays / 7).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Start Date
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            End Date
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-blue-600 text-white">
          <span className="text-xs uppercase font-semibold text-blue-200">Total Calendar Days</span>
          <div className="text-4xl font-extrabold mt-1">{totalDays}</div>
          <p className="text-xs text-blue-100/80 mt-1">~{weeks} weeks</p>
        </div>
        <div className="p-6 rounded-2xl bg-emerald-600 text-white">
          <span className="text-xs uppercase font-semibold text-emerald-200">Working Business Days</span>
          <div className="text-4xl font-extrabold mt-1">{businessDays}</div>
          <p className="text-xs text-emerald-100/80 mt-1">Excludes weekends</p>
        </div>
        <div className="p-6 rounded-2xl bg-purple-600 text-white">
          <span className="text-xs uppercase font-semibold text-purple-200">Weekend Days</span>
          <div className="text-4xl font-extrabold mt-1">{totalDays - businessDays}</div>
          <p className="text-xs text-purple-100/80 mt-1">Saturdays & Sundays</p>
        </div>
      </div>
    </div>
  );
}

// 3. COUNTDOWN TIMER
export function CountdownTimer() {
  const [target, setTarget] = useState("2027-01-01T00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = new Date(target).getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setIsFinished(false);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  const celebrate = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Select Target Date & Time
        </label>
        <input
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 font-mono">
            {timeLeft.days}
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 mt-2 block">Days</span>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-4xl sm:text-5xl font-extrabold text-indigo-600 font-mono">
            {timeLeft.hours}
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 mt-2 block">Hours</span>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-4xl sm:text-5xl font-extrabold text-purple-600 font-mono">
            {timeLeft.minutes}
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 mt-2 block">Minutes</span>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-4xl sm:text-5xl font-extrabold text-rose-600 font-mono">
            {timeLeft.seconds}
          </div>
          <span className="text-xs uppercase font-bold text-slate-400 mt-2 block">Seconds</span>
        </div>
      </div>

      {isFinished && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
          <span className="text-emerald-700 dark:text-emerald-300 font-bold text-lg">
            🎉 The countdown has ended!
          </span>
          <button
            onClick={celebrate}
            className="ml-3 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold"
          >
            Trigger Confetti
          </button>
        </div>
      )}
    </div>
  );
}

// 4. ONLINE STOPWATCH
export function OnlineStopwatch() {
  const [timeMs, setTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeMs((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const format = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  const addLap = () => {
    if (timeMs > 0) {
      setLaps((prev) => [timeMs, ...prev]);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTimeMs(0);
    setLaps([]);
  };

  return (
    <div className="space-y-6">
      {/* Big Digits Display */}
      <div className="p-10 rounded-3xl bg-slate-900 text-white text-center shadow-2xl">
        <div className="font-mono text-5xl sm:text-7xl font-extrabold tracking-wider">
          {format(timeMs)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`py-3 px-8 rounded-2xl font-bold text-white flex items-center gap-2 shadow-lg transition-all ${
            isRunning
              ? "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
          }`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isRunning ? "Pause" : "Start"}</span>
        </button>

        <button
          onClick={addLap}
          disabled={!isRunning}
          className="py-3 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2 disabled:opacity-40"
        >
          <Flag className="w-4 h-4" /> Lap
        </button>

        <button
          onClick={reset}
          className="py-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Laps Record */}
      {laps.length > 0 && (
        <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          {laps.map((lap, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 text-sm font-mono px-4 hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              <span className="text-slate-400 font-medium">Lap {laps.length - idx}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{format(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
