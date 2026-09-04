import React, { useState, useMemo } from 'react';
import { Mail, TrendingUp, Award, Copy, Check, AlertTriangle, Sparkles, UserCheck } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface MarketingStudioProps {
  initialTab?: 'subject' | 'roas' | 'signature';
}

export const MarketingStudio: React.FC<MarketingStudioProps> = ({ initialTab = 'subject' }) => {
  const [activeTab, setActiveTab] = useState<'subject' | 'roas' | 'signature'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. Email Subject Tester State ---
  const [subject, setSubject] = useState('Exclusive: Unlock 30% Off Your Next Order Today');

  const subjectAnalysis = useMemo(() => {
    const len = subject.length;
    const words = subject.trim() ? subject.trim().split(/\s+/).length : 0;
    const spamKeywords = [
      'free', 'guarantee', 'urgent', 'act now', 'make money', 'no risk',
      'winner', 'cash', '100% free', 'miracle', 'credit', 'click here'
    ];
    const foundSpam = spamKeywords.filter((w) => subject.toLowerCase().includes(w));
    const hasNumbers = /\d/.test(subject);
    const hasEmoji = /\p{Extended_Pictographic}/u.test(subject);
    const hasQuestion = subject.includes('?');

    let score = 50;
    if (len >= 30 && len <= 50) score += 25;
    else if (len >= 20 && len <= 65) score += 15;
    else score -= 10;

    if (foundSpam.length === 0) score += 15;
    else score -= foundSpam.length * 15;

    if (hasNumbers) score += 5;
    if (hasEmoji) score += 5;

    score = Math.max(0, Math.min(100, score));

    return {
      len,
      words,
      foundSpam,
      score,
      hasNumbers,
      hasEmoji,
      hasQuestion
    };
  }, [subject]);

  // --- 2. ROAS & Ad Spend Calculator State ---
  const [adSpend, setAdSpend] = useState<number>(1000);
  const [revenue, setRevenue] = useState<number>(4500);
  const [profitMargin, setProfitMargin] = useState<number>(40); // 40%
  const [conversions, setConversions] = useState<number>(50);

  const roasMetrics = useMemo(() => {
    const spend = Math.max(0, adSpend);
    const rev = Math.max(0, revenue);
    const margin = Math.min(100, Math.max(1, profitMargin)) / 100;
    const conv = Math.max(1, conversions);

    const roasMultiplier = spend > 0 ? rev / spend : 0;
    const roasPercent = roasMultiplier * 100;
    const breakEvenRoas = margin > 0 ? (1 / margin) * 100 : 0;
    const grossProfit = rev * margin;
    const netProfit = grossProfit - spend;
    const cac = spend > 0 ? spend / conv : 0;
    const aov = rev > 0 ? rev / conv : 0;

    return {
      roasMultiplier: roasMultiplier.toFixed(2),
      roasPercent: roasPercent.toFixed(0),
      breakEvenRoas: breakEvenRoas.toFixed(0),
      netProfit: netProfit.toFixed(2),
      cac: cac.toFixed(2),
      aov: aov.toFixed(2),
      isProfitable: netProfit > 0
    };
  }, [adSpend, revenue, profitMargin, conversions]);

  // --- 3. Email Signature Builder State ---
  const [sigName, setSigName] = useState('Alex Morgan');
  const [sigRole, setSigRole] = useState('Head of Growth & Product');
  const [sigCompany, setSigCompany] = useState('ToolNova Innovations');
  const [sigEmail, setSigEmail] = useState('alex@example.com');
  const [sigPhone, setSigPhone] = useState('+1 (555) 234-5678');
  const [sigWebsite, setSigWebsite] = useState('https://toolnova.app');

  const signatureHtml = useMemo(() => {
    return `<!-- ToolNova Generated Email Signature -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; line-height: 1.4; color: #333333;">
  <tr>
    <td style="padding-right: 15px; border-right: 2px solid #06b6d4; vertical-align: middle;">
      <div style="font-size: 16px; font-weight: bold; color: #0f172a;">${sigName}</div>
      <div style="font-size: 12px; color: #0891b2; font-weight: 600;">${sigRole}</div>
      <div style="font-size: 12px; color: #64748b;">${sigCompany}</div>
    </td>
    <td style="padding-left: 15px; vertical-align: middle; font-size: 12px; color: #475569;">
      <div><strong>Email:</strong> <a href="mailto:${sigEmail}" style="color: #0891b2; text-decoration: none;">${sigEmail}</a></div>
      <div><strong>Phone:</strong> ${sigPhone}</div>
      <div><strong>Web:</strong> <a href="${sigWebsite}" target="_blank" style="color: #0891b2; text-decoration: none;">${sigWebsite}</a></div>
    </td>
  </tr>
</table>`;
  }, [sigName, sigRole, sigCompany, sigEmail, sigPhone, sigWebsite]);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tab Selectors */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('subject')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'subject'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Email Subject Tester
        </button>
        <button
          onClick={() => setActiveTab('roas')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'roas'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          ROAS & Ad Spend Calculator
        </button>
        <button
          onClick={() => setActiveTab('signature')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'signature'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          HTML Email Signature Builder
        </button>
      </div>

      {/* 1. Email Subject Tester */}
      {activeTab === 'subject' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-200">Email Subject Line</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your promotional subject line..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Score Card */}
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl text-center space-y-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Optimization Score</span>
              <div className={`text-4xl font-extrabold ${subjectAnalysis.score >= 70 ? 'text-emerald-400' : subjectAnalysis.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                {subjectAnalysis.score}<span className="text-base font-normal text-slate-500">/100</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {subjectAnalysis.score >= 70 ? 'High Open-Rate Likelihood' : 'Room for Subject Optimization'}
              </p>
            </div>

            {/* Metrics */}
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-2 sm:col-span-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Subject Diagnostics</span>
              <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-400">Length:</span>{' '}
                  <strong className={subjectAnalysis.len >= 30 && subjectAnalysis.len <= 50 ? 'text-emerald-400' : 'text-amber-400'}>
                    {subjectAnalysis.len} chars
                  </strong>{' '}
                  <span className="text-[10px] text-slate-500">(Ideal 30-50)</span>
                </div>
                <div>
                  <span className="text-slate-400">Word Count:</span>{' '}
                  <strong className="text-white">{subjectAnalysis.words} words</strong>
                </div>
                <div>
                  <span className="text-slate-400">Contains Numbers:</span>{' '}
                  <strong className={subjectAnalysis.hasNumbers ? 'text-emerald-400' : 'text-slate-500'}>
                    {subjectAnalysis.hasNumbers ? 'Yes (+5)' : 'No'}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400">Contains Emoji:</span>{' '}
                  <strong className={subjectAnalysis.hasEmoji ? 'text-emerald-400' : 'text-slate-500'}>
                    {subjectAnalysis.hasEmoji ? 'Yes' : 'No'}
                  </strong>
                </div>
              </div>

              {subjectAnalysis.foundSpam.length > 0 && (
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-300 text-xs flex items-center gap-2 mt-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Potential Spam Words: <strong>{subjectAnalysis.foundSpam.join(', ')}</strong></span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ROAS Calculator */}
      {activeTab === 'roas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Total Ad Spend ($)</label>
              <input
                type="number"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Revenue Generated ($)</label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Gross Margin (%)</label>
              <input
                type="number"
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Orders / Customers</label>
              <input
                type="number"
                value={conversions}
                onChange={(e) => setConversions(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">ROAS Multiplier</span>
              <div className="text-2xl font-black text-cyan-400 font-mono mt-1">{roasMetrics.roasMultiplier}x</div>
              <span className="text-[11px] text-slate-400 font-mono">({roasMetrics.roasPercent}%)</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Break-Even ROAS</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">{roasMetrics.breakEvenRoas}%</div>
              <span className="text-[11px] text-slate-400 font-mono">Required to avoid loss</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Net Campaign Profit</span>
              <div className={`text-2xl font-black font-mono mt-1 ${roasMetrics.isProfitable ? 'text-emerald-400' : 'text-red-400'}`}>
                ${roasMetrics.netProfit}
              </div>
              <span className="text-[11px] text-slate-400">After margin & ad spend</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">CAC / AOV</span>
              <div className="text-xl font-black text-slate-200 font-mono mt-1">${roasMetrics.cac} CAC</div>
              <span className="text-[11px] text-slate-400 font-mono">Avg Order Value: ${roasMetrics.aov}</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. HTML Signature Builder */}
      {activeTab === 'signature' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={sigName}
                onChange={(e) => setSigName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Job Title</label>
              <input
                type="text"
                value={sigRole}
                onChange={(e) => setSigRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Company</label>
              <input
                type="text"
                value={sigCompany}
                onChange={(e) => setSigCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <input
                type="email"
                value={sigEmail}
                onChange={(e) => setSigEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Phone Number</label>
              <input
                type="text"
                value={sigPhone}
                onChange={(e) => setSigPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Website URL</label>
              <input
                type="text"
                value={sigWebsite}
                onChange={(e) => setSigWebsite(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Live Preview */}
          <div className="p-6 bg-white rounded-2xl shadow-md space-y-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Live Email Signature Preview</span>
            <div dangerouslySetInnerHTML={{ __html: signatureHtml }} />
          </div>

          {/* Action Copy Code */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => copy(signatureHtml, 'sigHtml')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
            >
              {copiedText === 'sigHtml' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedText === 'sigHtml' ? t('copied') : 'Copy HTML Signature Code'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
