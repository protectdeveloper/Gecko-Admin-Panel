'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import 'dayjs/locale/en';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Client-side'da i18next'i yükle
    const loadI18n = async () => {
      try {
        // i18n'in başlatılmasını bekle
        if (!i18n.isInitialized) {
          await i18n.init();
        }
        // Cookie'den dil tercihini al
        const savedLanguage = getCookie('i18nextLng');

        if (
          savedLanguage &&
          (savedLanguage === 'tr' || savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'fr')
        ) {
          if (savedLanguage !== i18n.language) {
            await i18n.changeLanguage(savedLanguage);
          }
          dayjs.locale(savedLanguage);
        } else {
          dayjs.locale(i18n.language);
        }

        // Dil değişimini dinle ve cookie'ye kaydet
        const handleLanguageChanged = (lng: string) => {
          try {
            setCookie('i18nextLng', lng, { path: '/' });
            dayjs.locale(lng);
            // HTML lang attribute'unu güncelle
            if (typeof document !== 'undefined') {
              document.documentElement.lang = lng;
            }
          } catch (error) {}
        };
        i18n.on('languageChanged', handleLanguageChanged);
        // HTML lang attribute'unu başlangıçta ayarla
        if (typeof document !== 'undefined') {
          document.documentElement.lang = i18n.language;
        }
        setIsLoaded(true);
        // Cleanup function
        return () => {
          i18n.off('languageChanged', handleLanguageChanged);
        };
      } catch (error) {
        setIsLoaded(true); // Hata olsa bile devam et
      }
    };
    loadI18n();
  }, []);

  // Hydration sorununu önlemek için
  if (!isLoaded) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
