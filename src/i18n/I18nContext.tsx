import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { SupportedLocale, TranslationDictionary } from '../registry/types';
import { TRANSLATIONS, isRTL } from './translations';
import { safeStorage } from '../utils/storage';

interface I18nContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isRtl: boolean;
  t: (key: keyof TranslationDictionary | string, params?: Record<string, string | number>, fallback?: string) => string;
  translations: TranslationDictionary;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = 'toolnova_locale';
const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'bn', 'ar', 'hi', 'ur', 'es'];

function getInitialLocale(): SupportedLocale {
  // 1. Stored preference
  const saved = safeStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
    return saved as SupportedLocale;
  }

  // 2. Browser language detection
  try {
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
        return browserLang as SupportedLocale;
      }
    }
  } catch {
    // Ignore detection errors
  }

  // 3. Default fallback
  return 'en';
}

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(getInitialLocale);

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
      safeStorage.setItem(STORAGE_KEY, newLocale);
    }
  }, []);

  const isRtl = isRTL(locale);

  // Sync HTML lang and dir attributes dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    }
  }, [locale, isRtl]);

  const t = useCallback(
    (key: keyof TranslationDictionary | string, params?: Record<string, string | number>, fallback?: string): string => {
      const currentDict = TRANSLATIONS[locale] as unknown as Record<string, string> | undefined;
      const enDict = TRANSLATIONS.en as unknown as Record<string, string>;

      let str = currentDict?.[key] || enDict[key] || fallback || String(key);

      if (params && typeof str === 'string') {
        Object.entries(params).forEach(([paramKey, paramVal]) => {
          str = str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
        });
      }

      return str;
    },
    [locale]
  );

  const value: I18nContextType = {
    locale,
    setLocale,
    isRtl,
    t,
    translations: TRANSLATIONS[locale] || TRANSLATIONS.en
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useTranslation(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    // Return safe fallback if used outside provider
    return {
      locale: 'en',
      setLocale: () => {},
      isRtl: false,
      t: (key: keyof TranslationDictionary | string, _params?, fallback?) => {
        const enDict = TRANSLATIONS.en as unknown as Record<string, string>;
        return enDict[key] || fallback || String(key);
      },
      translations: TRANSLATIONS.en
    };
  }
  return context;
}
