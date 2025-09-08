import type { CalendarProps } from './calendar-types';
import CalendarBody from './body/calendar-body';
import CalendarProvider from './calendar-provider';
import { useState, useMemo, useEffect } from 'react';
import { format, addDays, addMonths, addWeeks, subDays, subMonths, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getDateFnsLocale } from '@/utils/dateFnsLocaleMap';

export default function Calendar({
  events,
  mode: controlledMode,
  setMode: controlledSetMode,
  date: controlledDate,
  setDate: controlledSetDate,
  calendarIconIsToday = true,
  selectedEvent,
  onSelectedEventChange,
  customToolbar,
  customEvents,
  isMonthDayPressable = true
}: CalendarProps) {
  // Only allow these views
  type AllowedView = 'month' | 'week' | 'day';

  // Internal state for view/mode/date if not controlled
  const [isClient, setIsClient] = useState(false);
  const [uncontrolledMode, setUncontrolledMode] = useState<AllowedView>('month');
  const [uncontrolledDate, setUncontrolledDate] = useState<Date>(new Date());

  const mode = (controlledMode || uncontrolledMode) as AllowedView;
  const setMode = controlledSetMode || setUncontrolledMode;
  const date = controlledDate || uncontrolledDate;
  const setDate = controlledSetDate || setUncontrolledDate;

  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || 'tr';
  const locale = getDateFnsLocale(currentLanguage);

  // Label for toolbar
  const label = useMemo(() => {
    if (mode === 'month') {
      return format(date, 'MMMM yyyy', { locale });
    } else if (mode === 'week') {
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
      return `${format(weekStart, 'd MMM', { locale })} - ${format(weekEnd, 'd MMM yyyy', { locale })}`;
    } else if (mode === 'day') {
      return format(date, 'd MMM yyyy', { locale });
    }
    return '';
  }, [date, mode, locale]);

  // Navigation logic
  const onNavigate = (action: 'TODAY' | 'PREV' | 'NEXT') => {
    if (action === 'TODAY') {
      setDate(new Date());
      return;
    }
    switch (mode) {
      case 'month':
        setDate(action === 'PREV' ? subMonths(date, 1) : addMonths(date, 1));
        break;
      case 'week':
        setDate(action === 'PREV' ? subWeeks(date, 1) : addWeeks(date, 1));
        break;
      case 'day':
        setDate(action === 'PREV' ? subDays(date, 1) : addDays(date, 1));
        break;
      default:
        break;
    }
  };

  const onView = (view: 'month' | 'week' | 'day') => {
    if (view === 'month' || view === 'week' || view === 'day') {
      setMode(view);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <CalendarProvider
      events={events}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
      calendarIconIsToday={calendarIconIsToday}
      selectedEvent={selectedEvent}
      onSelectedEventChange={onSelectedEventChange}
      isMonthDayPressable={isMonthDayPressable}
    >
      {isClient && (
        <div className="flex flex-col h-full w-full relative gap-3">
          {customToolbar && React.createElement(customToolbar, { label, onNavigate, onView, view: mode })}

          <CalendarBody customEvents={customEvents} />
        </div>
      )}
    </CalendarProvider>
  );
}
