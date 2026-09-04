import React, { useState, useMemo } from 'react';
import { Palette, Copy, Check, Eye, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard';

export const ColorStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'converter' | 'contrast' | 'gradient'>('contrast');

  // Contrast Checker State
  const [fgColor, setFgColor] = useState('#38bdf8');
  const [bgColor, setBgColor] = useState('#0a0e1a');

  // Gradient State
  const [gradColor1, setGradColor1] = useState('#00f2fe');
  const [gradColor2, setGradColor2] = useState('#4facfe');
  const [gradAngle, setGradAngle] = useState(135);

  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    void copyToClipboard(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return { r, g, b };
  };

  // Relative luminance calculation for WCAG contrast
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const contrastRatio = useMemo(() => {
    const rgb1 = hexToRgb(fgColor);
    const rgb2 = hexToRgb(bgColor);

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    const ratio = (brightest + 0.05) / (darkest + 0.05);
    return Number(ratio.toFixed(2));
  }, [fgColor, bgColor]);

  const cssGradientString = `linear-gradient(${gradAngle}deg, ${gradColor1}, ${gradColor2})`;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('contrast')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'contrast'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            WCAG Accessibility Contrast
          </button>
          <button
            onClick={() => setActiveTab('gradient')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'gradient'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            CSS Gradient Builder
          </button>
        </div>

        <span className="text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-full border border-cyan-800/40">
          WCAG 2.1 Compliance Checker
        </span>
      </div>

      {/* CONTRAST VIEW */}
      {activeTab === 'contrast' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Foreground / Text Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-4 rounded-xl border ${
                  contrastRatio >= 4.5
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">WCAG AA</span>
                  <span className="text-xs font-mono font-bold">{contrastRatio >= 4.5 ? 'PASS' : 'FAIL'}</span>
                </div>
                <p className="text-[11px] opacity-80">Requires minimum 4.5:1 ratio for normal body text.</p>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  contrastRatio >= 7.0
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                    : 'bg-rose-950/30 border-rose-800/60 text-rose-300'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold">WCAG AAA</span>
                  <span className="text-xs font-mono font-bold">{contrastRatio >= 7.0 ? 'PASS' : 'FAIL'}</span>
                </div>
                <p className="text-[11px] opacity-80">Enhanced contrast for highest readability.</p>
              </div>
            </div>
          </div>

          {/* Right Live Simulation */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div
              style={{ backgroundColor: bgColor, color: fgColor }}
              className="p-8 rounded-2xl border border-slate-800 shadow-2xl transition-colors min-h-[220px] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-2">Accessibility Live Preview</h3>
              <p className="text-sm leading-relaxed mb-4">
                The quick brown fox jumps over the lazy dog. Clear contrast allows all readers, including those with visual
                impairments, to absorb information effortlessly.
              </p>
              <div className="text-xs font-mono opacity-75">Sample Caption text at 12px font size</div>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Calculated Contrast Ratio</span>
                <span className="text-2xl font-extrabold text-white font-mono">{contrastRatio} : 1</span>
              </div>
              <button
                onClick={() => copy(`${contrastRatio}:1`, 'ratio')}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                {copiedText === 'ratio' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText === 'ratio' ? 'Copied' : 'Copy Ratio'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRADIENT VIEW */}
      {activeTab === 'gradient' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Color Stop 1</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={gradColor1}
                      onChange={(e) => setGradColor1(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={gradColor1}
                      onChange={(e) => setGradColor1(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Color Stop 2</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={gradColor2}
                      onChange={(e) => setGradColor2(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={gradColor2}
                      onChange={(e) => setGradColor2(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Linear Angle</span>
                  <span className="font-mono">{gradAngle}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={gradAngle}
                  onChange={(e) => setGradAngle(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 uppercase tracking-wider font-semibold">CSS Declaration</span>
                <button
                  onClick={() => copy(`background: ${cssGradientString};`, 'css')}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs"
                >
                  {copiedText === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy CSS</span>
                </button>
              </div>
              <code className="font-mono text-xs text-slate-300 block bg-slate-900 p-2.5 rounded-lg select-all">
                background: {cssGradientString};
              </code>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div
              style={{ background: cssGradientString }}
              className="w-full h-64 rounded-2xl shadow-2xl border border-slate-700/50 flex items-center justify-center text-white font-bold text-lg drop-shadow-md"
            >
              {gradAngle}° Gradient
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
