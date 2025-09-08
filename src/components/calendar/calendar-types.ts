export type CustomToolbarProps = {
  label: string;
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT') => void;
  onView: (view: 'month' | 'week' | 'day') => void;
  view: string;
};

export type CalendarProps = {
  events: CalendarEvent[];
  mode: Mode;
  setMode: (mode: Mode) => void;
  date: Date;
  setDate: (date: Date) => void;
  calendarIconIsToday?: boolean;
  selectedEvent?: CalendarEvent | null;
  onSelectedEventChange?: (event: CalendarEvent | null) => void;
  customToolbar?: React.ComponentType<CustomToolbarProps>;
  customEvents?: React.ComponentType<{ event: CalendarEvent; type: string }>;
  isMonthDayPressable?: boolean;
};

export type CalendarContextType = CalendarProps & {
  newEventDialogOpen: boolean;
  setNewEventDialogOpen: (open: boolean) => void;
  manageEventDialogOpen: boolean;
  setManageEventDialogOpen: (open: boolean) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
};
export type CalendarEvent = {
  id: string;
  title: string;
  color: string;
  start: Date;
  end: Date;
};

export const calendarModes = ['day', 'week', 'month'] as const;
export type Mode = (typeof calendarModes)[number];
