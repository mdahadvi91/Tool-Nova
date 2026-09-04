import React, { useState } from 'react';
import { Search, Globe, Share2, Copy, Check, Download, ShieldCheck, Smartphone, Monitor } from 'lucide-react';
import { downloadText } from '../../utils/download';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';

export const SeoSerpStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'serp' | 'opengraph' | 'robotstxt'>('serp');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Metadata State
  const [title, setTitle] = useState('ToolNova — All Your Tools. One Powerful Platform.');
  const [description, setDescription] = useState(
    'High-performance, privacy-first online utility platform featuring 35 dedicated workspaces for PDF, QR & Barcode, Image Editing, Business Cards, Converters, Calculators, and Security utilities.'
  );
  const [url, setUrl] = useState('https://toolnova-pied.vercel.app');
  const [ogImage, setOgImage] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop');

  // Robots.txt generator state
  const [allowAll, setAllowAll] = useState(true);
  const [disallowPaths, setDisallowPaths] = useState('/api/\n/admin/');
  const [sitemapUrl, setSitemapUrl] = useState('https://toolnova-pied.vercel.app/sitemap.xml');

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    void copyTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const robotsTxtOutput = `User-agent: *\n${allowAll ? 'Allow: /\n' : ''}${disallowPaths
    .split('\n')
    .filter(Boolean)
    .map((p) => `Disallow: ${p.trim()}`)
    .join('\n')}\n\nSitemap: ${sitemapUrl}`;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            SEO SERP & OpenGraph Social Preview Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Simulate Google search engine results and social media cards with live character and pixel width meters.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('serp')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'serp'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Search className="w-4 h-4" />
          Google SERP Preview
        </button>
        <button
          onClick={() => setActiveTab('opengraph')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'opengraph'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" />
          Social OpenGraph Card
        </button>
        <button
          onClick={() => setActiveTab('robotstxt')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'robotstxt'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          Robots.txt Generator
        </button>
      </div>

      {activeTab === 'serp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metadata Controls */}
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-300">Page Title</label>
                <span className={`font-mono ${title.length > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {title.length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-slate-300">Meta Description</label>
                <span className={`font-mono ${description.length > 160 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {description.length} / 160 chars
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Canonical Target URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  previewDevice === 'desktop' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Desktop Snippet
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                  previewDevice === 'mobile' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Mobile Snippet
              </button>
            </div>
          </div>

          {/* Google SERP Simulated Card */}
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Simulated Google Snippet
            </span>

            <div className="p-5 bg-white rounded-xl shadow-xl space-y-1.5 max-w-lg">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                  T
                </div>
                <span className="text-[13px] text-[#202124]">{url.replace(/https?:\/\//, '').split('/')[0]}</span>
                <span className="text-slate-400">› tool › studio</span>
              </div>

              <h4 className="text-[19px] leading-snug font-medium text-[#1a0dab] hover:underline cursor-pointer">
                {title || 'Untitiled Document'}
              </h4>

              <p className="text-[14px] leading-normal text-[#4d5156] line-clamp-2">
                {description || 'No meta description provided for this snippet.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'opengraph' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">OG Image URL</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">OG Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">OG Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col justify-center space-y-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Social Card Preview (Twitter / LinkedIn / Discord)
            </span>
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900 max-w-md shadow-2xl">
              <img src={ogImage} alt="Social Card Preview" className="w-full h-44 object-cover" />
              <div className="p-3.5 space-y-1">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  {url.replace(/https?:\/\//, '').split('/')[0]}
                </span>
                <h5 className="text-sm font-bold text-white leading-tight line-clamp-1">{title}</h5>
                <p className="text-xs text-slate-400 line-clamp-2">{description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'robotstxt' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allow-all"
                checked={allowAll}
                onChange={(e) => setAllowAll(e.target.checked)}
                className="accent-cyan-500 w-4 h-4 rounded"
              />
              <label htmlFor="allow-all" className="text-xs font-semibold text-white">
                Allow All Crawlers by default (Allow: /)
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Disallow Paths (One per line)</label>
              <textarea
                value={disallowPaths}
                onChange={(e) => setDisallowPaths(e.target.value)}
                rows={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Sitemap Directive URL</label>
              <input
                type="text"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Compiled robots.txt
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(robotsTxtOutput)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
                <button
                  onClick={() => downloadText(robotsTxtOutput, 'robots.txt', 'text/plain')}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={robotsTxtOutput}
              rows={8}
              className="w-full flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
