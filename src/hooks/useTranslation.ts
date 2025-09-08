'use client';

import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import dayjs from 'dayjs';

export const useTranslation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR sırasında güvenli fallback değerler
  const fallbackTranslation = {
    t: (key: string, options?: any) => key,
    i18n: null,
    changeLanguage: () => {},
    currentLanguage: 'tr',
    isLanguage: () => false,
    isClient: false
  };

  try {
    const { t, i18n } = useI18nTranslation();

    const changeLanguage = async (language: string) => {
      if (isClient && i18n && typeof i18n.changeLanguage === 'function') {
        try {
          // Önce cookie'ye kaydet
          if (typeof window !== 'undefined') {
            setCookie('i18nextLng', language, { path: '/' });
            dayjs.locale(language);
          }
          // Sonra dil değişimini yap
          await i18n.changeLanguage(language);
          await dayjs.locale(language);
          // HTML lang attribute'unu güncelle
          if (typeof document !== 'undefined') {
            document.documentElement.lang = language;
          }
        } catch (error) {
          // Hata olsa bile dil değişimini dene
          try {
            await i18n.changeLanguage(language);
          } catch (innerError) {}
        }
      }
    };

    const currentLanguage = isClient && i18n ? i18n.language : 'tr';

    return {
      t,
      i18n,
      changeLanguage,
      currentLanguage,
      isLanguage: (lang: string) => currentLanguage === lang,
      isClient
    };
  } catch (error) {
    // SSR sırasında hata olursa fallback değerleri döndür
    return fallbackTranslation;
  }
};
