import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, Heart, Globe, ExternalLink } from 'lucide-react';
import { WORKSPACES } from '../../registry/workspaces';
import { useI18n } from '../../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        {/* Col 1: Brand & Privacy Commitment */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">
              Tool<span className="text-cyan-400">Nova</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {t.tagline} Built with a strict
            privacy-first architecture: calculations, PDF operations, media processing, and code utilities execute directly
            within your local web browser.
          </p>

          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-800/30 w-fit text-[11px]">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            <span>{t.privacyBadge}</span>
          </div>
        </div>

        {/* Col 2: Featured Workspaces */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
            Core Workspaces
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link to="/workspace/01-qr-barcode" className="hover:text-cyan-400 transition-colors">
                QR & Barcode Studio
              </Link>
            </li>
            <li>
              <Link to="/workspace/02-visiting-card" className="hover:text-cyan-400 transition-colors">
                Visiting Card Builder
              </Link>
            </li>
            <li>
              <Link to="/workspace/03-image-editing" className="hover:text-cyan-400 transition-colors">
                Image Editing Studio
              </Link>
            </li>
            <li>
              <Link to="/workspace/04-image-converter" className="hover:text-cyan-400 transition-colors">
                Universal Image Converter
              </Link>
            </li>
            <li>
              <Link to="/workspace/05-pdf-tools" className="hover:text-cyan-400 transition-colors">
                PDF Toolkit Studio
              </Link>
            </li>
            <li>
              <Link to="/workspace/14-financial-calc" className="hover:text-cyan-400 transition-colors">
                Financial & Loan Calculators
              </Link>
            </li>
            <li>
              <Link to="/workspace/33-uae-tools" className="hover:text-cyan-400 transition-colors">
                UAE Labor & Legal Tools
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Developer Utilities */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
            Engineering & Security
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link to="/tool/json-studio" className="hover:text-cyan-400 transition-colors">
                Developer JSON Studio
              </Link>
            </li>
            <li>
              <Link to="/tool/security-hash-studio" className="hover:text-cyan-400 transition-colors">
                SHA-256 & Cryptographic Hashes
              </Link>
            </li>
            <li>
              <Link to="/tool/regex-studio" className="hover:text-cyan-400 transition-colors">
                Interactive Regex Studio
              </Link>
            </li>
            <li>
              <Link to="/tool/color-studio" className="hover:text-cyan-400 transition-colors">
                WCAG Contrast & Palette Studio
              </Link>
            </li>
            <li>
              <Link to="/tool/text-metrics-analyzer" className="hover:text-cyan-400 transition-colors">
                Text Metrics & Case Converter
              </Link>
            </li>
            <li>
              <Link to="/tool/universal-unit-converter" className="hover:text-cyan-400 transition-colors">
                Universal Unit Converter
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform Policies */}
        <div className="md:col-span-2 space-y-2">
          <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
            Platform & Legal
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <Link to="/privacy" className="hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-cyan-400 transition-colors">
                Cookie Preferences
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="hover:text-cyan-400 transition-colors">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:text-cyan-400 transition-colors">
                HTML Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} ToolNova. {t.footerRights}</p>
        <p>{t.clientSidePrivacyNotice}</p>
      </div>
    </footer>
  );
};
