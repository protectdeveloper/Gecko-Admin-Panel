import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getCookie } from 'cookies-next';

// Ana dil dosyalarını import et
import tr from './locales/tr.json';

import notFoundTr from './locales/notFound/tr.json';

import metaTr from './locales/meta/tr.json';

import menuTr from './locales/menu/tr.json';

import inputsTr from './locales/inputs/tr.json';

import supportTr from './locales/support/tr.json';

import loginTr from './locales/login/tr.json';

import staticData from './locales/staticData/tr.json';

// Dil kaynaklarını birleştir
const resources = {
  tr: {
    translation: {
      ...tr,
      meta: metaTr,
      menu: menuTr,
      inputs: inputsTr,
      notFound: notFoundTr,
      support: supportTr,
      login: loginTr,
      staticData: staticData
    }
  }
};

// SSR için kontrol
const isServer = typeof window === 'undefined';

// Client-side'da cookie'den dil tercihini al
const getInitialLanguage = () => {
  if (isServer) {
    return 'tr'; // SSR için varsayılan dil
  }
  try {
    const savedLanguage = getCookie('i18nextLng');
    if (savedLanguage && savedLanguage === 'tr') {
      return savedLanguage;
    }
    // Browser dilini kontrol et
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'tr') return 'tr';
    return 'tr'; // Varsayılan
  } catch {
    return 'tr';
  }
};

// i18next'in zaten başlatılıp başlatılmadığını kontrol et
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'tr',
      lng: getInitialLanguage(),
      debug: false,

      interpolation: {
        escapeValue: false
      },

      detection: {
        order: ['cookie', 'navigator', 'htmlTag'],
        caches: ['cookie'],
        lookupCookie: 'i18nextLng',
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
        lookupQuerystring: 'lng',
        lookupSessionStorage: 'i18nextLng'
      },

      react: {
        useSuspense: false
      },

      keySeparator: '.',
      nsSeparator: ':',

      // Dil değişikliğini localStorage'a kaydet
      saveMissing: process.env.NODE_ENV === 'development',
      missingKeyHandler: (lng, ns, key, fallbackValue) => {
        if (process.env.NODE_ENV === 'development') {
        }
      }
    });
}

export default i18n;
