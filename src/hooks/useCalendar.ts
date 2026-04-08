import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from 'date-fns';

export type UseCalendarResult = {
  days: Date[];
  startDayIndex: number;
  monthLabel: string;
};

function getCalendarMonth(currentDate: Date) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  return { monthStart, monthEnd };
}

export function useCalendar(currentDate: Date): UseCalendarResult {
  const { monthStart, monthEnd } = getCalendarMonth(currentDate);

  return {
    days: eachDayOfInterval({ start: monthStart, end: monthEnd }),
    startDayIndex: getDay(monthStart),
    monthLabel: format(monthStart, 'MMMM yyyy'),
  };
}
