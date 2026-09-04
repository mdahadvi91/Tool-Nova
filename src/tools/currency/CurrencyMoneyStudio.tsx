import React, { useState, useMemo } from 'react';
import { Coins, Users, Calculator, Info, ShieldCheck, RefreshCw } from 'lucide-react';

export const CurrencyMoneyStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'converter' | 'tip-split' | 'denominations'>('converter');

  // Currency Converter state (clearly labeled static reference rates with custom override)
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [customRateOverride, setCustomRateOverride] = useState<string>('');

  // Static Reference baseline rates against 1 USD
  const REFERENCE_RATES_TO_USD: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    AED: 3.6725,
    SAR: 3.75,
    JPY: 154.5,
    CAD: 1.36,
    AUD: 1.52,
    INR: 83.4
  };

  // Compute exchange
  const exchangeResult = useMemo(() => {
    let rate = 1;
    if (customRateOverride && !isNaN(parseFloat(customRateOverride))) {
      rate = parseFloat(customRateOverride);
    } else {
      const fromRate = REFERENCE_RATES_TO_USD[fromCurrency] || 1;
      const toRate = REFERENCE_RATES_TO_USD[toCurrency] || 1;
      rate = toRate / fromRate;
    }
    const converted = amount * rate;
    return {
      rate: Math.round(rate * 10000) / 10000,
      converted: Math.round(converted * 100) / 100
    };
  }, [amount, fromCurrency, toCurrency, customRateOverride]);

  // Tip & Split Bill state
  const [billAmount, setBillAmount] = useState<number>(120);
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [taxAmount, setTaxAmount] = useState<number>(10);
  const [splitPeople, setSplitPeople] = useState<number>(3);

  const tipSplitResult = useMemo(() => {
    const tipVal = (billAmount * tipPercent) / 100;
    const grandTotal = billAmount + tipVal + taxAmount;
    const perPerson = splitPeople > 0 ? grandTotal / splitPeople : grandTotal;
    const tipPerPerson = splitPeople > 0 ? tipVal / splitPeople : tipVal;

    return {
      tipTotal: Math.round(tipVal * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
      tipPerPerson: Math.round(tipPerPerson * 100) / 100
    };
  }, [billAmount, tipPercent, taxAmount, splitPeople]);

  // Cash Denominations
  const [counts, setCounts] = useState<Record<number, number>>({
    100: 5,
    50: 8,
    20: 15,
    10: 20,
    5: 10,
    1: 25
  });

  const denominationTotal = useMemo(() => {
    return Object.entries(counts).reduce((sum, [denom, count]) => sum + Number(denom) * (Number(count) || 0), 0);
  }, [counts]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            Currency, Tip & Cash Denomination Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Exchange calculations with reference rates, bill splitting with tips, and physical cash counting.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('converter')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'converter'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Coins className="w-4 h-4" />
          Currency Exchange
        </button>
        <button
          onClick={() => setActiveTab('tip-split')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'tip-split'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          Tip & Bill Splitter
        </button>
        <button
          onClick={() => setActiveTab('denominations')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'denominations'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Cash Denomination Counter
        </button>
      </div>

      {activeTab === 'converter' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-950/20 border border-amber-800/30 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              Rates shown are baseline reference rates. Enter a Custom Rate Override anytime for real-time market accuracy.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">From Currency</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {Object.keys(REFERENCE_RATES_TO_USD).map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">To Currency</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              >
                {Object.keys(REFERENCE_RATES_TO_USD).map((cur) => (
                  <option key={cur} value={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 uppercase">Converted Equivalent</span>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">
                {exchangeResult.converted.toLocaleString()} {toCurrency}
              </div>
              <span className="text-xs text-slate-400">
                1 {fromCurrency} = {exchangeResult.rate} {toCurrency}
              </span>
            </div>

            <div className="w-full sm:w-64 space-y-1">
              <label className="text-xs text-slate-400">Custom Exchange Rate Override</label>
              <input
                type="number"
                placeholder={`Default: ${exchangeResult.rate}`}
                value={customRateOverride}
                onChange={(e) => setCustomRateOverride(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-cyan-400 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tip-split' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Bill Subtotal ($)</label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tip Percentage ({tipPercent}%)</label>
              <div className="flex gap-2">
                {[10, 15, 18, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    onClick={() => setTipPercent(pct)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${
                      tipPercent === pct ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Tax ($)</label>
                <input
                  type="number"
                  value={taxAmount}
                  onChange={(e) => setTaxAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Split Between (People)</label>
                <input
                  type="number"
                  value={splitPeople}
                  onChange={(e) => setSplitPeople(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-center">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80 text-center">
              <span className="text-xs text-slate-400 uppercase">Each Person Pays</span>
              <div className="text-4xl font-black font-mono text-emerald-400 mt-1">
                ${tipSplitResult.perPerson.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Includes ${tipSplitResult.tipPerPerson.toFixed(2)} tip per person
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Total Tip Amount:</span>
                <span className="font-mono text-cyan-400 font-semibold">${tipSplitResult.tipTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Total Bill (with Tip & Tax):</span>
                <span className="font-mono text-white font-bold">${tipSplitResult.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'denominations' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[100, 50, 20, 10, 5, 1].map((denom) => (
                <div key={denom} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1">
                  <span className="text-xs font-bold text-amber-400 font-mono">${denom} Bill</span>
                  <input
                    type="number"
                    min="0"
                    value={counts[denom] || 0}
                    onChange={(e) =>
                      setCounts({ ...counts, [denom]: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs font-mono text-white"
                  />
                  <span className="text-[11px] text-slate-500 block text-right font-mono">
                    = ${(denom * (counts[denom] || 0)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Total Physical Cash Count:</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              ${denominationTotal.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
