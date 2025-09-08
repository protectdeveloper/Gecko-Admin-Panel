'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';

interface CustonRangeDatePickerProps {
  title?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
}

export function CustonRangeDatePicker({ title, value, onChange }: CustonRangeDatePickerProps) {
  const { t, currentLanguage } = useTranslation();
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);
  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline" className={cn('bg-background border shadow-sm rounded-xl')}>
            <CalendarIcon size={16} />
            {value?.from && value?.to ? (
              <>
                {format(value.from, 'd MMMM y', { locale })} – {format(value.to, 'd MMMM y', { locale })}
              </>
            ) : (
              <span className="font-medium">{title || t('inputs.rangeDateTimePicker.selectDateTime')}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto max-h-[80vh] overflow-auto p-4" align="start">
          <Calendar
            locale={locale}
            mode="range"
            defaultMonth={value?.from ?? new Date()}
            selected={value}
            onSelect={(range) => {
              onChange?.(range);
            }}
            numberOfMonths={2}
            className="p-0"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
