'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { useDateTimePicker } from '@/hooks/useDateTimePicker';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';

interface CustomSingleDateTimePickerProps {
  title?: string;
  value?: Date | null;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
}

export function CustomSingleDateTimePicker({
  title,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  error
}: CustomSingleDateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { currentLanguage } = useTranslation();
  const { selectedDate, hours, minutes, updateTime, isTimeDisabled, handleDateChange } = useDateTimePicker({
    value,
    onChange,
    minDate,
    maxDate
  });

  // Determine locale for date-fns
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  function isHourDisabled(hour: number) {
    if (!selectedDate || !maxDate) return false;
    const temp = new Date(selectedDate);
    temp.setHours(hour, selectedDate.getMinutes(), 0, 0);
    return temp > maxDate;
  }

  function isMinuteDisabled(minute: number) {
    if (!selectedDate || !maxDate) return false;
    const temp = new Date(selectedDate);
    temp.setMinutes(minute, 0, 0);
    return temp > maxDate;
  }

  return (
    <div className={cn('flex flex-col gap-1')}>
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
              'flex flex-row items-center justify-start dark:bg-input/30 border shadow-sm rounded-xl',
              error && 'border-red-500 bg-destructive/10 dark:bg-destructive/10'
            )}
          >
            <CalendarIcon size={16} />

            {selectedDate ? (
              <span className="font-medium text-sm text-muted-foreground">
                {format(selectedDate, 'd MMMM y HH:mm', { locale })}
              </span>
            ) : (
              <span className="font-medium text-sm text-muted-foreground">{placeholder || 'Tarih ve Saat Seçiniz'}</span>
            )}
          </Button>
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
                          disabled={isTimeDisabled('hour', hour) || isHourDisabled(hour)}
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
                          disabled={isTimeDisabled('minute', minute) || isMinuteDisabled(minute)}
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
