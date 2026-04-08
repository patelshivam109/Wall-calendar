'use client';

import { format } from 'date-fns';

type DayCellProps = {
  date: Date;
  onClick: (date: Date) => void;
  onHover: (date: Date) => void;
  isInRange: boolean;
  isPreviewRange: boolean;
  isStart: boolean;
  isEnd: boolean;
};

function getDayCellShapeClass(isBoundary: boolean) {
  return isBoundary ? 'rounded-full' : 'rounded-xl';
}

function getDayCellStateClass({
  isBoundary,
  isInRange,
  isPreviewRange,
}: {
  isBoundary: boolean;
  isInRange: boolean;
  isPreviewRange: boolean;
}) {
  if (isBoundary) {
    return 'bg-blue-500 text-white hover:bg-blue-500';
  }

  if (isInRange) {
    return 'bg-blue-100 text-blue-950 hover:bg-blue-100';
  }

  if (isPreviewRange) {
    return 'bg-blue-50 text-blue-950 hover:bg-blue-50';
  }

  return 'text-gray-700 hover:bg-gray-100';
}

export function DayCell({
  date,
  onClick,
  onHover,
  isInRange,
  isPreviewRange,
  isStart,
  isEnd,
}: DayCellProps) {
  const isBoundary = isStart || isEnd;
  const cellClasses = [
    'flex h-10 w-10 scale-100 transform-gpu cursor-pointer items-center justify-center text-sm',
    'select-none transition-all duration-150 ease-out hover:scale-105 active:scale-95',
    getDayCellShapeClass(isBoundary),
    getDayCellStateClass({ isBoundary, isInRange, isPreviewRange }),
  ].join(' ');

  return (
    <button
      type="button"
      onClick={() => onClick(date)}
      onMouseEnter={() => onHover(date)}
      className={cellClasses}
    >
      {format(date, 'd')}
    </button>
  );
}
