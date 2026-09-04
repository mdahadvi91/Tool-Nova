import React, { useState, useMemo } from 'react';
import { BookOpen, Sparkles, CheckCircle2, ShieldCheck, BarChart3, AlertCircle } from 'lucide-react';

export const TextReadabilityStudio: React.FC = () => {
  const [text, setText] = useState<string>(
    'ToolNova is an open, high-performance platform providing client-side developer, document, and media utilities. All tools process information directly on your local machine without transmitting confidential data across the network. This architecture guarantees speed, security, and absolute user privacy.'
  );

  // Helper: Count syllables in a word
  const countSyllables = (word: string): number => {
    word = word.toLowerCase().trim();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? Math.max(1, matches.length) : 1;
  };

  const metrics = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        words: 0,
        sentences: 0,
        syllables: 0,
        complexWords: 0,
        characters: 0,
        fleschEase: 0,
        fleschKincaid: 0,
        gunningFog: 0,
        colemanLiau: 0,
        readingTimeMin: 0
      };
    }

    const wordsArr: string[] = trimmed.match(/\b[a-zA-Z0-9'-]+\b/g) || [];
    const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+(\s|$)/g);
    const sentences = sentenceMatches ? sentenceMatches.length : trimmed.split('\n').filter(Boolean).length || 1;
    const wordsCount = Math.max(1, wordsArr.length);

    let totalSyllables = 0;
    let complexWordsCount = 0;
    let totalLetters = 0;

    wordsArr.forEach((w) => {
      const syl = countSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) complexWordsCount++;
      totalLetters += w.replace(/[^a-zA-Z]/g, '').length;
    });

    const wordsPerSentence = wordsCount / sentences;
    const syllablesPerWord = totalSyllables / wordsCount;

    // Flesch Reading Ease: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
    const fleschEase = Math.max(0, Math.min(100, 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord));

    // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    const fleschKincaid = Math.max(0, 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59);

    // Gunning Fog Index: 0.4 * ((words/sentences) + 100 * (complexWords/words))
    const gunningFog = 0.4 * (wordsPerSentence + 100 * (complexWordsCount / wordsCount));

    // Coleman-Liau Index: 0.0588 * L - 0.296 * S - 15.8 (L = letters/100 words, S = sentences/100 words)
    const L = (totalLetters / wordsCount) * 100;
    const S = (sentences / wordsCount) * 100;
    const colemanLiau = Math.max(0, 0.0588 * L - 0.296 * S - 15.8);

    return {
      words: wordsCount,
      sentences,
      syllables: totalSyllables,
      complexWords: complexWordsCount,
      characters: trimmed.length,
      fleschEase: Math.round(fleschEase * 10) / 10,
      fleschKincaid: Math.round(fleschKincaid * 10) / 10,
      gunningFog: Math.round(gunningFog * 10) / 10,
      colemanLiau: Math.round(colemanLiau * 10) / 10,
      readingTimeMin: Math.ceil(wordsCount / 220)
    };
  }, [text]);

  const getFleschInterpretation = (score: number) => {
    if (score >= 90) return { label: 'Very Easy (5th Grade)', color: 'text-emerald-400' };
    if (score >= 80) return { label: 'Easy (6th Grade)', color: 'text-emerald-400' };
    if (score >= 70) return { label: 'Fairly Easy (7th Grade)', color: 'text-cyan-400' };
    if (score >= 60) return { label: 'Standard Plain English (8th-9th)', color: 'text-cyan-400' };
    if (score >= 50) return { label: 'Fairly Difficult (High School)', color: 'text-amber-400' };
    if (score >= 30) return { label: 'Difficult (College)', color: 'text-orange-400' };
    return { label: 'Very Confusing (Graduate / Legal)', color: 'text-rose-400' };
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            Deterministic Text Readability & Linguistic Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculates Flesch-Kincaid, Gunning Fog, and Coleman-Liau readability indexes via 100% deterministic local algorithms.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Deterministic Client Computation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Text to Analyze
            </label>
            <span className="text-[11px] text-slate-500">{metrics.words} words • ~{metrics.readingTimeMin} min read</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-y"
            placeholder="Paste your essay, article, or documentation here..."
          />
        </div>

        {/* Scores Panel */}
        <div className="space-y-4">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Readability Scores
            </h4>

            <div className="space-y-3">
              {/* Flesch Reading Ease */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Flesch Reading Ease</span>
                  <span className="text-lg font-extrabold text-cyan-400 font-mono">{metrics.fleschEase}</span>
                </div>
                <span className={`text-[11px] font-semibold ${getFleschInterpretation(metrics.fleschEase).color}`}>
                  {getFleschInterpretation(metrics.fleschEase).label}
                </span>
              </div>

              {/* Flesch-Kincaid */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Flesch-Kincaid Grade</span>
                  <span className="text-sm font-bold text-white font-mono">Grade {metrics.fleschKincaid}</span>
                </div>
                <p className="text-[11px] text-slate-500">Estimated U.S. school reading grade level</p>
              </div>

              {/* Gunning Fog */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Gunning Fog Index</span>
                  <span className="text-sm font-bold text-white font-mono">{metrics.gunningFog}</span>
                </div>
                <p className="text-[11px] text-slate-500">Formal education years required to understand</p>
              </div>

              {/* Coleman-Liau */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Coleman-Liau Index</span>
                  <span className="text-sm font-bold text-white font-mono">{metrics.colemanLiau}</span>
                </div>
                <p className="text-[11px] text-slate-500">Letter & sentence length based grade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
