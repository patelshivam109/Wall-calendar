'use client';

import { useState } from 'react';
import { compareAsc, isWithinInterval, isSameDay, startOfDay } from 'date-fns';

export type UseDateRangeResult = {
  startDate: Date | null;
  endDate: Date | null;
  handleDateClick: (date: Date) => void;
  handleDateHover: (date: Date) => void;
  handleDateLeave: () => void;
  isInRange: (date: Date) => boolean;
  isPreviewRange: (date: Date) => boolean;
  isStart: (date: Date) => boolean;
  isEnd: (date: Date) => boolean;
};

function getOrderedRange(startDate: Date, endDate: Date) {
  return compareAsc(startDate, endDate) <= 0
    ? { start: startDate, end: endDate }
    : { start: endDate, end: startDate };
}

export function useDateRange(): UseDateRangeResult {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    const selectedDate = startOfDay(date);

    if (!startDate || endDate) {
      setStartDate(selectedDate);
      setEndDate(null);
      setHoveredDate(null);
      return;
    }

    if (compareAsc(selectedDate, startDate) < 0) {
      setStartDate(selectedDate);
      setEndDate(startDate);
      setHoveredDate(null);
      return;
    }

    setEndDate(selectedDate);
    setHoveredDate(null);
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) {
      return false;
    }

    return isWithinInterval(startOfDay(date), {
      start: startDate,
      end: endDate,
    });
  };

  const isPreviewRange = (date: Date) => {
    if (!startDate || endDate || !hoveredDate) {
      return false;
    }

    const previewRange = getOrderedRange(startDate, hoveredDate);

    return isWithinInterval(startOfDay(date), {
      start: previewRange.start,
      end: previewRange.end,
    });
  };

  const handleDateHover = (date: Date) => {
    if (!startDate || endDate) {
      return;
    }

    setHoveredDate(startOfDay(date));
  };

  const handleDateLeave = () => {
    setHoveredDate(null);
  };

  const isStart = (date: Date) =>
    startDate ? isSameDay(startOfDay(date), startDate) : false;

  const isEnd = (date: Date) =>
    endDate ? isSameDay(startOfDay(date), endDate) : false;

  return {
    startDate,
    endDate,
    handleDateClick,
    handleDateHover,
    handleDateLeave,
    isInRange,
    isPreviewRange,
    isStart,
    isEnd,
  };
}
