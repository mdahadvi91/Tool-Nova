import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConsentProvider } from './ads/consent/ConsentContext';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { I18nProvider } from './i18n/I18nContext';
import { HomePage } from './pages/HomePage';
import { WorkspacePage } from './pages/WorkspacePage';
import { ToolPage } from './pages/ToolPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';

export default function App() {
  return (
    <I18nProvider>
      <ConsentProvider>
        <HashRouter>
          <ErrorBoundary
            title="ToolNova could not render this page"
            description="An unexpected page error occurred. Try again, or return to the home page if the problem continues."
          >
            <Layout>
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
          </ErrorBoundary>
        </HashRouter>
      </ConsentProvider>
    </I18nProvider>
  );
}
