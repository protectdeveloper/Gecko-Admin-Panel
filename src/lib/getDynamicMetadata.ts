import { cookies } from 'next/headers';
import metaTr from '@/i18n/locales/meta/tr.json';

const translations = { tr: metaTr };
type Lang = keyof typeof translations;

export async function getDynamicMetadata(key: string, suffix = ' | Gecko Plus') {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get('i18nextLng')?.value;
  const lang: Lang = (langCookie && langCookie in translations ? langCookie : 'tr') as Lang;

  const meta = (translations[lang] as Record<string, { title: string; description: string }>)[key];

  return {
    title: (meta?.title ? meta.title : 'Sayfa') + suffix,
    description: meta?.description ?? ''
  };
}
