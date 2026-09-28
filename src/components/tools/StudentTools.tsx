"use client";

import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

// 1. CGPA CALCULATOR
export function CgpaCalculator() {
  const [scale, setScale] = useState<10 | 4 | 5>(10);
  const [semesters, setSemesters] = useState([
    { id: 1, gpa: "8.5", credits: "20" },
    { id: 2, gpa: "8.8", credits: "22" },
    { id: 3, gpa: "9.1", credits: "21" },
  ]);

  const addSemester = () => {
    setSemesters((prev) => [
      ...prev,
      { id: Date.now(), gpa: "", credits: "20" },
    ]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length <= 1) return;
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSemester = (id: number, field: "gpa" | "credits", val: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  // Calculations
  let totalGradePoints = 0;
  let totalCredits = 0;

  semesters.forEach((s) => {
    const g = parseFloat(s.gpa) || 0;
    const c = parseFloat(s.credits) || 0;
    totalGradePoints += g * c;
    totalCredits += c;
  });

  const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00";
  const numCgpa = parseFloat(cgpa);
  const percentage = (numCgpa * (scale === 10 ? 9.5 : 25)).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Scale Selector */}
      <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Grading Scale
          </span>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Select your university grade system
          </p>
        </div>
        <div className="flex gap-2">
          {([10, 4, 5] as const).map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                scale === s
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {s}.0 Scale
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Semester Rows */}
      <div className="space-y-3">
        <div className="grid grid-cols-12 gap-3 text-xs font-bold uppercase text-slate-400 px-2">
          <span className="col-span-5 sm:col-span-6">Semester / Course</span>
          <span className="col-span-3">GPA (Max {scale})</span>
          <span className="col-span-3">Credits</span>
          <span className="col-span-1 text-center">Del</span>
        </div>

        {semesters.map((sem, index) => (
          <div
            key={sem.id}
            className="grid grid-cols-12 gap-3 items-center p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="col-span-5 sm:col-span-6 font-medium text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
              <span>Semester {index + 1}</span>
            </div>
            <div className="col-span-3">
              <input
                type="number"
                step="0.01"
                min="0"
                max={scale}
                value={sem.gpa}
                placeholder="0.00"
                onChange={(e) => updateSemester(sem.id, "gpa", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                min="1"
                max="50"
                value={sem.credits}
                placeholder="Credits"
                onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1 text-center">
              <button
                onClick={() => removeSemester(sem.id)}
                disabled={semesters.length <= 1}
                className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addSemester}
          className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Another Semester
        </button>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/10">
          <span className="text-xs uppercase font-semibold text-blue-100 tracking-wider">
            Cumulative GPA
          </span>
          <div className="text-4xl font-extrabold mt-1">{cgpa}</div>
          <p className="text-xs text-blue-100/80 mt-1">out of {scale}.0 Scale</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Equivalent Percentage
          </span>
          <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {percentage}%
          </div>
          <p className="text-xs text-slate-500 mt-1">Standard conversion</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Total Credits
          </span>
          <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {totalCredits}
          </div>
          <p className="text-xs text-slate-500 mt-1">Earned credit units</p>
        </div>
      </div>
    </div>
  );
}

// 2. PERCENTAGE CALCULATOR
export function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [x1, setX1] = useState("15");
  const [y1, setY1] = useState("250");

  // Mode 2: X is what % of Y?
  const [x2, setX2] = useState("45");
  const [y2, setY2] = useState("180");

  // Mode 3: Percentage Change from X to Y
  const [x3, setX3] = useState("80");
  const [y3, setY3] = useState("120");

  const res1 = ((parseFloat(x1) || 0) / 100) * (parseFloat(y1) || 0);
  const res2 = (parseFloat(y2) || 0) > 0 ? (((parseFloat(x2) || 0) / parseFloat(y2)) * 100).toFixed(2) : "0";
  const numX3 = parseFloat(x3) || 0;
  const numY3 = parseFloat(y3) || 0;
  const changeVal = numX3 > 0 ? (((numY3 - numX3) / numX3) * 100).toFixed(2) : "0";
  const isIncrease = parseFloat(changeVal) >= 0;

  return (
    <div className="space-y-6">
      {/* Case 1 */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
          1. What is <span className="text-blue-600 font-mono">X%</span> of <span className="text-blue-600 font-mono">Y</span>?
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500">What is</span>
          <input
            type="number"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">% of</span>
          <input
            type="number"
            value={y1}
            onChange={(e) => setY1(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">=</span>
          <span className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-mono font-bold text-sm shadow-sm">
            {res1.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Case 2 */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
          2. <span className="text-blue-600 font-mono">X</span> is what percentage of <span className="text-blue-600 font-mono">Y</span>?
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={x2}
            onChange={(e) => setX2(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">is what % of</span>
          <input
            type="number"
            value={y2}
            onChange={(e) => setY2(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">=</span>
          <span className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm shadow-sm">
            {res2}%
          </span>
        </div>
      </div>

      {/* Case 3 */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
          3. Percentage Increase / Decrease from <span className="text-blue-600 font-mono">X</span> to <span className="text-blue-600 font-mono">Y</span>
        </h4>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500">From</span>
          <input
            type="number"
            value={x3}
            onChange={(e) => setX3(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">to</span>
          <input
            type="number"
            value={y3}
            onChange={(e) => setY3(e.target.value)}
            className="w-28 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
          <span className="text-sm font-medium text-slate-500">=</span>
          <span
            className={`px-4 py-1.5 rounded-lg font-mono font-bold text-sm shadow-sm ${
              isIncrease ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}
          >
            {isIncrease ? `+${changeVal}% Increase` : `${changeVal}% Decrease`}
          </span>
        </div>
      </div>
    </div>
  );
}

// 3. ATTENDANCE CALCULATOR
export function AttendanceCalculator() {
  const [attended, setAttended] = useState("32");
  const [total, setTotal] = useState("40");
  const [target, setTarget] = useState("75");

  const a = parseInt(attended) || 0;
  const t = parseInt(total) || 0;
  const req = parseFloat(target) || 75;

  const currentPercent = t > 0 ? ((a / t) * 100).toFixed(1) : "0.0";
  const numCurrent = parseFloat(currentPercent);

  // How many more classes to attend or can miss
  let message = "";
  let badgeType: "success" | "danger" | "neutral" = "neutral";

  if (t === 0) {
    message = "Enter valid classes to calculate status.";
  } else if (numCurrent >= req) {
    // You can bunk
    // (a) / (t + x) >= req / 100
    // a * 100 >= req * (t + x)
    // (a * 100 / req) - t >= x
    const canBunk = Math.floor((a * 100) / req - t);
    badgeType = "success";
    message =
      canBunk > 0
        ? `You can safely miss the next ${canBunk} class(es) while maintaining at least ${req}% attendance!`
        : `Your attendance is exactly on track! Do not miss any upcoming classes.`;
  } else {
    // Must attend
    // (a + x) / (t + x) >= req / 100
    // 100a + 100x >= req*t + req*x
    // x * (100 - req) >= req*t - 100a
    const mustAttend = Math.ceil((req * t - 100 * a) / (100 - req));
    badgeType = "danger";
    message = `You are falling short! You must attend the next ${mustAttend} consecutive class(es) to reach ${req}% attendance.`;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Classes Attended
          </label>
          <input
            type="number"
            min="0"
            value={attended}
            onChange={(e) => setAttended(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Total Classes Conducted
          </label>
          <input
            type="number"
            min="1"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Target Attendance %
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
          />
        </div>
      </div>

      {/* Progress Bar & Status */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
            Current Attendance Level
          </span>
          <span
            className={`font-mono font-extrabold text-2xl ${
              numCurrent >= req ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {currentPercent}%
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              numCurrent >= req ? "bg-emerald-500" : "bg-rose-500"
            }`}
            style={{ width: `${Math.min(100, numCurrent)}%` }}
          />
        </div>

        {/* Actionable Advice */}
        <div
          className={`p-4 rounded-xl text-sm font-medium ${
            badgeType === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50"
              : badgeType === "danger"
              ? "bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50"
              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
}

// 4. GRADE CALCULATOR
export function GradeCalculator() {
  const [items, setItems] = useState([
    { id: 1, name: "Homework & Labs", weight: "20", score: "92" },
    { id: 2, name: "Midterm Exam", weight: "30", score: "84" },
    { id: 3, name: "Final Exam", weight: "50", score: "" },
  ]);
  const [targetGrade, setTargetGrade] = useState("85");

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: `Assignment ${prev.length + 1}`, weight: "10", score: "" },
    ]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Calculations
  let scoredWeight = 0;
  let gradedWeightTotal = 0;
  let remainingWeightTotal = 0;

  items.forEach((it) => {
    const w = parseFloat(it.weight) || 0;
    const s = parseFloat(it.score);
    if (!isNaN(s)) {
      scoredWeight += (s * w) / 100;
      gradedWeightTotal += w;
    } else {
      remainingWeightTotal += w;
    }
  });

  const currentGrade = gradedWeightTotal > 0 ? ((scoredWeight / gradedWeightTotal) * 100).toFixed(1) : "0.0";
  const target = parseFloat(targetGrade) || 85;

  // Needed on remaining:
  // (scoredWeight + (needed * remainingWeightTotal)/100) / 100 = target / 100
  // scoredWeight + (needed * remainingWeightTotal)/100 = target
  // needed * remainingWeightTotal / 100 = target - scoredWeight
  // needed = (target - scoredWeight) * 100 / remainingWeightTotal
  const neededScore =
    remainingWeightTotal > 0
      ? (((target - scoredWeight) * 100) / remainingWeightTotal).toFixed(1)
      : "N/A";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map((it) => (
          <div
            key={it.id}
            className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <input
              type="text"
              value={it.name}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((i) => (i.id === it.id ? { ...i, name: e.target.value } : i))
                )
              }
              className="col-span-5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium"
            />
            <div className="col-span-3">
              <input
                type="number"
                placeholder="Weight %"
                value={it.weight}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((i) => (i.id === it.id ? { ...i, weight: e.target.value } : i))
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono"
              />
            </div>
            <div className="col-span-3">
              <input
                type="number"
                placeholder="Score %"
                value={it.score}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((i) => (i.id === it.id ? { ...i, score: e.target.value } : i))
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono"
              />
            </div>
            <div className="col-span-1 text-center">
              <button
                onClick={() => removeItem(it.id)}
                className="p-1 text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="w-full py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold"
        >
          + Add Assignment
        </button>
      </div>

      {/* Target input */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase">Target Course Grade</span>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            What final percentage are you aiming for?
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={targetGrade}
            onChange={(e) => setTargetGrade(e.target.value)}
            className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono font-bold text-sm"
          />
          <span className="text-sm font-bold">%</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-blue-600 text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
            Current Average So Far
          </span>
          <div className="text-3xl font-extrabold mt-1">{currentGrade}%</div>
          <p className="text-xs text-blue-100/80 mt-1">Based on graded assignments</p>
        </div>
        <div className="p-5 rounded-2xl bg-indigo-600 text-white">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
            Score Needed on Remaining Work
          </span>
          <div className="text-3xl font-extrabold mt-1">{neededScore}%</div>
          <p className="text-xs text-indigo-100/80 mt-1">To reach target of {targetGrade}%</p>
        </div>
      </div>
    </div>
  );
}

// 5. SEMESTER GPA CALCULATOR
export function SemesterGpaCalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", credits: "4", gradePoint: "10" },
    { id: 2, name: "Data Structures", credits: "4", gradePoint: "9" },
    { id: 3, name: "Digital Logic", credits: "3", gradePoint: "8" },
    { id: 4, name: "Physics Lab", credits: "2", gradePoint: "10" },
  ]);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), name: `Course ${prev.length + 1}`, credits: "3", gradePoint: "9" },
    ]);
  };

  const removeCourse = (id: number) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  let totalPts = 0;
  let totalCred = 0;

  courses.forEach((c) => {
    const cr = parseFloat(c.credits) || 0;
    const gp = parseFloat(c.gradePoint) || 0;
    totalPts += cr * gp;
    totalCred += cr;
  });

  const sgpa = totalCred > 0 ? (totalPts / totalCred).toFixed(2) : "0.00";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <input
              type="text"
              value={course.name}
              onChange={(e) =>
                setCourses((prev) =>
                  prev.map((c) => (c.id === course.id ? { ...c, name: e.target.value } : c))
                )
              }
              className="col-span-5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium"
            />
            <div className="col-span-3">
              <input
                type="number"
                placeholder="Credits"
                value={course.credits}
                onChange={(e) =>
                  setCourses((prev) =>
                    prev.map((c) => (c.id === course.id ? { ...c, credits: e.target.value } : c))
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-mono"
              />
            </div>
            <div className="col-span-3">
              <select
                value={course.gradePoint}
                onChange={(e) =>
                  setCourses((prev) =>
                    prev.map((c) => (c.id === course.id ? { ...c, gradePoint: e.target.value } : c))
                  )
                }
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium"
              >
                <option value="10">O / A+ (10)</option>
                <option value="9">A (9)</option>
                <option value="8">B+ (8)</option>
                <option value="7">B (7)</option>
                <option value="6">C (6)</option>
                <option value="5">P / Pass (5)</option>
                <option value="0">F / Fail (0)</option>
              </select>
            </div>
            <div className="col-span-1 text-center">
              <button
                onClick={() => removeCourse(course.id)}
                className="p-1 text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addCourse}
          className="w-full py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-blue-600 dark:text-blue-400 text-xs font-bold"
        >
          + Add Course
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-semibold text-blue-200">Semester GPA (SGPA)</span>
          <div className="text-4xl font-extrabold mt-1">{sgpa}</div>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-semibold text-blue-200">Total Credits</span>
          <div className="text-2xl font-bold mt-1">{totalCred}</div>
        </div>
      </div>
    </div>
  );
}
