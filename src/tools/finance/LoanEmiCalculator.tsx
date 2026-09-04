import React, { useState, useMemo } from 'react';
import { DollarSign, PieChart, Calendar, TrendingUp } from 'lucide-react';

export const LoanEmiCalculator: React.FC = () => {
  const [currency, setCurrency] = useState('AED');
  const [principal, setPrincipal] = useState(250000);
  const [annualRate, setAnnualRate] = useState(4.75);
  const [tenureYears, setTenureYears] = useState(5);

  const calculations = useMemo(() => {
    const p = Math.max(0, principal);
    const r = annualRate / 12 / 100;
    const n = Math.max(1, tenureYears * 12);

    let emi = 0;
    if (r === 0) {
      emi = p / n;
    } else {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - p);

    // Generate annual amortization schedule
    const schedule = [];
    let balance = p;
    let accumulatedInterest = 0;

    for (let year = 1; year <= tenureYears; year++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        const interestForMonth = balance * r;
        const principalForMonth = emi - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      accumulatedInterest += yearlyInterest;
      schedule.push({
        year,
        yearlyPrincipal: Math.round(yearlyPrincipal),
        yearlyInterest: Math.round(yearlyInterest),
        endingBalance: Math.round(balance),
      });
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalRatio: ((p / (totalPayment || 1)) * 100).toFixed(1),
      interestRatio: ((totalInterest / (totalPayment || 1)) * 100).toFixed(1),
      schedule,
    };
  }, [principal, annualRate, tenureYears]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Loan & Mortgage EMI Calculator</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Reducing Balance Formula
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Compute monthly installment, interest payout, and amortization</p>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          {['AED', 'USD', 'EUR', 'GBP', 'INR', 'BDT'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                currency === curr ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Principal Loan Amount</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  {currency} {principal.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={10000}
                max={5000000}
                step={5000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="mt-2 w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Annual Interest Rate</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">{annualRate}%</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={25}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-medium">
                <span>Loan Tenure (Years)</span>
                <span className="text-cyan-400 font-mono font-bold text-sm">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Breakdown Distribution Bar */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Repayment Breakdown
            </span>
            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${calculations.principalRatio}%` }}
                className="bg-cyan-500 h-full"
                title={`Principal: ${calculations.principalRatio}%`}
              />
              <div
                style={{ width: `${calculations.interestRatio}%` }}
                className="bg-purple-500 h-full"
                title={`Interest: ${calculations.interestRatio}%`}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span>Principal ({calculations.principalRatio}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Total Interest ({calculations.interestRatio}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 p-6 rounded-2xl text-center">
            <span className="text-xs uppercase font-semibold text-cyan-400 tracking-wider">
              Monthly Equated Installment (EMI)
            </span>
            <div className="text-4xl font-extrabold text-white font-mono mt-2 mb-1">
              {currency} {calculations.emi.toLocaleString()}
            </div>
            <span className="text-xs text-slate-400">per month for {tenureYears * 12} installments</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] uppercase font-semibold text-slate-400">Total Interest Payable</span>
              <div className="text-xl font-bold text-purple-400 font-mono mt-1">
                {currency} {calculations.totalInterest.toLocaleString()}
              </div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] uppercase font-semibold text-slate-400">Total Amount Payable</span>
              <div className="text-xl font-bold text-slate-100 font-mono mt-1">
                {currency} {calculations.totalPayment.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Amortization Table Preview */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 overflow-hidden">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 block">
              Yearly Amortization Schedule
            </span>
            <div className="max-h-56 overflow-y-auto pr-1">
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] text-slate-400 border-b border-slate-800 sticky top-0 bg-slate-950">
                  <tr>
                    <th className="py-2">Year</th>
                    <th className="py-2">Principal</th>
                    <th className="py-2">Interest</th>
                    <th className="py-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                  {calculations.schedule.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-900/50">
                      <td className="py-2 text-cyan-400">Yr {row.year}</td>
                      <td className="py-2">{currency} {row.yearlyPrincipal.toLocaleString()}</td>
                      <td className="py-2 text-purple-400">{currency} {row.yearlyInterest.toLocaleString()}</td>
                      <td className="py-2 text-right text-slate-400">{currency} {row.endingBalance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
