'use client';

import { addMonths } from 'date-fns';
import { useState } from 'react';

import { HeroImage } from '@/src/components/layout/HeroImage';
import { CalendarGrid } from '@/src/components/calendar/CalendarGrid';
import { NotesPanel } from '@/src/components/notes/NotesPanel';
import { useDateRange } from '@/src/hooks/useDateRange';

export default function Home() {
  const {
    startDate,
    endDate,
    handleDateClick,
    handleDateHover,
    handleDateLeave,
    isInRange,
    isPreviewRange,
    isStart,
    isEnd,
  } = useDateRange();
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const updateCurrentDate = (offset: number) => {
    setCurrentDate((previousDate) => addMonths(previousDate, offset));
  };

  const handlePrevMonth = () => updateCurrentDate(-1);
  const handleNextMonth = () => updateCurrentDate(1);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-gray-500">
                Planner
              </p>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  Wall Calendar
                </h1>
                <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
                  Select a date range on the calendar and keep notes saved to
                  that selection.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              A quiet planning space for dates, notes, and monthly context.
            </p>
          </div>
          <HeroImage currentDate={currentDate} />
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">Calendar</h2>
              <p className="text-sm text-gray-600">
                Navigate between months and choose a date range.
              </p>
            </div>
            <CalendarGrid
              currentDate={currentDate}
              startDate={startDate}
              endDate={endDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              handleDateClick={handleDateClick}
              handleDateHover={handleDateHover}
              handleDateLeave={handleDateLeave}
              isInRange={isInRange}
              isPreviewRange={isPreviewRange}
              isStart={isStart}
              isEnd={isEnd}
            />
          </section>

          <aside className="space-y-4">
            <div className="space-y-1 px-1">
              <h2 className="text-lg font-semibold text-gray-900">Notes</h2>
              <p className="text-sm text-gray-600">
                Notes are stored locally for the selected range.
              </p>
            </div>
            <NotesPanel startDate={startDate} endDate={endDate} />
          </aside>
        </div>
      </div>
    </main>
  );
}
