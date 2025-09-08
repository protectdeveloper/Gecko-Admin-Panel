import dayjs from 'dayjs';
import 'dayjs/locale/tr';
dayjs.locale('tr');

export const formatOTPTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const formatDateTransactions = (date: string | Date): string => {
  return dayjs(date).format('DD MMM YYYY');
};

export const formatDateInquiry = (date: string | Date): string => {
  if (!date) return '';

  return dayjs(date).format('DD.MM.YYYY');
};

export const formatHourMinute = (time: string | undefined) => {
  if (!time) return '';

  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

export const formatDateHourMinute = (date: string | undefined) => {
  if (!date) return '00:00';

  // Hem tam tarih hem de sadece saat formatını destekle
  const parsedDate = dayjs(date);
  if (!parsedDate.isValid()) return '00:00';

  return parsedDate.format('HH:mm');
};

export const formatProggresMinutes = (minutes: number) => {
  if (!minutes) return '00:00';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
};

export const formatDatePathname = (date: Date) => dayjs(date).format('YYYY-MM-DD');

export const formatParseDateTimeFromParam = (value: string | null, fallback: dayjs.Dayjs) => {
  if (value) {
    const parsed = dayjs(value, 'YYYY-MM-DDTHH:mm', true); // true => strict mode
    return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : fallback.format('YYYY-MM-DD HH:mm:ss');
  }
  return fallback.format('YYYY-MM-DD HH:mm:ss');
};

export const formatHourMinuteFromMinutes = (minutes: number) => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const formatDateWithTime = (date: string | Date): string => {
  if (!date) return '';

  const formattedDate = dayjs(date).format('DD.MM.YYYY HH:mm');
  return formattedDate;
};

export const formatDayDateWithTime = (date: string | Date): string => {
  if (!date) return '';

  const formattedDate = dayjs(date).format('D MMMM YYYY dddd');
  return formattedDate;
};

export const formatDateAndHours = (start?: string, end?: string) => {
  if (!start || !end) return '';

  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  const day = startDate.getDate().toString().padStart(2, '0');
  const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const year = startDate.getFullYear();
  const startHour = startDate.getHours().toString().padStart(2, '0');
  const startMin = startDate.getMinutes().toString().padStart(2, '0');
  const endHour = endDate.getHours().toString().padStart(2, '0');
  const endMin = endDate.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${startHour}:${startMin} - ${endHour}:${endMin}`;
};

export const formatDateWithMonthName = (date: string | Date): string => {
  if (!date) return '';

  const formattedDate = dayjs(date).format('D MMMM YYYY');
  return formattedDate;
};

export function formatDateDiffHourMinute(start: string, end: string) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diffMs = endDate.diff(startDate);

  if (diffMs <= 0) return '00:00';

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const hours = diffHours.toString().padStart(2, '0');
  const minutes = diffMinutes.toString().padStart(2, '0');
  if (hours === '00' && minutes === '00') return '00:00';
  if (hours === '00') return `00:${minutes}`;
  if (minutes === '00') return `${hours}:00`;

  return `${hours}:${minutes}`;
}

export const trimSeconds = (time: string) => time.slice(0, 5);

export const getParsedDateParam = (searchParams: URLSearchParams, key: string, fallback: dayjs.Dayjs): string => {
  const raw = searchParams.get(key);
  if (!raw) return fallback.format('YYYY-MM-DD HH:mm:ss');

  const decoded = decodeURIComponent(raw);
  const parsed = dayjs(decoded, ['YYYY-MM-DDTHH:mm', 'YYYY-MM-DD'], true);

  return parsed.isValid() ? parsed.format('YYYY-MM-DD HH:mm:ss') : fallback.format('YYYY-MM-DD HH:mm:ss');
};

export const formatTimeToHourMinute = (time: string) => {
  // time 00:00:00 to 00:00
  if (!time) return '00:00';
  const parts = time.split(':');
  if (parts.length < 2) return '00:00';
  const hours = parts[0].padStart(2, '0');
  const minutes = parts[1].padStart(2, '0');
  return `${hours}:${minutes}`;
};
