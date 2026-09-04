import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdConsentState } from '../types';
import { adManager } from '../core/AdManager';

interface ConsentContextType {
  consent: AdConsentState;
  showBanner: boolean;
  acceptAll: () => void;
  declineOptional: () => void;
  updatePreferences: (analytics: boolean, marketing: boolean) => void;
}

const defaultConsent: AdConsentState = {
  hasConsent: false,
  analyticsConsent: false,
  marketingConsent: false,
  personalizedAds: false,
};

const ConsentContext = createContext<ConsentContextType>({
  consent: defaultConsent,
  showBanner: false,
  acceptAll: () => {},
  declineOptional: () => {},
  updatePreferences: () => {},
});

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<AdConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zenith_consent_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConsent(parsed);
        adManager.updateConsent(parsed);
      } else {
        setShowBanner(true);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (updated: AdConsentState) => {
    setConsent(updated);
    setShowBanner(false);
    try {
      localStorage.setItem('zenith_consent_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    adManager.updateConsent(updated);
  };

  const acceptAll = () => {
    saveConsent({
      hasConsent: true,
      analyticsConsent: true,
      marketingConsent: true,
      personalizedAds: true,
      decidedAt: Date.now(),
    });
  };

  const declineOptional = () => {
    saveConsent({
      hasConsent: true,
      analyticsConsent: false,
      marketingConsent: false,
      personalizedAds: false,
      decidedAt: Date.now(),
    });
  };

  const updatePreferences = (analytics: boolean, marketing: boolean) => {
    saveConsent({
      hasConsent: true,
      analyticsConsent: analytics,
      marketingConsent: marketing,
      personalizedAds: marketing,
      decidedAt: Date.now(),
    });
  };

  return (
    <ConsentContext.Provider value={{ consent, showBanner, acceptAll, declineOptional, updatePreferences }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);
