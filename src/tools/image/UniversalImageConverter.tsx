import React, { useState } from 'react';
import JSZip from 'jszip';
import { PDFDocument } from 'pdf-lib';
import { Upload, Download, FileArchive, Trash2, CheckCircle, RefreshCw, FileText, Copy, Check } from 'lucide-react';
import { downloadBlob, sanitizeFilename } from '../../utils/download';
import { copyToClipboard } from '../../utils/clipboard';

interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
  convertedBlob?: Blob;
  convertedSize?: number;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export const UniversalImageConverter: React.FC = () => {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp' | 'base64' | 'pdf'>('image/webp');
  const [quality, setQuality] = useState(85);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedBase64Id, setCopiedBase64Id] = useState<string | null>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: ImageFileItem[] = Array.from(files).map((file: File) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      name: file.name,
      size: file.size,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
    }));

    setItems((prev) => [...prev, ...newItems]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
  };

  // Convert an image file to specified format
  const convertFile = (item: ImageFileItem): Promise<{ blob: Blob; size: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context error'));
          return;
        }

        // Fill background white if converting PNG to JPEG
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, size: blob.size });
            } else {
              reject(new Error('Conversion failed'));
            }
          },
          targetFormat,
          quality / 100
        );
      };
      img.onerror = () => reject(new Error('Image decode error'));
      img.src = item.previewUrl;
    });
  };

  const processBatch = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    const updated = [...items];
    for (let i = 0; i < updated.length; i++) {
      updated[i].status = 'processing';
      setItems([...updated]);

      try {
        const res = await convertFile(updated[i]);
        updated[i].convertedBlob = res.blob;
        updated[i].convertedSize = res.size;
        updated[i].status = 'done';
      } catch (err) {
        console.error(err);
        updated[i].status = 'error';
      }
      setItems([...updated]);
    }

    setIsProcessing(false);
  };

  // Download all converted files in one ZIP archive
  const downloadAllZip = async () => {
    const zip = new JSZip();
    const ext = targetFormat === 'image/jpeg' ? 'jpg' : targetFormat === 'image/png' ? 'png' : 'webp';

    items.forEach((item, index) => {
      if (item.convertedBlob) {
        const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
        zip.file(`${sanitizeFilename(baseName)}_${index + 1}.${ext}`, item.convertedBlob);
      }
    });

    const zipContent = await zip.generateAsync({ type: 'blob' });
    downloadBlob(zipContent, `zenith_converted_images_${Date.now()}.zip`);
  };

  // Bundle all into a single multi-page PDF
  const bundleAsPdf = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of items) {
        const arrayBuf = await item.file.arrayBuffer();
        let pdfImg;
        if (item.file.type === 'image/png') {
          pdfImg = await pdfDoc.embedPng(arrayBuf);
        } else {
          pdfImg = await pdfDoc.embedJpg(arrayBuf);
        }

        const { width, height } = pdfImg.scale(1);
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(pdfImg, { x: 0, y: 0, width, height });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith_bundled_images_${Date.now()}.pdf`);
    } catch (e) {
      console.error('PDF bundle error:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyBase64 = async (item: ImageFileItem) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        void copyToClipboard(reader.result);
        setCopiedBase64Id(item.id);
        setTimeout(() => setCopiedBase64Id(null), 2000);
      }
    };
    reader.readAsDataURL(item.file);
  };

  const getFormatExtension = () => {
    if (targetFormat === 'image/jpeg') return 'jpg';
    if (targetFormat === 'image/png') return 'png';
    return 'webp';
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Configuration Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Universal Batch Image Converter</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              JSZip + PDF Engine
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Convert multiple images instantly with 100% in-browser privacy</p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 rounded-lg text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All ({items.length})</span>
          </button>
        )}
      </div>

      {/* Target Format & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 mb-6">
        <div className="sm:col-span-5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Target Output Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['image/webp', 'image/png', 'image/jpeg'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setTargetFormat(fmt)}
                className={`py-2 text-xs font-medium rounded-lg uppercase transition-all ${
                  targetFormat === fmt
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300 font-semibold'
                    : 'bg-slate-900 border border-slate-700 text-slate-400'
                }`}
              >
                {fmt.split('/')[1].toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Compression Quality ({quality}%)
          </label>
          <input
            type="range"
            min={20}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        <div className="sm:col-span-3 flex items-end">
          <button
            disabled={items.length === 0 || isProcessing}
            onClick={processBatch}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>{isProcessing ? 'Converting...' : 'Convert All Files'}</span>
          </button>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <div className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/30 rounded-xl p-6 text-center mb-6 transition-colors">
        <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-slate-200">
            Click to upload images or drag & drop here
          </span>
          <span className="text-xs text-slate-400">
            Supports PNG, JPG, WebP, GIF, SVG, BMP (Up to 50 files simultaneously)
          </span>
          <input type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
        </label>
      </div>

      {/* Uploaded File Queue List */}
      {items.length > 0 && (
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              File Conversion Queue ({items.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={bundleAsPdf}
                disabled={isProcessing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/50 rounded-lg text-xs font-medium"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bundle as PDF</span>
              </button>
              <button
                onClick={downloadAllZip}
                disabled={!items.some((i) => i.status === 'done')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 rounded-lg text-xs font-medium disabled:opacity-50"
              >
                <FileArchive className="w-3.5 h-3.5" />
                <span>Download All (ZIP)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex items-center justify-between gap-3"
              >
                <img src={item.previewUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-900" />

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{item.name}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{(item.size / 1024).toFixed(1)} KB</span>
                    {item.convertedSize && (
                      <span className="text-emerald-400 font-medium">
                        → {(item.convertedSize / 1024).toFixed(1)} KB
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    title="Copy Base64 Data URI"
                    onClick={() => copyBase64(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    {copiedBase64Id === item.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {item.convertedBlob && (
                    <button
                      title="Download Converted File"
                      onClick={() => {
                        const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
                        downloadBlob(item.convertedBlob!, `${baseName}.${getFormatExtension()}`);
                      }}
                      className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded-lg bg-emerald-950/40 border border-emerald-800/40"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    title="Remove item"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg bg-slate-900 border border-slate-800"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
