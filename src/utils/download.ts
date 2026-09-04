export function sanitizeFilename(name: string, fallback = 'zenith_download'): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]/g, '_').trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const safeName = sanitizeFilename(filename);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = safeName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  
  // Clean up Object URL
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 1000);
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string, type = 'image/png', quality = 0.95): void {
  canvas.toBlob((blob) => {
    if (blob) {
      downloadBlob(blob, filename);
    }
  }, type, quality);
}

export function downloadText(content: string, filename: string, mimeType = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  downloadBlob(blob, filename);
}
