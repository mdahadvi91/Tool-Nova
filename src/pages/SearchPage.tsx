import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { TOOLS } from '../registry/tools';
import { WORKSPACES } from '../registry/workspaces';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { DocumentMeta } from '../components/seo/DocumentMeta';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/I18nContext';
import { Search, ArrowRight, Sparkles, Filter, X } from 'lucide-react';
import { AdSlot } from '../ads/components/AdSlot';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t } = useTranslation();

  // Sync state when URL query param changes
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const handleSearchChange = (newVal: string) => {
    setQuery(newVal);
    if (newVal.trim()) {
      setSearchParams({ q: newVal }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const clearQuery = () => {
    setQuery('');
    setSearchParams({}, { replace: true });
  };

  // Collect unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    WORKSPACES.forEach((w) => w.categories.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, []);

  const { matchedTools, matchedWorkspaces } = useMemo(() => {
    const q = (query || '').toLowerCase().trim();

    const tools = TOOLS.filter((tool) => {
      const matchesText =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.tags.some((t) => t.toLowerCase().includes(q)) ||
        tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'All' ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase() ||
        tool.tags.some((tg) => tg.toLowerCase() === selectedCategory.toLowerCase());

      return matchesText && matchesCat;
    });

    const workspaces = WORKSPACES.filter((ws) => {
      const matchesText =
        !q ||
        ws.name.toLowerCase().includes(q) ||
        ws.description.toLowerCase().includes(q) ||
        ws.categories.some((c) => c.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'All' ||
        ws.categories.some((c) => c.toLowerCase() === selectedCategory.toLowerCase());

      return matchesText && matchesCat;
    });

    return { matchedTools: tools, matchedWorkspaces: workspaces };
  }, [query, selectedCategory]);

  const hasResults = matchedTools.length > 0 || matchedWorkspaces.length > 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <DocumentMeta
        title={`${t('search')} — ${SITE_CONFIG.name}`}
        description={t('searchPageSubtitle')}
        canonical={SITE_CONFIG.getCanonicalUrl('/search')}
      />

      {/* Header Banner */}
      <div className="text-center space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Platform Search Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          {t('searchPageTitle')}
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto">
          {t('searchPageSubtitle')}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={t('searchPlaceholder')}
          aria-label={t('searchAriaLabel')}
          className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all shadow-xl"
          autoFocus
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label={t('clear')}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.slice(0, 10).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20 font-semibold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Feedback */}
      {query && (
        <div className="text-xs text-slate-400 text-center">
          {t('searchResultsFor', { query })}: <strong className="text-white">{matchedTools.length}</strong> tools & <strong className="text-white">{matchedWorkspaces.length}</strong> workspaces
        </div>
      )}

      {/* No Results State */}
      {!hasResults && (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto my-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">{t('noResultsFound')}</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {t('noResultsHint')}
            </p>
          </div>
          {query && (
            <button
              onClick={clearQuery}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-colors"
            >
              {t('clear')}
            </button>
          )}
        </div>
      )}

      {/* Matched Tools Grid */}
      {matchedTools.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>{t('toolsFound')} ({matchedTools.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedTools.map((tool) => (
              <Link
                key={tool.id}
                to={tool.route}
                className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-2xl transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={tool.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 flex-shrink-0">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-3 mt-3 border-t border-slate-800/80 text-[11px] text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>{t('launchTool')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Ad slot */}
      <AdSlot placement="search-between-results" />

      {/* Matched Workspaces Grid */}
      {matchedWorkspaces.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center justify-between">
            <span>{t('workspacesFound')} ({matchedWorkspaces.length})</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedWorkspaces.map((ws) => (
              <Link
                key={ws.id}
                to={`/workspace/${ws.id}`}
                className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/40 p-4 rounded-2xl transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={ws.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate">
                      {ws.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {ws.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-500 font-mono">{ws.toolIds.length} Tools</span>
                  <span className="text-purple-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    {t('exploreWorkspace')} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
