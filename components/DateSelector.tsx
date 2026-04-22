"use client";

import { differenceInDays, isWithinInterval } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

const dayPickerClassNames = {
  root: "text-primary-200",
  months: "flex justify-around gap-6",
  month: "flex flex-col gap-4",
  month_caption:
    "flex items-center justify-center gap-2 text-primary-100 font-semibold",
  caption_label: "hidden",
  dropdowns: "flex gap-2",
  dropdown:
    "bg-primary-800 text-primary-200 border border-primary-700 rounded px-1.5 py-1 text-sm cursor-pointer",
  dropdown_root: "relative",
  nav: "absolute top-12 flex w-full items-center justify-between",
  button_next: "p-1 hover:text-accent-400 transition-colors text-primary-300",
  button_previous:
    "p-1 hover:text-accent-400 transition-colors text-primary-300",
  chevron: "fill-primary-300",
  weekdays: "flex",
  weekday: "w-9 text-center text-xs font-medium text-primary-400 py-1",
  weeks: "flex flex-col gap-1",
  week: "flex",
  day: "w-9 h-9 text-center text-sm p-0",
  day_button:
    "w-9 h-9 flex items-center justify-center text-sm hover:bg-accent-600 hover:text-primary-900 transition-colors",
  today: "text-accent-400 font-bold",
  selected: "bg-accent-500 text-primary-900",
  range_start: "bg-accent-500 text-primary-900",
  range_end: "bg-accent-500 text-primary-900",
  range_middle: "bg-accent-200 text-primary-900",
  disabled: "text-primary-700 opacity-40 cursor-not-allowed",
  outside: "text-primary-700 opacity-30",
};

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: any;
  bookedDates: any;
  cabin: any;
}) {
  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between">
      <div className="relative">
        <DayPicker
          className="pt-8 place-self-center"
          mode="range"
          onSelect={setRange}
          selected={range}
          min={minBookingLength + 1}
          max={maxBookingLength}
          fromMonth={new Date()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={2}
          classNames={dayPickerClassNames}
        />
      </div>

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
