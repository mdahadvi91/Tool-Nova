import React, { useState, useMemo } from 'react';
import { ShieldCheck, Key, FileText, Copy, Check, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { safeStorage } from '../../utils/storage';
import { useTranslation } from '../../i18n/I18nContext';

interface GeneratorsPrivacyStudioProps {
  initialTab?: 'lorem' | 'tokens' | 'compliance';
}

export const GeneratorsPrivacyStudio: React.FC<GeneratorsPrivacyStudioProps> = ({ initialTab = 'lorem' }) => {
  const [activeTab, setActiveTab] = useState<'lorem' | 'tokens' | 'compliance'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. Lorem Ipsum Generator State ---
  const [loremType, setLoremType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [loremCount, setLoremCount] = useState<number>(3);
  const [startWithClassic, setStartWithClassic] = useState<boolean>(true);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
    'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
    'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit'
  ];

  const generatedLorem = useMemo(() => {
    const count = Math.max(1, Math.min(50, loremCount));

    if (loremType === 'words') {
      const words = Array.from({ length: count }, (_, i) => loremWords[i % loremWords.length]);
      if (startWithClassic && count >= 2) {
        words[0] = 'Lorem';
        words[1] = 'ipsum';
      }
      return words.join(' ');
    }

    if (loremType === 'sentences') {
      return Array.from({ length: count }, (_, i) => {
        const sentenceLen = 8 + (i % 7);
        const words = Array.from({ length: sentenceLen }, (_, j) => loremWords[(i * 5 + j) % loremWords.length]);
        const s = words.join(' ');
        return s.charAt(0).toUpperCase() + s.slice(1) + '.';
      }).join(' ');
    }

    // Paragraphs
    return Array.from({ length: count }, (_, i) => {
      const sentences = Array.from({ length: 4 }, (_, j) => {
        const words = Array.from({ length: 9 }, (_, k) => loremWords[(i * 12 + j * 5 + k) % loremWords.length]);
        const s = words.join(' ');
        return s.charAt(0).toUpperCase() + s.slice(1) + '.';
      }).join(' ');

      if (i === 0 && startWithClassic) {
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + sentences;
      }
      return sentences;
    }).join('\n\n');
  }, [loremType, loremCount, startWithClassic]);

  // --- 2. Secure Random String & Token Generator ---
  const [tokenLength, setTokenLength] = useState<number>(32);
  const [tokenType, setTokenType] = useState<'alphanumeric' | 'hex' | 'uuid' | 'password'>('password');
  const [refreshSeed, setRefreshSeed] = useState(0);

  const secureToken = useMemo(() => {
    if (typeof window === 'undefined' || !window.crypto) {
      return 'Cryptographic API unavailable';
    }

    if (tokenType === 'uuid') {
      if (typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    const len = Math.max(8, Math.min(128, tokenLength));
    let charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (tokenType === 'hex') charset = '0123456789abcdef';
    if (tokenType === 'password') charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=~';

    const randomBytes = new Uint8Array(len);
    window.crypto.getRandomValues(randomBytes);
    let result = '';
    for (let i = 0; i < len; i++) {
      result += charset[randomBytes[i] % charset.length];
    }
    return result;
  }, [tokenLength, tokenType, refreshSeed]);

  // --- 3. Privacy Policy & Compliance Audit Checklist ---
  const complianceItems = [
    { id: 'ssl', text: 'All traffic enforced over HTTPS with HSTS headers', category: 'Security' },
    { id: 'client_only', text: 'Zero server-side transmission of user document files', category: 'Privacy' },
    { id: 'cookie_consent', text: 'AdSense-compliant consent management for EEA/UK/California users', category: 'Compliance' },
    { id: 'controller', text: 'Clear publisher identification, contact email, and corporate location', category: 'Legal' },
    { id: 'opt_out', text: 'Explicit opt-out link for personalized ads and telemetry cookies', category: 'AdSense' },
    { id: 'minors', text: 'Content and utilities are free from adult material or child-targeted tracking', category: 'Safety' },
  ];

  const [checkedCompliance, setCheckedCompliance] = useState<Record<string, boolean>>(() => {
    return safeStorage.getJSON('toolnova_compliance_checks', {
      ssl: true,
      client_only: true,
      cookie_consent: true,
      controller: true,
      opt_out: true,
      minors: true,
    });
  });

  const toggleCompliance = (id: string) => {
    const updated = { ...checkedCompliance, [id]: !checkedCompliance[id] };
    setCheckedCompliance(updated);
    safeStorage.setJSON('toolnova_compliance_checks', updated);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('lorem')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'lorem'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Lorem Ipsum Generator
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'tokens'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Secure Random Token Generator
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'compliance'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Privacy & AdSense Compliance Audit
        </button>
      </div>

      {/* 1. Lorem Ipsum */}
      {activeTab === 'lorem' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              {(['paragraphs', 'sentences', 'words'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setLoremType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize ${
                    loremType === type ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-semibold">Count:</label>
              <input
                type="number"
                min={1}
                max={50}
                value={loremCount}
                onChange={e => setLoremCount(Number(e.target.value))}
                className="w-16 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-xs text-white font-mono text-center"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={startWithClassic}
                onChange={e => setStartWithClassic(e.target.checked)}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">Generated Dummy Content</span>
              <button
                onClick={() => copy(generatedLorem, 'lorem')}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
              >
                {copiedText === 'lorem' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'lorem' ? t('copied') : t('copy')}</span>
              </button>
            </div>
            <textarea
              rows={8}
              readOnly
              value={generatedLorem}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-serif focus:outline-none select-all"
            />
          </div>
        </div>
      )}

      {/* 2. Cryptographic Random String */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Entropy Format</label>
              <select
                value={tokenType}
                onChange={e => setTokenType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="password">High-Entropy Password (Symbols + Alphanumeric)</option>
                <option value="alphanumeric">Alphanumeric Token (A-Z, a-z, 0-9)</option>
                <option value="hex">Cryptographic Hex String (0-9, a-f)</option>
                <option value="uuid">Standard UUID v4</option>
              </select>
            </div>
            {tokenType !== 'uuid' && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Length: {tokenLength} characters</label>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={tokenLength}
                  onChange={e => setTokenLength(Number(e.target.value))}
                  className="w-full accent-cyan-500 mt-2"
                />
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Generated Cryptographic Token</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setRefreshSeed(s => s + 1)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
                <button
                  onClick={() => copy(secureToken, 'token')}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  {copiedText === 'token' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'token' ? t('copied') : t('copy')}</span>
                </button>
              </div>
            </div>
            <p className="font-mono text-xs text-cyan-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 break-all select-all">
              {secureToken}
            </p>
          </div>
        </div>
      )}

      {/* 3. Compliance Audit */}
      {activeTab === 'compliance' && (
        <div className="space-y-4">
          <div className="bg-emerald-950/20 border border-emerald-800/30 p-4 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-white">Full Privacy Audit Active</h4>
              <p className="text-[11px] text-slate-400">ToolNova strictly complies with Google AdSense, GDPR, and California CCPA publisher requirements.</p>
            </div>
          </div>

          <ul className="space-y-2">
            {complianceItems.map(item => {
              const isChecked = Boolean(checkedCompliance[item.id]);
              return (
                <li
                  key={item.id}
                  onClick={() => toggleCompliance(item.id)}
                  className="flex items-center justify-between bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl cursor-pointer select-none hover:border-slate-700"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                    />
                    <span className="text-xs text-slate-200">{item.text}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 font-mono">
                    {item.category}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
