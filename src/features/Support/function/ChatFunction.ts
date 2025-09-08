/**
 * Grupları sıralı diziye çevirir (en eski en üstte, today ve yesterday en üstte).
 */
export function getSortedGroupKeys(groupedMessages: Record<string, any[]>): string[] {
  return Object.keys(groupedMessages).sort((a, b) => {
    if (a === 'today') return 1;
    if (b === 'today') return -1;
    if (a === 'yesterday') return 1;
    if (b === 'yesterday') return -1;
    const parseKey = (k: string) => {
      if (k === 'today') return new Date();
      if (k === 'yesterday') return new Date(Date.now() - 86400000);
      return new Date(k);
    };
    return parseKey(a).getTime() - parseKey(b).getTime();
  });
}
import { isToday, isYesterday, format } from 'date-fns';
import { tr } from 'date-fns/locale';

// Mesaj tipini dışarıdan almak için generic type
type Message = {
  createdAt: string;
  [key: string]: any;
};

/**
 * Mesajları tarihe göre gruplar. Key: today|yesterday|10 Ekim 2025 gibi.
 */
export function groupMessagesByDate<T extends Message>(messages: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {};
  messages.forEach((msg) => {
    const dateObj = new Date(msg.createdAt);
    let groupKey = '';
    if (isToday(dateObj)) {
      groupKey = 'today';
    } else if (isYesterday(dateObj)) {
      groupKey = 'yesterday';
    } else {
      groupKey = format(dateObj, 'd MMMM yyyy', { locale: tr });
    }
    if (!grouped[groupKey]) grouped[groupKey] = [];
    grouped[groupKey].push(msg);
  });
  return grouped;
}

/**
 * Grup anahtarını ekranda gösterilecek başlığa çevirir.
 */
export function getDateHeader(key: string, t: (key: string) => string): string {
  if (key === 'today') return t('support.today');
  if (key === 'yesterday') return t('support.yesterday');
  return key;
}
