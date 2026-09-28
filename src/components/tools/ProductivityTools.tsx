"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Play, Pause, RotateCcw, Plus, Trash2, CheckCircle2, Circle, Flame } from "lucide-react";

// 1. POMODORO TIMER
export function PomodoroTimer() {
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const times = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  const switchMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setTimeLeft(times[newMode]);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            confetti({ particleCount: 50, spread: 60 });
            if (mode === "work") {
              setCompletedSessions((c) => c + 1);
              setMode("shortBreak");
              return times.shortBreak;
            } else {
              setMode("work");
              return times.work;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, mode, times.shortBreak, times.work]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      {/* Mode Buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => switchMode("work")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "work" ? "bg-rose-600 text-white shadow-md shadow-rose-500/20" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          Work (25m)
        </button>
        <button
          onClick={() => switchMode("shortBreak")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "shortBreak" ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => switchMode("longBreak")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "longBreak" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800"
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Clock Face */}
      <div className="p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <div className="font-mono text-6xl sm:text-8xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {timeFormatted}
        </div>
        <p className="text-xs uppercase font-bold text-slate-400 tracking-widest">
          {mode === "work" ? "Stay Focused" : "Rest & Recharge"}
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`py-3 px-8 rounded-2xl font-bold text-white flex items-center gap-2 shadow-lg transition-all ${
              isRunning ? "bg-amber-600 hover:bg-amber-700" : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isRunning ? "Pause" : "Start Focus"}</span>
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(times[mode]);
            }}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        Completed focus intervals today: <strong className="text-slate-800 dark:text-slate-200">{completedSessions} 🍅</strong>
      </div>
    </div>
  );
}

// 2. TO-DO LIST
export function ToDoList() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean; priority: "high" | "med" | "low" }[]>([
    { id: 1, text: "Finish semester project draft", completed: false, priority: "high" },
    { id: 2, text: "Compress website images to WebP", completed: true, priority: "med" },
    { id: 3, text: "Drink 2.5L water", completed: false, priority: "low" },
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"high" | "med" | "low">("med");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false, priority }]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          placeholder="What do you need to get done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "high" | "med" | "low")}
          className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
        >
          <option value="high">High Priority</option>
          <option value="med">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button
          type="submit"
          className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-1 shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
              task.completed
                ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleTask(task.id)} className="text-slate-400 hover:text-blue-600">
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span
                className={`text-sm font-medium ${
                  task.completed ? "line-through text-slate-400" : "text-slate-800 dark:text-slate-200"
                }`}
              >
                {task.text}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  task.priority === "high"
                    ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 border border-rose-200"
                    : task.priority === "med"
                    ? "bg-amber-100 dark:bg-amber-950/60 text-amber-600 border border-amber-200"
                    : "bg-blue-100 dark:bg-blue-950/60 text-blue-600 border border-blue-200"
                }`}
              >
                {task.priority}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-1 text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. 7-DAY HABIT TRACKER
export function HabitTracker() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Workout / 30 Min Walk", days: [true, true, true, false, true, false, true] },
    { id: 2, name: "Read 15 Pages", days: [true, true, false, true, true, true, true] },
    { id: 3, name: "Drink 2L Water", days: [true, true, true, true, true, false, true] },
  ]);
  const [newHabit, setNewHabit] = useState("");

  const daysLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (habitId: number, dayIdx: number) => {
    setHabits(
      habits.map((h) => {
        if (h.id === habitId) {
          const updated = [...h.days];
          updated[dayIdx] = !updated[dayIdx];
          return { ...h, days: updated };
        }
        return h;
      })
    );
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits([
      ...habits,
      { id: Date.now(), name: newHabit.trim(), days: [false, false, false, false, false, false, false] },
    ]);
    setNewHabit("");
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="New daily habit (e.g. Meditate 10 mins)..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
        />
        <button
          onClick={addHabit}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow"
        >
          Add Habit
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        {habits.map((h) => {
          const completedCount = h.days.filter(Boolean).length;
          return (
            <div key={h.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span>{h.name}</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> {completedCount}/7 Days
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {daysLabels.map((day, idx) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(h.id, idx)}
                    className={`py-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      h.days[idx]
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span className="text-[10px] opacity-75">{day}</span>
                    <span>{h.days[idx] ? "✓" : "•"}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
