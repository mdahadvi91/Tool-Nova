import React, { useState } from 'react';
import { Palette, Copy, Check, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';

export const CssGradientStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gradient' | 'shadow' | 'glass'>('gradient');
  const [copied, setCopied] = useState(false);

  // Gradient state
  const [gradType, setGradType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#06b6d4');
  const [color2, setColor2] = useState('#3b82f6');
  const [color3, setColor3] = useState('#8b5cf6');

  // Shadow state
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(15);
  const [shadowBlur, setShadowBlur] = useState(30);
  const [shadowSpread, setShadowSpread] = useState(-5);
  const [shadowColor, setShadowColor] = useState('rgba(6, 182, 212, 0.35)');
  const [isInset, setIsInset] = useState(false);

  // Glassmorphism state
  const [glassBlur, setGlassBlur] = useState(16);
  const [glassOpacity, setGlassOpacity] = useState(0.2);
  const [glassBorder, setGlassBorder] = useState(0.3);

  const copyToClipboard = (text: string) => {
    void copyTextToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradientCss =
    gradType === 'linear'
      ? `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3});`
      : gradType === 'radial'
      ? `background: radial-gradient(circle, ${color1}, ${color2}, ${color3});`
      : `background: conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3});`;

  const shadowCss = `box-shadow: ${isInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};`;

  const glassCss = `background: rgba(255, 255, 255, ${glassOpacity});\nbackdrop-filter: blur(${glassBlur}px);\n-webkit-backdrop-filter: blur(${glassBlur}px);\nborder: 1px solid rgba(255, 255, 255, ${glassBorder});`;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            CSS Visual Effects, Gradient & Glass Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Design multi-stop CSS gradients, complex layered drop shadows, and modern glassmorphism panels.
          </p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('gradient')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'gradient'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          CSS Gradients
        </button>
        <button
          onClick={() => setActiveTab('shadow')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'shadow'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          Box Shadows
        </button>
        <button
          onClick={() => setActiveTab('glass')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === 'glass'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Glassmorphism
        </button>
      </div>

      {activeTab === 'gradient' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="flex gap-2">
              {(['linear', 'radial', 'conic'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setGradType(t)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                    gradType === t ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {gradType !== 'radial' && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Angle</span>
                  <span className="font-mono text-cyan-400">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Color Stop 1</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded p-1">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-white">{color1}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Color Stop 2</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded p-1">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-white">{color2}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Color Stop 3</label>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded p-1">
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    className="w-7 h-7 rounded border-0 cursor-pointer bg-transparent"
                  />
                  <span className="text-xs font-mono text-white">{color3}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 flex flex-col">
            <div
              className="w-full h-44 rounded-xl border border-slate-800 shadow-xl transition-all"
              style={{
                background:
                  gradType === 'linear'
                    ? `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`
                    : gradType === 'radial'
                    ? `radial-gradient(circle, ${color1}, ${color2}, ${color3})`
                    : `conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3})`
              }}
            />
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
              <code className="text-xs font-mono text-cyan-300 break-all">{gradientCss}</code>
              <button
                onClick={() => copyToClipboard(gradientCss)}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                Copy CSS
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'shadow' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Y Offset</span>
                <span className="font-mono text-cyan-400">{shadowY}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={shadowY}
                onChange={(e) => setShadowY(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Blur Radius</span>
                <span className="font-mono text-cyan-400">{shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Spread Radius</span>
                <span className="font-mono text-cyan-400">{shadowSpread}px</span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                value={shadowSpread}
                onChange={(e) => setShadowSpread(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-center">
            <div className="h-44 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center p-6">
              <div
                className="w-48 h-24 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-xs font-semibold text-white"
                style={{
                  boxShadow: `${isInset ? 'inset ' : ''}${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`
                }}
              >
                Preview Box
              </div>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
              <code className="text-xs font-mono text-cyan-300 break-all">{shadowCss}</code>
              <button
                onClick={() => copyToClipboard(shadowCss)}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                Copy CSS
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'glass' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Blur Intensity</span>
                <span className="font-mono text-cyan-400">{glassBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={glassBlur}
                onChange={(e) => setGlassBlur(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Background Opacity</span>
                <span className="font-mono text-cyan-400">{Math.round(glassOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={glassOpacity}
                onChange={(e) => setGlassOpacity(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          <div className="space-y-3 flex flex-col justify-center">
            <div className="h-44 bg-gradient-to-tr from-cyan-900 via-purple-900 to-rose-900 rounded-xl border border-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
              <div
                className="w-56 h-28 rounded-2xl flex flex-col items-center justify-center text-xs font-semibold text-white shadow-2xl space-y-1"
                style={{
                  background: `rgba(255, 255, 255, ${glassOpacity})`,
                  backdropFilter: `blur(${glassBlur}px)`,
                  WebkitBackdropFilter: `blur(${glassBlur}px)`,
                  border: `1px solid rgba(255, 255, 255, ${glassBorder})`
                }}
              >
                <span className="font-bold">Glassmorphism Card</span>
                <span className="text-[11px] text-white/80">Frosted Glass Effect</span>
              </div>
            </div>
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
              <code className="text-xs font-mono text-cyan-300 whitespace-pre-wrap">{glassCss}</code>
              <button
                onClick={() => copyToClipboard(glassCss)}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white flex items-center gap-1.5 flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                Copy CSS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
