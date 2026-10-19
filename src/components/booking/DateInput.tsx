"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type KeyboardEvent } from "react";
import { addDays, addMonths, formatInputDate, isSameDay, monthGrid, parseInputDate, startOfDay } from "@/lib/calendar";
import { cx } from "@/lib/cx";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";
import styles from "./BookingPanel.module.css";

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const WEEKDAYS = [
  ["Пн", "понедельник"],
  ["Вт", "вторник"],
  ["Ср", "среда"],
  ["Чт", "четверг"],
  ["Пт", "пятница"],
  ["Сб", "суббота"],
  ["Вс", "воскресенье"],
];

const dayLabel = new Intl.DateTimeFormat("ru", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

type View = { today: Date; focus: Date };

type DateInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  inputRef: (node: HTMLInputElement | null) => void;
  invalid?: boolean;
  describedBy?: string;
};

const latest = (date: Date, min: Date) => (date < min ? min : date);

export function DateInput({ id, value, onChange, inputRef, invalid, describedBy }: DateInputProps) {
  const [view, setView] = useState<View | null>(null);
  const popoverId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLTableElement>(null);
  const moveFocus = useRef(false);
  const isOpen = view !== null;

  useEffect(() => {
    if (!view) return;
    if (moveFocus.current) {
      moveFocus.current = false;
      gridRef.current?.querySelector<HTMLButtonElement>("button[tabindex='0']")?.focus();
    }
  }, [view]);

  useEffect(() => {
    if (!isOpen) return;
    popoverRef.current?.scrollIntoView({ block: "nearest" });
    const closeOnOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!popoverRef.current?.contains(target) && !toggleRef.current?.contains(target)) setView(null);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [isOpen]);

  const open = () => {
    const today = startOfDay(new Date());
    const picked = parseInputDate(value, today);
    moveFocus.current = true;
    setView({ today, focus: picked && picked >= today ? picked : today });
  };

  const close = (returnFocus: boolean) => {
    setView(null);
    if (returnFocus) toggleRef.current?.focus();
  };

  const pick = (date: Date) => {
    onChange(formatInputDate(date));
    close(true);
  };

  const shiftMonth = (months: number) => {
    setView((current) => current && { ...current, focus: latest(addMonths(current.focus, months), current.today) });
  };

  const handleGridKey = (event: KeyboardEvent<HTMLTableElement>) => {
    if (!view) return;
    const { focus, today } = view;
    const weekday = (focus.getDay() + 6) % 7;
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focus, -1),
      ArrowRight: () => addDays(focus, 1),
      ArrowUp: () => addDays(focus, -7),
      ArrowDown: () => addDays(focus, 7),
      Home: () => addDays(focus, -weekday),
      End: () => addDays(focus, 6 - weekday),
      PageUp: () => addMonths(focus, event.shiftKey ? -12 : -1),
      PageDown: () => addMonths(focus, event.shiftKey ? 12 : 1),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    moveFocus.current = true;
    setView({ today, focus: latest(move(), today) });
  };

  const handlePopoverKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    close(true);
  };

  const handlePopoverBlur = (event: FocusEvent<HTMLDivElement>) => {
    const next = event.relatedTarget as Node | null;
    if (next && !popoverRef.current?.contains(next) && next !== toggleRef.current) close(false);
  };

  const picked = view ? parseInputDate(value, view.today) : null;
  const year = view?.focus.getFullYear() ?? 0;
  const month = view?.focus.getMonth() ?? 0;
  const atFirstMonth = !!view && year === view.today.getFullYear() && month === view.today.getMonth();

  return (
    <div className={styles.dateControl}>
      <input
        ref={inputRef}
        id={id}
        name="date"
        type="text"
        inputMode="numeric"
        placeholder="дд.мм.гггг"
        className={cx(styles.control, styles.dateText)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
      />
      <button
        ref={toggleRef}
        type="button"
        className={styles.calendarToggle}
        aria-label={view ? "Закрыть календарь" : "Выбрать дату в календаре"}
        aria-haspopup="dialog"
        aria-expanded={!!view}
        aria-controls={view ? popoverId : undefined}
        onClick={() => (view ? close(false) : open())}
      >
        <CalendarIcon size={20} />
      </button>

      {view && (
        <div
          ref={popoverRef}
          id={popoverId}
          className={styles.calendar}
          role="dialog"
          aria-label="Выбор даты"
          onKeyDown={handlePopoverKey}
          onBlur={handlePopoverBlur}
        >
          <div className={styles.calendarHead}>
            <button type="button" className={styles.calendarNav} onClick={() => shiftMonth(-1)} disabled={atFirstMonth} aria-label="Предыдущий месяц">
              <ChevronLeftIcon size={18} />
            </button>
            <p className={styles.calendarTitle} aria-live="polite">
              {MONTHS[month]} {year}
            </p>
            <button type="button" className={styles.calendarNav} onClick={() => shiftMonth(1)} aria-label="Следующий месяц">
              <ChevronRightIcon size={18} />
            </button>
          </div>

          <table ref={gridRef} role="grid" className={styles.calendarGrid} aria-label={`${MONTHS[month]} ${year}`} onKeyDown={handleGridKey}>
            <thead>
              <tr>
                {WEEKDAYS.map(([short, full]) => (
                  <th key={short} scope="col" abbr={full}>
                    {short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthGrid(year, month).map((week, row) => (
                <tr key={row}>
                  {week.map((day, column) =>
                    day ? (
                      <td key={column} aria-selected={picked ? isSameDay(day, picked) : false}>
                        <button
                          type="button"
                          className={cx(styles.day, isSameDay(day, view.today) && styles.today)}
                          tabIndex={isSameDay(day, view.focus) ? 0 : -1}
                          disabled={day < view.today}
                          aria-label={dayLabel.format(day)}
                          aria-current={isSameDay(day, view.today) ? "date" : undefined}
                          onClick={() => pick(day)}
                        >
                          {day.getDate()}
                        </button>
                      </td>
                    ) : (
                      <td key={column} />
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <p className={styles.calendarNote}>Вс — чт: скидка 20%</p>
        </div>
      )}
    </div>
  );
}
