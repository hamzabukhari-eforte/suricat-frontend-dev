"use client";

import { FaChevronLeft, FaChevronRight, FaCircleCheck } from "@/components/ui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/config";
import {
  fetchCalendlyAvailability,
  type SlotsByDate,
} from "@/lib/api/calendly";

const LOCALE_TAG: Record<Locale, string> = {
  en: "en-US",
  de: "de-DE",
  es: "es-ES",
};

function weekdayLabels(locale: Locale) {
  const tag = LOCALE_TAG[locale];
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.UTC(2024, 0, 7 + i)); // Sun Jan 7 2024
    return new Intl.DateTimeFormat(tag, { weekday: "short" }).format(date);
  });
}

function monthYearLabel(locale: Locale, year: number, monthIndex: number) {
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, 1));
}

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

function buildMonthCells(
  year: number,
  monthIndex: number,
  slotsByDate: SlotsByDate,
): Array<CalendarCell | null> {
  const firstDow = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<CalendarCell | null> = [];

  for (let i = 0; i < firstDow; i++) cells.push(null);

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = toIsoDate(year, monthIndex, day);
    const selectable = (slotsByDate[iso]?.length ?? 0) > 0;
    cells.push({ day, iso, selectable });
  }

  return cells;
}

/** Human-readable date for API / confirmation. */
export function formatScheduleDate(isoDate: string, locale: Locale = "en") {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(y, m - 1, d));
}

/** Local time label for a UTC ISO start_time. */
export function formatSlotTime(startTimeUtc: string, locale: Locale = "en") {
  const d = new Date(startTimeUtc);
  if (Number.isNaN(d.getTime())) return startTimeUtc;
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}

type ScheduleCalendarProps = {
  /** Selected date as YYYY-MM-DD, or null. */
  selectedDate: string | null;
  /** Selected slot UTC start_time, or null. */
  selectedStartTime: string | null;
  onSelectDate: (isoDate: string) => void;
  onSelectStartTime: (startTime: string | null) => void;
  /** Inline error (e.g. slot taken). */
  scheduleError?: string | null;
  /** Increment to force a re-fetch of availability. */
  reloadToken?: number;
};

export function ScheduleCalendar({
  selectedDate,
  selectedStartTime,
  onSelectDate,
  onSelectStartTime,
  scheduleError = null,
  reloadToken = 0,
}: ScheduleCalendarProps) {
  const { locale } = useLocale();
  const t = useTranslations("forms.scheduleCalendar");
  const today = startOfTodayLocal();
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());
  const [slotsByDate, setSlotsByDate] = useState<SlotsByDate>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadAvailability = useCallback(
    async (year: number, monthIndex: number, signal?: AbortSignal) => {
      const rangeStart = new Date(year, monthIndex, 1, 0, 0, 0, 0);
      const rangeEnd = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);
      // Don't request past times for the current month.
      const now = new Date();
      const start =
        rangeStart < now &&
        year === now.getFullYear() &&
        monthIndex === now.getMonth()
          ? now
          : rangeStart;

      setLoading(true);
      setLoadError(null);

      const result = await fetchCalendlyAvailability(
        start.toISOString(),
        rangeEnd.toISOString(),
        signal,
      );

      if (signal?.aborted) return;

      if (!result.ok) {
        if (result.error === "aborted") return;
        setSlotsByDate({});
        setLoadError(result.error);
        setLoading(false);
        return;
      }

      setSlotsByDate(result.slotsByDate ?? {});
      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadAvailability(viewYear, viewMonth, controller.signal);
    return () => controller.abort();
  }, [viewYear, viewMonth, reloadToken, loadAvailability]);

  // Drop selection if the slot disappeared after a refetch.
  useEffect(() => {
    if (!selectedStartTime || loading) return;
    if (!selectedDate) {
      onSelectStartTime(null);
      return;
    }
    const daySlots = slotsByDate[selectedDate] ?? [];
    const stillOpen = daySlots.some((s) => s.start_time === selectedStartTime);
    if (!stillOpen) onSelectStartTime(null);
  }, [
    slotsByDate,
    selectedDate,
    selectedStartTime,
    loading,
    onSelectStartTime,
  ]);

  const monthLabel = monthYearLabel(locale, viewYear, viewMonth);
  const weekdays = useMemo(() => weekdayLabels(locale), [locale]);
  const cells = useMemo(
    () => buildMonthCells(viewYear, viewMonth, slotsByDate),
    [viewYear, viewMonth, slotsByDate],
  );

  const daySlots = selectedDate ? (slotsByDate[selectedDate] ?? []) : [];

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
    if (selectedStartTime) {
      const stillOnDay = (slotsByDate[iso] ?? []).some(
        (s) => s.start_time === selectedStartTime,
      );
      if (!stillOnDay) onSelectStartTime(null);
    }
  }

  const dateLabel = selectedDate ? formatScheduleDate(selectedDate, locale) : null;
  const timeLabel = selectedStartTime
    ? formatSlotTime(selectedStartTime, locale)
    : null;

  const inlineError = scheduleError || loadError;

  return (
    <div className="min-w-0 max-w-full overflow-x-hidden rounded-[4px] border border-gray-200 bg-white p-4 shadow-sm max-sm:p-3 sm:p-6 lg:p-7">
      <div className="mb-5 max-sm:mb-3">
        <h3 className="text-base font-bold text-navy max-sm:text-sm">
          {t("title")}
        </h3>
        <p className="mt-1 text-xs text-navy max-sm:mt-0.5 max-sm:text-[11px]">
          {t("subtitle")}
        </p>
      </div>
      <div className="mb-4 flex items-center justify-between gap-2 max-sm:mb-3">
        <span className="text-sm font-bold text-navy">{monthLabel}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={goPrevMonth}
            disabled={!canGoPrev || loading}
            className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-gray-200 bg-gray-100 transition-colors hover:border-teal/40 hover:bg-teal/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-gray-100"
            aria-label={t("prevMonth")}
          >
            <FaChevronLeft className="text-xs text-gray-400" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNextMonth}
            disabled={loading}
            className="flex h-7 w-7 items-center justify-center rounded-[4px] border border-gray-200 bg-gray-100 transition-colors hover:border-teal/40 hover:bg-teal/10 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={t("nextMonth")}
          >
            <FaChevronRight className="text-xs text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center max-sm:mb-1 max-sm:gap-0.5">
        {weekdays.map((d) => (
          <span
            key={d}
            className="py-1 text-xs font-semibold text-gray-400 max-sm:py-0.5 max-sm:text-[10px]"
          >
            {d}
          </span>
        ))}
      </div>
      {loading ? (
        <div
          className="grid grid-cols-7 gap-1 text-center max-sm:gap-0.5"
          aria-busy="true"
          aria-label={t("loading")}
        >
          {Array.from({ length: 35 }, (_, i) => (
            <span
              key={`sk-${i}`}
              className="mx-auto my-1 h-7 w-7 animate-pulse rounded-[4px] bg-gray-100 max-sm:h-6 max-sm:w-6"
            />
          ))}
        </div>
      ) : (
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
      )}
      <div className="mt-5 min-w-0 max-sm:mt-3">
        {loading ? (
          <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2 max-sm:gap-1.5 min-[360px]:max-sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <span
                key={`ts-${i}`}
                className="h-10 animate-pulse rounded-[4px] bg-gray-100 max-sm:h-9"
              />
            ))}
          </div>
        ) : selectedDate && daySlots.length === 0 ? (
          <p className="text-xs text-navy/70 max-sm:text-[11px]">
            {t("noSlots")}
          </p>
        ) : daySlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2 max-sm:gap-1.5 min-[360px]:max-sm:grid-cols-3">
            {daySlots.map((slot) => {
              const label = formatSlotTime(slot.start_time, locale);
              const selected = selectedStartTime === slot.start_time;
              return (
                <button
                  key={slot.start_time}
                  type="button"
                  className={`time-slot min-w-0 rounded-[4px] border border-gray-200 bg-white py-2.5 text-xs font-semibold text-gray-600 max-sm:px-1 max-sm:py-2 max-sm:text-[11px]${
                    selected ? " is-selected" : ""
                  }`}
                  onClick={() => onSelectStartTime(slot.start_time)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}
        {inlineError ? (
          <p
            className="mt-3 text-xs text-red-500 max-sm:mt-2 max-sm:text-[11px]"
            role="alert"
          >
            {inlineError}
          </p>
        ) : null}
        {dateLabel && timeLabel ? (
          <div className="mt-4 flex items-center gap-3 rounded-[4px] border border-teal/40 bg-teal/5 px-4 py-3 max-sm:mt-3 max-sm:items-start max-sm:gap-2 max-sm:px-3 max-sm:py-2">
            <FaCircleCheck
              className="shrink-0 text-lg text-teal max-sm:mt-0.5 max-sm:text-base"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold break-words text-navy">
                {dateLabel} | {timeLabel}
              </p>
              <p className="mt-0.5 text-xs text-navy max-sm:text-[11px]">
                {t("selectedNote")}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
