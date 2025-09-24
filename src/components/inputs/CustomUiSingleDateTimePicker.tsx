'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { useDateTimePicker } from '@/hooks/useDateTimePicker';

interface CustomUiSingleDateTimePickerProps {
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

export function CustomUiSingleDateTimePicker({
  title,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  error,
  ref
}: CustomUiSingleDateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentLanguage } = useTranslation();
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  const { selectedDate, hours, minutes, updateTime, isTimeDisabled, handleDateChange } = useDateTimePicker({
    value,
    onChange,
    minDate,
    maxDate
  });

  return (
    <div className={cn('w-full')}>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (!disabled) {
            setIsOpen(open);
          }
        }}
      >
        <PopoverTrigger asChild disabled={disabled} ref={ref}>
          <button
            className={cn(
              'w-full flex flex-col items-start px-3 py-2 gap-1 rounded-xl border shadow-sm',
              'transition-all duration-200 ease-in-out',
              'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
              error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Date Time Picker Button"
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
              <CalendarIcon size={16} className={cn('text-muted-foreground')} />
              {selectedDate ? (
                <span className="font-medium text-sm text-red-foreground">
                  {format(selectedDate, 'd MMMM y HH:mm', { locale })}
                </span>
              ) : (
                <span className="font-medium text-sm text-muted-foreground">{placeholder || 'Tarih ve saat seçin'}</span>
              )}
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex flex-col sm:flex-row gap-4">
            <Calendar
              locale={locale}
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              numberOfMonths={1}
              fromDate={minDate}
              toDate={maxDate}
              className="p-0"
            />

            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <div className="flex gap-1">
                  <ScrollArea className="h-60 w-14 border rounded-md">
                    <div className="flex flex-col">
                      {hours.map((hour) => (
                        <Button
                          key={hour}
                          size="sm"
                          variant={selectedDate?.getHours() === hour ? 'default' : 'ghost'}
                          onClick={() => updateTime('hour', hour)}
                          disabled={isTimeDisabled('hour', hour)}
                        >
                          {hour.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>

                  <ScrollArea className="h-60 w-14 border rounded-md">
                    <div className="flex flex-col">
                      {minutes.map((minute) => (
                        <Button
                          key={minute}
                          size="sm"
                          variant={selectedDate?.getMinutes() === minute ? 'default' : 'ghost'}
                          onClick={() => updateTime('minute', minute)}
                          disabled={isTimeDisabled('minute', minute)}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                size={'sm'}
                variant={'default'}
              >
                Tamam
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
}
