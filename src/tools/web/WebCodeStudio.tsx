import React, { useState } from 'react';
import { Code, Copy, Check, Download, Sparkles, Eye, ShieldCheck } from 'lucide-react';
import { downloadText } from '../../utils/download';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';

export const WebCodeStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'svg'>('html');
  const [copied, setCopied] = useState(false);

  // HTML state
  const [htmlInput, setHtmlInput] = useState(
    '<div class="container">\n  <!-- Header Section -->\n  <header>\n    <h1>ToolNova Web Studio</h1>\n  </header>\n</div>'
  );

  // CSS state
  const [cssInput, setCssInput] = useState(
    '/* ToolNova Button Styles */\n.btn-primary {\n  background-color: #06b6d4;\n  color: #ffffff;\n  padding: 8px 16px;\n  border-radius: 8px;\n}'
  );

  // SVG state
  const [svgInput, setSvgInput] = useState(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="#06b6d4" stroke="#38bdf8" stroke-width="4" />\n  <path d="M30 50 L45 65 L70 35" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />\n</svg>'
  );

  const copyToClipboard = (text: string) => {
    void copyTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Minify HTML
  const minifyHtml = (html: string): string => {
    return html
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/>\s+</g, '><') // remove spaces between tags
      .trim();
  };

  // Minify CSS
  const minifyCss = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // remove spaces around syntax
      .replace(/;}/g, '}') // remove trailing semicolons
      .trim();
  };

  // Clean SVG
  const cleanSvg = (svg: string): string => {
    return svg
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\?xml[\s\S]*?\?>/gi, '')
      .replace(/<!DOCTYPE[\s\S]*?>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Web Code Minifier, Formatter & SVG Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Optimize, clean, and compress HTML, CSS, and SVG code with instant live visual rendering.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('html')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'html'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          HTML Minifier
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'css'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          CSS Minifier
        </button>
        <button
          onClick={() => setActiveTab('svg')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'svg'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          SVG Cleaner & Viewer
        </button>
      </div>

      {activeTab === 'html' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">HTML Input</label>
              <span className="text-[11px] text-slate-500">{htmlInput.length} bytes</span>
            </div>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              rows={12}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
            />
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Minified HTML</label>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {minifyHtml(htmlInput).length} bytes (-
                  {htmlInput.length > 0
                    ? Math.round(((htmlInput.length - minifyHtml(htmlInput).length) / htmlInput.length) * 100)
                    : 0}
                  %)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(minifyHtml(htmlInput))}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
                <button
                  onClick={() => downloadText(minifyHtml(htmlInput), 'index.min.html', 'text/html')}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={minifyHtml(htmlInput)}
              rows={12}
              className="w-full flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 focus:outline-none resize-y"
            />
          </div>
        </div>
      )}

      {activeTab === 'css' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">CSS Input</label>
              <span className="text-[11px] text-slate-500">{cssInput.length} bytes</span>
            </div>
            <textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              rows={12}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
            />
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Minified CSS</label>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {minifyCss(cssInput).length} bytes (-
                  {cssInput.length > 0
                    ? Math.round(((cssInput.length - minifyCss(cssInput).length) / cssInput.length) * 100)
                    : 0}
                  %)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(minifyCss(cssInput))}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
                <button
                  onClick={() => downloadText(minifyCss(cssInput), 'styles.min.css', 'text/css')}
                  className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={minifyCss(cssInput)}
              rows={12}
              className="w-full flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 focus:outline-none resize-y"
            />
          </div>
        </div>
      )}

      {activeTab === 'svg' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">SVG Markup Input</label>
              <button
                onClick={() => copyToClipboard(cleanSvg(svgInput))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Clean SVG
              </button>
            </div>
            <textarea
              value={svgInput}
              onChange={(e) => setSvgInput(e.target.value)}
              rows={12}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
            />
          </div>

          <div className="space-y-3 flex flex-col">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Live Vector Rendering
            </label>
            <div
              className="w-full flex-1 min-h-[250px] bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex items-center justify-center overflow-hidden"
              dangerouslySetInnerHTML={{ __html: cleanSvg(svgInput) }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
