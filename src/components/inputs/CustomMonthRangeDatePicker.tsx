'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, ArrowRight, CalendarIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';

interface MonthRangeDatePickerProps {
  title?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
  disabledMonth?: Date | null;
  showMonthNavigation?: boolean;
}

const CustomMonthRangeDatePicker = ({
  title,
  value,
  onChange,
  disabledMonth = new Date(),
  showMonthNavigation = false
}: MonthRangeDatePickerProps) => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const months = Array.from({ length: 12 }, (_, i) => i);
  const { t, currentLanguage } = useTranslation();

  // Determine locale for date-fns
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  const handlePreviousMonth = () => {
    if (!value?.from) return;
    const currentDate = value.from;
    const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    onChange?.({
      from: previousMonth,
      to: new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0)
    });
  };

  const handleNextMonth = () => {
    if (!value?.from) return;
    const currentDate = value.from;
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    onChange?.({
      from: nextMonth,
      to: new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0)
    });
  };

  const handleMonthClick = (month: number) => {
    const date = new Date(year, month, 1);
    if (!value?.from) {
      onChange?.({ from: date, to: new Date(year, month + 1, 0) });
    } else if (!value.to) {
      const from = value.from;
      const to = new Date(year, month + 1, 0);
      if (from > to) {
        onChange?.({ from: date, to: new Date(value.from.getFullYear(), value.from.getMonth() + 1, 0) });
      } else {
        onChange?.({ from, to });
      }
    } else {
      onChange?.({ from: date, to: new Date(year, month + 1, 0) });
    }
  };

  const isMonthSelected = (month: number) => {
    if (!value?.from || !value?.to) return false;

    const date = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0); // o ayın son günü

    return (
      (date >= value.from && date <= value.to) ||
      (endOfMonth >= value.from && endOfMonth <= value.to) ||
      (date <= value.from && endOfMonth >= value.to) // kapsayan aralık
    );
  };

  const isMonthDisabled = (month: number) => {
    const currentDate = new Date(year, month, 1);
    return disabledMonth ? currentDate > disabledMonth : false;
  };

  const getMonthRangeLabel = (value?: DateRange, title?: string) => {
    if (value?.from && value?.to) {
      const now = new Date();
      const isSameMonth = value.from.getFullYear() === value.to.getFullYear() && value.from.getMonth() === value.to.getMonth();
      const isCurrentMonth = value.from.getFullYear() === now.getFullYear() && value.from.getMonth() === now.getMonth();
      if (isSameMonth && isCurrentMonth) {
        return t('transitionReport.thisMonth');
      }
      if (isSameMonth) {
        return format(value.from, 'MMMM yyyy', { locale });
      }
      return `${format(value.from, 'MMMM yyyy', { locale })} – ${format(value.to, 'MMMM yyyy', { locale })}`;
    }
    return title || t('transitionReport.selectMonth');
  };

  return (
    <Popover>
      <div className={cn('border shadow-sm bg-white dark:bg-input/30 rounded-xl overflow-auto')}>
        {showMonthNavigation && (
          <Button variant="ghost" onClick={handlePreviousMonth} className="h-8 w-8 p-0" disabled={!value?.from}>
            <ArrowLeft />
          </Button>
        )}

        <PopoverTrigger asChild className="dark:bg-input/0">
          <Button id="date" variant="outline" className="border-0 rounded-xl'">
            <CalendarIcon size={16} />
            <span className="font-medium ">{getMonthRangeLabel(value, title)}</span>
          </Button>
        </PopoverTrigger>

        {showMonthNavigation && (
          <Button
            variant="ghost"
            onClick={handleNextMonth}
            className="h-8 w-8 p-0"
            disabled={
              disabledMonth
                ? value?.from
                  ? new Date(value.from.getFullYear(), value.from.getMonth() + 1, 1) > disabledMonth
                  : true
                : !value?.from
            }
          >
            <ArrowRight />
          </Button>
        )}
      </div>

      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={() => setYear(year - 1)} className="h-8 w-8 p-0">
            <ArrowLeft />
          </Button>
          <span className="font-medium">{year}</span>
          <Button
            variant="ghost"
            onClick={() => setYear(year + 1)}
            className="h-8 w-8 p-0"
            disabled={disabledMonth ? year >= disabledMonth.getFullYear() : false}
          >
            <ArrowRight />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month) => (
            <Button
              key={month}
              variant="ghost"
              className={cn(
                'h-9 w-24',
                isMonthSelected(month) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                isMonthDisabled(month) && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !isMonthDisabled(month) && handleMonthClick(month)}
              disabled={isMonthDisabled(month)}
            >
              {format(new Date(year, month, 1), 'MMMM', { locale })}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomMonthRangeDatePicker;
