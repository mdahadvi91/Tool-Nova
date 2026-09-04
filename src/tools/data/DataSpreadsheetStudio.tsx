import React, { useState, useMemo } from 'react';
import { Table, FileText, ArrowRightLeft, Copy, Check, Download, Sparkles } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nContext';

interface DataSpreadsheetStudioProps {
  initialTab?: 'converter' | 'table' | 'delimiter';
}

export const DataSpreadsheetStudio: React.FC<DataSpreadsheetStudioProps> = ({ initialTab = 'converter' }) => {
  const [activeTab, setActiveTab] = useState<'converter' | 'table' | 'delimiter'>(initialTab);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { t } = useTranslation();

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // --- 1. CSV to JSON State ---
  const [csvInput, setCsvInput] = useState(`id,name,role,department,location
101,Amina Al-Mansoor,Senior Cloud Architect,Engineering,Dubai
102,Liam O'Connor,Frontend Lead,Design,Dublin
103,Priya Sharma,Data Scientist,Analytics,Bangalore
104,Mateo Hernandez,DevOps Specialist,Operations,Madrid`);

  const parsedJson = useMemo(() => {
    try {
      const lines = csvInput.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
      if (lines.length < 2) return [];

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const obj: Record<string, any> = {};
        headers.forEach((header, idx) => {
          const val = values[idx] !== undefined ? values[idx] : '';
          const num = Number(val);
          obj[header] = !isNaN(num) && val !== '' ? num : val;
        });
        return obj;
      });

      return rows;
    } catch {
      return [];
    }
  }, [csvInput]);

  const jsonString = useMemo(() => {
    return JSON.stringify(parsedJson, null, 2);
  }, [parsedJson]);

  // --- 2. Interactive Table Inspector State ---
  const [searchFilter, setSearchFilter] = useState('');

  const tableHeaders = useMemo(() => {
    if (parsedJson.length === 0) return [];
    return Object.keys(parsedJson[0]);
  }, [parsedJson]);

  const filteredRows = useMemo(() => {
    if (!searchFilter.trim()) return parsedJson;
    const q = searchFilter.toLowerCase();
    return parsedJson.filter(row =>
      Object.values(row).some(v => String(v).toLowerCase().includes(q))
    );
  }, [parsedJson, searchFilter]);

  // --- 3. Delimiter Swapper State ---
  const [delimiterInput, setDelimiterInput] = useState(`Name\tAge\tCountry\nJohn\t32\tUSA\nSarah\t28\tUK`);
  const [fromDelimiter, setFromDelimiter] = useState<'\t' | ',' | ';' | '|'>('\t');
  const [toDelimiter, setToDelimiter] = useState<'\t' | ',' | ';' | '|'>(',');

  const swappedDelimiterOutput = useMemo(() => {
    try {
      const lines = delimiterInput.split(/\r?\n/);
      return lines.map(line => {
        const parts = line.split(fromDelimiter);
        return parts.join(toDelimiter);
      }).join('\n');
    } catch {
      return delimiterInput;
    }
  }, [delimiterInput, fromDelimiter, toDelimiter]);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('converter')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'converter'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          CSV to JSON Converter
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'table'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          Interactive Table Grid
        </button>
        <button
          onClick={() => setActiveTab('delimiter')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'delimiter'
              ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
              : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
          }`}
        >
          TSV / CSV Delimiter Swapper
        </button>
      </div>

      {/* 1. CSV to JSON */}
      {activeTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="font-semibold text-slate-200">Input CSV Text</label>
              <span>{parsedJson.length} rows detected</span>
            </div>
            <textarea
              rows={12}
              value={csvInput}
              onChange={e => setCsvInput(e.target.value)}
              placeholder="Paste comma-separated data here..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">Output JSON</span>
              <div className="flex gap-2">
                <button
                  onClick={() => copy(jsonString, 'json')}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  {copiedText === 'json' ? <Check className="w-3 h-3 text-cyan-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'json' ? t('copied') : t('copy')}</span>
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([jsonString], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `data-${Date.now()}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <textarea
              rows={12}
              readOnly
              value={jsonString}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 2. Interactive Table */}
      {activeTab === 'table' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Search table rows..."
              className="max-w-xs bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <span className="text-xs text-slate-400 self-center">
              Showing {filteredRows.length} of {parsedJson.length} entries
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950">
                <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {tableHeaders.map(th => (
                    <th key={th} className="px-4 py-3">{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-950/40">
                    {tableHeaders.map(th => (
                      <td key={th} className="px-4 py-2.5 text-slate-200">
                        {String(row[th])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Delimiter Swapper */}
      {activeTab === 'delimiter' && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold uppercase">From Delimiter</label>
              <select
                value={fromDelimiter}
                onChange={e => setFromDelimiter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value={'\t'}>Tab (\t)</option>
                <option value={','}>Comma (,)</option>
                <option value={';'}>Semicolon (;)</option>
                <option value={'|'}>Pipe (|)</option>
              </select>
            </div>
            <ArrowRightLeft className="w-4 h-4 text-cyan-400 self-end mb-2" />
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400 font-semibold uppercase">To Delimiter</label>
              <select
                value={toDelimiter}
                onChange={e => setToDelimiter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
              >
                <option value={','}>Comma (,)</option>
                <option value={'\t'}>Tab (\t)</option>
                <option value={';'}>Semicolon (;)</option>
                <option value={'|'}>Pipe (|)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Raw Input Data</label>
              <textarea
                rows={8}
                value={delimiterInput}
                onChange={e => setDelimiterInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-slate-300 font-semibold">Transformed Output</label>
                <button
                  onClick={() => copy(swappedDelimiterOutput, 'delim')}
                  className="text-xs text-cyan-400 hover:text-cyan-300"
                >
                  {copiedText === 'delim' ? t('copied') : t('copy')}
                </button>
              </div>
              <textarea
                rows={8}
                readOnly
                value={swappedDelimiterOutput}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
