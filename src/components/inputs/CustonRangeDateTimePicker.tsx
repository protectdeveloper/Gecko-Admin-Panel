'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useTranslation } from '@/hooks/useTranslation';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';

interface CustomRangeDateTimePickerProps {
  title?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
}

export function CustomRangeDateTimePicker({ title, value, onChange }: CustomRangeDateTimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(value ?? { from: new Date(), to: undefined });
  const [timeStep, setTimeStep] = React.useState<'start' | 'end'>('start');
  const { t, currentLanguage } = useTranslation();
  const locale = React.useMemo(() => getDateFnsLocale(currentLanguage), [currentLanguage]);

  React.useEffect(() => {
    setRange(value ?? { from: new Date(), to: undefined });
  }, [value]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const updateTime = (type: 'from' | 'to', unit: 'hour' | 'minute', val: number) => {
    if (!range?.[type]) return;
    const updated = new Date(range[type]!);
    if (unit === 'hour') {
      updated.setHours(val);
    } else {
      updated.setMinutes(val);
    }

    const newRange = {
      ...range,
      [type]: updated
    };
    setRange(newRange);
    onChange?.(newRange);
  };

  const handleDateChange = (newRange: DateRange | undefined) => {
    setRange(newRange);
    onChange?.(newRange);
  };

  const handleTimeConfirm = () => {
    if (timeStep === 'start') {
      setTimeStep('end');
    } else {
      setIsOpen(false);
      setTimeStep('start');
    }
  };

  return (
    <div className={cn('grid gap-2')}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button id="date" variant="outline" className={cn('bg-background border shadow-sm rounded-xl')}>
            <CalendarIcon size={16} />
            {range?.from && range?.to ? (
              <>
                {format(range.from, 'd MMMM y HH:mm', { locale })} – {format(range.to, 'd MMMM y HH:mm', { locale })}
              </>
            ) : (
              <span className="font-medium">{title || t('inputs.rangeDateTimePicker.selectDateTime')}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto max-h-[80vh] overflow-auto p-4" align="start">
          <div className="flex flex-col sm:flex-row gap-4">
            <Calendar
              locale={locale}
              mode="range"
              defaultMonth={range?.from ?? new Date()}
              selected={range}
              onSelect={handleDateChange}
              numberOfMonths={2}
              className="p-0"
            />

            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  {timeStep === 'start' ? t('inputs.rangeDateTimePicker.start') : t('inputs.rangeDateTimePicker.end')}
                </p>
                <div className="flex gap-1">
                  <ScrollArea className="h-50 w-14 border rounded-md">
                    <div className="flex flex-col">
                      {hours.map((hour) => (
                        <Button
                          key={hour}
                          size="sm"
                          variant={range?.[timeStep === 'start' ? 'from' : 'to']?.getHours() === hour ? 'default' : 'ghost'}
                          onClick={() => updateTime(timeStep === 'start' ? 'from' : 'to', 'hour', hour)}
                        >
                          {hour.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>

                  <ScrollArea className="h-50 w-14 border rounded-md">
                    <div className="flex flex-col">
                      {minutes.map((minute) => (
                        <Button
                          key={minute}
                          size="sm"
                          variant={range?.[timeStep === 'start' ? 'from' : 'to']?.getMinutes() === minute ? 'default' : 'ghost'}
                          onClick={() => updateTime(timeStep === 'start' ? 'from' : 'to', 'minute', minute)}
                        >
                          {minute.toString().padStart(2, '0')}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <Button onClick={handleTimeConfirm} size={'sm'} variant={'default'}>
                {timeStep === 'start' ? t('inputs.rangeDateTimePicker.next') : t('inputs.rangeDateTimePicker.ok')}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
