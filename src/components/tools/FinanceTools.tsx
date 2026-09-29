"use client";

import React, { useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { ArrowRightLeft } from "lucide-react";

// 1. EMI CALCULATOR
export function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(15);

  const P = loanAmount;
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayment = emi * n;
    totalInterest = totalPayment - P;
  }

  const principalRatio = totalPayment > 0 ? (P / totalPayment) * 100 : 50;
  const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 50;

  return (
    <div className="space-y-6">
      {/* Sliders & Inputs */}
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Loan Amount</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Interest Rate (% per annum)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Loan Tenure (Years)</span>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
              {tenureYears} Years ({tenureYears * 12} Mos)
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>
      </div>

      {/* Primary Result Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/10">
        <span className="text-xs uppercase font-semibold text-blue-200 tracking-wider">
          Monthly EMI Repayment
        </span>
        <div className="text-4xl font-extrabold mt-1">
          {formatCurrency(emi)} <span className="text-sm font-normal text-blue-100">/ month</span>
        </div>
      </div>

      {/* Breakdown Cards & Proportion Bar */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Principal ({principalRatio.toFixed(0)}%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Total Interest ({interestRatio.toFixed(0)}%)
            </span>
          </div>
          <div className="h-3 w-full rounded-full flex overflow-hidden bg-slate-200 dark:bg-slate-800">
            <div style={{ width: `${principalRatio}%` }} className="bg-blue-600 h-full" />
            <div style={{ width: `${interestRatio}%` }} className="bg-amber-500 h-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <span className="text-xs text-slate-400 block">Total Interest Payable</span>
            <span className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
              {formatCurrency(totalInterest)}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Total Repayment (P + I)</span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100">
              {formatCurrency(totalPayment)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. SIP CALCULATOR
export function SipCalculator() {
  const [monthlyInvest, setMonthlyInvest] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [tenureYears, setTenureYears] = useState(10);

  const P = monthlyInvest;
  const i = expectedReturn / 12 / 100;
  const n = tenureYears * 12;

  // Formula: M = P × [((1 + i)^n - 1) / i] × (1 + i)
  const maturityCorpus = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const investedAmount = P * n;
  const wealthGained = maturityCorpus - investedAmount;

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Monthly SIP Investment</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {formatCurrency(monthlyInvest)}
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="100000"
            step="500"
            value={monthlyInvest}
            onChange={(e) => setMonthlyInvest(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Expected Annual Return (% CAGR)</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {expectedReturn}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
            <span>Time Horizon (Years)</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {tenureYears} Years
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-500/10">
        <span className="text-xs uppercase font-semibold text-emerald-200 tracking-wider">
          Expected Total Maturity Corpus
        </span>
        <div className="text-4xl font-extrabold mt-1">
          {formatCurrency(maturityCorpus)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Invested Amount</span>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {formatCurrency(investedAmount)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Over {tenureYears} years ({n} months)</p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-semibold">Estimated Wealth Gain</span>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            +{formatCurrency(wealthGained)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Compounded wealth generation</p>
        </div>
      </div>
    </div>
  );
}

// 3. COMPOUND INTEREST CALCULATOR
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(50000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [frequency, setFrequency] = useState(12); // 1 = yearly, 4 = quarterly, 12 = monthly, 365 = daily

  const P = principal;
  const r = rate / 100;
  const n = frequency;
  const t = years;

  // A = P(1 + r/n)^(nt)
  const finalAmount = P * Math.pow(1 + r / n, n * t);
  const interestEarned = finalAmount - P;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Initial Principal (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Compound Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium"
          >
            <option value="1">Annually (1x/year)</option>
            <option value="4">Quarterly (4x/year)</option>
            <option value="12">Monthly (12x/year)</option>
            <option value="365">Daily (365x/year)</option>
          </select>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <span>Investment Duration: {years} Years</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <span className="text-xs uppercase font-semibold text-blue-200">Final Balance</span>
          <div className="text-3xl font-extrabold mt-1">{formatCurrency(finalAmount)}</div>
          <p className="text-xs text-blue-100/80 mt-1">Principal + Total Interest</p>
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <span className="text-xs uppercase font-semibold text-amber-200">Total Interest Earned</span>
          <div className="text-3xl font-extrabold mt-1">+{formatCurrency(interestEarned)}</div>
          <p className="text-xs text-amber-100/80 mt-1">Net compounded interest</p>
        </div>
      </div>
    </div>
  );
}

// 4. SAVINGS GOAL CALCULATOR
export function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(500000);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthsToSave, setMonthsToSave] = useState(24);

  const needed = Math.max(0, targetAmount - currentSavings);
  const monthlyDeposit = monthsToSave > 0 ? needed / monthsToSave : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Target Goal (₹)
          </label>
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Current Savings (₹)
          </label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Time to Reach (Months)
          </label>
          <input
            type="number"
            value={monthsToSave}
            onChange={(e) => setMonthsToSave(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between flex-wrap gap-4 shadow-xl shadow-indigo-500/10">
        <div>
          <span className="text-xs uppercase font-semibold text-indigo-200">
            Required Monthly Deposit
          </span>
          <div className="text-4xl font-extrabold mt-1">
            {formatCurrency(monthlyDeposit)} <span className="text-base font-normal">/ month</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs uppercase font-semibold text-indigo-200">Remaining to Save</span>
          <div className="text-2xl font-bold font-mono mt-1">{formatCurrency(needed)}</div>
        </div>
      </div>
    </div>
  );
}

// 5. CURRENCY CONVERTER
export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  // Relative to USD base
  const rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.45,
    JPY: 154.2,
    CAD: 1.36,
    AUD: 1.52,
    CHF: 0.91,
    CNY: 7.24,
    SGD: 1.35,
  };

  const usdValue = amount / (rates[from] || 1);
  const converted = usdValue * (rates[to] || 1);
  const rateRatio = (rates[to] || 1) / (rates[from] || 1);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-base"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            From
          </label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-center pb-2">
          <button
            onClick={swap}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Swap Currencies"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            To
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold"
          >
            {Object.keys(rates).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-xs uppercase font-semibold text-slate-400">Converted Value</span>
          <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1">
            {formatNumber(converted, 2)} {to}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            1 {from} = {formatNumber(rateRatio, 4)} {to}
          </p>
        </div>
        <div className="text-xs text-slate-400 text-right">
          Mid-market FX benchmark
        </div>
      </div>
    </div>
  );
}
