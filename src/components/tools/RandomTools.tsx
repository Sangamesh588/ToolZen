"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

// 1. COIN TOSS
export function CoinToss() {
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);

  const flip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const isHeads = Math.random() < 0.5;
      const res = isHeads ? "Heads" : "Tails";
      setResult(res);
      if (isHeads) {
        setHeadsCount((c) => c + 1);
      } else {
        setTailsCount((c) => c + 1);
      }
      setIsFlipping(false);
    }, 600);
  };

  const total = headsCount + tailsCount;

  return (
    <div className="space-y-6 text-center">
      {/* 3D Coin Graphic */}
      <div className="py-6 flex justify-center">
        <div
          onClick={flip}
          className={`w-36 h-36 rounded-full border-4 border-amber-300 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-2xl flex items-center justify-center cursor-pointer select-none transition-transform duration-500 ${
            isFlipping ? "animate-spin scale-90" : "hover:scale-105"
          }`}
        >
          <span className="text-2xl font-black text-amber-950 font-serif tracking-wider">
            {isFlipping ? "?" : result || "FLIP"}
          </span>
        </div>
      </div>

      <button
        onClick={flip}
        disabled={isFlipping}
        className="py-3 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-base shadow-lg shadow-amber-500/20 disabled:opacity-50"
      >
        {isFlipping ? "Flipping..." : "Flip Coin"}
      </button>

      {/* Stats Tally */}
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block font-semibold">Heads</span>
          <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">{headsCount}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block font-semibold">Tails</span>
          <div className="text-2xl font-extrabold text-blue-600 font-mono mt-1">{tailsCount}</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 block font-semibold">Total Flips</span>
          <div className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 font-mono mt-1">{total}</div>
        </div>
      </div>
    </div>
  );
}

// 2. DICE ROLLER
export function DiceRoller() {
  const [diceCount, setDiceCount] = useState(2);
  const [diceValues, setDiceValues] = useState<number[]>([4, 6]);
  const [isRolling, setIsRolling] = useState(false);

  const roll = () => {
    setIsRolling(true);
    setTimeout(() => {
      const values = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1);
      setDiceValues(values);
      setIsRolling(false);
    }, 400);
  };

  const total = diceValues.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center items-center gap-3">
        <span className="text-xs font-semibold uppercase text-slate-500">Number of Dice:</span>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => {
                setDiceCount(num);
                setDiceValues(Array.from({ length: num }, () => Math.floor(Math.random() * 6) + 1));
              }}
              className={`w-9 h-9 rounded-xl text-xs font-bold ${
                diceCount === num
                  ? "bg-rose-600 text-white shadow-md shadow-rose-500/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Dice */}
      <div className="flex flex-wrap justify-center gap-4 py-4">
        {diceValues.map((val, idx) => (
          <div
            key={idx}
            className={`w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 shadow-xl flex items-center justify-center font-mono text-3xl font-black text-rose-600 dark:text-rose-400 transition-all ${
              isRolling ? "animate-bounce" : ""
            }`}
          >
            {val}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Total Sum: <span className="font-mono text-rose-600">{total}</span>
        </div>
        <button
          onClick={roll}
          disabled={isRolling}
          className="py-3 px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-lg shadow-rose-500/20"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </button>
      </div>
    </div>
  );
}

// 3. RANDOM NUMBER GENERATOR
export function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    if (min >= max) return;
    const range = max - min + 1;
    if (uniqueOnly && count > range) {
      alert("Count cannot be greater than range when unique numbers are selected.");
      return;
    }

    const res: number[] = [];
    if (uniqueOnly) {
      const set = new Set<number>();
      while (set.size < count) {
        const n = Math.floor(Math.random() * range) + min;
        set.add(n);
      }
      setNumbers(Array.from(set).sort((a, b) => a - b));
    } else {
      for (let i = 0; i < count; i++) {
        res.push(Math.floor(Math.random() * range) + min);
      }
      setNumbers(res);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Minimum Value
          </label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Maximum Value
          </label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="checkbox"
            checked={uniqueOnly}
            onChange={(e) => setUniqueOnly(e.target.checked)}
            className="w-4 h-4 rounded text-blue-600"
          />
          Generate Unique Numbers Only (No Duplicates)
        </label>
        <button
          onClick={generate}
          className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
        >
          Generate Random Numbers
        </button>
      </div>

      {numbers.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2.5 justify-center">
          {numbers.map((n, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 font-mono font-black text-xl shadow-sm"
            >
              {n}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// 4. RANDOM NAME PICKER & RAFFLE WHEEL
export function NamePicker() {
  const [names, setNames] = useState("Alex\nSophia\nDaniel\nEmma\nLiam\nOlivia\nNoah");
  const [winner, setWinner] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const draw = () => {
    const list = names
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (list.length === 0) return;
    setIsDrawing(true);

    let counter = 0;
    const interval = setInterval(() => {
      const tempPick = list[Math.floor(Math.random() * list.length)];
      setWinner(tempPick);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        const finalWinner = list[Math.floor(Math.random() * list.length)];
        setWinner(finalWinner);
        setIsDrawing(false);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }, 80);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Enter Names (One per line)
          </label>
          <textarea
            rows={8}
            value={names}
            onChange={(e) => setNames(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium text-sm"
          />
          <button
            onClick={draw}
            disabled={isDrawing}
            className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-extrabold text-base shadow-lg shadow-pink-500/20 disabled:opacity-50"
          >
            {isDrawing ? "Drawing Winner..." : "🎉 Draw Random Winner"}
          </button>
        </div>

        {/* Winner Display Card */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block">
            Raffle Winner
          </span>
          <div className="min-h-[100px] flex items-center justify-center">
            {winner ? (
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-in zoom-in-75">
                {winner}
              </div>
            ) : (
              <span className="text-slate-400 text-sm">Click Draw to pick a lucky winner</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. RANDOM TEAM GENERATOR
export function TeamGenerator() {
  const [names, setNames] = useState("Alex\nEmma\nNoah\nLiam\nSophia\nMia\nJames\nLucas");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const generateTeams = () => {
    const list = names
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    // Shuffle
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    const result: string[][] = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((person, idx) => {
      result[idx % teamCount].push(person);
    });

    setTeams(result);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Roster Names (One per line)
          </label>
          <textarea
            rows={6}
            value={names}
            onChange={(e) => setNames(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-medium text-sm"
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Number of Teams
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={teamCount}
              onChange={(e) => setTeamCount(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
            />
          </div>
          <button
            onClick={generateTeams}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md shadow-blue-500/20"
          >
            Generate Teams
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {teams.map((team, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 text-sm font-bold text-blue-600 dark:text-blue-400">
                <span>Team {idx + 1}</span>
                <span className="text-xs text-slate-400 font-normal">({team.length} members)</span>
              </div>
              <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                {team.map((member, mIdx) => (
                  <li key={mIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
