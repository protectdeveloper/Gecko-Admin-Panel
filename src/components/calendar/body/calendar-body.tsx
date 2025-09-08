import { useCalendarContext } from '../calendar-context';
import CalendarBodyDay from './day/calendar-body-day';
import CalendarBodyWeek from './week/calendar-body-week';
import CalendarBodyMonth from './month/calendar-body-month';

interface CalendarBodyProps {
  customEvents?: React.ComponentType<{ event: any; type: string }>;
}

export default function CalendarBody({ customEvents }: CalendarBodyProps) {
  const { mode } = useCalendarContext();

  return (
    <>
      {mode === 'day' && <CalendarBodyDay />}
      {mode === 'week' && <CalendarBodyWeek />}
      {mode === 'month' && <CalendarBodyMonth customEvents={customEvents} />}
    </>
  );
}
