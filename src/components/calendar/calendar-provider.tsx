import { CalendarContext } from './calendar-context';
import { CalendarEvent, Mode } from './calendar-types';
import { useState } from 'react';

export default function CalendarProvider({
  events,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
  children,
  isMonthDayPressable = true,
  selectedEvent: controlledSelectedEvent,
  onSelectedEventChange
}: {
  events: CalendarEvent[];
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday: boolean;
  children: React.ReactNode;
  selectedEvent?: CalendarEvent | null;
  onSelectedEventChange?: (event: CalendarEvent | null) => void;
  isMonthDayPressable?: boolean;
}) {
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
  const [manageEventDialogOpen, setManageEventDialogOpen] = useState(false);
  const [uncontrolledSelectedEvent, setUncontrolledSelectedEvent] = useState<CalendarEvent | null>(null);

  const selectedEvent = controlledSelectedEvent !== undefined ? controlledSelectedEvent : uncontrolledSelectedEvent;

  const setSelectedEvent = (event: CalendarEvent | null) => {
    if (onSelectedEventChange) {
      onSelectedEventChange(event);
    } else {
      setUncontrolledSelectedEvent(event);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        mode,
        setMode,
        date,
        setDate,
        calendarIconIsToday,
        newEventDialogOpen,
        setNewEventDialogOpen,
        manageEventDialogOpen,
        setManageEventDialogOpen,
        selectedEvent,
        setSelectedEvent,
        isMonthDayPressable
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
