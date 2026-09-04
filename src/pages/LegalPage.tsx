import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Shield, FileText, Cookie, AlertTriangle, ArrowLeft } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Privacy Policy';
  let icon = <Shield className="w-6 h-6 text-cyan-400" />;

  if (path.includes('terms')) {
    title = 'Terms of Service';
    icon = <FileText className="w-6 h-6 text-cyan-400" />;
  } else if (path.includes('cookies')) {
    title = 'Cookie Policy & Consent Management';
    icon = <Cookie className="w-6 h-6 text-cyan-400" />;
  } else if (path.includes('disclaimer')) {
    title = 'Platform Disclaimer';
    icon = <AlertTriangle className="w-6 h-6 text-amber-400" />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Platform</span>
      </Link>

      <div className="flex items-center gap-3 border-b border-slate-800 pb-6">
        <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl">{icon}</div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">{title}</h1>
          <p className="text-xs text-slate-400 mt-1">Effective Date: January 1, 2026 • Version 2.4.0</p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
        {path.includes('privacy') && (
          <>
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Privacy by Architecture</h2>
              <p>
                ZenithTools operates under a strict "Client-Side First" architectural principle. All operations performed
                by our utilities—including PDF merges, page extractions, image editing, canvas filters, barcode generation,
                and cryptographic hashing—execute directly within your device's web browser using native Web APIs.
              </p>
              <p>
                At no time are your private documents, files, images, or payroll inputs transmitted to or stored on our servers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Data We Do Not Collect</h2>
              <p>
                We do not require account registration or collect personal identity information. We do not inspect file contents,
                nor do we store logs containing user-generated metadata.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Advertising & Cookies</h2>
              <p>
                We display non-intrusive banner advertisements through approved ad networks (Google AdSense, Monetag, Adsterra)
                to support ongoing maintenance. You have complete control over optional tracking cookies via our Consent Preferences banner.
              </p>
            </section>
          </>
        )}

        {path.includes('terms') && (
          <>
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ZenithTools Cloud Platform, you agree to comply with these terms. If you do not agree,
                please discontinue use of the utilities immediately.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Permitted Commercial Use</h2>
              <p>
                All output generated using our tools—including barcodes, QR badges, business cards, converted images, and
                formatted documents—is completely royalty-free and available for personal and commercial deployment.
              </p>
            </section>
          </>
        )}

        {path.includes('cookies') && (
          <>
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. What Are Cookies?</h2>
              <p>
                Cookies are small configuration files saved locally on your device to remember user settings, selected
                interface language, and consent decisions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Cookie Categories</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Essential:</strong> Remember active language, theme, and consent state.</li>
                <li><strong>Analytics:</strong> Measure aggregate page load performance anonymously.</li>
                <li><strong>Advertising:</strong> Serve privacy-safe banner promotions without deceptive popups.</li>
              </ul>
            </section>
          </>
        )}

        {path.includes('disclaimer') && (
          <>
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. General Information Disclaimer</h2>
              <p>
                Calculations provided by the Financial EMI and UAE Gratuity calculators are designed for estimates and informational
                guidance. While compliant with UAE Federal Decree-Law No. 33 of 2021, they do not replace formal legal counsel or official
                MOHRE labor dispute adjudications.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
