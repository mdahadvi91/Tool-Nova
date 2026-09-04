import React, { useState, useMemo } from 'react';
import { Brackets, Check, Copy, Sparkles, AlertCircle } from 'lucide-react';

export const RegexStudio: React.FC = () => {
  const [pattern, setPattern] = useState('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testString, setTestString] = useState(
    'Contact our team at support@zenithtools.cloud or security@zenithtools.cloud for inquiries.'
  );
  const [replacePattern, setReplacePattern] = useState('[REDACTED EMAIL]');

  const flagString = useMemo(() => {
    let f = '';
    if (flags.g) f += 'g';
    if (flags.i) f += 'i';
    if (flags.m) f += 'm';
    if (flags.s) f += 's';
    return f;
  }, [flags]);

  const regexEvaluation = useMemo(() => {
    try {
      const reg = new RegExp(pattern, flagString);
      const matches: { match: string; index: number; groups: string[] }[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        let limit = 500;
        while ((m = reg.exec(testString)) !== null && limit-- > 0) {
          matches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (m[0].length === 0) reg.lastIndex++;
        }
      } else {
        const m = reg.exec(testString);
        if (m) {
          matches.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }

      const replacedText = testString.replace(new RegExp(pattern, flagString), replacePattern);

      return {
        isValid: true,
        error: null,
        matches,
        replacedText,
      };
    } catch (err: any) {
      return {
        isValid: false,
        error: err.message || 'Invalid regular expression syntax',
        matches: [],
        replacedText: testString,
      };
    }
  }, [pattern, flagString, testString, replacePattern]);

  const loadPreset = (p: string, f = 'gi') => {
    setPattern(p);
    setFlags({
      g: f.includes('g'),
      i: f.includes('i'),
      m: f.includes('m'),
      s: f.includes('s'),
    });
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Interactive Regex Studio</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ECMAScript Sandbox
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Live pattern evaluation, capture group extraction, and replacement sandbox</p>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Presets:</span>
          <button
            onClick={() => loadPreset('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            Email
          </button>
          <button
            onClick={() => loadPreset('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            URL
          </button>
          <button
            onClick={() => loadPreset('\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            IPv4
          </button>
          <button
            onClick={() => loadPreset('#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})')}
            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            Hex Color
          </button>
        </div>
      </div>

      {/* Regex Pattern Input & Flags */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono text-lg select-none">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regular expression pattern..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 font-mono focus:border-cyan-400 focus:outline-none"
          />
          <span className="text-slate-500 font-mono text-lg select-none">/{flagString}</span>
        </div>

        {/* Flag Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <span className="text-xs text-slate-400 font-semibold uppercase">Flags:</span>
          {(['g', 'i', 'm', 's'] as const).map((flag) => (
            <label key={flag} className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={flags[flag]}
                onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                className="rounded border-slate-700"
              />
              <span className="font-mono">
                {flag} ({flag === 'g' ? 'global' : flag === 'i' ? 'ignore case' : flag === 'm' ? 'multiline' : 'dotAll'})
              </span>
            </label>
          ))}
        </div>
      </div>

      {regexEvaluation.error && (
        <div className="mb-6 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="font-mono">{regexEvaluation.error}</span>
        </div>
      )}

      {/* Test String Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Test String
          </label>
          <textarea
            rows={6}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Replace Simulation
          </label>
          <input
            type="text"
            value={replacePattern}
            onChange={(e) => setReplacePattern(e.target.value)}
            placeholder="Replacement string (e.g. $1 or [MASKED])"
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono mb-2"
          />
          <textarea
            readOnly
            rows={4}
            value={regexEvaluation.replacedText}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-emerald-400 font-mono focus:outline-none"
          />
        </div>
      </div>

      {/* Matches & Capture Groups Table */}
      <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Detected Matches ({regexEvaluation.matches.length})
          </span>
        </div>

        {regexEvaluation.matches.length > 0 ? (
          <div className="max-h-56 overflow-y-auto pr-1">
            <table className="w-full text-xs text-left">
              <thead className="text-[11px] text-slate-400 border-b border-slate-800 sticky top-0 bg-slate-950">
                <tr>
                  <th className="py-2">Index</th>
                  <th className="py-2">Full Match</th>
                  <th className="py-2">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                {regexEvaluation.matches.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/50">
                    <td className="py-2 text-slate-500">#{item.index}</td>
                    <td className="py-2 text-cyan-300 font-semibold">{item.match}</td>
                    <td className="py-2 text-purple-300">
                      {item.groups.length > 0 ? item.groups.join(' | ') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 text-center py-4">No regex matches found in test string.</p>
        )}
      </div>
    </div>
  );
};
