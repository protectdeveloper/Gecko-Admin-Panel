import { format } from 'date-fns';
import { cn } from '../../../lib/utils';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';
import { useTranslation } from 'react-i18next';

export default function CalendarBodyHeader({ date, onlyDay = false }: { date: Date; onlyDay?: boolean }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'tr';
  const locale = getDateFnsLocale(currentLanguage);

  return (
    <div className="flex items-center justify-center gap-1 py-2 w-full sticky top-0 bg-background z-10 border-b">
      <span className={cn('text-xs font-medium text-muted-foreground')}>{format(date, 'EEE', { locale })}</span>
      {!onlyDay && <span className={cn('text-xs font-medium text-foreground')}>{format(date, 'dd')}</span>}
    </div>
  );
}
