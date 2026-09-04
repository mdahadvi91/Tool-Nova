import React, { useState } from 'react';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';
import { FileText, Copy, Download, Check, Sparkles, RefreshCw, Code } from 'lucide-react';
import { downloadText } from '../../utils/download';

export const DocConverterStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'md-to-html' | 'html-to-md' | 'cleaner'>('md-to-html');
  const [copied, setCopied] = useState(false);

  // Markdown to HTML state
  const [markdownInput, setMarkdownInput] = useState(
    '# ToolNova Document Studio\n\nWelcome to the **fast**, client-side document processing engine.\n\n### Key Features:\n- 100% Private in-browser processing\n- Instant HTML generation\n- Export as clean `.html` files\n\n> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra\n\n```javascript\nconsole.log("Ready to build!");\n```'
  );

  // HTML to Markdown state
  const [htmlInput, setHtmlInput] = useState(
    '<h2>ToolNova Workspace</h2><p>Transform <strong>rich markup</strong> into lightweight Markdown.</p><ul><li>Zero server delay</li><li>Clean syntax output</li></ul>'
  );

  // Text Cleaner state
  const [cleanerInput, setCleanerInput] = useState(
    '   ToolNova    Text   Cleaner   \n\n\n\n   Removes   excessive   spaces,   fixes   casing,\nand strips dirty whitespace.   '
  );

  const copyToClipboard = (text: string) => {
    void copyTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe Markdown to HTML renderer
  const parseMarkdownToHtml = (md: string): string => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-white mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-white mt-6 mb-3">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-cyan-500 pl-4 py-1 italic text-slate-300 my-3 bg-slate-800/40 rounded-r">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-cyan-300">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic text-slate-200">$1</em>')
      .replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre class="bg-slate-950 p-4 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto my-3 border border-slate-800"><code>$2</code></pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-xs">$1</code>')
      .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-300 mb-1">$1</li>')
      .replace(/\n\n+/g, '</p><p class="text-slate-300 my-2 leading-relaxed">');

    return `<div class="prose prose-invert max-w-none"><p class="text-slate-300 my-2 leading-relaxed">${html}</p></div>`;
  };

  // HTML to Markdown converter
  const parseHtmlToMarkdown = (html: string): string => {
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<ul[^>]*>|<\/ul>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  // Text cleaner
  const cleanText = (text: string, mode: 'normalize' | 'trim-lines' | 'strip-tags'): string => {
    if (mode === 'normalize') {
      return text
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }
    if (mode === 'trim-lines') {
      return text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n');
    }
    if (mode === 'strip-tags') {
      return text.replace(/<[^>]*>/g, '');
    }
    return text;
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Sub-navigation tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('md-to-html')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'md-to-html'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Markdown to HTML
        </button>
        <button
          onClick={() => setActiveTab('html-to-md')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'html-to-md'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" />
          HTML to Markdown
        </button>
        <button
          onClick={() => setActiveTab('cleaner')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'cleaner'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Text Cleaner & Formatter
        </button>
      </div>

      {activeTab === 'md-to-html' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Markdown Source Input
              </label>
              <span className="text-[11px] text-slate-500">{markdownInput.length} chars</span>
            </div>
            <textarea
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              rows={14}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
              placeholder="Type or paste Markdown content..."
            />
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Live Rendered HTML Preview
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(parseMarkdownToHtml(markdownInput))}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy HTML
                </button>
                <button
                  onClick={() =>
                    downloadText(
                      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Document</title></head><body style="font-family:sans-serif;max-width:800px;margin:40px auto;line-height:1.6;color:#333;">${parseMarkdownToHtml(
                        markdownInput
                      )}</body></html>`,
                      'toolnova-document.html',
                      'text/html'
                    )
                  }
                  className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export .html
                </button>
              </div>
            </div>
            <div
              className="w-full flex-1 min-h-[300px] bg-slate-950/80 border border-slate-800 rounded-xl p-5 overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(markdownInput) }}
            />
          </div>
        </div>
      )}

      {activeTab === 'html-to-md' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                HTML Source Input
              </label>
              <span className="text-[11px] text-slate-500">{htmlInput.length} chars</span>
            </div>
            <textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              rows={14}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
              placeholder="Paste raw HTML here..."
            />
          </div>

          <div className="space-y-3 flex flex-col">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Converted Markdown Output
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(parseHtmlToMarkdown(htmlInput))}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy MD
                </button>
                <button
                  onClick={() => downloadText(parseHtmlToMarkdown(htmlInput), 'toolnova-converted.md', 'text/markdown')}
                  className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export .md
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={parseHtmlToMarkdown(htmlInput)}
              rows={14}
              className="w-full flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-300 focus:outline-none resize-y"
            />
          </div>
        </div>
      )}

      {activeTab === 'cleaner' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Dirty Text Input
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCleanerInput(cleanText(cleanerInput, 'normalize'))}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30"
                >
                  Normalize Whitespace
                </button>
                <button
                  onClick={() => setCleanerInput(cleanText(cleanerInput, 'trim-lines'))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Trim Empty Lines
                </button>
                <button
                  onClick={() => setCleanerInput(cleanText(cleanerInput, 'strip-tags'))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Strip HTML Tags
                </button>
              </div>
            </div>
            <textarea
              value={cleanerInput}
              onChange={(e) => setCleanerInput(e.target.value)}
              rows={10}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
        </div>
      )}
    </div>
  );
};
