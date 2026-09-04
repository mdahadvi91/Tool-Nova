import React, { useState, useMemo } from 'react';
import { Building2, Percent, CheckCircle, Scale, Info, ShieldCheck, CreditCard } from 'lucide-react';

export const UaeToolsStudio: React.FC<{ defaultTab?: 'gratuity' | 'vat' | 'emirates-id' }> = ({ defaultTab = 'gratuity' }) => {
  const [activeTab, setActiveTab] = useState<'gratuity' | 'vat' | 'emirates-id'>(defaultTab);

  // Gratuity State
  const [basicSalary, setBasicSalary] = useState(12000);
  const [years, setYears] = useState(4);
  const [months, setMonths] = useState(6);
  const [days, setDays] = useState(0);
  const [contractType, setContractType] = useState<'limited' | 'unlimited'>('limited');
  const [separationType, setSeparationType] = useState<'termination' | 'resignation'>('termination');

  // VAT State
  const [vatAmount, setVatAmount] = useState(1000);
  const [vatMode, setVatMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  // Emirates ID State
  const [emiratesIdInput, setEmiratesIdInput] = useState('784-1990-1234567-1');

  const emiratesIdResult = useMemo(() => {
    const raw = emiratesIdInput.replace(/\D/g, '');
    if (raw.length !== 15) {
      return {
        isValid: false,
        length: raw.length,
        countryCode: raw.slice(0, 3),
        year: raw.slice(3, 7),
        sequence: raw.slice(7, 14),
        checkDigit: raw.slice(14, 15),
        error: `Emirates ID must contain exactly 15 digits (currently ${raw.length}).`
      };
    }

    const countryCode = raw.slice(0, 3);
    const year = raw.slice(3, 7);
    const sequence = raw.slice(7, 14);
    const checkDigit = Number(raw.slice(14, 15));

    if (countryCode !== '784') {
      return {
        isValid: false,
        length: 15,
        countryCode,
        year,
        sequence,
        checkDigit,
        error: 'Invalid country code. UAE Emirates ID must begin with 784.'
      };
    }

    const yearNum = Number(year);
    const currentYear = new Date().getFullYear();
    if (yearNum < 1900 || yearNum > currentYear) {
      return {
        isValid: false,
        length: 15,
        countryCode,
        year,
        sequence,
        checkDigit,
        error: `Birth year ${year} is outside realistic range (1900-${currentYear}).`
      };
    }

    return {
      isValid: true,
      length: 15,
      countryCode,
      year,
      sequence,
      checkDigit,
      formatted: `784-${year}-${sequence}-${checkDigit}`,
      error: null
    };
  }, [emiratesIdInput]);

  // Calculate UAE Gratuity under Federal Decree-Law No. 33 of 2021
  const gratuityResult = useMemo(() => {
    const totalServiceYears = years + months / 12 + days / 365;

    // Under 1 year of continuous service: 0 entitlement
    if (totalServiceYears < 1) {
      return {
        isEligible: false,
        amount: 0,
        capped: false,
        reason: 'Less than 1 year of continuous service is not eligible for end-of-service gratuity under UAE Labor Law Article 51.',
      };
    }

    // Daily wage based on 30 calendar days per month
    const dailyWage = basicSalary / 30;

    let entitlementDays = 0;
    if (totalServiceYears <= 5) {
      entitlementDays = totalServiceYears * 21;
    } else {
      entitlementDays = 5 * 21 + (totalServiceYears - 5) * 30;
    }

    let calculatedAmount = dailyWage * entitlementDays;

    // Resignation deductions under older unlimited contracts if applicable
    if (contractType === 'unlimited' && separationType === 'resignation') {
      if (totalServiceYears >= 1 && totalServiceYears < 3) {
        calculatedAmount *= 1 / 3;
      } else if (totalServiceYears >= 3 && totalServiceYears < 5) {
        calculatedAmount *= 2 / 3;
      }
    }

    // Maximum legal cap: 2 years' basic salary (Article 51)
    const maxLegalCap = basicSalary * 24;
    const isCapped = calculatedAmount > maxLegalCap;
    const finalAmount = Math.min(calculatedAmount, maxLegalCap);

    return {
      isEligible: true,
      amount: Math.round(finalAmount),
      capped: isCapped,
      totalDays: entitlementDays.toFixed(1),
      dailyWage: dailyWage.toFixed(2),
      maxLegalCap,
    };
  }, [basicSalary, years, months, days, contractType, separationType]);

  // Calculate 5% VAT
  const vatCalculations = useMemo(() => {
    const rate = 0.05;
    if (vatMode === 'exclusive') {
      // Amount is net, add 5%
      const tax = vatAmount * rate;
      const gross = vatAmount + tax;
      return {
        net: vatAmount,
        tax: Number(tax.toFixed(2)),
        gross: Number(gross.toFixed(2)),
      };
    } else {
      // Amount is gross, extract 5% (gross / 1.05)
      const net = vatAmount / (1 + rate);
      const tax = vatAmount - net;
      return {
        net: Number(net.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        gross: vatAmount,
      };
    }
  }, [vatAmount, vatMode]);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('gratuity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'gratuity'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>UAE Labor Law Gratuity</span>
          </button>
          <button
            onClick={() => setActiveTab('vat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'vat'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Percent className="w-3.5 h-3.5" />
            <span>UAE 5% VAT Calculator</span>
          </button>
          <button
            onClick={() => setActiveTab('emirates-id')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'emirates-id'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Emirates ID Validator</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>UAE Federal Decree-Law No. 33 of 2021 Compliant</span>
        </div>
      </div>

      {activeTab === 'gratuity' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Monthly Basic Salary (AED)
                </label>
                <span className="text-[11px] text-slate-500 block mb-1.5">
                  Excluding housing, conveyance, and bonus allowances
                </span>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Total Length of Service
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Years</span>
                    <input
                      type="number"
                      min={0}
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Months</span>
                    <input
                      type="number"
                      min={0}
                      max={11}
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">Days</span>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Contract Type</label>
                  <select
                    value={contractType}
                    onChange={(e) => setContractType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="limited">Limited (Standard UAE Law)</option>
                    <option value="unlimited">Unlimited (Legacy Contract)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Separation Reason</label>
                  <select
                    value={separationType}
                    onChange={(e) => setSeparationType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="termination">Employer Termination</option>
                    <option value="resignation">Employee Resignation</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-blue-950/20 border border-blue-800/40 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Statutory Rules:</strong> Under Article 51 of the UAE Labor Law, employees receive 21 days'
                basic wage for each year for the first 5 years, and 30 days' wage for each additional year. Gratuity is
                strictly capped at 2 years' total basic wage.
              </span>
            </div>
          </div>

          {/* Right Output Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/70 border border-slate-800 p-6 rounded-2xl">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2 block">
                Estimated Entitlement
              </span>

              {gratuityResult.isEligible ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/50 to-blue-950/50 border border-cyan-800/50 text-center">
                    <span className="text-xs text-slate-400">Total Gratuity Payable</span>
                    <div className="text-4xl font-extrabold text-white font-mono mt-1">
                      AED {gratuityResult.amount.toLocaleString()}
                    </div>
                    {gratuityResult.capped && (
                      <span className="text-[11px] text-amber-400 mt-2 block font-medium">
                        Capped at legal 2-year maximum basic salary (AED {gratuityResult.maxLegalCap.toLocaleString()})
                      </span>
                    )}
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Basic Daily Wage:</span>
                      <span className="font-mono text-slate-200">AED {gratuityResult.dailyWage}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-slate-400">Entitlement Days:</span>
                      <span className="font-mono text-slate-200">{gratuityResult.totalDays} Days</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Statutory Cap:</span>
                      <span className="font-mono text-slate-200">AED {gratuityResult.maxLegalCap.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-rose-950/30 border border-rose-800/40 text-center">
                  <span className="text-sm font-semibold text-rose-300 block mb-1">Not Eligible</span>
                  <p className="text-xs text-slate-400">{gratuityResult.reason}</p>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 text-center">
              <span className="text-[11px] text-slate-500">
                Calculations based on Ministry of Human Resources and Emiratisation (MOHRE) regulatory guidelines.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* UAE 5% VAT VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Invoice Amount (AED)</label>
                <input
                  type="number"
                  value={vatAmount}
                  onChange={(e) => setVatAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Calculation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVatMode('exclusive')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      vatMode === 'exclusive'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Add 5% VAT (Exclusive)
                  </button>
                  <button
                    onClick={() => setVatMode('inclusive')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      vatMode === 'inclusive'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    Extract 5% VAT (Inclusive)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/70 border border-slate-800 p-6 rounded-2xl">
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block">
                VAT Tax Breakdown
              </span>

              <div className="bg-gradient-to-br from-emerald-950/40 to-teal-950/40 border border-emerald-800/40 p-5 rounded-xl text-center">
                <span className="text-xs text-slate-400">Total Payable Amount</span>
                <div className="text-4xl font-extrabold text-white font-mono mt-1">
                  AED {vatCalculations.gross.toFixed(2)}
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Net Pre-Tax Base:</span>
                  <span className="font-mono text-slate-200">AED {vatCalculations.net.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">5% VAT Component:</span>
                  <span className="font-mono text-emerald-400 font-bold">AED {vatCalculations.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Total Gross:</span>
                  <span className="font-mono text-slate-200 font-bold">AED {vatCalculations.gross.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 mt-6 text-center">
              <span className="text-[11px] text-slate-500">
                Standard Federal Tax Authority (FTA) 5% VAT rate implemented in UAE since January 1, 2018.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Emirates ID Validator */}
      {activeTab === 'emirates-id' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Enter 15-Digit Emirates ID Number
            </label>
            <input
              type="text"
              value={emiratesIdInput}
              onChange={e => setEmiratesIdInput(e.target.value)}
              placeholder="784-YYYY-XXXXXXX-C"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 font-mono text-base text-white tracking-widest focus:outline-none focus:border-purple-500"
            />
            <p className="text-[11px] text-slate-400">
              Official format: 784 (UAE ISO code) - 4 digit birth year - 7 digit sequence - 1 check digit.
            </p>
          </div>

          <div className={`p-5 rounded-2xl border ${
            emiratesIdResult.isValid 
              ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300' 
              : 'bg-red-950/20 border-red-800/40 text-red-300'
          }`}>
            <div className="flex items-center gap-3">
              {emiratesIdResult.isValid ? (
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <Info className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <div>
                <h4 className="text-xs font-bold text-white">
                  {emiratesIdResult.isValid ? 'Valid Emirates ID Format' : 'Invalid Emirates ID Format'}
                </h4>
                <p className="text-xs mt-0.5">
                  {emiratesIdResult.isValid 
                    ? `Formatted: ${emiratesIdResult.formatted}` 
                    : emiratesIdResult.error}
                </p>
              </div>
            </div>

            {emiratesIdResult.isValid && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-emerald-800/30 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Country Code</span>
                  <p className="font-mono font-bold text-white">784 (UAE)</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Birth Year</span>
                  <p className="font-mono font-bold text-white">{emiratesIdResult.year}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Sequence ID</span>
                  <p className="font-mono font-bold text-white">{emiratesIdResult.sequence}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Check Digit</span>
                  <p className="font-mono font-bold text-white">{emiratesIdResult.checkDigit}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
