import React, { useState, useRef, useEffect } from 'react';
import { Scan, Upload, Download, RotateCw, Sparkles, FileText, Check, ShieldCheck } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { downloadBlob, downloadCanvas } from '../../utils/download';

export const DocumentScannerStudio: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'clean-bw' | 'grayscale' | 'contrast' | 'original'>('clean-bw');
  const [threshold, setThreshold] = useState(128);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      originalImageRef.current = img;
      renderEnhancedDocument();
    };
    img.src = url;
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const renderEnhancedDocument = () => {
    const img = originalImageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const isRotated90or270 = rotation === 90 || rotation === 270;
    canvas.width = isRotated90or270 ? img.naturalHeight : img.naturalWidth;
    canvas.height = isRotated90or270 ? img.naturalWidth : img.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    ctx.restore();

    if (filterMode === 'original') return;

    // Apply pixel-level document filtering
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      if (filterMode === 'clean-bw') {
        // High-contrast clean black and white document threshold
        const val = lum > threshold ? 255 : 0;
        data[i] = val;
        data[i + 1] = val;
        data[i + 2] = val;
      } else if (filterMode === 'grayscale') {
        data[i] = lum;
        data[i + 1] = lum;
        data[i + 2] = lum;
      } else if (filterMode === 'contrast') {
        // Document contrast curve (enhance paper white, darken ink)
        const contrastFactor = 1.6;
        let enhanced = contrastFactor * (lum - 128) + 128;
        enhanced = Math.min(255, Math.max(0, enhanced));
        data[i] = enhanced;
        data[i + 1] = enhanced;
        data[i + 2] = enhanced;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  };

  useEffect(() => {
    if (originalImageRef.current) {
      renderEnhancedDocument();
    }
  }, [filterMode, threshold, rotation]);

  const downloadAsPdf = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const pdfDoc = await PDFDocument.create();
      const pngDataUrl = canvas.toDataURL('image/png');
      const pngImage = await pdfDoc.embedPng(pngDataUrl);

      // Fit inside standard Letter or A4 dimensions
      const page = pdfDoc.addPage([canvas.width, canvas.height]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadBlob(blob, `toolnova-scanned-doc-${Date.now()}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-cyan-400" />
            Document & Receipt Scanner Studio
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Clean paper scans, eliminate background shadows, and enhance printed text with high-contrast document filters.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Local Canvas Scanner</span>
        </div>
      </div>

      {!imageUrl ? (
        <div className="relative border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 transition-colors rounded-2xl p-10 text-center bg-slate-950/40 group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-200 mb-1">Upload camera photo of document or receipt</p>
            <p className="text-xs text-slate-500">Supports JPG, PNG, WebP up to 50MB with instant local processing</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold mr-2">Filter:</span>
              {[
                { id: 'clean-bw', label: 'Crisp B&W' },
                { id: 'contrast', label: 'Paper Boost' },
                { id: 'grayscale', label: 'Grayscale' },
                { id: 'original', label: 'Original' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterMode(f.id as typeof filterMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterMode === f.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}

              <button
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="ml-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:text-cyan-400"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Rotate 90°
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (canvasRef.current) {
                    downloadCanvas(canvasRef.current, `toolnova-scan-${Date.now()}.png`, 'image/png');
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Download PNG
              </button>
              <button
                onClick={downloadAsPdf}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg"
              >
                <FileText className="w-3.5 h-3.5" />
                Export as PDF
              </button>
            </div>
          </div>

          {filterMode === 'clean-bw' && (
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Ink / Background Threshold Threshold</span>
                <span className="font-mono text-cyan-400 font-bold">{threshold}</span>
              </div>
              <input
                type="range"
                min="40"
                max="220"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          )}

          {/* Canvas Display */}
          <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-center overflow-auto max-h-[600px]">
            <canvas ref={canvasRef} className="max-w-full max-h-[550px] object-contain shadow-2xl rounded" />
          </div>
        </div>
      )}
    </div>
  );
};
