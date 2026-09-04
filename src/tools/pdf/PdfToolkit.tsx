import React, { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { Upload, Download, FileText, Layers, Scissors, ShieldAlert, Hash, Trash2, CheckCircle } from 'lucide-react';
import { downloadBlob } from '../../utils/download';

export const PdfToolkit: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'merge' | 'split' | 'watermark' | 'page-numbers'>('merge');

  // Merge Mode State
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);

  // Split / Extract State
  const [singlePdfFile, setSinglePdfFile] = useState<File | null>(null);
  const [splitRange, setSplitRange] = useState('1-3');
  const [pdfPageCount, setPdfPageCount] = useState<number | null>(null);

  // Watermark State
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [watermarkAngle, setWatermarkAngle] = useState(45);

  // Page Number State
  const [numberPosition, setNumberPosition] = useState<'bottom-center' | 'bottom-right'>('bottom-center');
  const [startNumber, setStartNumber] = useState(1);

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle single PDF load & inspect page count
  const handleSinglePdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSinglePdfFile(file);
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        setPdfPageCount(doc.getPageCount());
      } catch (err) {
        console.error('Error loading PDF:', err);
      }
    }
  };

  const handleMergeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMergeFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  // 1. MERGE PDFS
  const executeMerge = async () => {
    if (mergeFiles.length < 2) {
      setStatusMessage('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of mergeFiles) {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith_merged_document_${Date.now()}.pdf`);
      setStatusMessage('Successfully merged PDFs and started download!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Error merging PDFs. Ensure files are not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. SPLIT / EXTRACT PAGES
  const executeSplit = async () => {
    if (!singlePdfFile) return;
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const bytes = await singlePdfFile.arrayBuffer();
      const sourceDoc = await PDFDocument.load(bytes);
      const totalPages = sourceDoc.getPageCount();

      // Parse range e.g. "1, 3, 5-7" or "1-3"
      const indicesToExtract: number[] = [];
      const parts = splitRange.split(',');

      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [startStr, endStr] = trimmed.split('-');
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= totalPages) indicesToExtract.push(i - 1);
          }
        } else {
          const pageNum = parseInt(trimmed, 10);
          if (pageNum >= 1 && pageNum <= totalPages) indicesToExtract.push(pageNum - 1);
        }
      }

      if (indicesToExtract.length === 0) {
        setStatusMessage('No valid pages found in range.');
        setIsProcessing(false);
        return;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(sourceDoc, indicesToExtract);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith_extracted_pages_${Date.now()}.pdf`);
      setStatusMessage(`Extracted ${indicesToExtract.length} pages successfully!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Error splitting PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 3. WATERMARK PDF
  const executeWatermark = async () => {
    if (!singlePdfFile) return;
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const bytes = await singlePdfFile.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const helveticaFont = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();

      for (const page of pages) {
        const { width, height } = page.getSize();
        page.drawText(watermarkText, {
          x: width / 4,
          y: height / 2,
          size: 48,
          font: helveticaFont,
          color: rgb(0.85, 0.2, 0.2),
          opacity: watermarkOpacity,
          rotate: degrees(watermarkAngle),
        });
      }

      const watermarkedBytes = await doc.save();
      const blob = new Blob([watermarkedBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith_watermarked_${Date.now()}.pdf`);
      setStatusMessage('Watermark stamped onto all pages successfully!');
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to watermark PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  // 4. ADD PAGE NUMBERS
  const executePageNumbers = async () => {
    if (!singlePdfFile) return;
    setIsProcessing(true);
    setStatusMessage(null);

    try {
      const bytes = await singlePdfFile.arrayBuffer();
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      const total = pages.length;

      pages.forEach((page, index) => {
        const { width } = page.getSize();
        const currentNum = startNumber + index;
        const pageText = `Page ${currentNum} of ${startNumber + total - 1}`;
        const fontSize = 10;
        const textWidth = font.widthOfTextAtSize(pageText, fontSize);

        let x = width / 2 - textWidth / 2; // bottom-center
        if (numberPosition === 'bottom-right') {
          x = width - textWidth - 36;
        }

        page.drawText(pageText, {
          x,
          y: 24,
          size: fontSize,
          font,
          color: rgb(0.3, 0.35, 0.4),
        });
      });

      const numberedBytes = await doc.save();
      const blob = new Blob([numberedBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith_numbered_doc_${Date.now()}.pdf`);
      setStatusMessage(`Numbered ${total} pages successfully!`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to stamp page numbers.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveMode('merge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'merge'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Merge PDFs</span>
          </button>
          <button
            onClick={() => setActiveMode('split')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'split'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Split / Extract</span>
          </button>
          <button
            onClick={() => setActiveMode('watermark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'watermark'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Watermark</span>
          </button>
          <button
            onClick={() => setActiveMode('page-numbers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeMode === 'page-numbers'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Page Numbers</span>
          </button>
        </div>

        <span className="text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-800/40">
          Client-Side pdf-lib Engine
        </span>
      </div>

      {statusMessage && (
        <div className="mb-6 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* MERGE VIEW */}
      {activeMode === 'merge' && (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 bg-slate-950/30 rounded-xl p-8 text-center transition-colors">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-slate-200">
                Select multiple PDF files to combine
              </span>
              <span className="text-xs text-slate-400">PDFs will be merged in the order listed</span>
              <input type="file" multiple accept="application/pdf" onChange={handleMergeFiles} className="hidden" />
            </label>
          </div>

          {mergeFiles.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Files to Merge ({mergeFiles.length})
                </span>
                <button
                  onClick={() => setMergeFiles([])}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Clear List
                </button>
              </div>

              <div className="space-y-2">
                {mergeFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-200">{file.name}</span>
                      <span className="text-[11px] text-slate-500">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      onClick={() => setMergeFiles((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={executeMerge}
                disabled={isProcessing || mergeFiles.length < 2}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
              >
                {isProcessing ? 'Merging Documents...' : `Merge ${mergeFiles.length} PDF Files`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* SINGLE FILE MODES (Split, Watermark, Page Numbers) */}
      {activeMode !== 'merge' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <div className="border-2 border-dashed border-slate-700/80 bg-slate-950/30 rounded-xl p-6 text-center">
              <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                <FileText className="w-8 h-8 text-cyan-400" />
                <span className="text-xs font-semibold text-slate-200">
                  {singlePdfFile ? singlePdfFile.name : 'Upload PDF Document'}
                </span>
                {pdfPageCount && (
                  <span className="text-xs text-emerald-400 font-mono">
                    Total Pages Detected: {pdfPageCount}
                  </span>
                )}
                <input type="file" accept="application/pdf" onChange={handleSinglePdf} className="hidden" />
              </label>
            </div>

            {/* Split controls */}
            {activeMode === 'split' && (
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pages to Extract (e.g. 1-3, 5, 8-10)
                </label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 font-mono"
                />
                <button
                  onClick={executeSplit}
                  disabled={!singlePdfFile || isProcessing}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Extracting...' : 'Extract & Download Specified Pages'}
                </button>
              </div>
            )}

            {/* Watermark controls */}
            {activeMode === 'watermark' && (
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Watermark Stamp Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Opacity ({(watermarkOpacity * 100).toFixed(0)}%)
                    </label>
                    <input
                      type="range"
                      min={0.05}
                      max={0.8}
                      step={0.05}
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Rotation Angle ({watermarkAngle}°)</label>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={watermarkAngle}
                      onChange={(e) => setWatermarkAngle(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                <button
                  onClick={executeWatermark}
                  disabled={!singlePdfFile || isProcessing}
                  className="w-full py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-rose-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Stamping Watermark...' : 'Apply Diagonal Watermark'}
                </button>
              </div>
            )}

            {/* Page Number controls */}
            {activeMode === 'page-numbers' && (
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Position</label>
                    <select
                      value={numberPosition}
                      onChange={(e) => setNumberPosition(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
                    >
                      <option value="bottom-center">Bottom Center</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Start Page Number</label>
                    <input
                      type="number"
                      min={1}
                      value={startNumber}
                      onChange={(e) => setStartNumber(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                    />
                  </div>
                </div>

                <button
                  onClick={executePageNumbers}
                  disabled={!singlePdfFile || isProcessing}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isProcessing ? 'Stamping Page Numbers...' : 'Add Page Numbers & Download'}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-950/70 border border-slate-800 rounded-2xl text-center">
            <FileText className="w-16 h-16 text-slate-600 mb-3" />
            <h3 className="text-sm font-semibold text-slate-300 mb-1">
              {singlePdfFile ? singlePdfFile.name : 'No PDF Loaded'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm">
              All PDF manipulations occur directly in your browser using WebAssembly and Javascript byte-arrays.
              Your confidential documents never touch any server.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
