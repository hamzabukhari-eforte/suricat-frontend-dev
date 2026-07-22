"use client";

import { FaChevronLeft, FaChevronRight, FaCircleCheck } from "@/components/ui/icons";
import { useEffect, useMemo, useState } from "react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "1:00 PM",
  "2:30 PM",
  "3:00 PM",
  "4:30 PM",
] as const;

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

type CalendarCell = {
  day: number;
  iso: string;
  selectable: boolean;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Local calendar date as YYYY-MM-DD (no timezone shift). */
export function toIsoDate(year: number, monthIndex: number, day: number) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

function startOfTodayLocal() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function todayIsoLocal() {
  const today = startOfTodayLocal();
  return toIsoDate(today.getFullYear(), today.getMonth(), today.getDate());
}

/** Minutes from midnight for labels like "4:30 PM". */
function timeSlotMinutes(slot: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(slot.trim());
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();
  if (period === "AM") {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }
  return hours * 60 + minutes;
}

function nowMinutesLocal() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/** Future (or other-day) slots only — same-day past times are closed. */
function isTimeSlotOpen(slot: string, isoDate: string | null) {
  if (!isoDate || isoDate !== todayIsoLocal()) return true;
  const slotMins = timeSlotMinutes(slot);
  if (slotMins == null) return true;
  return slotMins > nowMinutesLocal();
}

function hasOpenSlotToday() {
  return TIME_SLOTS.some((slot) => isTimeSlotOpen(slot, todayIsoLocal()));
}

function isWeekday(year: number, monthIndex: number, day: number) {
  const dow = new Date(year, monthIndex, day).getDay();
  return dow !== 0 && dow !== 6;
}

function buildMonthCells(year: number, monthIndex: number): Array<CalendarCell | null> {
  const today = startOfTodayLocal();
  const todayIso = todayIsoLocal();
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<CalendarCell | null> = [];
  const todayStillBookable = hasOpenSlotToday();

  for (let i = 0; i < firstDow; i++) cells.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, monthIndex, day);
    const iso = toIsoDate(year, monthIndex, day);
    const isToday = iso === todayIso;
    const selectable =
      isWeekday(year, monthIndex, day) &&
      date >= today &&
      (!isToday || todayStillBookable);
    cells.push({
      day,
      iso,
      selectable,
    });
  }

  return cells;
}

/** Human-readable date for API / confirmation, e.g. "July 22, 2026". */
export function formatScheduleDate(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
}

type ScheduleCalendarProps = {
  /** Selected date as YYYY-MM-DD, or null. */
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (isoDate: string) => void;
  onSelectTime: (time: string | null) => void;
};

export function ScheduleCalendar({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: ScheduleCalendarProps) {
  const today = startOfTodayLocal();
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());
  /** Re-evaluate same-day cutoffs as the clock ticks. */
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNowTick(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const monthLabel = `${MONTH_NAMES[viewMonth]} ${viewYear}`;
  const cells = useMemo(() => {
    void nowTick;
    return buildMonthCells(viewYear, viewMonth);
  }, [viewYear, viewMonth, nowTick]);

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  function goPrevMonth() {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function handleSelectDate(iso: string) {
    onSelectDate(iso);
    if (selectedTime && !isTimeSlotOpen(selectedTime, iso)) {
      onSelectTime(null);
    }
  }

  useEffect(() => {
    if (selectedTime && !isTimeSlotOpen(selectedTime, selectedDate)) {
      onSelectTime(null);
    }
  }, [selectedDate, selectedTime, nowTick, onSelectTime]);

  const dateLabel = selectedDate ? formatScheduleDate(selectedDate) : null;
  const timeOpen = (slot: string) => isTimeSlotOpen(slot, selectedDate);

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
            onClick={goPrevMonth}
            disabled={!canGoPrev}
            className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-gray-200 bg-gray-100 transition-colors hover:border-teal/40 hover:bg-teal/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-gray-100"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-xs text-gray-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNextMonth}
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
        {cells.map((cell, i) => {
          if (!cell) return <span key={`e-${i}`} />;
          if (!cell.selectable) {
            return (
              <span
                key={cell.iso}
                className="py-2 text-sm text-gray-300 max-sm:py-1.5"
              >
                {cell.day}
              </span>
            );
          }
          const selected = selectedDate === cell.iso;
          return (
            <button
              key={cell.iso}
              type="button"
              className={`cal-day rounded-[4px] py-2 text-sm text-navy max-sm:py-1.5${
                selected ? " is-selected" : ""
              }`}
              onClick={() => handleSelectDate(cell.iso)}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      <div className="mt-5 min-w-0 max-sm:mt-3">
        <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2 max-sm:gap-1.5 min-[360px]:max-sm:grid-cols-3">
          {TIME_SLOTS.map((slot) => {
            const open = timeOpen(slot);
            return (
              <button
                key={slot}
                type="button"
                disabled={!open}
                className={`time-slot min-w-0 rounded-[4px] border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-600 max-sm:px-1 max-sm:py-2 max-sm:text-[11px]${
                  open && selectedTime === slot ? " is-selected" : ""
                }`}
                onClick={() => onSelectTime(slot)}
              >
                {slot}
              </button>
            );
          })}
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
