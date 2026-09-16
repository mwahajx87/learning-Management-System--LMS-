import React from "react";
import { Calendar } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const ScheduleWidget = () => {
  const { scheduleDays, selectedScheduleDay, setSelectedScheduleDay } =
    useApp();

  return (
    <div id="class-schedule-widget" className="border rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4" />
        <h3 className="text-base font-bold tracking-normal">Class Schedule</h3>
      </div>

      {/* Horizontal Date Selector */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {scheduleDays.map((item) => {
          const isClassDay = item.hasClass;
          const isSelected = selectedScheduleDay === item.date;

          return (
            <button
              key={item.date}
              id={`schedule-day-${item.day.toLowerCase()}-${item.date}`}
              onClick={() => setSelectedScheduleDay(item.date)}
              className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                isClassDay
                  ? "font-semibold bg-white text-black"
                  : isSelected
                    ? `${isClassDay ? "ring-black ring-1" : "ring-white ring-1"}`
                    : ""
              }`}
            >
              <span
                className={`text-[11px] uppercase tracking-tight ${
                  isClassDay ? "font-semibold" : ""
                }`}
              >
                {item.day}
              </span>
              <span
                className={`text-sm mt-0.5 ${
                  isClassDay ? "font-bold" : "font-bold"
                }`}
              >
                {item.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day Status */}
      <div className="mt-3.5 pt-3 border-t text-xs">
        {scheduleDays.find((d) => d.date === selectedScheduleDay)?.hasClass ? (
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="font-semibold">Live Lecture & Lab Practice</span>
            <span className="text-[11.5px] font-mono">01:00 PM – 03:00 PM</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span>Self-Study & Revision Day</span>
            <span className="text-[11px] font-mono">No Scheduled Class</span>
          </div>
        )}
      </div>
    </div>
  );
};
