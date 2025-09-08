'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';

interface CustomSingleDatePickerProps {
  title?: string;
  value?: Date | null;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export function CustomSingleDatePicker({
  title,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  error
}: CustomSingleDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, currentLanguage } = useTranslation();
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  return (
    <div className={cn('w-full flex flex-col gap-1')}>
      {title && (
        <label
          htmlFor={`input-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}
        >
          {title}
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'flex flex-row items-center justify-start bg-background border shadow-sm rounded-xl',
              error && 'border-red-500 bg-destructive/10 dark:bg-destructive/10'
            )}
          >
            <CalendarIcon size={16} />
            {value ? (
              <>{format(value, 'd MMMM y', { locale })}</>
            ) : (
              <span className="font-medium">{title || t('inputs.rangeDateTimePicker.selectDateTime')}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto overflow-hidden p-4" align="start">
          <div className="flex flex-col sm:flex-row gap-4">
            <Calendar
              locale={locale}
              mode="single"
              selected={value || new Date()}
              onSelect={onChange}
              numberOfMonths={1}
              fromDate={minDate}
              toDate={maxDate}
              className="p-0"
            />
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
}
