'use client';

import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

type NotesPanelProps = {
  startDate: Date | null;
  endDate: Date | null;
};

function getStorageKey(startDate: Date | null, endDate: Date | null) {
  if (startDate && endDate) {
    return `${format(startDate, 'yyyy-MM-dd')}_${format(endDate, 'yyyy-MM-dd')}`;
  }

  return 'general_note';
}

export function NotesPanel({ startDate, endDate }: NotesPanelProps) {
  const [notes, setNotes] = useState('');
  const skipPersistRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const storageKey = getStorageKey(startDate, endDate);
  const rangeLabel =
    startDate && endDate
      ? `Selected: ${format(startDate, 'MMM d')} -> ${format(endDate, 'MMM d')}`
      : 'General Notes';

  useEffect(() => {
    skipPersistRef.current = true;
    const nextNotes = window.localStorage.getItem(storageKey) ?? '';
    let isCancelled = false;

    queueMicrotask(() => {
      if (!isCancelled) {
        setNotes(nextNotes);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [storageKey]);

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false;
      return;
    }

    window.localStorage.setItem(storageKey, notes);
  }, [notes, storageKey]);

  return (
    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-700">{rangeLabel}</p>
      <textarea
        ref={textareaRef}
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Write your notes here..."
        className="min-h-32 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
