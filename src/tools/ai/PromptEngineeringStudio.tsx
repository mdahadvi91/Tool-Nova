import React, { useState, useMemo } from 'react';
import { Sparkles, Copy, Check, Terminal, Layers, RefreshCw } from 'lucide-react';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';

export const PromptEngineeringStudio: React.FC = () => {
  const [role, setRole] = useState('Senior Staff Systems Architect');
  const [objective, setObjective] = useState(
    'Audit the software architecture for high-concurrency microservices and identify database bottlenecks.'
  );
  const [constraints, setConstraints] = useState(
    '- Do not recommend proprietary closed-source cloud services\n- Output all suggestions in structured markdown tables\n- Keep explanations concise without conversational filler'
  );
  const [customVariables, setCustomVariables] = useState<Record<string, string>>({
    tech_stack: 'Node.js, PostgreSQL, Redis',
    qps_target: '50,000 QPS'
  });
  const [copied, setCopied] = useState(false);

  // Generate composite prompt
  const compositePrompt = useMemo(() => {
    let raw = `# SYSTEM INSTRUCTION\nYou are a ${role}.\n\n## PRIMARY OBJECTIVE\n${objective}\n\n## OPERATIONAL CONSTRAINTS\n${constraints}\n\n## CONTEXT PARAMETERS\n`;

    Object.entries(customVariables).forEach(([key, val]) => {
      raw += `- ${key}: ${val}\n`;
    });

    raw += `\nExecute the task adhering strictly to all requirements above.`;
    return raw;
  }, [role, objective, constraints, customVariables]);

  const estimatedTokens = useMemo(() => {
    // Standard rule of thumb for English LLMs: ~4 characters per token
    return Math.ceil(compositePrompt.length / 4);
  }, [compositePrompt]);

  const copyToClipboard = () => {
    void copyTextToClipboard(compositePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Structured System Prompt Architect & Token Estimator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Design rigorous, structured LLM system instructions with explicit role boundaries and variable injections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Role Persona</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Primary Objective</label>
            <textarea
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              rows={3}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Negative Constraints & Rules</label>
            <textarea
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
              rows={4}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Context Parameters</label>
            <div className="space-y-2">
              {Object.entries(customVariables).map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <input
                    type="text"
                    disabled
                    value={key}
                    className="w-1/3 bg-slate-950/40 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-400 font-mono"
                  />
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => setCustomVariables({ ...customVariables, [key]: e.target.value })}
                    className="flex-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Compiled Prompt Preview */}
        <div className="space-y-3 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Compiled Prompt</label>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/40 text-cyan-400 font-mono">
                ~{estimatedTokens} Tokens ({compositePrompt.length} Chars)
              </span>
            </div>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-lg"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied!' : 'Copy System Prompt'}
            </button>
          </div>

          <textarea
            readOnly
            value={compositePrompt}
            rows={15}
            className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 leading-relaxed focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
