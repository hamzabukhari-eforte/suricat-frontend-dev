"use client";

import { FaChevronLeft, FaChevronRight, FaCircleCheck } from "@/components/ui/icons";
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "1:00 PM",
  "2:30 PM",
  "3:00 PM",
  "4:30 PM",
] as const;

/** Demo calendar for June 2026 matching Designs (selectable weekdays from day 7). */
const JUNE_2026_DAYS: Array<{ day: number; selectable: boolean } | null> = [
  null,
  null,
  { day: 1, selectable: false },
  { day: 2, selectable: false },
  { day: 3, selectable: false },
  { day: 4, selectable: false },
  { day: 5, selectable: false },
  { day: 6, selectable: false },
  { day: 7, selectable: true },
  { day: 8, selectable: true },
  { day: 9, selectable: true },
  { day: 10, selectable: true },
  { day: 11, selectable: true },
  { day: 12, selectable: false },
  { day: 13, selectable: false },
  { day: 14, selectable: true },
  { day: 15, selectable: true },
  { day: 16, selectable: true },
  { day: 17, selectable: true },
  { day: 18, selectable: true },
  { day: 19, selectable: false },
  { day: 20, selectable: false },
  { day: 21, selectable: true },
  { day: 22, selectable: true },
  { day: 23, selectable: true },
  { day: 24, selectable: true },
  { day: 25, selectable: true },
  { day: 26, selectable: false },
  { day: 27, selectable: false },
  { day: 28, selectable: true },
  { day: 29, selectable: true },
  { day: 30, selectable: true },
];

type ScheduleCalendarProps = {
  selectedDay: number | null;
  selectedTime: string | null;
  onSelectDay: (day: number) => void;
  onSelectTime: (time: string) => void;
  monthLabel?: string;
};

export function ScheduleCalendar({
  selectedDay,
  selectedTime,
  onSelectDay,
  onSelectTime,
  monthLabel = "June 2026",
}: ScheduleCalendarProps) {
  const dateLabel =
    selectedDay != null ? `June ${selectedDay}, 2026` : null;

  return (
    <div className="bg-white border border-gray-200 rounded-[4px] p-6 lg:p-7 shadow-sm">
      <div className="mb-5">
        <h3 className="text-navy font-bold text-base">
          Schedule Your Introductory Discussion
        </h3>
        <p className="text-navy text-xs mt-1">
          Choose a time that works for you · all times in your local timezone
        </p>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-navy">{monthLabel}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-7 h-7 rounded-[4px] bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-teal/10 hover:border-teal/40 transition-colors"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-gray-400 text-xs" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="w-7 h-7 rounded-[4px] bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-teal/10 hover:border-teal/40 transition-colors"
            aria-label="Next month"
          >
            <FaChevronRight className="text-gray-400 text-xs" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-xs text-gray-400 py-1 font-semibold">
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {JUNE_2026_DAYS.map((cell, i) => {
          if (!cell) return <span key={`e-${i}`} />;
          if (!cell.selectable) {
            return (
              <span key={cell.day} className="text-sm text-gray-300 py-2">
                {cell.day}
              </span>
            );
          }
          const selected = selectedDay === cell.day;
          return (
            <button
              key={cell.day}
              type="button"
              className={`cal-day text-sm text-navy py-2 rounded-[4px]${
                selected ? " is-selected" : ""
              }`}
              onClick={() => onSelectDay(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`time-slot bg-white border border-gray-200 text-gray-600 text-xs font-semibold py-2.5 rounded-[4px]${
                selectedTime === slot ? " is-selected" : ""
              }`}
              onClick={() => onSelectTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        {dateLabel && selectedTime ? (
          <div className="mt-4 flex items-center gap-3 bg-teal/5 border border-teal/40 rounded-[4px] px-4 py-3">
            <FaCircleCheck className="text-teal text-lg" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-navy">
                {dateLabel} | {selectedTime}
              </p>
              <p className="text-xs text-navy mt-0.5">
                30-minute introductory discussion · Your local timezone
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function formatScheduleDate(day: number) {
  return `June ${day}, 2026`;
}
