"use client";

import React, { useState } from "react";

// 1. BMI CALCULATOR
export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("70");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("9");
  const [weightLbs, setWeightLbs] = useState("154");

  let bmi = 0;
  let minIdeal = 0;
  let maxIdeal = 0;

  if (unit === "metric") {
    const h = (parseFloat(heightCm) || 0) / 100;
    const w = parseFloat(weightKg) || 0;
    if (h > 0 && w > 0) {
      bmi = w / (h * h);
      minIdeal = 18.5 * h * h;
      maxIdeal = 24.9 * h * h;
    }
  } else {
    const totalInches = (parseFloat(feet) || 0) * 12 + (parseFloat(inches) || 0);
    const w = parseFloat(weightLbs) || 0;
    if (totalInches > 0 && w > 0) {
      bmi = (w / (totalInches * totalInches)) * 703;
      minIdeal = (18.5 * totalInches * totalInches) / 703;
      maxIdeal = (24.9 * totalInches * totalInches) / 703;
    }
  }

  const bmiFormatted = bmi > 0 ? bmi.toFixed(1) : "0.0";
  const numBmi = parseFloat(bmiFormatted);

  let category = "Normal weight";
  let badgeColor = "bg-emerald-500 text-white";

  if (numBmi < 18.5) {
    category = "Underweight";
    badgeColor = "bg-blue-500 text-white";
  } else if (numBmi <= 24.9) {
    category = "Normal healthy weight";
    badgeColor = "bg-emerald-500 text-white";
  } else if (numBmi <= 29.9) {
    category = "Overweight";
    badgeColor = "bg-amber-500 text-white";
  } else {
    category = "Obesity";
    badgeColor = "bg-rose-500 text-white";
  }

  return (
    <div className="space-y-6">
      {/* Unit switch */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
          <button
            onClick={() => setUnit("metric")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              unit === "metric"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => setUnit("imperial")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              unit === "imperial"
                ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            Imperial (ft/in, lbs)
          </button>
        </div>
      </div>

      {/* Inputs */}
      {unit === "metric" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Height (cm)
            </label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Feet
            </label>
            <input
              type="number"
              value={feet}
              onChange={(e) => setFeet(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Inches
            </label>
            <input
              type="number"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Weight (lbs)
            </label>
            <input
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-base"
            />
          </div>
        </div>
      )}

      {/* Result Display */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Your BMI Score
            </span>
            <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {bmiFormatted} <span className="text-sm font-normal text-slate-400">kg/m²</span>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full font-bold text-sm shadow-sm ${badgeColor}`}>
            {category}
          </span>
        </div>

        {/* Visual BMI Range Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="h-3 w-full rounded-full flex overflow-hidden">
            <div className="w-[18.5%] bg-blue-400" title="Underweight (<18.5)" />
            <div className="w-[25%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
            <div className="w-[20%] bg-amber-400" title="Overweight (25 - 29.9)" />
            <div className="w-[36.5%] bg-rose-500" title="Obese (30+)" />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>&lt;18.5</span>
            <span>18.5 - 24.9</span>
            <span>25.0 - 29.9</span>
            <span>30.0+</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300">
          Healthy weight range for your height:{" "}
          <strong className="text-slate-900 dark:text-slate-100 font-mono">
            {minIdeal.toFixed(1)} – {maxIdeal.toFixed(1)} {unit === "metric" ? "kg" : "lbs"}
          </strong>
        </div>
      </div>
    </div>
  );
}

// 2. CALORIE & TDEE CALCULATOR
export function CalorieCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("25");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("1.375");

  const a = parseFloat(age) || 25;
  const h = parseFloat(height) || 175;
  const w = parseFloat(weight) || 70;
  const act = parseFloat(activity) || 1.375;

  // Mifflin-St Jeor formula
  const bmr =
    gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

  const tdee = Math.round(bmr * act);
  const weightLoss = Math.round(tdee - 500);
  const muscleGain = Math.round(tdee + 300);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Activity Level
        </label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
        >
          <option value="1.2">Sedentary (Little or no exercise, desk job)</option>
          <option value="1.375">Light Exercise (1-3 days/week)</option>
          <option value="1.55">Moderate Exercise (3-5 days/week)</option>
          <option value="1.725">Heavy Exercise (6-7 days/week intense)</option>
          <option value="1.9">Athlete / Physical Job (2x per day)</option>
        </select>
      </div>

      {/* Target breakdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-blue-600 text-white">
          <span className="text-xs uppercase font-semibold text-blue-200">
            Maintain Weight (TDEE)
          </span>
          <div className="text-3xl font-extrabold mt-1">{tdee}</div>
          <p className="text-xs text-blue-100/80 mt-1">Calories / day</p>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-600 text-white">
          <span className="text-xs uppercase font-semibold text-emerald-200">
            Fat Loss (-0.5 kg/wk)
          </span>
          <div className="text-3xl font-extrabold mt-1">{weightLoss}</div>
          <p className="text-xs text-emerald-100/80 mt-1">-500 Calorie deficit</p>
        </div>
        <div className="p-5 rounded-2xl bg-purple-600 text-white">
          <span className="text-xs uppercase font-semibold text-purple-200">
            Muscle Gain / Bulking
          </span>
          <div className="text-3xl font-extrabold mt-1">{muscleGain}</div>
          <p className="text-xs text-purple-100/80 mt-1">+300 Calorie surplus</p>
        </div>
      </div>
    </div>
  );
}

// 3. WATER INTAKE CALCULATOR
export function WaterIntakeCalculator() {
  const [weightKg, setWeightKg] = useState("70");
  const [workoutMin, setWorkoutMin] = useState("45");
  const [climate, setClimate] = useState<"temperate" | "hot">("temperate");

  const w = parseFloat(weightKg) || 70;
  const workout = parseFloat(workoutMin) || 0;

  // Base: 35ml per kg of bodyweight + 350ml per 30 mins workout + 400ml if hot climate
  const baseLiters = (w * 0.035);
  const workoutLiters = (workout / 30) * 0.35;
  const climateLiters = climate === "hot" ? 0.4 : 0;
  const totalLiters = (baseLiters + workoutLiters + climateLiters).toFixed(2);
  const glasses = Math.round((parseFloat(totalLiters) * 1000) / 250);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Body Weight (kg)
          </label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Daily Workout (minutes)
          </label>
          <input
            type="number"
            value={workoutMin}
            onChange={(e) => setWorkoutMin(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Climate / Weather
          </label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as "temperate" | "hot")}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
          >
            <option value="temperate">Moderate / Normal</option>
            <option value="hot">Hot / Humid climate</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex items-center justify-between flex-wrap gap-4 shadow-lg shadow-cyan-500/10">
        <div>
          <span className="text-xs uppercase font-semibold text-cyan-100">
            Recommended Daily Hydration
          </span>
          <div className="text-4xl font-extrabold mt-1">
            {totalLiters} <span className="text-xl font-normal">Liters / day</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-semibold text-cyan-100">In 250ml Glasses</span>
          <div className="text-3xl font-extrabold mt-1">~{glasses} Glasses</div>
        </div>
      </div>
    </div>
  );
}

// 4. IDEAL WEIGHT CALCULATOR
export function IdealWeightCalculator() {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightCm, setHeightCm] = useState("175");

  const cm = parseFloat(heightCm) || 175;
  const inchesOver5Ft = Math.max(0, (cm / 2.54) - 60);

  // Devine formula
  const devine =
    gender === "male"
      ? 50.0 + 2.3 * inchesOver5Ft
      : 45.5 + 2.3 * inchesOver5Ft;

  // Robinson formula
  const robinson =
    gender === "male"
      ? 52.0 + 1.9 * inchesOver5Ft
      : 49.0 + 1.7 * inchesOver5Ft;

  // Miller formula
  const miller =
    gender === "male"
      ? 56.2 + 1.41 * inchesOver5Ft
      : 53.1 + 1.36 * inchesOver5Ft;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Height (cm)
          </label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Devine Formula
          </span>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
            {devine.toFixed(1)} kg
          </div>
          <p className="text-xs text-slate-500 mt-1">Clinical Gold Standard</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Robinson Formula
          </span>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
            {robinson.toFixed(1)} kg
          </div>
          <p className="text-xs text-slate-500 mt-1">Empirical standard</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Miller Formula
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
            {miller.toFixed(1)} kg
          </div>
          <p className="text-xs text-slate-500 mt-1">Adjusted curve</p>
        </div>
      </div>
    </div>
  );
}

// 5. WALKING CALORIES BURNED
export function WalkingCaloriesCalculator() {
  const [weightKg, setWeightKg] = useState("70");
  const [durationMin, setDurationMin] = useState("60");
  const [pace, setPace] = useState("3.5"); // MET value

  const w = parseFloat(weightKg) || 70;
  const d = parseFloat(durationMin) || 60;
  const met = parseFloat(pace) || 3.5;

  // Formula: Calories = (MET × 3.5 × weight_kg / 200) × minutes
  const caloriesBurned = Math.round(((met * 3.5 * w) / 200) * d);
  const approxSteps = Math.round((d / 60) * 6000);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Walking Pace
          </label>
          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
          >
            <option value="2.8">Casual Stroll (2.5 mph / 4 km/h)</option>
            <option value="3.5">Moderate Pace (3.0 mph / 4.8 km/h)</option>
            <option value="4.3">Brisk Walk (3.5 mph / 5.6 km/h)</option>
            <option value="5.0">Fast Power Walk (4.0+ mph / 6.4 km/h)</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between flex-wrap gap-4 shadow-lg shadow-emerald-500/10">
        <div>
          <span className="text-xs uppercase font-semibold text-emerald-100">
            Total Calories Burned
          </span>
          <div className="text-4xl font-extrabold mt-1">
            {caloriesBurned} <span className="text-xl font-normal">kcal</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-semibold text-emerald-100">
            Estimated Step Count
          </span>
          <div className="text-3xl font-extrabold mt-1">~{approxSteps.toLocaleString()} Steps</div>
        </div>
      </div>
    </div>
  );
}
