import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { WORKSPACES } from '../registry/workspaces';
import { TOOLS } from '../registry/tools';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { ArrowRight, ChevronRight, CheckCircle, HelpCircle, Sparkles, BookOpen, Layers } from 'lucide-react';
import { AdSlot } from '../ads/components/AdSlot';

export const WorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const workspace = WORKSPACES.find((w) => w.id === id);

  if (!workspace) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">Workspace Not Found</h2>
        <p className="text-slate-400 text-sm mb-6">The requested workspace does not exist or has moved.</p>
        <Link to="/" className="px-4 py-2 bg-cyan-600 text-white text-xs font-semibold rounded-xl">
          Return to Platform Home
        </Link>
      </div>
    );
  }

  // Filter tools belonging to this workspace
  const workspaceTools = TOOLS.filter((t) => t.workspaceId === workspace.id);

  return (
    <div className="space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-slate-200 transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-500">{workspace.categories[0] || 'Workspaces'}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-400 font-medium">{workspace.name}</span>
      </nav>

      {/* Workspace Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 flex-shrink-0">
            <DynamicIcon name={workspace.iconName} className="w-7 h-7" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {workspace.categories[0] || 'Studio'}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                Workspace #{workspace.id.split('-')[0]}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{workspace.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {workspace.description}
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Tools Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Available Studio Tools</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {workspaceTools.length} Tools
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workspaceTools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.route}
              className="group bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                  </div>
                  {tool.isPopular && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Popular
                    </span>
                  )}
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

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-emerald-400 font-medium">Ready</span>
                <span className="flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  Launch Studio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Placement: Safe Separator After Workspace Tools */}
      <AdSlot placement="workspace-after-tools" />

      {/* Deep-Dive Workspace SEO Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workflow & Key Capabilities */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Recommended Workflow & Usage</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            All tools in the {workspace.name} are designed to seamlessly integrate into your daily workflow. Whether
            preparing assets for retail printing, transforming enterprise data formats, or computing legal obligations,
            the suite processes all jobs directly on your device.
          </p>
          <ul className="space-y-2 text-xs text-slate-400 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Full compliance with international standards and high-resolution export profiles</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Real-time instant rendering feedback without queued server delays</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Export in multiple production formats including vector PDF, PNG, and SVG</span>
            </li>
          </ul>
        </div>

        {/* Workspace FAQs */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Workspace FAQs</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <p className="font-semibold text-slate-200">Are there limits on file sizes or processing frequency?</p>
              <p className="text-slate-400 mt-1 leading-relaxed">
                There are no platform restrictions. All operations are executed locally within your device's memory.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <p className="font-semibold text-slate-200">Can I work offline with this workspace?</p>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Yes! Once the workspace has loaded in your browser, all processing algorithms function completely offline without internet connectivity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Placement: Bottom Before Footer */}
      <AdSlot placement="workspace-after-faq" />
    </div>
  );
};
