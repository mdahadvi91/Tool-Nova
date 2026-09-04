import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Globe, Shield, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { WORKSPACES } from '../../registry/workspaces';
import { TOOLS } from '../../registry/tools';
import { useI18n } from '../../i18n/I18nContext';
import { DynamicIcon } from '../common/DynamicIcon';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  isSidebarOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { locale, setLocale, t } = useI18n();

  // Filter workspaces & tools based on query
  const filteredResults = React.useMemo(() => {
    if (!searchQuery.trim()) return { tools: [], workspaces: [] };
    const q = searchQuery.toLowerCase();

    const matchedTools = TOOLS.filter(
      (tool) =>
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q))
    ).slice(0, 6);

    const matchedWorkspaces = WORKSPACES.filter(
      (ws) =>
        ws.name.toLowerCase().includes(q) ||
        ws.description.toLowerCase().includes(q) ||
        ws.categories.some((cat) => cat.toLowerCase().includes(q))
    ).slice(0, 4);

    return { tools: matchedTools, workspaces: matchedWorkspaces };
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (route: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle navigation sidebar"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/80 transition-colors lg:hidden"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 hidden sm:inline">{t.tagline}</span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-lg hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && (filteredResults.tools.length > 0 || filteredResults.workspaces.length > 0) && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 backdrop-blur-2xl">
              {filteredResults.tools.length > 0 && (
                <div className="mb-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 block">
                    {t.allTools}
                  </span>
                  <div className="space-y-1">
                    {filteredResults.tools.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleResultClick(tool.route)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                            <DynamicIcon name={tool.iconName} className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                              {tool.name}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate max-w-xs">
                              {tool.shortDescription}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredResults.workspaces.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 block">
                    {t.workspaces}
                  </span>
                  <div className="space-y-1">
                    {filteredResults.workspaces.map((ws) => (
                      <button
                        key={ws.id}
                        onClick={() => handleResultClick(`/workspace/${ws.id}`)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-800/80 group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <DynamicIcon name={ws.iconName} className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-200 group-hover:text-purple-300">
                              {ws.name}
                            </p>
                            <p className="text-[11px] text-slate-400">{ws.categories[0] || 'Studio'}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {ws.toolIds.length} tools
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions: Privacy Badge & Language Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Client-Side Engine Active</span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as typeof locale)}
              className="bg-transparent focus:outline-none text-slate-200 cursor-pointer text-xs font-medium"
            >
              <option value="en" className="bg-slate-900 text-slate-200">English (EN)</option>
              <option value="bn" className="bg-slate-900 text-slate-200">বাংলা (BN)</option>
              <option value="ar" className="bg-slate-900 text-slate-200">العربية (AR)</option>
              <option value="hi" className="bg-slate-900 text-slate-200">हिन्दी (HI)</option>
              <option value="ur" className="bg-slate-900 text-slate-200">اردو (UR)</option>
              <option value="es" className="bg-slate-900 text-slate-200">Español (ES)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
