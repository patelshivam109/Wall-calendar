'use client';

type CalendarHeaderProps = {
  monthLabel: string;
  onPrev: () => void;
  onNext: () => void;
};

const navigationButtonClassName =
  'rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900';

export function CalendarHeader({
  monthLabel,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrev}
        className={navigationButtonClassName}
      >
        {'<'}
      </button>
      <h2 className="text-lg font-bold text-gray-900">{monthLabel}</h2>
      <button
        type="button"
        onClick={onNext}
        className={navigationButtonClassName}
      >
        {'>'}
      </button>
    </div>
  );
}
