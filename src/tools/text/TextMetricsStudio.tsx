import React, { useState, useMemo } from 'react';
import { Type, Copy, Check, Clock, Mic, Sparkles } from 'lucide-react';

export const TextMetricsStudio: React.FC = () => {
  const [text, setText] = useState(
    'ToolNova is a global multi-tool cloud platform designed for modern professionals, engineers, architects, and designers. All utilities execute locally in your web browser with 100% data privacy.'
  );
  const [copied, setCopied] = useState(false);

  const metrics = useMemo(() => {
    const trimmed = text.trim();
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;

    const wordsArray = trimmed ? trimmed.match(/\b[\w'-]+\b/gu) || [] : [];
    const words = wordsArray.length;

    const sentences = trimmed ? (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || 1 : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

    // Reading time (approx 200 WPM)
    const readMinutes = (words / 200).toFixed(1);
    // Speaking time (approx 130 WPM)
    const speakMinutes = (words / 130).toFixed(1);

    // Top keyword frequencies (length > 3)
    const freqMap: Record<string, number> = {};
    for (const w of wordsArray) {
      const lower = w.toLowerCase();
      if (lower.length > 3) {
        freqMap[lower] = (freqMap[lower] || 0) + 1;
      }
    }
    const topKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readMinutes,
      speakMinutes,
      topKeywords,
    };
  }, [text]);

  // Case transforms
  const transformCase = (type: 'upper' | 'lower' | 'title' | 'camel' | 'kebab') => {
    if (!text) return;
    if (type === 'upper') {
      setText(text.toUpperCase());
    } else if (type === 'lower') {
      setText(text.toLowerCase());
    } else if (type === 'title') {
      setText(
        text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      );
    } else if (type === 'camel') {
      const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
      const camel = words.map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))).join('');
      setText(camel);
    } else if (type === 'kebab') {
      const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
      setText(words.join('-'));
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Text Metrics & Word Counter Studio</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Live NLP Analysis
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Real-time word counts, reading speeds, and case transformation</p>
        </div>

        <button
          onClick={copyText}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Text'}</span>
        </button>
      </div>

      {/* Metrics Banner Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">Words</span>
          <span className="text-2xl font-bold text-cyan-400 font-mono">{metrics.words}</span>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">Characters</span>
          <span className="text-2xl font-bold text-slate-200 font-mono">{metrics.characters}</span>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">No Spaces</span>
          <span className="text-2xl font-bold text-slate-200 font-mono">{metrics.charactersNoSpaces}</span>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">Sentences</span>
          <span className="text-2xl font-bold text-purple-400 font-mono">{metrics.sentences}</span>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">Read Time</span>
          <span className="text-2xl font-bold text-emerald-400 font-mono">{metrics.readMinutes}m</span>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-center">
          <span className="text-[11px] uppercase font-semibold text-slate-400 block">Speech Time</span>
          <span className="text-2xl font-bold text-amber-400 font-mono">{metrics.speakMinutes}m</span>
        </div>
      </div>

      {/* Case Transformer Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-slate-400 mr-2">Transform:</span>
        <button
          onClick={() => transformCase('upper')}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
        >
          UPPERCASE
        </button>
        <button
          onClick={() => transformCase('lower')}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
        >
          lowercase
        </button>
        <button
          onClick={() => transformCase('title')}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
        >
          Title Case
        </button>
        <button
          onClick={() => transformCase('camel')}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
        >
          camelCase
        </button>
        <button
          onClick={() => transformCase('kebab')}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700"
        >
          kebab-case
        </button>
        <button
          onClick={() => setText('')}
          className="px-2.5 py-1 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg ml-auto"
        >
          Clear
        </button>
      </div>

      {/* Text Area */}
      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type, paste, or draft your text here..."
        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 leading-relaxed focus:outline-none focus:border-cyan-500 shadow-inner"
      />

      {/* Keyword Frequency Breakdown */}
      {metrics.topKeywords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
            Top Keyword Frequencies
          </span>
          <div className="flex flex-wrap gap-2">
            {metrics.topKeywords.map(([kw, count]) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
              >
                <span>{kw}</span>
                <span className="text-cyan-400 font-mono font-semibold">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
