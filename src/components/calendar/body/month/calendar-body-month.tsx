import { useCalendarContext } from '../../calendar-context';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  isWithinInterval
} from 'date-fns';
import { cn } from '@/lib/utils';
import CalendarEvent from '../../calendar-event';
import { AnimatePresence, motion } from 'framer-motion';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface CalendarBodyMonthProps {
  customEvents?: React.ComponentType<{ event: any; type: string }>;
}

export default function CalendarBodyMonth({ customEvents }: CalendarBodyMonthProps) {
  const { date, events, setDate, setMode, isMonthDayPressable } = useCalendarContext();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'tr';
  const locale = getDateFnsLocale(currentLanguage);

  // Get the first day of the month
  const monthStart = startOfMonth(date);
  // Get the last day of the month
  const monthEnd = endOfMonth(date);

  // Get the first Monday of the first week (may be in previous month)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  // Get the last Sunday of the last week (may be in next month)
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Get all days between start and end
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  // Filter events to only show those within the current month view
  const visibleEvents = events.filter(
    (event) =>
      isWithinInterval(event.start, {
        start: calendarStart,
        end: calendarEnd
      }) || isWithinInterval(event.end, { start: calendarStart, end: calendarEnd })
  );

  // Haftanın günlerini locale göre al
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    // Pazartesi (1) ile başlatmak için i+1
    const day = new Date(2021, 7, i + 2); // 2021-08-02 Pazartesi
    return format(day, 'EEE', { locale });
  });

  return (
    <div className="flex-1 flex flex-col h-full border rounded-xl">
      <div className="grid grid-cols-7">
        {weekDays.map((day, idx) => {
          const isLastCol = idx % 7 === 6;

          return (
            <div
              key={day + idx}
              className={cn(
                'py-2 border-r text-center text-sm font-medium text-muted-foreground border-b border-border',
                isLastCol && 'border-r-0'
              )}
            >
              {day}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={monthStart.toISOString()}
          className="grid grid-cols-7 overflow-auto relative h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: 'easeInOut'
          }}
        >
          {calendarDays.map((day, index) => {
            const dayEvents = visibleEvents.filter((event) => isSameDay(event.start, day));
            const isCurrentMonth = isSameMonth(day, date);
            const isFirstCol = index % 7 === 0;
            const isLastCol = index % 7 === 6;
            const isLastRow = index >= calendarDays.length - 7;

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'relative flex flex-col border-b border-r p-1.5 min-h-[130px]',
                  !isCurrentMonth && 'bg-muted/50 flex',
                  isFirstCol && 'border-l-0',
                  isLastCol && 'border-r-0',
                  isLastRow && 'border-b-0'
                )}
              >
                <div
                  className={cn('px-1 text-sm font-medium cursor-pointer rounded-full')}
                  onClick={() => {
                    if (isMonthDayPressable) {
                      setDate(day);
                      setMode('day');
                    }
                  }}
                >
                  {format(day, 'd')}
                </div>

                <AnimatePresence mode="wait">
                  <div className="flex flex-col gap-1 mt-1">
                    {dayEvents
                      .slice(0, 2)
                      .map((event, index) =>
                        customEvents ? (
                          React.createElement(customEvents, { event, type: 'month', key: event.id })
                        ) : (
                          <CalendarEvent key={index} event={event} className="relative h-auto" month />
                        )
                      )}
                    {dayEvents.length > 2 && (
                      <motion.div
                        key={`more-${day.toISOString()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.2
                        }}
                        className="text-xs text-muted-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDate(day);
                          setMode('day');
                        }}
                      >
                        +{dayEvents.length - 2} {t('assignSchedule.showMore')}
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
