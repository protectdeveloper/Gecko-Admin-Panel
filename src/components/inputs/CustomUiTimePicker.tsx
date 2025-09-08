'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ClockIcon } from 'lucide-react';

interface CustomUiTimePickerProps {
  title?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabledStartTime?: string; // disables everything < this time
  disabledEndTime?: string; // disables everything > this time
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export function CustomUiTimePicker({
  title,
  value,
  onChange,
  disabledStartTime,
  disabledEndTime,
  error,
  disabled = false,
  placeholder = 'Select...',
  className = ''
}: CustomUiTimePickerProps) {
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
    <div className="w-full">
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (!disabled) setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={cn(
              'flex flex-col items-start px-3 py-2 gap-1 rounded-xl bg-muted border shadow-sm',
              'transition-all duration-200 ease-in-out',
              'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
              error ? 'border-red-500 bg-destructive/10' : 'border-input',
              disabled ? 'cursor-not-allowed opacity-50' : '',
              className
            )}
          >
            {title && (
              <span
                className={cn(
                  'text-sm text-muted-foreground bg-transparent transition-all pointer-events-none',
                  error && 'text-red-500'
                )}
              >
                {title}
              </span>
            )}

            <div className="flex items-center gap-2">
              <ClockIcon size={16} className="text-muted-foreground" />
              {value ? (
                <span className="font-medium text-sm text-red-foreground">{value}</span>
              ) : (
                <span className="font-medium text-sm text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
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

            <Button size="sm" variant="default" onClick={() => setIsOpen(false)}>
              Tamam
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
}
