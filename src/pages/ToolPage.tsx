import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { TOOLS } from '../registry/tools';
import { WORKSPACES } from '../registry/workspaces';
import { ToolRenderer } from '../components/tools/ToolRenderer';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdSlot } from '../ads/components/AdSlot';
import { ChevronRight, ShieldCheck, Sparkles, HelpCircle, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const tool = TOOLS.find((t) => t.id === slug || t.route === `/tool/${slug}`);

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Tool Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested studio tool does not exist or has moved.</p>
        <Link to="/" className="px-4 py-2 bg-cyan-600 text-white text-xs font-semibold rounded-xl">
          Return to Platform Home
        </Link>
      </div>
    );
  }

  const workspace = WORKSPACES.find((w) => w.id === tool.workspaceId);
  const relatedTools = TOOLS.filter((t) => t.workspaceId === tool.workspaceId && t.id !== tool.id).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-200 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        {workspace && (
          <>
            <Link to={`/workspace/${workspace.id}`} className="hover:text-slate-200 transition-colors">
              {workspace.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          </>
        )}
        <span className="text-cyan-400 font-medium">{tool.name}</span>
      </nav>

      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
            <DynamicIcon name={tool.iconName} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl font-extrabold text-white tracking-tight">{tool.name}</h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                {tool.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">{tool.shortDescription}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium flex-shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>Client-Side Execution</span>
        </div>
      </div>

      {/* SACRED FUNCTIONAL TOOL ZONE: STRICTLY NO ADS IN THIS CONTAINER */}
      <section className="relative w-full" data-sacred-zone="true">
        <ToolRenderer tool={tool} />
      </section>

      {/* Educational & SEO Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
        {/* How It Works */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">How It Works</h3>
          </div>
          <div className="space-y-3">
            {tool.seo.howItWorks.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono font-bold flex-shrink-0 text-[11px]">
                  {step.step || idx + 1}
                </span>
                <div>
                  <strong className="text-slate-200 block">{step.title}</strong>
                  <p className="text-slate-400 leading-relaxed pt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Pro Tips for Best Results</h3>
          </div>
          <div className="space-y-3">
            {tool.seo.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tool FAQs Accordion */}
      {tool.seo.faqs.length > 0 && (
        <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {tool.seo.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-200">{faq.question}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ad Placement: Safe Separator After FAQ */}
      <AdSlot placement="tool-after-faq" />

      {/* Related Tools in Same Workspace */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-white">Related Tools in This Workspace</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.id}
                to={relTool.route}
                className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl transition-all group flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 flex-shrink-0">
                  <DynamicIcon name={relTool.iconName} className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                    {relTool.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{relTool.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ad Placement: Before Footer */}
      <AdSlot placement="tool-before-footer" />
    </div>
  );
};
