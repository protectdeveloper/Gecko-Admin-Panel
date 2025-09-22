// Returns 0-based month index from 'YYYY-MM-DD' string
export function getMonthIndex(period: string): number {
  if (!period || typeof period !== 'string') return -1;
  const parts = period.split('-');
  if (parts.length < 2) return -1;
  const month = parseInt(parts[1], 10);
  if (isNaN(month) || month < 1 || month > 12) return -1;
  return month - 1;
}

// Returns daily labels array (should be called with t)
export function getDailyLabels(t: (key: string) => string): string[] {
  return [
    t('mondayShort'),
    t('tuesdayShort'),
    t('wednesdayShort'),
    t('thursdayShort'),
    t('fridayShort'),
    t('saturdayShort'),
    t('sundayShort')
  ];
}

// Returns months array (should be called with t)
export function getMonths(t: (key: string) => string): string[] {
  return [
    t('january'),
    t('february'),
    t('march'),
    t('april'),
    t('may'),
    t('june'),
    t('july'),
    t('august'),
    t('september'),
    t('october'),
    t('november'),
    t('december')
  ];
}

// Son 8 haftanın label dizisini oluşturur: "18 Ağu - 24 Ağu 2025"
export function getLast8WeeksLabels(t: any): string[] {
  const now = new Date();
  const labels: string[] = [];
  for (let i = 7; i >= 0; i--) {
    const end = new Date(now);
    end.setDate(now.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const startStr = `${start.getDate().toString().padStart(2, '0')} ${start.toLocaleString('tr-TR', { month: 'short' })}`;
    const endStr = `${end.getDate().toString().padStart(2, '0')} ${end.toLocaleString('tr-TR', {
      month: 'short'
    })} ${end.getFullYear()}`;
    labels.push(`${startStr} - ${endStr}`);
  }
  return labels;
}

// Haftalık label ve tarih aralığı döndüren fonksiyon
export function getLast8WeeksLabelsWithRange(t: any): { label: string; start: string; end: string }[] {
  const now = new Date();
  const weeks: { label: string; start: string; end: string }[] = [];
  for (let i = 7; i >= 0; i--) {
    const end = new Date(now);
    end.setDate(now.getDate() - i * 7);
    const start = new Date(end);
    start.setDate(end.getDate() - 6);
    const startStr = `${start.getDate().toString().padStart(2, '0')} ${start.toLocaleString('tr-TR', { month: 'short' })}`;
    const endStr = `${end.getDate().toString().padStart(2, '0')} ${end.toLocaleString('tr-TR', {
      month: 'short'
    })} ${end.getFullYear()}`;
    weeks.push({
      label: `${startStr} - ${endStr}`,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10)
    });
  }
  return weeks;
}

// Calculates chartData for monthly view
export function getMonthlyChartData(data: any[], months: string[]): { month: string; desktop: number; mobile: number }[] {
  const monthlySums = Array(12)
    .fill(null)
    .map((_, i) => ({
      month: months[i],
      desktop: 0,
      mobile: 0
    }));
  data.forEach((item: any) => {
    const idx = getMonthIndex(item.period);
    if (idx >= 0 && idx < 12) {
      monthlySums[idx].desktop += Math.max(0, Number(item.entryCount) || 0);
      monthlySums[idx].mobile += Math.max(0, Number(item.exitCount) || 0);
    }
  });
  return monthlySums;
}

// Calculates chartData for daily view
export function getDailyChartData(data: any[], dailyLabels: string[]): { month: string; desktop: number; mobile: number }[] {
  const labelToData: Record<string, { desktop: number; mobile: number }> = {};
  if (data) {
    data.forEach((item: any) => {
      labelToData[item.periodLabel] = {
        desktop: Math.max(0, Number(item.entryCount) || 0),
        mobile: Math.max(0, Number(item.exitCount) || 0)
      };
    });
  }
  return dailyLabels.map((label) => ({
    month: label,
    desktop: labelToData[label]?.desktop ?? 0,
    mobile: labelToData[label]?.mobile ?? 0
  }));
}

export function parseTimeToMinutes(timeStr: string) {
  if (!timeStr) return 0;
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 60 + m + Math.floor(s / 60);
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

// Converts a time string like "00:09:40.1920000" or "36:32:00.0000000" to a human-readable format like "36 saat 32 dk"
export function formatAverageTime(timeString: string): string {
  if (!timeString) return '-';
  // Remove milliseconds if present
  const [hms] = timeString.split('.');
  const parts = hms.split(':').map(Number);
  if (parts.length < 2) return '-';
  let hours = 0;
  let minutes = 0;
  // If format is HH:MM:SS or more (e.g., 36:32:00)
  if (parts.length >= 2) {
    hours = parts[0];
    minutes = parts[1];
  }
  // If format is D:HH:MM:SS (for very long durations)
  if (parts.length === 4) {
    hours += parts[0] * 24;
    minutes = parts[2];
  }
  let result = '';
  if (hours > 0) {
    result += `${hours} saat`;
  }
  if (minutes > 0) {
    if (result) result += ' ';
    result += `${minutes} dk`;
  }
  if (!result) {
    result = '0 dk';
  }

  console.log('result:', result);

  return result;
}
