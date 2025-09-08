// dateFnsLocaleMap.ts
// Map for date-fns locales for multi-language date support
import { enUS } from 'date-fns/locale/en-US';
import { tr } from 'date-fns/locale/tr';
import { fr } from 'date-fns/locale/fr';
import { de } from 'date-fns/locale/de';
import { es } from 'date-fns/locale/es';
import { it } from 'date-fns/locale/it';
import { ru } from 'date-fns/locale/ru';
import { zhCN } from 'date-fns/locale/zh-CN';
import { ja } from 'date-fns/locale/ja';
import { ar } from 'date-fns/locale/ar';
import { Locale } from 'date-fns';
// ... diğer dilleri buraya ekleyin

export const localeMap: Record<string, Locale> = {
  en: enUS,
  tr: tr,
  fr: fr,
  de: de,
  es: es,
  it: it,
  ru: ru,
  zh: zhCN,
  ja: ja,
  ar: ar
  // ... ek diller
};

/**
 * Returns the date-fns locale for a given language code, defaults to enUS.
 * @param lang Language code (e.g. 'en', 'tr', 'fr', ...)
 */
export function getDateFnsLocale(lang: string): Locale {
  // Try full code, then first part (e.g. 'en-US' -> 'en')
  if (localeMap[lang]) return localeMap[lang];
  const short = lang.split('-')[0];
  return localeMap[short] || enUS;
}
