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
    <div className="min-w-0 max-w-full overflow-x-hidden rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm max-sm:p-3 sm:p-6 lg:p-7">
      <div className="mb-5 max-sm:mb-3">
        <h3 className="text-base font-bold text-navy max-sm:text-sm">
          Schedule Your Introductory Discussion
        </h3>
        <p className="mt-1 text-xs text-navy max-sm:mt-0.5 max-sm:text-[11px]">
          Choose a time that works for you · all times in your local timezone
        </p>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2 max-sm:mb-3">
        <span className="text-sm font-bold text-navy">{monthLabel}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-gray-200 bg-gray-100 transition-colors hover:border-teal/40 hover:bg-teal/10"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-xs text-gray-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-gray-200 bg-gray-100 transition-colors hover:border-teal/40 hover:bg-teal/10"
            aria-label="Next month"
          >
            <FaChevronRight className="text-xs text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center max-sm:mb-1 max-sm:gap-0.5">
        {WEEKDAYS.map((d) => (
          <span
            key={d}
            className="py-1 text-xs font-semibold text-gray-400 max-sm:py-0.5 max-sm:text-[10px]"
          >
            {d}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center max-sm:gap-0.5">
        {JUNE_2026_DAYS.map((cell, i) => {
          if (!cell) return <span key={`e-${i}`} />;
          if (!cell.selectable) {
            return (
              <span
                key={cell.day}
                className="py-2 text-sm text-gray-300 max-sm:py-1.5"
              >
                {cell.day}
              </span>
            );
          }
          const selected = selectedDay === cell.day;
          return (
            <button
              key={cell.day}
              type="button"
              className={`cal-day rounded-[4px] py-2 text-sm text-navy max-sm:py-1.5${
                selected ? " is-selected" : ""
              }`}
              onClick={() => onSelectDay(cell.day)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      <div className="mt-5 min-w-0 max-sm:mt-3">
        <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2 max-sm:gap-1.5 min-[360px]:max-sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`time-slot min-w-0 rounded-[4px] border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-600 max-sm:px-1 max-sm:py-2 max-sm:text-[11px]${
                selectedTime === slot ? " is-selected" : ""
              }`}
              onClick={() => onSelectTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        {dateLabel && selectedTime ? (
          <div className="mt-4 flex items-center gap-3 rounded-[4px] border border-teal/40 bg-teal/5 px-4 py-3 max-sm:mt-3 max-sm:items-start max-sm:gap-2 max-sm:px-3 max-sm:py-2">
            <FaCircleCheck
              className="shrink-0 text-lg text-teal max-sm:mt-0.5 max-sm:text-base"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold break-words text-navy">
                {dateLabel} | {selectedTime}
              </p>
              <p className="mt-0.5 text-xs text-navy max-sm:text-[11px]">
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
