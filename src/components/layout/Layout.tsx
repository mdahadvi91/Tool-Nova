import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { useConsent } from '../../ads/consent/ConsentContext';
import { Cookie } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { showBanner, acceptAll, declineOptional } = useConsent();

  return (
    <div className="min-h-screen flex flex-col bg-[#070a12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Platform Header */}
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Structural Shell */}
      <div className="flex-1 flex w-full">
        {/* Permanent Desktop / Drawer Mobile Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Content Container (Offset by lg:pl-72 for sidebar) */}
        <main className="flex-1 min-w-0 lg:pl-72 flex flex-col justify-between">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>

      {/* GDPR / Privacy Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto p-4 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 flex-shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">Privacy & Consent Choices</p>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                We use cookies and client-side storage solely to preserve preferences and support clean banner ads.
                Your uploaded files and documents never leave your browser.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={declineOptional}
              className="flex-1 sm:flex-initial px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-lg shadow-cyan-600/20 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
