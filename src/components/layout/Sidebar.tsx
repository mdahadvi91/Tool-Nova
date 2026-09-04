import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronRight, Sparkles, Filter, Layers } from 'lucide-react';
import { WORKSPACES } from '../../registry/workspaces';
import { DynamicIcon } from '../common/DynamicIcon';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Media & Documents', 'Developer & Engineering', 'Finance & Business', 'Productivity & Utilities'];

  const filteredWorkspaces = WORKSPACES.filter((ws) => {
    const matchesQuery =
      ws.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ws.categories.some((c) => c.toLowerCase().includes(filterQuery.toLowerCase()));

    if (selectedCategory === 'All') return matchesQuery;
    if (selectedCategory === 'Media & Documents') {
      return matchesQuery && ws.categories.some((c) => c.includes('Graphics') || c.includes('Documents') || c.includes('Media') || c.includes('Audio'));
    }
    if (selectedCategory === 'Developer & Engineering') {
      return matchesQuery && ws.categories.some((c) => c.includes('Developer') || c.includes('Engineering') || c.includes('Security') || c.includes('Network'));
    }
    if (selectedCategory === 'Finance & Business') {
      return matchesQuery && ws.categories.some((c) => c.includes('Finance') || c.includes('Business') || c.includes('Legal'));
    }
    return matchesQuery;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-72 bg-slate-950/95 border-r border-slate-800/80 p-4 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Workspace Quick Search */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter 35 workspaces..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scrollable Workspaces List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2 flex items-center justify-between">
            <span>Workspaces ({filteredWorkspaces.length})</span>
            <span className="font-mono text-cyan-400">01–35</span>
          </div>

          {filteredWorkspaces.map((ws) => {
            const wsRoute = `/workspace/${ws.id}`;
            const isActive = location.pathname === wsRoute;
            return (
              <Link
                key={ws.id}
                to={wsRoute}
                onClick={onClose}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                        : 'bg-slate-900 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                    }`}
                  >
                    <DynamicIcon name={ws.iconName} className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="truncate text-slate-200 font-semibold">{ws.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{ws.categories[0] || 'Studio'}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 flex-shrink-0">
                  {ws.toolIds.length}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom Platform Status Card */}
        <div className="pt-3 border-t border-slate-800/80 mt-2">
          <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300 font-medium">All 35 Workspaces</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">v2.4.0-prod</span>
          </div>
        </div>
      </aside>
    </>
  );
};
