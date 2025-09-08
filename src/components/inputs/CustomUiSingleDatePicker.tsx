'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface CustomUiSingleDatePickerProps {
  title?: string;
  value?: Date | null;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export function CustomUiSingleDatePicker({
  title,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  error,
  ref
}: CustomUiSingleDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t, currentLanguage } = useTranslation();
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  return (
    <div className={cn('w-full')}>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (!disabled) setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild disabled={disabled} ref={ref}>
          <button
            className={cn(
              'w-full flex flex-col items-start px-3 py-2 gap-1 rounded-xl bg-muted border shadow-sm',
              'transition-all duration-200 ease-in-out',
              'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
              error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Date Picker Button"
          >
            <span
              className={cn(
                'text-sm text-muted-foreground bg-transparent transition-all pointer-events-none',
                error && 'text-red-500'
              )}
            >
              {title}
            </span>

            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              {value ? (
                <span className="font-medium text-sm text-muted-foreground">{format(value, 'd MMMM y', { locale })}</span>
              ) : (
                <span className="font-medium text-sm text-muted-foreground">
                  {placeholder || t('inputs.rangeDateTimePicker.selectDate')}
                </span>
              )}
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
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
