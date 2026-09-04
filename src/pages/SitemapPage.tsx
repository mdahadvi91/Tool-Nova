import React from 'react';
import { Link } from 'react-router-dom';
import { WORKSPACES } from '../registry/workspaces';
import { TOOLS } from '../registry/tools';
import { Map, ArrowRight, ExternalLink } from 'lucide-react';
import { DynamicIcon } from '../components/common/DynamicIcon';

export const SitemapPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl">
            <Map className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Platform HTML Sitemap</h1>
            <p className="text-xs text-slate-400 mt-1">
              Index of all 35 operational workspaces and utility tools for direct access and crawlability
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WORKSPACES.map((ws) => {
          const wsTools = TOOLS.filter((t) => t.workspaceId === ws.id);
          return (
            <div key={ws.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-3">
              <Link
                to={`/workspace/${ws.id}`}
                className="flex items-center gap-2.5 font-bold text-sm text-cyan-300 hover:text-cyan-200 transition-colors group"
              >
                <DynamicIcon name={ws.iconName} className="w-4 h-4 text-cyan-400" />
                <span className="group-hover:underline">{ws.name}</span>
                <span className="text-[10px] font-mono text-slate-500 ml-auto">#{ws.id.split('-')[0]}</span>
              </Link>

              <ul className="space-y-1.5 pl-4 border-l border-slate-800 text-xs">
                {wsTools.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      to={tool.route}
                      className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 py-0.5"
                    >
                      <span>{tool.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
