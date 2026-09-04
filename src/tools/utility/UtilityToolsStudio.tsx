import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Download, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { downloadText } from '../../utils/download';
import { copyToClipboard } from '../../utils/clipboard';

interface UtilityToolsStudioProps {
  toolId: string;
}

const VERBS = [
  'accelerated',
  'architected',
  'automated',
  'collaborated',
  'coordinated',
  'delivered',
  'designed',
  'developed',
  'directed',
  'improved',
  'launched',
  'optimized',
  'orchestrated',
  'reduced',
  'scaled',
  'streamlined',
];

const PLUGS: Record<string, string> = {
  australia: 'Type I · 230V · 50Hz',
  brazil: 'Type N · 127/220V · 60Hz',
  canada: 'Type A/B · 120V · 60Hz',
  china: 'Type A/C/I · 220V · 50Hz',
  france: 'Type C/E · 230V · 50Hz',
  germany: 'Type C/F · 230V · 50Hz',
  india: 'Type C/D/M · 230V · 50Hz',
  japan: 'Type A/B · 100V · 50/60Hz',
  singapore: 'Type G · 230V · 50Hz',
  spain: 'Type C/F · 230V · 50Hz',
  uae: 'Type G · 230V · 50Hz',
  uk: 'Type G · 230V · 50Hz',
  'united kingdom': 'Type G · 230V · 50Hz',
  usa: 'Type A/B · 120V · 60Hz',
  'united states': 'Type A/B · 120V · 60Hz',
};

function parseCsv(value: string, separator = ','): string[][] {
  return value
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => line.split(separator).map((cell) => cell.trim().replace(/^"|"$/g, '')));
}

function secureRandom(length: number): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
  const bytes = new Uint32Array(Math.max(1, length));
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

function titleFor(toolId: string): string {
  return toolId
    .split('-')
    .map((part) => part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export const UtilityToolsStudio: React.FC<UtilityToolsStudioProps> = ({ toolId }) => {
  const title = titleFor(toolId);
  const storageKey = `toolnova-${toolId}`;
  const [input, setInput] = useState('');
  const [secondaryInput, setSecondaryInput] = useState('');
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const isScratchpad = toolId === 'private-scratchpad';
  const isChecklist = toolId === 'quick-checklist-tool' || toolId === 'travel-packing-checklist';

  useEffect(() => {
    if (!isScratchpad && !isChecklist) return;
    try {
      setInput(window.localStorage.getItem(storageKey) || '');
    } catch {
      // The utility remains usable when storage is blocked.
    }
  }, [isChecklist, isScratchpad, storageKey]);

  useEffect(() => {
    if (!isScratchpad && !isChecklist) return;
    try {
      window.localStorage.setItem(storageKey, input);
    } catch {
      // Persistence is optional and must not break editing.
    }
  }, [input, isChecklist, isScratchpad, storageKey]);

  const placeholder = useMemo(() => {
    if (toolId.includes('csv') || toolId.includes('tsv')) return 'name,amount,status\\nAda,42,ready';
    if (toolId.includes('url') || toolId.includes('utm')) return 'https://example.com/landing';
    if (toolId.includes('resume') || toolId.includes('ats')) return 'Paste text or keywords here…';
    if (isChecklist) return 'Add one item per line';
    return 'Enter text or values to process…';
  }, [isChecklist, toolId]);

  const process = () => {
    try {
      let output = '';
      if (toolId === 'url-parser-builder') {
        const url = new URL(input);
        output = JSON.stringify(
          { protocol: url.protocol, host: url.host, pathname: url.pathname, query: Object.fromEntries(url.searchParams) },
          null,
          2,
        );
      } else if (toolId === 'utm-campaign-builder') {
        const url = new URL(input || 'https://example.com');
        const params = secondaryInput.split('&').map((item) => item.split('=').map((part) => part.trim()));
        params.filter(([key, value]) => key && value).forEach(([key, value]) => url.searchParams.set(key, value));
        output = url.toString();
      } else if (toolId === 'url-encoder-decoder') {
        output = (() => {
          try {
            return decodeURIComponent(input);
          } catch {
            return encodeURIComponent(input);
          }
        })();
      } else if (toolId === 'social-character-counter') {
        output = `Characters: ${input.length}\nWords: ${input.trim() ? input.trim().split(/\s+/).length : 0}\nX limit: ${input.length <= 280 ? 'within limit' : 'over limit'}`;
      } else if (toolId === 'social-dimension-guide') {
        output = 'Instagram post: 1080×1080\\nInstagram story: 1080×1920\\nLinkedIn post: 1200×627\\nYouTube thumbnail: 1280×720';
      } else if (toolId === 'hashtag-extractor') {
        output = Array.from(new Set(input.match(/#[\\p{L}\\p{N}_-]+/gu) || [])).join('\\n');
      } else if (toolId === 'email-subject-tester') {
        const length = input.length;
        output = `Length: ${length} characters\nScore: ${length >= 30 && length <= 60 ? 'strong' : 'review'}\nTip: Keep the clearest benefit near the beginning.`;
      } else if (toolId === 'roas-calculator') {
        const revenue = Number(input);
        const spend = Number(secondaryInput);
        output = Number.isFinite(revenue) && spend > 0 ? `ROAS: ${(revenue / spend).toFixed(2)}x` : 'Enter revenue first and ad spend second.';
      } else if (toolId === 'email-signature-generator') {
        output = `${input}\n${secondaryInput}\n\nToolNova`;
      } else if (toolId === 'resume-action-verbs') {
        const query = input.toLowerCase();
        output = VERBS.filter((verb) => !query || verb.includes(query)).join('\\n');
      } else if (toolId === 'salary-hourly-converter') {
        const salary = Number(input);
        const hours = Number(secondaryInput) || 40;
        output = Number.isFinite(salary) ? `Hourly: ${(salary / (52 * hours)).toFixed(2)}\nWeekly: ${(salary / 52).toFixed(2)}` : 'Enter an annual salary.';
      } else if (toolId === 'ats-keyword-scanner') {
        const keywords = secondaryInput.split(',').map((word) => word.trim()).filter(Boolean);
        const haystack = input.toLowerCase();
        output = keywords.map((keyword) => `${haystack.includes(keyword.toLowerCase()) ? '✓' : '○'} ${keyword}`).join('\\n');
      } else if (toolId === 'eisenhower-matrix-tool') {
        output = input.split(/\\r?\\n/).filter(Boolean).map((item) => `• ${item} — decide: urgent/important`).join('\\n');
      } else if (toolId === 'jet-lag-planner') {
        const zones = Number(input);
        output = Number.isFinite(zones) ? `For a ${Math.abs(zones)}-hour shift, gradually move sleep by about ${Math.max(1, Math.ceil(Math.abs(zones) / 2))} hour(s) per day.` : 'Enter the time-zone difference in hours.';
      } else if (toolId === 'plug-voltage-lookup') {
        output = PLUGS[input.trim().toLowerCase()] || 'Country not in the built-in table. Check the appliance label and a trusted travel reference.';
      } else if (toolId === 'csv-to-json-converter') {
        const rows = parseCsv(input);
        const [headers, ...data] = rows;
        output = JSON.stringify(data.map((row) => Object.fromEntries((headers || []).map((header, index) => [header, row[index] || '']))), null, 2);
      } else if (toolId === 'csv-table-inspector') {
        const rows = parseCsv(input);
        output = `Rows: ${Math.max(0, rows.length - 1)}\nColumns: ${rows[0]?.length || 0}\nHeaders: ${(rows[0] || []).join(', ')}`;
      } else if (toolId === 'tsv-csv-converter') {
        output = parseCsv(input, '\\t').map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')).join('\\n');
      } else if (toolId === 'lorem-ipsum-studio') {
        const count = Math.min(1000, Math.max(1, Number(input) || 25));
        const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit integer facilisis sapien'.split(' ');
        output = Array.from({ length: count }, (_, index) => words[index % words.length]).join(' ');
      } else if (toolId === 'secure-random-string-gen') {
        output = secureRandom(Math.min(256, Math.max(1, Number(input) || 32)));
      } else if (toolId === 'privacy-policy-checklist') {
        output = '☐ Identify what data is collected\\n☐ Explain purpose and retention\\n☐ Document third-party processors\\n☐ Explain user choices and contact method\\n☐ Review local legal requirements';
      } else if (toolId === 'private-scratchpad' || isChecklist || toolId === 'eisenhower-matrix-tool') {
        output = input;
      } else {
        output = input;
      }
      setResult(output);
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'Unable to process this input.');
    }
  };

  const copyResult = async () => {
    if (!result) return;
    if (await copyToClipboard(result)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/30 p-4 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white">{title}</h2>
          <p className="mt-1 text-xs text-slate-400">A focused browser utility. Your inputs stay on this device.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300" htmlFor={`${toolId}-input`}>
            Input
          </label>
          <textarea
            id={`${toolId}-input`}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={placeholder}
            rows={9}
            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {!['social-dimension-guide', 'hashtag-extractor', 'privacy-policy-checklist', 'lorem-ipsum-studio', 'secure-random-string-gen', 'resume-action-verbs', 'plug-voltage-lookup', 'jet-lag-planner'].includes(toolId) && (
            <>
              <label className="block text-xs font-semibold text-slate-300" htmlFor={`${toolId}-secondary`}>
                {toolId === 'ats-keyword-scanner' ? 'Keywords (comma separated)' : 'Optional second value'}
              </label>
              <input
                id={`${toolId}-secondary`}
                value={secondaryInput}
                onChange={(event) => setSecondaryInput(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 p-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </>
          )}
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={process} className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-500">
              <Check className="h-3.5 w-3.5" /> Process
            </button>
            <button type="button" onClick={() => { setInput(''); setSecondaryInput(''); setResult(''); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800">
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Result</span>
            <div className="flex gap-2">
              <button type="button" disabled={!result} onClick={copyResult} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-2.5 py-1.5 text-[11px] text-slate-300 disabled:cursor-not-allowed disabled:opacity-40">
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button type="button" disabled={!result} onClick={() => downloadText(result, `${toolId}.txt`, 'text/plain')} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-2.5 py-1.5 text-[11px] text-slate-300 disabled:cursor-not-allowed disabled:opacity-40">
                <Download className="h-3 w-3" /> Save
              </button>
            </div>
          </div>
          <pre className="min-h-[250px] whitespace-pre-wrap break-words rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm leading-relaxed text-slate-200">{result || 'Your processed result will appear here.'}</pre>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        No inputs are sent to a server.
      </div>
    </div>
  );
};