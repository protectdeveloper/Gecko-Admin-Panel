'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClockIcon } from 'lucide-react';

interface SingleTimePickerProps {
  title?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabledStartTime?: string; // disables everything < this time
  disabledEndTime?: string; // disables everything > this time
  error?: string;
  disabled?: boolean;
  className?: string;
}

const CustomTimePicker = ({
  title = 'Select...',
  value,
  onChange,
  disabledEndTime,
  disabledStartTime,
  error,
  disabled,
  className
}: SingleTimePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [internalTime, setInternalTime] = React.useState(() => {
    const [h, m] = value?.split(':').map(Number) ?? [0, 0];
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);
    return date;
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const updateTime = (unit: 'hour' | 'minute', val: number) => {
    const updated = new Date(internalTime);
    if (unit === 'hour') updated.setHours(val);
    else updated.setMinutes(val);
    setInternalTime(updated);

    const formatted = updated.toTimeString().slice(0, 5);
    onChange?.(formatted);
  };

  const isDisabled = (hour: number, minute: number) => {
    if (disabledStartTime) {
      const [sh, sm] = disabledStartTime.split(':').map(Number);
      if (hour < sh) return true;
      if (hour === sh && minute <= sm) return true;
    }
    if (disabledEndTime) {
      const [eh, em] = disabledEndTime.split(':').map(Number);
      if (hour > eh) return true;
      if (hour === eh && minute >= em) return true;
    }
    return false;
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className, disabled && 'cursor-not-allowed')}>
      {title && (
        <label
          htmlFor={`input-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}
        >
          {title}
        </label>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            className="bg-background border shadow-sm rounded-xl w-full justify-start"
          >
            <ClockIcon size={16} className=" mr-2" />
            {value ? <span className="font-medium ">{value}</span> : <span className="text-muted-foreground">{title}</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex gap-2">
            <ScrollArea className="h-60 w-14 border rounded-md">
              <div className="flex flex-col">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="sm"
                    variant={
                      internalTime.getHours() === hour && !isDisabled(hour, internalTime.getMinutes()) ? 'default' : 'ghost'
                    }
                    onClick={() => {
                      if (isDisabled(hour, internalTime.getMinutes())) return;
                      updateTime('hour', hour);
                    }}
                    disabled={isDisabled(hour, internalTime.getMinutes())}
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
                    variant={
                      internalTime.getMinutes() === minute && !isDisabled(internalTime.getHours(), minute) ? 'default' : 'ghost'
                    }
                    onClick={() => {
                      if (isDisabled(internalTime.getHours(), minute)) return;
                      updateTime('minute', minute);
                    }}
                    disabled={isDisabled(internalTime.getHours(), minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomTimePicker;
