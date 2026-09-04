import React, { useState } from 'react';
import { copyToClipboard as copyTextToClipboard } from '../../utils/clipboard';
import { FileCode, Upload, ShieldCheck, Copy, Check, FileCheck, Binary } from 'lucide-react';

interface FileHashResult {
  fileName: string;
  fileSize: number;
  mimeType: string;
  sha256: string;
  sha1: string;
  sha512: string;
  magicBytesHex: string;
  magicBytesAscii: string;
  detectedType: string;
}

export const FileUtilitiesStudio: React.FC = () => {
  const [result, setResult] = useState<FileHashResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    void copyTextToClipboard(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const bufferToHex = (buffer: ArrayBuffer): string => {
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const identifyMagicBytes = (hex: string): string => {
    const h = hex.toUpperCase();
    if (h.startsWith('89504E47')) return 'PNG Image (image/png)';
    if (h.startsWith('FFD8FF')) return 'JPEG Image (image/jpeg)';
    if (h.startsWith('25504446')) return 'Adobe PDF Document (application/pdf)';
    if (h.startsWith('504B0304') || h.startsWith('504B0506')) return 'ZIP Archive / Office DOCX/XLSX (application/zip)';
    if (h.startsWith('52494646') && h.includes('57454250')) return 'WebP Image (image/webp)';
    if (h.startsWith('47494638')) return 'GIF Image (image/gif)';
    if (h.startsWith('494433') || h.startsWith('FFF3') || h.startsWith('FFF2')) return 'MP3 Audio (audio/mpeg)';
    if (h.startsWith('0000001866747970') || h.startsWith('0000002066747970')) return 'MP4 Video (video/mp4)';
    return 'Binary / Raw Data Stream';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const arrayBuffer = await file.arrayBuffer();

      // Compute SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const sha256 = bufferToHex(sha256Buffer);

      // Compute SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
      const sha1 = bufferToHex(sha1Buffer);

      // Compute SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', arrayBuffer);
      const sha512 = bufferToHex(sha512Buffer);

      // Magic Bytes (First 16 bytes)
      const firstBytes = new Uint8Array(arrayBuffer.slice(0, 16));
      const hexParts: string[] = [];
      let ascii = '';
      firstBytes.forEach((b) => {
        hexParts.push(b.toString(16).padStart(2, '0').toUpperCase());
        ascii += b >= 32 && b <= 126 ? String.fromCharCode(b) : '.';
      });

      const magicHex = hexParts.join(' ');
      const detected = identifyMagicBytes(hexParts.join(''));

      setResult({
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || 'unknown/binary',
        sha256,
        sha1,
        sha512,
        magicBytesHex: magicHex,
        magicBytesAscii: ascii,
        detectedType: detected
      });
    } catch (err) {
      console.error('File utility inspection error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            File Checksum & Magic Bytes Inspector
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate cryptographic hashes (SHA-256, SHA-1, SHA-512) and inspect file header signatures locally.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% In-Browser Cryptography</span>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="relative border-2 border-dashed border-slate-700/80 hover:border-cyan-500/50 transition-colors rounded-2xl p-8 text-center bg-slate-950/40 group">
        <input
          type="file"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-200 mb-1">
            {isProcessing ? 'Hashing & Inspecting file...' : 'Drop any file here or click to inspect'}
          </p>
          <p className="text-xs text-slate-500">
            Executable files, images, archives, documents — up to 500MB supported with zero server transfer
          </p>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">File Name</span>
              <span className="text-xs font-semibold text-white truncate block" title={result.fileName}>
                {result.fileName}
              </span>
            </div>
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Total File Size</span>
              <span className="text-xs font-semibold text-cyan-400 font-mono">
                {formatBytes(result.fileSize)} ({result.fileSize.toLocaleString()} bytes)
              </span>
            </div>
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">Detected Signature</span>
              <span className="text-xs font-semibold text-emerald-400 truncate block">
                {result.detectedType}
              </span>
            </div>
          </div>

          {/* Hashes List */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Cryptographic File Hashes
            </h4>

            {/* SHA-256 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">SHA-256 (Standard Integrity)</span>
                <button
                  onClick={() => copyToClipboard(result.sha256, 'sha256')}
                  className="hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                >
                  {copiedKey === 'sha256' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono text-cyan-300 break-all select-all">
                {result.sha256}
              </div>
            </div>

            {/* SHA-1 */}
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">SHA-1 (Legacy Verification)</span>
                <button
                  onClick={() => copyToClipboard(result.sha1, 'sha1')}
                  className="hover:text-cyan-400 flex items-center gap-1 text-[11px]"
                >
                  {copiedKey === 'sha1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy
                </button>
              </div>
              <div className="p-2.5 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-300 break-all select-all">
                {result.sha1}
              </div>
            </div>

            {/* Magic Bytes */}
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5 text-amber-400" />
                  Header Magic Bytes (First 16 Bytes Hex & ASCII)
                </span>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono flex flex-col sm:flex-row justify-between gap-2">
                <span className="text-amber-300 select-all">{result.magicBytesHex}</span>
                <span className="text-slate-500 select-all border-l border-slate-800 pl-3">{result.magicBytesAscii}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
