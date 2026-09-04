import React, { useState, useMemo } from 'react';
import { Link2, Copy, Check, ExternalLink, RotateCcw, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface UrlToolsStudioProps {
  initialTab?: 'parser' | 'utm' | 'encoder';
}

export const UrlToolsStudio: React.FC<UrlToolsStudioProps> = ({ initialTab = 'parser' }) => {
  const [activeTab, setActiveTab] = useState<'parser' | 'utm' | 'encoder'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. URL Parser State ---
  const [inputUrl, setInputUrl] = useState('https://toolnova.app/search?q=pdf+converter&category=documents&sort=popular#results');

  const parsedUrl = useMemo(() => {
    try {
      const urlObj = new URL(inputUrl);
      const searchParams = Array.from(urlObj.searchParams.entries()).map(([key, val]) => ({ key, val }));
      return {
        isValid: true,
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port || (urlObj.protocol === 'https:' ? '443 (default)' : '80 (default)'),
        pathname: urlObj.pathname,
        search: urlObj.search,
        hash: urlObj.hash,
        params: searchParams
      };
    } catch {
      return { isValid: false, params: [] };
    }
  }, [inputUrl]);

  // --- 2. UTM Builder State ---
  const [baseUrl, setBaseUrl] = useState('https://toolnova.app/tool/qr-barcode-studio');
  const [utmSource, setUtmSource] = useState('newsletter');
  const [utmMedium, setUtmMedium] = useState('email');
  const [utmCampaign, setUtmCampaign] = useState('launch_promo');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('header_cta');

  const generatedUtmUrl = useMemo(() => {
    try {
      const url = new URL(baseUrl);
      if (utmSource.trim()) url.searchParams.set('utm_source', utmSource.trim());
      if (utmMedium.trim()) url.searchParams.set('utm_medium', utmMedium.trim());
      if (utmCampaign.trim()) url.searchParams.set('utm_campaign', utmCampaign.trim());
      if (utmTerm.trim()) url.searchParams.set('utm_term', utmTerm.trim());
      if (utmContent.trim()) url.searchParams.set('utm_content', utmContent.trim());
      return url.toString();
    } catch {
      return 'Please enter a valid base URL (including https://)';
    }
  }, [baseUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]);

  // --- 3. URL Encoder / Decoder State ---
  const [codecInput, setCodecInput] = useState('Hello World & ToolNova = 100% Free / In-Browser?');
  const [codecMode, setCodecMode] = useState<'encode' | 'decode'>('encode');

  const codecResult = useMemo(() => {
    try {
      if (codecMode === 'encode') {
        return encodeURIComponent(codecInput);
      } else {
        return decodeURIComponent(codecInput);
      }
    } catch (e: any) {
      return `Error decoding: ${e.message}`;
    }
  }, [codecInput, codecMode]);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Mode Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('parser')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'parser'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          URL Parser & Inspector
        </button>
        <button
          onClick={() => setActiveTab('utm')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'utm'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          UTM Campaign Builder
        </button>
        <button
          onClick={() => setActiveTab('encoder')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'encoder'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          URL Encoder & Decoder
        </button>
      </div>

      {/* 1. URL Parser */}
      {activeTab === 'parser' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Target URL to Inspect</label>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example.com/path?key=value"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {!parsedUrl.isValid ? (
            <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl text-xs text-red-300">
              Invalid URL format. Please include standard protocol like <code className="font-mono">https://</code>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Protocol</span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">{parsedUrl.protocol}</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Hostname / Domain</span>
                  <span className="text-xs font-mono text-slate-200 font-semibold">{parsedUrl.hostname}</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Port</span>
                  <span className="text-xs font-mono text-slate-400">{parsedUrl.port}</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl sm:col-span-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Pathname</span>
                  <span className="text-xs font-mono text-slate-300">{parsedUrl.pathname}</span>
                </div>
                <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Hash / Fragment</span>
                  <span className="text-xs font-mono text-amber-400">{parsedUrl.hash || '(none)'}</span>
                </div>
              </div>

              {/* Query Parameters Table */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">
                    Query Parameters ({parsedUrl.params.length})
                  </h4>
                  <button
                    onClick={() => copy(JSON.stringify(Object.fromEntries(parsedUrl.params.map(p => [p.key, p.val])), null, 2), 'params')}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {copiedText === 'params' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>Export JSON</span>
                  </button>
                </div>

                {parsedUrl.params.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No query parameters found in this URL.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                          <th className="pb-2">Parameter Key</th>
                          <th className="pb-2">Decoded Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {parsedUrl.params.map((param, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/40">
                            <td className="py-2 text-cyan-300">{param.key}</td>
                            <td className="py-2 text-slate-300">{param.val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. UTM Campaign Builder */}
      {activeTab === 'utm' && (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Base Destination URL *</label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/landing-page"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Campaign Source (utm_source) *</label>
              <input
                type="text"
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="e.g. google, newsletter, twitter"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Campaign Medium (utm_medium) *</label>
              <input
                type="text"
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder="e.g. cpc, email, banner, social"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Campaign Name (utm_campaign) *</label>
              <input
                type="text"
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="e.g. spring_sale, product_launch"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Campaign Term (utm_term)</label>
              <input
                type="text"
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="Keywords for paid search (optional)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-medium text-slate-300">Campaign Content (utm_content)</label>
              <input
                type="text"
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="Differentiate ads or links e.g. logo_link vs text_cta (optional)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Generated URL Box */}
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Generated Campaign URL</span>
              <button
                onClick={() => copy(generatedUtmUrl, 'utm')}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedText === 'utm' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'utm' ? t('copied') : t('copy')}</span>
              </button>
            </div>
            <p className="font-mono text-xs text-cyan-300 break-all select-all bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
              {generatedUtmUrl}
            </p>
          </div>
        </div>
      )}

      {/* 3. URL Encoder / Decoder */}
      {activeTab === 'encoder' && (
        <div className="space-y-5">
          <div className="flex gap-2">
            <button
              onClick={() => setCodecMode('encode')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                codecMode === 'encode' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Encode (to %20 format)
            </button>
            <button
              onClick={() => setCodecMode('decode')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                codecMode === 'decode' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Decode (to plain text)
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Input String</label>
            <textarea
              rows={3}
              value={codecInput}
              onChange={(e) => setCodecInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Output Result</span>
              <button
                onClick={() => copy(codecResult, 'codec')}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedText === 'codec' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'codec' ? t('copied') : t('copy')}</span>
              </button>
            </div>
            <textarea
              rows={3}
              readOnly
              value={codecResult}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono select-all focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
