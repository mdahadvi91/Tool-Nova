import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isRTL, TRANSLATIONS } from './translations';
import { SupportedLocale } from '../registry/types';

const LOCALE_STORAGE_KEY = 'toolnova-locale';
const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'bn', 'ar', 'hi', 'ur', 'es'];

interface I18nContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (typeof TRANSLATIONS)[SupportedLocale];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): SupportedLocale {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
      return stored as SupportedLocale;
    }
  } catch {
    // Storage can be unavailable in private browsing or locked-down contexts.
  }

  return 'en';
}

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [locale, setLocale] = useState<SupportedLocale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      // The app remains usable when preference persistence is blocked.
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: TRANSLATIONS[locale] || TRANSLATIONS.en,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
}