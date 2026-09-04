import React, { useState, useRef, useEffect } from 'react';
import { Download, Upload, RotateCw, FlipHorizontal, FlipVertical, RefreshCw, Sliders, Image as ImageIcon, Check } from 'lucide-react';
import { downloadCanvas } from '../../utils/download';

export const ImageEditorStudio: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'adjust' | 'transform' | 'watermark'>('adjust');

  // Filters
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [invert, setInvert] = useState(0);
  const [blur, setBlur] = useState(0);

  // Transform
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  // Watermark
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkOpacity, setWatermarkOpacity] = useState(60);
  const [watermarkColor, setWatermarkColor] = useState('#ffffff');
  const [watermarkSize, setWatermarkSize] = useState(36);

  // Export settings
  const [exportFormat, setExportFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');
  const [exportQuality, setExportQuality] = useState(92);
  const [showOriginal, setShowOriginal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  // Load default sample photo if none uploaded
  useEffect(() => {
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 800;
    sampleCanvas.height = 500;
    const ctx = sampleCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 800, 500);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#1e293b');
      grad.addColorStop(1, '#0284c7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 800, 500);

      // Cyber art lines
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(400, 250, 140, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 36px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Zenith Studio Sample', 400, 260);

      const dataUrl = sampleCanvas.toDataURL('image/png');
      setImageSrc(dataUrl);

      const img = new Image();
      img.src = dataUrl;
      originalImageRef.current = img;
    }
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        setImageSrc(src);
        const img = new Image();
        img.onload = () => {
          originalImageRef.current = img;
          resetEdits();
        };
        img.src = src;
      };
      reader.readAsDataURL(file);
    }
  };

  const resetEdits = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
    setSepia(0);
    setInvert(0);
    setBlur(0);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setWatermarkText('');
  };

  // Re-draw canvas whenever properties change
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = originalImageRef.current;
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isSideways = Math.abs(rotation % 180) === 90;
    canvas.width = isSideways ? img.naturalHeight : img.naturalWidth;
    canvas.height = isSideways ? img.naturalWidth : img.naturalHeight;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showOriginal) {
      // Draw untouched original
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      return;
    }

    // Apply Filter String
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) sepia(${sepia}%) invert(${invert}%) blur(${blur}px)`;

    // Apply Transformations (Rotate / Flip)
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);

    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    // Apply Watermark Overlay
    if (watermarkText.trim()) {
      ctx.save();
      ctx.font = `bold ${watermarkSize}px Outfit, sans-serif`;
      ctx.fillStyle = watermarkColor;
      ctx.globalAlpha = watermarkOpacity / 100;
      ctx.textAlign = 'right';
      ctx.fillText(watermarkText, canvas.width - 30, canvas.height - 30);
      ctx.restore();
    }
  }, [
    imageSrc,
    brightness,
    contrast,
    saturation,
    grayscale,
    sepia,
    invert,
    blur,
    rotation,
    flipH,
    flipV,
    watermarkText,
    watermarkOpacity,
    watermarkColor,
    watermarkSize,
    showOriginal,
  ]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ext = exportFormat.split('/')[1];
      downloadCanvas(canvas, `zenith_edited_photo.${ext}`, exportFormat, exportQuality / 100);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            <span>Upload New Image</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          <button
            onClick={resetEdits}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showOriginal ? 'bg-cyan-500 text-white border-cyan-400' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            Hold to Compare (Before / After)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Adjustments Panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setActiveTab('adjust')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'adjust' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
              }`}
            >
              Adjust & Color
            </button>
            <button
              onClick={() => setActiveTab('transform')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'transform' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
              }`}
            >
              Transform & Rotate
            </button>
            <button
              onClick={() => setActiveTab('watermark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeTab === 'watermark' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
              }`}
            >
              Watermark
            </button>
          </div>

          {activeTab === 'adjust' && (
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Brightness</span>
                  <span className="font-mono">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Contrast</span>
                  <span className="font-mono">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Saturation</span>
                  <span className="font-mono">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Grayscale</span>
                  <span className="font-mono">{grayscale}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={grayscale}
                  onChange={(e) => setGrayscale(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Sepia Tone</span>
                  <span className="font-mono">{sepia}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sepia}
                  onChange={(e) => setSepia(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Soft Blur</span>
                  <span className="font-mono">{blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {activeTab === 'transform' && (
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Rotation & Symmetry
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200"
                >
                  <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>+90° Rotate</span>
                </button>
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 border rounded-lg text-xs font-medium ${
                    flipH ? 'bg-cyan-950 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span>Flip Horiz</span>
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`flex items-center justify-center gap-1.5 py-2.5 border rounded-lg text-xs font-medium ${
                    flipV ? 'bg-cyan-950 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-200'
                  }`}
                >
                  <FlipVertical className="w-3.5 h-3.5" />
                  <span>Flip Vert</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'watermark' && (
            <div className="space-y-4 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Watermark Text</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="e.g. © 2026 Zenith Studio"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Opacity ({watermarkOpacity}%)</label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Font Size ({watermarkSize}px)</label>
                  <input
                    type="range"
                    min={18}
                    max={72}
                    value={watermarkSize}
                    onChange={(e) => setWatermarkSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Export Settings */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Export Configuration
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                >
                  <option value="image/png">PNG (Lossless)</option>
                  <option value="image/jpeg">JPG (Standard)</option>
                  <option value="image/webp">WebP (Modern)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Quality ({exportQuality}%)</label>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={exportQuality}
                  onChange={(e) => setExportQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Download Edited Image</span>
            </button>
          </div>
        </div>

        {/* Right Canvas Area */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/70 border border-slate-800 p-4 rounded-2xl min-h-[440px]">
          <div className="max-w-full max-h-[500px] overflow-auto flex items-center justify-center p-2 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
