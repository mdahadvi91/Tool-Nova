import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConsentProvider } from './ads/consent/ConsentContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ToolPage } from './pages/ToolPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';
import { SupportedLocale } from './registry/types';

export default function App() {
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('en');

  // Handle RTL languages (Arabic, Urdu)
  useEffect(() => {
    const isRtl = currentLocale === 'ar' || currentLocale === 'ur';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  return (
    <ConsentProvider>
      <HashRouter>
        <Layout currentLocale={currentLocale} onLocaleChange={setCurrentLocale}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workspace/:id" element={<WorkspacePage />} />
            <Route path="/tool/:slug" element={<ToolPage />} />
            <Route path="/privacy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
            <Route path="/cookies" element={<LegalPage />} />
            <Route path="/disclaimer" element={<LegalPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ConsentProvider>
  );
}
