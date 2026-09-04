import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download, RefreshCw, Upload, Eye, ShieldCheck, Layers } from 'lucide-react';
import { downloadCanvas, downloadBlob } from '../../utils/download';

export const VisitingCardBuilder: React.FC = () => {
  // Card Content
  const [fullName, setFullName] = useState('Alex Rivera');
  const [jobTitle, setJobTitle] = useState('Chief Technology Officer');
  const [companyName, setCompanyName] = useState('Zenith Dynamics Inc.');
  const [tagline, setTagline] = useState('Building the Future of Autonomous Systems');
  const [phone, setPhone] = useState('+1 (555) 349-2810');
  const [email, setEmail] = useState('alex.rivera@zenithdynamics.com');
  const [website, setWebsite] = useState('www.zenithdynamics.com');
  const [address, setAddress] = useState('742 Evergreen Blvd, San Francisco, CA');

  // Media
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Styling & Theme
  const [template, setTemplate] = useState<'cyber-dark' | 'obsidian-gold' | 'executive-navy' | 'clean-frost'>('cyber-dark');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [showBleedGuide, setShowBleedGuide] = useState(true);

  // Canvases for Front and Back
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);

  // Render Canvas (1050 x 600 px standard 3.5" x 2" at 300 DPI)
  const drawCard = (side: 'front' | 'back') => {
    const canvas = side === 'front' ? frontCanvasRef.current : backCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 1050;
    const h = 600;
    canvas.width = w;
    canvas.height = h;

    // Theme color palette definitions
    let bgGradient: CanvasGradient;
    let primaryColor = '#ffffff';
    let accentColor = '#00f2fe';
    let secondaryColor = '#94a3b8';

    if (template === 'cyber-dark') {
      bgGradient = ctx.createLinearGradient(0, 0, w, h);
      bgGradient.addColorStop(0, '#0a0e1a');
      bgGradient.addColorStop(1, '#151d30');
      primaryColor = '#ffffff';
      accentColor = '#38bdf8';
      secondaryColor = '#94a3b8';
    } else if (template === 'obsidian-gold') {
      bgGradient = ctx.createLinearGradient(0, 0, w, h);
      bgGradient.addColorStop(0, '#111111');
      bgGradient.addColorStop(1, '#1c1917');
      primaryColor = '#fef08a';
      accentColor = '#eab308';
      secondaryColor = '#d6d3d1';
    } else if (template === 'executive-navy') {
      bgGradient = ctx.createLinearGradient(0, 0, w, h);
      bgGradient.addColorStop(0, '#0f172a');
      bgGradient.addColorStop(1, '#1e293b');
      primaryColor = '#f8fafc';
      accentColor = '#60a5fa';
      secondaryColor = '#cbd5e1';
    } else {
      bgGradient = ctx.createLinearGradient(0, 0, w, h);
      bgGradient.addColorStop(0, '#090d16');
      bgGradient.addColorStop(1, '#0c1929');
      primaryColor = '#ffffff';
      accentColor = '#2dd4bf';
      secondaryColor = '#94a3b8';
    }

    // Fill Card Background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);

    // Decorative geometric accents
    ctx.save();
    ctx.strokeStyle = `${accentColor}25`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.65, 0);
    ctx.lineTo(w, h * 0.7);
    ctx.stroke();

    ctx.fillStyle = `${accentColor}10`;
    ctx.beginPath();
    ctx.arc(w - 60, 60, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Bleed / Safety Guide (38px margin = 1/8 inch at 300 DPI)
    if (showBleedGuide) {
      ctx.save();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.strokeRect(38, 38, w - 76, h - 76);
      ctx.restore();
    }

    if (side === 'front') {
      // Front Design
      const leftMargin = 90;

      // Company name at top
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 26px Outfit, sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText(companyName.toUpperCase(), leftMargin, 120);

      // Person Name
      ctx.fillStyle = primaryColor;
      ctx.font = '700 56px Outfit, sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText(fullName, leftMargin, 200);

      // Job Title
      ctx.fillStyle = secondaryColor;
      ctx.font = '400 28px Outfit, sans-serif';
      ctx.fillText(jobTitle, leftMargin, 245);

      // Accent divider line
      ctx.fillStyle = accentColor;
      ctx.fillRect(leftMargin, 275, 140, 4);

      // Contact details
      ctx.font = '500 22px Outfit, sans-serif';
      ctx.fillStyle = secondaryColor;
      const contactY = 350;
      const lineGap = 42;

      ctx.fillText(`P:  ${phone}`, leftMargin, contactY);
      ctx.fillText(`E:  ${email}`, leftMargin, contactY + lineGap);
      ctx.fillText(`W: ${website}`, leftMargin, contactY + lineGap * 2);
      ctx.fillText(`A:  ${address}`, leftMargin, contactY + lineGap * 3);

      // Logo or Avatar on right
      if (avatarUrl) {
        const img = new Image();
        img.onload = () => {
          ctx.save();
          const avSize = 180;
          const avX = w - 240;
          const avY = 140;
          ctx.beginPath();
          ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, avX, avY, avSize, avSize);
          ctx.restore();

          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(avX + avSize / 2, avY + avSize / 2, avSize / 2, 0, Math.PI * 2);
          ctx.stroke();
        };
        img.src = avatarUrl;
      }
    } else {
      // Back Design
      ctx.textAlign = 'center';

      // Centered Brand Focus
      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 58px Outfit, sans-serif';
      ctx.letterSpacing = '4px';
      ctx.fillText(companyName.toUpperCase(), w / 2, 260);

      ctx.fillStyle = accentColor;
      ctx.fillRect(w / 2 - 80, 290, 160, 4);

      ctx.fillStyle = secondaryColor;
      ctx.font = '400 26px Outfit, sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText(tagline, w / 2, 350);

      ctx.fillStyle = accentColor;
      ctx.font = '600 22px Outfit, sans-serif';
      ctx.fillText(website, w / 2, 450);

      ctx.textAlign = 'start';
    }
  };

  useEffect(() => {
    drawCard('front');
    drawCard('back');
  }, [
    fullName,
    jobTitle,
    companyName,
    tagline,
    phone,
    email,
    website,
    address,
    template,
    showBleedGuide,
    avatarUrl,
  ]);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const downloadSideImage = (side: 'front' | 'back', format: 'png' | 'jpg') => {
    const canvas = side === 'front' ? frontCanvasRef.current : backCanvasRef.current;
    if (canvas) {
      downloadCanvas(
        canvas,
        `zenith-card-${side}-${template}.${format}`,
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.98
      );
    }
  };

  const downloadCardPDF = async () => {
    const frontCanvas = frontCanvasRef.current;
    const backCanvas = backCanvasRef.current;
    if (!frontCanvas || !backCanvas) return;

    try {
      const pdfDoc = await PDFDocument.create();
      // 3.5" x 2" in points (72 pt / inch) -> 252 x 144 pt
      const frontDataUrl = frontCanvas.toDataURL('image/png');
      const backDataUrl = backCanvas.toDataURL('image/png');

      const frontImg = await pdfDoc.embedPng(frontDataUrl);
      const backImg = await pdfDoc.embedPng(backDataUrl);

      // Page 1: Front
      const page1 = pdfDoc.addPage([252, 144]);
      page1.drawImage(frontImg, { x: 0, y: 0, width: 252, height: 144 });

      // Page 2: Back
      const page2 = pdfDoc.addPage([252, 144]);
      page2.drawImage(backImg, { x: 0, y: 0, width: 252, height: 144 });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      downloadBlob(blob, `zenith-visiting-card-${fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Executive Business Card Builder</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              300 DPI Print-Ready
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Standard 3.5" × 2" (1050 × 600 px) with bleed margins</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBleedGuide(!showBleedGuide)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showBleedGuide
                ? 'bg-rose-950/40 border-rose-700/50 text-rose-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bleed Guide {showBleedGuide ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Editor */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Identity & Title
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Brand Tagline (Back)</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Contact Coordinates
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Website</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Address / Location</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Theme & Avatar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Theme Palette</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
              >
                <option value="cyber-dark">Cyber Dark & Neon Blue</option>
                <option value="obsidian-gold">Obsidian & Royal Gold</option>
                <option value="executive-navy">Executive Slate & Blue</option>
                <option value="clean-frost">Emerald Frost</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Photo / Logo</label>
              <label className="flex items-center gap-2 px-3 py-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-lg cursor-pointer text-xs text-slate-200">
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>{avatarUrl ? 'Change Photo' : 'Upload Headshot'}</span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Right Preview & Export */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/70 border border-slate-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Interactive Preview ({viewSide.toUpperCase()})
              </span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewSide('front')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    viewSide === 'front' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => setViewSide('back')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    viewSide === 'back' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Back
                </button>
              </div>
            </div>

            {/* Visual Canvas Display */}
            <div className="w-full flex items-center justify-center p-2 bg-slate-900/40 rounded-xl border border-slate-800/60 shadow-inner">
              <div className={viewSide === 'front' ? 'block w-full' : 'hidden'}>
                <canvas ref={frontCanvasRef} className="w-full h-auto rounded-lg shadow-2xl border border-slate-700/50" />
              </div>
              <div className={viewSide === 'back' ? 'block w-full' : 'hidden'}>
                <canvas ref={backCanvasRef} className="w-full h-auto rounded-lg shadow-2xl border border-slate-700/50" />
              </div>
            </div>

            {showBleedGuide && (
              <p className="text-[11px] text-rose-400/80 mt-2 text-center">
                Dashed red lines indicate 1/8" print bleed trim line. Keep essential text inside!
              </p>
            )}
          </div>

          {/* Export Buttons */}
          <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => downloadSideImage('front', 'png')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-cyan-600/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Front PNG</span>
              </button>
              <button
                onClick={() => downloadSideImage('back', 'png')}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Back PNG</span>
              </button>
              <button
                onClick={downloadCardPDF}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-600/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
