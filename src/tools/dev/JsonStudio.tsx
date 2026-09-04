import React, { useState } from 'react';
import { Code, Check, Copy, Download, RefreshCw, AlertCircle, FileSpreadsheet, Upload } from 'lucide-react';
import { downloadText } from '../../utils/download';

export const JsonStudio: React.FC = () => {
  const [inputJson, setInputJson] = useState(
    JSON.stringify(
      [
        { id: 1, name: 'Alex Morgan', role: 'Staff Engineer', city: 'Dubai', active: true },
        { id: 2, name: 'Sarah Chen', role: 'Architect', city: 'Singapore', active: true },
        { id: 3, name: 'David Miller', role: 'Product Lead', city: 'London', active: false },
      ],
      null,
      2
    )
  );

  const [outputResult, setOutputResult] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ keys: number; sizeBytes: number } | null>(null);

  const formatJson = (spaces: number) => {
    setErrorMessage(null);
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutputResult(formatted);
      setStats({
        keys: typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1,
        sizeBytes: new Blob([formatted]).size,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid JSON syntax');
      setOutputResult('');
    }
  };

  const minifyJson = () => {
    setErrorMessage(null);
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputResult(minified);
      setStats({
        keys: typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 1,
        sizeBytes: new Blob([minified]).size,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid JSON syntax');
      setOutputResult('');
    }
  };

  const convertToCsv = () => {
    setErrorMessage(null);
    try {
      const parsed = JSON.parse(inputJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setErrorMessage('CSV conversion requires an array of objects [ { ... }, { ... } ].');
        return;
      }

      // Collect all unique keys
      const headers = Array.from(
        new Set(parsed.flatMap((item) => (typeof item === 'object' && item !== null ? Object.keys(item) : [])))
      );

      const rows = [headers.join(',')];

      for (const item of parsed) {
        const row = headers.map((header) => {
          const val = item[header];
          if (val === undefined || val === null) return '""';
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        rows.push(row.join(','));
      }

      const csvContent = rows.join('\n');
      setOutputResult(csvContent);
      setStats({
        keys: headers.length,
        sizeBytes: new Blob([csvContent]).size,
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to parse JSON for CSV conversion');
    }
  };

  const copyOutput = () => {
    const textToCopy = outputResult || inputJson;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResult = () => {
    const isCsv = outputResult.startsWith('"') || outputResult.includes(',');
    const ext = isCsv ? 'csv' : 'json';
    const mime = isCsv ? 'text/csv' : 'application/json';
    downloadText(outputResult || inputJson, `zenith_export.${ext}`, mime);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setInputJson(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Developer JSON & Data Studio</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Beautifier & CSV Exporter
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Validate syntax, format indentation, minify payloads, and export to CSV</p>
        </div>

        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 cursor-pointer transition-colors">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload .json</span>
          <input type="file" accept=".json,text/plain" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => formatJson(2)}
          className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/20 transition-colors"
        >
          Format (2 Spaces)
        </button>
        <button
          onClick={() => formatJson(4)}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
        >
          Format (4 Spaces)
        </button>
        <button
          onClick={minifyJson}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
        >
          Minify Compact
        </button>
        <button
          onClick={convertToCsv}
          className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-colors"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>JSON to CSV</span>
        </button>
        <button
          onClick={() => {
            setInputJson('');
            setOutputResult('');
            setErrorMessage(null);
          }}
          className="px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors ml-auto"
        >
          Clear
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span className="font-mono">{errorMessage}</span>
        </div>
      )}

      {/* Dual Column Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
            <span>Input JSON</span>
            <span className="font-mono">{new Blob([inputJson]).size} bytes</span>
          </div>
          <textarea
            rows={14}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste raw JSON here..."
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 leading-relaxed shadow-inner"
          />
        </div>

        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
            <span>Processed Result</span>
            <div className="flex items-center gap-2">
              <button
                onClick={copyOutput}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={downloadResult}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            rows={14}
            value={outputResult || inputJson}
            placeholder="Formatted output will appear here..."
            className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-xs text-cyan-300 font-mono focus:outline-none leading-relaxed shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};
