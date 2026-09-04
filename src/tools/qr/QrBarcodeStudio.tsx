import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { Download, Copy, RefreshCw, Upload, Check, ShieldCheck } from 'lucide-react';
import { downloadCanvas, downloadText } from '../../utils/download';
import { copyToClipboard } from '../../utils/clipboard';

export const QrBarcodeStudio: React.FC<{
  initialMode?: 'qr' | 'barcode' | 'photo-badge';
  initialPayloadType?: 'url' | 'text' | 'wifi' | 'email' | 'phone' | 'vcard';
}> = ({ initialMode = 'qr', initialPayloadType = 'url' }) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'barcode' | 'photo-badge'>(initialMode);
  
  // QR State
  const [payloadType, setPayloadType] = useState<'url' | 'text' | 'wifi' | 'email' | 'phone' | 'vcard'>(initialPayloadType);
  const [urlInput, setUrlInput] = useState('https://toolnova.app');
  const [textInput, setTextInput] = useState('Welcome to ToolNova');
  const [wifiSsid, setWifiSsid] = useState('MyHomeWiFi');
  const [wifiPass, setWifiPass] = useState('SecurePass2026');
  const [wifiType, setWifiType] = useState('WPA');
  const [emailInput, setEmailInput] = useState('contact@toolnova.app');
  const [emailSubject, setEmailSubject] = useState('Inquiry');
  const [phoneInput, setPhoneInput] = useState('+1 555 019 2834');
  const [vcardName, setVcardName] = useState('Alex Morgan');
  const [vcardPhone, setVcardPhone] = useState('+1 555 019 2834');
  const [vcardEmail, setVcardEmail] = useState('alex@toolnova.app');
  const [vcardCompany, setVcardCompany] = useState('Nova Innovations');

  // Styling State
  const [fgColor, setFgColor] = useState('#00f2fe');
  const [bgColor, setBgColor] = useState('#090d16');
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [qrSize, setQrSize] = useState(380);
  const [margin, setMargin] = useState(2);

  // Photo Badge State
  const [badgeImage, setBadgeImage] = useState<string | null>(null);
  const [badgePosition, setBadgePosition] = useState<'center' | 'top-right' | 'bottom-right'>('center');
  const [badgeSizePercent, setBadgeSizePercent] = useState(22);
  const [badgeBorderWidth, setBadgeBorderWidth] = useState(3);
  const [badgeBorderColor, setBadgeBorderColor] = useState('#00f2fe');
  const [badgeShape, setBadgeShape] = useState<'circle' | 'rounded' | 'square'>('circle');

  // Barcode State
  const [barcodeText, setBarcodeText] = useState('ZENITH-8942');
  const [barcodeFormat, setBarcodeFormat] = useState<'CODE128' | 'EAN13' | 'CODE39' | 'pharmacode'>('CODE128');

  // Canvas Refs
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const barcodeSvgRef = useRef<SVGSVGElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Compute Raw String Payload
  const getQrPayload = (): string => {
    switch (payloadType) {
      case 'url':
        return urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;
      case 'text':
        return textInput;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPass};;`;
      case 'email':
        return `mailto:${emailInput}?subject=${encodeURIComponent(emailSubject)}`;
      case 'phone':
        return `tel:${phoneInput}`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nFN:${vcardName}\nORG:${vcardCompany}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      default:
        return urlInput;
    }
  };

  // Render QR Code + Photo Badge overlay
  useEffect(() => {
    if (activeTab === 'barcode') return;
    const canvas = qrCanvasRef.current;
    if (!canvas) return;

    const payload = getQrPayload();
    // Generate base QR onto canvas
    QRCode.toCanvas(
      canvas,
      payload,
      {
        width: qrSize,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: badgeImage || activeTab === 'photo-badge' ? 'H' : errorCorrection,
      },
      (error) => {
        if (error) console.error('QR Render Error:', error);
        
        // Overlay Badge if uploaded
        if (badgeImage && canvas) {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const badgePx = (qrSize * badgeSizePercent) / 100;
            let bx = (qrSize - badgePx) / 2;
            let by = (qrSize - badgePx) / 2;

            if (badgePosition === 'top-right') {
              bx = qrSize - badgePx - 24;
              by = 24;
            } else if (badgePosition === 'bottom-right') {
              bx = qrSize - badgePx - 24;
              by = qrSize - badgePx - 24;
            }

            ctx.save();
            ctx.beginPath();
            if (badgeShape === 'circle') {
              ctx.arc(bx + badgePx / 2, by + badgePx / 2, badgePx / 2, 0, Math.PI * 2);
            } else if (badgeShape === 'rounded') {
              const r = 12;
              ctx.roundRect(bx, by, badgePx, badgePx, r);
            } else {
              ctx.rect(bx, by, badgePx, badgePx);
            }
            ctx.closePath();

            // Background fill behind badge
            ctx.fillStyle = bgColor;
            ctx.fill();

            // Draw image clipped inside shape
            ctx.save();
            ctx.clip();
            ctx.drawImage(img, bx, by, badgePx, badgePx);
            ctx.restore();

            // Border stroke
            if (badgeBorderWidth > 0) {
              ctx.lineWidth = badgeBorderWidth;
              ctx.strokeStyle = badgeBorderColor;
              ctx.stroke();
            }

            ctx.restore();
          };
          img.src = badgeImage;
        }
      }
    );
  }, [
    activeTab,
    payloadType,
    urlInput,
    textInput,
    wifiSsid,
    wifiPass,
    wifiType,
    emailInput,
    emailSubject,
    phoneInput,
    vcardName,
    vcardPhone,
    vcardEmail,
    vcardCompany,
    fgColor,
    bgColor,
    errorCorrection,
    qrSize,
    margin,
    badgeImage,
    badgePosition,
    badgeSizePercent,
    badgeBorderWidth,
    badgeBorderColor,
    badgeShape,
  ]);

  // Render Barcode
  useEffect(() => {
    if (activeTab !== 'barcode') return;
    const svg = barcodeSvgRef.current;
    if (!svg) return;

    try {
      JsBarcode(svg, barcodeText || '12345678', {
        format: barcodeFormat,
        lineColor: fgColor === '#00f2fe' ? '#38bdf8' : fgColor,
        background: bgColor,
        width: 2.2,
        height: 100,
        displayValue: true,
        font: 'Outfit',
        fontSize: 14,
        margin: 16,
      });
    } catch (e) {
      console.warn('Invalid barcode format:', e);
    }
  }, [activeTab, barcodeText, barcodeFormat, fgColor, bgColor]);

  const handleBadgeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBadgeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPNG = () => {
    if (activeTab === 'barcode') {
      const svg = barcodeSvgRef.current;
      if (!svg) return;
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      downloadText(svgData, `zenith-barcode-${barcodeText}.svg`, 'image/svg+xml');
      return;
    }
    const canvas = qrCanvasRef.current;
    if (canvas) {
      downloadCanvas(canvas, `zenith-qr-${payloadType}.png`, 'image/png');
    }
  };

  const downloadJPG = () => {
    const canvas = qrCanvasRef.current;
    if (canvas) {
      downloadCanvas(canvas, `zenith-qr-${payloadType}.jpg`, 'image/jpeg', 0.95);
    }
  };

  const copyPayload = () => {
    void copyToClipboard(getQrPayload());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      {/* Studio Header Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'qr'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            QR Code Generator
          </button>
          <button
            onClick={() => setActiveTab('photo-badge')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'photo-badge'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Photo QR Badge
          </button>
          <button
            onClick={() => setActiveTab('barcode')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'barcode'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
            }`}
          >
            Linear Barcode
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-800/40">
          <ShieldCheck className="w-4 h-4" />
          <span>100% In-Browser Rendering</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config Panel */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab !== 'barcode' ? (
            <>
              {/* QR Payload Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Payload Type
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(['url', 'text', 'wifi', 'email', 'phone', 'vcard'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPayloadType(type)}
                      className={`py-2 text-xs font-medium rounded-lg uppercase tracking-wider transition-colors ${
                        payloadType === type
                          ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-300'
                          : 'bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payload Inputs */}
              <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-3">
                {payloadType === 'url' && (
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Target Website URL</label>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                {payloadType === 'text' && (
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Plain Text Content</label>
                    <textarea
                      rows={3}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type or paste text..."
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                {payloadType === 'wifi' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Network Name (SSID)</label>
                      <input
                        type="text"
                        value={wifiSsid}
                        onChange={(e) => setWifiSsid(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-300 font-medium mb-1">Wi-Fi Password</label>
                      <input
                        type="text"
                        value={wifiPass}
                        onChange={(e) => setWifiPass(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                      />
                    </div>
                  </div>
                )}

                {payloadType === 'email' && (
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Recipient Email"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Subject Line"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                  </div>
                )}

                {payloadType === 'phone' && (
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">Phone Number (with Country Code)</label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                  </div>
                )}

                {payloadType === 'vcard' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={vcardName}
                      onChange={(e) => setVcardName(e.target.value)}
                      placeholder="Full Name"
                      className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="text"
                      value={vcardCompany}
                      onChange={(e) => setVcardCompany(e.target.value)}
                      placeholder="Company"
                      className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="tel"
                      value={vcardPhone}
                      onChange={(e) => setVcardPhone(e.target.value)}
                      placeholder="Phone"
                      className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                    <input
                      type="email"
                      value={vcardEmail}
                      onChange={(e) => setVcardEmail(e.target.value)}
                      placeholder="Email"
                      className="bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-100"
                    />
                  </div>
                )}
              </div>

              {/* Photo QR Badge Customizer */}
              {(activeTab === 'photo-badge' || badgeImage) && (
                <div className="bg-purple-950/20 border border-purple-800/40 p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                      Photo Badge Settings
                    </span>
                    {badgeImage && (
                      <button
                        onClick={() => setBadgeImage(null)}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Badge
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-3 py-2 bg-purple-900/40 hover:bg-purple-900/60 border border-purple-700/50 rounded-lg cursor-pointer text-xs font-medium text-purple-200 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>{badgeImage ? 'Replace Photo' : 'Upload Photo / Logo'}</span>
                      <input type="file" accept="image/*" onChange={handleBadgeUpload} className="hidden" />
                    </label>
                    <span className="text-[11px] text-slate-400">PNG, JPG or WebP supported</span>
                  </div>

                  {badgeImage && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Position</label>
                        <select
                          value={badgePosition}
                          onChange={(e) => setBadgePosition(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                        >
                          <option value="center">Center</option>
                          <option value="top-right">Top Right</option>
                          <option value="bottom-right">Bottom Right</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Shape</label>
                        <select
                          value={badgeShape}
                          onChange={(e) => setBadgeShape(e.target.value as any)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                        >
                          <option value="circle">Circle</option>
                          <option value="rounded">Rounded</option>
                          <option value="square">Square</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Size ({badgeSizePercent}%)</label>
                        <input
                          type="range"
                          min={15}
                          max={30}
                          value={badgeSizePercent}
                          onChange={(e) => setBadgeSizePercent(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Border Width</label>
                        <input
                          type="number"
                          min={0}
                          max={8}
                          value={badgeBorderWidth}
                          onChange={(e) => setBadgeBorderWidth(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Color & Size Controls */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Matrix Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-20 bg-slate-900 border border-slate-700 text-xs px-2 py-1 rounded text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-20 bg-slate-900 border border-slate-700 text-xs px-2 py-1 rounded text-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Error Correction</label>
                  <select
                    value={errorCorrection}
                    onChange={(e) => setErrorCorrection(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-slate-200"
                  >
                    <option value="L">L (7% Recovery)</option>
                    <option value="M">M (15% Recovery)</option>
                    <option value="Q">Q (25% Recovery)</option>
                    <option value="H">H (30% Highest)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 font-medium mb-1">Size ({qrSize}px)</label>
                  <input
                    type="range"
                    min={240}
                    max={600}
                    step={20}
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Barcode Controls */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Barcode Standard Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['CODE128', 'EAN13', 'CODE39'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setBarcodeFormat(fmt)}
                      className={`py-2 text-xs font-medium rounded-lg uppercase ${
                        barcodeFormat === fmt
                          ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                          : 'bg-slate-800/60 border border-slate-700 text-slate-400'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Barcode Value / Number</label>
                <input
                  type="text"
                  value={barcodeText}
                  onChange={(e) => setBarcodeText(e.target.value)}
                  placeholder="Enter alphanumeric or digits..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {barcodeFormat === 'EAN13' ? 'EAN13 requires exactly 12 or 13 digits.' : 'Supports standard ASCII alphanumeric characters.'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Preview & Export Panel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-between bg-slate-950/70 border border-slate-800 p-6 rounded-2xl">
          <div className="w-full text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 inline-block">
              Live Verified Preview
            </span>
            <div className="flex items-center justify-center p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 shadow-inner">
              {activeTab !== 'barcode' ? (
                <canvas ref={qrCanvasRef} className="max-w-full rounded-lg shadow-lg" />
              ) : (
                <div className="p-4 bg-slate-900 rounded-lg overflow-x-auto max-w-full">
                  <svg ref={barcodeSvgRef} className="max-w-full" />
                </div>
              )}
            </div>
          </div>

          {/* Download & Export Zone */}
          <div className="w-full space-y-3 pt-6 border-t border-slate-800/80 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={downloadPNG}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
              {activeTab !== 'barcode' ? (
                <button
                  onClick={downloadJPG}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JPG</span>
                </button>
              ) : (
                <button
                  onClick={downloadPNG}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download SVG</span>
                </button>
              )}
            </div>

            <button
              onClick={copyPayload}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors"
            >
              {copySuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copySuccess ? 'Payload Copied to Clipboard!' : 'Copy Raw Encoded Text'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
