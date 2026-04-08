'use client';

import { differenceInCalendarDays, format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

import { CalendarHeader } from '@/src/components/calendar/CalendarHeader';
import { DayCell } from '@/src/components/calendar/DayCell';
import { useCalendar } from '@/src/hooks/useCalendar';

type CalendarGridProps = {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  handleDateClick: (date: Date) => void;
  handleDateHover: (date: Date) => void;
  handleDateLeave: () => void;
  isInRange: (date: Date) => boolean;
  isPreviewRange: (date: Date) => boolean;
  isStart: (date: Date) => boolean;
  isEnd: (date: Date) => boolean;
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.18, ease: 'easeOut' as const },
};

function getSelectionSummary(startDate: Date | null, endDate: Date | null) {
  if (!startDate || !endDate) {
    return 'Select a date range';
  }

  const dayCount = differenceInCalendarDays(endDate, startDate) + 1;
  const dayLabel = dayCount === 1 ? 'day' : 'days';

  return `Selected: ${format(startDate, 'MMM d')} \u2192 ${format(endDate, 'MMM d')} (${dayCount} ${dayLabel})`;
}

export function CalendarGrid({
  currentDate,
  startDate,
  endDate,
  onPrevMonth,
  onNextMonth,
  handleDateClick,
  handleDateHover,
  handleDateLeave,
  isInRange,
  isPreviewRange,
  isStart,
  isEnd,
}: CalendarGridProps) {
  const { days, startDayIndex, monthLabel } = useCalendar(currentDate);
  const selectionSummary = getSelectionSummary(startDate, endDate);

  return (
    <div className="space-y-3">
      <CalendarHeader
        monthLabel={monthLabel}
        onPrev={onPrevMonth}
        onNext={onNextMonth}
      />

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
        {selectionSummary}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={monthLabel}
          {...monthTransition}
          onMouseLeave={handleDateLeave}
          className="space-y-2"
        >
          <div className="grid grid-cols-7 gap-2">
            {WEEKDAY_LABELS.map((label) => (
              <div
                key={label}
                className="flex h-10 items-center justify-center text-sm font-medium text-gray-500"
              >
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: startDayIndex }).map((_, index) => (
              <div key={`empty-${index}`} aria-hidden="true" />
            ))}

            {days.map((date) => (
              <DayCell
                key={date.toISOString()}
                date={date}
                onClick={handleDateClick}
                onHover={handleDateHover}
                isInRange={isInRange(date)}
                isPreviewRange={isPreviewRange(date)}
                isStart={isStart(date)}
                isEnd={isEnd(date)}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
