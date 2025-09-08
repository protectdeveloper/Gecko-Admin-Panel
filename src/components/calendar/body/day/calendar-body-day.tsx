import { useCalendarContext } from '../../calendar-context';
import CalendarBodyDayContent from './calendar-body-day-content';
import CalendarBodyMarginDayMargin from './calendar-body-margin-day-margin';

export default function CalendarBodyDay() {
  const { date } = useCalendarContext();
  return (
    <div className="flex flex-col flex-grow divide-y overflow-hidden h-[75vh] border border-border rounded-xl">
      <div className="flex flex-col flex-1 overflow-y-auto ">
        <div className="flex flex-1">
          <CalendarBodyMarginDayMargin />
          <CalendarBodyDayContent date={date} />
        </div>
      </div>
    </div>
  );
}
