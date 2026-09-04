import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Layers, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { WORKSPACES } from '../registry/workspaces';
import { TOOLS } from '../registry/tools';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdSlot } from '../ads/components/AdSlot';
import { DocumentMeta } from '../components/seo/DocumentMeta';
import { SITE_CONFIG } from '../config/site';

export const HomePage: React.FC = () => {
  const popularTools = TOOLS.filter((t) => t.isPopular);
  const featuredTools = TOOLS.filter((t) => t.isFeatured);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="space-y-12">
      <DocumentMeta
        title={`${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`}
        description={SITE_CONFIG.description}
        canonical={SITE_CONFIG.getCanonicalUrl('/')}
        schema={websiteSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/70 to-slate-950/90 border border-slate-800/80 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>35 Enterprise Workspaces • Real Working Utilities</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Professional Global <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Multi-Tool Cloud Platform
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive suite of 35 specialized engineering, document, graphic, and financial studios.
            Every tool runs 100% locally in your web browser with zero remote file transmission or tracking.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/tool/qr-barcode-studio"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98]"
            >
              <span>Launch QR & Barcode Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/workspace/05-pdf-tools"
              className="flex items-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-800 transition-all active:scale-[0.98]"
            >
              <span>Explore PDF Toolkit</span>
            </Link>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Zero server upload — 100% Client Privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Standard 300 DPI high-res exports</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Official UAE Labor & VAT legal calculators</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Studios Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Popular Working Studios</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                Live & Functional
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">High-traffic utility studios ready for instant production use</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.route}
              className="group relative bg-slate-900/50 hover:bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {tool.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-[11px]">
                <span className="text-emerald-400 font-medium">In-Browser Ready</span>
                <span className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Launch Studio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Placement: Safe Separation After Popular Tools */}
      <AdSlot placement="home-after-popular" />

      {/* Workspaces Directory Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              All 35 Specialized Workspaces
            </h2>
            <p className="text-xs text-slate-400 mt-1">Structured categories designed for rapid discovery and task execution</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {WORKSPACES.map((ws) => (
            <Link
              key={ws.id}
              to={`/workspace/${ws.id}`}
              className="p-4 rounded-xl bg-slate-900/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 flex-shrink-0 transition-colors">
                <DynamicIcon name={ws.iconName} className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                  {ws.name}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{ws.categories[0] || 'Studio'}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400">
                  <span className="font-mono text-cyan-400">{ws.toolIds.length} tools</span>
                  <span>•</span>
                  <span>Open Workspace</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Placement: After Featured Workspaces */}
      <AdSlot placement="home-after-featured" />

      {/* Platform FAQ & Value Section */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Everything you need to know about ToolNova privacy and architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">Are my files or photos uploaded to your servers?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No. All operations, including PDF page merging, image filter processing, and barcode generation, execute locally on
              your machine utilizing modern Web APIs (Canvas, WebAssembly, and Web Crypto). Your private documents never touch our servers.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">Can I use the exported business cards and barcodes commercially?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yes! All generated QR codes, standard barcodes (Code 128, EAN-13), and 300 DPI business cards are completely royalty-free
              and ready for commercial retail printing and packaging.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">Are the UAE legal calculations accurate?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yes. The UAE Gratuity Calculator strictly implements Federal Decree-Law No. 33 of 2021 regarding the regulation of
              labor relations, including the 21/30 day wage scales and the statutory two-year salary ceiling cap.
            </p>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 space-y-2">
            <h4 className="text-xs font-bold text-slate-200">Are there limits on PDF merging or image conversions?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              There are no artificial subscription gates or arbitrary file counters. Processing capability is bound only by your browser's
              available hardware memory.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
