import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, TrendingUp, BarChart2, ShieldCheck } from 'lucide-react';

export const BusinessCalculatorStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'margin' | 'breakeven' | 'cac-ltv'>('margin');

  // Margin / Markup state
  const [costPrice, setCostPrice] = useState<number>(60);
  const [sellingPrice, setSellingPrice] = useState<number>(100);

  // Break-Even state
  const [fixedCosts, setFixedCosts] = useState<number>(25000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(15);
  const [pricePerUnit, setPricePerUnit] = useState<number>(40);

  // CAC / LTV state
  const [marketingSpend, setMarketingSpend] = useState<number>(10000);
  const [newCustomers, setNewCustomers] = useState<number>(200);
  const [arpuMonthly, setArpuMonthly] = useState<number>(50);
  const [monthlyChurnPercent, setMonthlyChurnPercent] = useState<number>(4);

  // Computed Margin
  const marginResults = useMemo(() => {
    const profit = sellingPrice - costPrice;
    const marginPercent = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
    const markupPercent = costPrice > 0 ? (profit / costPrice) * 100 : 0;
    return {
      profit: Math.round(profit * 100) / 100,
      marginPercent: Math.round(marginPercent * 10) / 10,
      markupPercent: Math.round(markupPercent * 10) / 10
    };
  }, [costPrice, sellingPrice]);

  // Computed Break-Even
  const breakEvenResults = useMemo(() => {
    const contributionMargin = pricePerUnit - variableCostPerUnit;
    const contributionMarginRatio = pricePerUnit > 0 ? contributionMargin / pricePerUnit : 0;
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
    const breakEvenRevenue = breakEvenUnits * pricePerUnit;

    return {
      contributionMargin,
      contributionMarginRatio: Math.round(contributionMarginRatio * 1000) / 10,
      breakEvenUnits,
      breakEvenRevenue
    };
  }, [fixedCosts, variableCostPerUnit, pricePerUnit]);

  // Computed CAC & LTV
  const cacLtvResults = useMemo(() => {
    const cac = newCustomers > 0 ? marketingSpend / newCustomers : 0;
    const customerLifetimeMonths = monthlyChurnPercent > 0 ? 100 / monthlyChurnPercent : 24;
    const ltv = arpuMonthly * customerLifetimeMonths;
    const ratio = cac > 0 ? ltv / cac : 0;

    let health = 'Unfavorable (< 1x)';
    let healthColor = 'text-rose-400';
    if (ratio >= 3) {
      health = 'Optimal & Highly Sustainable (3x+)';
      healthColor = 'text-emerald-400';
    } else if (ratio >= 1.5) {
      health = 'Acceptable (1.5x - 3x)';
      healthColor = 'text-cyan-400';
    }

    return {
      cac: Math.round(cac * 100) / 100,
      customerLifetimeMonths: Math.round(customerLifetimeMonths * 10) / 10,
      ltv: Math.round(ltv * 100) / 100,
      ratio: Math.round(ratio * 10) / 10,
      health,
      healthColor
    };
  }, [marketingSpend, newCustomers, arpuMonthly, monthlyChurnPercent]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Business & Unit Economics Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate profit margins, break-even unit volumes, and customer unit economics with financial precision.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('margin')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'margin'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Percent className="w-4 h-4" />
          Margin & Markup
        </button>
        <button
          onClick={() => setActiveTab('breakeven')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'breakeven'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Break-Even Analysis
        </button>
        <button
          onClick={() => setActiveTab('cac-ltv')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'cac-ltv'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          CAC : LTV Ratio
        </button>
      </div>

      {activeTab === 'margin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Cost of Goods Sold ($ COGS)</label>
              <input
                type="number"
                value={costPrice}
                onChange={(e) => setCostPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Selling Price ($ Price)</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center">
              <span className="text-xs text-slate-500 uppercase">Gross Profit</span>
              <span className="text-2xl font-bold font-mono text-emerald-400 mt-1">${marginResults.profit}</span>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center">
              <span className="text-xs text-slate-500 uppercase">Profit Margin</span>
              <span className="text-2xl font-bold font-mono text-cyan-400 mt-1">{marginResults.marginPercent}%</span>
            </div>
            <div className="col-span-2 p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center">
              <span className="text-xs text-slate-500 uppercase">Cost Markup</span>
              <span className="text-2xl font-bold font-mono text-amber-400 mt-1">{marginResults.markupPercent}%</span>
              <span className="text-[11px] text-slate-500 mt-1">Percentage added over the base cost price.</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'breakeven' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Total Fixed Costs ($)</label>
              <input
                type="number"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Variable Cost Per Unit ($)</label>
              <input
                type="number"
                value={variableCostPerUnit}
                onChange={(e) => setVariableCostPerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Selling Price Per Unit ($)</label>
              <input
                type="number"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Break-Even Units Required:</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {breakEvenResults.breakEvenUnits.toLocaleString()} units
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                <span className="text-xs text-slate-400">Break-Even Sales Revenue:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  ${breakEvenResults.breakEvenRevenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                <span className="text-xs text-slate-400">Contribution Margin / Unit:</span>
                <span className="text-sm font-mono text-white">${breakEvenResults.contributionMargin}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cac-ltv' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 p-5 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Total Marketing & Sales Spend ($)</label>
              <input
                type="number"
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">New Customers Acquired</label>
              <input
                type="number"
                value={newCustomers}
                onChange={(e) => setNewCustomers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Average Revenue Per User ($ ARPU / Mo)</label>
              <input
                type="number"
                value={arpuMonthly}
                onChange={(e) => setArpuMonthly(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Monthly Churn Rate (%)</label>
              <input
                type="number"
                value={monthlyChurnPercent}
                onChange={(e) => setMonthlyChurnPercent(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-white"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4 flex flex-col justify-center">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Customer Acquisition Cost (CAC):</span>
              <span className="text-lg font-bold font-mono text-rose-400">${cacLtvResults.cac}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Customer Lifetime Value (LTV):</span>
              <span className="text-lg font-bold font-mono text-emerald-400">${cacLtvResults.ltv}</span>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white">LTV : CAC Ratio</span>
                <span className="text-2xl font-extrabold font-mono text-cyan-400">{cacLtvResults.ratio}x</span>
              </div>
              <span className={`text-xs font-semibold ${cacLtvResults.healthColor}`}>{cacLtvResults.health}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
