import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentMeta } from '../components/seo/DocumentMeta';
import { SITE_CONFIG } from '../config/site';
import { useTranslation } from '../i18n/I18nContext';
import { Search, Home, ArrowLeft, Layers, Sparkles } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <DocumentMeta
        title={`404 ${t('notFoundTitle')} — ${SITE_CONFIG.name}`}
        description={t('notFoundDesc')}
        noIndex={true}
      />

      <div className="max-w-lg w-full bg-slate-900/70 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mx-auto shadow-inner">
          <span className="font-mono text-2xl font-black">404</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t('notFoundTitle')}
          </h1>
          <p className="text-sm font-medium text-slate-300">
            {t('notFoundSubtitle')}
          </p>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            {t('notFoundDesc')}
          </p>
        </div>

        {/* Quick Search on 404 */}
        <form onSubmit={handleSearch} className="relative max-w-sm mx-auto">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-cyan-600/20"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('goHome')}</span>
          </Link>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('browseWorkspaces')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
