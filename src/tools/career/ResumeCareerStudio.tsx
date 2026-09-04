import React, { useState, useMemo } from 'react';
import { Briefcase, DollarSign, FileSearch, Copy, Check, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface ResumeCareerStudioProps {
  initialTab?: 'verbs' | 'salary' | 'ats';
}

export const ResumeCareerStudio: React.FC<ResumeCareerStudioProps> = ({ initialTab = 'verbs' }) => {
  const [activeTab, setActiveTab] = useState<'verbs' | 'salary' | 'ats'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. Action Verbs State ---
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'leadership' | 'tech' | 'results' | 'creative'>('all');

  const verbCategories = [
    {
      id: 'leadership',
      name: 'Leadership & Management',
      verbs: ['Spearheaded', 'Orchestrated', 'Supervised', 'Delegated', 'Mentored', 'Pioneered', 'Mobilized', 'Guided', 'Directed', 'Championed']
    },
    {
      id: 'tech',
      name: 'Technical & Engineering',
      verbs: ['Architected', 'Engineered', 'Refactored', 'Deployed', 'Automated', 'Configured', 'Programmed', 'Integrated', 'Debugged', 'Optimized']
    },
    {
      id: 'results',
      name: 'Impact & Growth',
      verbs: ['Accelerated', 'Amplified', 'Maximized', 'Outperformed', 'Generated', 'Surpassed', 'Decreased', 'Consolidated', 'Revitalized', 'Boosted']
    },
    {
      id: 'creative',
      name: 'Research & Creative',
      verbs: ['Conceptualized', 'Drafted', 'Synthesized', 'Authored', 'Devised', 'Formulated', 'Innovated', 'Analyzed', 'Evaluated', 'Published']
    }
  ];

  // --- 2. Salary Converter State ---
  const [amount, setAmount] = useState<number>(75000);
  const [period, setPeriod] = useState<'annual' | 'monthly' | 'hourly'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [weeksPerYear, setWeeksPerYear] = useState<number>(52);

  const salaryConversions = useMemo(() => {
    const totalAnnualHours = hoursPerWeek * weeksPerYear;
    let annual = 0;

    if (period === 'annual') annual = amount;
    else if (period === 'monthly') annual = amount * 12;
    else if (period === 'hourly') annual = amount * totalAnnualHours;

    const monthly = annual / 12;
    const biweekly = annual / 26;
    const weekly = annual / weeksPerYear;
    const daily = weekly / 5;
    const hourly = totalAnnualHours > 0 ? annual / totalAnnualHours : 0;

    return {
      annual: Math.round(annual).toLocaleString(),
      monthly: Math.round(monthly).toLocaleString(),
      biweekly: Math.round(biweekly).toLocaleString(),
      weekly: Math.round(weekly).toLocaleString(),
      daily: Math.round(daily).toLocaleString(),
      hourly: hourly.toFixed(2)
    };
  }, [amount, period, hoursPerWeek, weeksPerYear]);

  // --- 3. ATS Keyword Scanner State ---
  const [jobDescription, setJobDescription] = useState(
    'We are seeking a Senior Full Stack Engineer experienced with React, TypeScript, Node.js, REST APIs, Tailwind CSS, performance optimization, and CI/CD pipelines.'
  );
  const [resumeText, setResumeText] = useState(
    'Experienced Full Stack Engineer with expertise in TypeScript, React, state management, and building high-performance web applications.'
  );

  const atsAnalysis = useMemo(() => {
    // Extract keywords from job description
    const cleanWord = (w: string) => w.toLowerCase().replace(/[^a-z0-9+#]/g, '');
    const stopWords = new Set([
      'the', 'and', 'with', 'for', 'are', 'you', 'will', 'that', 'this', 'our', 'from', 'have',
      'your', 'seeking', 'responsible', 'requirements', 'qualifications', 'experience'
    ]);

    const jobWords = jobDescription.split(/\s+/).map(cleanWord).filter(w => w.length > 2 && !stopWords.has(w));
    const resumeWords = new Set(resumeText.split(/\s+/).map(cleanWord));

    const freqMap = new Map<string, number>();
    jobWords.forEach(w => freqMap.set(w, (freqMap.get(w) || 0) + 1));

    // Sort top keywords by frequency
    const topKeywords = Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word, freq]) => ({
        word,
        freq,
        matched: resumeWords.has(word)
      }));

    const matchedCount = topKeywords.filter(k => k.matched).length;
    const matchScore = topKeywords.length > 0 ? Math.round((matchedCount / topKeywords.length) * 100) : 0;

    return {
      topKeywords,
      matchScore,
      matchedCount,
      total: topKeywords.length
    };
  }, [jobDescription, resumeText]);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('verbs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'verbs'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Resume Action Verbs
        </button>
        <button
          onClick={() => setActiveTab('salary')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'salary'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Salary & Hourly Converter
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'ats'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          ATS Resume Keyword Scanner
        </button>
      </div>

      {/* 1. Action Verbs */}
      {activeTab === 'verbs' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium ${selectedCategory === 'all' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              All Verbs
            </button>
            {verbCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium ${selectedCategory === cat.id ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {verbCategories
              .filter(c => selectedCategory === 'all' || selectedCategory === c.id)
              .map(cat => (
                <div key={cat.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{cat.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.verbs.map(verb => (
                      <button
                        key={verb}
                        onClick={() => copy(verb, verb)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-cyan-500/10 border border-slate-800 hover:border-cyan-500/30 text-xs text-slate-200 font-medium transition-all flex items-center gap-1.5"
                      >
                        <span>{verb}</span>
                        {copiedText === verb && <Check className="w-3 h-3 text-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 2. Salary Converter */}
      {activeTab === 'salary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Base Compensation ($)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Pay Frequency</label>
              <select
                value={period}
                onChange={e => setPeriod(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="annual">Annual Salary</option>
                <option value="monthly">Monthly Salary</option>
                <option value="hourly">Hourly Wage</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Hours / Week</label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Hourly</span>
              <div className="text-lg font-black text-cyan-400 font-mono mt-1">${salaryConversions.hourly}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Daily</span>
              <div className="text-lg font-black text-slate-200 font-mono mt-1">${salaryConversions.daily}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Weekly</span>
              <div className="text-lg font-black text-slate-200 font-mono mt-1">${salaryConversions.weekly}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Bi-Weekly</span>
              <div className="text-lg font-black text-slate-200 font-mono mt-1">${salaryConversions.biweekly}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Monthly</span>
              <div className="text-lg font-black text-cyan-300 font-mono mt-1">${salaryConversions.monthly}</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Annual</span>
              <div className="text-lg font-black text-emerald-400 font-mono mt-1">${salaryConversions.annual}</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. ATS Keyword Scanner */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Job Description (Target)</label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Your Resume Content</label>
              <textarea
                rows={5}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">ATS Match Score</span>
                <span className={`text-3xl font-black font-mono ${atsAnalysis.matchScore >= 70 ? 'text-emerald-400' : atsAnalysis.matchScore >= 45 ? 'text-amber-400' : 'text-red-400'}`}>
                  {atsAnalysis.matchScore}%
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  ({atsAnalysis.matchedCount} of {atsAnalysis.total} top keywords matched)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300">Keyword Density & Match Status</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {atsAnalysis.topKeywords.map(kw => (
                  <span
                    key={kw.word}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono border ${
                      kw.matched
                        ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                        : 'bg-red-950/20 border-red-900/30 text-red-400'
                    }`}
                  >
                    {kw.matched ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{kw.word} ({kw.freq}x)</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
